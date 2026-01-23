'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Search,
  BookOpen,
  Clock,
  IndianRupee,
  Award,
  TrendingUp,
  ArrowRight,
  Filter,
  Calendar
} from 'lucide-react'
import { careerStarterCourses } from '@/data/careerStarterCourses'

const allCourses = [
  {
    id: 'ai-ml-foundation',
    slug: 'ai-ml-foundation',
    title: 'AI & Machine Learning – Career Foundation Program',
    shortTitle: 'AI & ML Career Foundation',
    price: 2499,
    originalPrice: 4999,
    duration: '1 Month',
    schedule: 'Friday, Saturday, Sunday',
    timePerWeek: 'Flexible',
    totalHours: '12+ Hours',
    category: 'AI & Technology',
    icon: '🤖',
    description: 'Master AI fundamentals, discover your career path, and build real-world projects. No coding required!',
    highlights: [
      'Clear understanding of AI & ML',
      'Career path identification',
      'Resume-ready AI project',
      'Global certification roadmap'
    ]
  },
  ...careerStarterCourses.map(course => ({
    ...course,
    category: course.id === 'cloud-devops' ? 'Cloud & DevOps' : 
              course.id === 'business-analyst' ? 'Business Analysis' : 'AI & Management',
    icon: course.id === 'cloud-devops' ? '☁️' : 
          course.id === 'business-analyst' ? '📊' : 
          course.id === 'ai-product-management' ? '🎯' : '📈',
    description: course.goal[0],
    highlights: course.goal.slice(1, 5)
  }))
]

const categories = ['All', 'AI & Technology', 'Cloud & DevOps', 'Business Analysis', 'AI & Management']

export default function CoursesPageClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 via-yellow-500/10 to-amber-600/10" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
        </div>
        
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
              Transform your career with our comprehensive 4-week programs. From zero to decision-ready!
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-yellow-500/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 transition-colors"
                  data-testid="course-search"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Filter className="w-5 h-5 text-yellow-400" />
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-black'
                      : 'bg-zinc-900 border border-yellow-500/20 text-slate-300 hover:border-yellow-500/40'
                  }`}
                  data-testid={`filter-${category.toLowerCase()}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-400 text-xl">No courses found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                  
                  <div className="relative bg-zinc-950 border border-yellow-500/20 rounded-2xl p-6 hover:border-yellow-500/40 transition-all h-full flex flex-col">
                    {/* Course Icon & Category */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl">{course.icon}</span>
                      <span className="text-xs text-yellow-400 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                        {course.category}
                      </span>
                    </div>

                    {/* Course Title */}
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                      {course.shortTitle || course.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    {/* Course Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-slate-300 text-sm">
                        <Clock className="w-4 h-4 text-yellow-400" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300 text-sm">
                        <Calendar className="w-4 h-4 text-yellow-400" />
                        <span>{course.schedule}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300 text-sm">
                        <Award className="w-4 h-4 text-yellow-400" />
                        <span>Certificate Included</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-6 flex-grow">
                      <ul className="space-y-2">
                        {course.highlights.slice(0, 3).map((highlight, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-400 text-xs">
                            <TrendingUp className="w-3 h-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                            <span className="line-clamp-1">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-slate-400 line-through text-sm">₹{course.originalPrice}</span>
                      <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-400 flex items-center">
                      ₹{course.price}
                      </span>
                    </div>

                    {/* CTA Button */}
                    <Link
                      href={`/courses/${course.slug}`}
                      className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-black rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 group/btn"
                      data-testid={`course-card-${course.id}`}
                    >
                      Know More
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-4 bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Not Sure Which Course to Choose?
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              All courses are just ₹2,499 with lifetime access. Start with any course and upgrade later!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#courses"
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-black rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Browse All Courses
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-zinc-900 border border-yellow-500/30 text-white rounded-lg font-semibold hover:bg-yellow-500/10 transition-all"
              >
                Talk to Advisor
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
