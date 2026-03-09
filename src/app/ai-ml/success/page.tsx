'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'

import { getZoomLinkForDateAiMl } from '@/lib/ai-ml-webinar-config'
import { trackMetaEvent } from '@/lib/meta-pixel'
import { trackGA4Event } from '@/lib/ga4'
import { getAttributionForEvents } from '@/lib/attribution'

function AiMlSuccessContent() {
  const searchParams = useSearchParams()
  const [zoomLink, setZoomLink] = useState<string | null>(null)

  const paymentId = searchParams.get('payment_id')
  const orderId = searchParams.get('order_id')
  const dateStr = searchParams.get('date')

  useEffect(() => {
    const attribution = getAttributionForEvents()
    const purchaseParams = { value: 9, currency: 'INR', content_name: 'AI/ML Webinar', ...attribution }
    trackMetaEvent('Purchase', purchaseParams)
    trackMetaEvent('Lead', attribution)
    trackGA4Event('purchase', purchaseParams)
    trackGA4Event('generate_lead', attribution)
  }, [])

  useEffect(() => {
    if (dateStr) {
      setZoomLink(getZoomLinkForDateAiMl(dateStr))
    }
  }, [dateStr])

  const formattedDate = dateStr ? format(new Date(dateStr), 'MMMM d, yyyy') : null

  return (
    <main className="relative w-full min-h-screen text-gray-900 bg-gray-50 flex items-center justify-center px-4 pt-24 pb-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
            <svg
              className="w-12 h-12 text-green-600"
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Payment Received! 🎉
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Your payment has been successfully processed and your AI/ML webinar booking is confirmed.
          </p>
        </div>

        {/* Payment Confirmation Details */}
        <div className="bg-white border text-left border-gray-200 shadow-sm rounded-3xl p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Payment Confirmation</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-500">Payment ID:</span>
              <span className="text-gray-900 font-mono text-sm">{paymentId || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-500">Order ID:</span>
              <span className="text-gray-900 font-mono text-sm">{orderId || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-500">Amount Paid:</span>
              <span className="text-green-600 font-bold text-lg">₹9</span>
            </div>
            {formattedDate && (
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-500">Webinar Date:</span>
                <span className="text-gray-900 font-semibold">{formattedDate}</span>
              </div>
            )}
            <div className="flex justify-between items-center py-2">
                <span className="text-gray-500">Webinar Time:</span>
                <span className="text-gray-900 font-semibold">9:00 PM IST</span>
              </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-white border text-left border-gray-200 shadow-sm rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">What&apos;s Next?</h2>
          <ul className="text-left space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-green-500 mr-3 text-lg font-bold">✓</span>
              <span>Check your email for the calendar invite and meeting link</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3 text-lg font-bold">✓</span>
              <span>Complete your Zoom registration using the button below</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3 text-lg font-bold">✓</span>
              <span>Add the event to your calendar</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3 text-lg font-bold">✓</span>
              <span>Join the webinar at your selected date and time</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {zoomLink ? (
            <a href={zoomLink} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white hover:bg-blue-700 rounded-xl px-8 py-4 text-lg font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Complete Zoom Registration → <span className="sr-only">(Opens in new tab)</span>
            </a>
          ) : (
            <div className="rounded-xl bg-gray-100 border border-gray-200 px-6 py-4 text-center">
              <p className="text-gray-600 mb-2">Check your email for the Zoom registration link.</p>
              <a href="mailto:operations@leanmultiverse.com" className="text-blue-600 hover:underline text-sm font-medium">Contact support if you didn&apos;t receive it</a>
            </div>
          )}
          <Link href="/ai-ml" className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded-xl px-8 py-4 text-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 flex items-center justify-center">
            Back to AI/ML Page
          </Link>
        </div>

        {/* Additional Info */}
        <p className="text-gray-500 text-sm mt-8">
          A confirmation email with all the details has been sent to your registered email address.
        </p>
      </div>
    </main>
  )
}

export default function AiMlBookingSuccessPage() {
  return (
    <>
      {/* We can skip Navbar or add it if needed */}
      <Suspense fallback={
        <main className="relative w-full min-h-screen text-gray-900 bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading...</p>
          </div>
        </main>
      }>
        <AiMlSuccessContent />
      </Suspense>
    </>
  )
}
