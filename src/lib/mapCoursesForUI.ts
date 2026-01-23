import { Course } from '@/data/courses'

export const mapCoursesForUI = (courses: Course[]) => {
  return courses.map(course => ({
    id: course.id,
    slug: course.shortTitle
      .toLowerCase()
      .replace(/™/g, '')
      .replace(/[^a-z0-9]+/g, '-'),

    title: course.title,
    shortTitle: course.shortTitle,

    price: course.price,
    originalPrice: course.originalPrice,

    duration: course.duration,

    // Fake schedule only for UI consistency
    schedule:
      course.category === 'Webinar'
        ? 'Live Session'
        : 'Self-Paced',

    category: course.category,

    description: course.description,

    highlights: course.highlights,

    icon: getIcon(course),

    certificate: true
  }))
}

const getIcon = (course: Course) => {
  if (course.category === 'Webinar') return '🎙️'
  if (course.category.includes('₹500')) return '🚀'
  if (course.category.includes('₹3999')) return '🎓'
  if (course.category.includes('₹5999')) return '🏆'
  return '📘'
}
