import { Metadata } from 'next'
import BookFreeWebinarClient from './BookFreeWebinarClient'

export const metadata: Metadata = {
  title: 'Free Webinar - Product Manager | Project Manager | Program Management Career Roadmap',
  description: 'Register for our free webinar. Want to move from your current job—sales, operations, support, HR, finance, tech—into high-growth management roles? Learn the exact pathways to become a Product Owner, Product Manager, Project Manager, or Program Manager. No payment required.',
}

export default function BookFreeWebinarPage() {
  return (
    <main className="relative w-full min-h-screen text-white bg-black">
      <BookFreeWebinarClient />
    </main>
  )
}
