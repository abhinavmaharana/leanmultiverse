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

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange)
    } else {
      // Fallback for older browsers
      // @ts-expect-error addListener is deprecated but still present in some browsers
      mediaQuery.addListener(handleChange)
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', handleChange)
      } else {
        // @ts-expect-error removeListener is deprecated but still present in some browsers
        mediaQuery.removeListener(handleChange)
      }
    }
  }, [maxWidth])

  return isMobile
}

