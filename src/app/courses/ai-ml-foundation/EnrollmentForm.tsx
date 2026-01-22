'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, User, Loader2, CheckCircle2 } from 'lucide-react'

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function EnrollmentForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Invalid phone number (must be 10 digits)'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const loadRazorpayScript = () => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    
    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        alert('Failed to load payment gateway. Please try again.')
        setLoading(false)
        return
      }
      
      // Create order
      const orderResponse = await fetch('/api/courses/ai-ml/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      
      if (!orderResponse.ok) {
        let errorMessage = 'Failed to create order'
        try {
          const errorData = await orderResponse.json()
          errorMessage = errorData.error || errorMessage
        } catch (e) {
          // Response is not JSON, use status text
          errorMessage = `${errorMessage}: ${orderResponse.statusText}`
        }
        throw new Error(errorMessage)
      }
      
      let orderData
      try {
        orderData = await orderResponse.json()
      } catch (e) {
        throw new Error('Invalid response from server. Please try again.')
      }
      
      // Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'LeanMultiverse',
        description: 'AI & ML Career Foundation Program',
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            // Verify payment
            const verifyResponse = await fetch('/api/courses/ai-ml/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                enrollment_id: orderData.enrollmentId
              })
            })
            
            if (!verifyResponse.ok) {
              // Get detailed error message
              let errorMessage = 'Payment verification failed'
              try {
                const errorData = await verifyResponse.json()
                errorMessage = errorData.error || errorMessage
                console.error('Verification error details:', errorData)
              } catch (e) {
                errorMessage = `${errorMessage}: ${verifyResponse.statusText}`
              }
              throw new Error(errorMessage)
            }
            
            const verifyData = await verifyResponse.json()
            console.log('Payment verified successfully:', verifyData)
            
            // Redirect to success page
            window.location.href = `/courses/ai-ml-foundation/success?enrollment_id=${orderData.enrollmentId}`
          } catch (error) {
            console.error('Payment verification error:', error)
            alert(`Payment verification failed: ${error instanceof Error ? error.message : 'Unknown error'}. Please contact support with your payment ID: ${response.razorpay_payment_id}`)
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#eab308'
        },
        modal: {
          ondismiss: function() {
            setLoading(false)
          }
        }
      }
      
      const razorpay = new window.Razorpay(options)
      razorpay.open()
      
    } catch (error) {
      console.error('Enrollment error:', error)
      alert(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-950 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-8"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              id="name"
              data-testid="enrollment-name-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-yellow-500/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 transition-colors"
              placeholder="Enter your full name"
              disabled={loading}
            />
          </div>
          {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
        </div>
        
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="email"
              id="email"
              data-testid="enrollment-email-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-yellow-500/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 transition-colors"
              placeholder="your.email@example.com"
              disabled={loading}
            />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
        </div>
        
        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="tel"
              id="phone"
              data-testid="enrollment-phone-input"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-yellow-500/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 transition-colors"
              placeholder="10-digit mobile number"
              disabled={loading}
            />
          </div>
          {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
        </div>
        
        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-black rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
              Enroll Now - Pay ₹2,499
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
