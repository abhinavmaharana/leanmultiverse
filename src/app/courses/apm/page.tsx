import { Metadata } from 'next'
import { NewAnnouncementBanner } from '@/components/new-ui/NewAnnouncementBanner'
import NewNavbar from '@/components/new-ui/NewNavbar'
import { NewFooter } from '@/components/new-ui/NewFooter'
import CourseLandingClient from '@/components/course-landing/CourseLandingClient'
import { apmData } from '@/data/courseLandingData'

export const metadata: Metadata = {
  title: apmData.metaTitle,
  description: apmData.metaDescription,
  keywords: ['APM', 'Agile Product Management', 'Design Thinking', 'Product Strategy', 'APM Certification', 'LeanMultiverse'],
  openGraph: {
    title: apmData.metaTitle,
    description: apmData.metaDescription,
    type: 'website',
    url: 'https://leanmultiverse.com/courses/apm',
  },
  alternates: {
    canonical: 'https://leanmultiverse.com/courses/apm',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: apmData.title,
  description: apmData.metaDescription,
  provider: {
    '@type': 'Organization',
    name: 'LeanMultiverse University',
    url: 'https://leanmultiverse.com',
  },
  offers: {
    '@type': 'Offer',
    price: '150000',
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
  },
  timeRequired: 'P3D',
  courseMode: 'online',
}

export default function APMPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative w-full min-h-screen bg-white text-gray-900 flex flex-col">
        <NewAnnouncementBanner />
        <NewNavbar />
        <CourseLandingClient data={apmData} />
        <NewFooter />
      </main>
    </>
  )
}
