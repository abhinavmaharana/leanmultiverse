'use client'

import { useState } from 'react'
import { Modal } from 'antd'
import BookAiMlWebinarContent from './BookAiMlWebinarContent'
import '@/components/webinar/book-webinar.css'

const shimmerStyle = `
@keyframes aiml-shimmer {
  0% { transform: translateX(-150%) skewX(-20deg); }
  100% { transform: translateX(250%) skewX(-20deg); }
}
`

interface Props {
  source: 'hero' | 'sticky-bar' | 'mentors'
}

export default function BookAiMlWebinarModal({ source }: Props) {
  const [open, setOpen] = useState(false)

  const showModal = () => setOpen(true)
  const handleCancel = () => setOpen(false)

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: shimmerStyle }} />

      {source === 'sticky-bar' ? (
        <button
          onClick={showModal}
          className="relative overflow-hidden bg-amber-400 hover:bg-amber-500 text-white text-[15px] font-black px-10 py-3 rounded-xl transition-all duration-200 shadow-md border border-transparent transform hover:scale-[1.02] h-auto"
        >
          <span className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent" style={{ animation: 'aiml-shimmer 2s infinite' }} />
          <span className="relative z-10">Claim Your Spot</span>
        </button>
      ) : source === 'hero' ? (
        <button
          onClick={showModal}
          className="inline-flex items-center justify-center transition-all duration-200 font-orbitron uppercase tracking-[0.2em] gap-3 bg-[#FF0000] text-white border-none px-10 py-4 text-[11px] font-bold min-w-[200px]"
        >
          <span className="w-3 h-3 border border-white" />
          BOOK AT RS 9
        </button>
      ) : (
        <button
          onClick={showModal}
          className="bg-[#0047FF] hover:bg-blue-600 px-10 py-3 text-[11px] inline-flex items-center justify-center transition-all duration-200 font-orbitron uppercase tracking-[0.2em] text-white font-bold"
        >
          BOOK AT RS 9
        </button>
      )}

      <Modal
        open={open}
        onCancel={handleCancel}
        footer={null}
        width={1100}
        centered
        destroyOnHidden
        className="webinar-modal"
      >
        <BookAiMlWebinarContent />
      </Modal>
    </>
  )
}
