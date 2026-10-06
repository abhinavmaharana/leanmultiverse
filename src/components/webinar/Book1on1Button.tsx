import { PhoneCall } from 'lucide-react'
import { BOOK_1ON1_LINK } from '@/config/webinar'

// Sits next to the "Book Bootcamp" buttons and matches their size per placement.
const VARIANTS = {
    hero: 'w-full sm:w-auto text-base md:text-lg px-8 py-4 rounded-xl hover:-translate-y-0.5',
    nav: 'text-[15px] px-6 py-3 rounded-xl hover:scale-[1.02]',
    'nav-mobile': 'w-full text-[15px] px-6 py-3 rounded-xl',
    sticky: 'text-sm md:text-base px-4 md:px-6 py-3 md:py-4 rounded-full hover:scale-[1.03]',
} as const

export default function Book1on1Button({ variant }: { variant: keyof typeof VARIANTS }) {
    return (
        <a
            href={BOOK_1ON1_LINK}
            target="_blank"
            rel="noopener noreferrer"
            // Inline colour: the antd reset's `a { color }` is unlayered and would beat Tailwind's text colour.
            style={{ color: '#111827' }}
            className={`inline-flex items-center justify-center gap-2 border-2 border-amber-400 bg-white hover:bg-amber-50 font-black whitespace-nowrap transition-all duration-200 active:scale-95 ${VARIANTS[variant]}`}
        >
            <PhoneCall className="w-4 h-4 flex-shrink-0" />
            Book 1:1
        </a>
    )
}
