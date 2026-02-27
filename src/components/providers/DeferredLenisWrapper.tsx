'use client'

import { useState, useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'

const LenisProvider = dynamic(() => import('@/components/providers/LenisProvider'), {
  ssr: false,
})

interface DeferredLenisWrapperProps {
  children: ReactNode
}

/**
 * Mounts LenisProvider only after hydration so Lenis/GSAP do not block first paint.
 * Until then, children render with native scroll.
 * Skips Lenis on /book-webinar to avoid iOS touch issues with form inputs.
 */
export default function DeferredLenisWrapper({ children }: DeferredLenisWrapperProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return <>{children}</>
  if (pathname?.startsWith('/book-webinar')) return <>{children}</>
  return <LenisProvider>{children}</LenisProvider>
}
