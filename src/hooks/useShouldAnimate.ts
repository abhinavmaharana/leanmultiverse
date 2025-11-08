'use client'

import { useReducedMotion } from 'framer-motion'
import { useIsMobile } from './useIsMobile'

/**
 * Determines whether heavier animations should run.
 * Returns false for mobile viewports or when the user prefers reduced motion.
 */
export function useShouldAnimate(maxMobileWidth = 768) {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile(maxMobileWidth)

  return !prefersReducedMotion && !isMobile
}

