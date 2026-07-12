import { Metadata } from 'next'
import { NewAnnouncementBanner } from '@/components/new-ui/NewAnnouncementBanner'
import NewNavbar from '@/components/new-ui/NewNavbar'
import { NewFooter } from '@/components/new-ui/NewFooter'
import CourseLandingClient from '@/components/course-landing/CourseLandingClient'
import { safeAPMData } from '@/data/courseLandingData'

export const metadata: Metadata = {
  title: safeAPMData.metaTitle,
  description: safeAPMData.metaDescription,
  keywords: ['SAFe APM', 'Agile Product Management', 'Design Thinking', 'Product Strategy', 'SAFe Certification', 'LeanMultiverse'],
  openGraph: {
    title: safeAPMData.metaTitle,
    description: safeAPMData.metaDescription,
    type: 'website',
    url: 'https://leanmultiverse.com/courses/safe-apm',
  },
  alternates: {
    canonical: 'https://leanmultiverse.com/courses/safe-apm',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: safeAPMData.title,
  description: safeAPMData.metaDescription,
  provider: {
    '@type': 'Organization',
    name: 'LeanMultiverse University',
    url: 'https://leanmultiverse.com',
  },
  offers: {
    '@type': 'Offer',
    price: '50000',
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
  },
  timeRequired: 'P3D',
  courseMode: 'online',
}

export default function SafeAPMPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative w-full min-h-screen bg-white text-gray-900 flex flex-col">
        <NewAnnouncementBanner />
        <NewNavbar />
        <CourseLandingClient data={safeAPMData} />
        <NewFooter />
      </main>
    </>
  )
}
