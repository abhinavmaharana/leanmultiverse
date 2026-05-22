import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'

export const metadata: Metadata = {
  title: 'FAQ - Lean Multiverse',
  description: 'Frequently asked questions about courses, webinars, pricing, and support.',
}

export default function FAQPage() {
  return (
    <main className="relative w-full min-h-screen text-white bg-black">
      <Navbar />
      <div className="relative flex flex-col min-h-screen bg-black pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12">
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white">Frequently Asked Questions</h1>
            <p className="text-gray-400">Quick answers to common questions.</p>
          </div>
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-white mb-2">What courses do you offer?</h2>
              <p className="text-gray-300 leading-relaxed">We offer career-starter programs in AI and ML, Cloud and DevOps, Business Analysis, AI Product Management, and AI Project Management, plus free courses and webinars.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-white mb-2">How much do courses cost?</h2>
              <p className="text-gray-300 leading-relaxed">Prices vary by program and are shown in INR on each course page. We also run free webinars and occasional discounts.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-white mb-2">What is your refund policy?</h2>
              <p className="text-gray-300 leading-relaxed">Refunds are available within 7 days for courses not yet accessed. Webinars may be refunded if cancelled at least 48 hours before the event. See our Refund Policy page for details.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-white mb-2">How can I contact support?</h2>
              <p className="text-gray-300 leading-relaxed">Call +91 7696627657, email operations@leanmultiverse.com, or use the Contact section on the website.</p>
            </section>
          </div>
          <p className="mt-12 text-gray-400">
            <Link href="#contact" className="text-yellow-400 hover:underline">Contact us</Link> | <Link href="/refund-policy" className="text-yellow-400 hover:underline">Refund Policy</Link>
          </p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
