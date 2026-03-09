'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, memo } from 'react'
import { Menu, X } from 'lucide-react'
import BookWebinarModal from '@/components/webinar/BookWebinarModal'

const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'AI-ML Details', href: '/ai-ml' },
    { label: 'Testimonial', href: '#testimonial' },
    // { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
]

function NewNavbar() {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navShadowClass = mounted && scrolled ? 'shadow-sm' : ''

    return (
        <nav
            className={`w-full sticky top-0 z-50 py-4 px-4 sm:px-6 lg:px-8 bg-white transition-shadow duration-300 ${navShadowClass}`}
            aria-label="Main navigation"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                
                {/* Logo & Navigation Section */}
                <div className="flex items-center">
                    {/* Brand Identity */}
                    <Link 
                        href="/" 
                        className="flex items-center gap-3 hover:opacity-80 transition-opacity flex-shrink-0"
                    >
                        <Image
                            src="/IMG_5963.PNG"
                            alt="Lean Multiverse Icon"
                            width={40}
                            height={40}
                            priority
                            className="h-10 w-auto object-contain"
                        />
                        <div className="flex flex-col text-left leading-tight">
                            <span className="text-[19px] font-black text-gray-900 tracking-tight">Lean</span>
                            <span className="text-[12px] font-bold text-gray-900 tracking-tight uppercase -mt-0.5">Multiverse</span>
                            <span className="text-[6.5px] text-gray-400 font-bold uppercase tracking-tighter">Consultancy Pvt Ltd</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation Links - Fixed spacing to prevent bunching */}
                    <div className="hidden md:flex items-center ml-16 space-x-12">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-gray-800 hover:text-amber-400 transition-colors duration-200 text-[15.5px] font-bold whitespace-nowrap tracking-wide"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Primary CTA - Aligned to far right */}
                <div className="hidden md:block">
                    <BookWebinarModal source="sticky-bar" />
                </div>

                {/* Mobile Navigation Toggle */}
                <button
                    type="button"
                    className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setOpen((v) => !v)}
                >
                    {open ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </button>
            </div>

            {/* Mobile Expanded Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    open ? 'max-h-[80vh] opacity-100 mt-4' : 'max-h-0 opacity-0 pointer-events-none'
                }`}
            >
                <div className="border-t border-gray-100 pt-6 pb-6 flex flex-col gap-3 px-4 bg-gray-50/80 rounded-2xl">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="block py-4 text-gray-900 font-black hover:text-amber-400 transition-colors text-xl tracking-tight px-4 rounded-xl hover:bg-white"
                            onClick={() => setOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="mt-4 flex flex-col" onClick={() => setOpen(false)}>
                        <BookWebinarModal source="new-hero" />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default memo(NewNavbar)
