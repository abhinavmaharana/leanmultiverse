'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState, useEffect, useCallback, useRef, memo } from 'react'

function Navbar() {
  const [open, setOpen] = useState(false)
  const [isTransparent, setIsTransparent] = useState(true)
  const [mounted, setMounted] = useState(false)

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

  // Close mobile menu on Escape or click outside
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (mobileMenuRef.current?.contains(target) || (e.target as HTMLElement).closest('#mobile-menu-button')) return
      setOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  const navbarClassName = mounted
    ? isTransparent
      ? 'bg-transparent'
      : 'bg-black/95 backdrop-blur-md'
    : 'bg-transparent'

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 transition-all ${navbarClassName}`}
      aria-label="Main navigation"
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
        <Link href="#stories" className="hover:opacity-80">Success Stories</Link>
        <Link href="/services" className="hover:opacity-80">Services</Link>
        <Link href="#contact" className="hover:opacity-80">Contact</Link>
      </div>

      {/* CTA */}
      <div className="flex items-center gap-3">
        <Link href="/book-webinar">
          <Button className="hidden md:inline-flex rounded-full bg-white/20 border border-white/30 text-white">
            Book Webinar
          </Button>
        </Link>

        {/* Mobile Toggle */}
        <button
          type="button"
          id="mobile-menu-button"
          aria-controls="mobile-menu"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="md:hidden h-12 w-12 rounded-full bg-white/20 border border-white/30 text-white flex items-center justify-center"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        role="dialog"
        aria-labelledby="mobile-menu-button"
        className={`md:hidden absolute top-full left-0 right-0 mt-0 bg-black/98 backdrop-blur-md border-b border-white/10 overflow-hidden transition-all duration-200 z-40 ${
          open ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-1">
          <Link
            href="#home"
            className="block py-3 text-white font-semibold hover:text-yellow-400 transition"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            href="#stories"
            className="block py-3 text-white font-semibold hover:text-yellow-400 transition"
            onClick={() => setOpen(false)}
          >
            Success Stories
          </Link>
          <Link
            href="/services"
            className="block py-3 text-white font-semibold hover:text-yellow-400 transition"
            onClick={() => setOpen(false)}
          >
            Services
          </Link>
          <Link
            href="#contact"
            className="block py-3 text-white font-semibold hover:text-yellow-400 transition"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
          <Link href="/book-webinar" className="mt-2" onClick={() => setOpen(false)}>
            <Button className="w-full rounded-full bg-white/20 border border-white/30 text-white">
              Book Webinar
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default memo(Navbar)
