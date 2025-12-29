import type { Metadata } from "next"
import { Raleway } from "next/font/google"
import dynamic from "next/dynamic"
import CustomCursor from "@/components/ui/CustomCursor"
import LenisProvider from "@/components/providers/LenisProvider"
// import LoadingProvider from "@/components/providers/LoadingProvider"
import ErrorBoundary from "@/components/ErrorBoundary"
import "./globals.css"

// Lazy load non-critical components - removed ssr: false for Server Components compatibility
const Analytics = dynamic(() => import("@vercel/analytics/react").then(mod => ({ default: mod.Analytics })))

const SpeedInsights = dynamic(() => import("@vercel/speed-insights/next").then(mod => ({ default: mod.SpeedInsights })))

const PerfectChatbot = dynamic(() => import("@/components/ui/PerfectChatbot"), {
  loading: () => null,
})

// Load Raleway font with optimization - reduced weights for better performance
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Reduced from 5 to 4 weights
  variable: "--font-raleway",
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial'],
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
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/logo.svg", type: "image/svg+xml", sizes: "any" },
    ],
    apple: [
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    shortcut: "/logo.svg",
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
      "telephone": "+91-8062177938",
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
        {/* Resource Hints for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://upload.wikimedia.org" />
        <link rel="dns-prefetch" href="https://drive.google.com" />
        <link rel="dns-prefetch" href="https://lh3.googleusercontent.com" />
        
        {/* Icons */}
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        <link rel="shortcut icon" href="/logo.svg" type="image/svg+xml" />
        
        {/* Structured Data */}
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
              {/* Lazy load chatbot - only loads when user scrolls or interacts */}
              <PerfectChatbot />
            </LenisProvider>
          {/* </LoadingProvider> */}
        </ErrorBoundary>
        {/* Defer analytics loading until after page is interactive */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
