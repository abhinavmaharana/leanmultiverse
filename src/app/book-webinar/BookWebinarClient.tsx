'use client'

import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { format } from 'date-fns'
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

// Zoom registration links mapped by date
const ZOOM_LINKS: Record<string, string> = {
  '13': 'https://us06web.zoom.us/meeting/register/oc2syBDwTkWNTu0dhVd4qA',
  '20': 'https://us06web.zoom.us/meeting/register/7_BwX278QL6XL0DFIdRCBA',
}

// Available time slots in IST
const TIME_SLOTS = [
  { value: '20:00', label: '8:00 PM IST' },
]

// Get available dates - December 20th only
function getAvailableDates() {
  const dates: Date[] = []
  const today = new Date()
  const currentYear = today.getFullYear()
  
  // December 20th of current year
  const december20 = new Date(currentYear, 11, 20) // Month is 0-indexed, so 11 = December
  
  // If date has passed this year, use next year
  if (december20 < today) {
    december20.setFullYear(currentYear + 1)
  }
  
  // Add date if it's today or in the future
  if (december20 >= today) {
    dates.push(december20)
  }
  
  return dates
}

// Get Zoom link for a specific date
function getZoomLinkForDate(dateStr: string): string {
  const date = new Date(dateStr)
  const day = date.getDate().toString()
  return ZOOM_LINKS[day] || ZOOM_LINKS['13'] // Default to 13th if not found
}

export default function BookWebinarClient() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [razorpayLoaded, setRazorpayLoaded] = useState(false)
  const scriptLoadedRef = useRef(false)
  const availableDates = getAvailableDates()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  })

  const selectedDate = watch('selected_date')
  const selectedTime = watch('selected_time')

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

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Get the appropriate Zoom link for the selected date
      const zoomLink = getZoomLinkForDate(data.selected_date)
      
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
        amount: 9900, // ₹99 in paise
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
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Product Manager | Project Manager | Program Management Career Roadmap Webinar
            </h1>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Want to move from your current job—sales, operations, support, HR, finance, tech—into high-growth management roles? 
              Learn the exact pathways to become a Product Owner, Product Manager, Project Manager, or Program Manager.
            </p>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Date Selection */}
              <div>
                <Label htmlFor="date" className="text-white mb-3 block text-lg font-semibold">
                  Select Date
                </Label>
                <div className="grid grid-cols-1 gap-3">
                  {availableDates.length > 0 ? (
                    availableDates.map((date) => {
                      const dateStr = format(date, 'yyyy-MM-dd')
                      const isSelected = selectedDate === dateStr
                      const dayName = format(date, 'EEEE')
                      const dayNum = format(date, 'd')
                      const month = format(date, 'MMMM yyyy')

                      return (
                        <button
                          key={dateStr}
                          type="button"
                          onClick={() => setValue('selected_date', dateStr)}
                          className={`p-6 rounded-xl border-2 transition-all ${
                            isSelected
                              ? 'border-yellow-400 bg-yellow-400/20 text-yellow-400'
                              : 'border-white/20 bg-white/5 text-white hover:border-white/40'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="text-left">
                              <div className="text-sm font-medium text-gray-300">{dayName}</div>
                              <div className="text-3xl font-bold mt-1">{dayNum}</div>
                              <div className="text-sm text-gray-400 mt-1">{month}</div>
                            </div>
                            {isSelected && (
                              <div className="text-yellow-400">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </button>
                      )
                    })
                  ) : (
                    <div className="p-6 rounded-xl border-2 border-white/20 bg-white/5 text-center text-gray-400">
                      No available dates at this time
                    </div>
                  )}
                </div>
                {errors.selected_date && (
                  <p className="text-red-400 text-sm mt-2">{errors.selected_date.message}</p>
                )}
              </div>

              {/* Time Selection */}
              <div>
                <Label htmlFor="time" className="text-white mb-3 block text-lg font-semibold">
                  Select Time (IST)
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot.value}
                      type="button"
                      onClick={() => setValue('selected_time', slot.value)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedTime === slot.value
                          ? 'border-yellow-400 bg-yellow-400/20 text-yellow-400'
                          : 'border-white/20 bg-white/5 text-white hover:border-white/40'
                      }`}
                    >
                      {slot.label}
                    </button>
                  ))}
                </div>
                {errors.selected_time && (
                  <p className="text-red-400 text-sm mt-2">{errors.selected_time.message}</p>
                )}
              </div>

              {/* User Information */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Your Information</h3>

                <div>
                  <Label htmlFor="user_name" className="text-white mb-2 block">
                    Full Name
                  </Label>
                  <Input
                    id="user_name"
                    {...register('user_name')}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="Enter your full name"
                  />
                  {errors.user_name && (
                    <p className="text-red-400 text-sm mt-1">{errors.user_name.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="user_email" className="text-white mb-2 block">
                    Email Address
                  </Label>
                  <Input
                    id="user_email"
                    type="email"
                    {...register('user_email')}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="your.email@example.com"
                  />
                  {errors.user_email && (
                    <p className="text-red-400 text-sm mt-1">{errors.user_email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="user_phone" className="text-white mb-2 block">
                    Phone Number
                  </Label>
                  <Input
                    id="user_phone"
                    type="tel"
                    {...register('user_phone')}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="+91 9876543210"
                  />
                  {errors.user_phone && (
                    <p className="text-red-400 text-sm mt-1">{errors.user_phone.message}</p>
                  )}
                </div>
              </div>

              {/* Price Display */}
              <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border border-yellow-400/30 rounded-xl p-6 text-center">
                <div className="text-gray-300 text-sm mb-1">Total Amount</div>
                <div className="text-4xl font-bold text-yellow-400 mb-2">₹99</div>
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

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 rounded-xl py-6 text-lg font-semibold shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
              </Button>
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
              All times are in IST (Indian Standard Time). Webinar is scheduled for December 20th, 8:00 PM IST.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  )
}

