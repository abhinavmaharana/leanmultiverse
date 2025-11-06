'use client'

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useRef, useEffect, useMemo } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  // Memoize animation configuration to prevent recreation
  const animationConfig = useMemo(() => ({
    tagline: { y: 50, opacity: 0 },
    title: { y: 80, opacity: 0 },
    subtitle: { y: 60, opacity: 0 },
    buttons: { y: 40, opacity: 0 }
  }), [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      // Create a single timeline for better performance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
          once: true // Only animate once to prevent glitches
        }
      })

      // Batch animations in timeline for better performance
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

    return () => ctx.revert()
  }, [animationConfig])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Container with side-by-side layout */}
      <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center z-10">
        {/* Left Side: Content */}
        <div className="text-left order-2 lg:order-1">
          {/* Tagline with decorative element */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-yellow-400 to-transparent" />
            <p 
              ref={taglineRef}
              className="uppercase tracking-[4px] sm:tracking-[6px] text-yellow-400 text-sm sm:text-base lg:text-[20px] font-medium"
            >
              Unlock Collaborative Innovation Across Realities
            </p>
          </div>

          {/* Title with gradient effect */}
          <h1 
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[72px] font-bold mb-6 sm:mb-8 text-white leading-tight"
          >
            Build in the{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_3s_ease_infinite]">
                Multiverse
              </span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-yellow-400/20 blur-xl -z-0" />
            </span>
          </h1>

          {/* Subtitle with enhanced styling */}
          <p 
            ref={subtitleRef}
            className="text-gray-300 text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 max-w-2xl leading-relaxed"
          >
            Empowering Boundless Creation - Catalysts for Your Success.{' '}
            <span className="text-white/90">Transforming ambitious teams and professionals into industry leaders with innovative, impactful learning.</span>
          </p>

          {/* CTA Buttons with enhanced styling */}
          <div 
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center"
          >
            <motion.div
              whileHover={{ 
                scale: 1.05,
                y: -2,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              whileTap={{ 
                scale: 0.95,
                y: 0
              }}
              className="relative group w-full sm:w-auto"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
              <Button 
                className="relative bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 rounded-full px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300 border-2 border-yellow-400/30 w-full sm:w-auto"
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
            
            <motion.div
              whileHover={{ 
                scale: 1.05,
                y: -2,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              whileTap={{ 
                scale: 0.95,
                y: 0
              }}
              className="relative group w-full sm:w-auto"
            >
              <div className="absolute -inset-1 bg-white/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Button 
                className="relative bg-white/10 backdrop-blur-md text-white hover:bg-white/20 rounded-full px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold border-2 border-white/30 hover:border-white/50 transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 w-full sm:w-auto"
                data-cursor-hover
              >
                <span className="relative z-10 flex items-center gap-2">
                  <a href="/book-webinar">Book Webinar</a>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Image with enhanced styling */}
        <div 
          ref={imageRef}
          className="relative w-full h-[400px] sm:h-[500px] lg:h-[650px] order-1 lg:order-2"
        >
          {/* Decorative background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-yellow-400/5 to-transparent rounded-3xl blur-3xl -z-10 animate-pulse" />
          <div className="absolute -inset-4 bg-gradient-to-tr from-yellow-400/10 via-transparent to-transparent rounded-3xl blur-2xl -z-10" />
          
          {/* Image container with premium frame effect */}
          <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-white/20 backdrop-blur-md bg-gradient-to-br from-white/10 via-white/5 to-transparent shadow-2xl shadow-black/50 p-3">
            {/* Inner glow border */}
            <div className="absolute inset-0 rounded-2xl border border-yellow-400/20 pointer-events-none" />
            
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src="/nitesh-prasad.png"
                alt="Nitesh Prasad - Lean Multiverse"
                fill
                className="object-cover rounded-2xl scale-105 hover:scale-100 transition-transform duration-700"
                priority
                quality={95}
              />
              
              {/* Overlay gradients for depth and focus */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-yellow-400/5 pointer-events-none" />
              
              {/* Subtle vignette effect */}
              <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_100px_rgba(0,0,0,0.3)] pointer-events-none" />
            </div>
          </div>
          
          {/* Floating decorative elements with animation */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-400/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
          
          {/* Corner accent elements */}
          <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-yellow-400/30 rounded-tr-3xl" />
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-yellow-400/30 rounded-bl-3xl" />
        </div>
      </div>
    </section>
  )
}
  