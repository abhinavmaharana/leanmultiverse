'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
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
  getAvailableDatesPaid,
  getZoomLinkForDatePaid,
  WEBINAR_TIME_SLOTS as TIME_SLOTS,
} from '@/lib/webinar-config'

// Form validation schema
const bookingSchema = z.object({
  user_name: z.string().min(2, 'Name must be at least 2 characters'),
  user_email: z.string().email('Invalid email address'),
  user_phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  selected_date: z.string().min(1, 'Please select a date'),
  selected_time: z.string().min(1, 'Please select a time slot'),
})

type BookingFormData = z.infer<typeof bookingSchema>

export default function BookWebinarClient() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [razorpayLoaded, setRazorpayLoaded] = useState(false)
  const [currentStep, setCurrentStep] = useState(1) // 1: Date, 2: Time, 3: Info
  const scriptLoadedRef = useRef(false)
  const availableDates = useMemo(() => getAvailableDatesPaid(), [])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: 'onChange', // Validate on change for better UX
  })

  const selectedDate = watch('selected_date')
  const selectedTime = watch('selected_time')
  const userName = watch('user_name')
  const userEmail = watch('user_email')
  const userPhone = watch('user_phone')

  // Check if form is ready for submission
  const isFormReady = selectedDate && selectedTime && userName && userEmail && userPhone && isValid

  // Preload Razorpay script on component mount for faster checkout
  useEffect(() => {
    // Check if Razorpay is already loaded
    if (typeof window !== 'undefined' && (window as typeof window & { Razorpay?: unknown }).Razorpay) {
      setRazorpayLoaded(true)
      scriptLoadedRef.current = true
      return
    }

    // Check if script is already in the DOM
    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')
    if (existingScript) {
      existingScript.addEventListener('load', () => {
        setRazorpayLoaded(true)
        scriptLoadedRef.current = true
      })
      // If script is already loading/loaded, check if Razorpay is available
      if ((window as typeof window & { Razorpay?: unknown }).Razorpay) {
        setRazorpayLoaded(true)
        scriptLoadedRef.current = true
      }
      return
    }

    // Load the script
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.defer = true
    script.onload = () => {
      setRazorpayLoaded(true)
      scriptLoadedRef.current = true
    }
    script.onerror = () => {
      console.error('Failed to load Razorpay script')
      setError('Failed to load payment gateway. Please refresh the page and try again.')
    }
    document.body.appendChild(script)

    return () => {
      // Cleanup: don't remove script on unmount as it might be used by other components
    }
  }, [])

  // Auto-select time if only one option is available
  useEffect(() => {
    if (TIME_SLOTS.length === 1 && !selectedTime) {
      setValue('selected_time', TIME_SLOTS[0].value, { shouldValidate: true })
    }
  }, [selectedTime, setValue])

  // Handle step navigation
  const handleNext = () => {
    if (currentStep === 1 && selectedDate) {
      setCurrentStep(2)
    } else if (currentStep === 2 && selectedTime) {
      setCurrentStep(3)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Handle date selection from dropdown
  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dateStr = e.target.value
    if (dateStr) {
      setValue('selected_date', dateStr, { shouldValidate: true })
    }
  }


  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Get the appropriate Zoom link for the selected date
      const zoomLink = getZoomLinkForDatePaid(data.selected_date)
      
      // Create booking and get Razorpay order
      const response = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          zoom_registration_link: zoomLink,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create booking')
      }

      const { orderId, bookingId } = await response.json()

      // Wait for Razorpay script to load if not already loaded
      const waitForRazorpay = (): Promise<void> => {
        return new Promise((resolve, reject) => {
          if (scriptLoadedRef.current && (window as typeof window & { Razorpay?: unknown }).Razorpay) {
            resolve()
            return
          }

          // Check if script is already in DOM
          const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')
          if (existingScript) {
            const checkRazorpay = setInterval(() => {
              if ((window as typeof window & { Razorpay?: unknown }).Razorpay) {
                clearInterval(checkRazorpay)
                scriptLoadedRef.current = true
                setRazorpayLoaded(true)
                resolve()
              }
            }, 100)

            // Timeout after 10 seconds
            setTimeout(() => {
              clearInterval(checkRazorpay)
              reject(new Error('Razorpay script loading timeout'))
            }, 10000)

            existingScript.addEventListener('load', () => {
              clearInterval(checkRazorpay)
              scriptLoadedRef.current = true
              setRazorpayLoaded(true)
              resolve()
            })
            return
          }

          // Load script if not present
          const script = document.createElement('script')
          script.src = 'https://checkout.razorpay.com/v1/checkout.js'
          script.async = true
          script.defer = true
          script.onload = () => {
            scriptLoadedRef.current = true
            setRazorpayLoaded(true)
            resolve()
          }
          script.onerror = () => {
            reject(new Error('Failed to load Razorpay script'))
          }
          document.body.appendChild(script)
        })
      }

      // Wait for Razorpay to be ready
      await waitForRazorpay()

      // Initialize Razorpay checkout
      const Razorpay = (window as typeof window & { Razorpay: new (options: unknown) => { open: () => void } }).Razorpay
      
      if (!Razorpay) {
        throw new Error('Razorpay is not available. Please refresh the page and try again.')
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        amount: 11682, // ₹99 + 18% GST in paise
        currency: 'INR',
        name: 'Lean Multiverse',
        description: 'Webinar Booking - Product Manager | Project Manager | Program Management Career Roadmap',
        order_id: orderId,
        handler: async function (response: {
          razorpay_order_id: string
          razorpay_payment_id: string
          razorpay_signature: string
        }) {
          // Payment successful - verify on server
          try {
            const verifyResponse = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                booking_id: bookingId,
              }),
            })

            if (verifyResponse.ok) {
              // After successful payment, redirect to success page with payment details
              const successUrl = new URL('/book-webinar/success', window.location.origin)
              successUrl.searchParams.set('payment_id', response.razorpay_payment_id)
              successUrl.searchParams.set('order_id', response.razorpay_order_id)
              successUrl.searchParams.set('date', data.selected_date)
              window.location.href = successUrl.toString()
            } else {
              const errorData = await verifyResponse.json().catch(() => ({}))
              throw new Error(errorData.error || 'Payment verification failed')
            }
          } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Payment verification failed'
            console.error('Payment verification error:', err)
            setError(`${errorMessage}. Please contact support if payment was successful.`)
            setIsSubmitting(false)
          }
        },
        prefill: {
          name: data.user_name,
          email: data.user_email,
          contact: data.user_phone,
        },
        theme: {
          color: '#C69D44',
        },
        modal: {
          ondismiss: function() {
            setIsSubmitting(false)
          },
        },
      }

      const razorpay = new Razorpay(options)
      razorpay.open()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setError(errorMessage)
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Product Manager | Project Manager | Program Management Career Roadmap Webinar
            </h1>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Want to move from your current job—sales, operations, support, HR, finance, tech—into high-growth management roles? 
              Learn the exact pathways to become a Product Owner, Product Manager, Project Manager, or Program Manager.
            </p>
          </motion.div>

          {/* Booking Form - Typeform Style */}
          <motion.div
            className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.05 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Hidden inputs for form validation */}
              <input type="hidden" {...register('selected_date')} />
              <input type="hidden" {...register('selected_time')} />

              {/* Progress Indicator */}
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
                      currentStep >= step
                        ? 'bg-yellow-400 w-8'
                        : 'bg-white/20 w-2'
                    }`}
                  />
                ))}
              </div>

              {/* Multi-step Form */}
              <AnimatePresence mode="wait">
                {/* Step 1: Date Selection */}
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
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3C/polyline%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 1rem center',
                            backgroundSize: '1.5rem',
                            paddingRight: '3rem',
                          }}
                        >
                          <option value="" className="bg-gray-800 text-white">
                            Choose a date...
                          </option>
                          {availableDates.map((date) => {
                            const dateStr = format(date, 'yyyy-MM-dd')
                            const dayName = format(date, 'EEEE')
                            const dayNum = format(date, 'd')
                            const month = format(date, 'MMMM yyyy')
                            return (
                              <option key={dateStr} value={dateStr} className="bg-gray-800 text-white">
                                {dayName}, {dayNum} {month}
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
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        type="button"
                        onClick={handleNext}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 rounded-xl py-4 text-base md:text-lg font-semibold transition-all duration-150"
                      >
                        Next →
                      </Button>
                    </motion.div>
                  )}
                  </motion.div>
                )}

                {/* Step 2: Time Selection */}
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
                          onClick={() => {
                            setValue('selected_time', slot.value, { shouldValidate: true })
                          }}
                          className={`p-6 rounded-xl border-2 transition-all text-left ${
                            selectedTime === slot.value
                              ? 'border-yellow-400 bg-yellow-400/20 text-yellow-400'
                              : 'border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xl font-semibold">{slot.label}</span>
                            {selectedTime === slot.value && (
                              <div className="text-yellow-400">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
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
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-1"
                      >
                        <Button
                          type="button"
                          onClick={handleNext}
                          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 rounded-xl py-4 text-base md:text-lg font-semibold transition-all duration-150"
                        >
                          Next →
                        </Button>
                      </motion.div>
                    )}
                  </div>
                  </motion.div>
                )}

                {/* Step 3: User Information */}
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
                    <Label className="text-white mb-6 block text-2xl font-semibold">
                      Your Information
                    </Label>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <Label htmlFor="user_name" className="text-white mb-3 block text-lg">
                        Full Name <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="user_name"
                        {...register('user_name')}
                        autoComplete="name"
                        className="bg-white/10 border-2 border-white/20 text-white placeholder:text-gray-400 rounded-xl px-6 py-4 text-lg focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50"
                        placeholder="Enter your full name"
                      />
                      {errors.user_name && (
                        <p className="text-red-400 text-sm mt-2">{errors.user_name.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="user_email" className="text-white mb-3 block text-lg">
                        Email Address <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="user_email"
                        type="email"
                        {...register('user_email')}
                        autoComplete="email"
                        className="bg-white/10 border-2 border-white/20 text-white placeholder:text-gray-400 rounded-xl px-6 py-4 text-lg focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50"
                        placeholder="your.email@example.com"
                      />
                      {errors.user_email && (
                        <p className="text-red-400 text-sm mt-2">{errors.user_email.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="user_phone" className="text-white mb-3 block text-lg">
                        Phone Number <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="user_phone"
                        type="tel"
                        {...register('user_phone')}
                        autoComplete="tel"
                        inputMode="tel"
                        className="bg-white/10 border-2 border-white/20 text-white placeholder:text-gray-400 rounded-xl px-6 py-4 text-lg focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50"
                        placeholder="+91 9876543210"
                      />
                      {errors.user_phone && (
                        <p className="text-red-400 text-sm mt-2">{errors.user_phone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Price Display */}
                  <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border border-yellow-400/30 rounded-xl p-6 text-center">
                    <div className="text-gray-300 text-sm mb-1">Total Amount</div>
                    <div className="text-4xl font-bold text-yellow-400 mb-2">₹99 + <span className='text-2xl'>18% GST</span></div>
                    {selectedDate && (
                      <div className="text-gray-300 text-sm mt-2">
                        {format(new Date(selectedDate), 'MMMM d')}, 8:00 PM IST
                      </div>
                    )}
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-red-200">
                      {error}
                    </div>
                  )}

                  {/* Navigation and Submit */}
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
                    className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 rounded-xl py-4 text-base md:text-lg font-semibold transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
                    </Button>
                  </div>

                  {/* Form Status Indicator */}
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

          {/* Info Section */}
          <motion.div
            className="mt-8 text-center text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p>
              After payment, you&apos;ll be redirected to complete your Zoom registration and receive a confirmation email.
            </p>
            <p className="mt-2">
              All times are in IST (Indian Standard Time). Webinars are scheduled for 8:00 PM IST.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  )
}

