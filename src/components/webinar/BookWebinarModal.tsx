'use client'

import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/useIsMobile'
import './book-webinar.css'

const shimmerStyle = `
@keyframes shimmer {
  0% { transform: translateX(-150%) skewX(-20deg); }
  100% { transform: translateX(250%) skewX(-20deg); }
}
`

interface Props {
    source: string
}

export default function BookWebinarModal({ source }: Props) {
    const isMobile = useIsMobile(1023)

    const handleRedirect = () => {
        if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', 'InitiateCheckout');
        }
        window.location.href = 'https://learn.leanmultiverse.com/l/e0ca22a7e0';
    }

    // "Book Webinar" opens the live webinar registration link directly.
    const handleWatchWebinar = () => {
        if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', 'InitiateCheckout');
        }
        window.open('https://learn.leanmultiverse.com/l/074e467c4a', '_blank', 'noopener,noreferrer')
    }

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: shimmerStyle }} />
            {/* Button visible in Navbar */}
            {source === "hero" ?
                <Button
                    className={`relative text-white rounded-full px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold border-2 border-white/30 transition-all duration-300 w-full sm:w-auto ${isMobile ? 'bg-white/15' : 'bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-white/50 hover:shadow-2xl hover:shadow-white/20'}`}
                    data-cursor-hover
                    onClick={handleRedirect}
                >
                    <span className="relative z-10 flex items-center gap-2">
                        <span>Book Webinar</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </span>
                </Button>
                : source === "new-hero" ?
                    <Button
                        className="relative overflow-hidden w-full sm:w-64 bg-amber-400 hover:bg-amber-500 text-white font-black text-base md:text-lg px-8 py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95 h-auto"
                        onClick={handleWatchWebinar}
                    >
                        <span className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent" style={{ animation: 'shimmer 2s infinite' }} />
                        <span className="relative z-10">Book Webinar</span>
                    </Button>
                    : source === "sticky-bar" ?
                        <Button
                            onClick={handleWatchWebinar}
                            className="relative overflow-hidden bg-amber-400 hover:bg-amber-500 text-white text-[15px] font-black px-10 py-3 rounded-xl transition-all duration-200 shadow-md border border-transparent transform hover:scale-[1.02] h-auto"
                        >
                            <span className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent" style={{ animation: 'shimmer 2s infinite' }} />
                            <span className="relative z-10">Book Webinar</span>
                        </Button>
                        :
                        <Button
                            onClick={handleRedirect}
                            className={
                                isMobile
                                    ? 'w-full rounded-full bg-white/20 border border-white/30 text-white font-semibold py-2 px-5 shadow-md transition'
                                    : 'hidden md:inline-flex rounded-full bg-white/20 border border-white/30 text-white font-semibold py-2 px-5 shadow-md transition'
                            }
                        >
                            Book Webinar
                        </Button>
            }

        </>
    )
}
