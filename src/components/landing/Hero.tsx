'use client'

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useRef, useEffect } from "react"
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

  useEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      // Animate elements on scroll
      gsap.fromTo(taglineRef.current, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      gsap.fromTo(titleRef.current, 
        { y: 80, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      gsap.fromTo(subtitleRef.current, 
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          ease: "power3.out",
          delay: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      gsap.fromTo(buttonsRef.current, 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          ease: "power3.out",
          delay: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="flex flex-col items-center justify-center text-center min-h-screen px-6 py-20"
    >
      {/* Content Container */}
      <div className="max-w-6xl mx-auto w-full">
        {/* Tagline */}
        <motion.p 
          ref={taglineRef}
          className="uppercase tracking-[6px] text-yellow-400 lg:text-[20px] text-[16px] font-medium mb-3"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Transform Your Career
        </motion.p>

        {/* Title */}
        <motion.h1 
          ref={titleRef}
          className="text-[30px] md:text-[46.13px] lg:text-[56px] font-bold mb-6 text-white leading-tight"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        >
          Master Enterprise Agility &<br />
          <span className="text-yellow-400">Digital Transformation</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          ref={subtitleRef}
          className="text-gray-300 text-lg md:text-xl mb-8 max-w-4xl mx-auto leading-relaxed"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        >
          Join 50,000+ professionals who have transformed their careers with our 
          comprehensive courses in enterprise agility, digital transformation, 
          and modern leadership practices.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
        >
          <motion.div
            whileHover={{ 
              scale: 1.05,
              y: -2,
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.95,
              y: 0
            }}
            className="relative group"
          >
            <motion.div
              className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0, 0.3, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <Button 
              className="relative bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 border border-yellow-400/20"
              data-cursor-hover
            >
              <motion.span
                className="relative z-10"
                whileHover={{ y: -1 }}
                transition={{ duration: 0.2 }}
              >
                Explore Courses
              </motion.span>
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ 
              scale: 1.05,
              y: -2,
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.95,
              y: 0
            }}
            className="relative group"
          >
            <motion.div
              className="absolute inset-0 bg-white/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0, 0.2, 0]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            <Button 
              className="relative bg-white/10 text-white hover:bg-white/20 rounded-full px-8 py-4 text-lg font-semibold border border-white/20 backdrop-blur-md hover:border-white/40 transition-all duration-300 hover:shadow-xl"
              data-cursor-hover
            >
              <motion.span
                className="relative z-10"
                whileHover={{ y: -1 }}
                transition={{ duration: 0.2 }}
              >
                <a href="/free-courses">Free Courses</a>
              </motion.span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
  