import { Metadata } from "next";
import dynamic from "next/dynamic";
import LazySection from "@/components/shared/LazySection";
import { AiMlAnnouncementBanner } from "@/components/ai-ml-ui/AiMlAnnouncementBanner";
import NewNavbar from "@/components/new-ui/NewNavbar";
import { NewFooter } from "@/components/new-ui/NewFooter";
import { Hero } from "@/components/ai-ml-ui/sections/Hero";

const NewVideoSection = dynamic(
  () =>
    import("@/components/new-ui/NewVideoSection").then((m) => ({
      default: m.NewVideoSection,
    })),
  { loading: () => <div className="h-64 bg-gray-50 animate-pulse" /> },
);

import { Problem } from "@/components/ai-ml-ui/sections/Problem";
import { MentorsGrid } from "@/components/ai-ml-ui/sections/MentorsGrid";
import { CareerRoles } from "@/components/ai-ml-ui/sections/CareerRoles";
import { ModernCertificationRoadmap } from "@/components/ai-ml-ui/sections/ModernCertificationRoadmap";
import { AIWorkflowSection } from "@/components/ai-ml-ui/sections/AIWorkflowSection";
import { FAQ } from "@/components/ai-ml-ui/sections/FAQ";
import AiMlStickyBookBar from "@/components/ai-ml-ui/sections/AiMlStickyBookBar";

export const metadata: Metadata = {
  title: "AI & Machine Learning Course | Learn from Industry Experts",
  description:
    "Master AI and Machine Learning from real industry experts. Training designed to prepare you for globally recognized certifications such as Microsoft Azure AI and AWS Machine Learning.",
  keywords: [
    "AI course",
    "machine learning course",
    "artificial intelligence training",
    "Microsoft Azure AI certification",
    "AWS machine learning certification",
    "AI engineer",
    "data scientist",
    "ML engineer",
    "AI career",
    "deep learning",
  ],
  openGraph: {
    title: "AI & Machine Learning Course | Learn from Industry Experts",
    description:
      "Master AI and Machine Learning from 0 to 100%. Training designed for globally recognized certifications like Microsoft Azure AI and AWS ML.",
    type: "website",
    url: "https://leanmultiverse.com/ai-ml",
  },
};

export default function AIMLPage() {
  return (
    <main className="relative w-full min-h-screen bg-white text-gray-900 flex flex-col">
      <div className="flex flex-col">
        <AiMlAnnouncementBanner />
        <NewNavbar />
      </div>

      <Hero />

      {/* <LazySection id="video" fallback={<div className="h-64 bg-gray-50 animate-pulse" />}>
        <NewVideoSection />
      </LazySection> */}

      <Problem />
      <MentorsGrid />

      <ModernCertificationRoadmap />
      <AIWorkflowSection />
      <CareerRoles />
      <FAQ />

      <div className="mt-auto">
        <NewFooter />
      </div>

      <AiMlStickyBookBar />
    </main>
  );
}
