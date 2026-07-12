'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
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
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { CourseLandingData } from '@/data/courseLandingData'
import { testimonials } from '@/data/testimonials'
import BookWebinarModal from '@/components/webinar/BookWebinarModal'

/* ─── Claim Your Spot CTA ─────────────────────────────────────────────────── */
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
    <a
      href="tel:+917696627657"
      className={`inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-black rounded-full transition-all active:scale-95 shadow-md ${sizeClasses[size]} ${className}`}
    >
      <Sparkles className="w-4 h-4" />
      Claim Your Spot
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
              <a
                href="tel:+917696627657"
                className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-black text-sm md:text-base px-6 md:px-8 py-2.5 md:py-3 rounded-full transition-all active:scale-95 shadow-lg whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4" />
                Claim Your Spot
              </a>
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
    <section id="home" className="w-full pt-10 pb-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Badge pill */}
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          <BadgeCheck className="w-3.5 h-3.5" />
          {data.badge} · Official Certification
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black text-gray-900 tracking-tight leading-[1.1] mb-5">
          {data.tagline}
        </h1>

        {/* Sub-headline */}
        <p className="text-base md:text-lg text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
          {data.valueProposition}
        </p>

        {/* Stats chips */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-8">
          {data.heroStats.map((s, i) => (
            <div key={i} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">{s.label}</span>
              <span className="text-sm font-black text-gray-900">{s.value}</span>
            </div>
          ))}
        </div>

        {/* Stars + trust */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-sm font-bold text-gray-700">{data.rating} · {data.reviewCount}+ reviews</span>
          <span className="hidden sm:inline text-gray-300">·</span>
          <span className="text-sm text-gray-400">Trusted by Enterprise Teams</span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <ClaimSpotButton size="large" />
          <a
            href="#curriculum"
            className="flex items-center gap-2 border-2 border-gray-200 text-gray-600 font-semibold text-sm px-7 py-3.5 rounded-full hover:border-amber-400 hover:text-amber-600 transition-all"
          >
            View Curriculum
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>

        {/* Target roles */}
        <div className="pt-6 border-t border-gray-100">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Ideal for</p>
          <div className="flex flex-wrap justify-center gap-2">
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

/* ─── Course Overview ─────────────────────────────────────────────────────── */
function CourseOverview({ overview }: { overview: CourseLandingData['overview'] }) {
  const cards = [
    { title: 'What is this course?', content: overview.what, icon: '📖', bg: 'bg-blue-50 border-blue-100' },
    { title: 'Who should attend?', content: overview.who, icon: '👤', bg: 'bg-green-50 border-green-100' },
    { title: 'Why this certification?', content: overview.why, icon: '🏆', bg: 'bg-amber-50 border-amber-100' },
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
                className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                  isOpen ? 'border-amber-300 shadow-sm' : 'border-gray-100 bg-white'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className={`w-full py-5 px-6 flex items-center justify-between text-left ${
                    isOpen ? 'bg-amber-50' : 'bg-white hover:bg-gray-50'
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
          <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-2">After Certification</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Career Outcomes</h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm">Roles you&apos;ll be qualified for and your path to getting there.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Roles */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-black text-gray-900 text-lg">Possible Roles</h3>
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

/* ─── Instructor ──────────────────────────────────────────────────────────── */
function InstructorSection({ instructor }: { instructor: CourseLandingData['instructor'] }) {
  return (
    <section className="w-full overflow-hidden border-t border-gray-100">
      <div className="flex flex-col lg:flex-row min-h-[520px]">
        {/* Left amber bar + content */}
        <div className="flex flex-1 relative">
          <div className="w-3 md:w-10 bg-amber-400 self-stretch flex-shrink-0" />
          <div className="flex-1 flex flex-col justify-center py-16 px-8 md:px-14 bg-white">
            <div className="max-w-lg">
              <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-3">Your Instructor</p>
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

              <div className="grid grid-cols-3 gap-4 mb-8 text-center">
                {[
                  { label: 'Community', value: '700K+' },
                  { label: 'Mentored', value: '1,000+' },
                  { label: 'Rating', value: '4.9 ★' },
                ].map((stat, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl py-3 px-2">
                    <div className="font-black text-gray-900 text-lg">{stat.value}</div>
                    <div className="text-xs text-gray-400 font-semibold">{stat.label}</div>
                  </div>
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

/* ─── Why Lean Multiverse ─────────────────────────────────────────────────── */
function WhyLeanMultiverse({ items }: { items: CourseLandingData['whyLeanMultiverse'] }) {
  return (
    <section className="w-full py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-2">Our Difference</p>
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
          <p className="text-gray-400 text-sm max-w-xs">Real stories from professionals who earned their certification with us.</p>
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
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Invest in Your Career</h2>
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
                <span className="text-gray-900 font-black text-5xl">{pricing.fee}</span>
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
                    className={`border rounded-2xl overflow-hidden transition-all ${
                      isOpen ? 'border-amber-300 shadow-sm' : 'border-gray-100 bg-white'
                    }`}
                  >
                    <button
                      className={`w-full py-5 px-6 flex items-center justify-between text-left ${
                        isOpen ? 'bg-amber-50' : 'bg-white hover:bg-gray-50'
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
          Limited Seats Available
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-5 leading-tight">
          Ready to Get Certified?
        </h2>
        <p className="text-gray-900/70 text-base md:text-lg mb-10 max-w-xl mx-auto">
          Join enterprise professionals worldwide who have advanced their careers with {courseName}.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="tel:+917696627657"
            className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white font-black text-base px-12 py-4 rounded-full transition-all active:scale-95 shadow-md flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Claim Your Spot
          </a>
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
      <TrustStrip items={data.trustItems} />
      <CourseOverview overview={data.overview} />
      <WhatYouLearn topics={data.whatYouLearn} />
      <CurriculumAccordion modules={data.curriculum} />
      <CareerOutcomes roles={data.careerRoles} timeline={data.certificationTimeline} />
      <InstructorSection instructor={data.instructor} />
      <WhyLeanMultiverse items={data.whyLeanMultiverse} />
      <CourseTestimonials />
      <PricingCard pricing={data.pricing} courseName={data.shortTitle} />
      <CourseFAQSection faqs={data.faqs} />
      <FinalCTA courseName={data.shortTitle} />
    </div>
  )
}
