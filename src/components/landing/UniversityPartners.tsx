"use client"

import Image from "next/image"

interface Partner {
  name: string
  logo: string
  description: string
  programs: number
  established: string
}

const partners: Partner[] = [
  {
    name: "Lean Multiverse University",
    logo: "/logo.svg",
    description: "Leading institution in enterprise agility and digital transformation education",
    programs: 12,
    established: "2015"
  },
  {
    name: "Global Business School",
    logo: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop",
    description: "Premier business education with focus on modern management practices",
    programs: 8,
    established: "2010"
  },
  {
    name: "Digital Innovation Institute",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=2126&auto=format&fit=crop",
    description: "Specialized in digital transformation and agile methodologies",
    programs: 6,
    established: "2018"
  },
  {
    name: "Enterprise Leadership College",
    logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop",
    description: "Executive education for organizational transformation leaders",
    programs: 10,
    established: "2012"
  },
  {
    name: "Agile Management University",
    logo: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
    description: "World-class programs in agile methodologies and lean practices",
    programs: 15,
    established: "2008"
  },
  {
    name: "Strategic Transformation Institute",
    logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
    description: "Advanced education in strategic change and digital innovation",
    programs: 7,
    established: "2016"
  }
]

const stats = [
  { number: "50,000+", label: "Successful Graduates" },
  { number: "95%", label: "Career Advancement Rate" },
  { number: "25+", label: "Countries Represented" },
  { number: "98%", label: "Student Satisfaction" }
]

export default function UniversityPartners() {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[6px] text-yellow-400 lg:text-[20px] text-[16px] font-medium mb-3">
            Trusted Partners
          </p>
          <h2 className="text-[30px] md:text-[46.13px] font-bold mb-6 text-white">
            Our University Partners
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            We partner with leading educational institutions worldwide to deliver 
            world-class enterprise agility education and certification programs.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {partner.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Est. {partner.established}
                  </p>
                </div>
              </div>

              <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                {partner.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="text-yellow-400 font-semibold">
                  {partner.programs} Programs
                </div>
                <button className="text-white text-sm hover:text-yellow-400 transition-colors">
                  View Programs →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Accreditation & Recognition */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Accredited & Recognized
          </h3>
          <p className="text-gray-300 mb-6 max-w-3xl mx-auto">
            Our programs are accredited by leading educational bodies and recognized 
            by industry leaders worldwide. All certifications are globally accepted 
            and valued by employers across various industries.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center text-gray-300">
              <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              ISO 9001:2015 Certified
            </div>
            <div className="flex items-center text-gray-300">
              <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Industry Recognized
            </div>
            <div className="flex items-center text-gray-300">
              <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Global Acceptance
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
