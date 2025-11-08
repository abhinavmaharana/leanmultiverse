'use client'

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [isTransparent, setIsTransparent] = useState(true)
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const navLinksRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Scroll detection for transparent navbar
    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroHeight = window.innerHeight * 0.8 // 80% of viewport height
      setIsTransparent(scrollY < heroHeight)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    const ctx = gsap.context(() => {
      // Animate navbar on load
      gsap.fromTo(navRef.current, 
        { y: -100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          ease: "power3.out"
        }
      )

      // Animate logo
      gsap.fromTo(logoRef.current, 
        { x: -50, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2
        }
      )

      // Animate nav links
      gsap.fromTo(navLinksRef.current, 
        { y: -30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          ease: "power3.out",
          delay: 0.4
        }
      )

      // Animate CTA
      gsap.fromTo(ctaRef.current, 
        { x: 50, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.8,
          ease: "power3.out",
          delay: 0.6
        }
      )
    }, navRef)

    return () => {
      ctx.revert()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <motion.nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-8 py-6 transition-all duration-300 ${
        isTransparent 
          ? 'bg-transparent backdrop-blur-none' 
          : 'bg-black/95 backdrop-blur-md'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Left: Logo */}
      <motion.div 
        ref={logoRef}
        className="flex items-center"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <Link href="/" className="cursor-pointer hover:opacity-80 transition-opacity duration-300">
          <Image 
            src="/logo.svg" 
            alt="Lean Multiverse Logo" 
            width={160} 
            height={44} 
            className="h-10 sm:h-12 md:h-14 w-auto" 
          />
        </Link>
      </motion.div>

      {/* Center: Navigation links (desktop) */}
      <motion.div 
        ref={navLinksRef}
        className={`hidden md:flex md:w-auto md:h-[65px] items-center justify-center space-x-8 text-[14.75px] font-semibold font-[Raleway] px-[28px] py-[20px] rounded-full shadow-md hover:opacity-90 transition ${
          isTransparent 
            ? 'bg-gradient-to-r from-[#C69D44]/30 to-[#604C21]/30 backdrop-blur-sm border border-white/30' 
            : 'bg-gradient-to-r from-[#C69D44]/20 to-[#604C21]/20 backdrop-blur-md border border-white/20'
        }`}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      >
        <motion.a 
          href="#home" 
          className="hover:opacity-90 transition text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Home
        </motion.a>
        
        {/* Courses Dropdown */}
        <div className="relative group">
          <motion.button 
            className="hover:opacity-90 transition text-white flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Courses
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.button>
          <motion.div 
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-black border border-white/20 rounded-2xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
            initial={{ opacity: 0, y: -10 }}
            whileHover={{ opacity: 1, y: 0 }}
          >
            <div className="space-y-2">
              <motion.a 
                href="#courses" 
                className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition"
                whileHover={{ x: 5 }}
              >
                Webinar
              </motion.a>
              <motion.a 
                href="#courses" 
                className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition"
                whileHover={{ x: 5 }}
              >
                Foundation Courses
              </motion.a>
              <motion.a 
                href="#courses" 
                className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition"
                whileHover={{ x: 5 }}
              >
                Professional Courses
              </motion.a>
              <motion.a 
                href="#courses" 
                className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition"
                whileHover={{ x: 5 }}
              >
                Career Accelerator
              </motion.a>
              <motion.a 
                href="/free-courses" 
                className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition"
                whileHover={{ x: 5 }}
              >
                Dual Programs
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.a 
          href="#stories" 
          className="hover:opacity-90 transition text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Success Stories
        </motion.a>
        <motion.a 
          href="#contact" 
          className="hover:opacity-90 transition text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact
        </motion.a>
      </motion.div>

      {/* Right: CTA + Mobile menu button */}
      <motion.div 
        ref={ctaRef}
        className="flex items-center gap-3"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            className={`hidden sm:inline-flex rounded-full text-[14.75px] w-[160px] h-[65px] text-white shadow-md hover:opacity-90 transition ${
              isTransparent 
                ? 'bg-white/20 backdrop-blur-sm border border-white/30' 
                : 'bg-white/10 backdrop-blur-md border border-white/20'
            }`}
          >
            <Link href="/book-webinar">Book Webinar</Link>
          </Button>
        </motion.div>
        <motion.button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
          className={`inline-flex md:hidden items-center justify-center h-12 w-12 rounded-full text-white hover:bg-white/15 transition ${
            isTransparent 
              ? 'border border-white/30 bg-white/20' 
              : 'border border-white/20 bg-white/10'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {open ? (
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            ) : (
              <path stroke="currentColor" strokeWidth="1.5" d="M3.75 7.5h16.5M3.75 12h16.5M3.75 16.5h16.5" />
            )}
          </motion.svg>
        </motion.button>
      </motion.div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div 
            className="absolute left-0 right-0 top-full mt-3 px-4 sm:px-6 md:hidden z-40"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <motion.div 
              className={`flex flex-col gap-2 text-sm sm:text-base font-medium rounded-2xl shadow-lg backdrop-blur-md p-4 sm:p-6 ${
                isTransparent 
                  ? 'bg-gradient-to-b from-[#0b0b0b]/95 to-[#1a1a1a]/95 border border-white/20' 
                  : 'bg-gradient-to-b from-[#0b0b0b]/90 to-[#1a1a1a]/90 border border-white/10'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <motion.a 
                onClick={() => setOpen(false)} 
                href="#home" 
                className="px-3 py-3 rounded-lg hover:bg-white/5 text-white text-base sm:text-lg"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                Home
              </motion.a>
              <motion.a 
                onClick={() => setOpen(false)} 
                href="#courses" 
                className="px-3 py-3 rounded-lg hover:bg-white/5 text-white text-base sm:text-lg"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                Courses
              </motion.a>
              <motion.a 
                onClick={() => setOpen(false)} 
                href="#stories" 
                className="px-3 py-3 rounded-lg hover:bg-white/5 text-white text-base sm:text-lg"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                Success Stories
              </motion.a>
              <motion.a 
                onClick={() => setOpen(false)} 
                href="#contact" 
                className="px-3 py-2 rounded-lg hover:bg-white/5 text-white"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact
              </motion.a>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className="mt-2 w-full rounded-full px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-md hover:opacity-90 transition"
                  onClick={() => setOpen(false)}
                >
                  <Link href="/book-webinar">Book Webinar</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
