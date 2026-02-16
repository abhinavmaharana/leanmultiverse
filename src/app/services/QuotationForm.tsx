"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { validateEmail, validateIndianPhone, validatePhone } from "@/lib/validators"

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

const projectTypes = [
  { value: "web", label: "Web Development" },
  { value: "mobile", label: "Mobile App Development" },
  { value: "both", label: "Web + Mobile App" },
  { value: "other", label: "Other" },
]

const budgetRangesUSD = [
  { value: "under-10k", label: "Under $10,000" },
  { value: "10k-25k", label: "$10,000 - $25,000" },
  { value: "25k-50k", label: "$25,000 - $50,000" },
  { value: "50k-100k", label: "$50,000 - $100,000" },
  { value: "over-100k", label: "Over $100,000" },
  { value: "not-sure", label: "Not Sure" },
]

const budgetRangesINR = [
  { value: "under-5l", label: "Under ₹5,00,000" },
  { value: "5l-10l", label: "₹5,00,000 - ₹10,00,000" },
  { value: "10l-25l", label: "₹10,00,000 - ₹25,00,000" },
  { value: "25l-50l", label: "₹25,00,000 - ₹50,00,000" },
  { value: "50l-1cr", label: "₹50,00,000 - ₹1,00,00,000" },
  { value: "over-1cr", label: "Over ₹1,00,00,000" },
  { value: "not-sure", label: "Not Sure" },
]

