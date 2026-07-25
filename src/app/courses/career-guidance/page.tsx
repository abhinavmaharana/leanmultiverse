import { Metadata } from 'next'
import { NewAnnouncementBanner } from '@/components/new-ui/NewAnnouncementBanner'
import NewNavbar from '@/components/new-ui/NewNavbar'
import { NewFooter } from '@/components/new-ui/NewFooter'
import CourseLandingClient from '@/components/course-landing/CourseLandingClient'
import { careerGuidanceData } from '@/data/courseLandingData'

export const metadata: Metadata = {
  title: careerGuidanceData.metaTitle,
  description: careerGuidanceData.metaDescription,
  keywords: ['Career Guidance', 'Career Mentorship', 'Product Manager', 'Project Manager', 'Business Analyst', 'LeanMultiverse'],
  openGraph: {
    title: careerGuidanceData.metaTitle,
    description: careerGuidanceData.metaDescription,
    type: 'website',
    url: 'https://leanmultiverse.com/courses/career-guidance',
  },
  alternates: {
    canonical: 'https://leanmultiverse.com/courses/career-guidance',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: careerGuidanceData.title,
  description: careerGuidanceData.metaDescription,
  provider: {
    '@type': 'Organization',
    name: 'LeanMultiverse University',
    url: 'https://leanmultiverse.com',
  },
  courseMode: 'online',
}

export default function CareerGuidancePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative w-full min-h-screen bg-white text-gray-900 flex flex-col">
        <NewAnnouncementBanner />
        <NewNavbar />
        <CourseLandingClient data={careerGuidanceData} />
        <NewFooter />
      </main>
    </>
  )
}
