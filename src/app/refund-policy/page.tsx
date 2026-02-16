import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'

export const metadata: Metadata = {
  title: 'Refund Policy - Lean Multiverse',
  description: 'Refund policy for Lean Multiverse courses and webinars.',
}

export default function RefundPolicyPage() {
  return (
    <main className="relative w-full min-h-screen text-white bg-black">
      <Navbar />
      <div className="relative flex flex-col min-h-screen bg-black pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-yellow-400 to-transparent" />
              <p className="uppercase tracking-[4px] sm:tracking-[6px] text-yellow-400 text-sm sm:text-base font-medium">Legal</p>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white">Refund Policy</h1>
            <p className="text-gray-400 text-sm">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Course refunds</h2>
              <p className="text-gray-300 leading-relaxed mb-4">Refund requests must be submitted within 7 days of purchase. Refunds are available for courses not yet accessed or completed. We reserve the right to refuse refunds for courses that have been substantially accessed. Refunds will be processed to the original payment method within 10 to 14 business days.</p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Webinar refunds</h2>
              <p className="text-gray-300 leading-relaxed mb-4">Paid webinar bookings are non-refundable. Once payment is made for a webinar, we do not offer refunds regardless of cancellation or non-attendance.</p>
              <p className="text-gray-300 leading-relaxed mb-4">Free webinar registrations do not involve payment; you may simply not attend or cancel your registration by contacting us if you wish to free the slot.</p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. How to request a refund</h2>
              <p className="text-gray-300 leading-relaxed mb-4">Contact us at operations@leanmultiverse.com with your order or enrollment details and reason for the request. We will confirm eligibility and process approved refunds as soon as possible.</p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Changes</h2>
              <p className="text-gray-300 leading-relaxed">We may update this Refund Policy from time to time. The latest version will always be on this page.</p>
            </section>
          </div>
          <p className="mt-12 text-gray-400"><Link href="/terms-of-service" className="text-yellow-400 hover:underline">Terms of Service</Link></p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
