import { Metadata } from 'next'
import { NewAnnouncementBanner } from '@/components/new-ui/NewAnnouncementBanner'
import NewNavbar from '@/components/new-ui/NewNavbar'
import { NewFooter } from '@/components/new-ui/NewFooter'
import CourseLandingClient from '@/components/course-landing/CourseLandingClient'
import { scrumData } from '@/data/courseLandingData'

export const metadata: Metadata = {
  title: scrumData.metaTitle,
  description: scrumData.metaDescription,
  keywords: ['Scrum Certification', 'Scrum Master', 'Agile Training', 'Sprint Planning', 'Scrum Framework', 'LeanMultiverse'],
  openGraph: {
    title: scrumData.metaTitle,
    description: scrumData.metaDescription,
    type: 'website',
    url: 'https://leanmultiverse.com/courses/scrum',
  },
  alternates: {
    canonical: 'https://leanmultiverse.com/courses/scrum',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: scrumData.title,
  description: scrumData.metaDescription,
  provider: {
    '@type': 'Organization',
    name: 'LeanMultiverse University',
    url: 'https://leanmultiverse.com',
  },
  offers: {
    '@type': 'Offer',
    price: '25000',
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
  },
  timeRequired: 'P2D',
  courseMode: 'online',
}

export default function ScrumPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative w-full min-h-screen bg-white text-gray-900 flex flex-col">
        <NewAnnouncementBanner />
        <NewNavbar />
        <CourseLandingClient data={scrumData} />
        <NewFooter />
      </main>
    </>
  )
}
