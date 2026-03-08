import { Metadata } from 'next'
import { Orbitron } from 'next/font/google'
import { Hero } from '@/components/ai-ml-ui/sections/Hero'
import { Problem } from '@/components/ai-ml-ui/sections/Problem'
import { Mentors } from '@/components/ai-ml-ui/sections/Mentors'
import { CareerRoles } from '@/components/ai-ml-ui/sections/CareerRoles'
import { Certifications } from '@/components/ai-ml-ui/sections/Certifications'
import { FAQ } from '@/components/ai-ml-ui/sections/FAQ'
import { Footer } from '@/components/ai-ml-ui/sections/Footer'
import AiMlStickyBookBar from '@/components/ai-ml-ui/sections/AiMlStickyBookBar'

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-orbitron',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AI & Machine Learning Course | Learn from Industry Experts',
  description:
    'Master AI and Machine Learning from real industry experts. Training designed to prepare you for globally recognized certifications such as Microsoft Azure AI and AWS Machine Learning.',
  keywords: [
    'AI course',
    'machine learning course',
    'artificial intelligence training',
    'Microsoft Azure AI certification',
    'AWS machine learning certification',
    'AI engineer',
    'data scientist',
    'ML engineer',
    'AI career',
    'deep learning',
  ],
  openGraph: {
    title: 'AI & Machine Learning Course | Learn from Industry Experts',
    description:
      'Master AI and Machine Learning from 0 to 100%. Training designed for globally recognized certifications like Microsoft Azure AI and AWS ML.',
    type: 'website',
    url: 'https://leanmultiverse.com/ai-ml',
  },
}

export default function AIMLPage() {
  return (
    <main className={`${orbitron.variable} relative w-full min-h-screen flex flex-col`}>
      <style>{`
        .text-primary-blue { color: #0047FF; }
        .bg-primary-blue { background-color: #0047FF; }
        .border-primary-blue { border-color: #0047FF; }
        .text-primary-dark { color: #0A0A1A; }
        .font-orbitron { font-family: var(--font-orbitron), ui-sans-serif, system-ui, sans-serif; }
      `}</style>
      <Hero />
      <Problem />
      <Mentors />
      <CareerRoles />
      <Certifications />
      <FAQ />
      <Footer />
      <AiMlStickyBookBar />
    </main>
  )
}
