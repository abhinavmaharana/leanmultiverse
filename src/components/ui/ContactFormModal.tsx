"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { validateEmail, validateIndianPhone, validatePhone } from "@/lib/validators"
import { trackMetaEvent } from "@/lib/meta-pixel"
import { trackGA4Event } from "@/lib/ga4"
import { getAttributionForEvents } from "@/lib/attribution"

interface ContactFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit?: () => void
  source?: string // Track where the form was opened from
}

const countries = [
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+1", name: "United States", flag: "🇺🇸" },
  { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "+971", name: "UAE", flag: "🇦🇪" },
  { code: "+65", name: "Singapore", flag: "🇸🇬" },
  { code: "+86", name: "China", flag: "🇨🇳" },
  { code: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "+33", name: "France", flag: "🇫🇷" },
  { code: "+34", name: "Spain", flag: "🇪🇸" },
  { code: "+39", name: "Italy", flag: "🇮🇹" },
  { code: "+31", name: "Netherlands", flag: "🇳🇱" },
  { code: "+46", name: "Sweden", flag: "🇸🇪" },
  { code: "+47", name: "Norway", flag: "🇳🇴" },
  { code: "+41", name: "Switzerland", flag: "🇨🇭" },
  { code: "+32", name: "Belgium", flag: "🇧🇪" },
  { code: "+351", name: "Portugal", flag: "🇵🇹" },
  { code: "+353", name: "Ireland", flag: "🇮🇪" },
  { code: "+358", name: "Finland", flag: "🇫🇮" },
  { code: "+45", name: "Denmark", flag: "🇩🇰" },
  { code: "+64", name: "New Zealand", flag: "🇳🇿" },
  { code: "+27", name: "South Africa", flag: "🇿🇦" },
  { code: "+55", name: "Brazil", flag: "🇧🇷" },
  { code: "+52", name: "Mexico", flag: "🇲🇽" },
  { code: "+1", name: "Canada", flag: "🇨🇦" },
]

export default function ContactFormModal({ isOpen, onClose, onSubmit, source = "general" }: ContactFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    country: "India",
    phoneNumber: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    console.log('ContactFormModal isOpen:', isOpen, 'source:', source)
  }, [isOpen, source])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  const handleCountryChange = (countryCode: string) => {
    const country = countries.find((c) => c.code === countryCode)
    setFormData((prev) => ({
      ...prev,
      countryCode,
      country: country?.name || "",
    }))
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required")
      return false
    }
    const emailResult = validateEmail(formData.email)
    if (!emailResult.valid) {
      setError(emailResult.error ?? "Invalid email")
      return false
    }
    const phoneResult =
      formData.countryCode === "+91"
        ? validateIndianPhone(formData.phoneNumber, true)
        : validatePhone(formData.phoneNumber, { required: true, min: 6, max: 15 })
    if (!phoneResult.valid) {
      setError(phoneResult.error ?? "Invalid phone number")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/contact/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          countryCode: formData.countryCode,
          country: formData.country,
          phoneNumber: formData.phoneNumber,
          source: source,
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      const attribution = getAttributionForEvents()
      trackMetaEvent("Lead", attribution)
      trackGA4Event("generate_lead", attribution)
      setIsSubmitted(true)

      // Call onSubmit callback if provided
      if (onSubmit) {
        onSubmit()
      }

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          countryCode: "+91",
          country: "India",
          phoneNumber: "",
        })
        setIsSubmitted(false)
        onClose()
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        name: "",
        email: "",
        countryCode: "+91",
        country: "India",
        phoneNumber: "",
      })
      setError("")
      setIsSubmitted(false)
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="bg-white border border-gray-200 rounded-3xl p-8 max-w-md w-full shadow-2xl pointer-events-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Connect with Our Expert</h2>
                  <p className="text-gray-500 text-sm">Before connecting, we&apos;d like some information to provide you with a better response</p>
                </div>
                <button
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="text-gray-400 hover:text-gray-900 transition-colors disabled:opacity-50"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form */}
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <Label htmlFor="name" className="text-gray-900 font-semibold mb-2 block">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-amber-400 focus:ring-amber-400"
                      disabled={isSubmitting}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="text-gray-900 font-semibold mb-2 block">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                      className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-amber-400 focus:ring-amber-400"
                      disabled={isSubmitting}
                      required
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <Label htmlFor="country" className="text-gray-900 font-semibold mb-2 block">
                      Country *
                    </Label>
                    <select
                      id="country"
                      value={formData.countryCode}
                      onChange={(e) => handleCountryChange(e.target.value)}
                      className="w-full h-9 rounded-md border border-gray-200 bg-gray-50 text-gray-900 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 disabled:opacity-50"
                      disabled={isSubmitting}
                      required
                    >
                      {countries.map((country, index) => (
                        <option key={`${country.code}-${country.name}-${index}`} value={country.code} className="bg-white">
                          {country.flag} {country.name} ({country.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <Label htmlFor="phone" className="text-gray-900 font-semibold mb-2 block">
                      Phone Number *
                    </Label>
                    <div className="flex gap-2">
                      <div className="w-24 flex-shrink-0">
                        <Input
                          type="text"
                          value={formData.countryCode}
                          disabled
                          className="bg-gray-100 border-gray-200 text-gray-900 text-center cursor-not-allowed"
                        />
                      </div>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange("phoneNumber", e.target.value.replace(/\D/g, ""))}
                        placeholder="1234567890"
                        className="flex-1 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-amber-400 focus:ring-amber-400"
                        disabled={isSubmitting}
                        required
                      />
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-6 rounded-xl text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      "Submit & Continue"
                    )}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-500">Your information has been submitted successfully.</p>
                </div>
              )}
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

