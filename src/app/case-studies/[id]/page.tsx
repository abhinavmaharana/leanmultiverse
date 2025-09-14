// src/app/case-studies/[id]/page.tsx

import { notFound } from "next/navigation"
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

// ✅ Server Component
export default async function CaseStudyPage({ params }: PageProps) {
  const { id } = await params
  const study = caseStudies.find(s => s.id === id)

  if (!study) {
    return notFound()
  }

  return <CaseStudyClient study={study} />
}
