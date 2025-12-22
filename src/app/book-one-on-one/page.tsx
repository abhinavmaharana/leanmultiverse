import { Metadata } from 'next'
import BookOneOnOneClient from './BookOneOnOneClient'

export const metadata: Metadata = {
  title: 'Book One-on-One Session - Personalized Career Guidance',
  description: 'Book a personalized one-on-one session with our experts. Get tailored advice for your career growth in Product Management, Project Management, and Program Management.',
}

export default function BookOneOnOnePage() {
  return (
    <main className="relative w-full min-h-screen text-white bg-black">
      <BookOneOnOneClient />
    </main>
  )
}

