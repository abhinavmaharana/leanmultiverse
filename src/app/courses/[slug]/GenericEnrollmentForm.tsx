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
  countryCode: string
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

/* -------------------- Constants -------------------- */

const COUNTRY_CODES = [
  { code: '+91', label: '🇮🇳 India' },
  { code: '+1', label: '🇺🇸 USA' },
  { code: '+44', label: '🇬🇧 UK' },
  { code: '+61', label: '🇦🇺 Australia' },
  { code: '+971', label: '🇦🇪 UAE' }
]

/* -------------------- Component -------------------- */

export default function GenericEnrollmentForm({
  course
}: GenericEnrollmentFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    countryCode: '+91'
  })

  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  /* -------------------- Validation -------------------- */

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    const phoneDigits = formData.phone.replace(/\D/g, '')

    if (!phoneDigits) {
      newErrors.phone = 'Phone number is required'
    } else if (
      formData.countryCode === '+91' &&
      !/^[6-9]\d{9}$/.test(phoneDigits)
    ) {
      newErrors.phone = 'Enter valid 10-digit Indian number'
    } else if (
      formData.countryCode !== '+91' &&
      phoneDigits.length < 7
    ) {
      newErrors.phone = 'Enter valid phone number'
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

      const fullPhone = `${formData.countryCode}${formData.phone.replace(
        /\D/g,
        ''
      )}`

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
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message)
      } else {
        alert('Something went wrong')
      }
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
            setFormData((prev) => ({ ...prev, name: value }))
          }
          placeholder="Enter your full name"
          error={errors.name}
          disabled={loading}
          testId="enrollment-name-input"
        />

        <Field
          label="Email Address"
          icon={<Mail />}
          type="email"
          value={formData.email}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, email: value }))
          }
          placeholder="your.email@example.com"
          error={errors.email}
          disabled={loading}
          testId="enrollment-email-input"
        />

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Phone Number *
          </label>

          <div className="flex gap-2">
            <select
              value={formData.countryCode}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  countryCode: e.target.value
                }))
              }
              disabled={loading}
              className="w-[130px] px-3 py-3 bg-zinc-900 border border-yellow-500/20 rounded-lg text-white focus:outline-none focus:border-yellow-500"
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label} {c.code}
                </option>
              ))}
            </select>

            <div className="relative flex-1">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, phone: e.target.value }))
                }
                disabled={loading}
                placeholder="Mobile number"
                data-testid="enrollment-phone-input"
                className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-yellow-500/20 rounded-lg text-white focus:outline-none focus:border-yellow-500"
              />
            </div>
          </div>

          {errors.phone && (
            <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
          )}
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-black rounded-lg font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-50"
          data-testid="enrollment-submit-btn"
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
