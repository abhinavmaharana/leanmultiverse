'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { BOOK, CHEATCODES, DISCOUNT_PERCENT } from '@/config/book'
import { jetbrainsMono } from '@/lib/fonts'

/* The site's antd reset (unlayered) overrides Tailwind margin, font-weight and colour on headings, paragraphs
   and links, so those are pinned inline below. */

const CSS = `
@keyframes nb-float { 0%,100% { transform: translateY(0) rotate(var(--r,0deg)); } 50% { transform: translateY(-12px) rotate(var(--r,0deg)); } }
@keyframes nb-glow { 0%,100% { opacity:.55; transform: scale(1); } 50% { opacity:.9; transform: scale(1.07); } }
@keyframes nb-shimmer { 0% { transform: translateX(-150%) skewX(-20deg); } 100% { transform: translateX(250%) skewX(-20deg); } }
.nb-float { animation: nb-float 6s ease-in-out infinite; }
.nb-chip { animation: nb-float 5s ease-in-out infinite; }
.nb-glow { animation: nb-glow 5s ease-in-out infinite; }
.nb-shimmer { animation: nb-shimmer 2.4s infinite; }
@media (prefers-reduced-motion: reduce) { .nb-float,.nb-chip,.nb-glow,.nb-shimmer { animation: none !important; } }
`

function trackBuy() {
  const w = window as unknown as { fbq?: (...a: unknown[]) => void }
  w.fbq?.('trackCustom', 'BuyBookClick', { placement: 'home-section' })
}

export function NewBookSection() {
  return (
    <section id="book" className="relative isolate w-full overflow-hidden bg-[#070B14] text-white">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="pointer-events-none absolute -left-32 top-1/2 h-[480px] w-[640px] -translate-y-1/2 rounded-full bg-[#1E6E96]/25 blur-[120px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          backgroundImage:
            'linear-gradient(rgba(94,200,245,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(94,200,245,.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
        {/* Book */}
        <div className="relative mx-auto w-full max-w-[380px]">
          <div className="nb-glow pointer-events-none absolute inset-x-4 top-8 bottom-4 rounded-full bg-[#2B8DBA]/35 blur-[80px]" />
          <div className="nb-float relative mx-auto w-[230px] sm:w-[290px]">
            <Image
              src="/book/book-3d.webp"
              alt={`${BOOK.title} by ${BOOK.author} — book cover`}
              width={767}
              height={1248}
              sizes="(max-width: 640px) 230px, 290px"
              className="h-auto w-full drop-shadow-[0_36px_50px_rgba(0,0,0,0.65)]"
            />
          </div>
          {[
            { t: 'Proof > words', cls: 'xl:-left-16 top-10', d: '0s', r: '-4deg' },
            { t: 'Loyalty ≠ growth', cls: 'xl:-right-20 top-[40%]', d: '1.2s', r: '3deg' },
            { t: 'Peace > paycheck', cls: 'xl:-left-16 bottom-16', d: '2.1s', r: '-2deg' },
          ].map((c) => (
            <div
              key={c.t}
              className={`nb-chip ${jetbrainsMono.className} absolute hidden xl:block ${c.cls} rounded-lg border border-[#5EC8F5]/30 bg-[#0E1626]/85 px-2.5 py-1 text-[10px] text-[#9BD9F5] shadow-lg backdrop-blur`}
              style={{ animationDelay: c.d, ['--r' as string]: c.r }}
            >
              {'{ '}
              {c.t}
              {' }'}
            </div>
          ))}
        </div>

        {/* Copy */}
        <div className="flex flex-col items-start gap-6">
          <div
            className={`${jetbrainsMono.className} inline-flex items-center gap-2 rounded-full border border-[#5EC8F5]/30 bg-[#5EC8F5]/10 px-4 py-2 text-[11px] tracking-[0.2em] text-[#5EC8F5] uppercase`}
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#5EC8F5]" />
            New book by {BOOK.author}
          </div>

          <h2 className="text-3xl leading-[1.08] tracking-tight sm:text-5xl" style={{ margin: 0, fontWeight: 900 }}>
            Corporate doesn&apos;t reward effort.
            <span className="mt-1 block">
              It rewards{' '}
              <span className="bg-gradient-to-r from-[#5EC8F5] via-[#8FB6FF] to-[#D79BFF] bg-clip-text text-transparent">
                proof of effort.
              </span>
            </span>
          </h2>

          <p className="max-w-xl text-base leading-relaxed text-white/70 sm:text-lg" style={{ margin: 0 }}>
            <span className="text-white" style={{ fontWeight: 700 }}>
              {BOOK.title}
            </span>{' '}
            — the real survival guide nobody gave you. Eight cheatcodes on the silent rules, the hidden expectations and the patterns behind
            success and frustration at work.
          </p>

          <div className={`${jetbrainsMono.className} flex flex-wrap gap-2 text-xs text-[#9BD9F5]`}>
            {CHEATCODES.map((c, i) => (
              <span key={c.name} className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5">
                <span className="text-[#FFC107]">{String(i + 1).padStart(2, '0')}</span> {c.name}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-5 pt-1">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl text-white sm:text-5xl" style={{ fontWeight: 900 }}>
                ₹{BOOK.price}
              </span>
              <span className="text-lg text-white/40 line-through">₹{BOOK.mrp}</span>
              <span className="rounded-md bg-emerald-400/15 px-2 py-1 text-xs text-emerald-300" style={{ fontWeight: 700 }}>
                {DISCOUNT_PERCENT}% OFF
              </span>
              <span className="text-xs text-white/40">{BOOK.format} · {BOOK.pages} pages</span>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={BOOK.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackBuy}
                style={{ color: '#0B1220', fontWeight: 900 }}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#FFC107] px-8 py-4 text-base leading-none whitespace-nowrap shadow-[0_10px_40px_-8px_rgba(255,193,7,0.7)] transition-all duration-200 hover:scale-[1.03] hover:bg-[#ffcd38] active:scale-95"
              >
                <span className="nb-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                <span className="relative z-10">Buy Now on Amazon</span>
                <ArrowUpRight className="relative z-10 h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <Link
                href="/corporate-cheatcode"
                style={{ color: 'rgba(255,255,255,0.88)' }}
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-4 text-base leading-none transition-colors hover:bg-white/10"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
