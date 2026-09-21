'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { WEBINAR_LINK } from '@/config/webinar'

/**
 * StickyEnrollBar - A permanent floating CTA at the bottom of the screen.
 * Gives visitors a one-tap way to book the bootcamp from anywhere on the home page.
 */
export function StickyEnrollBar() {
    const handleBook = () => {
        if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', 'InitiateCheckout')
        }
        window.open(WEBINAR_LINK, '_blank', 'noopener,noreferrer')
    }

    return (
        // Extra right padding on phones keeps the bar clear of the floating WhatsApp button.
        <div className="fixed bottom-4 md:bottom-8 left-0 right-0 z-[100] pl-4 pr-16 sm:px-4 pointer-events-none">
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 0.5 }}
                className="max-w-3xl mx-auto bg-[#0F172A] border border-white/10 rounded-full p-2 md:p-3 flex items-center justify-between gap-3 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] pointer-events-auto"
            >
                {/* Left: Instructor Identity */}
                <div className="flex items-center gap-3 md:gap-4 pl-1 md:pl-2 min-w-0">
                    <div className="relative w-11 h-11 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-amber-400/50 flex-shrink-0">
                        <Image
                            src="/nitesh-prasad-updated-pic.png"
                            alt="Nitesh Prasad"
                            fill
                            sizes="56px"
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <h4 className="text-white font-bold text-[13px] md:text-lg tracking-tight leading-tight truncate">
                            Enroll in Bootcamp
                        </h4>
                        <p className="hidden sm:block text-gray-400 text-[10px] md:text-sm font-medium">
                            100K+ Students Enrolled
                        </p>
                    </div>
                </div>

                {/* Right: Action Button */}
                <button
                    type="button"
                    onClick={handleBook}
                    // Inline colour: the antd reset (`button { color: inherit }`) would otherwise override the text colour.
                    style={{ color: '#111827' }}
                    className="flex-shrink-0 bg-amber-400 hover:bg-amber-500 font-black text-sm md:text-base px-5 md:px-10 py-3 md:py-4 rounded-full transition-all active:scale-95 shadow-lg whitespace-nowrap cursor-pointer"
                >
                    Book Bootcamp
                </button>
            </motion.div>
        </div>
    )
}
