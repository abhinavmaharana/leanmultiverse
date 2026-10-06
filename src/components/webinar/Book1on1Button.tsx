import { PhoneCall } from 'lucide-react'
import { BOOK_1ON1_LINK } from '@/config/webinar'

// Sits next to the "Book Bootcamp" buttons and matches their size per placement.
// Book Bootcamp is a <button> (line-height 1.15 from the site reset); this is a link, so the same
// line-height is pinned below, and the 2px border is offset by 2px less padding on each side.
const VARIANTS = {
    // Border (4px) is offset by smaller padding so the height equals the borderless Book Bootcamp button; width matches its sm:w-64.
    hero: 'w-full sm:w-64 text-base px-8 py-[14px] rounded-xl hover:-translate-y-0.5',
    // Navbar Book Bootcamp renders at 16px with a 1px border, so 11px padding + our 2px border lines up with it.
    nav: 'text-base px-6 py-[11px] rounded-xl hover:scale-[1.02]',
    // The phone menu's Book Bootcamp uses the hero-size variant, so this one does too.
    'nav-mobile': 'w-full sm:w-64 text-base px-8 py-[14px] rounded-xl',
    sticky: 'text-sm md:text-base px-4 md:px-6 py-[10px] md:py-[14px] rounded-full hover:scale-[1.03]',
} as const

export default function Book1on1Button({ variant }: { variant: keyof typeof VARIANTS }) {
    return (
        <a
            href={BOOK_1ON1_LINK}
            target="_blank"
            rel="noopener noreferrer"
            // Inline colour: the antd reset's `a { color }` is unlayered and would beat Tailwind's text colour.
            style={{ color: '#111827' }}
            className={`inline-flex items-center justify-center gap-2 border-2 border-amber-400 bg-white hover:bg-amber-50 font-black leading-[1.15] whitespace-nowrap transition-all duration-200 active:scale-95 ${VARIANTS[variant]}`}
        >
            <PhoneCall className="w-4 h-4 flex-shrink-0" />
            Book 1:1
        </a>
    )
}
