'use client'

import { Button } from "@/components/ui/button"
import { motion, useReducedMotion } from "framer-motion"
import { useRef, useEffect, useMemo } from "react"
import Image from "next/image"
import { useIsMobile } from "@/hooks/useIsMobile"

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const shouldReduceMotion = prefersReducedMotion || isMobile
  const SHOW_WEBINAR_CTA = true

  const animationConfig = useMemo(() => ({
    tagline: { y: 50, opacity: 0 },
    title: { y: 80, opacity: 0 },
    subtitle: { y: 60, opacity: 0 },
    buttons: { y: 40, opacity: 0 }
  }), [])

  useEffect(() => {
    if (typeof window === 'undefined' || shouldReduceMotion) return

    let ctx: { revert: () => void } | undefined
    let isMounted = true

    ;(async () => {
      const gsapModule = await import("gsap")
      const scrollTriggerModule = await import("gsap/ScrollTrigger")
      if (!isMounted) return

      const gsapInstance = gsapModule.gsap || gsapModule.default || gsapModule
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default

      if (gsapInstance && ScrollTrigger) {
        gsapInstance.registerPlugin(ScrollTrigger)

        ctx = gsapInstance.context(() => {
          const tl = gsapInstance.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
              once: true
            }
          })

          tl.fromTo(taglineRef.current, animationConfig.tagline,
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out"
            }
          )
            .fromTo(titleRef.current, animationConfig.title,
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out"
              }, "-=0.4"
            )
            .fromTo(subtitleRef.current, animationConfig.subtitle,
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power2.out"
              }, "-=0.3"
            )
            .fromTo(buttonsRef.current, animationConfig.buttons,
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power2.out"
              }, "-=0.2"
            )
            .fromTo(imageRef.current, { x: 50, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out"
              }, "-=0.4"
            )
        }, sectionRef)
      }
    })()

    return () => {
      isMounted = false
      ctx?.revert()
    }
  }, [animationConfig, shouldReduceMotion])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex items-start justify-center lg:justify-start min-h-[calc(100vh-120px)] mt-[-72px] sm:mt-[-88px] px-4 sm:px-6 md:px-8 lg:px-12 pt-6 sm:pt-8 lg:pt-12 pb-10 sm:pb-14 overflow-hidden"
    >
      {/* Background decorative elements */}
      {!isMobile ? (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className={`absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl ${prefersReducedMotion ? '' : 'animate-pulse'}`}
          />
          <div
            className={`absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl ${prefersReducedMotion ? '' : 'animate-pulse'}`}
            style={prefersReducedMotion ? undefined : { animationDelay: '1s' }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
      ) : (
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-yellow-500/10 via-transparent to-black" />
      )}

      <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center z-10">
        <div className="text-left order-2 lg:order-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-yellow-400 to-transparent" />
            <p
              ref={taglineRef}
              className="uppercase tracking-[4px] sm:tracking-[6px] text-yellow-400 text-sm sm:text-base lg:text-[20px] font-medium"
            >
              Master the Skills Corporates Actually Hire For
            </p>
          </div>

          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[72px] font-bold mb-6 sm:mb-8 text-white leading-tight"
          >
            Build the{' '}
            <span className="relative inline-block">
              <span
                className={`relative z-10 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent ${shouldReduceMotion ? '' : 'bg-[length:200%_auto] animate-[gradient_3s_ease_infinite]'}`}
              >
                Professional
              </span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-yellow-400/20 blur-xl -z-0" />
            </span>
            {' '}You Want to Be
          </h1>

          <p
            ref={subtitleRef}
            className="text-gray-300 text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 max-w-2xl leading-relaxed"
          >
            Empowering Professionals With Real Industry Skills That Create Tangible Career Growth & Higher Corporate Value.
          </p>

          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center"
          >
            <motion.div
              whileHover={isMobile ? undefined : {
                scale: 1.05,
                y: -2,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              whileTap={isMobile ? undefined : {
                scale: 0.95,
                y: 0
              }}
              className="relative group w-full sm:w-auto"
            >
              {!isMobile && (
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
              )}
              <Button
                className={`relative bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-full px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold transition-all duration-300 border-2 border-yellow-400/30 w-full sm:w-auto ${isMobile ? 'shadow-lg' : 'shadow-2xl hover:shadow-yellow-400/50 hover:from-yellow-500 hover:to-yellow-600'}`}
                data-cursor-hover
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Courses
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Button>
            </motion.div>

            {SHOW_WEBINAR_CTA && (
              <motion.div
                whileHover={isMobile ? undefined : {
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={isMobile ? undefined : {
                  scale: 0.95,
                  y: 0
                }}
                className="relative group w-full sm:w-auto"
              >
                {!isMobile && (
                  <div className="absolute -inset-1 bg-white/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
                <Button
                  className={`relative text-white rounded-full px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold border-2 border-white/30 transition-all duration-300 w-full sm:w-auto ${isMobile ? 'bg-white/15' : 'bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-white/50 hover:shadow-2xl hover:shadow-white/20'}`}
                  data-cursor-hover
                  onClick={() => {}}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span>Book Webinar</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                </Button>
              </motion.div>
            )}
          </div>
        </div>

        <div
          ref={imageRef}
          className="relative w-full h-[420px] sm:h-[600px] lg:h-[700px] xl:h-[800px] order-1 lg:order-2 flex items-center justify-center"
        >
          <div className="relative w-full h-full rounded-3xl overflow-hidden">
            <Image
              src="/nitesh-prasad-3.png"
              alt="Nitesh Prasad - Lean Multiverse"
              fill
              className="object-contain rounded-3xl"
              priority
              quality={90}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
  