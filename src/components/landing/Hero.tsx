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
      className="flex items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20"
    >
      {/* Container with side-by-side layout */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Side: Content */}
        <div className="text-left order-2 lg:order-1">
          {/* Tagline */}
          <p 
            ref={taglineRef}
            className="uppercase tracking-[4px] sm:tracking-[6px] text-yellow-400 text-sm sm:text-base lg:text-[20px] font-medium mb-3"
          >
            Unlock Collaborative Innovation Across Realities
          </p>

          {/* Title */}
          <h1 
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[56px] font-bold mb-4 sm:mb-6 text-white leading-tight"
          >
            Build in the <span className="text-yellow-400">Multiverse</span>
          </h1>

          {/* Subtitle */}
          <p 
            ref={subtitleRef}
            className="text-gray-300 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl leading-relaxed"
          >
            Empowering Boundless Creation - Catalysts for Your Success. 
            Transforming ambitious teams and professionals into industry leaders 
            with innovative, impactful learning.
          </p>

          {/* CTA Buttons */}
          <div 
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center"
          >
            <motion.div
              whileHover={{ 
                scale: 1.02,
                y: -1,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              whileTap={{ 
                scale: 0.98,
                y: 0
              }}
              className="relative group w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Button 
                className="relative bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 rounded-full px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 border border-yellow-400/20 w-full sm:w-auto"
                data-cursor-hover
              >
                <span className="relative z-10">
                  Explore Courses
                </span>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ 
                scale: 1.02,
                y: -1,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              whileTap={{ 
                scale: 0.98,
                y: 0
              }}
              className="relative group w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-white/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Button 
                className="relative bg-white/10 text-white hover:bg-white/20 rounded-full px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold border border-white/20 backdrop-blur-md hover:border-white/40 transition-all duration-300 hover:shadow-xl w-full sm:w-auto"
                data-cursor-hover
              >
                <span className="relative z-10">
                  <a href="/book-webinar">Book Webinar</a>
                </span>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Image */}
        <div 
          ref={imageRef}
          className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] order-1 lg:order-2"
        >
          <Image
            src="/bg.png"
            alt="Build in the Multiverse"
            fill
            className="object-contain"
            priority
            quality={90}
          />
        </div>
      </div>
    </section>
  )
}
  