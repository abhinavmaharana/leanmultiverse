// Performance-optimized GSAP utilities
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Performance settings
gsap.config({
  force3D: true,
  nullTargetWarn: false,
})

// Optimized animation presets
export const animationPresets = {
  // Fade in from bottom
  fadeInUp: {
    from: { y: 60, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
  },
  
  // Fade in from left
  fadeInLeft: {
    from: { x: -60, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
  },
  
  // Fade in from right
  fadeInRight: {
    from: { x: 60, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
  },
  
  // Scale in
  scaleIn: {
    from: { scale: 0.8, opacity: 0 },
    to: { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
  },
  
  // Stagger animation
  stagger: {
    from: { y: 40, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.1 }
  }
}

// Optimized scroll trigger creation
export const createScrollTrigger = (config: {
  trigger: string | Element
  start?: string
  end?: string
  scrub?: boolean | number
  onEnter?: () => void
  onLeave?: () => void
  onUpdate?: (self: ScrollTrigger) => void
}) => {
  return ScrollTrigger.create({
    trigger: config.trigger,
    start: config.start || "top 80%",
    end: config.end || "bottom 20%",
    scrub: config.scrub || false,
    onEnter: config.onEnter,
    onLeave: config.onLeave,
    onUpdate: config.onUpdate,
    // Performance optimizations
    refreshPriority: -1,
    fastScrollEnd: true,
    anticipatePin: 1,
  })
}

// Batch animations for better performance
export const batchAnimate = (elements: Element[], animation: { from: gsap.TweenVars; to: gsap.TweenVars }, options?: gsap.TweenVars) => {
  return gsap.fromTo(elements, animation.from, {
    ...animation.to,
    ...options
  })
}

// Optimized timeline creation
export const createTimeline = (options?: gsap.TimelineVars) => {
  return gsap.timeline({
    defaults: {
      ease: "power2.out",
      duration: 0.8
    },
    ...options
  })
}

// Intersection Observer for better performance
export const createIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
) => {
  if (typeof window === 'undefined') return null
  
  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  })
}

// Optimized animation cleanup
export const cleanupAnimations = (context: gsap.Context) => {
  context.kill()
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
}

// Performance monitoring
export const measurePerformance = (name: string, fn: () => void) => {
  if (typeof window === 'undefined') return fn()
  
  const start = performance.now()
  fn()
  const end = performance.now()
  console.log(`${name} took ${end - start} milliseconds`)
}

// Reduced motion: prefer checking in components (e.g. useShouldAnimate, LogoLoop) so animations can be skipped entirely when preferred.
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Memory-efficient animation
export const createMemoryEfficientAnimation = (element: Element, animation: { from: gsap.TweenVars; to: gsap.TweenVars }) => {
  return gsap.fromTo(element, animation.from, {
    ...animation.to,
    onComplete: () => {
      // Clean up after animation
      gsap.set(element, { clearProps: "all" })
    }
  })
}

// Throttled scroll handler
export const throttle = <T extends (...args: unknown[]) => void>(func: T, limit: number) => {
  let inThrottle: boolean
  return function(this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Debounced resize handler
export const debounce = <T extends (...args: unknown[]) => void>(func: T, wait: number) => {
  let timeout: NodeJS.Timeout
  return function(this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}
