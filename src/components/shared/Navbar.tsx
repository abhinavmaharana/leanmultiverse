'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState, useEffect, useCallback, memo } from 'react'

function Navbar() {
  const [open, setOpen] = useState(false)
  const [isTransparent, setIsTransparent] = useState(true)
  const [mounted, setMounted] = useState(false)

  const SHOW_WEBINAR_CTA = true

  const handleScroll = useCallback(() => {
    const heroHeight = window.innerHeight * 0.8
    setIsTransparent(window.scrollY < heroHeight)
  }, [])

  useEffect(() => {
    setMounted(true)

    let ticking = false
    let lastScrollY = 0

    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          if (Math.abs(currentScrollY - lastScrollY) > 5) {
            handleScroll()
            lastScrollY = currentScrollY
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', throttledScroll)
  }, [handleScroll])

  const navbarClassName = mounted
    ? isTransparent
      ? 'bg-transparent'
      : 'bg-black/95 backdrop-blur-md'
    : 'bg-transparent'

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 transition-all ${navbarClassName}`}
    >
      {/* Logo */}
      <Link href="/" className="hover:opacity-80 transition">
        <Image
          src="/logo.svg"
          alt="Lean Multiverse Logo"
          width={160}
          height={44}
          priority
        />
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-white bg-transparent">
        <Link href="#home" className="hover:opacity-80">Home</Link>

        {/* Courses Dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-1 hover:opacity-80">
            Courses
            <span className="text-xs">▾</span>
          </button>

          <div
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64
                       bg-black/95 border border-white/20 rounded-2xl p-4
                       opacity-0 invisible group-hover:opacity-100 group-hover:visible
                       transition-all duration-200 z-50"
          >
            <div className="space-y-1">
              <Link
                href="/courses/ai-ml-foundation"
                className="block px-4 py-2 rounded-lg hover:bg-white/10 transition"
              >
                AI & ML Career Foundation
              </Link>

              <Link
                href="/courses/cloud-devops-career-starter"
                className="block px-4 py-2 rounded-lg hover:bg-white/10 transition"
              >
                Cloud & DevOps Career Starter
              </Link>

              <Link
                href="/courses/business-analyst-career-starter"
                className="block px-4 py-2 rounded-lg hover:bg-white/10 transition"
              >
                Business Analyst Career Starter
              </Link>

              <Link
                href="/courses/ai-product-management-career-starter"
                className="block px-4 py-2 rounded-lg hover:bg-white/10 transition"
              >
                AI Product Management Career Starter
              </Link>

              <Link
                href="/courses/ai-project-management-career-starter"
                className="block px-4 py-2 rounded-lg hover:bg-white/10 transition"
              >
                AI Project Management Career Starter
              </Link>
            </div>
          </div>
        </div>

        <Link href="#stories" className="hover:opacity-80">Success Stories</Link>
        <Link href="/services" className="hover:opacity-80">Services</Link>
        <Link href="#contact" className="hover:opacity-80">Contact</Link>
      </div>

      {/* CTA */}
      <div className="flex items-center gap-3">
        {SHOW_WEBINAR_CTA && (
          <>
            <Link href="/book-webinar">
              <Button className="hidden md:inline-flex rounded-full bg-white/20 border border-white/30 text-white">
                Book Webinar
              </Button>
            </Link>

            <Link href="/book-one-on-one">
              <Button className="hidden md:inline-flex rounded-full bg-yellow-400/20 border border-yellow-400/30 text-white">
                Book 1-on-1
              </Button>
            </Link>
          </>
        )}

        {/* Mobile Toggle */}
        <button
          className="md:hidden h-12 w-12 rounded-full bg-white/20 border border-white/30 text-white"
          onClick={() => setOpen(v => !v)}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  )
}

export default memo(Navbar)
