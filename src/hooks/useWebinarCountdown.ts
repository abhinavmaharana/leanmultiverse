import { useState, useEffect, useMemo } from 'react'
import { getAvailableDatesPaid } from '@/lib/webinar-config'

export interface Countdown {
  d: number
  h: number
  m: number
  s: number
}

export function useWebinarCountdown() {
  const [countdown, setCountdown] = useState<Countdown | null>(null)
  const [mounted, setMounted] = useState(false)

  const availableDates = useMemo(() => getAvailableDatesPaid(), [])
  
  const countdownTarget = useMemo(() => {
    if (availableDates.length === 0) return null
    const d = availableDates[0]
    // Webinar at 8:00 PM IST (14:30 UTC)
    return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 14, 30, 0))
  }, [availableDates])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!countdownTarget) return
    
    const tick = () => {
      const now = Date.now()
      const diff = Math.max(0, countdownTarget.getTime() - now)
      
      if (diff === 0) {
        setCountdown(null)
        return
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24))
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const s = Math.floor((diff % (1000 * 60)) / 1000)
      
      setCountdown({ d, h, m, s })
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [countdownTarget])

  return { countdown, mounted, nextWebinarDate: availableDates[0] || null }
}
