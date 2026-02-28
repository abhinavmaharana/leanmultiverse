'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format } from 'date-fns'
import Image from 'next/image'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import {
  getAvailableDatesPaid,
  getZoomLinkForDatePaid,
  WEBINAR_TIME_SLOTS as TIME_SLOTS,
} from '@/lib/webinar-config'
import { trackMetaEvent } from '@/lib/meta-pixel'
import { getAttributionForApi } from '@/lib/attribution'
import Marquee from 'react-fast-marquee'
import { useIsMobile } from '@/hooks/useIsMobile'
import { testimonials as landingTestimonials } from '@/components/landing/SuccessStories'
// import { Webinar3DMarquee } from '@/components/book-webinar/Webinar3DMarquee'

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
  { name: 'Deloitte', domain: 'deloitte.com', logo: '/DeloitteLOGO.png' },
  { name: 'JPMorgan', domain: 'jpmorganchase.com', logo: '/J_P_Morgan.png' },
  { name: 'Accenture', domain: 'accenture.com', logo: '/AccentureLOGO.png' },
  { name: 'Infosys', domain: 'infosys.com', logo: '/Infosys_logo.png' },
  { name: 'TCS', domain: 'tcs.com', logo: '/Tata_Consultancy.png' },
  { name: 'Cognizant', domain: 'cognizant.com', logo: '/CognizanTLOGO.png' },
  { name: 'PwC', domain: 'pwc.com', logo: '/pwcLOGO.png' },
]

const VALUE_BULLETS = [
  'Transition to Product / Project roles and leverage your experience for PM careers.',
  'AI skills for managers: ChatGPT, automation and tools used in MNCs.',
  'Resume and LinkedIn positioning to get interviews at top companies.',
  'Practical frameworks used by professionals at firms like Deloitte and JPMorgan.',
]

