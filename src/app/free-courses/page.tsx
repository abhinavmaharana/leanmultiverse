'use client'

import Navbar from '../../components/shared/Navbar'
import Footer from '../../components/shared/Footer'
import FreeCourses from '../../components/landing/FreeCourses'
import Image from 'next/image'
import { motion } from "framer-motion"
import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function FreeCoursesPage() {
  const mainRef = useRef<HTMLElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      // Animate background on load
      gsap.fromTo(backgroundRef.current, 
        { scale: 1.1, opacity: 0 },
        { 
          scale: 1, 
          opacity: 0.7, 
          duration: 2,
          ease: "power2.out"
        }
      )

      // Parallax effect for background
      gsap.to(backgroundRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <motion.main 
      ref={mainRef}
      className="relative w-full min-h-screen text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Background Image Layer */}
      <motion.div 
        ref={backgroundRef}
        className="fixed bg-black inset-0 -z-20 flex items-center justify-center"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.7 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <Image 
          src="/bg.png" 
          alt="Background Design" 
          fill 
          className="object-contain opacity-70"
          priority
        />
      </motion.div>

      {/* Optional Overlay to blend */}
      <div className="fixed inset-0 -z-10" />

      {/* Content */}
      <motion.div 
        className="relative flex flex-col min-h-screen"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      >
        <Navbar />
        <FreeCourses />
        <Footer />
      </motion.div>
    </motion.main>
  )
}
