'use client'

import { useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/shared/Navbar'
import { format } from 'date-fns'

import { trackMetaEvent } from '@/lib/meta-pixel'
import { trackGA4Event } from '@/lib/ga4'
import { getAttributionForEvents } from '@/lib/attribution'

// Replace this with the actual WhatsApp community link
const WHATSAPP_COMMUNITY_LINK = 'https://chat.whatsapp.com/EGwzsvlQJoS4qjDraMraHG' 

function SuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const paymentId = searchParams.get('payment_id')
  const orderId = searchParams.get('order_id')
  const dateStr = searchParams.get('date')

  useEffect(() => {
    const attribution = getAttributionForEvents()
    const purchaseParams = { value: 9, currency: 'INR', ...attribution }
    trackMetaEvent('Purchase', purchaseParams)
    trackMetaEvent('Lead', attribution)
    trackGA4Event('purchase', purchaseParams)
    trackGA4Event('generate_lead', attribution)
    
    // Auto redirect to WhatsApp after 10 seconds
    const redirectTimer = setTimeout(() => {
      window.location.href = WHATSAPP_COMMUNITY_LINK
    }, 10000)
    
    return () => clearTimeout(redirectTimer)
  }, [])

  const formattedDate = dateStr ? format(new Date(dateStr), 'MMMM d, yyyy') : null

  return (
    <main className="relative w-full min-h-screen text-white bg-black flex items-center justify-center px-4 pt-24 pb-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center animate-pulse">
            <svg
              className="w-12 h-12 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Thank You! 🎉
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            Your payment has been successfully processed. 
          </p>
        </div>

        {/* Payment Confirmation Details */}
        <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 backdrop-blur-xl border border-green-400/30 rounded-3xl p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-6 text-white">Payment Details</h2>
          <div className="space-y-4 text-left">
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-gray-300">Payment ID:</span>
              <span className="text-white font-mono text-sm">{paymentId || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-gray-300">Order ID:</span>
              <span className="text-white font-mono text-sm">{orderId || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-gray-300">Amount Paid:</span>
              <span className="text-green-400 font-bold text-lg">₹9</span>
            </div>
            {formattedDate && (
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-300">Webinar Date:</span>
                <span className="text-white font-semibold">{formattedDate}</span>
              </div>
            )}
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">Next Step</h2>
          <p className="text-left text-gray-300 mb-6 leading-relaxed">
            Please join our exclusive WhatsApp community. All webinar links, resources, and updates will be shared directly in the group!
          </p>
          <div className="text-sm text-yellow-400/80 text-left mb-4">
            You will be redirected automatically in 10 seconds...
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-[#25D366] text-white hover:bg-[#1ebe5a] border-none rounded-xl px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-2xl transition-all">
              <a href={WHATSAPP_COMMUNITY_LINK} target="_blank" rel="noopener noreferrer">
                Join WhatsApp Community → <span className="sr-only">(Opens in new tab)</span>
              </a>
            </Button>
        </div>

      </div>
    </main>
  )
}

export default function BookingSuccessPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <main className="relative w-full min-h-screen text-white bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-gray-300">Loading...</p>
          </div>
        </main>
      }>
        <SuccessContent />
      </Suspense>
    </>
  )
}
