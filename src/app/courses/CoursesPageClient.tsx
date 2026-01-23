'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Search,
  Clock,
  Award,
  TrendingUp,
  ArrowRight,
  Filter,
  Calendar
} from 'lucide-react'
import { careerStarterCourses } from '@/data/careerStarterCourses'

/* ------------------------------------------------------------------ */
/* Helpers: category & icon mapping (single source of truth)           */
/* ------------------------------------------------------------------ */

const COURSE_META: Record<
  string,
  { category: string; icon: string }
> = {
  'ai-ml-foundation': {
    category: 'AI & Technology',
    icon: '🤖'
  },
  'cloud-devops': {
    category: 'Cloud & DevOps',
    icon: '☁️'
  },
  'business-analyst': {
    category: 'Business Analysis',
    icon: '📊'
  },
  'ai-product-management': {
    category: 'AI & Management',
    icon: '🎯'
  },
  'ai-project-management': {
    category: 'AI & Management',
    icon: '📈'
  }
}

const CATEGORIES = [
  'All',
  'AI & Technology',
  'Cloud & DevOps',
  'Business Analysis',
  'AI & Management'
]

/* ------------------------------------------------------------------ */
/* Derived UI-ready course list                                        */
/* ------------------------------------------------------------------ */

const allCourses = Array.from(
    new Map(
      careerStarterCourses.map(course => [course.id, course])
    ).values()
  ).map(course => {
    const meta = COURSE_META[course.id]
  
    return {
      ...course,
      category: meta?.category ?? 'Other',
      icon: meta?.icon ?? '📘',
      description: course.goal[0],
      highlights: course.goal.slice(1, 5)
    }
  })
  

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export default function CoursesPageClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredCourses = useMemo(() => {
    const q = searchQuery.toLowerCase()

    return allCourses.filter(course => {
      const matchesSearch =
        course.title.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q)

      const matchesCategory =
        selectedCategory === 'All' ||
        course.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  console.log(filteredCourses)

  return (
    <div className="min-h-screen bg-black">
      {/* -------------------------------------------------------------- */}
      {/* Hero Section                                                   */}
      {/* -------------------------------------------------------------- */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 via-yellow-500/10 to-amber-600/10" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Career Starter
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-400 mt-2">
                Programs
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Transform your career with our 4-week programs. From zero to decision-ready.
            </p>

            {/* Search */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-yellow-500/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Filter className="w-5 h-5 text-yellow-400" />
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-black'
                      : 'bg-zinc-900 border border-yellow-500/20 text-slate-300 hover:border-yellow-500/40'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* Courses Grid                                                   */}
      {/* -------------------------------------------------------------- */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredCourses.length === 0 ? (
            <p className="text-center text-slate-400 text-xl">
              No courses found.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="group relative"
                >
                  <div className="relative bg-zinc-950 border border-yellow-500/20 rounded-2xl p-6 h-full flex flex-col hover:border-yellow-500/40 transition">
                    {/* Icon & Category */}
                    <div className="flex justify-between mb-4">
                      <span className="text-4xl">{course.icon}</span>
                      <span className="text-xs text-yellow-400 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                        {course.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3">
                      {course.shortTitle}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    {/* Meta */}
                    <div className="space-y-2 mb-4 text-sm text-slate-300">
                      <div className="flex gap-2">
                        <Clock className="w-4 h-4 text-yellow-400" />
                        {course.duration}
                      </div>
                      <div className="flex gap-2">
                        <Calendar className="w-4 h-4 text-yellow-400" />
                        {course.schedule}
                      </div>
                      <div className="flex gap-2">
                        <Award className="w-4 h-4 text-yellow-400" />
                        Certificate Included
                      </div>
                    </div>

                    {/* Highlights */}
                    <ul className="mb-6 space-y-2 text-xs text-slate-400 flex-grow">
                      {course.highlights.slice(0, 3).map((h, i) => (
                        <li key={i} className="flex gap-2">
                          <TrendingUp className="w-3 h-3 text-yellow-400 mt-0.5" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* Price */}
                    <div className="mb-4 flex items-baseline gap-2">
                      <span className="line-through text-slate-500 text-sm">
                        ₹{course.originalPrice}
                      </span>
                      <span className="text-2xl font-bold text-yellow-400">
                        ₹{course.price}
                      </span>
                    </div>

                    {/* CTA */}
                    <Link
                      href={`/courses/${course.slug}`}
                      className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-black rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg"
                    >
                      Know More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
