'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, User, Loader2, CheckCircle2 } from 'lucide-react'
import { CareerStarterCourse } from '@/data/careerStarterCourses'

declare global {
  interface Window {
    Razorpay: any
  }
}

/* -------------------- Types -------------------- */

interface GenericEnrollmentFormProps {
  course: CareerStarterCourse
}

interface FormData {
  name: string
  email: string
  phone: string
}

interface FieldProps {
  label: string
  icon: React.ReactNode
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  disabled?: boolean
  type?: 'text' | 'email' | 'tel'
  testId?: string
}

/* -------------------- Helpers -------------------- */

// Keep digits only
const normalizePhone = (value: string) => value.replace(/[^\d]/g, '')

/* -------------------- Component -------------------- */

export default function GenericEnrollmentForm({
  course
}: GenericEnrollmentFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: ''
  })

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  /* -------------------- Validation -------------------- */

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    // Phone (India only – 10 digits)
    const phoneDigits = normalizePhone(formData.phone)

    if (!phoneDigits) {
      newErrors.phone = 'Phone number is required'
    } else if (phoneDigits.length !== 10) {
      newErrors.phone = 'Phone number must be 10 digits'
    } else if (Number(phoneDigits[0]) < 6) {
      newErrors.phone =
        'Mobile number must start with 6, 7, 8, or 9'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /* -------------------- Razorpay Loader -------------------- */

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true)
        return
      }

      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  /* -------------------- Submit -------------------- */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)

    try {
      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        alert('Failed to load payment gateway')
        setLoading(false)
        return
      }

      const phoneDigits = normalizePhone(formData.phone)
      const fullPhone = `+91${phoneDigits}`

      const orderResponse = await fetch(
        '/api/courses/enroll/create-order',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: fullPhone,
            courseId: course.id,
            courseTitle: course.title,
            courseSlug: course.slug
          })
        }
      )

      if (!orderResponse.ok) {
        const err = await orderResponse.json()
        throw new Error(err.error || 'Failed to create order')
      }

      const orderData = await orderResponse.json()

      const razorpay = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'LeanMultiverse',
        description: course.shortTitle,
        order_id: orderData.orderId,

        prefill: {
          name: formData.name,
          email: formData.email,
          contact: fullPhone
        },

        theme: { color: '#eab308' },

        handler: async (response: {
          razorpay_order_id: string
          razorpay_payment_id: string
          razorpay_signature: string
        }) => {
          try {
            const verifyRes = await fetch(
              '/api/courses/enroll/verify-payment',
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  enrollment_id: orderData.enrollmentId
                })
              }
            )

            if (!verifyRes.ok) {
              const err = await verifyRes.json()
              throw new Error(err.error || 'Verification failed')
            }

            window.location.href = `/courses/enrollment-success?enrollment_id=${orderData.enrollmentId}&course=${course.slug}`
          } catch {
            alert(
              `Payment verification failed. Contact support with payment ID ${response.razorpay_payment_id}`
            )
            setLoading(false)
          }
        },

        modal: {
          ondismiss: () => setLoading(false)
        }
      })

      razorpay.open()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  /* -------------------- Render -------------------- */

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-950 border border-yellow-500/20 rounded-2xl p-8"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Field
          label="Full Name"
          icon={<User />}
          value={formData.name}
          onChange={(value) =>
            setFormData((p) => ({ ...p, name: value }))
          }
          placeholder="Enter your full name"
          error={errors.name}
          disabled={loading}
        />

        <Field
          label="Email Address"
          icon={<Mail />}
          type="email"
          value={formData.email}
          onChange={(value) =>
            setFormData((p) => ({ ...p, email: value }))
          }
          placeholder="your.email@example.com"
          error={errors.email}
          disabled={loading}
        />

        {/* Phone */}
        <Field
          label="Phone Number"
          icon={<Phone />}
          type="tel"
          value={formData.phone}
          onChange={(value) =>
            setFormData((p) => ({
              ...p,
              phone: value.replace(/[^\d]/g, '')
            }))
          }
          placeholder="10-digit mobile number"
          error={errors.phone}
          disabled={loading}
        />

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-black rounded-lg font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5" />
              Enroll Now – Pay ₹{course.price}
            </>
          )}
        </motion.button>

        <p className="text-center text-sm text-slate-400">
          Secure payment powered by Razorpay
        </p>
      </form>
    </motion.div>
  )
}

/* -------------------- Reusable Field -------------------- */

function Field({
  label,
  icon,
  value,
  onChange,
  placeholder,
  error,
  disabled,
  type = 'text',
  testId
}: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        {label} *
      </label>

      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          data-testid={testId}
          className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-yellow-500/20 rounded-lg text-white focus:outline-none focus:border-yellow-500"
        />
      </div>

      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  )
}
