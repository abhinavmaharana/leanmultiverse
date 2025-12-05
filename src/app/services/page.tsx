import { Metadata } from 'next'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import ServicesPageClient from './ServicesPageClient'

// Lazy load heavy components
const QuotationForm = dynamic(() => import('./QuotationForm'), {
  ssr: true,
  loading: () => <div className="h-96 bg-black animate-pulse" />
})

export const metadata: Metadata = {
  title: "Web & App Development Services - Get Your Quote",
  description: "Professional web and mobile app development services. Get a custom quotation for your project. We build modern, scalable solutions for businesses.",
  keywords: [
    "web development",
    "app development",
    "mobile app development",
    "custom software development",
    "web design",
    "responsive web design",
    "full stack development"
  ],
  openGraph: {
    title: "Web & App Development Services - Get Your Quote",
    description: "Professional web and mobile app development services. Get a custom quotation for your project.",
    type: "website",
    url: "https://leanmultiverse.com/services",
  },
}

export default function ServicesPage() {
  return (
    <main className="relative w-full min-h-screen text-white">
      {/* Fixed Navbar */}
      <Navbar />
      
      {/* Page Content */}
      <div className="relative flex flex-col min-h-screen pt-24">
        {/* Background effects - Client component */}
        <ServicesPageClient />
        
        {/* Hero Section */}
        <section className="relative z-10 py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-6">
                <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 backdrop-blur-xl border border-yellow-400/30 rounded-full px-8 py-4">
                  <p className="uppercase tracking-[6px] text-yellow-400 lg:text-[20px] text-[16px] font-medium">
                    Our Services
                  </p>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
                Web & App Development
              </h1>
              
              <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                Transform your ideas into powerful digital solutions. We specialize in building 
                modern, scalable web and mobile applications that drive business growth.
              </p>
            </div>
          </div>
        </section>

        {/* Services Showcase */}
        <section className="relative z-10 py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
              {/* Web Development */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-yellow-600/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 h-full overflow-hidden group-hover:border-white/40 group-hover:bg-white/8 transition-all duration-300">
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400/80 to-yellow-600/80 rounded-xl flex items-center justify-center text-white shadow-2xl mb-6">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Web Development</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      Build responsive, high-performance websites and web applications that 
                      engage users and drive conversions.
                    </p>
                    <ul className="space-y-3 text-gray-400">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span>Responsive Web Design</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span>E-commerce Solutions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span>Custom Web Applications</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span>Progressive Web Apps (PWA)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span>API Integration & Development</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* App Development */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-yellow-600/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 h-full overflow-hidden group-hover:border-white/40 group-hover:bg-white/8 transition-all duration-300">
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400/80 to-yellow-600/80 rounded-xl flex items-center justify-center text-white shadow-2xl mb-6">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">App Development</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      Create native and cross-platform mobile applications that deliver 
                      exceptional user experiences on iOS and Android.
                    </p>
                    <ul className="space-y-3 text-gray-400">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span>iOS App Development</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span>Android App Development</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span>Cross-Platform Solutions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span>UI/UX Design</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span>App Store Optimization</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why Choose Us?
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                We combine technical expertise with business acumen to deliver solutions that matter
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Expert Team",
                  description: "Experienced developers and designers with proven track records",
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  )
                },
                {
                  title: "Modern Tech Stack",
                  description: "Using latest technologies and best practices for optimal performance",
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  )
                },
                {
                  title: "Timely Delivery",
                  description: "We respect deadlines and deliver projects on time, every time",
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-lg flex items-center justify-center text-yellow-400 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quotation Form Section */}
        <section id="get-quote" className="relative z-10 py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block mb-6">
                <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 backdrop-blur-xl border border-yellow-400/30 rounded-full px-8 py-4">
                  <p className="uppercase tracking-[6px] text-yellow-400 lg:text-[20px] text-[16px] font-medium">
                    Get Your Quote
                  </p>
                </div>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                Request a Custom Quotation
              </h2>
              
              <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                Tell us about your project and we&apos;ll provide you with a detailed quotation 
                tailored to your needs.
              </p>
            </div>

            <Suspense fallback={<div className="h-96 bg-black animate-pulse rounded-3xl" />}>
              <QuotationForm />
            </Suspense>
          </div>
        </section>

        <Suspense fallback={<div className="h-32 bg-black animate-pulse" />}>
          <Footer />
        </Suspense>
      </div>
    </main>
  )
}

