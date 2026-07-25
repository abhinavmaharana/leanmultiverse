'use client'

import { Sparkles } from 'lucide-react'

export function NewAnnouncementBanner() {
    return (
        <div className="w-full px-4 pt-5 bg-white">
            <div className="max-w-7xl mx-auto bg-amber-400 py-3 px-6 rounded-xl flex items-center justify-center gap-x-6 gap-y-3 flex-wrap text-white shadow-sm">
                <div className="flex items-center gap-2 max-w-full">
                    <Sparkles className="w-4 h-4 flex-shrink-0" />
                    <span className="text-[11px] sm:text-sm md:text-base font-bold tracking-tight text-white leading-tight">
                        Enrollment is now open — secure your spot today!
                    </span>
                </div>
            </div>
        </div>
    )
}
