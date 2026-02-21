/**
 * Meta (Facebook) Pixel standard event helpers.
 * Only fires when NEXT_PUBLIC_META_PIXEL_ID is set and fbq is loaded.
 * See: https://developers.facebook.com/docs/meta-pixel/reference
 */

declare global {
  interface Window {
    fbq?: (
      action: 'track' | 'trackCustom',
      eventName: string,
      params?: Record<string, unknown>
    ) => void
  }
}

const PIXEL_ID = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_META_PIXEL_ID : ''

export function isMetaPixelEnabled(): boolean {
  if (!PIXEL_ID) return false
  if (typeof window === 'undefined') return false
  return typeof window.fbq === 'function'
}

/**
 * Fire a Meta pixel standard event. Safe to call from any component; no-op if pixel is not loaded.
 */
export function trackMetaEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === 'undefined' || !window.fbq || !PIXEL_ID) return
  try {
    if (params && Object.keys(params).length > 0) {
      window.fbq('track', eventName, params)
    } else {
      window.fbq('track', eventName)
    }
  } catch {
    // ignore
  }
}
