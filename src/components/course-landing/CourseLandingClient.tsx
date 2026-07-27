'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Carousel, Modal } from 'antd'
import {
  CheckCircle2,
  Star,
  Clock,
  Award,
  Users,
  Plus,
  X,
  ArrowRight,
  TrendingUp,
  Calendar,
  Linkedin,
  PhoneCall,
  ChevronDown,
  Sparkles,
  BadgeCheck,
  UserPlus,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { CourseLandingData, valuePropositions, platformPromises } from '@/data/courseLandingData'
import { testimonials } from '@/data/testimonials'
import { courses } from '@/data/courses'
import BookWebinarModal from '@/components/webinar/BookWebinarModal'

/* ─── Subscribe CTA ───────────────────────────────────────────────────────── */
// Not open for enrollment yet — render as a non-interactive "Coming Soon" badge.
function ClaimSpotButton({
  className = '',
  size = 'default',
}: {
  className?: string
  size?: 'default' | 'large' | 'small'
}) {
  const sizeClasses = {
    small: 'px-6 py-2.5 text-sm',
    default: 'px-8 py-3.5 text-base',
    large: 'px-12 py-4 text-lg',
  }
  return (
    <span
      aria-disabled="true"
      className={`inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-500 font-black rounded-full cursor-not-allowed select-none ${sizeClasses[size]} ${className}`}
    >
      Coming Soon
    </span>
  )
}

/* ─── Book 1:1 CTA ────────────────────────────────────────────────────────── */
function Book1on1Button({
  href,
  className = '',
  size = 'default',
}: {
  href: string
  className?: string
  size?: 'default' | 'large' | 'small'
}) {
  const sizeClasses = {
    small: 'px-6 py-2.5 text-sm',
    default: 'px-8 py-3.5 text-base',
    large: 'px-12 py-4 text-lg',
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-black rounded-full transition-all active:scale-95 shadow-md ${sizeClasses[size]} ${className}`}
    >
      <PhoneCall className="w-4 h-4" />
      Book 1:1
    </a>
  )
}

/* ─── Sticky CTA ──────────────────────────────────────────────────────────── */
function CourseStickyCTA({ courseName }: { courseName: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-4 left-0 right-0 z-[100] px-4 pointer-events-none"
        >
          <div className="max-w-2xl mx-auto bg-[#0F172A] border border-white/10 rounded-2xl md:rounded-full p-2.5 md:p-3 flex items-center justify-between shadow-2xl pointer-events-auto">
            <div className="flex items-center gap-3 pl-2">
              <div className="hidden sm:flex flex-col">
                <span className="text-white font-bold text-sm leading-tight">{courseName}</span>
                <span className="text-gray-400 text-xs">Live Instructor-Led Training</span>
              </div>
            </div>
            <div className="flex items-center gap-2 pr-1">
              <a
                href="tel:+917696627657"
                className="hidden sm:flex items-center gap-1.5 border border-white/20 text-white/80 text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-white/10 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Talk to Expert
              </a>
              <span
                aria-disabled="true"
                className="flex items-center gap-2 bg-gray-100 text-gray-500 font-black text-sm md:text-base px-6 md:px-8 py-2.5 md:py-3 rounded-full cursor-not-allowed select-none whitespace-nowrap"
              >
                Coming Soon
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─── Hero ────────────────────────────────────────────────────────────────── */
function CourseHero({ data }: { data: CourseLandingData }) {
  return (
    <section id="home" className="w-full bg-white overflow-hidden">
      {/* Photo background block */}
      <div className="relative w-full h-[85vh] md:min-h-[92vh] md:h-auto flex items-stretch md:items-center">
        <Image
          src={data.instructor.photo}
          alt={data.instructor.name}
          fill
          priority
          className="object-cover object-top"
          sizes="100vw"
        />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 md:py-16 h-full flex flex-col justify-between md:block md:h-auto">
          <div className="max-w-xl text-center lg:text-left mx-auto lg:mx-0">
            {/* Badge pill */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <BadgeCheck className="w-3.5 h-3.5" />
              {data.badge}
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1] mb-5">
              {data.tagline}
            </h1>

            {/* Sub-headline */}
            <p className="text-base md:text-lg text-white/80 mb-8 leading-relaxed">
              {data.valueProposition}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3">
              <ClaimSpotButton size="large" />
              <Book1on1Button href={data.bookingLink} size="large" />
            </div>
          </div>

          {/* Feature row — pinned to the bottom of the hero on mobile (icon stacked over
              label, like a typical mobile app-store hero), inline under the CTA on desktop */}
          <div className="max-w-xl mx-auto lg:mx-0 flex flex-wrap items-start justify-center lg:justify-start gap-6 md:gap-x-6 md:gap-y-3 md:mt-8">
            {data.trustItems.slice(0, 3).map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center gap-1.5 md:gap-2 text-xs sm:text-sm font-semibold text-white/90 text-center md:text-left w-24 md:w-auto">
                <span className="text-2xl md:text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Instructor name badge — centered at the bottom to avoid the fixed
            WhatsApp/chat widgets that sit in the corners on every page */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 max-w-[92%] bg-white/90 backdrop-blur-sm rounded-full px-4 py-2.5 shadow-md">
          <BadgeCheck className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span className="text-xs font-black text-gray-900 truncate">{data.instructor.name} · {data.instructor.designation}</span>
        </div>
      </div>

      {/* Below: stats, rating, target roles on white */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats chips */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-2.5">
          {data.heroStats.map((s, i) => (
            <div key={i} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">{s.label}</span>
              <span className="text-sm font-black text-gray-900">{s.value}</span>
            </div>
          ))}
        </div>

        {/* Stars + trust (only once there's real rating data) */}
        {data.rating > 0 && (
          <div className="flex items-center justify-center lg:justify-start flex-wrap gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-gray-700">{data.rating} · {data.reviewCount}+ reviews</span>
          </div>
        )}

        {/* Target roles */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center lg:text-left">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Ideal for</p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-2">
            {data.targetRoles.map((role, i) => (
              <span key={i} className="text-xs bg-gray-100 text-gray-600 font-semibold px-3 py-1.5 rounded-full">
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Trust Strip ─────────────────────────────────────────────────────────── */
function TrustStrip({ items }: { items: CourseLandingData['trustItems'] }) {
  return (
    <div className="w-full bg-amber-400 py-3.5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-5 md:gap-10">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-gray-900 font-black text-xs md:text-sm whitespace-nowrap">
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Value Proposition ───────────────────────────────────────────────────── */
function ValueProposition({ items }: { items: typeof valuePropositions }) {
  return (
    <section className="w-full py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-2">Why Lean Multiverse</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            One Program. <span className="text-amber-400">Real Results.</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm">Everything you need to reach your goals, built around real results.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl p-8 bg-gray-50 hover:border-amber-200 transition-colors">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-black text-gray-900 text-lg mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Upcoming Courses ────────────────────────────────────────────────────── */
function UpcomingCourses({ courses }: { courses: CourseLandingData['upcomingCourses'] }) {
  if (!courses || courses.length === 0) return null

  return (
    <section className="w-full py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-2">What&apos;s Next</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Upcoming Courses</h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm">New courses launching soon — mark your calendar.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-video bg-gray-100">
                <Image src={course.image} alt={course.title} fill className="object-cover" />
                <div className="absolute top-3 left-3 bg-amber-400 text-gray-900 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                  Coming Soon
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-black text-gray-900 text-sm mb-3">{course.title}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-500 font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                  Launching {course.launchDate}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Video Section ───────────────────────────────────────────────────────── */
// Every course dataset now defines `video` (see courseLandingData.ts) using the same
// real Lean Multiverse intro video shown on the homepage (src/components/new-ui/NewVideoSection.tsx).
function CourseVideoSection({ video }: { video: CourseLandingData['video'] }) {
  if (!video) return null
  const resolved = video

  return (
    <section className="w-full bg-slate-50 py-16 border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {resolved.title && (
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-8">
            {resolved.title}
          </h2>
        )}

        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl bg-gray-900 border-4 border-white">
          {resolved.url ? (
            <iframe
              src={resolved.url}
              title={resolved.title || "Course Video"}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : resolved.thumbnailUrl ? (
            <img
              src={resolved.thumbnailUrl}
              alt={resolved.title || "Video thumbnail"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No video provided
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/* ─── Course Catalog ──────────────────────────────────────────────────────── */
function CourseCatalogSection() {
  const featured = courses.filter((c) => c.category !== 'Webinar').slice(0, 6)

  return (
    <section className="w-full py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-2">Explore More</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Our Course Catalog</h2>
          </div>
          <Link href="/courses" className="text-sm font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 flex-shrink-0">
            View All Courses <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((course) => (
            <Link
              key={course.id}
              href={`/course-details/${course.id}`}
              className="block bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-amber-200 hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full uppercase tracking-wide">
                  {course.category}
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-gray-700">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {course.rating}
                </span>
              </div>
              <h3 className="font-black text-gray-900 text-base mb-2 line-clamp-2">{course.shortTitle}</h3>
              <p className="text-gray-500 text-xs mb-4 line-clamp-2">{course.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-400 font-semibold">
                <span>{course.duration}</span>
                <span>{course.level}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Upcoming Instructors Preview ────────────────────────────────────────── */
function UpcomingInstructorsPreview({ instructor }: { instructor: CourseLandingData['instructor'] }) {
  return (
    <section className="w-full py-16 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-2">Meet the Educators</p>
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-10">Learn From Practitioners</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex flex-col items-center">
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-amber-100 mb-4">
              <Image src={instructor.photo} alt={instructor.name} fill className="object-cover object-top" />
            </div>
            <h3 className="font-black text-gray-900 text-sm">{instructor.name}</h3>
            <p className="text-xs text-gray-400 mt-1">{instructor.designation}</p>
          </div>
          {[1, 2].map((i) => (
            <div key={i} className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <UserPlus className="w-6 h-6 text-gray-300" />
              </div>
              <h3 className="font-bold text-gray-400 text-sm">New Educator</h3>
              <p className="text-[11px] text-gray-300 mt-1 uppercase tracking-wide font-bold">Announcing Soon</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Platform Promises ───────────────────────────────────────────────────── */
function PlatformPromises({ items }: { items: typeof platformPromises }) {
  return (
    <section className="w-full py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="text-2xl flex-shrink-0">{item.icon}</div>
              <div>
                <h3 className="font-black text-white text-sm mb-1">{item.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {item.description}{' '}
                  {item.title.includes('Refund') && (
                    <Link href="/refund-policy" className="text-amber-400 underline">
                      View policy
                    </Link>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


/* ─── Course Categories (derived from real course skills) ─────────────────── */
function deriveCourseCategories() {
  const counts = new Map<string, number>()
  courses.forEach((course) => {
    course.skills.forEach((skill) => {
      counts.set(skill, (counts.get(skill) || 0) + 1)
    })
  })
  return Array.from(counts.entries())
    .map(([label, count]) => ({ label, count }))
    .filter((c) => c.count > 1)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
}

function CourseCategoriesGrid() {
  const categories = deriveCourseCategories()
  return (
    <section className="w-full py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-2">Browse by Skill</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Course Categories</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories.map((cat, i) => (
            <Link
              key={i}
              href="/courses"
              className="flex flex-col items-center justify-center text-center bg-gray-50 border border-gray-100 rounded-xl px-4 py-6 hover:border-amber-300 hover:bg-amber-50 transition-colors"
            >
              <span className="font-bold text-gray-800 text-sm">{cat.label}</span>
              <span className="text-[11px] text-gray-400 mt-1">{cat.count} courses</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Course Overview ─────────────────────────────────────────────────────── */
function CourseOverview({ overview }: { overview: CourseLandingData['overview'] }) {
  const cards = [
    { title: 'What is this course?', content: overview.what, icon: '📖', bg: 'bg-blue-50 border-blue-100' },
    { title: 'Who should attend?', content: overview.who, icon: '👤', bg: 'bg-green-50 border-green-100' },
    { title: 'Why this program?', content: overview.why, icon: '🏆', bg: 'bg-amber-50 border-amber-100' },
  ]

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-2">The Program</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Course Overview</h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm">Everything you need to know before you join.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {cards.map((card, i) => (
            <div key={i} className={`border rounded-2xl p-7 ${card.bg}`}>
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="font-black text-gray-900 text-base mb-3">{card.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{card.content}</p>
            </div>
          ))}
        </div>

        {/* Outcomes */}
        <div className="bg-gray-900 rounded-2xl p-8 md:p-10">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-gray-900" />
            </div>
            <h3 className="font-black text-white text-lg">What You&apos;ll Walk Away With</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {overview.outcomes.map((outcome, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm leading-relaxed">{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── What You'll Learn ───────────────────────────────────────────────────── */
function WhatYouLearn({ topics }: { topics: string[] }) {
  return (
    <section className="w-full py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-2">Skills Covered</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            What You&apos;ll <span className="text-amber-400">Learn</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm">All topics and competencies covered in the training.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {topics.map((topic, i) => (
            <div key={i} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3.5 shadow-sm hover:border-amber-200 transition-colors">
              <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="text-gray-700 font-semibold text-sm">{topic}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Curriculum Accordion ───────────────────────────────────────────────── */
function CurriculumAccordion({ modules }: { modules: CourseLandingData['curriculum'] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="curriculum" className="w-full py-20 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-2">The Syllabus</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Course Curriculum</h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm">Click each module to see the topics covered.</p>
        </div>

        <div className="space-y-3">
          {modules.map((mod, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className={`border rounded-2xl overflow-hidden transition-all duration-200 ${isOpen ? 'border-amber-300 shadow-sm' : 'border-gray-100 bg-white'
                  }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className={`w-full py-5 px-6 flex items-center justify-between text-left ${isOpen ? 'bg-amber-50' : 'bg-white hover:bg-gray-50'
                    } transition-colors`}
                >
                  <div className="flex items-center gap-4">
                    <span className="flex-shrink-0 w-9 h-9 rounded-full bg-amber-400 text-gray-900 text-xs font-black flex items-center justify-center shadow-sm">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className={`font-bold text-sm md:text-base ${isOpen ? 'text-gray-900' : 'text-gray-700'}`}>
                      {mod.title}
                    </span>
                  </div>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ml-4 ${isOpen ? 'bg-amber-200' : 'bg-gray-100'}`}>
                    {isOpen ? <X className="w-4 h-4 text-gray-700" /> : <Plus className="w-4 h-4 text-gray-500" />}
                  </div>
                </button>

                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="bg-white px-6 pb-6 pt-3 pl-[4.5rem]">
                    <ul className="space-y-2.5">
                      {mod.topics.map((topic, ti) => (
                        <li key={ti} className="flex items-start gap-2.5 text-gray-600 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-2" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-10">
          <ClaimSpotButton />
        </div>
      </div>
    </section>
  )
}

/* ─── Career Outcomes ─────────────────────────────────────────────────────── */
function CareerOutcomes({ roles, timeline }: { roles: string[]; timeline: string[] }) {
  return (
    <section className="w-full py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-2">What to Expect</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Your Transformation</h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm">Outcomes you can work toward and your path to getting there.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Roles */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-black text-gray-900 text-lg">Possible Outcomes</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {roles.map((role, i) => (
                <div key={i} className="flex items-center gap-2.5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span className="text-sm font-semibold text-gray-700">{role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-gray-900" />
              </div>
              <h3 className="font-black text-white text-lg">Your Journey</h3>
            </div>
            <div className="space-y-1">
              {timeline.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex flex-col items-center flex-shrink-0 pt-1">
                    <div className="w-8 h-8 rounded-full bg-amber-400 text-gray-900 text-xs font-black flex items-center justify-center">
                      {i + 1}
                    </div>
                    {i < timeline.length - 1 && (
                      <div className="w-px flex-1 bg-amber-400/30 my-1 min-h-[1.5rem]" />
                    )}
                  </div>
                  <div className="pb-5">
                    <span className={`font-semibold text-sm ${i === timeline.length - 1 ? 'text-amber-400' : 'text-gray-300'}`}>
                      {step}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Faculty ─────────────────────────────────────────────────────────────── */
function InstructorSection({ instructor }: { instructor: CourseLandingData['instructor'] }) {
  return (
    <section className="w-full overflow-hidden border-t border-gray-100">
      <div className="flex flex-col lg:flex-row min-h-[520px]">
        {/* Left amber bar + content */}
        <div className="flex flex-1 relative">
          <div className="w-3 md:w-10 bg-amber-400 self-stretch flex-shrink-0" />
          <div className="flex-1 flex flex-col justify-center py-16 px-8 md:px-14 bg-white">
            <div className="max-w-lg">
              <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-3">Faculty</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                Meet {instructor.name}
              </h2>
              <p className="text-amber-600 font-black text-base mb-2">{instructor.designation}</p>
              <p className="text-gray-500 text-sm mb-6">{instructor.experience}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {instructor.specialization.split(', ').map((s, i) => (
                  <span key={i} className="text-xs bg-amber-50 border border-amber-200 text-amber-700 font-semibold px-3 py-1.5 rounded-full">
                    {s}
                  </span>
                ))}
              </div>

              {instructor.linkedin && (
                <a
                  href={instructor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0A66C2] text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-[#004182] transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  View on LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right: photo */}
        <div className="flex lg:w-5/12 relative min-h-[350px] lg:min-h-auto">
          <div className="w-1.5 bg-amber-400 self-stretch z-10 flex-shrink-0" />
          <div className="flex-1 relative bg-gray-100">
            <Image
              src={instructor.photo}
              alt={instructor.name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Subscription Benefits (Why Lean Multiverse) ─────────────────────────── */
function WhyLeanMultiverse({ items }: { items: CourseLandingData['whyLeanMultiverse'] }) {
  return (
    <section className="w-full py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-2">Subscription Benefits</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Why <span className="text-amber-400">Lean Multiverse?</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm">What sets us apart from every other training provider.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-amber-200 hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="font-black text-gray-900 text-sm mb-2">{item.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Testimonials ────────────────────────────────────────────────────────── */
function CourseTestimonials() {
  const [slidesToShow, setSlidesToShow] = useState(3)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    const handleResize = () => setSlidesToShow(window.innerWidth < 768 ? 1 : 3)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section id="testimonial" className="w-full py-20 bg-white border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-3">Student Reviews</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">What Our Students Say</h2>
          </div>
          <p className="text-gray-400 text-sm max-w-xs">Real stories from people training with us.</p>
        </div>
      </div>

      <div className="w-full px-4">
        <Carousel
          dots
          arrows
          infinite
          autoplay={autoPlay}
          autoplaySpeed={3000}
          draggable
          swipeToSlide
          pauseOnHover
          slidesToShow={slidesToShow}
          slidesToScroll={1}
          afterChange={() => setAutoPlay(false)}
        >
          {testimonials.slice(0, 9).map((testimonial, index) => (
            <div key={index} className="px-3">
              <TestimonialCard testimonial={testimonial} onInteract={() => setAutoPlay(false)} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  )
}

function TestimonialCard({
  testimonial,
  onInteract,
}: {
  testimonial: (typeof testimonials)[0]
  onInteract: () => void
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-100 transition-all p-6 h-[420px] flex flex-col">
        <div className="flex justify-center mb-4">
          <div className="relative w-20 h-20 rounded-full border-2 border-amber-400 overflow-hidden bg-amber-50 flex items-center justify-center text-amber-600 font-black text-xl">
            {!imageLoaded && testimonial.name.charAt(0)}
            {testimonial.image && (
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                fill
                loading="lazy"
                className={`object-cover object-top transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
              />
            )}
          </div>
        </div>

        <div className="text-center mb-3">
          <h4 className="font-black text-gray-900 text-sm tracking-wide">{testimonial.name}</h4>
          <p className="text-xs text-gray-400 mt-0.5">
            {testimonial.role}
            <span className="block text-amber-500 font-bold">{testimonial.company}</span>
          </p>
        </div>

        <div className="flex justify-center gap-0.5 mb-3">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>

        <p className="text-gray-600 text-xs italic text-center line-clamp-5 mb-3 leading-relaxed">
          &ldquo;{testimonial.quote}&rdquo;...
        </p>

        <button
          onClick={() => { onInteract(); setIsModalOpen(true) }}
          className="text-xs text-amber-500 font-bold hover:underline mb-3"
        >
          Read More
        </button>

        {testimonial.achievement && (
          <div className="mt-auto pt-3 border-t border-gray-50 text-center">
            <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full">
              {testimonial.achievement}
            </span>
          </div>
        )}
      </div>

      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        centered
        width={600}
        styles={{ body: { maxHeight: '60vh', overflowY: 'auto' } }}
      >
        <h3 className="text-lg font-black mb-1">{testimonial.name}</h3>
        <p className="text-xs text-gray-400 mb-4">{testimonial.role} · {testimonial.company}</p>
        <p className="text-gray-700 leading-relaxed text-sm">&ldquo;{testimonial.quote}&rdquo;</p>
      </Modal>
    </>
  )
}

