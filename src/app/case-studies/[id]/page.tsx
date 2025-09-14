// src/app/case-studies/[id]/page.tsx

import { notFound } from "next/navigation"
import { Metadata } from "next"
import { caseStudies } from "@/data/caseStudies"
import CaseStudyClient from "./CaseStudyClient"

interface PageProps {
  params: Promise<{ id: string }>
}

// ✅ Server-only function
export async function generateStaticParams() {
  return caseStudies.map(study => ({
    id: study.id
  }))
}

// ✅ Generate metadata for each case study
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const study = caseStudies.find(s => s.id === id)

  if (!study) {
    return {
      title: "Case Study Not Found",
      description: "The requested case study could not be found."
    }
  }

  return {
    title: `${study.company} - Case Study | LeanMultiverse`,
    description: study.challenge,
    keywords: [
      "case study",
      "enterprise agility",
      "digital transformation",
      study.company.toLowerCase(),
      study.industry.toLowerCase(),
      "business transformation",
      "lean methodology"
    ],
    openGraph: {
      title: `${study.company} - Case Study`,
      description: study.challenge,
      type: "article",
      url: `https://leanmultiverse.com/case-studies/${study.id}`,
      images: [
        {
          url: study.image,
          width: 1200,
          height: 630,
          alt: `${study.company} Case Study`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.company} - Case Study`,
      description: study.challenge,
      images: [study.image],
    },
  }
}

// ✅ Server Component
export default async function CaseStudyPage({ params }: PageProps) {
  const { id } = await params
  const study = caseStudies.find(s => s.id === id)

  if (!study) {
    return notFound()
  }

  return <CaseStudyClient study={study} />
}
