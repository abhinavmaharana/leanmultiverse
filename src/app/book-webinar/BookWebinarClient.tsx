'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import {
  getAvailableDatesPaid,
  getZoomLinkForDatePaid,
  WEBINAR_TIME_SLOTS as TIME_SLOTS,
} from '@/lib/webinar-config'
import { trackMetaEvent } from '@/lib/meta-pixel'
import Marquee from 'react-fast-marquee'
import { testimonials as landingTestimonials } from '@/components/landing/SuccessStories'

const safeTestimonials = Array.isArray(landingTestimonials) ? landingTestimonials : []

const HEAR_FROM_OPTIONS = [
  { value: '', label: 'Select one' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'google', label: 'Google' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'website', label: 'Website' },
] as const

function getTEDxVideoId(): string | null {
  const url = process.env.NEXT_PUBLIC_TEDX_TALK_URL
  if (!url) return 'Dv3D3SiauX0'
  const m = url.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  return m ? m[1] : 'Dv3D3SiauX0'
}

const TRUSTED_COMPANIES = [
  { name: 'Deloitte', domain: 'deloitte.com' },
  { name: 'JPMorgan', domain: 'jpmorganchase.com' },
  { name: 'Accenture', domain: 'accenture.com' },
  { name: 'Infosys', domain: 'infosys.com' },
  { name: 'TCS', domain: 'tcs.com' },
  { name: 'Cognizant', domain: 'cognizant.com' },
]

const VALUE_BULLETS = [
  'Transition to Product / Project roles and leverage your experience for PM careers.',
  'AI skills for managers: ChatGPT, automation and tools used in MNCs.',
  'Resume and LinkedIn positioning to get interviews at top companies.',
  'Practical frameworks used by professionals at firms like Deloitte and JPMorgan.',
]

const bookingSchema = z.object({
  user_name: z.string().min(2, 'Name must be at least 2 characters'),
  user_email: z.string().email('Invalid email address'),
  user_phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  hear_from: z.string().min(1, 'Please select where you heard about us'),
  selected_date: z.string().min(1, 'Please select a date'),
  selected_time: z.string().min(1, 'Please select a time slot'),
})

type BookingFormData = z.infer<typeof bookingSchema>

