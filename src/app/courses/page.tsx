import { Metadata } from 'next'
import CoursesPageClient from './CoursesPageClient'

export const metadata: Metadata = {
  title: 'Career Starter Courses | LeanMultiverse',
  description: 'Explore our comprehensive career starter programs in AI/ML, Cloud & DevOps, Business Analysis, AI Product Management, and AI Project Management. ₹2,499 only.',
  keywords: [
    'Career Courses',
    'AI ML Course',
    'Cloud DevOps Training',
    'Business Analyst Course',
    'Product Management',
    'Project Management',
    'Career Transition',
    'LeanMultiverse'
  ]
}

export default function CoursesPage() {
  return <CoursesPageClient />
}
