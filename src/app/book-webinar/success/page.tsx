import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/shared/Navbar'

export const metadata: Metadata = {
  title: 'Booking Successful - Lean Multiverse',
  description: 'Your webinar booking has been confirmed',
}

export default function BookingSuccessPage() {
  return (
    <>
      <Navbar />
      <main className="relative w-full min-h-screen text-white bg-black flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center">
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
              Booking Confirmed!
            </h1>
            <p className="text-gray-300 text-lg mb-6">
              Your webinar booking has been successfully confirmed.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">What's Next?</h2>
            <ul className="text-left space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3">✓</span>
                <span>Check your email for the calendar invite and meeting link</span>
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
            <Button
              asChild
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 rounded-xl px-8 py-6 text-lg font-semibold"
            >
              <Link href="/">Back to Home</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/20 bg-white/10 text-white hover:bg-white/20 rounded-xl px-8 py-6 text-lg font-semibold"
            >
              <Link href="/book-webinar">Book Another Webinar</Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}

