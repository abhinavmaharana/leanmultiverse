import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import "./globals.css"

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "LeanMultiverse - Next.js + TypeScript + Tailwind CSS + shadcn/ui",
  description: "A modern Next.js project built with TypeScript, Tailwind CSS, and shadcn/ui components. Ready for production with best practices and beautiful design.",
  keywords: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "React", "Full Stack"],
  authors: [{ name: "LeanMultiverse Team" }],
  creator: "LeanMultiverse",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://leanmultiverse.com",
    title: "LeanMultiverse - Modern Web Development",
    description: "A modern Next.js project built with TypeScript, Tailwind CSS, and shadcn/ui components.",
    siteName: "LeanMultiverse",
  },
  twitter: {
    card: "summary_large_image",
    title: "LeanMultiverse - Modern Web Development",
    description: "A modern Next.js project built with TypeScript, Tailwind CSS, and shadcn/ui components.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geist.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
