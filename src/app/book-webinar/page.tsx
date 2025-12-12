import { Metadata } from 'next'
import BookWebinarClient from './BookWebinarClient'

export const metadata: Metadata = {
  title: 'Book Webinar - Product Manager | Project Manager | Program Management Career Roadmap',
  description: 'Want to move from your current job—sales, operations, support, HR, finance, tech—into high-growth management roles? Learn the exact pathways to become a Product Owner, Product Manager, Project Manager, or Program Manager.',
}

export default function BookWebinarPage() {
  return (
    <main className="relative w-full min-h-screen text-white bg-black">
      <BookWebinarClient />
    </main>
  )
}

