'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ContactFormModal from './ContactFormModal'

const shimmerStyle = `
@keyframes shimmer {
  0% { transform: translateX(-150%) skewX(-20deg); }
  100% { transform: translateX(250%) skewX(-20deg); }
}
`

export default function PerfectChatbot() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)
  const [pendingAction, setPendingAction] = useState<string | null>(null)

  const handleWhatsAppClick = () => {
    setPendingAction('whatsapp')
    setIsContactFormOpen(true)
  }

  const handleFormSubmit = () => {
    if (pendingAction === 'whatsapp') {
      const message = "Hi! I'm interested in learning more about your courses."
      setTimeout(() => {
        window.open(`https://wa.me/917696627657?text=${encodeURIComponent(message)}`, '_blank')
      }, 500)
    }
    setPendingAction(null)
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: shimmerStyle }} />
      <motion.div
        className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end gap-2 sm:gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="flex flex-col gap-2 sm:gap-3 items-stretch w-full">
          <motion.button
            onClick={handleWhatsAppClick}
            className="relative inline-flex justify-center items-center gap-0 sm:gap-2 rounded-full w-10 h-10 sm:w-auto sm:h-auto sm:px-4 sm:py-2 text-sm font-semibold text-white bg-[#25D366] hover:bg-[#1ebe5a] transition-all border border-white/20 shadow-lg cursor-pointer overflow-hidden"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.96 }}
          >
            <span className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent" style={{ animation: 'shimmer 2s infinite' }} />
            <svg className="relative z-10 w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
            </svg>
            <span className="relative z-10 hidden sm:inline">WhatsApp</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Contact Form Modal */}
      <ContactFormModal
        isOpen={isContactFormOpen}
        onClose={() => {
          setIsContactFormOpen(false)
          setPendingAction(null)
        }}
        onSubmit={handleFormSubmit}
        source={pendingAction || 'perfect-chatbot'}
      />
    </>
  )
}
