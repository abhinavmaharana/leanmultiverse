import type { Metadata } from "next"
import { Raleway } from "next/font/google"
import Script from "next/script"
import DeferredLenisWrapper from "@/components/providers/DeferredLenisWrapper"
import ConditionalCustomCursor from "@/components/ConditionalCustomCursor"
import DeferredPerfectChatbot from "@/components/DeferredPerfectChatbot"
import ErrorBoundary from "@/components/ErrorBoundary"
import CookieConsent from "@/components/CookieConsent"
import AttributionCapture from "@/components/AttributionCapture"
import ClarityProvider from "@/components/providers/ClarityProvider"
import MixpanelProvider from "@/components/providers/MixpanelProvider"
import "antd/dist/reset.css";
import "./globals.css"

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
      { url: "/logofavicon.PNG", type: "image/png" },
    ],
    apple: [
      { url: "/logofavicon.PNG", type: "image/png" },
    ],
    shortcut: "/logofavicon.PNG",
  },
  ...(process.env.GOOGLE_VERIFICATION
    ? {
      verification: {
        google: process.env.GOOGLE_VERIFICATION,
        other: {
          "google-site-verification": process.env.GOOGLE_VERIFICATION,
        },
      },
    }
    : {}),
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
      "telephone": "+91-7696627657",
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

        {/* Preload LCP hero image for landing */}
        <link rel="preload" href="/nitesh-prasad-3.png" as="image" />

        {/* Icons */}
        <link rel="icon" href="/logofavicon.PNG" type="image/png" />
        <link rel="apple-touch-icon" href="/logofavicon.PNG" />
        <link rel="shortcut icon" href="/logofavicon.PNG" type="image/png" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Meta Pixel base code (PageView fires on every page) */}
        <>
          <script
            dangerouslySetInnerHTML={{
              __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID || '1699542657689711'}');
fbq('track', 'PageView');
`,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID || '1699542657689711'}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      </head>
      <body className={`${raleway.variable} font-sans antialiased bg-white`} suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        {process.env.NEXT_PUBLIC_GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        ) : null}

        {/* Google Tag Manager (GTM) Container */}
        {process.env.NEXT_PUBLIC_GTM_ID ? (
          <Script
            id="gtm-init"
            strategy="afterInteractive"
            {...({ fetchpriority: "low" } as any)}
            dangerouslySetInnerHTML={{
              __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
              `,
            }}
          />
        ) : null}

        {/* Google Analytics 4 (gtag.js) */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? (
          <>
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              {...({ fetchpriority: "low" } as any)}
              dangerouslySetInnerHTML={{
                __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
`,
              }}
            />
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
              {...({ fetchpriority: "low" } as any)}
            />
          </>
        ) : null}

        {/* Google Ads Conversion Tracking (gtag.js) */}
        {process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ? (
          <>
            <Script
              id="google-ads-init"
              strategy="afterInteractive"
              {...({ fetchpriority: "low" } as any)}
              dangerouslySetInnerHTML={{
                __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}');
`,
              }}
            />
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}`}
              strategy="afterInteractive"
              {...({ fetchpriority: "low" } as any)}
            />
          </>
        ) : null}

        <ClarityProvider />
        <MixpanelProvider />
        <AttributionCapture />
        <ErrorBoundary>
          {/* LoadingProvider disabled; re-enable when full-page loading screen is desired */}
          {/* <LoadingProvider> */}
          {/* <DeferredLenisWrapper> */}
          {children}
          {/* <ConditionalCustomCursor /> */}
          {/* Lazy load chatbot - only loads when user scrolls or interacts */}
          <DeferredPerfectChatbot />
          {/* </DeferredLenisWrapper> */}
          {/* </LoadingProvider> */}
        </ErrorBoundary>
        <CookieConsent />
      </body>
    </html>
  )
}
