import { Metadata } from 'next'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service - Lean Multiverse',
  description: 'Terms of Service for Lean Multiverse. Read our terms and conditions for using our services.',
}

export default function TermsOfServicePage() {
  return (
    <main className="relative w-full min-h-screen text-white bg-black">
      <Navbar />
      
      <div className="relative flex flex-col min-h-screen bg-black pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-yellow-400 to-transparent" />
              <p className="uppercase tracking-[4px] sm:tracking-[6px] text-yellow-400 text-sm sm:text-base lg:text-[20px] font-medium">
                Legal Information
              </p>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
              Terms of Service
            </h1>
            <p className="text-gray-400 text-sm">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                By accessing and using the Lean Multiverse website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Use License</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Permission is granted to temporarily access the materials on Lean Multiverse's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Course Enrollment and Access</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                When you enroll in a course or purchase a service:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>You receive a limited, non-transferable, non-exclusive license to access the course content</li>
                <li>Course access is granted for the duration specified at the time of purchase</li>
                <li>You may not share, resell, or redistribute course materials</li>
                <li>All course materials are protected by copyright and intellectual property laws</li>
                <li>We reserve the right to revoke access for violations of these terms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Payment Terms</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                All fees for courses and services are stated in Indian Rupees (INR) unless otherwise specified. By making a purchase, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Pay all fees associated with your purchase</li>
                <li>Provide accurate payment information</li>
                <li>Authorize us to charge your payment method for the total amount</li>
                <li>Understand that all sales are final unless otherwise stated</li>
                <li>Accept our refund policy as outlined in our Refund Policy</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Refund Policy</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Refund requests must be submitted within 7 days of purchase. Refunds will be processed according to the following conditions:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Refunds are available for courses not yet accessed or completed</li>
                <li>Webinar bookings may be refunded if cancelled at least 48 hours before the scheduled time</li>
                <li>Refunds will be processed to the original payment method within 10-14 business days</li>
                <li>We reserve the right to refuse refunds for courses that have been substantially accessed</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. User Accounts</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                When you create an account with us, you must provide accurate, complete, and current information. You are responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
                <li>Ensuring that you exit from your account at the end of each session</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Prohibited Uses</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                You may not use our services:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>In any way that violates any applicable law or regulation</li>
                <li>To transmit any malicious code, viruses, or harmful data</li>
                <li>To impersonate or attempt to impersonate another user or entity</li>
                <li>To engage in any automated use of the system</li>
                <li>To interfere with or disrupt the services or servers</li>
                <li>To collect or harvest any information from the website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Intellectual Property</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                All content, features, and functionality of the website, including but not limited to text, graphics, logos, images, and software, are the exclusive property of Lean Multiverse and are protected by copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Disclaimer</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                The materials on Lean Multiverse's website are provided on an 'as is' basis. Lean Multiverse makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Limitation of Liability</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                In no event shall Lean Multiverse or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Lean Multiverse's website, even if Lean Multiverse or a Lean Multiverse authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Modifications</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Lean Multiverse may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Governing Law</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">13. Contact Information</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <p className="text-gray-300 mb-2">
                  <strong className="text-white">Email:</strong> legal@leanmultiverse.com
                </p>
                <p className="text-gray-300 mb-2">
                  <strong className="text-white">Address:</strong> Lean Multiverse Consultancy Pvt Ltd
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

