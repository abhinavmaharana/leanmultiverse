import type { Metadata } from "next"
import { Raleway } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import PerfectChatbot from "@/components/ui/PerfectChatbot"
import CustomCursor from "@/components/ui/CustomCursor"
import LenisProvider from "@/components/providers/LenisProvider"
// import LoadingProvider from "@/components/providers/LoadingProvider"
import ErrorBoundary from "@/components/ErrorBoundary"
import "./globals.css"

// Load Raleway font
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // include multiple weights
  variable: "--font-raleway",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://leanmultiverse.com'),
  title: {
    default: "LeanMultiverse - Enterprise Agility & Digital Transformation",
    template: "%s | LeanMultiverse"
  },
  description:
    "Master enterprise agility and digital transformation with our comprehensive courses. Join 50,000+ professionals who transformed their careers with Lean Multiverse University.",
  keywords: [
    "enterprise agility",
    "digital transformation",
    "lean six sigma",
    "agile project management",
    "leadership development",
    "MBA programs",
    "professional certification",
    "business transformation",
    "lean methodology",
    "scrum master",
    "kanban",
    "SAFe",
    "organizational change",
    "strategic management",
    "data-driven decisions"
  ],
  authors: [{ name: "LeanMultiverse Team" }],
  creator: "LeanMultiverse",
  publisher: "LeanMultiverse University",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Education',
  classification: 'Educational Technology',
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://leanmultiverse.com",
    title: "LeanMultiverse - Enterprise Agility & Digital Transformation",
    description:
      "Master enterprise agility and digital transformation with our comprehensive courses. Join 50,000+ professionals who transformed their careers.",
    siteName: "LeanMultiverse",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LeanMultiverse - Enterprise Agility & Digital Transformation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LeanMultiverse - Enterprise Agility & Digital Transformation",
    description:
      "Master enterprise agility and digital transformation with our comprehensive courses. Join 50,000+ professionals who transformed their careers.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://leanmultiverse.com",
  },
  verification: {
    google: "your-google-verification-code-here",
    other: {
      "google-site-verification": "your-google-verification-code-here",
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "LeanMultiverse University",
    "description": "Master enterprise agility and digital transformation with our comprehensive courses. Join 50,000+ professionals who transformed their careers.",
    "url": "https://leanmultiverse.com",
    "logo": "https://leanmultiverse.com/logo.svg",
    "sameAs": [
      "https://linkedin.com/company/leanmultiverse",
      "https://twitter.com/leanmultiverse"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-240-719-6120",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "offers": {
      "@type": "AggregateOffer",
      "offerCount": "25+",
      "lowPrice": "0",
      "highPrice": "15999",
      "priceCurrency": "USD"
    }
  }

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${raleway.variable} font-sans antialiased bg-black`}>
        <ErrorBoundary>
          {/* <LoadingProvider> */}
            <LenisProvider>
              {children}
              <CustomCursor />
              <PerfectChatbot />
              <Analytics />
              <SpeedInsights />
            </LenisProvider>
          {/* </LoadingProvider> */}
        </ErrorBoundary>
      </body>
    </html>
  )
}
