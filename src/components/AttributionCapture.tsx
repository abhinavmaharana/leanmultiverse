'use client'

import { useEffect } from 'react'
import { captureAttributionFromUrl } from '@/lib/attribution'

/**
 * Runs once on mount: captures UTM params and referrer from URL into sessionStorage
 * so conversion events (Lead, Purchase, Schedule) can include attribution.
 */
export default function AttributionCapture() {
  useEffect(() => {
    captureAttributionFromUrl()
  }, [])
  return null
}
