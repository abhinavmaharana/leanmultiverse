'use client'

import { useEffect, useMemo, useState } from 'react'
import { format } from 'date-fns'
import BookWebinarModal from '@/components/webinar/BookWebinarModal'
import { CheckCircle2, Calendar, Clock } from 'lucide-react'
import { getAvailableDatesPaid } from '@/lib/webinar-config'

const AGENDA_ITEMS = [
    'Transition to Product / Project roles and leverage your experience for PM careers.',
    'AI skills for managers: ChatGPT, automation and tools used in MNCs.',
    'Resume and LinkedIn positioning to get interviews at top companies.',
    'Practical frameworks used by professionals at firms like Deloitte and JPMorgan.',
]

export function NewHero() {
    const [mounted, setMounted] = useState(false)
    useEffect(() => { setMounted(true) }, [])
    const nextSessionDate = useMemo(() => getAvailableDatesPaid()[0], [])

    return (
        <section id="home" className="w-full pt-12 pb-10 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                
    

                {/* Main Headline - Reduced font size and tighter leading */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-[1.15] mb-6">
                    From Product & Program Manager to <br className="hidden md:block" />
                    <span className="text-amber-400">Director, CEO & AI Expert</span> — <br className="hidden md:block" />
                    Your Leadership Roadmap.
                </h1>

                {/* Webinar Schedule - date/time is the single most important conversion element for a live session */}
                <div className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 bg-amber-50 border border-amber-200 rounded-full px-5 py-2.5 mb-6 text-xs md:text-sm font-bold text-amber-800">
                    <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        Every Saturday
                    </span>
                    <span className="text-amber-300">•</span>
                    <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        8:00 PM IST
                    </span>
                    {mounted && nextSessionDate && (
                        <>
                            <span className="text-amber-300">•</span>
                            <span>Next session: {format(nextSessionDate, 'EEE, MMM d')}</span>
                        </>
                    )}
                </div>

                {/* Decorative Divider */}
                <div className="text-gray-200 text-2xl mb-6 select-none leading-none">⸻</div>

                {/* Core Message - Optimized sizes */}
                <div className="max-w-2xl mx-auto space-y-3 mb-8">
                    <p className="text-lg md:text-xl font-bold text-gray-800">
                        Stop guessing your next move.
                    </p>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed px-4">
                        Start building the skills companies actually promote to leadership for — <span className="text-gray-900 font-bold">Product, Program & AI.</span>
                    </p>
                </div>

                {/* Key Value Pillars - More compact */}
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-10">
                    {[
                        'Industry-recognised certifications.',
                        'Structured roadmap.',
                        'Real mentorship.',
                        'Real transformation.'
                    ].map((text, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                            <span className="text-xs md:text-sm font-semibold text-gray-700">{text}</span>
                        </div>
                    ))}
                </div>

                {/* Agenda - what's actually covered in the session */}
                <div className="max-w-2xl mx-auto mb-10">
                    <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-4">In This Session</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                        {AGENDA_ITEMS.map((item, i) => (
                            <div key={i} className="flex items-start gap-2.5 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                                <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                                <span className="text-xs md:text-sm text-gray-700 font-medium leading-snug">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Primary CTA - Resized for better fit and mobile responsiveness */}
                <div className="mb-20 md:mb-24 flex justify-center">
                    <BookWebinarModal source="new-hero" />
                </div>

                {/* Social Proof & Impact Stats - Cleaned up spacing */}
                <div className="grid grid-cols-3 gap-2 md:gap-4 pt-12 border-t border-gray-100">
                    <div className="flex flex-col items-center">
                        <span className="text-lg md:text-2xl font-black text-gray-900">200K+</span>
                        <span className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1 text-center leading-tight">Webinar <br className="md:hidden" /> Attendees</span>
                    </div>
                    <div className="flex flex-col items-center border-x border-gray-100 px-2">
                        <span className="text-lg md:text-2xl font-black text-gray-900">100K+</span>
                        <span className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1 text-center leading-tight">Certified <br className="md:hidden" /> Pros</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-lg md:text-2xl font-black text-gray-900">1M+</span>
                        <span className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1 text-center leading-tight">Social <br className="md:hidden" /> Reach</span>
                    </div>
                </div>

                <div className="mt-8 p-5 bg-gray-50 rounded-xl border border-gray-100 max-w-3xl mx-auto">
                    <p className="text-xs md:text-sm text-gray-600 font-medium leading-relaxed italic">
                        "Mentored top leadership and helped professionals transition into management and executive roles across the globe."
                    </p>
                </div>

            </div>
        </section>
    )
}
