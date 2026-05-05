'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format } from 'date-fns'
import { getAvailableDatesAiMl, getZoomLinkForDateAiMl, AI_ML_WEBINAR_TIME_SLOTS as TIME_SLOTS } from '@/lib/ai-ml-webinar-config'
import { trackMetaEvent } from '@/lib/meta-pixel'
import { getAttributionForApi } from '@/lib/attribution'
import { useIsMobile } from '@/hooks/useIsMobile'
import '@/components/webinar/book-webinar.css'

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

export default function BookAiMlWebinarContent() {
  const [mounted, setMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [razorpayLoaded, setRazorpayLoaded] = useState(false)
  const scriptLoadedRef = useRef(false)
  const isMobile = useIsMobile(1023)
  const availableDates = useMemo(() => getAvailableDatesAiMl(), [])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    watch,
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

  const selectedDate = watch('selected_date')
  const selectedTime = watch('selected_time')
  const userName = watch('user_name')
  const userEmail = watch('user_email')
  const userPhone = watch('user_phone')
  const hearFrom = watch('hear_from')
  const isFormReady = selectedDate && selectedTime && userName && userEmail && userPhone && hearFrom && isValid

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (availableDates.length > 0 && !selectedDate) {
      setValue('selected_date', format(availableDates[0], 'yyyy-MM-dd'), { shouldValidate: true })
    }
    if (TIME_SLOTS.length >= 1 && !selectedTime) {
      setValue('selected_time', TIME_SLOTS[0].value, { shouldValidate: true })
    }
  }, [availableDates, selectedDate, selectedTime, setValue])

  const handleDateSelect = (dateStr: string) => {
    setValue('selected_date', dateStr, { shouldValidate: true })
  }

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
    trackMetaEvent('ViewContent', { content_name: 'AI/ML Webinar Booking', content_type: 'product' })
  }, [])

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true)
    setError(null)
    try {
      const zoomLink = getZoomLinkForDateAiMl(data.selected_date)
      const utm = getAttributionForApi()
      const response = await fetch('/api/razorpay/create-ai-ml-order', {
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
        amount: 9900,
        currency: 'INR',
        name: 'Lean Multiverse',
        description: 'AI & Machine Learning Webinar',
        order_id: orderId,
        handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          try {
            const verifyRes = await fetch('/api/razorpay/verify-ai-ml-payment', {
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
              const url = new URL('/ai-ml/success', window.location.origin)
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
        theme: { color: '#fbbf24' },
        modal: { ondismiss: () => setIsSubmitting(false) },
      }
      new Razorpay(options).open()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
      setIsSubmitting(false)
    }
  }

  const inputClasses = "mt-1 w-full rounded-xl border border-gray-200 bg-white text-gray-900 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
  const labelClasses = "block text-[11px] text-gray-600 font-semibold"


  /* ───── Mobile layout ───── */
  const mobileForm = (
    <div className="block lg:hidden w-full mx-auto min-w-0 px-1">
      <h1 className="text-2xl font-extrabold text-gray-900 leading-tight mb-3">
        Learn AI & Machine Learning From Real Industry Experts
      </h1>
      <p className="text-sm text-gray-600 mb-4">
        Training designed to prepare you for globally recognized certifications.
      </p>

      <div className="relative border border-gray-200 rounded-2xl p-5 mb-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
        <div
          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 to-amber-500 rounded-l-2xl"
          aria-hidden
        />
        <div className="pl-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Reserve your webinar seat
          </h2>
          <p className="text-xs text-gray-600 mb-4">
            {mounted && selectedDate ? format(new Date(selectedDate), 'EEEE, MMM d') : 'Select date'} · 8:00 PM IST · ₹99
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <input type="hidden" {...register('selected_date')} />
            <input type="hidden" {...register('selected_time')} />
            
            <div>
              <label htmlFor="aiml-mobile-name" className={labelClasses}>Full name</label>
              <input id="aiml-mobile-name" {...register('user_name')} placeholder="Your full name" className={inputClasses} />
              {errors.user_name && <p className="text-red-500 text-xs mt-0.5">{errors.user_name.message}</p>}
            </div>
            <div>
              <label htmlFor="aiml-mobile-email" className={labelClasses}>Email</label>
              <input id="aiml-mobile-email" type="email" {...register('user_email')} placeholder="you@example.com" className={inputClasses} />
              {errors.user_email && <p className="text-red-500 text-xs mt-0.5">{errors.user_email.message}</p>}
            </div>
            <div>
              <label htmlFor="aiml-mobile-phone" className={labelClasses}>Mobile (+91)</label>
              <input id="aiml-mobile-phone" type="tel" {...register('user_phone')} placeholder="9876543210" inputMode="numeric" autoComplete="tel" className={inputClasses} />
              {errors.user_phone && <p className="text-red-500 text-xs mt-0.5">{errors.user_phone.message}</p>}
            </div>
            <div>
              <label htmlFor="aiml-mobile-hear" className={labelClasses}>Where did you hear about us?</label>
              <select
                id="aiml-mobile-hear"
                {...register('hear_from')}
                className={`${inputClasses} appearance-none cursor-pointer pr-9`}
                style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
                  backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1rem',
                }}
              >
                {HEAR_FROM_OPTIONS.map((opt) => (
                  <option key={opt.value || 'none'} value={opt.value} className="bg-white text-gray-900">{opt.label}</option>
                ))}
              </select>
            </div>
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <p className="text-[11px] text-gray-500">
              <span className="font-semibold text-amber-600">100% value satisfaction</span> · Secure payment via Razorpay
            </p>
            <button
              type="submit"
              disabled={isSubmitting || !isFormReady}
              className="book-webinar-cta book-webinar-cta-primary w-full py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm font-black uppercase tracking-wider"
              style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', color: '#fff' }}
            >
              {isSubmitting ? 'Opening payment...' : 'Reserve my spot at just Rs 99'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )

  /* ───── Desktop layout (two-column like landing page) ───── */
  const desktopLayout = (
    <div className="book-webinar-content max-w-6xl mx-auto hidden lg:block">
      <section className="book-webinar-hero-grid relative">
        <div className="book-webinar-hero-glow" aria-hidden />

        {/* LEFT — Content side */}
        <div className="book-webinar-hero-left">
          <h1 className="book-webinar-hero-headline">
            <span className="book-webinar-hero-line1">
              Master AI & Machine Learning{' '}
            </span>
            <span className="book-webinar-gold book-webinar-hero-line2" style={{ color: '#fbbf24' }}>
              From Real Industry Experts.
            </span>
          </h1>
          <p className="book-webinar-hero-sub">
            Training Designed To Prepare You For Globally Recognized Certifications — Azure AI, AWS ML & More.
          </p>
          <p className="book-webinar-hero-creds">
            AI Engineer | ML Engineer | Data Scientist | AI Product Analyst
          </p>
          <p className="book-webinar-hero-badge" style={{ background: '#fffbeb', borderColor: '#fbbf24' }}>
            40%–120% Salary Growth After Training
          </p>

          {/* Benefits */}
          <div className="mt-6 space-y-3">
            {[
              { icon: '🎯', text: 'Hands-on projects with real enterprise AI systems' },
              { icon: '📜', text: 'Certification-aligned curriculum (Azure AI, AWS ML)' },
              { icon: '👨‍🏫', text: 'Learn from engineers at Deloitte, Google & more' },
              { icon: '🚀', text: '70–80% market demand growth in AI/ML roles' },
            ].map((b) => (
              <div key={b.text} className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
                <span className="text-lg">{b.icon}</span>
                <span className="text-sm text-gray-700">{b.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Form side */}
        <div className="book-webinar-hero-right">
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
                  {mounted && selectedDate ? format(new Date(selectedDate), 'EEEE, MMM d') : 'Select date'} · 8:00 PM IST · ₹99
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                  <input type="hidden" {...register('selected_date')} />
                  <input type="hidden" {...register('selected_time')} />
                  
                  <div>
                    <label htmlFor="aiml-desk-name" className={labelClasses}>Full name</label>
                    <input id="aiml-desk-name" {...register('user_name')} placeholder="Your full name" className={inputClasses} />
                    {errors.user_name && <p className="text-red-500 text-xs mt-0.5">{errors.user_name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="aiml-desk-email" className={labelClasses}>Email</label>
                    <input id="aiml-desk-email" type="email" {...register('user_email')} placeholder="you@example.com" className={inputClasses} />
                    {errors.user_email && <p className="text-red-500 text-xs mt-0.5">{errors.user_email.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="aiml-desk-phone" className={labelClasses}>Mobile (+91)</label>
                    <input id="aiml-desk-phone" type="tel" {...register('user_phone')} placeholder="9876543210" inputMode="numeric" autoComplete="tel" className={inputClasses} />
                    {errors.user_phone && <p className="text-red-500 text-xs mt-0.5">{errors.user_phone.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="aiml-desk-hear" className={labelClasses}>Where did you hear about us?</label>
                    <select
                      id="aiml-desk-hear"
                      {...register('hear_from')}
                      className={`${inputClasses} appearance-none cursor-pointer pr-9`}
                      style={{
                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
                        backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1rem',
                      }}
                    >
                      {HEAR_FROM_OPTIONS.map((opt) => (
                        <option key={opt.value || 'none'} value={opt.value} className="bg-white text-gray-900">{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  {error && <p className="text-red-500 text-xs">{error}</p>}
                  <p className="text-[11px] text-gray-500">
                    <span className="font-semibold text-yellow-600">100% value satisfaction</span> · Secure payment via Razorpay
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting || !isFormReady}
                    className="book-webinar-cta book-webinar-cta-primary w-full py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm font-black uppercase tracking-wider"
                    style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', color: '#fff', boxShadow: '0 15px 40px rgba(245, 158, 11, 0.35)' }}
                  >
                    {isSubmitting ? 'Opening payment...' : 'Reserve my spot at just Rs 99'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )

  return (
    <>
      {isMobile ? mobileForm : desktopLayout}
    </>
  )
}
