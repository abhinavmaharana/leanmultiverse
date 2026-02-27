'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'

const PerfectChatbot = dynamic(() => import('@/components/ui/PerfectChatbot'), {
  loading: () => null,
})

const DEFER_MS = 3000

/**
 * Mounts PerfectChatbot only after a short delay so it does not block initial load.
 * Hidden on /book-webinar to avoid overlapping the form on mobile.
 */
export default function DeferredPerfectChatbot() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), DEFER_MS)
    return () => clearTimeout(t)
  }, [])
  if (!mounted) return null
  if (pathname?.startsWith('/book-webinar')) return null
  return <PerfectChatbot />
}
