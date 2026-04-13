'use client'

import { usePathname } from 'next/navigation'
import BookWebinarModal from './BookWebinarModal'

export default function StickyBookBar() {
    const pathname = usePathname()

    // Hide on AI/ML page — it has its own sticky bar
    if (pathname?.startsWith('/ai-ml')) return null

    return (
        <>
            {/* Sticky bar */}
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-xl px-4">
                <div className="bg-white border border-gray-200 rounded-full shadow-xl py-3 px-6 flex items-center justify-between">
                    <div className="text-sm text-gray-800 font-medium">
                        Reserve your webinar seat — Only ₹99
                    </div>

                    <BookWebinarModal 
                        source="sticky-bar"
                    />

                </div>
            </div>
        </>
    )
}