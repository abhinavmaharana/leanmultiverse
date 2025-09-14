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

    // Initialize Lenis
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    // Connect Lenis with GSAP ScrollTrigger
    lenisRef.current.on('scroll', ScrollTrigger.update)

    gsap.ticker.lagSmoothing(0)

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
