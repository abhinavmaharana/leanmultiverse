'use client'

import { useEffect, useState } from 'react'

export function useIsMobile(maxWidth = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(`(max-width: ${maxWidth}px)`)

    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(event.matches)
    }

    // Initial value
    handleChange(mediaQuery)

    const supportsAddEventListener = typeof mediaQuery.addEventListener === 'function'
    const supportsAddListener = typeof mediaQuery.addListener === 'function'

    if (supportsAddEventListener) {
      mediaQuery.addEventListener('change', handleChange)
    } else if (supportsAddListener) {
      mediaQuery.addListener(handleChange)
    }

    return () => {
      if (supportsAddEventListener) {
        mediaQuery.removeEventListener('change', handleChange)
      } else if (supportsAddListener) {
        mediaQuery.removeListener(handleChange)
      }
    }
  }, [maxWidth])

  return isMobile
}