export default function QuotationForm() {
  const [currency, setCurrency] = useState<"INR" | "USD">("USD")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    countryCode: "+91",
    country: "India",
    phoneNumber: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  // Get budget ranges based on selected currency
  const budgetRanges = currency === "INR" ? budgetRangesINR : budgetRangesUSD

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
    // Auto-set currency based on country (India -> INR, others -> USD)
    if (countryCode === "+91") {
      setCurrency("INR")
    } else {
      setCurrency("USD")
    }
  }

  const handleCurrencyChange = (newCurrency: "INR" | "USD") => {
    setCurrency(newCurrency)
    // Reset budget when currency changes
    setFormData((prev) => ({ ...prev, budget: "" }))
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
    if (!formData.projectType) {
      setError("Please select a project type")
      return false
    }
    if (!formData.description.trim()) {
      setError("Please provide a project description")
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
      const response = await fetch("/api/quotation/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          currency,
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit quotation request")
      }

      // Show success alert immediately
      setShowSuccessAlert(true)
      setIsSubmitted(true)
      
      // Hide alert after 5 seconds
      setTimeout(() => {
        setShowSuccessAlert(false)
      }, 5000)
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          company: "",
          countryCode: "+91",
          country: "India",
          phoneNumber: "",
          projectType: "",
          budget: "",
          timeline: "",
          description: "",
        })
        setCurrency("USD")
        setIsSubmitted(false)
      }, 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
        {/* Success Alert Toast */}
        {showSuccessAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-400/50 rounded-2xl p-6 backdrop-blur-sm"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-green-400 font-bold text-lg mb-1">Thank You for Submitting!</h4>
                <p className="text-gray-300 text-sm">
                  Thank you for submitting the form! Our team will reach out to you within 24-48 hours.
                </p>
              </div>
              <button
                onClick={() => setShowSuccessAlert(false)}
                className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <Label htmlFor="name" className="text-white mb-2 block">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-yellow-400"
                    disabled={isSubmitting}
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-white mb-2 block">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-yellow-400"
                    disabled={isSubmitting}
                    required
                  />
                </div>

                {/* Company */}
                <div>
                  <Label htmlFor="company" className="text-white mb-2 block">
                    Company Name
                  </Label>
                  <Input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    placeholder="Your company name (optional)"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-yellow-400"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Country */}
                <div>
                  <Label htmlFor="country" className="text-white mb-2 block">
                    Country *
                  </Label>
                  <select
                    id="country"
                    value={formData.countryCode}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    className="w-full h-9 rounded-md border border-white/20 bg-white/10 text-white px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 disabled:opacity-50"
                    disabled={isSubmitting}
                    required
                  >
                    {countries.map((country, index) => (
                      <option key={`${country.code}-${country.name}-${index}`} value={country.code} className="bg-gray-900">
                        {country.flag} {country.name} ({country.code})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Phone Number */}
                <div className="md:col-span-2">
                  <Label htmlFor="phone" className="text-white mb-2 block">
                    Phone Number *
                  </Label>
                  <div className="flex gap-2">
                    <div className="w-24 flex-shrink-0">
                      <Input
                        type="text"
                        value={formData.countryCode}
                        disabled
                        className="bg-white/5 border-white/20 text-white text-center cursor-not-allowed"
                      />
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value.replace(/\D/g, ""))}
                      placeholder="1234567890"
                      className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-yellow-400"
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Project Information Section */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Project Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Project Type */}
                <div>
                  <Label htmlFor="projectType" className="text-white mb-2 block">
                    Project Type *
                  </Label>
                  <select
                    id="projectType"
                    value={formData.projectType}
                    onChange={(e) => handleInputChange("projectType", e.target.value)}
                    className="w-full h-9 rounded-md border border-white/20 bg-white/10 text-white px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 disabled:opacity-50"
                    disabled={isSubmitting}
                    required
                  >
                    <option value="" className="bg-gray-900">Select project type</option>
                    {projectTypes.map((type) => (
                      <option key={type.value} value={type.value} className="bg-gray-900">
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Currency Toggle */}
                <div>
                  <Label className="text-white mb-2 block">
                    Currency
                  </Label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleCurrencyChange("USD")}
                      disabled={isSubmitting}
                      className={`flex-1 h-9 rounded-md border transition-all duration-200 font-medium text-sm ${
                        currency === "USD"
                          ? "bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border-yellow-400/50 text-yellow-400"
                          : "bg-white/5 border-white/20 text-gray-400 hover:bg-white/10 hover:text-white"
                      } disabled:opacity-50`}
                    >
                      USD ($)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCurrencyChange("INR")}
                      disabled={isSubmitting}
                      className={`flex-1 h-9 rounded-md border transition-all duration-200 font-medium text-sm ${
                        currency === "INR"
                          ? "bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border-yellow-400/50 text-yellow-400"
                          : "bg-white/5 border-white/20 text-gray-400 hover:bg-white/10 hover:text-white"
                      } disabled:opacity-50`}
                    >
                      INR (₹)
                    </button>
                  </div>
                </div>

                {/* Budget */}
                <div className="md:col-span-2">
                  <Label htmlFor="budget" className="text-white mb-2 block">
                    Budget Range ({currency})
                  </Label>
                  <select
                    id="budget"
                    value={formData.budget}
                    onChange={(e) => handleInputChange("budget", e.target.value)}
                    className="w-full h-9 rounded-md border border-white/20 bg-white/10 text-white px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    <option value="" className="bg-gray-900">Select budget range</option>
                    {budgetRanges.map((range) => (
                      <option key={range.value} value={range.value} className="bg-gray-900">
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Timeline */}
                <div className="md:col-span-2">
                  <Label htmlFor="timeline" className="text-white mb-2 block">
                    Expected Timeline
                  </Label>
                  <Input
                    id="timeline"
                    type="text"
                    value={formData.timeline}
                    onChange={(e) => handleInputChange("timeline", e.target.value)}
                    placeholder="e.g., 3 months, 6 months, ASAP"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-yellow-400"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Project Description */}
                <div className="md:col-span-2">
                  <Label htmlFor="description" className="text-white mb-2 block">
                    Project Description *
                  </Label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Tell us about your project, requirements, features, and any specific needs..."
                    rows={6}
                    className="w-full rounded-md border border-white/20 bg-white/10 text-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 disabled:opacity-50 resize-none"
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold py-6 rounded-xl text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                "Request Quotation"
              )}
            </Button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5, delay: 0.1 }}
              className="w-24 h-24 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-400/30"
            >
              <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Thank You!
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-green-500/10 border border-green-400/30 rounded-2xl p-6 mb-4"
            >
              <p className="text-green-400 text-lg md:text-xl font-semibold mb-2">
                Thank you for submitting the form!
              </p>
              <p className="text-gray-300 text-base">
                Our team will reach out to you within 24-48 hours to discuss your project requirements.
              </p>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 text-sm mt-4"
            >
              You will receive a confirmation email shortly.
            </motion.p>
          </motion.div>
        )}
      </Card>
    </motion.div>
  )
}

