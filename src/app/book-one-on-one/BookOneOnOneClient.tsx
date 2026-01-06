'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { format, addDays, isWeekend, startOfWeek, addWeeks } from 'date-fns'
import Navbar from '@/components/shared/Navbar'

// Form validation schema
const bookingSchema = z.object({
  user_name: z.string().min(2, 'Name must be at least 2 characters'),
  user_email: z.string().email('Invalid email address'),
  user_phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  selected_date: z.string().min(1, 'Please select a date'),
  selected_time: z.string().min(1, 'Please select a time slot'),
})

type BookingFormData = z.infer<typeof bookingSchema>

// Three time slots available per day
const TIME_SLOTS = [
  { value: '19:00', label: '7:00 PM - 8:00 PM IST' },
  { value: '20:00', label: '8:00 PM - 9:00 PM IST' },
  { value: '21:00', label: '9:00 PM - 10:00 PM IST' },
]

// Get available dates - Only weekdays (Monday to Friday) for the next 4 weeks
function getAvailableDates() {
  const dates: Date[] = []
  const now = new Date()
  const today = new Date(now)
  today.setHours(0, 0, 0, 0) // Reset time to start of day
  
  // Check if today should be excluded based on current time
  // If it's past 10 PM (latest slot end time), exclude today
  const shouldExcludeToday = now.getHours() >= 22
  
  // Start from the earliest possible date
  let startDate = new Date(today)
  
  // If today is weekend, move to next Monday
  if (isWeekend(startDate)) {
    const daysUntilMonday = (8 - startDate.getDay()) % 7 || 7
    startDate = addDays(startDate, daysUntilMonday)
  } else if (shouldExcludeToday) {
    // If today is a weekday but all slots have passed, start from tomorrow
    startDate = addDays(startDate, 1)
    // If tomorrow is weekend, move to next Monday
    if (isWeekend(startDate)) {
      const daysUntilMonday = (8 - startDate.getDay()) % 7 || 7
      startDate = addDays(startDate, daysUntilMonday)
    }
  }
  
  // Generate weekdays for the next 4 weeks (20 weekdays total)
  let weekCount = 0
  while (dates.length < 20 && weekCount < 6) {
    // For each week, add Monday through Friday
    for (let dayOfWeek = 1; dayOfWeek <= 5; dayOfWeek++) {
      const weekStart = startOfWeek(startDate, { weekStartsOn: 1 }) // Monday
      const date = addDays(weekStart, dayOfWeek - 1 + (weekCount * 7))
      const dateOnly = new Date(date)
      dateOnly.setHours(0, 0, 0, 0)
      
      // Filter out past dates
      // Exclude if: date is before today, OR (date is today AND all slots have passed)
      const isPastDate = dateOnly < today || (dateOnly.getTime() === today.getTime() && shouldExcludeToday)
      
      if (!isPastDate && !isWeekend(date)) {
        dates.push(new Date(date))
      }
      
      if (dates.length >= 20) break
    }
    weekCount++
  }
  
  // Sort dates chronologically
  dates.sort((a, b) => a.getTime() - b.getTime())
  
  return dates
}

