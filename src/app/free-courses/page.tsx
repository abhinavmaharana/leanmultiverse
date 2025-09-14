import { Metadata } from 'next'
import Footer from '../../components/shared/Footer'
import FreeCourses from '../../components/landing/FreeCourses'
import FreeCoursesClient from './FreeCoursesClient'

export const metadata: Metadata = {
  title: "Free Courses - Master New Skills for Free",
  description: "Explore our collection of premium-quality free courses in enterprise agility, digital transformation, and modern leadership. No hidden fees, no commitments - just world-class education.",
  keywords: [
    "free courses",
    "enterprise agility free",
    "digital transformation free",
    "lean six sigma free",
    "agile project management free",
    "leadership development free",
    "online learning free",
    "professional development free"
  ],
  openGraph: {
    title: "Free Courses - Master New Skills for Free",
    description: "Explore our collection of premium-quality free courses in enterprise agility, digital transformation, and modern leadership.",
    type: "website",
    url: "https://leanmultiverse.com/free-courses",
  },
}

export default function FreeCoursesPage() {
  return (
    <>
      <FreeCoursesClient />
      <FreeCourses />
      <Footer />
    </>
  )
}