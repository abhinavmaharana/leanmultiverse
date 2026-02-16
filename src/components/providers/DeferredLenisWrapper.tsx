'use client'

import { useState, useEffect, ReactNode } from 'react'
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
 */
export default function DeferredLenisWrapper({ children }: DeferredLenisWrapperProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return <>{children}</>
  return <LenisProvider>{children}</LenisProvider>
}