export default function BookOneOnOneClient() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [razorpayLoaded, setRazorpayLoaded] = useState(false)
  const [currentStep, setCurrentStep] = useState(1) // 1: Date, 2: Time, 3: Info
  const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>({})
  const [loadingBookedSlots, setLoadingBookedSlots] = useState(true)
  const scriptLoadedRef = useRef(false)
  
  // Fetch booked slots on component mount
  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const response = await fetch('/api/one-on-one/get-booked-dates')
        if (response.ok) {
          const data = await response.json()
          setBookedSlots(data.bookedSlots || {})
        }
      } catch (err) {
        console.error('Error fetching booked slots:', err)
      } finally {
        setLoadingBookedSlots(false)
      }
    }
    fetchBookedSlots()
  }, [])

  // All dates are available (we filter slots, not dates)
  const availableDates = useMemo(() => getAvailableDates(), [])

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

  // Get available time slots for a specific date
  const getAvailableTimeSlots = useCallback((dateStr: string) => {
    const bookedTimes = bookedSlots[dateStr] || []
    // Normalize booked times to HH:MM format (remove seconds if present)
    const normalizedBookedTimes = bookedTimes.map((time: string) => {
      if (time && time.includes(':')) {
        const parts = time.split(':')
        return `${parts[0]}:${parts[1]}` // Keep only HH:MM
      }
      return time
    })
    console.log('Date:', dateStr, 'Booked times (normalized):', normalizedBookedTimes)
    const available = TIME_SLOTS.filter(slot => !normalizedBookedTimes.includes(slot.value))
    console.log('Available slots:', available.map(s => s.value))
    return available
  }, [bookedSlots])

  // Get available slots for selected date
  const availableTimeSlotsForSelectedDate = useMemo(() => {
    if (!selectedDate) return []
    return getAvailableTimeSlots(selectedDate)
  }, [selectedDate, getAvailableTimeSlots])

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

  // Auto-select time if only one option is available (which is always the case now)
  useEffect(() => {
    if (TIME_SLOTS.length === 1 && !selectedTime) {
      setValue('selected_time', TIME_SLOTS[0].value, { shouldValidate: true })
    }
  }, [selectedTime, setValue])

  // Auto-advance to step 2 when date is selected (since there's only one time slot)
  useEffect(() => {
    if (selectedDate && currentStep === 1 && TIME_SLOTS.length === 1) {
      setValue('selected_time', TIME_SLOTS[0].value, { shouldValidate: true })
      // Small delay to show the selection before moving to next step
      setTimeout(() => {
        setCurrentStep(2)
      }, 300)
    }
  }, [selectedDate, currentStep, setValue])

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
      // Create booking and get Razorpay order
      const response = await fetch('/api/razorpay/create-one-on-one-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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

      // Get selected time label for display
      const selectedTimeSlot = TIME_SLOTS.find(slot => slot.value === data.selected_time)
      const timeLabel = selectedTimeSlot?.label || data.selected_time

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        amount: 118000, // ₹1000 in paise
        currency: 'INR',
        name: 'Lean Multiverse',
        description: `One-on-One Session - ${format(new Date(data.selected_date), 'MMM d, yyyy')} at ${timeLabel}`,
        order_id: orderId,
        handler: async function (response: {
          razorpay_order_id: string
          razorpay_payment_id: string
          razorpay_signature: string
        }) {
          // Payment successful - verify on server
          try {
            const verifyResponse = await fetch('/api/razorpay/verify-one-on-one-payment', {
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
              const successUrl = new URL('/book-one-on-one/success', window.location.origin)
              successUrl.searchParams.set('payment_id', response.razorpay_payment_id)
              successUrl.searchParams.set('order_id', response.razorpay_order_id)
              successUrl.searchParams.set('date', data.selected_date)
              successUrl.searchParams.set('time', data.selected_time)
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

  // Get time label for display
  const getTimeLabel = (timeValue: string) => {
    const slot = TIME_SLOTS.find(s => s.value === timeValue)
    return slot?.label || timeValue
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
              Book One-on-One Session
            </h1>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Get personalized career guidance from our experts. Choose a convenient weekday slot for your one-on-one session.
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
              <div className="flex items-center justify-center gap-2 mb-8">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
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
                    <p className="text-gray-400 text-sm mb-4">Available on weekdays (Monday - Friday) only. Three slots per day (8-9pm, 9-10pm, 10-11pm).</p>
                    {loadingBookedSlots ? (
                      <div className="w-full bg-white/10 border-2 border-white/20 text-white rounded-xl px-6 py-4 text-lg text-center">
                        <span className="text-gray-400">Loading available dates...</span>
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
                          {availableDates.length === 0 ? (
                            <option value="" disabled className="bg-gray-800 text-gray-500">
                              No dates available
                            </option>
                          ) : (
                            availableDates.map((date) => {
                              const dateStr = format(date, 'yyyy-MM-dd')
                              const dayName = format(date, 'EEEE')
                              const dayNum = format(date, 'd')
                              const month = format(date, 'MMMM yyyy')
                              const bookedCount = bookedSlots[dateStr]?.length || 0
                              const availableCount = TIME_SLOTS.length - bookedCount
                              return (
                                <option key={dateStr} value={dateStr} className="bg-gray-800 text-white">
                                  {dayName}, {dayNum} {month} {availableCount > 0 ? `(${availableCount} slot${availableCount > 1 ? 's' : ''} available)` : '(Fully booked)'}
                                </option>
                              )
                            })
                          )}
                        </select>
                        {errors.selected_date && (
                          <p className="text-red-400 text-sm mt-2">{errors.selected_date.message}</p>
                        )}
                      </>
                    )}
                  </div>
                  
                  {selectedDate && (
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
                      Select your preferred time slot <span className="text-red-400">*</span>
                    </Label>
                    {selectedDate && (
                      <p className="text-gray-400 text-sm mb-4">
                        Available slots for {format(new Date(selectedDate), 'MMMM d, yyyy')}
                      </p>
                    )}
                    {availableTimeSlotsForSelectedDate.length === 0 ? (
                      <div className="bg-red-500/20 border-2 border-red-500/50 rounded-xl p-6 text-center">
                        <p className="text-red-400 font-semibold">All slots are booked for this date</p>
                        <p className="text-gray-400 text-sm mt-2">Please select a different date</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-3">
                        {availableTimeSlotsForSelectedDate.map((slot) => {
                          const isSelected = selectedTime === slot.value
                          
                          return (
                            <button
                              key={slot.value}
                              type="button"
                              onClick={() => {
                                setValue('selected_time', slot.value, { shouldValidate: true })
                              }}
                              className={`p-6 rounded-xl border-2 transition-all text-left ${
                                isSelected
                                  ? 'border-yellow-400 bg-yellow-400/20 text-yellow-400'
                                  : 'border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xl font-semibold">{slot.label}</span>
                                {isSelected && (
                                  <div className="text-yellow-400">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    )}
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
                    {selectedTime && availableTimeSlotsForSelectedDate.length > 0 && (
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
                    <div className="text-4xl font-bold text-yellow-400 mb-2">₹1,000 + <span className='text-2xl'>18% GST</span></div>
                    {selectedDate && selectedTime && (
                      <div className="text-gray-300 text-sm mt-2">
                        {format(new Date(selectedDate), 'MMMM d')}, {getTimeLabel(selectedTime)}
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
              After payment, you&apos;ll receive a confirmation email with the meeting link.
            </p>
            <p className="mt-2">
              All times are in IST (Indian Standard Time). Sessions are available on weekdays only (Monday - Friday).
            </p>
          </motion.div>
        </div>
      </div>
    </>
  )
}

