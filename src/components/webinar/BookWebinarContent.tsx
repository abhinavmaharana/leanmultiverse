'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format } from 'date-fns'
import {
  getAvailableDatesPaid,
  getZoomLinkForDatePaid,
  WEBINAR_TIME_SLOTS as TIME_SLOTS,
} from '@/lib/webinar-config'
import { trackMetaEvent } from '@/lib/meta-pixel'
import { getAttributionForApi } from '@/lib/attribution'
import { useIsMobile } from '@/hooks/useIsMobile'
import './book-webinar.css'

const HEAR_FROM_OPTIONS = [
  { value: '', label: 'Select one' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'google', label: 'Google' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'website', label: 'Website' },
] as const

const bookingSchema = z.object({
  user_name: z.string().min(2, 'Name must be at least 2 characters'),
  user_email: z.string().email('Invalid email address'),
  user_phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  hear_from: z.string().min(1, 'Please select where you heard about us'),
  selected_date: z.string().min(1, 'Please select a date'),
  selected_time: z.string().min(1, 'Please select a time slot'),
})

type BookingFormData = z.infer<typeof bookingSchema>

export default function BookWebinarContent() {
  const [mounted, setMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [razorpayLoaded, setRazorpayLoaded] = useState(false)
  const [logoErrors, setLogoErrors] = useState<Record<number, boolean>>({})
  const [countdown, setCountdown] = useState<{ d: number; h: number; m: number; s: number } | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const scriptLoadedRef = useRef(false)
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

  return (
    <>
      {/* Mobile layout (Figma design) */}
      <div className="block lg:hidden w-full mx-auto min-w-0 px-1">
        {/* Webinar banner */}
        <div className="bw-mobile-banner mb-4 rounded-2xl px-4 py-3 shadow-sm border border-gray-200 bg-white">
          {/* Top row: LIVE + pill */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-700">
                Live webinar
              </span>
            </div>

            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-[10px] font-semibold text-yellow-700 whitespace-nowrap">
              Limited seats
            </span>
          </div>

          {/* Bottom: date & time */}
          <p className="mt-1.5 text-xs font-medium text-gray-900 leading-snug">
            {availableDates[0]
              ? format(availableDates[0], 'EEEE, MMM d')
              : 'Saturday, Feb 28'}{' '}
            · 8:00 PM IST
          </p>
        </div>

        {/* Main title */}
        <h1 className="text-2xl font-extrabold text-gray-900 leading-tight mb-3">
          How Seasoned Professionals Break Into Product, Project & AI Roles
        </h1>

        {/* Sub copy for mobile */}
        <p className="text-sm text-gray-600 mb-4">
          Learn what top companies actually hire for – in a focused live session.
        </p>

        {/* Countdown */}
        {mounted && countdown !== null && (
          <div className="bw-mobile-countdown rounded-2xl px-5 py-3 mb-6 flex items-center justify-center gap-2">
            <span className="text-gray-900 text-xs font-medium uppercase tracking-[0.2em]">
              Starting in
            </span>
            <span className="font-semibold text-lg tabular-nums text-yellow-700">
              {String(countdown.d).padStart(2, '0')} :{' '}
              {String(countdown.h).padStart(2, '0')} :{' '}
              {String(countdown.m).padStart(2, '0')} :{' '}
              {String(countdown.s).padStart(2, '0')}
            </span>
          </div>
        )}

        {/* Registration form - only render on mobile to avoid duplicate inputs with same register() */}
        {isMobile && (
          <div className="relative bw-mobile-form-card border border-gray-200 rounded-2xl p-5 mb-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
            <div
              className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-l-2xl"
              aria-hidden
            />
            <div className="pl-2">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                Reserve your webinar seat
              </h2>
              <p className="text-xs text-gray-600 mb-4">
                {mounted && selectedDate
                  ? format(new Date(selectedDate), 'EEEE, MMM d')
                  : 'Select date'}{' '}
                · 8:00 PM IST · ₹9
              </p>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <input type="hidden" {...register('selected_date')} />
                <input type="hidden" {...register('selected_time')} />

                {availableDates.length > 0 && (
                  <div>
                    <p className="text-[11px] text-gray-500 font-semibold mb-1">
                      Date
                    </p>
                    <div
                      className="flex flex-wrap gap-2"
                      role="group"
                      aria-label="Select date"
                    >
                      {availableDates.map((d) => {
                        const dateStr = format(d, 'yyyy-MM-dd')
                        const isSelected = selectedDate === dateStr
                        return (
                          <button
                            key={dateStr}
                            type="button"
                            onClick={() => handleDateSelect(dateStr)}
                            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all border ${
                              isSelected
                                ? 'bg-yellow-400/10 border-yellow-400 text-yellow-700 shadow-sm'
                                : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
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
                  <label
                    htmlFor="mobile-name"
                    className="block text-[11px] text-gray-600 font-semibold"
                  >
                    Full name
                  </label>
                  <input
                    id="mobile-name"
                    {...register('user_name')}
                    placeholder="Your full name"
                    className="mt-1 w-full rounded-xl border border-gray-200 bg-white text-gray-900 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                  />
                  {errors.user_name && (
                    <p className="text-red-500 text-xs mt-0.5">
                      {errors.user_name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="mobile-email"
                    className="block text-[11px] text-gray-600 font-semibold"
                  >
                    Email
                  </label>
                  <input
                    id="mobile-email"
                    type="email"
                    {...register('user_email')}
                    placeholder="you@example.com"
                    className="mt-1 w-full rounded-xl border border-gray-200 bg-white text-gray-900 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                  />
                  {errors.user_email && (
                    <p className="text-red-500 text-xs mt-0.5">
                      {errors.user_email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="mobile-phone"
                    className="block text-[11px] text-gray-600 font-semibold"
                  >
                    Mobile (+91)
                  </label>
                  <input
                    id="mobile-phone"
                    type="tel"
                    {...register('user_phone')}
                    placeholder="9876543210"
                    inputMode="numeric"
                    autoComplete="tel"
                    className="mt-1 w-full rounded-xl border border-gray-200 bg-white text-gray-900 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                  />
                  {errors.user_phone && (
                    <p className="text-red-500 text-xs mt-0.5">
                      {errors.user_phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="mobile-hear_from"
                    className="block text-[11px] text-gray-600 font-semibold"
                  >
                    Where did you hear us? (optional)
                  </label>
                  <select
                    id="mobile-hear_from"
                    {...register('hear_from')}
                    className="mt-1 w-full rounded-xl border border-gray-200 bg-white text-gray-900 px-3 py-2 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 appearance-none cursor-pointer transition"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.5rem center',
                      backgroundSize: '1rem',
                    }}
                  >
                    {HEAR_FROM_OPTIONS.map((opt) => (
                      <option
                        key={opt.value || 'none'}
                        value={opt.value}
                        className="bg-white text-gray-900"
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {error && (
                  <p className="text-red-500 text-xs">{error}</p>
                )}

                <p className="text-[11px] text-gray-500">
                  <span className="font-semibold text-yellow-700">
                    100% value satisfaction
                  </span>{' '}
                  · Secure payment via Razorpay
                </p>

                  <button
                    type="submit"
                    disabled={isSubmitting || !isFormReady}
                    className="book-webinar-cta book-webinar-cta-primary w-full py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
                  >
                    {isSubmitting
                      ? 'Opening payment...'
                      : 'Reserve my spot at just Rs 9'}
                  </button>
              </form>
            </div>
          </div>
        )}
      </div>

      <div className="book-webinar-content max-w-6xl mx-auto hidden lg:block">
        {/* Hero */}
        <section className="book-webinar-hero-grid relative">
          <div className="book-webinar-hero-glow" aria-hidden />
          <div className="book-webinar-hero-left">
            <h1 className="book-webinar-hero-headline">
              <span className="book-webinar-hero-line1">
                From Corporate Confusion To{' '}
              </span>
              <span className="book-webinar-gold book-webinar-hero-line2">
                Strategic Career Acceleration.
              </span>
            </h1>
            <p className="book-webinar-hero-sub">
              Learn What Top Companies Actually Hire For — Product. Project. AI.
            </p>
            <p className="book-webinar-hero-creds">
              Corporate YouTuber | 680k+ Instagram Community
            </p>
            <p className="book-webinar-hero-badge">
              Mentor to 1000+ Professionals
            </p>

            {mounted && countdown !== null && (
              <div className="rounded-2xl bg-white/80 border border-gray-200 px-6 sm:px-8 py-5 flex flex-col mt-5 shadow-[0_18px_45px_rgba(15,23,42,0.12)] backdrop-blur">
                <p className="text-gray-900 text-sm font-semibold mb-3 flex items-center gap-2">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                  Limited Seats – Starting In
                </p>
                <div className="flex gap-4 sm:gap-8">
                  {[
                    { value: countdown.d, label: 'Days' },
                    { value: countdown.h, label: 'Hrs' },
                    { value: countdown.m, label: 'Mins' },
                    { value: countdown.s, label: 'Sec' },
                  ].map(({ value, label }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center min-w-[3rem]"
                    >
                      <span className="text-yellow-600 font-bold text-2xl sm:text-3xl tabular-nums">
                        {String(value).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.16em] text-gray-500 mt-1.5">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="book-webinar-hero-right">
            {/* Form - only render on desktop to avoid duplicate inputs with same register() */}
            {!isMobile && (
              <div className="relative bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-[0_22px_55px_rgba(15,23,42,0.14)]">
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-l-2xl"
                  aria-hidden
                />
                <div className="pl-2">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    Reserve your webinar seat
                  </h2>
                  <p className="text-xs text-gray-600 mb-4">
                    {mounted && selectedDate
                      ? format(new Date(selectedDate), 'EEEE, MMM d')
                      : 'Select date'}{' '}
                    · 8:00 PM IST · ₹9
                  </p>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <input type="hidden" {...register('selected_date')} />
                    <input type="hidden" {...register('selected_time')} />

                    {availableDates.length > 0 && (
                      <div>
                        <p className="text-[11px] text-gray-500 font-semibold mb-1">
                          Date
                        </p>
                        <div
                          className="flex flex-wrap gap-2"
                          role="group"
                          aria-label="Select date"
                        >
                          {availableDates.map((d) => {
                            const dateStr = format(d, 'yyyy-MM-dd')
                            const isSelected = selectedDate === dateStr
                            return (
                              <button
                                key={dateStr}
                                type="button"
                                onClick={() => handleDateSelect(dateStr)}
                                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all border ${
                                  isSelected
                                    ? 'bg-yellow-400/10 border-yellow-400 text-yellow-700 shadow-sm'
                                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
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
                      <label
                        htmlFor="hero-name"
                        className="block text-[11px] text-gray-600 font-semibold"
                      >
                        Full name
                      </label>
                      <input
                        id="hero-name"
                        {...register('user_name')}
                        placeholder="Your full name"
                        className="mt-1 w-full rounded-xl border border-gray-200 bg-white text-gray-900 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                      />
                      {errors.user_name && (
                        <p className="text-red-500 text-xs mt-0.5">
                          {errors.user_name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="hero-email"
                        className="block text-[11px] text-gray-600 font-semibold"
                      >
                        Email
                      </label>
                      <input
                        id="hero-email"
                        type="email"
                        {...register('user_email')}
                        placeholder="you@example.com"
                        className="mt-1 w-full rounded-xl border border-gray-200 bg-white text-gray-900 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                      />
                      {errors.user_email && (
                        <p className="text-red-500 text-xs mt-0.5">
                          {errors.user_email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="hero-phone"
                        className="block text-[11px] text-gray-600 font-semibold"
                      >
                        Mobile (+91)
                      </label>
                      <input
                        id="hero-phone"
                        type="tel"
                        {...register('user_phone')}
                        placeholder="9876543210"
                        inputMode="numeric"
                        autoComplete="tel"
                        className="mt-1 w-full rounded-xl border border-gray-200 bg-white text-gray-900 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                      />
                      {errors.user_phone && (
                        <p className="text-red-500 text-xs mt-0.5">
                          {errors.user_phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="hero-hear_from"
                        className="block text-[11px] text-gray-600 font-semibold"
                      >
                        Where did you hear us? (optional)
                      </label>
                      <select
                        id="hero-hear_from"
                        {...register('hear_from')}
                        className="mt-1 w-full rounded-xl border border-gray-200 bg-white text-gray-900 px-3 py-2 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 appearance-none cursor-pointer transition"
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 0.5rem center',
                          backgroundSize: '1rem',
                        }}
                      >
                        {HEAR_FROM_OPTIONS.map((opt) => (
                          <option
                            key={opt.value || 'none'}
                            value={opt.value}
                            className="bg-white text-gray-900"
                          >
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {error && (
                      <p className="text-red-500 text-xs">{error}</p>
                    )}

                    <p className="text-[11px] text-gray-500">
                      <span className="font-semibold text-yellow-700">
                        100% value satisfaction
                      </span>{' '}
                      · Secure payment via Razorpay
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting || !isFormReady}
                      className="book-webinar-cta book-webinar-cta-primary w-full py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
                    >
                      {isSubmitting
                        ? 'Opening payment...'
                        : 'Reserve my spot at just Rs 9'}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  )

}
