'use client'

import { Timer } from 'lucide-react'
import { useAiMlWebinarCountdown } from '@/hooks/useAiMlWebinarCountdown'

export function AiMlAnnouncementBanner() {
    const { countdown, mounted } = useAiMlWebinarCountdown()

    return (
        <div className="w-full px-4 pt-5 pb-2 bg-white">
            <div className="max-w-7xl mx-auto bg-amber-400 py-3 px-6 rounded-xl flex items-center justify-center gap-x-6 gap-y-3 flex-wrap text-white shadow-sm relative overflow-hidden">
                
                <div className="flex items-center gap-2 relative z-10">
                    <span className="text-sm md:text-base font-bold tracking-tight">
                        🔥 Learn AI in just ₹99. Register Now!
                    </span>
                </div>

                {mounted && countdown && (
                    <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-lg backdrop-blur-sm border border-white/10 relative z-10 hidden sm:flex">
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
