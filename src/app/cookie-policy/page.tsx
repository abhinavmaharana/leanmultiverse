import { Metadata } from 'next'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'

export const metadata: Metadata = {
  title: 'Cookie Policy - Lean Multiverse',
  description: 'Cookie Policy for Lean Multiverse. Learn about how we use cookies and similar technologies on our website.',
}

export default function CookiePolicyPage() {
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
              Cookie Policy
            </h1>
            <p className="text-gray-400 text-sm">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. What Are Cookies</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners. Cookies allow a website to recognize your device and store some information about your preferences or past actions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Cookies</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Lean Multiverse uses cookies and similar tracking technologies to track activity on our website and hold certain information. We use cookies for the following purposes:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li><strong className="text-white">Essential Cookies:</strong> These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.</li>
                <li><strong className="text-white">Performance Cookies:</strong> These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</li>
                <li><strong className="text-white">Functionality Cookies:</strong> These cookies allow the website to remember choices you make and provide enhanced, personalized features.</li>
                <li><strong className="text-white">Targeting Cookies:</strong> These cookies may be set through our site by our advertising partners to build a profile of your interests and show you relevant content on other sites.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Types of Cookies We Use</h2>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-4">
                <h3 className="text-xl font-semibold text-white mb-3">Session Cookies</h3>
                <p className="text-gray-300 leading-relaxed">
                  These are temporary cookies that are deleted when you close your browser. They help us maintain your session while you navigate through our website.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-4">
                <h3 className="text-xl font-semibold text-white mb-3">Persistent Cookies</h3>
                <p className="text-gray-300 leading-relaxed">
                  These cookies remain on your device for a set period or until you delete them. They help us remember your preferences and improve your experience on future visits.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Third-Party Cookies</h3>
                <p className="text-gray-300 leading-relaxed">
                  These cookies are set by domains other than ours. We use third-party services like analytics providers and payment processors that may set their own cookies.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Specific Cookies We Use</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Below is a list of the main cookies we use and their purposes:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-white/10">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 p-4 text-left text-white font-semibold">Cookie Name</th>
                      <th className="border border-white/10 p-4 text-left text-white font-semibold">Purpose</th>
                      <th className="border border-white/10 p-4 text-left text-white font-semibold">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 p-4 text-gray-300">session_id</td>
                      <td className="border border-white/10 p-4 text-gray-300">Maintains your session while browsing</td>
                      <td className="border border-white/10 p-4 text-gray-300">Session</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 p-4 text-gray-300">user_preferences</td>
                      <td className="border border-white/10 p-4 text-gray-300">Stores your preferences and settings</td>
                      <td className="border border-white/10 p-4 text-gray-300">1 year</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 p-4 text-gray-300">analytics_id</td>
                      <td className="border border-white/10 p-4 text-gray-300">Helps us analyze website usage</td>
                      <td className="border border-white/10 p-4 text-gray-300">2 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Third-Party Cookies</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the website, deliver advertisements, and so on. These third-party cookies include:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li><strong className="text-white">Analytics Services:</strong> We use analytics services to understand how visitors use our website</li>
                <li><strong className="text-white">Payment Processors:</strong> Payment processing services may set cookies to facilitate secure transactions</li>
                <li><strong className="text-white">Social Media:</strong> Social media platforms may set cookies when you interact with social media features on our site</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Managing Cookies</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in your browser settings. Most browsers allow you to:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>See what cookies you have and delete them individually</li>
                <li>Block third-party cookies</li>
                <li>Block cookies from particular sites</li>
                <li>Block all cookies from being set</li>
                <li>Delete all cookies when you close your browser</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                Please note that if you choose to block or delete cookies, some features of our website may not function properly, and your experience may be affected.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Browser-Specific Instructions</h2>
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Google Chrome</h3>
                  <p className="text-gray-300 text-sm">Settings → Privacy and Security → Cookies and other site data</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Mozilla Firefox</h3>
                  <p className="text-gray-300 text-sm">Options → Privacy & Security → Cookies and Site Data</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Safari</h3>
                  <p className="text-gray-300 text-sm">Preferences → Privacy → Cookies and website data</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Microsoft Edge</h3>
                  <p className="text-gray-300 text-sm">Settings → Privacy, search, and services → Cookies and site permissions</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Updates to This Cookie Policy</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We may update this Cookie Policy from time to time to reflect changes in the cookies we use or for other operational, legal, or regulatory reasons. Please revisit this Cookie Policy regularly to stay informed about our use of cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Contact Us</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <p className="text-gray-300 mb-2">
                  <strong className="text-white">Email:</strong> operations@leanmultiverse.com
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