const MOBILE_VALUE_BULLETS = [
  'Transition to Lucrative Product/ Project Roles',
  'Powerful AI & Strategic Skills for Tech Roles',
  'Proven Resume & Linkedin Positioning Strategy',
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
  const tedxSectionRef = useRef<HTMLDivElement>(null)
  const testimonialsSectionRef = useRef<HTMLDivElement>(null)
  const availableDates = useMemo(() => getAvailableDatesPaid(), [])
  const isMobile = useIsMobile(1023)

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
      user_name: '',
      user_email: '',
      user_phone: '',
      hear_from: '',
      selected_date: '',
      selected_time: TIME_SLOTS[0]?.value ?? '20:00',
    },
  })

  useEffect(() => { setMounted(true) }, [])


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
      if (diff === 0) { setCountdown(null); return }
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

  const handleDateSelect = (dateStr: string) => {
    setValue('selected_date', dateStr, { shouldValidate: true })
  }


  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true)
    setError(null)
    try {
      const zoomLink = getZoomLinkForDatePaid(data.selected_date)
      const utm = getAttributionForApi()
      const response = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, zoom_registration_link: zoomLink, utm: Object.keys(utm).length > 0 ? utm : undefined }),
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
            setTimeout(() => { clearInterval(id); reject(new Error('Razorpay load timeout')) }, 10000)
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
          script.onload = () => { scriptLoadedRef.current = true; setRazorpayLoaded(true); resolve() }
          script.onerror = () => reject(new Error('Razorpay failed'))
          document.body.appendChild(script)
        })

      await waitForRazorpay()
      trackMetaEvent('InitiateCheckout')

      const Razorpay = (window as typeof window & { Razorpay: new (o: unknown) => { open: () => void } }).Razorpay
      if (!Razorpay) throw new Error('Razorpay not available. Please refresh.')

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        amount: 900,
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

  return (
    <>
      <Navbar />
      <main className="book-webinar-page min-h-screen text-white pt-24 pb-32 sm:pb-20 px-4 sm:px-6">
        {/* Mobile layout (Figma design) */}
        <div className="block lg:hidden w-full max-w-lg mx-auto min-w-0 px-1">
          {/* Webinar banner */}
          <div className="bw-mobile-banner rounded-lg px-4 py-2.5 mb-4">
            <p className="text-white text-xs font-medium tracking-wide">
              LIVE WEBINAR · {availableDates[0] ? format(availableDates[0], 'EEEE, MMM d') : 'Saturday, Feb 28'} · 8:00 PM IST
            </p>
          </div>

          {/* Main title */}
          <h1 className="text-xl font-bold text-white leading-tight mb-4">
            How Seasoned Professionals Break Into Product, Project & AI Roles
          </h1>

          {/* Countdown */}
          {mounted && countdown !== null && (
            <div className="bw-mobile-countdown rounded-xl px-6 py-4 mb-6 flex justify-center gap-1">
              <span className="text-[#C69D44] font-bold text-lg tabular-nums">
                {String(countdown.d).padStart(2, '0')} : {String(countdown.h).padStart(2, '0')} : {String(countdown.m).padStart(2, '0')} : {String(countdown.s).padStart(2, '0')}
              </span>
            </div>
          )}

          {/* Registration form - only render on mobile to avoid duplicate inputs with same register() */}
          {isMobile && (
          <div className="relative bg-gradient-to-b from-[#1e1f28] to-[#18191f] border border-white/10 rounded-2xl p-5 mb-6 shadow-xl shadow-black/20">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500/80 to-amber-600/50 rounded-l-2xl" aria-hidden />
            <div className="pl-1">
              <h2 className="text-lg font-semibold text-white mb-1">Reserve your webinar seat</h2>
              <p className="text-gray-400 text-sm mb-4">
                {mounted && selectedDate ? format(new Date(selectedDate), 'EEEE, MMM d') : 'Select date'} · 8:00 PM IST · ₹9
              </p>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <input type="hidden" {...register('selected_date')} />
                <input type="hidden" {...register('selected_time')} />
                {availableDates.length > 0 && (
                  <div>
                    <p className="text-gray-400 text-xs font-medium mb-1">Date</p>
                    <div className="flex flex-wrap gap-2" role="group" aria-label="Select date">
                      {availableDates.map((d) => {
                        const dateStr = format(d, 'yyyy-MM-dd')
                        const isSelected = selectedDate === dateStr
                        return (
                          <button
                            key={dateStr}
                            type="button"
                            onClick={() => handleDateSelect(dateStr)}
                            className={`rounded-lg px-2.5 py-2 text-xs font-medium transition-all border ${
                              isSelected ? 'bg-amber-500/20 border-amber-500/60 text-amber-400' : 'bg-gray-800/90 border-white/15 text-white hover:border-white/30'
                            }`}
                          >
                            {format(d, 'EEE, MMM d')}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
                <div>
                  <label htmlFor="mobile-name" className="block text-gray-400 text-xs font-medium">Full name</label>
                  <input id="mobile-name" {...register('user_name')} placeholder="Your full name" className="mt-0.5 w-full rounded-xl bg-gray-800/90 border border-white/15 text-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50" />
                  {errors.user_name && <p className="text-red-400 text-xs mt-0.5">{errors.user_name.message}</p>}
                </div>
                <div>
                  <label htmlFor="mobile-email" className="block text-gray-400 text-xs font-medium">Email</label>
                  <input id="mobile-email" type="email" {...register('user_email')} placeholder="you@example.com" className="mt-0.5 w-full rounded-xl bg-gray-800/90 border border-white/15 text-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50" />
                  {errors.user_email && <p className="text-red-400 text-xs mt-0.5">{errors.user_email.message}</p>}
                </div>
                <div>
                  <label htmlFor="mobile-phone" className="block text-gray-400 text-xs font-medium">Mobile (+91)</label>
                  <input id="mobile-phone" type="tel" {...register('user_phone')} placeholder="9876543210" inputMode="numeric" autoComplete="tel" className="mt-0.5 w-full rounded-xl bg-gray-800/90 border border-white/15 text-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50" />
                  {errors.user_phone && <p className="text-red-400 text-xs mt-0.5">{errors.user_phone.message}</p>}
                </div>
                <div>
                  <label htmlFor="mobile-hear_from" className="block text-gray-400 text-xs font-medium">Where did you hear us? (optional)</label>
                  <select id="mobile-hear_from" {...register('hear_from')} className="mt-0.5 w-full rounded-xl bg-gray-800/90 border border-white/15 text-white px-3 py-2 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 appearance-none cursor-pointer" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%239ca3af\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1rem' }}>
                    {HEAR_FROM_OPTIONS.map((opt) => (
                      <option key={opt.value || 'none'} value={opt.value} className="bg-gray-800">{opt.label}</option>
                    ))}
                  </select>
                </div>
                {error && <p className="text-red-400 text-xs">{error}</p>}
                <p className="text-amber-400/90 text-xs">100% value satisfaction · Secure payment via Razorpay</p>
                <button type="submit" disabled={isSubmitting || !isFormReady} className="book-webinar-cta book-webinar-cta-primary w-full py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold">
                  {isSubmitting ? 'Opening payment...' : 'Reserve my spot at just Rs 9'}
                </button>
              </form>
            </div>
          </div>
          )}

          {/* Company logos (after form on mobile) */}
          <section className="book-webinar-trusted mb-8 overflow-hidden">
            <p className="book-webinar-trusted-headline mb-4">
              Professionals from India&apos;s top companies trust Lean Multiverse.
            </p>
            {mounted && (
              prefersReducedMotion ? (
                <div className="flex flex-wrap justify-center items-center gap-4 py-2">
                  {TRUSTED_COMPANIES.map((c, index) => (
                    <a
                      key={`mobile-logo-${index}-${c.domain}`}
                      href={`https://${c.domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="book-webinar-trusted-logo-card inline-flex items-center justify-center shrink-0 min-w-[100px] h-10 px-4 rounded-lg text-sm font-medium transition-all duration-200"
                      aria-label={c.name}
                    >
                      {logoErrors[index] ? (
                        <span>{c.name}</span>
                      ) : (
                        <Image
                          src={c.logo}
                          alt={`${c.name} logo`}
                          width={120}
                          height={36}
                          className="h-8 w-auto object-contain opacity-90 hover:opacity-100 max-h-9"
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
                        key={`mobile-logo-${i}-${c.domain}`}
                        href={`https://${c.domain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="book-webinar-trusted-logo-card inline-flex items-center justify-center shrink-0 min-w-[100px] h-10 px-4 rounded-lg text-sm font-medium transition-all duration-200 mx-3"
                        aria-label={c.name}
                      >
                        {logoErrors[index] ? (
                          <span>{c.name}</span>
                        ) : (
                          <Image
                            src={c.logo}
                            alt={`${c.name} logo`}
                            width={120}
                            height={36}
                            className="h-8 w-auto object-contain opacity-90 hover:opacity-100 max-h-9"
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

          {/* Speaker profile */}
          <div className="bw-mobile-speaker-card rounded-2xl border border-white/10 p-5 mb-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-56 h-56 rounded-full overflow-hidden mb-3">
                <Image src="/nitesh-prasad-updated-photo-image.png" alt="Nitesh Prasad" fill className="object-cover object-top" sizes="144px" />
              </div>
              <p className="text-white font-semibold text-lg">Nitesh Prasad</p>
              <p className="text-gray-400 text-xs mb-2">@CorporateWalaYoutuber</p>
              <p className="text-gray-300 text-xs mb-2">TOP SPEAKER | Ex-Microsoft | Ex-PwC | SAFe SPC | PMP | CSM | MCT AI</p>
              <ul className="text-gray-400 text-xs space-y-1 text-left w-full">
                <li>• 1500+ professionals mentored</li>
                <li>• 1M+ followers across Instagram</li>
              </ul>
            </div>
          </div>

          {/* What You'll Learn */}
          <div className="bw-mobile-learn-card rounded-2xl border border-white/10 p-5 mb-6">
            <h2 className="text-[#C69D44] text-xs font-semibold uppercase tracking-wider mb-4">What You&apos;ll Learn:</h2>
            <ul className="space-y-3">
              {MOBILE_VALUE_BULLETS.map((text, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-amber-400/20 text-[#C69D44] flex items-center justify-center text-xs font-bold" aria-hidden>✓</span>
                  <span className="text-gray-200 text-sm">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Value satisfaction */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-full bg-amber-400/20 flex items-center justify-center mb-2">
              <svg className="w-6 h-6 text-[#C69D44]" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <p className="text-[#C69D44] font-semibold text-sm">100% VALUE SATISFACTION</p>
          </div>

          {/* Testimonials (same as web) */}
          <section className="mb-8 overflow-hidden">
            <h2 className="book-webinar-section-label text-gray-400 mb-6">What participants say</h2>
            {mounted && (
              prefersReducedMotion ? (
                <div className="grid grid-cols-1 gap-4 max-w-lg mx-auto">
                  {safeTestimonials.slice(0, 6).map((t, i) => (
                    <div
                      key={`mobile-t-${t.id}-${i}`}
                      className="book-webinar-testimonial-card rounded-2xl border border-white/10 bg-gradient-to-b from-[#1e1f28] to-[#18191f] p-5 shadow-xl shadow-black/20 flex flex-col text-left"
                    >
                      <div className="flex gap-0.5 mb-3" aria-hidden>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="text-amber-400/80 text-sm">★</span>
                        ))}
                      </div>
                      <p className="text-gray-200 text-sm leading-[1.7] flex-grow line-clamp-5 mb-4">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                      <div className="border-t border-white/10 pt-3">
                        <p className="text-white font-semibold text-sm">{t.name}</p>
                        <p className="text-gray-400 text-xs mt-0.5">
                          {t.role}{t.company ? ` · ${t.company}` : ''}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="book-webinar-testimonials-marquee">
                  <Marquee speed={30} pauseOnHover gradient={false} className="py-2">
                    {[...safeTestimonials, ...safeTestimonials].map((t, i) => (
                      <div
                        key={`mobile-t-${t.id}-${i}`}
                        className="book-webinar-testimonial-card mx-3 flex-shrink-0 w-[300px] rounded-2xl border border-white/10 bg-gradient-to-b from-[#1e1f28] to-[#18191f] p-5 shadow-xl shadow-black/20 flex flex-col text-left"
                      >
                        <div className="flex gap-0.5 mb-3" aria-hidden>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className="text-amber-400/80 text-sm">★</span>
                          ))}
                        </div>
                        <p className="text-gray-200 text-sm leading-[1.7] flex-grow line-clamp-5 mb-4">
                          &ldquo;{t.quote}&rdquo;
                        </p>
                        <div className="border-t border-white/10 pt-3">
                          <p className="text-white font-semibold text-sm">{t.name}</p>
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

          {/* 3D Marquee section (mobile) */}
          {/* <section className="mb-8 -mx-4 sm:-mx-6">
            <Webinar3DMarquee onReserveSpot={openModal} />
          </section> */}
        </div>

        <div className="book-webinar-content max-w-6xl mx-auto hidden lg:block">
          {/* Hero */}
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
              <p className="book-webinar-hero-creds">Corporate YouTuber | 680k+ Instagram Community</p>
              <p className="book-webinar-hero-badge">Mentor to 1000+ Professionals</p>
                {mounted && countdown !== null && (
                <div className="rounded-xl bg-gray-900/80 border border-white/10 px-6 sm:px-8 py-5 flex flex-col mt-4">
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
            <div className="book-webinar-hero-right">
              {/* Form - only render on desktop to avoid duplicate inputs with same register() */}
              {!isMobile && (
              <div className="relative bg-gradient-to-b from-[#1e1f28] to-[#18191f] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl shadow-black/20">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500/80 to-amber-600/50 rounded-l-2xl" aria-hidden />
                <div className="pl-1">
                  <h2 className="text-lg font-semibold text-white mb-1">Reserve your webinar seat</h2>
                  <p className="text-gray-400 text-sm mb-4">
                    {mounted && selectedDate ? format(new Date(selectedDate), 'EEEE, MMM d') : 'Select date'} · 8:00 PM IST · ₹9
                  </p>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <input type="hidden" {...register('selected_date')} />
                    <input type="hidden" {...register('selected_time')} />
                    {availableDates.length > 0 && (
                      <div>
                        <p className="text-gray-400 text-xs font-medium mb-1">Date</p>
                        <div className="flex flex-wrap gap-2" role="group" aria-label="Select date">
                          {availableDates.map((d) => {
                            const dateStr = format(d, 'yyyy-MM-dd')
                            const isSelected = selectedDate === dateStr
                            return (
                              <button
                                key={dateStr}
                                type="button"
                                onClick={() => handleDateSelect(dateStr)}
                                className={`rounded-lg px-2.5 py-2 text-xs font-medium transition-all border ${
                                  isSelected ? 'bg-amber-500/20 border-amber-500/60 text-amber-400' : 'bg-gray-800/90 border-white/15 text-white hover:border-white/30'
                                }`}
                              >
                                {format(d, 'EEE, MMM d')}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                    <div>
                      <label htmlFor="hero-name" className="block text-gray-400 text-xs font-medium">Full name</label>
                      <input id="hero-name" {...register('user_name')} placeholder="Your full name" className="mt-0.5 w-full rounded-xl bg-gray-800/90 border border-white/15 text-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50" />
                      {errors.user_name && <p className="text-red-400 text-xs mt-0.5">{errors.user_name.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="hero-email" className="block text-gray-400 text-xs font-medium">Email</label>
                      <input id="hero-email" type="email" {...register('user_email')} placeholder="you@example.com" className="mt-0.5 w-full rounded-xl bg-gray-800/90 border border-white/15 text-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50" />
                      {errors.user_email && <p className="text-red-400 text-xs mt-0.5">{errors.user_email.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="hero-phone" className="block text-gray-400 text-xs font-medium">Mobile (+91)</label>
                      <input id="hero-phone" type="tel" {...register('user_phone')} placeholder="9876543210" inputMode="numeric" autoComplete="tel" className="mt-0.5 w-full rounded-xl bg-gray-800/90 border border-white/15 text-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50" />
                      {errors.user_phone && <p className="text-red-400 text-xs mt-0.5">{errors.user_phone.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="hero-hear_from" className="block text-gray-400 text-xs font-medium">Where did you hear us? (optional)</label>
                      <select id="hero-hear_from" {...register('hear_from')} className="mt-0.5 w-full rounded-xl bg-gray-800/90 border border-white/15 text-white px-3 py-2 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 appearance-none cursor-pointer" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%239ca3af\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1rem' }}>
                        {HEAR_FROM_OPTIONS.map((opt) => (
                          <option key={opt.value || 'none'} value={opt.value} className="bg-gray-800">{opt.label}</option>
                        ))}
                      </select>
                    </div>
                    {error && <p className="text-red-400 text-xs">{error}</p>}
                    <p className="text-amber-400/90 text-xs">100% value satisfaction · Secure payment via Razorpay</p>
                    <button type="submit" disabled={isSubmitting || !isFormReady} className="book-webinar-cta book-webinar-cta-primary w-full py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold">
                      {isSubmitting ? 'Opening payment...' : 'Reserve my spot at just Rs 9'}
                    </button>
                  </form>
                </div>
              </div>
              )}
            </div>
          </section>

          {/* About Speaker */}
          <section className="mb-12 mt-16">
            <h2 className="book-webinar-section-label text-gray-400 mb-6">About Speaker</h2>
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-10 items-center sm:items-start max-w-4xl">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 shrink-0 rounded-2xl overflow-hidden border border-white/10 bg-gray-900/50 shadow-xl">
                <Image
                  src="/nitesh-prasad-updated-photo-image.png"
                  alt="Nitesh Prasad"
                  fill
                  className="object-cover object-[center_20%]"
                  sizes="14rem"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#C69D44] font-semibold text-lg mb-2">Nitesh Prasad</p>
                <p className="text-gray-200 text-sm leading-relaxed mb-4">
                  Corporate YouTuber with 680k+ Instagram community. Mentor to 1000+ professionals who have transitioned into Product, Project and AI roles at top companies like Deloitte, JPMorgan, Accenture and Infosys.
                </p>
                <p className="text-gray-400 text-sm">
                  His TEDx talk on career acceleration has 300K+ views. He brings practical frameworks used by professionals at leading MNCs.
                </p>
              </div>
            </div>
          </section>

          {/* TEDx + Value */}
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

          {/* Company logos marquee */}
          <section className="book-webinar-trusted mb-8 overflow-hidden">
            <p className="book-webinar-trusted-headline mb-4">
              Professionals from India&apos;s top companies trust Lean Multiverse.
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
                      className="book-webinar-trusted-logo-card inline-flex items-center justify-center shrink-0 min-w-[120px] h-12 px-5 rounded-lg text-sm font-medium transition-all duration-200"
                      aria-label={c.name}
                    >
                      {logoErrors[index] ? (
                        <span>{c.name}</span>
                      ) : (
                        <Image
                          src={c.logo}
                          alt={`${c.name} logo`}
                          width={160}
                          height={44}
                          className="h-9 w-auto object-contain opacity-90 hover:opacity-100 max-h-11"
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
                        className="book-webinar-trusted-logo-card inline-flex items-center justify-center shrink-0 min-w-[120px] h-12 px-5 rounded-lg text-sm font-medium transition-all duration-200 mx-4"
                        aria-label={c.name}
                      >
                        {logoErrors[index] ? (
                          <span>{c.name}</span>
                        ) : (
                          <Image
                            src={c.logo}
                            alt={`${c.name} logo`}
                            width={160}
                            height={44}
                            className="h-9 w-auto object-contain opacity-90 hover:opacity-100 max-h-11"
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

          {/* CTA button */}
          {/* <section className="text-center mb-16">
            <button
              type="button"
              onClick={openModal}
              className="book-webinar-cta book-webinar-cta-primary text-lg px-10 py-5 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-shadow"
            >
              Reserve My Spot Now
              <span className="book-webinar-cta-arrow" aria-hidden>→</span>
            </button>
            <p className="text-gray-500 text-xs mt-4">₹9 inclusive of GST · Limited seats available</p>
          </section> */}

          {/* Testimonials marquee */}
          <section ref={testimonialsSectionRef} className="mb-10 scroll-mt-24 mt-16 overflow-hidden">
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
                  <Marquee speed={30} pauseOnHover gradient={false} className="py-2">
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

          {/* 3D Marquee section */}
          {/* <section className="px-4 sm:px-6">
            <Webinar3DMarquee onReserveSpot={openModal} />
          </section> */}
          </div>
      </main>

      <Footer />
    </>
  )
}
