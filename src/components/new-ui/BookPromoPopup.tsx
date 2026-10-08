'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { BOOK, DISCOUNT_PERCENT } from '@/config/book'

const SHOW_AFTER_MS = 3_000
const MIN_DELAY_AFTER_MOUNT_MS = 800

/**
 * Promotes the book on EVERY homepage load: after 3s, or on exit intent (desktop), whichever comes first.
 * It shows once per page load, so closing it does not bring it straight back on the same page.
 * The site's antd reset overrides Tailwind colour/weight/margin on links, headings and paragraphs,
 * so those are pinned inline below.
 */
export function BookPromoPopup() {
  const [open, setOpen] = useState(false)
  const shown = useRef(false)
  const closeBtn = useRef<HTMLButtonElement>(null)

  const show = useCallback(() => {
    if (shown.current) return
    shown.current = true
    setOpen(true)
  }, [])

  useEffect(() => {
    // Count from when the page started loading (not from hydration), so slow devices don't wait extra.
    // A short floor keeps it from appearing in the same instant the page becomes interactive.
    const delay = Math.max(MIN_DELAY_AFTER_MOUNT_MS, SHOW_AFTER_MS - performance.now())
    const timer = window.setTimeout(show, delay)
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) show()
    }
    document.addEventListener('mouseout', onLeave)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('mouseout', onLeave)
    }
  }, [show])

  const dismiss = useCallback(() => setOpen(false), [])

  const onBuy = useCallback(() => {
    const w = window as unknown as { fbq?: (...a: unknown[]) => void }
    w.fbq?.('trackCustom', 'BuyBookClick', { placement: 'popup' })
    setOpen(false)
  }, [])

  useEffect(() => {
    if (!open) return
    closeBtn.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && dismiss()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, dismiss])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[2100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={dismiss} aria-hidden="true" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${BOOK.title} — now on Amazon.in`}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: 'spring', damping: 26, stiffness: 260 }}
            className="relative grid w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#0A101C] shadow-[0_40px_120px_-20px_rgba(43,141,186,0.55)] md:grid-cols-[0.8fr_1.2fr]"
          >
            <button
              ref={closeBtn}
              type="button"
              onClick={dismiss}
              aria-label="Close"
              // Inline colour: the antd reset's `button { color: inherit }` would otherwise win.
              style={{ color: '#fff' }}
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Book */}
            <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#10243A] to-[#0A101C] px-6 pb-2 pt-8 md:py-10">
              <div className="pointer-events-none absolute inset-8 rounded-full bg-[#2B8DBA]/40 blur-[70px]" />
              <Image
                src="/book/book-3d.webp"
                alt={`${BOOK.title} by ${BOOK.author}`}
                width={767}
                height={1248}
                sizes="(max-width: 768px) 140px, 240px"
                className="relative h-auto w-[130px] drop-shadow-[0_24px_36px_rgba(0,0,0,0.6)] md:w-[220px]"
              />
            </div>

            {/* Copy */}
            <div className="flex flex-col items-start gap-4 px-6 pb-7 pt-4 md:px-8 md:py-10">
              <div className="rounded-full border border-[#5EC8F5]/30 bg-[#5EC8F5]/10 px-3 py-1.5 text-[11px] tracking-[0.2em] text-[#5EC8F5] uppercase">
                New book by Nitesh
              </div>
              <h2 className="text-2xl leading-tight text-white md:text-[1.9rem]" style={{ margin: 0, fontWeight: 900 }}>
                Corporate doesn&apos;t reward effort.{' '}
                <span className="bg-gradient-to-r from-[#5EC8F5] via-[#8FB6FF] to-[#D79BFF] bg-clip-text text-transparent">
                  It rewards proof of effort.
                </span>
              </h2>
              <p className="text-sm leading-relaxed text-white/65 md:text-base" style={{ margin: 0 }}>
                8 cheatcodes to survive and win at work. {BOOK.title} — the real survival guide nobody gave you.
              </p>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl text-white" style={{ fontWeight: 900 }}>
                  ₹{BOOK.price}
                </span>
                <span className="text-base text-white/40 line-through">₹{BOOK.mrp}</span>
                <span className="rounded-md bg-emerald-400/15 px-2 py-1 text-xs text-emerald-300" style={{ fontWeight: 700 }}>
                  {DISCOUNT_PERCENT}% OFF
                </span>
              </div>

              <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={BOOK.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onBuy}
                  style={{ color: '#0B1220', fontWeight: 900 }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FFC107] px-6 py-3.5 text-base leading-none whitespace-nowrap shadow-[0_10px_30px_-8px_rgba(255,193,7,0.7)] transition-all hover:scale-[1.03] hover:bg-[#ffcd38] active:scale-95"
                >
                  Buy Now on Amazon <ArrowUpRight className="h-5 w-5" />
                </a>
                <Link
                  href="/corporate-cheatcode"
                  style={{ color: 'rgba(255,255,255,0.85)' }}
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3.5 text-base leading-none transition-colors hover:bg-white/10"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
