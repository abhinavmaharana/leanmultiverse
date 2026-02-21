/**
 * GA4 (gtag) event helpers. Only fires when gtag is loaded.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function trackGA4Event(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === 'undefined' || !window.gtag) return
  try {
    window.gtag('event', eventName, params)
  } catch {
    // ignore
  }
}
