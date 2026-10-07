'use client'

import { useEffect, useState, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { JetBrains_Mono } from 'next/font/google'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Instagram, Youtube } from 'lucide-react'
import { BOOK, CHEATCODES, DISCOUNT_PERCENT, NEVER_TOLD } from '@/config/book'

const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' })

/* The site's antd reset (unlayered) overrides Tailwind's margin, font-weight and colour on headings,
   paragraphs and links, so those are pinned inline here. */
function H({
  as: Tag = 'h2',
  weight = 800,
  className = '',
  children,
}: {
  as?: 'h1' | 'h2' | 'h3'
  weight?: number
  className?: string
  children: ReactNode
}) {
  return (
    <Tag className={className} style={{ margin: 0, fontWeight: weight }}>
      {children}
    </Tag>
  )
}

function P({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <p className={className} style={{ margin: 0 }}>
      {children}
    </p>
  )
}

const CSS = `
@keyframes cc-float { 0%,100% { transform: translateY(0) rotate(var(--r,0deg)); } 50% { transform: translateY(-14px) rotate(var(--r,0deg)); } }
@keyframes cc-glow { 0%,100% { opacity:.55; transform: scale(1); } 50% { opacity:.9; transform: scale(1.08); } }
@keyframes cc-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes cc-shimmer { 0% { transform: translateX(-150%) skewX(-20deg); } 100% { transform: translateX(250%) skewX(-20deg); } }
@keyframes cc-blink { 0%,49% { opacity:1; } 50%,100% { opacity:0; } }
.cc-float { animation: cc-float 6s ease-in-out infinite; }
.cc-chip { animation: cc-float 5s ease-in-out infinite; }
.cc-glow { animation: cc-glow 5s ease-in-out infinite; }
.cc-marquee { animation: cc-marquee 45s linear infinite; }
.cc-shimmer { animation: cc-shimmer 2.4s infinite; }
.cc-cursor { animation: cc-blink 1s steps(1) infinite; }
.cc-grid { background-image: linear-gradient(rgba(94,200,245,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(94,200,245,.05) 1px, transparent 1px); background-size: 48px 48px; }
@media (prefers-reduced-motion: reduce) { .cc-float,.cc-chip,.cc-glow,.cc-marquee,.cc-shimmer,.cc-cursor { animation: none !important; } }
`

function trackBuy(placement: string) {
  if (typeof window === 'undefined') return
  const w = window as unknown as { fbq?: (...a: unknown[]) => void }
  w.fbq?.('trackCustom', 'BuyBookClick', { placement })
}

function BuyButton({
  placement,
  size = 'lg',
  className = '',
}: {
  placement: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const sizes = size === 'lg' ? 'px-9 py-[18px] text-lg' : size === 'md' ? 'px-6 py-3 text-[15px]' : 'px-5 py-3 text-[15px]'
  return (
    <a
      href={BOOK.amazonUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackBuy(placement)}
      // Inline colour: the antd reset's `a { color }` would otherwise override the dark text.
      style={{ color: '#0B1220', fontWeight: 900 }}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#FFC107] hover:bg-[#ffcd38] shadow-[0_10px_40px_-8px_rgba(255,193,7,0.7)] transition-all duration-200 hover:scale-[1.03] active:scale-95 whitespace-nowrap leading-none ${sizes} ${className}`}
    >
      <span className="cc-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      <span className="relative z-10">Buy Now on Amazon</span>
      <ArrowUpRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  )
}

function Price({ large = false }: { large?: boolean }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className={`${large ? 'text-5xl sm:text-6xl' : 'text-3xl'} text-white`} style={{ fontWeight: 900 }}>
        ₹{BOOK.price}
      </span>
      <span className="text-lg text-white/40 line-through">₹{BOOK.mrp}</span>
      <span
        className="rounded-md bg-emerald-400/15 px-2 py-1 text-xs tracking-wide text-emerald-300"
        style={{ fontWeight: 700 }}
      >
        {DISCOUNT_PERCENT}% OFF
      </span>
    </div>
  )
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className={`${mono.className} text-xs tracking-[0.3em] text-[#5EC8F5] uppercase`}>{children}</div>
  )
}

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

