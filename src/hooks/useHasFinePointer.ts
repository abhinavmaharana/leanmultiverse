'use client'

import { useEffect, useState } from 'react'

/**
 * Returns true when the primary input mechanism has fine pointer accuracy (e.g. mouse).
 * Returns false for touch-only devices so we can skip custom cursor and other pointer-only UX.
 */
export function useHasFinePointer() {
  const [hasFinePointer, setHasFinePointer] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mq = window.matchMedia('(pointer: fine)')

    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setHasFinePointer(event.matches)
    }

    handleChange(mq)

    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', handleChange)
      return () => mq.removeEventListener('change', handleChange)
    }
    if (typeof (mq as MediaQueryList & { addListener?: (e: MediaQueryListEvent) => void }).addListener === 'function') {
      ;(mq as MediaQueryList & { addListener: (e: MediaQueryListEvent) => void }).addListener(handleChange)
      return () =>
        (mq as MediaQueryList & { removeListener: (e: MediaQueryListEvent) => void }).removeListener(handleChange)
    }
  }, [])

  return hasFinePointer
}
