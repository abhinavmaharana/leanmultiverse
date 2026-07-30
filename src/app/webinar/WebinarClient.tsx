'use client'

import Image from 'next/image'
import { CheckCircle2, PhoneCall, Sparkles, Star } from 'lucide-react'
import { testimonials } from '@/data/testimonials'

const WATCH_NOW_LINK = 'https://learn.leanmultiverse.com/l/83cec5c61c'

const BOOK_1ON1_LINK = 'https://learn.leanmultiverse.com/web/lite/events/6a65f301ab7f5882d47d7486'

const VALUE_BULLETS = [
  'Transition to Product / Project roles and leverage your experience for PM careers.',
  'AI skills for managers: ChatGPT, automation and tools used in MNCs.',
  'Resume and LinkedIn positioning to get interviews at top companies.',
  'Practical frameworks used by professionals at firms like Deloitte and JPMorgan.',
]

const TRUSTED_COMPANIES = [
  { name: 'Deloitte', logo: '/DeloitteLOGO.png' },
  { name: 'JPMorgan', logo: '/J_P_Morgan.png' },
  { name: 'Accenture', logo: '/AccentureLOGO.png' },
  { name: 'Infosys', logo: '/Infosys_logo.png' },
  { name: 'TCS', logo: '/Tata_Consultancy.png' },
  { name: 'Cognizant', logo: '/CognizanTLOGO.png' },
  { name: 'PwC', logo: '/pwcLOGO.png' },
]

function JoinNowButton({ size = 'default' }: { size?: 'default' | 'large' }) {
  const sizeClasses = size === 'large' ? 'px-12 py-4 text-lg' : 'px-8 py-3.5 text-base'
  return (
    <a
      href={WATCH_NOW_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-black rounded-full transition-all active:scale-95 shadow-md ${sizeClasses}`}
    >
      Watch Now
    </a>
  )
}

function Book1on1Button({ size = 'default' }: { size?: 'default' | 'large' }) {
  const sizeClasses = size === 'large' ? 'px-12 py-4 text-lg' : 'px-8 py-3.5 text-base'
  return (
    <a
      href={BOOK_1ON1_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-black rounded-full transition-all active:scale-95 shadow-md ${sizeClasses}`}
    >
      <PhoneCall className="w-4 h-4" />
      Book 1:1
    </a>
  )
}

function Hero() {
  return (
    <section className="w-full pt-10 pb-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          Recorded Webinar
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black text-gray-900 tracking-tight leading-[1.1] mb-5">
          Product Manager | Project Manager | Program Management Career Roadmap
        </h1>

        <p className="text-base md:text-lg text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
          A recorded session on transitioning into Product and Project roles, building AI skills for managers, and
          positioning your resume for top companies.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <JoinNowButton size="large" />
          <Book1on1Button size="large" />
        </div>
      </div>
    </section>
  )
}

function VideoSection() {
  return (
    <section className="w-full bg-slate-50 py-16 border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-8">Why You Should Join Lean Multiverse</h2>
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl bg-gray-900 border-4 border-white">
          <iframe
            src="https://www.youtube.com/embed/0FOrkRJAy_s?si=DRE3s1kNWodwjvk6"
            title="Why You Should Join Lean Multiverse"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}

function TrustedBy() {
  return (
    <section className="w-full bg-gray-50 py-10 border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-center text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-6">
          Our Learners Work At
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {TRUSTED_COMPANIES.map((c) => (
            <img key={c.name} src={c.logo} alt={c.name} className="h-6 md:h-8 object-contain opacity-70 grayscale" />
          ))}
        </div>
      </div>
    </section>
  )
}

function WhatYoullLearn() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-2">In This Session</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">What You&apos;ll Learn</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {VALUE_BULLETS.map((bullet, i) => (
            <div key={i} className="flex items-start gap-3 bg-gray-50 border border-gray-100 rounded-2xl p-6">
              <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm leading-relaxed font-medium">{bullet}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MeetYourSpeaker() {
  return (
    <section className="w-full overflow-hidden border-t border-gray-100">
      <div className="flex flex-col lg:flex-row min-h-[480px]">
        <div className="flex flex-1 relative">
          <div className="w-3 md:w-10 bg-amber-400 self-stretch flex-shrink-0" />
          <div className="flex-1 flex flex-col justify-center py-16 px-8 md:px-14 bg-white">
            <div className="max-w-lg">
              <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-3">Your Host</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Meet Nitesh Prasad</h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
                Corporate YouTuber with 680k+ Instagram community. Mentor to 1000+ professionals who have
                transitioned into Product, Project and AI roles at top companies like Deloitte, JPMorgan,
                Accenture and Infosys.
              </p>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                His TEDx talk on career acceleration has 300K+ views. He brings practical frameworks used by
                professionals at leading MNCs.
              </p>
            </div>
          </div>
        </div>
        <div className="flex lg:w-5/12 relative min-h-[320px] lg:min-h-auto">
          <div className="w-1.5 bg-amber-400 self-stretch z-10 flex-shrink-0" />
          <div className="flex-1 relative bg-gray-100">
            <Image src="/tedex.jpeg" alt="Nitesh Prasad" fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 40vw" />
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialsGrid() {
  const featured = testimonials.slice(0, 6)
  return (
    <section className="w-full py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-2">Real Results</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">What Attendees Say</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((t) => (
            <div key={t.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex gap-0.5 mb-3">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm italic line-clamp-4 mb-4 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <p className="font-black text-gray-900 text-sm">{t.name}</p>
              <p className="text-xs text-gray-400">{t.role}{t.company ? ` · ${t.company}` : ''}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const FAQS = [
  { question: 'Who is this webinar for?', answer: 'Anyone looking to transition into Product, Project, or Program Management roles, or add AI skills to their existing management experience.' },
  { question: 'Will I get a recording?', answer: 'Yes, a recording is shared with all registered attendees after the session.' },
  { question: 'What is the refund policy?', answer: 'Full refund available up to 7 days before the session date. See our Refund Policy page for complete details.' },
]

function FAQSection() {
  return (
    <section className="w-full py-20 bg-white border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-2">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-6">
          {FAQS.map((f, i) => (
            <div key={i} className="border-b border-gray-100 pb-6">
              <h3 className="font-bold text-gray-900 text-sm mb-2">{f.question}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="w-full py-24 bg-amber-400">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-5 leading-tight">Ready to Join?</h2>
        <p className="text-gray-900/70 text-base md:text-lg mb-10 max-w-xl mx-auto">
          Watch the recorded session anytime.
        </p>
        <JoinNowButton size="large" />
      </div>
    </section>
  )
}

export default function WebinarClient() {
  return (
    <div className="relative w-full min-h-screen bg-white text-gray-900 flex flex-col">
      <Hero />
      <VideoSection />
      <TrustedBy />
      <WhatYoullLearn />
      <MeetYourSpeaker />
      <TestimonialsGrid />
      <FAQSection />
      <FinalCTA />
    </div>
  )
}
