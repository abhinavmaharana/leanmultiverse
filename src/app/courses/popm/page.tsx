import { Metadata } from 'next'
import { NewAnnouncementBanner } from '@/components/new-ui/NewAnnouncementBanner'
import NewNavbar from '@/components/new-ui/NewNavbar'
import { NewFooter } from '@/components/new-ui/NewFooter'
import CourseLandingClient from '@/components/course-landing/CourseLandingClient'
import { popmData } from '@/data/courseLandingData'

export const metadata: Metadata = {
  title: popmData.metaTitle,
  description: popmData.metaDescription,
  keywords: ['POPM', 'POPM Certification', 'Product Owner', 'Product Manager', 'PI Planning', 'Agile Release Train', 'LeanMultiverse'],
  openGraph: {
    title: popmData.metaTitle,
    description: popmData.metaDescription,
    type: 'website',
    url: 'https://leanmultiverse.com/courses/popm',
  },
  alternates: {
    canonical: 'https://leanmultiverse.com/courses/popm',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: popmData.title,
  description: popmData.metaDescription,
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

export default function POPMPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative w-full min-h-screen bg-white text-gray-900 flex flex-col">
        <NewAnnouncementBanner />
        <NewNavbar />
        <CourseLandingClient data={popmData} />
        <NewFooter />
      </main>
    </>
  )
}
