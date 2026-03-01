'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function NewAnnouncementBanner() {
    return (
        <div className="w-full px-4 pt-5 bg-white">
            <div className="max-w-7xl mx-auto bg-amber-400 py-3.5 px-8 rounded-xl flex items-center justify-center gap-4 text-white shadow-sm">
                <p className="text-sm md:text-base font-semibold tracking-tight">
                    Free Webinar Ends Soon, Get It Now
                </p>
                <ArrowRight className="w-5 h-5 flex-shrink-0" />
                <Link
                    href="/book-webinar"
                    className="text-sm md:text-base font-black hover:opacity-90 transition-all border-b-2 border-white/40 leading-none pb-0.5"
                >
                    Claim Your Spot
                </Link>
            </div>
        </div>
    )
}
