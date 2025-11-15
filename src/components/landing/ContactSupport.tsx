"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ContactFormModal from "@/components/ui/ContactFormModal"

const BUSINESS_PHONE_DISPLAY = "080 6217 7938"
const BUSINESS_PHONE_E164 = "+918062177938"

const contactMethods = [
  {
    id: "whatsapp",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
      </svg>
    ),
    title: "WhatsApp Chat",
    description: "Quick support via WhatsApp",
    contact: BUSINESS_PHONE_DISPLAY,
    hours: "Available 24/7",
    action: "Chat on WhatsApp",
    gradient: "from-yellow-400/80 to-yellow-600/80",
    bgGradient: "from-yellow-400/10 to-yellow-600/10"
  },
  {
    id: "phone",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h1.28a2 2 0 011.94 1.515l.62 2.48a2 2 0 01-.72 2.07l-.92.77a16.001 16.001 0 007.18 7.18l.77-.92a2 2 0 012.07-.72l2.48.62A2 2 0 0121 17.72V19a2 2 0 01-2 2h-1C10.163 21 3 13.837 3 4V5z" />
      </svg>
    ),
    title: "Call Our Team",
    description: "Speak directly with a course advisor",
    contact: BUSINESS_PHONE_DISPLAY,
    hours: "Available 9 AM – 9 PM IST",
    action: "Call Now",
    gradient: "from-yellow-500/80 to-yellow-600/80",
    bgGradient: "from-yellow-500/10 to-yellow-600/10"
  }
]

export default function ContactSupport() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)
  const [pendingAction, setPendingAction] = useState<string | null>(null)

  const handleContactAction = (action: string) => {
    setPendingAction(action)
    setIsContactFormOpen(true)
  }

  const handleFormSubmit = () => {
    if (pendingAction === "Chat on WhatsApp") {
      const phoneNumber = BUSINESS_PHONE_E164.replace('+', '')
      const message = "Hi! I'm interested in learning more about your courses."
      setTimeout(() => {
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank')
      }, 500)
    } else if (pendingAction === "Call Now") {
      setTimeout(() => {
        window.location.href = `tel:${BUSINESS_PHONE_E164}`
      }, 500)
    } else if (pendingAction === "Start Chat") {
      // This will trigger the chat widget
      setTimeout(() => {
        const chatButton = document.querySelector('[data-chat-button]') as HTMLElement
        if (chatButton) {
          chatButton.click()
        }
      }, 500)
    }
    setPendingAction(null)
  }

  return (
    <section className="py-20 bg-black relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 backdrop-blur-xl border border-yellow-400/30 rounded-full px-8 py-4">
              <p className="uppercase tracking-[6px] text-yellow-400 lg:text-[20px] text-[16px] font-medium">
                Get Support
              </p>
            </div>
          </div>
          
          <h2 className="support-title text-[30px] md:text-[46.13px] font-bold mb-6 text-white">
            We&apos;re Here to Help
          </h2>
          
          <p className="support-description text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Our dedicated support team is available 24/7 to help you with any questions 
            about our courses, admissions, or career guidance.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-20">
          {/* Contact Methods - Left Side */}
          <div className="lg:col-span-5 space-y-6">
            {contactMethods.map((method) => (
              <div
                key={method.id}
                className="group relative"
                onMouseEnter={() => setHoveredCard(method.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Background glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${method.bgGradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="contact-card relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 h-full overflow-hidden group-hover:border-white/40 group-hover:bg-white/8 transition-all duration-300">
                  <div className="relative z-10 flex items-center space-x-4">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${method.gradient} rounded-xl flex items-center justify-center text-white shadow-2xl contact-icon`}
                      >
                        {method.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {method.title}
                      </h3>
                      
                      <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                        {method.description}
                      </p>

                      <div className="space-y-1 mb-4">
                        <p className="text-yellow-400 font-medium text-sm">{method.contact}</p>
                        <p className="text-gray-400 text-xs">{method.hours}</p>
                      </div>

                      {/* Button */}
                      <div className="relative group">
                        <Button 
                          onClick={() => handleContactAction(method.action)}
                          className={`contact-button relative w-full bg-gradient-to-r ${method.gradient} text-white hover:opacity-90 rounded-xl py-3 text-sm font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20`}
                          data-cursor-hover
                        >
                          <span className="relative z-10">
                            {method.action}
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section - Right Side */}
          <div className="lg:col-span-7 relative">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-transparent to-yellow-400/5 rounded-3xl blur-3xl" />

            <div className="relative z-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 h-full flex flex-col justify-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Still Have Questions?
              </h3>
              
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                Our education consultants are here to help you choose the right program 
                and answer any questions about your learning journey.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-yellow-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Button 
                    className="contact-button relative bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 rounded-2xl px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 border border-yellow-400/20"
                    data-cursor-hover
                  >
                    <span className="relative z-10">
                      Schedule a Call
                    </span>
                  </Button>
                </div>
                
                <div className="relative group">
                  <div className="absolute inset-0 bg-white/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Button 
                    className="contact-button relative bg-white/10 text-white hover:bg-white/20 rounded-2xl px-10 py-4 text-lg font-semibold border border-white/20 backdrop-blur-md hover:border-white/40 transition-all duration-300 hover:shadow-xl"
                    data-cursor-hover
                  >
                    <span className="relative z-10">
                      Download Brochure
                    </span>
                  </Button>
                </div>
              </div>

              {/* Additional info */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>24/7 Support Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Call us at {BUSINESS_PHONE_DISPLAY}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Instant Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Expert Guidance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      <ContactFormModal
        isOpen={isContactFormOpen}
        onClose={() => {
          setIsContactFormOpen(false)
          setPendingAction(null)
        }}
        onSubmit={handleFormSubmit}
        source={pendingAction || "contact-support"}
      />
    </section>
  )
}