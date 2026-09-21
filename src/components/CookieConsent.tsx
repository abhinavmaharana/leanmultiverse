'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const COOKIE_CONSENT_KEY = 'cookie_consent'
type Consent = 'accept' | 'decline' | null

const Analytics = dynamic(() =>
  import('@vercel/analytics/react').then((mod) => ({ default: mod.Analytics }))
)
const SpeedInsights = dynamic(() =>
  import('@vercel/speed-insights/next').then((mod) => ({ default: mod.SpeedInsights }))
)

export default function CookieConsent() {
  const pathname = usePathname()
  const [consent, setConsent] = useState<Consent>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = window.localStorage.getItem(COOKIE_CONSENT_KEY) as Consent | null
    if (stored === 'accept' || stored === 'decline') {
      setConsent(stored)
    }
    setMounted(true)
  }, [])

  const hideBanner = pathname?.startsWith('/book-webinar')

  const setStoredConsent = (value: 'accept' | 'decline') => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(COOKIE_CONSENT_KEY, value)
    setConsent(value)
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      {/* Only load non-essential analytics when user has accepted */}
      {consent === 'accept' && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}

      {/* Banner: show only when consent not yet given; hidden on book-webinar to avoid blocking form on mobile */}
      {consent === null && !hideBanner && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="fixed bottom-0 left-0 right-0 z-[2000] border-t border-white/10 bg-black/95 backdrop-blur-md p-4 shadow-lg isolate"
          style={{ transform: 'translateZ(0)' }}
        >
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-gray-300 text-sm flex-1">
              We use cookies and similar technologies to improve your experience and analyze site traffic.
              By clicking &quot;Accept&quot; you consent to non-essential cookies.{' '}
              <Link href="/cookie-policy" className="text-yellow-400 hover:underline">
                Cookie Policy
              </Link>
              {' · '}
              <Link href="/privacy-policy" className="text-yellow-400 hover:underline">
                Privacy Policy
              </Link>
            </p>
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setStoredConsent('decline')}
                // Inline colour: the antd reset (`button { color: inherit }`) is unlayered and beats Tailwind's text-white.
                style={{ color: '#fff' }}
                className="flex-1 sm:flex-none px-4 py-2 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 transition text-sm font-medium cursor-pointer touch-manipulation"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => setStoredConsent('accept')}
                className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition text-sm cursor-pointer touch-manipulation"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
