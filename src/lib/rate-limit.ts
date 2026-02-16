/**
 * Rate limiter by IP for contact/quotation/enrollment/webinar APIs.
 * Uses Upstash Redis when UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set
 * (production); otherwise falls back to in-memory (e.g. local dev). In-memory is per
 * serverless instance and resets on cold start.
 */

import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const store = new Map<string, { count: number; resetAt: number }>()

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  const realIp = request.headers.get('x-real-ip')
  if (realIp) return realIp
  return 'unknown'
}

export type RateLimitConfig = {
  /** Max requests per window */
  limit: number
  /** Window duration in seconds */
  windowSeconds: number
}

/** Stricter: contact & quotation (e.g. 5 per 15 min) */
export const STRICT_LIMIT: RateLimitConfig = { limit: 5, windowSeconds: 15 * 60 }

/** Default: enrollment, webinar, free-webinar (e.g. 20 per 15 min) */
export const DEFAULT_LIMIT: RateLimitConfig = { limit: 20, windowSeconds: 15 * 60 }

function checkRateLimitInMemory(request: Request, config: RateLimitConfig): Response | null {
  const ip = getClientIp(request)
  if (ip === 'unknown') return null

  const now = Date.now()
  const key = `${ip}:${config.windowSeconds}`
  const entry = store.get(key)

  if (!entry) {
    store.set(key, { count: 1, resetAt: now + config.windowSeconds * 1000 })
    return null
  }

  if (now >= entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + config.windowSeconds * 1000 })
    return null
  }

  entry.count += 1
  if (entry.count > config.limit) {
    return new Response(
      JSON.stringify({
        error: 'Too many requests. Please try again later.',
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(Math.ceil((entry.resetAt - now) / 1000)),
        },
      }
    )
  }

  return null
}

let redisStrictLimiter: Ratelimit | null = null
let redisDefaultLimiter: Ratelimit | null = null

function getRedisLimiters(): { strict: Ratelimit; default: Ratelimit } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null

  if (!redisStrictLimiter || !redisDefaultLimiter) {
    const redis = new Redis({ url, token })
    redisStrictLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.fixedWindow(STRICT_LIMIT.limit, `${STRICT_LIMIT.windowSeconds} s`),
    })
    redisDefaultLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.fixedWindow(DEFAULT_LIMIT.limit, `${DEFAULT_LIMIT.windowSeconds} s`),
    })
  }
  return { strict: redisStrictLimiter, default: redisDefaultLimiter! }
}

/**
 * Check rate limit for this request. Returns null if allowed, or Response (429) if limited.
 * Uses distributed (Redis) limiter when Upstash env vars are set; otherwise in-memory.
 */
export async function checkRateLimit(
  request: Request,
  config: RateLimitConfig
): Promise<Response | null> {
  const ip = getClientIp(request)
  if (ip === 'unknown') return null

  const limiters = getRedisLimiters()
  if (limiters) {
    const limiter = config.limit === STRICT_LIMIT.limit ? limiters.strict : limiters.default
    const result = await limiter.limit(ip)
    if (!result.success) {
      return new Response(
        JSON.stringify({
          error: 'Too many requests. Please try again later.',
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            ...(result.reset != null && { 'Retry-After': String(Math.max(1, Math.ceil((result.reset - Date.now()) / 1000))) }),
          },
        }
      )
    }
    return null
  }

  return checkRateLimitInMemory(request, config)
}

/** Periodic cleanup of expired entries (in-memory store only) */
const CLEANUP_INTERVAL_MS = 60 * 1000
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of store.entries()) {
      if (now >= entry.resetAt) store.delete(key)
    }
  }, CLEANUP_INTERVAL_MS)
}
