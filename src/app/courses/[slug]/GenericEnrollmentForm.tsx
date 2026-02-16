'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, User } from 'lucide-react'
import { CareerStarterCourse } from '@/data/careerStarterCourses'
import { validateEmail, validateIndianPhone } from '@/lib/validators'

declare global {
  interface Window {
    Razorpay: any
  }
}

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
  autoComplete?: string
  inputMode?: 'tel' | 'email' | 'text'
}

/* -------------------- Component -------------------- */

export default function GenericEnrollmentForm({
  course
}: GenericEnrollmentFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  /* -------------------- Validation -------------------- */

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    const emailResult = validateEmail(formData.email)
    if (!emailResult.valid && emailResult.error) {
      newErrors.email = emailResult.error
    }

    const phoneResult = validateIndianPhone(formData.phone, false)
    if (!phoneResult.valid && phoneResult.error) {
      newErrors.phone = phoneResult.error
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /* -------------------- Razorpay Loader -------------------- */

  const loadRazorpayScript = () =>
    new Promise<boolean>((resolve) => {
      if (window.Razorpay) return resolve(true)
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })

  /* -------------------- Submit -------------------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)

    try {
      const ok = await loadRazorpayScript()
      if (!ok) throw new Error('Payment gateway failed to load')

      const phoneNormalized = formData.phone.trim()
        ? `+91${normalizeIndianMobile(formData.phone)}`
        : null

      const res = await fetch('/api/courses/enroll/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: phoneNormalized,
          courseId: course.id,
          courseSlug: course.slug,
          courseTitle: course.title
        })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Order creation failed')

      const razorpay = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: 'LeanMultiverse',
        description: course.shortTitle,

        prefill: {
          name: formData.name,
          email: formData.email,
          ...(phoneNormalized ? { contact: phoneNormalized } : {})
        },

        theme: { color: '#eab308' },

        handler: async (r: any) => {
          await fetch('/api/courses/enroll/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...r,
              enrollment_id: data.enrollmentId
            })
          })

          window.location.href = `/courses/enrollment-success?course=${course.slug}`
        },

        modal: {
          ondismiss: () => setLoading(false)
        }
      })

      razorpay.open()
    } catch (err: any) {
      alert(err.message || 'Payment failed')
      setLoading(false)
    }
  }

  /* -------------------- Render -------------------- */

  return (
    <motion.div className="bg-zinc-950 border border-yellow-500/20 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Field
          label="Full Name"
          autoComplete="name"
          icon={<User />}
          value={formData.name}
          onChange={(v) => setFormData(p => ({ ...p, name: v }))}
          error={errors.name}
        />

        <Field
          label="Email Address"
          type="email"
          autoComplete="email"
          icon={<Mail />}
          value={formData.email}
          onChange={(v) => setFormData(p => ({ ...p, email: v }))}
          error={errors.email}
        />

        <Field
          label="Phone Number"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          icon={<Phone />}
          value={formData.phone}
          onChange={(v) => setFormData(p => ({ ...p, phone: v }))}
          error={errors.phone}
          placeholder="Optional"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg font-semibold text-black disabled:opacity-60"
        >
          {loading ? 'Processing…' : `Enroll Now – ₹${course.price}`}
        </button>
      </form>
    </motion.div>
  )
}

/* -------------------- Field -------------------- */

function Field({
  label,
  icon,
  value,
  onChange,
  placeholder,
  error,
  type = 'text',
  autoComplete,
  inputMode,
}: FieldProps) {
  return (
    <div>
      <label className="text-sm text-slate-300">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          className="w-full pl-12 py-3 bg-zinc-900 border border-yellow-500/20 rounded-lg text-white"
        />
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  )
}
