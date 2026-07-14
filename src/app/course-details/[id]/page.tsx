import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { courses, Course } from '@/data/courses'
import CourseDetailClient from './CourseDetailClient'

interface CourseDetailPageProps {
  params: Promise<{
    id: string
  }>
}

// Generate metadata for each course
export async function generateMetadata({ params }: CourseDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const courseId = parseInt(id)
  const course = courses.find((c: Course) => c.id === courseId)
  
  if (!course) {
    return {
      title: 'Course Not Found | LeanMultiverse',
      description: 'The requested course could not be found.'
    }
  }

  return {
    title: `${course.title} | LeanMultiverse`,
    description: course.description,
    keywords: [
      course.title,
      course.category,
      ...course.skills,
      
      'Agile',
      'Lean',
      'Training',
      'Certification',
      'LeanMultiverse'
    ],
    openGraph: {
      title: `${course.title} | LeanMultiverse`,
      description: course.description,
      type: 'website',
      images: [
        {
          url: '/course-banner.jpg',
          width: 1200,
          height: 630,
          alt: course.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${course.title} | LeanMultiverse`,
      description: course.description,
      images: ['/course-banner.jpg']
    }
  }
}

// Generate static params for all courses
export async function generateStaticParams() {
  return courses.map((course: Course) => ({
    id: course.id.toString(),
  }))
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { id } = await params
  const courseId = parseInt(id)
  const course = courses.find((c: Course) => c.id === courseId)
  
  if (!course) {
    notFound()
  }

  return <CourseDetailClient course={course} />
}
