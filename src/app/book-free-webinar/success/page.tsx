'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/shared/Navbar'
import { format } from 'date-fns'
import { getZoomLinkForDateFree } from '@/lib/webinar-config'
import { trackMetaEvent } from '@/lib/meta-pixel'

function SuccessContent() {
  const searchParams = useSearchParams()
  const [zoomLink, setZoomLink] = useState<string | null>(null)
  const dateStr = searchParams.get('date')

  useEffect(() => {
    trackMetaEvent('Schedule')
  }, [])

  useEffect(() => {
    if (dateStr) {
      setZoomLink(getZoomLinkForDateFree(dateStr))
    }
  }, [dateStr])

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
            You&apos;re Registered! 🎉
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            Your free webinar spot is confirmed. Check your email for the calendar invite and Zoom link.
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 backdrop-blur-xl border border-green-400/30 rounded-3xl p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-6 text-white">Registration Confirmation</h2>
          <div className="space-y-4 text-left">
            {formattedDate && (
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-300">Webinar Date:</span>
                <span className="text-white font-semibold">{formattedDate}</span>
              </div>
            )}
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-300">Time:</span>
              <span className="text-white font-semibold">8:00 PM IST</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">What&apos;s Next?</h2>
          <ul className="text-left space-y-3 text-gray-300">
            <li className="flex items-start">
              <span className="text-yellow-400 mr-3">✓</span>
              <span>Check your email for the calendar invite and meeting link</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 mr-3">✓</span>
              <span>Complete your Zoom registration using the button below</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 mr-3">✓</span>
              <span>Add the event to your calendar</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 mr-3">✓</span>
              <span>Join the webinar at your selected date and time</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {zoomLink ? (
            <Button asChild className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 rounded-xl px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-2xl transition-all">
              <a href={zoomLink} target="_blank" rel="noopener noreferrer">
                Complete Zoom Registration → <span className="sr-only">(Opens in new tab)</span>
              </a>
            </Button>
          ) : (
            <div className="rounded-xl bg-white/10 border border-white/20 px-6 py-4 text-center">
              <p className="text-gray-300 mb-2">Check your email for the Zoom registration link.</p>
              <a href="mailto:operations@leanmultiverse.com" className="text-yellow-400 hover:underline text-sm">Contact support if you didn&apos;t receive it</a>
            </div>
          )}
          <Button
            asChild
            variant="outline"
            className="border-white/20 bg-white/10 text-white hover:bg-white/20 rounded-xl px-8 py-6 text-lg font-semibold"
          >
            <Link href="/">Back to Home</Link>
          </Button>
        </div>

        <p className="text-gray-400 text-sm mt-8">
          A confirmation email with all the details has been sent to your registered email address.
        </p>
      </div>
    </main>
  )
}

export default function FreeWebinarSuccessPage() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <main className="relative w-full min-h-screen text-white bg-black flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4" />
              <p className="text-gray-300">Loading...</p>
            </div>
          </main>
        }
      >
        <SuccessContent />
      </Suspense>
    </>
  )
}
