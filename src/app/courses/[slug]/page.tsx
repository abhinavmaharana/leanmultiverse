import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { careerStarterCourses, CareerStarterCourse } from '@/data/careerStarterCourses'
import DynamicCourseClient from './DynamicCourseClient'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'

// Generate static params for all courses
export async function generateStaticParams() {
  return careerStarterCourses.map((course) => ({
    slug: course.slug,
  }))
}

// Generate metadata for each course
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const course = careerStarterCourses.find(c => c.slug === slug)
  
  if (!course) {
    return {
      title: 'Course Not Found | LeanMultiverse'
    }
  }

  return {
    title: `${course.title} | LeanMultiverse`,
    description: `${course.goal[0]} Duration: ${course.duration} | Fee: ₹${course.price}`,
    keywords: [
      course.shortTitle,
      'Career Starter',
      'LeanMultiverse',
      'Online Course',
      'Certification',
      'Career Development'
    ],
    openGraph: {
      title: `${course.title} | LeanMultiverse`,
      description: `${course.goal[0]} | ${course.duration} | ₹${course.price}`,
      type: 'website',
    }
  }
}

function CourseJsonLd({ course }: { course: CareerStarterCourse }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.goal?.[0] ?? course.title,
    provider: {
      '@type': 'Organization',
      name: 'LeanMultiverse University',
      url: 'https://leanmultiverse.com',
    },
    offers: {
      '@type': 'Offer',
      price: course.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    ...(course.duration && { timeRequired: course.duration }),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default async function DynamicCoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const course = careerStarterCourses.find(c => c.slug === slug)
  
  if (!course) {
    notFound()
  }

  return (
    <>
      <CourseJsonLd course={course} />
      <Navbar />
      <DynamicCourseClient course={course} />
      <Footer />
    </>
  )
}
