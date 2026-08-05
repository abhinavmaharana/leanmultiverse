import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NewAnnouncementBanner } from '@/components/new-ui/NewAnnouncementBanner'
import NewNavbar from '@/components/new-ui/NewNavbar'
import { NewFooter } from '@/components/new-ui/NewFooter'
import CourseLandingClient from '@/components/course-landing/CourseLandingClient'
import { fitnessData } from '@/data/courseLandingData'

export const metadata: Metadata = {
  title: fitnessData.metaTitle,
  description: fitnessData.metaDescription,
  keywords: ['Fitness Coaching', 'Yuvraj Anand', 'Personal Training', 'On-Demand Fitness', 'LeanMultiverse'],
  openGraph: {
    title: fitnessData.metaTitle,
    description: fitnessData.metaDescription,
    type: 'website',
    url: 'https://leanmultiverse.com/courses/fitness',
  },
  alternates: {
    canonical: 'https://leanmultiverse.com/courses/fitness',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: fitnessData.title,
  description: fitnessData.metaDescription,
  provider: {
    '@type': 'Organization',
    name: 'LeanMultiverse University',
    url: 'https://leanmultiverse.com',
  },
  courseMode: 'online',
}

export default function FitnessPage() {
  notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative w-full min-h-screen bg-white text-gray-900 flex flex-col">
        <NewAnnouncementBanner />
        <NewNavbar />
        <CourseLandingClient data={fitnessData} />
        <NewFooter />
      </main>
    </>
  )
}
