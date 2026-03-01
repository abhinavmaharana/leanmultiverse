'use client'

import Link from 'next/link'
import { ArrowRight, Timer, Calendar } from 'lucide-react'
import { useWebinarCountdown } from '@/hooks/useWebinarCountdown'
import { format } from 'date-fns'

export function NewAnnouncementBanner() {
    const { countdown, mounted, nextWebinarDate } = useWebinarCountdown()

    return (
        <div className="w-full px-4 pt-5 bg-white">
            <div className="max-w-7xl mx-auto bg-amber-400 py-3 px-6 rounded-xl flex items-center justify-center gap-x-6 gap-y-3 flex-wrap text-white shadow-sm">
                {mounted && nextWebinarDate && (
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm md:text-base font-semibold tracking-tight whitespace-nowrap">
                            Next Webinar: {format(nextWebinarDate, 'EEEE, MMM d')} · 8:00 PM IST
                        </span>
                    </div>
                )}

                {mounted && countdown && (
                    <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                        <Timer className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="text-xs md:text-sm font-bold tabular-nums whitespace-nowrap">
                            {String(countdown.d).padStart(2, '0')}d : {String(countdown.h).padStart(2, '0')}h : {String(countdown.m).padStart(2, '0')}m : {String(countdown.s).padStart(2, '0')}s
                        </span>
                    </div>
                )}

            </div>
        </div>
    )
}
