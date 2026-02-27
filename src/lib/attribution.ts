/**
 * Capture UTM params and referrer on landing for conversion attribution.
 * Stored in sessionStorage so we know which source (Google, ad, Reels) led to Lead/Purchase.
 */

const STORAGE_KEY = 'lm_attribution'

export interface AttributionData {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  referrer?: string
  landing_url?: string
  landing_ts?: number
}

function parseUtmFromSearch(search: string): Partial<AttributionData> {
  const params = new URLSearchParams(search)
  const data: Partial<AttributionData> = {}
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const
  for (const key of keys) {
    const v = params.get(key)
    if (v) data[key] = v
  }
  return data
}

/**
 * Call on first page load (client). Reads URL + referrer, stores in sessionStorage (first-touch).
 */
export function captureAttributionFromUrl(): void {
  if (typeof window === 'undefined') return
  try {
    const existing = getStoredAttribution()
    const search = window.location.search
    const utm = parseUtmFromSearch(search)
    const hasUtm = Object.keys(utm).length > 0

    if (hasUtm) {
      const payload: AttributionData = {
        ...existing,
        ...utm,
        referrer: document.referrer || existing?.referrer,
        landing_url: window.location.href.split('?')[0],
        landing_ts: Date.now(),
      }
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
      return
    }

    if (!existing?.landing_ts) {
      const payload: AttributionData = {
        referrer: document.referrer || undefined,
        landing_url: window.location.pathname,
        landing_ts: Date.now(),
      }
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    }
  } catch {
    // ignore
  }
}

/**
 * Read stored attribution (for sending with conversion events).
 */
export function getStoredAttribution(): AttributionData | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as AttributionData
  } catch {
    return null
  }
}

/**
 * Return UTM params for API payload (e.g. order_notes). Only non-empty string fields.
 */
export function getAttributionForApi(): Record<string, string> {
  const a = getStoredAttribution()
  if (!a) return {}
  const out: Record<string, string> = {}
  if (a.utm_source) out.utm_source = a.utm_source
  if (a.utm_medium) out.utm_medium = a.utm_medium
  if (a.utm_campaign) out.utm_campaign = a.utm_campaign
  if (a.utm_content) out.utm_content = a.utm_content
  if (a.utm_term) out.utm_term = a.utm_term
  if (a.referrer) out.referrer = a.referrer
  return out
}

/**
 * Return an object suitable to merge into Meta/GA4 event params (only non-empty fields).
 */
export function getAttributionForEvents(): Record<string, string | number | undefined> {
  const a = getStoredAttribution()
  if (!a) return {}
  const out: Record<string, string | number | undefined> = {}
  if (a.utm_source) out.utm_source = a.utm_source
  if (a.utm_medium) out.utm_medium = a.utm_medium
  if (a.utm_campaign) out.utm_campaign = a.utm_campaign
  if (a.utm_content) out.utm_content = a.utm_content
  if (a.utm_term) out.utm_term = a.utm_term
  if (a.referrer) out.referrer = a.referrer
  return out
}