export default function BookWebinarClient() {
  const [mounted, setMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [razorpayLoaded, setRazorpayLoaded] = useState(false)
  const [logoErrors, setLogoErrors] = useState<Record<number, boolean>>({})
  const [countdown, setCountdown] = useState<{ d: number; h: number; m: number; s: number } | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const scriptLoadedRef = useRef(false)
  const formSectionRef = useRef<HTMLDivElement>(null)
  const tedxSectionRef = useRef<HTMLDivElement>(null)
  const availableDates = useMemo(() => getAvailableDatesPaid(), [])

  // Countdown target: first webinar date at 8:00 PM IST (14:30 UTC)
  const countdownTarget = useMemo(() => {
    if (availableDates.length === 0) return null
    const d = availableDates[0]
    return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 14, 30, 0))
  }, [availableDates])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: 'onChange',
    defaultValues: {
      selected_date: '',
      selected_time: TIME_SLOTS[0]?.value ?? '20:00',
    },
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = () => setPrefersReducedMotion(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const selectedDate = watch('selected_date')
  const selectedTime = watch('selected_time')
  const userName = watch('user_name')
  const userEmail = watch('user_email')
  const userPhone = watch('user_phone')
  const hearFrom = watch('hear_from')
  const isFormReady = selectedDate && selectedTime && userName && userEmail && userPhone && hearFrom && isValid

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as typeof window & { Razorpay?: unknown }).Razorpay) {
      setRazorpayLoaded(true)
      scriptLoadedRef.current = true
      return
    }
    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')
    if (existingScript) {
      existingScript.addEventListener('load', () => {
        setRazorpayLoaded(true)
        scriptLoadedRef.current = true
      })
      if ((window as typeof window & { Razorpay?: unknown }).Razorpay) {
        setRazorpayLoaded(true)
        scriptLoadedRef.current = true
      }
      return
    }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => {
      setRazorpayLoaded(true)
      scriptLoadedRef.current = true
    }
    script.onerror = () => setError('Payment script failed to load. Please refresh.')
    document.body.appendChild(script)
  }, [])

  useEffect(() => {
    trackMetaEvent('ViewContent', { content_name: 'Paid Webinar Booking', content_type: 'product' })
  }, [])

  useEffect(() => {
    if (availableDates.length > 0 && !selectedDate) {
      setValue('selected_date', format(availableDates[0], 'yyyy-MM-dd'), { shouldValidate: true })
    }
    if (TIME_SLOTS.length >= 1 && !selectedTime) {
      setValue('selected_time', TIME_SLOTS[0].value, { shouldValidate: true })
    }
  }, [availableDates, selectedDate, selectedTime, setValue])

  useEffect(() => {
    if (!countdownTarget) return
    const tick = () => {
      const now = Date.now()
      const diff = Math.max(0, countdownTarget.getTime() - now)
      if (diff === 0) {
        setCountdown(null)
        return
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24))
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const s = Math.floor((diff % (1000 * 60)) / 1000)
      setCountdown({ d, h, m, s })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [countdownTarget])

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value
    if (v) setValue('selected_date', v, { shouldValidate: true })
  }

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true)
    setError(null)
    try {
      const zoomLink = getZoomLinkForDatePaid(data.selected_date)
      const response = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, zoom_registration_link: zoomLink }),
      })
      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || 'Failed to create booking')
      }
      const { orderId, bookingId } = await response.json()

      const waitForRazorpay = (): Promise<void> =>
        new Promise((resolve, reject) => {
          if (scriptLoadedRef.current && (window as typeof window & { Razorpay?: unknown }).Razorpay) {
            resolve()
            return
          }
          const s = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')
          if (s) {
            const id = setInterval(() => {
              if ((window as typeof window & { Razorpay?: unknown }).Razorpay) {
                clearInterval(id)
                scriptLoadedRef.current = true
                setRazorpayLoaded(true)
                resolve()
              }
            }, 100)
            setTimeout(() => {
              clearInterval(id)
              reject(new Error('Razorpay load timeout'))
            }, 10000)
            s.addEventListener('load', () => {
              clearInterval(id)
              scriptLoadedRef.current = true
              setRazorpayLoaded(true)
              resolve()
            })
            return
          }
          const script = document.createElement('script')
          script.src = 'https://checkout.razorpay.com/v1/checkout.js'
          script.async = true
          script.onload = () => {
            scriptLoadedRef.current = true
            setRazorpayLoaded(true)
            resolve()
          }
          script.onerror = () => reject(new Error('Razorpay failed'))
          document.body.appendChild(script)
        })

      await waitForRazorpay()
      trackMetaEvent('InitiateCheckout')

      const Razorpay = (window as typeof window & { Razorpay: new (o: unknown) => { open: () => void } }).Razorpay
      if (!Razorpay) throw new Error('Razorpay not available. Please refresh.')

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        amount: 9900,
        currency: 'INR',
        name: 'Lean Multiverse',
        description: 'Webinar - Strategic Career Accelerator',
        order_id: orderId,
        handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          try {
            const verifyRes = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                booking_id: bookingId,
              }),
            })
            if (verifyRes.ok) {
              const url = new URL('/book-webinar/success', window.location.origin)
              url.searchParams.set('payment_id', response.razorpay_payment_id)
              url.searchParams.set('order_id', response.razorpay_order_id)
              url.searchParams.set('date', data.selected_date)
              window.location.href = url.toString()
            } else {
              const err = await verifyRes.json().catch(() => ({}))
              throw new Error(err.error || 'Verification failed')
            }
          } catch (e) {
            setError(e instanceof Error ? e.message : 'Verification failed. Contact support if paid.')
            setIsSubmitting(false)
          }
        },
        prefill: { name: data.user_name, email: data.user_email, contact: data.user_phone },
        theme: { color: '#C69D44' },
        modal: { ondismiss: () => setIsSubmitting(false) },
      }
      new Razorpay(options).open()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
      setIsSubmitting(false)
    }
  }

  const tedxVideoId = getTEDxVideoId()
  const scrollToForm = () => formSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  const scrollToTEDx = () => tedxSectionRef.current?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <Navbar />
      <main className="book-webinar-page min-h-screen text-white pt-24 pb-16 px-4 sm:px-6">
        <div className="book-webinar-content max-w-6xl mx-auto">
          {/* Hero: two columns */}
          <section className="book-webinar-hero-grid relative">
            <div className="book-webinar-hero-glow" aria-hidden />
            <div className="book-webinar-hero-left">
              <h1 className="book-webinar-hero-headline">
                <span className="book-webinar-hero-line1">From Corporate Confusion To </span>
                <span className="book-webinar-gold book-webinar-hero-line2">Strategic Career Acceleration.</span>
              </h1>
              <p className="book-webinar-hero-sub">
                Learn What Top Companies Actually Hire For — Product. Project. AI.
              </p>
              <p className="book-webinar-hero-creds">Corporate YouTuber | 68K+ Instagram Community</p>
              <p className="book-webinar-hero-badge">Mentor to 1000+ Professionals</p>
              <div className="flex flex-wrap items-start gap-4 mt-2">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="book-webinar-cta book-webinar-cta-primary"
                >
                  Reserve My Spot Now
                  <span className="book-webinar-cta-arrow" aria-hidden>→</span>
                </button>
                {mounted && countdown !== null && (
                  <div className="rounded-xl bg-gray-900/80 border border-white/10 px-6 sm:px-8 py-5 flex flex-col">
                    <p className="text-white text-sm font-medium mb-4">Limited Seats – Starting In:</p>
                    <div className="flex gap-4 sm:gap-8">
                      {[
                        { value: countdown.d, label: 'Days' },
                        { value: countdown.h, label: 'Hrs' },
                        { value: countdown.m, label: 'Mins' },
                        { value: countdown.s, label: 'Sec' },
                      ].map(({ value, label }) => (
                        <div key={label} className="flex flex-col items-center min-w-[3rem]">
                          <span className="text-[#C69D44] font-bold text-2xl sm:text-3xl tabular-nums">
                            {String(value).padStart(2, '0')}
                          </span>
                          <span className="text-gray-400 text-xs mt-1.5">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {/* <div className="book-webinar-hero-ctas mt-6">
                <button
                  type="button"
                  onClick={scrollToTEDx}
                  className="book-webinar-cta book-webinar-cta-outline"
                >
                  <span className="book-webinar-cta-icon" aria-hidden>▶</span>
                  Watch Free Webinar
                </button>
                <Link
                  href="/#contact"
                  className="book-webinar-cta book-webinar-cta-outline"
                >
                  Book Strategy Call
                  <span className="book-webinar-cta-arrow" aria-hidden>→</span>
                </Link>
              </div> */}
            </div>
            <div className="book-webinar-hero-right">
              <div className="book-webinar-speaker-wrap relative w-full max-w-xl aspect-[3/4] mx-auto">
                <Image
                  src="/nitesh-prasad-updated-pic.png"
                  alt="Nitesh Prasad"
                  fill
                  className="object-contain object-top"
                  priority
                  sizes="(max-width: 1024px) 95vw, 52rem"
                />
                {/* <span className="book-webinar-signature">Nitesh Prasad</span> */}
              </div>
            </div>
          </section>

          {/* TEDx + Value: two columns */}
          <section ref={tedxSectionRef} className="book-webinar-value-guarantee">
            <div className="book-webinar-value-left">
              <h2 className="book-webinar-value-heading book-webinar-benefits-headline">
                <span className="book-webinar-gold">Ideas Worth Scaling.</span>{' '}
                <span className="book-webinar-gold">Careers Worth Building.</span>
              </h2>
              <ul className="book-webinar-benefits-list">
                {VALUE_BULLETS.map((text, i) => (
                  <li key={i} className="book-webinar-benefit-item">
                    <span className="book-webinar-benefit-icon" aria-hidden>✓</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <a
                href={tedxVideoId ? `https://www.youtube.com/watch?v=${tedxVideoId}` : '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="book-webinar-cta book-webinar-cta-primary mt-4"
              >
                <span className="book-webinar-cta-icon" aria-hidden>▶</span>
                Watch TEDx talk
              </a>
            </div>
            <div className="book-webinar-value-right">
              <div className="book-webinar-video-wrap w-full">
                {tedxVideoId && (
                  <iframe
                    title="TEDx talk"
                    src={`https://www.youtube.com/embed/${tedxVideoId}`}
                    className="book-webinar-iframe"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
              <p className="text-gray-400 text-sm mt-3">300K+ Views</p>
              <a
                href={tedxVideoId ? `https://www.youtube.com/watch?v=${tedxVideoId}` : '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="book-webinar-cta book-webinar-cta-primary mt-2"
              >
                <span className="book-webinar-cta-icon" aria-hidden>▶</span>
                Watch TEDx talk
              </a>
            </div>
          </section>

          {/* Company logos: marquee above form */}
          <section className="book-webinar-trusted mb-8 overflow-hidden">
            <p className="book-webinar-trusted-headline mb-4">
              Professionals from India’s top companies trust Lean Multiverse.
            </p>
            {mounted && (
              prefersReducedMotion ? (
                <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 py-2">
                  {TRUSTED_COMPANIES.map((c, index) => (
                    <a
                      key={`trusted-${index}-${c.domain}`}
                      href={`https://${c.domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center shrink-0 min-w-[100px] h-9 px-4 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-sm font-medium hover:border-amber-500/40 hover:text-amber-400/90 transition-all duration-200"
                      aria-label={c.name}
                    >
                      {logoErrors[index] ? (
                        <span>{c.name}</span>
                      ) : (
                        <Image
                          src={`https://logo.clearbit.com/${c.domain}`}
                          alt={`${c.name} logo`}
                          width={120}
                          height={32}
                          className="h-6 w-auto object-contain opacity-90 hover:opacity-100 max-h-8"
                          unoptimized
                          onError={() => setLogoErrors((prev) => ({ ...prev, [index]: true }))}
                        />
                      )}
                    </a>
                  ))}
                </div>
              ) : (
                <Marquee speed={40} pauseOnHover gradient={false} className="py-2">
                  {[...TRUSTED_COMPANIES, ...TRUSTED_COMPANIES].map((c, i) => {
                    const index = i % TRUSTED_COMPANIES.length
                    return (
                      <a
                        key={`trusted-${i}-${c.domain}`}
                        href={`https://${c.domain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center shrink-0 min-w-[100px] h-9 px-4 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-sm font-medium hover:border-amber-500/40 hover:text-amber-400/90 transition-all duration-200 mx-4"
                        aria-label={c.name}
                      >
                        {logoErrors[index] ? (
                          <span>{c.name}</span>
                        ) : (
                          <Image
                            src={`https://logo.clearbit.com/${c.domain}`}
                            alt={`${c.name} logo`}
                            width={120}
                            height={32}
                            className="h-6 w-auto object-contain opacity-90 hover:opacity-100 max-h-8"
                            unoptimized
                            onError={() => setLogoErrors((prev) => ({ ...prev, [index]: true }))}
                          />
                        )}
                      </a>
                    )
                  })}
                </Marquee>
              )
            )}
          </section>

          {/* Form + What You'll Learn: two columns */}
          <section
            ref={formSectionRef}
            className="book-webinar-form-and-learn scroll-mt-24 mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
              {/* Form column: first on mobile, right on desktop */}
              <div className="lg:col-start-2">
                <div className="relative bg-gradient-to-b from-[#1e1f28] to-[#18191f] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-xl shadow-black/20 overflow-hidden transition-all duration-300 hover:border-white/15">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500/80 to-amber-600/50 rounded-l-2xl" aria-hidden />
                  <div className="pl-1">
                    <h2 className="text-xl sm:text-2xl font-semibold text-white mb-1">Reserve your webinar seat</h2>
                    <p className="text-gray-400 text-sm mb-6">
                      {mounted && selectedDate ? format(new Date(selectedDate), 'EEEE, MMM d') : 'Select date'} · 8:00 PM IST
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <input type="hidden" {...register('selected_date')} />
              <input type="hidden" {...register('selected_time')} />

              {availableDates.length > 0 && (
                <div>
                  <label htmlFor="date" className="block text-gray-400 text-sm font-medium">Date</label>
                  <div className="relative mt-1">
                    <select
                      id="date"
                      value={selectedDate || ''}
                      onChange={handleDateChange}
                      className="w-full rounded-xl bg-gray-800/90 border border-white/15 text-white px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 appearance-none cursor-pointer transition-shadow"
                      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%239ca3af\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1.25rem' }}
                    >
                    {availableDates.map((d) => (
                      <option key={format(d, 'yyyy-MM-dd')} value={format(d, 'yyyy-MM-dd')} className="bg-gray-800">
                        {format(d, 'EEEE, MMM d')}
                      </option>
                    ))}
                  </select>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-gray-400 text-sm font-medium">Full name</label>
                <input
                  id="name"
                  {...register('user_name')}
                  placeholder="Your full name"
                  className="mt-1.5 w-full rounded-xl bg-gray-800/90 border border-white/15 text-white px-4 py-3 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-shadow"
                />
                {errors.user_name && <p className="text-red-400 text-xs mt-1">{errors.user_name.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-400 text-sm font-medium">Email</label>
                <input
                  id="email"
                  type="email"
                  {...register('user_email')}
                  placeholder="you@example.com"
                  className="mt-1.5 w-full rounded-xl bg-gray-800/90 border border-white/15 text-white px-4 py-3 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-shadow"
                />
                {errors.user_email && <p className="text-red-400 text-xs mt-1">{errors.user_email.message}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-400 text-sm font-medium">Mobile (+91)</label>
                <input
                  id="phone"
                  type="tel"
                  {...register('user_phone')}
                  placeholder="9876543210"
                  inputMode="numeric"
                  autoComplete="tel"
                  className="mt-1.5 w-full rounded-xl bg-gray-800/90 border border-white/15 text-white px-4 py-3 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-shadow"
                />
                {errors.user_phone && <p className="text-red-400 text-xs mt-1">{errors.user_phone.message}</p>}
              </div>

              <div>
                <label htmlFor="hear_from" className="block text-gray-400 text-sm font-medium">
                  Where did you hear us?
                </label>
                <select
                  id="hear_from"
                  {...register('hear_from')}
                  className="mt-1.5 w-full rounded-xl bg-gray-800/90 border border-white/15 text-white px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 appearance-none cursor-pointer transition-shadow"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%239ca3af\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.25rem' }}
                >
                  {HEAR_FROM_OPTIONS.map((opt) => (
                    <option key={opt.value || 'none'} value={opt.value} className="bg-gray-800">
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.hear_from && <p className="text-red-400 text-xs mt-1">{errors.hear_from.message}</p>}
              </div>

              {error && (
                <div role="alert" className="rounded-lg px-3 py-2 bg-red-400/10 border border-red-400/30">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <div className="pt-6 flex flex-col gap-3">
                <p className="text-center text-gray-400 text-sm">
                  ₹99 inclusive of GST · Secure payment via Razorpay
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting || !isFormReady}
                  className="book-webinar-cta book-webinar-cta-primary w-full py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-base font-semibold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-shadow"
                >
                  {isSubmitting ? 'Opening payment...' : 'Reserve my seat'}
                </button>
                {!isFormReady && !isSubmitting && (
                  <p className="text-center text-gray-500 text-xs">Fill all fields to continue</p>
                )}
              </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* What You'll Learn: second on mobile, left on desktop */}
              <div className="lg:col-start-1 lg:row-start-1">
                <div className="book-webinar-learn-panel rounded-2xl border border-white/10 bg-gradient-to-b from-[#1e1f28]/80 to-[#18191f]/80 p-6 sm:p-8 transition-all duration-300 hover:border-white/15 sticky lg:top-28">
                  <h2 className="text-xl sm:text-2xl font-semibold text-[#C69D44] mb-6">What You&apos;ll Learn</h2>
                  <ul className="space-y-4">
                    {VALUE_BULLETS.map((text, i) => (
                      <li
                        key={i}
                        className="book-webinar-learn-item flex gap-4 items-start p-4 rounded-xl bg-white/[0.04] border border-white/5 transition-all duration-200 hover:border-amber-500/20 hover:bg-white/[0.06]"
                      >
                        <span className="shrink-0 w-8 h-8 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center text-sm font-bold" aria-hidden>✓</span>
                        <span className="text-gray-200 text-sm sm:text-base leading-relaxed">{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-center text-gray-500 text-xs mt-8">
            Professionals from Deloitte, JPMorgan, Accenture, Infosys, TCS and other top companies have joined our programs.
          </p>

          <p className="text-center text-gray-600 text-xs mt-4">
            After payment you’ll receive the Zoom link by email. All times in IST.
          </p>
          </section>

          {/* Testimonials marquee (below form) */}
          <section className="mb-20 scroll-mt-24 mt-16 overflow-hidden">
            <h2 className="book-webinar-section-label text-gray-400 mb-8">What participants say</h2>
            {mounted && (
              prefersReducedMotion ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {safeTestimonials.slice(0, 6).map((t, i) => (
                    <div
                      key={`${t.id}-${i}`}
                      className="book-webinar-testimonial-card rounded-2xl border border-white/10 bg-gradient-to-b from-[#1e1f28] to-[#18191f] p-6 shadow-xl shadow-black/20 flex flex-col text-left"
                    >
                      <div className="flex gap-0.5 mb-4" aria-hidden>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="text-amber-400/80 text-sm">★</span>
                        ))}
                      </div>
                      <p className="text-gray-200 text-sm leading-[1.7] flex-grow line-clamp-5 mb-5">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                      <div className="border-t border-white/10 pt-4">
                        <p className="text-white font-semibold text-base">{t.name}</p>
                        <p className="text-gray-400 text-xs mt-0.5">
                          {t.role}{t.company ? ` · ${t.company}` : ''}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="book-webinar-testimonials-marquee">
                  <Marquee
                    speed={30}
                    pauseOnHover
                    gradient={false}
                    className="py-2"
                  >
                    {[...safeTestimonials, ...safeTestimonials].map((t, i) => (
                      <div
                        key={`${t.id}-${i}`}
                        className="book-webinar-testimonial-card mx-4 flex-shrink-0 w-[340px] sm:w-[380px] rounded-2xl border border-white/10 bg-gradient-to-b from-[#1e1f28] to-[#18191f] p-6 shadow-xl shadow-black/20 flex flex-col text-left"
                      >
                        <div className="flex gap-0.5 mb-4" aria-hidden>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className="text-amber-400/80 text-sm">★</span>
                          ))}
                        </div>
                        <p className="text-gray-200 text-sm leading-[1.7] flex-grow line-clamp-5 mb-5">
                          &ldquo;{t.quote}&rdquo;
                        </p>
                        <div className="border-t border-white/10 pt-4">
                          <p className="text-white font-semibold text-base">{t.name}</p>
                          <p className="text-gray-400 text-xs mt-0.5">
                            {t.role}{t.company ? ` · ${t.company}` : ''}
                          </p>
                        </div>
                      </div>
                    ))}
                  </Marquee>
                </div>
              )
            )}
          </section>
        </div>

        {/* Floating contact button (WhatsApp is in Footer + chatbot; avoid triple WhatsApp) */}
        {mounted && (
        <div className="book-webinar-float-buttons">
          <Link
            href="/#contact"
            className="book-webinar-float-contact w-12 h-12 p-0 rounded-full flex items-center justify-center shrink-0"
            aria-label="Contact us"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </Link>
        </div>
        )}
      </main>
      <Footer />
    </>
  )
}
