/**
 * Timeout and retry helpers for external API calls (Sheets, Razorpay, Resend).
 * Use timeouts to avoid hanging; use retries only for idempotent operations.
 */

const DEFAULT_TIMEOUT_MS = 15_000

/**
 * Fetch with a timeout. Aborts the request after timeoutMs.
 */
export function fetchWithTimeout(
  input: RequestInfo | URL,
  init?: RequestInit,
  timeoutMs: number = DEFAULT_TIMEOUT_MS
): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
  return fetch(input, {
    ...init,
    signal: init?.signal ?? controller.signal,
  }).finally(() => clearTimeout(timeoutId))
}

/**
 * Run an async operation with a timeout. Rejects with an Error if it takes longer than timeoutMs.
 */
export function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number = DEFAULT_TIMEOUT_MS
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
    ),
  ])
}

export type RetryOptions = {
  retries: number
  /** Delay in ms before first retry; doubled each time. Default 1000. */
  delayMs?: number
}

/**
 * Run an async (idempotent) operation with retries. Retries on rejection.
 * Use only for idempotent operations (e.g. append to sheet, create order, send email).
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions
): Promise<T> {
  const { retries, delayMs = 1000 } = options
  let lastError: unknown
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn()
    } catch (e) {
      lastError = e
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, delayMs * Math.pow(2, attempt)))
      }
    }
  }
  throw lastError
}

/** Standard 503 message for external service failure (no provider details). */
export const HIGH_DEMAND_MESSAGE =
  "We're experiencing high demand; please try again in a few minutes."