/* ─── Pricing ─────────────────────────────────────────────────────────────── */
function PricingCard({ pricing, courseName }: { pricing: CourseLandingData['pricing']; courseName: string }) {
  return (
    <section id="enroll" className="w-full py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-2">Pricing</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Invest in Yourself</h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm">Everything you need to succeed — included in one price.</p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-white border-2 border-amber-400 rounded-3xl overflow-hidden shadow-xl">
            {/* Amber header */}
            <div className="bg-amber-400 px-8 py-7 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <p className="text-gray-900 font-black text-xs uppercase tracking-widest mb-2 relative z-10">{courseName}</p>
              <div className="flex items-baseline justify-center gap-3 relative z-10">
                {pricing.originalFee && (
                  <span className="text-gray-700/60 line-through text-xl font-semibold">{pricing.originalFee}</span>
                )}
                <span className={`text-gray-900 font-black ${pricing.fee === 'Coming Soon' ? 'text-3xl' : 'text-5xl'}`}>{pricing.fee}</span>
              </div>
              {pricing.emiNote && (
                <p className="text-gray-900/70 text-xs mt-2 relative z-10">{pricing.emiNote}</p>
              )}
            </div>

            {/* Inclusions */}
            <div className="px-8 py-7">
              <p className="text-gray-400 font-black text-[11px] uppercase tracking-widest mb-5">What&apos;s Included</p>
              <ul className="space-y-3.5 mb-8">
                {pricing.inclusions.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <ClaimSpotButton className="w-full justify-center" size="large" />
              <p className="text-center text-xs text-gray-400 mt-4">
                Or call us: <a href="tel:+917696627657" className="text-amber-600 font-bold">+91 7696627657</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── FAQ ─────────────────────────────────────────────────────────────────── */
function CourseFAQSection({ faqs }: { faqs: CourseLandingData['faqs'] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="w-full py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left */}
          <div className="lg:w-1/3 lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-5">
              Frequently<br />Asked Questions
            </h2>
            <p className="text-gray-400 text-sm mb-6">Have more questions? We&apos;re here to help.</p>
            <a
              href="tel:+917696627657"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold text-sm px-6 py-3 rounded-full transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              Call Us Now
            </a>
          </div>

          {/* Right accordion */}
          <div className="lg:w-2/3">
            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index
                return (
                  <div
                    key={index}
                    className={`border rounded-2xl overflow-hidden transition-all ${isOpen ? 'border-amber-300 shadow-sm' : 'border-gray-100 bg-white'
                      }`}
                  >
                    <button
                      className={`w-full py-5 px-6 flex items-center justify-between text-left ${isOpen ? 'bg-amber-50' : 'bg-white hover:bg-gray-50'
                        } transition-colors`}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                    >
                      <span className={`font-semibold text-sm pr-6 ${isOpen ? 'text-gray-900' : 'text-gray-700'}`}>
                        {faq.question}
                      </span>
                      <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${isOpen ? 'bg-amber-200' : 'bg-gray-100'}`}>
                        {isOpen ? <X className="w-3.5 h-3.5 text-gray-700" /> : <Plus className="w-3.5 h-3.5 text-gray-500" />}
                      </div>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="bg-white px-6 pb-5 pt-2">
                        <p className="text-gray-500 leading-relaxed text-sm">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Final CTA ───────────────────────────────────────────────────────────── */
function FinalCTA({ courseName }: { courseName: string }) {
  return (
    <section className="w-full py-24 bg-amber-400">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-gray-900/10 text-gray-900 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          Coming Soon
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-5 leading-tight">
          Ready to Get Started?
        </h2>
        <p className="text-gray-900/70 text-base md:text-lg mb-10 max-w-xl mx-auto">
          Join people working toward real results with {courseName}.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <span
            aria-disabled="true"
            className="w-full sm:w-auto bg-gray-300 text-gray-600 font-black text-base px-12 py-4 rounded-full cursor-not-allowed select-none flex items-center justify-center gap-2"
          >
            Coming Soon
          </span>
          <a
            href="tel:+917696627657"
            className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-gray-900 text-gray-900 font-bold text-base px-8 py-4 rounded-full hover:bg-gray-900 hover:text-amber-400 transition-all"
          >
            <PhoneCall className="w-4 h-4" />
            Talk to Expert
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─── Main Page Component ─────────────────────────────────────────────────── */
export default function CourseLandingClient({ data }: { data: CourseLandingData }) {
  return (
    <div className="relative w-full min-h-screen bg-white text-gray-900 flex flex-col">
      <CourseHero data={data} />
      <CourseVideoSection video={data.video} />
      {/* <TrustStrip items={data.trustItems} /> */}
      <ValueProposition items={valuePropositions} />
      <UpcomingCourses courses={data.upcomingCourses} />
      {/* <CourseCatalogSection /> */}
      {/* <UpcomingInstructorsPreview instructor={data.instructor} /> */}
      <PlatformPromises items={platformPromises} />
      <CourseOverview overview={data.overview} />
      <WhatYouLearn topics={data.whatYouLearn} />
      <CurriculumAccordion modules={data.curriculum} />
      <CareerOutcomes roles={data.careerRoles} timeline={data.certificationTimeline} />
      <WhyLeanMultiverse items={data.whyLeanMultiverse} />
      <InstructorSection instructor={data.instructor} />
      {/* <CourseCategoriesGrid /> */}
      <PricingCard pricing={data.pricing} courseName={data.shortTitle} />
      <CourseFAQSection faqs={data.faqs} />
      <FinalCTA courseName={data.shortTitle} />
    </div>
  )
}
