import { Caveat } from 'next/font/google'
import { Crown } from 'lucide-react'

const script = Caveat({ subsets: ['latin'], weight: ['500'], display: 'swap' })

export function NewTopBar() {
    return (
        <div className="w-full bg-[#0B1220] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-center xl:justify-between gap-4">
                <div className="hidden xl:block flex-1" aria-hidden="true" />

                <div className="flex items-center justify-center gap-2.5 text-[11px] sm:text-sm font-medium text-center xl:whitespace-nowrap xl:flex-shrink-0">
                    <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0" />
                    <span>
                        Asia&apos;s Top Management Transformation Platform
                        <span className="hidden lg:inline">
                            <span className="mx-3 text-white/40">|</span>
                            Empowering Professionals to Build High-Impact Careers
                        </span>
                    </span>
                </div>

                <span className={`${script.className} hidden xl:block flex-1 text-right text-base text-amber-200/90 whitespace-nowrap`}>
                    Better Careers. A Brighter You.
                </span>
            </div>
        </div>
    )
}
