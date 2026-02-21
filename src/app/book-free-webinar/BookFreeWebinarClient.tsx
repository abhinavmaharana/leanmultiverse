'use client'

import { useState, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { format } from 'date-fns'
import Navbar from '@/components/shared/Navbar'
import {
  getAvailableDatesFree,
  getZoomLinkForDateFree,
  WEBINAR_TIME_SLOTS as TIME_SLOTS,
} from '@/lib/webinar-config'
import { trackMetaEvent } from '@/lib/meta-pixel'

const bookingSchema = z.object({
  user_name: z.string().min(2, 'Name must be at least 2 characters'),
  user_email: z.string().email('Invalid email address'),
  user_phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  selected_date: z.string().min(1, 'Please select a date'),
  selected_time: z.string().min(1, 'Please select a time slot'),
})

type BookingFormData = z.infer<typeof bookingSchema>

export default function BookFreeWebinarClient() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const availableDates = useMemo(() => getAvailableDatesFree(), [])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: 'onChange',
  })

  const selectedDate = watch('selected_date')
  const selectedTime = watch('selected_time')
  const userName = watch('user_name')
  const userEmail = watch('user_email')
  const userPhone = watch('user_phone')

  const isFormReady = selectedDate && selectedTime && userName && userEmail && userPhone && isValid

  useEffect(() => {
    trackMetaEvent('ViewContent', {
      content_name: 'Free Webinar Registration',
      content_type: 'product',
    })
  }, [])

  useEffect(() => {
    if (TIME_SLOTS.length === 1 && !selectedTime) {
      setValue('selected_time', TIME_SLOTS[0].value, { shouldValidate: true })
    }
  }, [selectedTime, setValue])

  const handleNext = () => {
    if (currentStep === 1 && selectedDate) setCurrentStep(2)
    else if (currentStep === 2 && selectedTime) setCurrentStep(3)
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dateStr = e.target.value
    if (dateStr) setValue('selected_date', dateStr, { shouldValidate: true })
  }

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true)
    setError(null)
    try {
      const zoomLink = getZoomLinkForDateFree(data.selected_date)
      const response = await fetch('/api/free-webinar/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          zoom_registration_link: zoomLink,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Registration failed')
      }

      trackMetaEvent('Lead')

      const successUrl = new URL('/book-free-webinar/success', window.location.origin)
      successUrl.searchParams.set('date', data.selected_date)
      window.location.href = successUrl.toString()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Free Webinar – Product Manager | Project Manager | Program Management Career Roadmap
            </h1>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Want to move from your current job—sales, operations, support, HR, finance, tech—into high-growth management roles?
              Learn the exact pathways to become a Product Owner, Product Manager, Project Manager, or Program Manager. <span className="text-yellow-400 font-semibold">No payment required.</span>
            </p>
          </motion.div>

          <motion.div
            className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.05 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <input type="hidden" {...register('selected_date')} />
              <input type="hidden" {...register('selected_time')} />

              <div
                className="flex items-center justify-center gap-2 mb-8"
                role="progressbar"
                aria-valuenow={currentStep}
                aria-valuemin={1}
                aria-valuemax={3}
                aria-label="Booking progress"
              >
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    aria-current={currentStep === step ? 'step' : undefined}
                    className={`h-2 rounded-full transition-all ${
                      currentStep >= step ? 'bg-yellow-400 w-8' : 'bg-white/20 w-2'
                    }`}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <Label htmlFor="date" className="text-white mb-4 block text-2xl font-semibold">
                        Select your preferred date <span className="text-red-400">*</span>
                      </Label>
                      {availableDates.length === 0 ? (
                        <div className="rounded-xl bg-white/10 border-2 border-white/20 p-6 text-center">
                          <p className="text-gray-300 mb-2">No upcoming webinars at the moment.</p>
                          <p className="text-gray-400 text-sm">Check back soon or <a href="mailto:operations@leanmultiverse.com" className="text-yellow-400 hover:underline">contact us</a> for future dates.</p>
                        </div>
                      ) : (
                        <>
                          <select
                            id="date"
                            value={selectedDate || ''}
                            onChange={handleDateChange}
                            className="w-full bg-white/10 border-2 border-white/20 text-white rounded-xl px-6 py-4 text-lg focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 transition-all appearance-none cursor-pointer"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'right 1rem center',
                              backgroundSize: '1.5rem',
                              paddingRight: '3rem',
                            }}
                          >
                            <option value="" className="bg-gray-800 text-white">Choose a date...</option>
                            {availableDates.map((date) => {
                              const dateStr = format(date, 'yyyy-MM-dd')
                              return (
                                <option key={dateStr} value={dateStr} className="bg-gray-800 text-white">
                                  {format(date, 'EEEE, d MMMM yyyy')}
                                </option>
                              )
                            })}
                          </select>
                          {errors.selected_date && (
                            <p className="text-red-400 text-sm mt-2">{errors.selected_date.message}</p>
                          )}
                        </>
                      )}
                    </div>
                    {selectedDate && availableDates.length > 0 && (
                      <Button
                        type="button"
                        onClick={handleNext}
                        className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 rounded-xl py-4 text-base md:text-lg font-semibold"
                      >
                        Next →
                      </Button>
                    )}
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <Label htmlFor="time" className="text-white mb-4 block text-2xl font-semibold">
                        Select your preferred time <span className="text-red-400">*</span>
                      </Label>
                      <div className="grid grid-cols-1 gap-3" role="radiogroup" aria-label="Select your preferred time">
                        {TIME_SLOTS.map((slot) => (
                          <button
                            key={slot.value}
                            type="button"
                            role="radio"
                            aria-checked={selectedTime === slot.value}
                            onClick={() => setValue('selected_time', slot.value, { shouldValidate: true })}
                            className={`p-6 rounded-xl border-2 transition-all text-left ${
                              selectedTime === slot.value
                                ? 'border-yellow-400 bg-yellow-400/20 text-yellow-400'
                                : 'border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xl font-semibold">{slot.label}</span>
                              {selectedTime === slot.value && (
                                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                      {errors.selected_time && (
                        <p className="text-red-400 text-sm mt-2">{errors.selected_time.message}</p>
                      )}
                    </div>
                    <div className="flex gap-4">
                      <Button
                        type="button"
                        onClick={handleBack}
                        variant="outline"
                        className="flex-1 border-white/20 bg-white/10 text-white hover:bg-white/20 rounded-xl py-4 text-lg font-semibold"
                      >
                        ← Back
                      </Button>
                      {selectedTime && (
                        <Button
                          type="button"
                          onClick={handleNext}
                          className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 rounded-xl py-4 text-base md:text-lg font-semibold"
                        >
                          Next →
                        </Button>
                      )}
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <Label className="text-white mb-6 block text-2xl font-semibold">Your Information</Label>
                    </div>
                    <div className="space-y-5">
                      <div>
                        <Label htmlFor="user_name" className="text-white mb-3 block text-lg">Full Name <span className="text-red-400">*</span></Label>
                        <Input
                          id="user_name"
                          {...register('user_name')}
                          autoComplete="name"
                          className="bg-white/10 border-2 border-white/20 text-white placeholder:text-gray-400 rounded-xl px-6 py-4 text-lg focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50"
                          placeholder="Enter your full name"
                        />
                        {errors.user_name && <p className="text-red-400 text-sm mt-2">{errors.user_name.message}</p>}
                      </div>
                      <div>
                        <Label htmlFor="user_email" className="text-white mb-3 block text-lg">Email Address <span className="text-red-400">*</span></Label>
                        <Input
                          id="user_email"
                          type="email"
                          {...register('user_email')}
                          autoComplete="email"
                          className="bg-white/10 border-2 border-white/20 text-white placeholder:text-gray-400 rounded-xl px-6 py-4 text-lg focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50"
                          placeholder="your.email@example.com"
                        />
                        {errors.user_email && <p className="text-red-400 text-sm mt-2">{errors.user_email.message}</p>}
                      </div>
                      <div>
                        <Label htmlFor="user_phone" className="text-white mb-3 block text-lg">Phone Number <span className="text-red-400">*</span></Label>
                        <Input
                          id="user_phone"
                          type="tel"
                          {...register('user_phone')}
                          autoComplete="tel"
                          inputMode="tel"
                          className="bg-white/10 border-2 border-white/20 text-white placeholder:text-gray-400 rounded-xl px-6 py-4 text-lg focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50"
                          placeholder="+91 9876543210"
                        />
                        {errors.user_phone && <p className="text-red-400 text-sm mt-2">{errors.user_phone.message}</p>}
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-400/20 to-green-600/20 border border-green-400/30 rounded-xl p-6 text-center">
                      <div className="text-gray-300 text-sm mb-1">Registration</div>
                      <div className="text-4xl font-bold text-green-400 mb-2">Free</div>
                      {selectedDate && (
                        <div className="text-gray-300 text-sm mt-2">
                          {format(new Date(selectedDate), 'MMMM d')}, 8:00 PM IST
                        </div>
                      )}
                    </div>

                    {error && (
                      <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-red-200">{error}</div>
                    )}

                    <div className="flex gap-4">
                      <Button
                        type="button"
                        onClick={handleBack}
                        variant="outline"
                        className="flex-1 border-white/20 bg-white/10 text-white hover:bg-white/20 rounded-xl py-4 text-lg font-semibold"
                      >
                        ← Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting || !isFormReady}
                        className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 rounded-xl py-4 text-base md:text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Registering...' : 'Confirm Registration'}
                      </Button>
                    </div>

                    {!isFormReady && (
                      <div className="bg-blue-500/20 border border-blue-500/50 rounded-xl p-4 text-blue-200 text-sm">
                        <p className="font-semibold mb-2">Please complete all fields:</p>
                        <ul className="list-disc list-inside space-y-1">
                          {!userName && <li>Enter your full name</li>}
                          {!userEmail && <li>Enter your email address</li>}
                          {!userPhone && <li>Enter your phone number</li>}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          <motion.div
            className="mt-8 text-center text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p>After registering, you&apos;ll receive a confirmation email with the Zoom link and calendar invite.</p>
            <p className="mt-2">All times are in IST (Indian Standard Time). Webinars are scheduled for 8:00 PM IST.</p>
          </motion.div>
        </div>
      </div>
    </>
  )
}
