/**
 * In-memory rate limiter by IP. Use for contact/quotation/enrollment/webinar APIs.
 * Resets per deployment; for multi-instance consistency use Redis (e.g. @upstash/ratelimit).
 */

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

/**
 * Check rate limit for this request. Returns null if allowed, or Response (429) if limited.
 */
export function checkRateLimit(request: Request, config: RateLimitConfig): Response | null {
  const ip = getClientIp(request)
  if (ip === 'unknown') return null // allow if we can't determine IP (e.g. local dev)

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

/** Periodic cleanup of expired entries to avoid unbounded memory growth */
const CLEANUP_INTERVAL_MS = 60 * 1000
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of store.entries()) {
      if (now >= entry.resetAt) store.delete(key)
    }
  }, CLEANUP_INTERVAL_MS)
}
