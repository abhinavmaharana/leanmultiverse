import { Metadata } from 'next'
import './book-webinar.css'
import BookWebinarClient from './BookWebinarClient'

export const metadata: Metadata = {
  title: 'Book Webinar - Strategic Career Accelerator | Lean Multiverse',
  description: 'Reserve your seat for the Strategic Career Accelerator webinar. Learn how to break into Product, Project and AI roles in top companies.',
}

export default function BookWebinarPage() {
  return <BookWebinarClient />
}

