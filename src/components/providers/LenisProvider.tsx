'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface LenisProviderProps {
  children: React.ReactNode
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Initialize Lenis with optimized settings
    lenisRef.current = new Lenis({
      duration: 1.0, // Reduced duration for snappier feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    // Connect Lenis with GSAP ScrollTrigger
    lenisRef.current.on('scroll', ScrollTrigger.update)

    // Optimize GSAP ticker
    gsap.ticker.lagSmoothing(0)
    gsap.ticker.fps(60) // Limit to 60fps for better performance

    // Store the ticker callback so it can be properly removed
    const tickerCallback = (time: number) => {
      lenisRef.current?.raf(time * 1000)
    }

    gsap.ticker.add(tickerCallback)

    return () => {
      lenisRef.current?.destroy()
      gsap.ticker.remove(tickerCallback)
    }
  }, [])

  return <>{children}</>
}
