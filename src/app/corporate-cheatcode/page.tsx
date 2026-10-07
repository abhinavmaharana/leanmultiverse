import type { Metadata } from 'next'
import { NewFooter } from '@/components/new-ui/NewFooter'
import { BOOK } from '@/config/book'
import CheatcodeClient from './CheatcodeClient'

const PAGE_URL = 'https://leanmultiverse.com/corporate-cheatcode'
const TITLE = `${BOOK.title} by ${BOOK.author} — ${BOOK.subtitle}`
const DESCRIPTION =
  "Corporate doesn't reward effort. Corporate rewards proof of effort. Eight cheatcodes on boundaries, visibility, politics, skills, proof, strategic exits, mental health and choosing yourself. Paperback on Amazon.in."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'Corporate Cheatcode',
    'Nitesh book',
    'corporate wala youtuber book',
    'corporate survival guide',
    'career book India',
    'office politics book',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    url: PAGE_URL,
    images: [{ url: '/book/og.jpg', width: 1200, height: 630, alt: `${BOOK.title} by ${BOOK.author}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/book/og.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: `${BOOK.title}- ${BOOK.subtitle}`,
  author: { '@type': 'Person', name: BOOK.author },
  publisher: { '@type': 'Organization', name: BOOK.publisher },
  datePublished: '2026-04-01',
  inLanguage: 'en',
  bookFormat: 'https://schema.org/Paperback',
  numberOfPages: BOOK.pages,
  isbn: BOOK.isbn13.replace(/-/g, ''),
  image: 'https://leanmultiverse.com/book/cover-front.webp',
  description: DESCRIPTION,
  url: PAGE_URL,
  offers: {
    '@type': 'Offer',
    price: BOOK.price,
    priceCurrency: 'INR',
    url: BOOK.amazonUrl,
  },
}

export default function CorporateCheatcodePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="relative w-full min-h-screen bg-[#070B14] text-white flex flex-col overflow-x-hidden">
        <CheatcodeClient />
        <NewFooter />
      </main>
    </>
  )
}
