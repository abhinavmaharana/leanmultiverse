import { Metadata } from 'next'
import { NewAnnouncementBanner } from '@/components/new-ui/NewAnnouncementBanner'
import NewNavbar from '@/components/new-ui/NewNavbar'
import { NewFooter } from '@/components/new-ui/NewFooter'
import CourseLandingClient from '@/components/course-landing/CourseLandingClient'
import { safePOPMData } from '@/data/courseLandingData'

export const metadata: Metadata = {
  title: safePOPMData.metaTitle,
  description: safePOPMData.metaDescription,
  keywords: ['SAFe POPM', 'SAFe Certification', 'Product Owner', 'Product Manager', 'PI Planning', 'Agile Release Train', 'LeanMultiverse'],
  openGraph: {
    title: safePOPMData.metaTitle,
    description: safePOPMData.metaDescription,
    type: 'website',
    url: 'https://leanmultiverse.com/courses/safe-popm',
  },
  alternates: {
    canonical: 'https://leanmultiverse.com/courses/safe-popm',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: safePOPMData.title,
  description: safePOPMData.metaDescription,
  provider: {
    '@type': 'Organization',
    name: 'LeanMultiverse University',
    url: 'https://leanmultiverse.com',
  },
  offers: {
    '@type': 'Offer',
    price: '35000',
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
  },
  timeRequired: 'P2D',
  courseMode: 'online',
}

export default function SafePOPMPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative w-full min-h-screen bg-white text-gray-900 flex flex-col">
        <NewAnnouncementBanner />
        <NewNavbar />
        <CourseLandingClient data={safePOPMData} />
        <NewFooter />
      </main>
    </>
  )
}
