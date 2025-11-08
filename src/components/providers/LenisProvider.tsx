'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsMobile } from '@/hooks/useIsMobile'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface LenisProviderProps {
  children: React.ReactNode
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Disable Lenis on mobile/touch devices to avoid jank
    if (isMobile) {
      lenisRef.current?.destroy()
      lenisRef.current = null
      return
    }

    // Initialize Lenis with optimized settings
    lenisRef.current = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    })

    // Connect Lenis with GSAP ScrollTrigger
    lenisRef.current.on('scroll', ScrollTrigger.update)

    // Optimize GSAP ticker
    gsap.ticker.lagSmoothing(0)
    gsap.ticker.fps(60)

    const tickerCallback = (time: number) => {
      lenisRef.current?.raf(time * 1000)
    }

    gsap.ticker.add(tickerCallback)

    return () => {
      lenisRef.current?.destroy()
      lenisRef.current = null
      gsap.ticker.remove(tickerCallback)
    }
  }, [isMobile])

  return <>{children}</>
}