/* ─── Header ─── */
function Header() {
  return (
    <header className="relative z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" style={{ color: '#fff' }}>
          <Image src="/IMG_5963.PNG" alt="Lean Multiverse" width={36} height={36} className="h-9 w-auto object-contain" />
          <span className="leading-tight">
            <span className="block text-lg" style={{ fontWeight: 900 }}>
              Lean
            </span>
            <span className="block text-[11px] tracking-wider uppercase" style={{ fontWeight: 700 }}>
              Multiverse
            </span>
          </span>
        </Link>
        <BuyButton placement="header" size="md" />
      </div>
    </header>
  )
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="cc-grid relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[#1E6E96]/25 blur-[120px]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pt-6 pb-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6 lg:px-8 lg:pt-12 lg:pb-28">
        <div className="flex flex-col items-start gap-7">
          <div
            className={`${mono.className} inline-flex items-center gap-2 rounded-full border border-[#5EC8F5]/30 bg-[#5EC8F5]/10 px-4 py-2 text-[11px] tracking-[0.2em] text-[#5EC8F5] uppercase`}
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#5EC8F5]" />
            {BOOK.format} · Now on Amazon.in
          </div>

          <H as="h1" weight={900} className="text-[2.6rem] leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.2rem]">
            Corporate doesn&apos;t reward effort.
            <span className="mt-2 block text-white/90">
              Corporate rewards{' '}
              <span className="bg-gradient-to-r from-[#5EC8F5] via-[#8FB6FF] to-[#D79BFF] bg-clip-text text-transparent">
                proof of effort.
              </span>
            </span>
          </H>

          <P className="max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl">
            The real survival guide nobody gave you — from Nitesh,{' '}
            <span className="text-white">the corporate guy who chose freedom over ₹2 Crores</span>.
          </P>

          <div className="flex flex-col gap-5">
            <Price large />
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <BuyButton placement="hero" />
              <a
                href="#cheatcodes"
                style={{ color: 'rgba(255,255,255,0.75)' }}
                className="inline-flex items-center gap-2 text-sm underline-offset-4 hover:underline"
              >
                See the 8 cheatcodes <ArrowDown className="h-4 w-4" />
              </a>
            </div>
            <div className="text-xs text-white/40">Opens Amazon.in in a new tab · secure checkout by Amazon</div>
          </div>

          <div className={`${mono.className} flex flex-wrap gap-2 text-xs text-white/60`}>
            {[`${BOOK.pages} pages`, BOOK.language, BOOK.format, BOOK.publisher].map((f) => (
              <span key={f} className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5">
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Book */}
        <div className="relative mx-auto w-full max-w-[400px] pt-4">
          <div className="cc-glow pointer-events-none absolute inset-x-6 top-10 bottom-6 rounded-full bg-[#2B8DBA]/35 blur-[80px]" />
          <div className="cc-float relative mx-auto w-[260px] sm:w-[320px]">
            <Image
              src="/book/book-3d.webp"
              alt={`${BOOK.title} by ${BOOK.author} — book cover`}
              width={767}
              height={1248}
              priority
              sizes="(max-width: 640px) 260px, 320px"
              className="h-auto w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.65)]"
            />
          </div>
          {[
            { t: 'Proof > words', cls: 'left-0 top-14 sm:-left-8', d: '0s', r: '-4deg' },
            { t: 'Loyalty ≠ growth', cls: 'right-0 top-[38%] sm:-right-6', d: '1.2s', r: '3deg' },
            { t: 'Peace > paycheck', cls: 'left-2 bottom-24 sm:-left-6', d: '2.1s', r: '-2deg' },
          ].map((c) => (
            <div
              key={c.t}
              className={`cc-chip ${mono.className} absolute ${c.cls} rounded-lg border border-[#5EC8F5]/30 bg-[#0E1626]/85 px-3 py-1.5 text-xs text-[#9BD9F5] shadow-lg backdrop-blur`}
              style={{ animationDelay: c.d, ['--r' as string]: c.r }}
            >
              {'{ '}
              {c.t}
              {' }'}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Marquee ─── */
function Marquee() {
  const items = [...CHEATCODES.map((c) => c.name.toUpperCase())]
  const row = (
    <>
      {items.map((t) => (
        <span key={t} className="flex items-center gap-8">
          <span>{t}</span>
          <span className="text-[#FFC107]">✦</span>
        </span>
      ))}
    </>
  )
  return (
    <div className="overflow-hidden border-y border-white/10 bg-[#0A101C] py-4">
      <div className={`cc-marquee ${mono.className} flex w-max gap-8 text-sm tracking-[0.25em] text-[#5EC8F5]/80`} style={{ fontWeight: 700 }}>
        {row}
        {row}
        {row}
        {row}
      </div>
    </div>
  )
}

/* ─── Stats ─── */
function Stats() {
  const stats = [
    { v: '8', l: 'Cheatcodes' },
    { v: `${BOOK.pages}`, l: 'Pages' },
    { v: BOOK.followers, l: 'Follow Nitesh' },
    { v: `₹${BOOK.price}`, l: 'On Amazon.in' },
  ]
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l} className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-6 text-center">
            <div className="text-4xl text-white sm:text-5xl" style={{ fontWeight: 900 }}>
              {s.v}
            </div>
            <div className={`${mono.className} mt-2 text-[11px] tracking-[0.2em] text-[#5EC8F5] uppercase`}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── The 8 cheatcodes (terminal) ─── */
function Cheatcodes() {
  return (
    <section id="cheatcodes" className="relative mx-auto max-w-5xl scroll-mt-6 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col items-center gap-4 text-center">
        <Eyebrow>The cheatcodes</Eyebrow>
        <H weight={900} className="text-4xl leading-tight tracking-tight sm:text-6xl">
          8 rules. <span className="text-[#5EC8F5]">Zero fluff.</span>
        </H>
        <P className="max-w-2xl text-lg text-white/65">
          Bro, this isn&apos;t another motivational book telling you to &ldquo;follow your passion&rdquo;. It&apos;s the survival guide for the
          realities nobody prepared you for — the silent rules, the hidden expectations, the patterns behind success and frustration.
        </P>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0B1322] shadow-[0_30px_80px_-30px_rgba(94,200,245,0.35)]">
        <div className="flex items-center gap-2 border-b border-white/10 bg-[#0E1830] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          <span className={`${mono.className} ml-3 text-xs text-white/40`}>corporate-cheatcode.sh</span>
        </div>
        <div className={`${mono.className} px-4 py-6 sm:px-8 sm:py-8`}>
          <div className="mb-5 text-sm text-white/50">
            <span className="text-emerald-400">$</span> run cheatcodes --all
          </div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ staggerChildren: 0.09 }}
            className="flex flex-col"
          >
            {CHEATCODES.map((c, i) => (
              <motion.div
                key={c.name}
                variants={reveal}
                className="group grid grid-cols-[2.2rem_1fr] items-baseline gap-x-3 rounded-lg px-2 py-3 transition-colors hover:bg-[#5EC8F5]/[0.07] sm:grid-cols-[2.6rem_minmax(0,19rem)_1fr] sm:gap-x-4"
              >
                <span className="text-sm text-[#FFC107]">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-base text-white sm:text-lg" style={{ fontWeight: 700 }}>
                  {c.name}
                </span>
                <span className="col-start-2 text-sm text-[#5EC8F5] sm:col-start-auto sm:text-base">
                  <span className="text-white/30">{'// '}</span>
                  {c.rule}
                </span>
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-5 text-sm text-white/50">
            <span className="text-emerald-400">$</span> <span className="cc-cursor inline-block h-4 w-2 translate-y-0.5 bg-[#5EC8F5]" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── What they never told you ─── */
function NeverTold() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 flex flex-col items-center gap-4 text-center">
        <Eyebrow>Chapter zero</Eyebrow>
        <H weight={900} className="text-4xl leading-tight tracking-tight sm:text-6xl">
          Here&apos;s what they{' '}
          <span className="bg-gradient-to-r from-[#5EC8F5] to-[#D79BFF] bg-clip-text text-transparent">never told you</span>
        </H>
      </div>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        transition={{ staggerChildren: 0.1 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-6"
      >
        {NEVER_TOLD.map((t, i) => (
          <motion.div
            key={t}
            variants={reveal}
            className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.01] p-7 transition-all hover:-translate-y-1 hover:border-[#5EC8F5]/40 lg:col-span-2 ${i > 2 ? 'lg:col-span-3' : ''}`}
          >
            <span
              className="pointer-events-none absolute -top-4 right-3 text-8xl text-white/[0.05] transition-colors group-hover:text-[#5EC8F5]/15"
              style={{ fontWeight: 900 }}
            >
              {i + 1}
            </span>
            <div className="relative text-xl leading-snug text-white sm:text-2xl" style={{ fontWeight: 700 }}>
              {t}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

/* ─── Pull quote ─── */
function Quote() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#0A101C] py-20">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1E6E96]/20 blur-[110px]" />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center">
        <H weight={800} className="text-3xl leading-tight text-white/90 sm:text-5xl">
          If the corporate world feels confusing, draining, or unfair, you don&apos;t need luck.
        </H>
        <div
          className="bg-gradient-to-r from-[#5EC8F5] via-[#8FB6FF] to-[#D79BFF] bg-clip-text text-5xl text-transparent sm:text-7xl"
          style={{ fontWeight: 900 }}
        >
          You need clarity.
        </div>
      </div>
    </section>
  )
}

/* ─── Author ─── */
function Author() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="relative aspect-[4/3] w-full lg:absolute lg:inset-0 lg:aspect-auto">
        <Image
          src="/book/author.webp"
          alt="Nitesh holding his book, Corporate Cheatcode"
          fill
          sizes="100vw"
          className="object-cover object-[35%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#070B14]/40 lg:to-[#070B14]" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:min-h-[640px] lg:px-8 lg:py-24">
        <div className="flex flex-col gap-6 lg:ml-auto lg:w-[46%]">
          <Eyebrow>About the author</Eyebrow>
          <H weight={900} className="text-5xl tracking-tight sm:text-6xl">
            Nitesh
          </H>
          <P className="text-lg leading-relaxed text-white/75">
            A corporate professional turned Agile Transformation Coach, followed by{' '}
            <span className="text-white" style={{ fontWeight: 700 }}>
              {BOOK.followers} professionals
            </span>{' '}
            for his honest, no-fluff take on corporate life. With experience across Microsoft, PwC and startups, he decodes how corporate
            systems really work.
          </P>
          <P className="text-lg leading-relaxed text-white/75">
            Then he walked away from <span className="text-[#FFC107]" style={{ fontWeight: 700 }}>₹2 Crores</span> to choose freedom — and wrote
            down everything he wished someone had told him.
          </P>
          <div className="flex flex-wrap gap-3">
            <a
              href={`https://www.instagram.com/${BOOK.instagramHandle}/`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#fff' }}
              className={`${mono.className} inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm transition-colors hover:border-[#5EC8F5]/60 hover:bg-white/10`}
            >
              <Instagram className="h-4 w-4" /> @{BOOK.instagramHandle}
            </a>
            <span
              className={`${mono.className} inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white`}
            >
              <Youtube className="h-4 w-4" /> {BOOK.youtubeChannel}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Details ─── */
function Details() {
  const specs: [string, string][] = [
    ['Format', BOOK.format],
    ['Pages', String(BOOK.pages)],
    ['Language', BOOK.language],
    ['Publisher', BOOK.publisher],
    ['Published', BOOK.publishedOn],
    ['ISBN-10', BOOK.isbn10],
    ['ISBN-13', BOOK.isbn13],
    ['Size', BOOK.dimensions],
    ['Weight', BOOK.weight],
  ]
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative mx-auto w-full max-w-[420px]">
          <div className="pointer-events-none absolute inset-0 rounded-full bg-[#2B8DBA]/25 blur-[90px]" />
          <Image
            src="/book/cover-back.webp"
            alt="Back cover of Corporate Cheatcode"
            width={983}
            height={1500}
            sizes="(max-width: 1024px) 80vw, 420px"
            className="relative h-auto w-full rounded-md shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/10"
          />
        </div>
        <div className="flex flex-col gap-7">
          <Eyebrow>Book details</Eyebrow>
          <H weight={900} className="text-4xl leading-tight tracking-tight sm:text-5xl">
            Small book. <span className="text-[#5EC8F5]">Big shift.</span>
          </H>
          <div className="grid grid-cols-2 gap-3">
            {specs.map(([k, v]) => (
              <div key={k} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <div className={`${mono.className} text-[10px] tracking-[0.2em] text-white/40 uppercase`}>{k}</div>
                <div className="mt-1 text-[15px] text-white" style={{ fontWeight: 600 }}>
                  {v}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-start gap-4">
            <Price />
            <BuyButton placement="details" size="md" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Final CTA ─── */
function FinalCta() {
  return (
    <section className="cc-grid relative overflow-hidden border-t border-white/10">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1E6E96]/30 blur-[130px]" />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-8 px-4 py-24 text-center sm:py-32">
        <H weight={900} className="text-4xl leading-[1.05] tracking-tight sm:text-7xl">
          Read it. <span className="text-[#5EC8F5]">Apply the cheatcodes.</span>
          <span className="block">Take control of your career.</span>
        </H>
        <Price large />
        <BuyButton placement="final" />
        <div className="text-xs text-white/40">Opens Amazon.in in a new tab</div>
      </div>
    </section>
  )
}

/* ─── Sticky buy bar ─── */
function StickyBuyBar() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    // Extra right padding on phones keeps the bar clear of the floating WhatsApp button.
    <div
      className={`fixed bottom-4 left-0 right-0 z-[100] pl-4 pr-16 transition-all duration-300 sm:px-4 md:bottom-8 ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-8 opacity-0'}`}
    >
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 rounded-full border border-white/10 bg-[#0F172A]/95 p-2 pl-3 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] backdrop-blur md:p-3 md:pl-4">
        <div className="flex min-w-0 items-center gap-3">
          <Image src="/book/cover-front.webp" alt="" width={36} height={56} className="h-11 w-auto rounded-sm ring-1 ring-white/20" />
          <div className="min-w-0 leading-tight">
            <div className="truncate text-sm text-white md:text-base" style={{ fontWeight: 700 }}>
              {BOOK.title}
            </div>
            <div className="text-xs text-white/55">
              ₹{BOOK.price} <span className="line-through opacity-60">₹{BOOK.mrp}</span>
            </div>
          </div>
        </div>
        <BuyButton placement="sticky" size="sm" className="flex-shrink-0" />
      </div>
    </div>
  )
}

export default function CheatcodeClient() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Header />
      <Hero />
      <Marquee />
      <Stats />
      <Cheatcodes />
      <NeverTold />
      <Quote />
      <Author />
      <Details />
      <FinalCta />
      <StickyBuyBar />
    </>
  )
}
