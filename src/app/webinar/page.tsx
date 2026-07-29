import { Metadata } from 'next'
import { NewAnnouncementBanner } from '@/components/new-ui/NewAnnouncementBanner'
import NewNavbar from '@/components/new-ui/NewNavbar'
import { NewFooter } from '@/components/new-ui/NewFooter'
import WebinarClient from './WebinarClient'

export const metadata: Metadata = {
  title: 'Webinar: Product, Project & Program Management Career Roadmap | Lean Multiverse',
  description: 'Join our webinar on transitioning into Product, Project, and Program Management roles, with AI skills for managers. Every Saturday at 8 PM IST.',
  keywords: ['Webinar', 'Product Manager', 'Project Manager', 'Program Management', 'Career Roadmap', 'LeanMultiverse'],
  openGraph: {
    title: 'Webinar: Product, Project & Program Management Career Roadmap',
    description: 'Join our webinar on transitioning into Product, Project, and Program Management roles, with AI skills for managers.',
    type: 'website',
    url: 'https://leanmultiverse.com/webinar',
  },
  alternates: {
    canonical: 'https://leanmultiverse.com/webinar',
  },
}

export default function WebinarPage() {
  return (
    <main className="relative w-full min-h-screen bg-white text-gray-900 flex flex-col">
      <NewAnnouncementBanner />
      <NewNavbar />
      <WebinarClient />
      <NewFooter />
    </main>
  )
}
