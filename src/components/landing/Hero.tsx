'use client'

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useRef, useEffect, useMemo } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

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
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      })

      // Batch animations in timeline for better performance
      tl.fromTo(taglineRef.current, animationConfig.tagline, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          ease: "power2.out"
        }
      )
      .fromTo(titleRef.current, animationConfig.title, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          ease: "power2.out"
        }, "-=0.6"
      )
      .fromTo(subtitleRef.current, animationConfig.subtitle, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.4"
      )
      .fromTo(buttonsRef.current, animationConfig.buttons, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.2"
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [animationConfig])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="flex flex-col items-center justify-center text-center min-h-screen px-4 sm:px-6 py-16 sm:py-20"
    >
      {/* Content Container */}
      <div className="max-w-6xl mx-auto w-full">
        {/* Tagline */}
        <p 
          ref={taglineRef}
          className="uppercase tracking-[4px] sm:tracking-[6px] text-yellow-400 text-sm sm:text-base lg:text-[20px] font-medium mb-3"
        >
          Transform Your Career
        </p>

        {/* Title */}
        <h1 
          ref={titleRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[56px] font-bold mb-4 sm:mb-6 text-white leading-tight px-2"
        >
          Master Enterprise Agility &<br className="hidden sm:block" />
          <span className="block sm:inline sm:ml-1">Digital Transformation</span>
        </h1>

        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className="text-gray-300 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-2"
        >
          Join 50,000+ professionals who have transformed their careers with our 
          comprehensive courses in enterprise agility, digital transformation, 
          and modern leadership practices.
        </p>

        {/* CTA Buttons */}
        <div 
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full max-w-md sm:max-w-none mx-auto px-4"
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
                <a href="/free-courses">Free Courses</a>
              </span>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
  