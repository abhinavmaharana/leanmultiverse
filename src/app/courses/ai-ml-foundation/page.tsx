import { Metadata } from 'next'
import AiMlCourseClient from './AiMlCourseClient'

export const metadata: Metadata = {
  title: 'AI & Machine Learning – Career Foundation Program | LeanMultiverse',
  description: 'A comprehensive 1-month program designed to give learners a strong foundation in AI and ML, with career clarity and real-world application focus. Duration: 4 Weeks | Fee: ₹2,499',
  keywords: [
    'AI Course',
    'Machine Learning',
    'AI Career Foundation',
    'Artificial Intelligence Training',
    'ML Certification',
    'AI for Beginners',
    'Career Foundation',
    'LeanMultiverse',
    'AI Career Path',
    'Generative AI',
    'No-Code AI',
    'Prompt Engineering'
  ],
  openGraph: {
    title: 'AI & Machine Learning – Career Foundation Program | LeanMultiverse',
    description: '1-Month Career Foundation Program in AI & ML. Get certified and build your AI career with practical, industry-focused learning. ₹2,499 only.',
    type: 'website',
    images: [
      {
        url: '/ai-ml-course-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'AI & Machine Learning Career Foundation Program'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI & Machine Learning – Career Foundation Program | LeanMultiverse',
    description: '1-Month Career Foundation Program in AI & ML. Get certified and build your AI career.',
    images: ['/ai-ml-course-banner.jpg']
  }
}

export default function AiMlCoursePage() {
  return <AiMlCourseClient />
}
