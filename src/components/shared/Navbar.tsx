'use client'

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useCallback, memo } from "react"
import Link from "next/link"

function Navbar() {
  const [open, setOpen] = useState(false)
  const [isTransparent, setIsTransparent] = useState(true)
  const [mounted, setMounted] = useState(false)
  const SHOW_WEBINAR_CTA = true

  useEffect(() => {
    setMounted(true)
    
    // Throttled scroll detection for better performance
    let ticking = false
    const heroHeight = window.innerHeight * 0.8 // 80% of viewport height

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY
          setIsTransparent(scrollY < heroHeight)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Use mounted state to prevent hydration mismatch
  const navbarClassName = mounted 
    ? (isTransparent 
        ? 'bg-transparent backdrop-blur-none' 
        : 'bg-black/95 backdrop-blur-md')
    : 'bg-transparent backdrop-blur-none' // Default for SSR

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-8 py-6 transition-all duration-300 ${navbarClassName}`}
    >
      {/* Left: Logo */}
      <div className="flex items-center flex-shrink-0">
        <Link href="/" className="cursor-pointer hover:opacity-80 transition-opacity duration-300">
          <Image 
            src="/logo.svg" 
            alt="Lean Multiverse Logo" 
            width={160} 
            height={44} 
            className="h-10 sm:h-12 md:h-14 w-auto"
            priority
            fetchPriority="high"
          />
        </Link>
      </div>

      {/* Center: Navigation links (desktop) - Absolutely positioned for true centering */}
      <div 
        className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 md:h-[65px] items-center justify-center space-x-8 text-[14.75px] font-semibold font-[Raleway] px-[28px] py-[20px] rounded-full shadow-md hover:opacity-90 transition bg-gradient-to-r from-[#C69D44]/30 to-[#604C21]/30 backdrop-blur-sm border border-white/30"
        style={mounted && !isTransparent ? {
          background: 'linear-gradient(to right, rgba(198, 157, 68, 0.2), rgba(96, 76, 33, 0.2))',
          backdropFilter: 'blur(12px)',
          borderColor: 'rgba(255, 255, 255, 0.2)'
        } : undefined}
      >
        <a 
          href="#home" 
          className="hover:opacity-90 transition text-white"
        >
          Home
        </a>
        
        {/* Courses Dropdown */}
        <div className="relative group">
          <button 
            className="hover:opacity-90 transition text-white flex items-center"
          >
            Courses
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div 
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-black border border-white/20 rounded-2xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
          >
            <div className="space-y-2">
              <a 
                href="#courses" 
                className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition"
              >
                Webinar
              </a>
              <a 
                href="#courses" 
                className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition"
              >
                Foundation Courses
              </a>
              <a 
                href="#courses" 
                className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition"
              >
                Professional Courses
              </a>
              <a 
                href="#courses" 
                className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition"
              >
                Career Accelerator
              </a>
              <a 
                href="/free-courses" 
                className="block px-4 py-2 text-white hover:bg-white/10 rounded-lg transition"
              >
                Dual Programs
              </a>
            </div>
          </div>
        </div>

        <a 
          href="#stories" 
          className="hover:opacity-90 transition text-white"
        >
          Success Stories
        </a>
        <Link 
          href="/services" 
          className="hover:opacity-90 transition text-white"
        >
          Services
        </Link>
        <a 
          href="#contact" 
          className="hover:opacity-90 transition text-white"
        >
          Contact
        </a>
      </div>

      {/* Right: CTA + Mobile menu button */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {SHOW_WEBINAR_CTA && (
          <>
            <div>
              <Link href="/book-webinar">
                <Button
                  className="hidden md:inline-flex rounded-full text-[13px] sm:text-[14.75px] w-[140px] sm:w-[160px] h-[60px] sm:h-[65px] text-white shadow-md hover:opacity-90 transition bg-white/20 backdrop-blur-sm border border-white/30"
                  style={mounted && !isTransparent ? {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(12px)',
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                  } : undefined}
                >
                  <span>Book Webinar</span>
                </Button>
              </Link>
            </div>
            <div>
              <Link href="/book-one-on-one">
                <Button
                  className="hidden md:inline-flex rounded-full text-[13px] sm:text-[14.75px] w-[140px] sm:w-[160px] h-[60px] sm:h-[65px] text-white shadow-md hover:opacity-90 transition bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/30"
                  style={mounted && !isTransparent ? {
                    backgroundColor: 'rgba(250, 204, 21, 0.1)',
                    backdropFilter: 'blur(12px)',
                    borderColor: 'rgba(250, 204, 21, 0.2)'
                  } : undefined}
                >
                  <span>Book 1-on-1</span>
                </Button>
              </Link>
            </div>
          </>
        )}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
          className="inline-flex md:hidden items-center justify-center h-12 w-12 rounded-full text-white hover:bg-white/15 transition border border-white/30 bg-white/20"
          style={mounted && !isTransparent ? {
            borderColor: 'rgba(255, 255, 255, 0.2)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          } : undefined}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            {open ? (
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            ) : (
              <path stroke="currentColor" strokeWidth="1.5" d="M3.75 7.5h16.5M3.75 12h16.5M3.75 16.5h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div 
          className="absolute left-0 right-0 top-full mt-3 px-4 sm:px-6 md:hidden z-40"
        >
          <div 
            className="flex flex-col gap-2 text-sm sm:text-base font-medium rounded-2xl shadow-lg backdrop-blur-md p-4 sm:p-6 bg-gradient-to-b from-[#0b0b0b]/95 to-[#1a1a1a]/95 border border-white/20"
            style={mounted && !isTransparent ? {
              background: 'linear-gradient(to bottom, rgba(11, 11, 11, 0.9), rgba(26, 26, 26, 0.9))',
              borderColor: 'rgba(255, 255, 255, 0.1)'
            } : undefined}
          >
            <a 
              onClick={() => setOpen(false)} 
              href="#home" 
              className="px-3 py-3 rounded-lg hover:bg-white/5 text-white text-base sm:text-lg"
            >
              Home
            </a>
            <a 
              onClick={() => setOpen(false)} 
              href="#courses" 
              className="px-3 py-3 rounded-lg hover:bg-white/5 text-white text-base sm:text-lg"
            >
              Courses
            </a>
            <a 
              onClick={() => setOpen(false)} 
              href="#stories" 
              className="px-3 py-3 rounded-lg hover:bg-white/5 text-white text-base sm:text-lg"
            >
              Success Stories
            </a>
            <Link 
              onClick={() => setOpen(false)} 
              href="/services" 
              className="px-3 py-3 rounded-lg hover:bg-white/5 text-white text-base sm:text-lg"
            >
              Services
            </Link>
            <a 
              onClick={() => setOpen(false)} 
              href="#contact" 
              className="px-3 py-2 rounded-lg hover:bg-white/5 text-white"
            >
              Contact
            </a>
            {SHOW_WEBINAR_CTA && (
              <div className="space-y-2">
                <Link href="/book-webinar" onClick={() => setOpen(false)}>
                  <Button
                    className="w-full rounded-full px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-md hover:opacity-90 transition"
                  >
                    <span>Book Webinar</span>
                  </Button>
                </Link>
                <Link href="/book-one-on-one" onClick={() => setOpen(false)}>
                  <Button
                    className="w-full rounded-full px-6 py-2 bg-yellow-400/20 backdrop-blur-md border border-yellow-400/30 text-white shadow-md hover:opacity-90 transition"
                  >
                    <span>Book 1-on-1</span>
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default memo(Navbar)
