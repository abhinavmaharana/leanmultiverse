import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'

export const metadata: Metadata = {
  title: 'Accessibility Statement - Lean Multiverse',
  description: 'Lean Multiverse commitment to digital accessibility and how to report issues.',
}

export default function AccessibilityPage() {
  return (
    <main className="relative w-full min-h-screen text-white bg-black">
      <Navbar />
      <div className="relative flex flex-col min-h-screen bg-black pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-yellow-400 to-transparent" />
              <p className="uppercase tracking-[4px] sm:tracking-[6px] text-yellow-400 text-sm sm:text-base font-medium">
                Accessibility
              </p>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
              Accessibility Statement
            </h1>
            <p className="text-gray-400 text-sm">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Our commitment</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Lean Multiverse is committed to ensuring digital accessibility for people with disabilities. We aim to align with the Web Content Accessibility Guidelines (WCAG) where practicable and to improve the experience for everyone who uses our website and learning platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Measures we take</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Semantic HTML and ARIA attributes where needed for navigation and forms</li>
                <li>Keyboard-accessible navigation and controls</li>
                <li>Support for reduced motion where applicable</li>
                <li>Sufficient color contrast and readable text</li>
                <li>Descriptive links and form labels</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Feedback and reporting issues</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you encounter an accessibility barrier on our site or have suggestions for improvement, please contact us. We will do our best to respond and address the issue.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Email: <a href="mailto:operations@leanmultiverse.com" className="text-yellow-400 hover:underline">operations@leanmultiverse.com</a><br />
                Phone: <a href="tel:+917696627657" className="text-yellow-400 hover:underline">+91 7696627657</a>
              </p>
            </section>
          </div>

          <p className="mt-12 text-gray-400">
            <Link href="/" className="text-yellow-400 hover:underline">Back to Home</Link>
          </p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
