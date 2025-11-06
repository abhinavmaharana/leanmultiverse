import { Metadata } from 'next'
import BookWebinarClient from './BookWebinarClient'

export const metadata: Metadata = {
  title: 'Book Webinar - Lean Multiverse',
  description: 'Book your spot for our exclusive webinar on enterprise agility and digital transformation',
}

export default function BookWebinarPage() {
  return (
    <main className="relative w-full min-h-screen text-white bg-black">
      <BookWebinarClient />
    </main>
  )
}

