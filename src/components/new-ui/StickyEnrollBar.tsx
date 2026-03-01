'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

/**
 * StickyEnrollBar - A permanent floating CTA at the bottom of the screen.
 * Designed to provide immediate enrollment access throughout the home page.
 */
export function StickyEnrollBar() {
    return (
        <div className="fixed bottom-4 md:bottom-8 left-0 right-0 z-[100] px-4 pointer-events-none">
            <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 0.5 }}
                className="max-w-5xl mx-auto bg-[#0F172A] border border-white/10 rounded-[1.5rem] md:rounded-full p-2 md:p-3 flex items-center justify-between shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] pointer-events-auto"
            >
                
                {/* Left: Instructor Identity */}
                <div className="flex items-center gap-3 md:gap-4 pl-1 md:pl-2">
                    <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-amber-400/50 flex-shrink-0">
                        <Image 
                            src="/nitesh-prasad-updated-pic.png" 
                            alt="Instructor" 
                            fill 
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col pr-2">
                        <h4 className="text-white font-bold text-[13px] md:text-lg tracking-tight leading-tight">
                            Enroll in Webinar 
                        </h4>
                        <p className="text-gray-400 text-[10px] md:text-sm font-medium">
                            100K+ Students Enrolled
                        </p>
                    </div>
                </div>

                {/* Middle: Pricing Info (Desktop Only) */}
                <div className="hidden sm:flex items-center gap-4 px-4 border-l border-white/10 h-10">
                    <div className="flex items-baseline gap-3">
                        <span className="text-gray-500 line-through text-xs md:text-sm font-medium">₹5,999.00</span>
                        <span className="text-white font-black text-sm md:text-2xl tracking-tighter border-b-2 border-amber-400 leading-none pb-0.5">
                            ₹2,999.00
                        </span>
                    </div>
                </div>

                {/* Right: Action Button */}
                <div className="flex items-center gap-3">
                    {/* Mobile Pricing - shown only when middle section is hidden */}
                    <div className="flex flex-col items-end sm:hidden pr-2">
                        <span className="text-gray-500 line-through text-[10px]">₹5,999</span>
                        <span className="text-white font-bold text-sm">₹2,999</span>
                    </div>
                    
                    <Link href="/book-webinar" className="pr-1">
                        <button className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-black text-sm md:text-base px-6 md:px-12 py-3 md:py-4 rounded-full transition-all active:scale-95 shadow-lg whitespace-nowrap">
                            Enroll Now
                        </button>
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}
