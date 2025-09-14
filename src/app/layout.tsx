import type { Metadata } from "next"
import { Raleway } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import ChatWidget from "@/components/ui/ChatWidget"
import CustomCursor from "@/components/ui/CustomCursor"
import LenisProvider from "@/components/providers/LenisProvider"
import LoadingProvider from "@/components/providers/LoadingProvider"
import "./globals.css"

// Load Raleway font
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // include multiple weights
  variable: "--font-raleway",
  display: "swap",
})

export const metadata: Metadata = {
  title: "LeanMultiverse - Next.js + TypeScript + Tailwind v4 + shadcn/ui",
  description:
    "A modern Next.js project built with TypeScript, Tailwind CSS v4, and shadcn/ui components. Ready for production with best practices and beautiful design.",
  keywords: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS v4",
    "shadcn/ui",
    "React",
    "Full Stack",
  ],
  authors: [{ name: "LeanMultiverse Team" }],
  creator: "LeanMultiverse",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://leanmultiverse.com",
    title: "LeanMultiverse - Modern Web Development",
    description:
      "A modern Next.js project built with TypeScript, Tailwind CSS v4, and shadcn/ui components.",
    siteName: "LeanMultiverse",
  },
  twitter: {
    card: "summary_large_image",
    title: "LeanMultiverse - Modern Web Development",
    description:
      "A modern Next.js project built with TypeScript, Tailwind CSS v4, and shadcn/ui components.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${raleway.variable} font-sans antialiased`}>
        <LoadingProvider>
          <LenisProvider>
            {children}
            <CustomCursor />
            <ChatWidget />
            <Analytics />
            <SpeedInsights />
          </LenisProvider>
        </LoadingProvider>
      </body>
    </html>
  )
}
