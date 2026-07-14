'use client'

import { usePathname } from 'next/navigation'
import BookWebinarModal from './BookWebinarModal'
import { useWebinarCountdown } from '@/hooks/useWebinarCountdown'
import { format } from 'date-fns'

export default function StickyBookBar() {
    const pathname = usePathname()
    const { mounted, nextWebinarDate } = useWebinarCountdown()

    // Only show on course pages (e.g., /courses/apm, /courses/scrum)
    // and hide on AI/ML course just in case
    if (!pathname?.startsWith('/courses') || pathname?.startsWith('/courses/ai-ml')) {
        return null
    }

    return (
        <>
            {/* Sticky bar */}
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl px-4">
                <div className="bg-white border border-gray-200 rounded-full shadow-xl py-3 px-6 flex items-center justify-between">
                    <div className="text-xs md:text-sm text-gray-800 font-medium leading-tight">
                        {mounted && nextWebinarDate ? (
                            <>
                                <span className="hidden md:inline">We have a webinar each Saturday at 8 PM! Next: </span>
                                <span className="md:hidden">Next Webinar: </span>
                                <strong>{format(nextWebinarDate, 'MMM d')}</strong>
                            </>
                        ) : (
                            <span>Reserve your webinar seat — Only ₹99</span>
                        )}
                    </div>

                    <BookWebinarModal 
                        source="sticky-bar"
                    />

                </div>
            </div>
        </>
    )
}