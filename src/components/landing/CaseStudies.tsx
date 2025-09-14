"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const caseStudies = [
  {
    id: 1,
    company: "Netflix",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/77/Netflix_2015_logo.svg",
    industry: "Entertainment & Streaming",
    challenge: "Scaling content delivery to 200+ million global subscribers while maintaining quality and reducing costs",
    solution: "Implemented Lean Enterprise principles and Agile methodologies across content production and delivery pipelines",
    results: [
      "40% reduction in content production costs",
      "60% faster time-to-market for new content",
      "99.9% uptime during peak streaming hours",
      "50% improvement in team productivity"
    ],
    duration: "18 months",
    teamSize: "500+ employees",
    image: "https://images.unsplash.com/photo-1574375927938-c5a4422a05f6?w=800&h=600&fit=crop&crop=center"
  },
  {
    id: 2,
    company: "NASA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg",
    industry: "Aerospace & Space Exploration",
    challenge: "Optimizing mission planning and resource allocation for multiple space exploration programs",
    solution: "Applied Lean methodologies to streamline mission planning processes and improve cross-team collaboration",
    results: [
      "35% reduction in mission planning time",
      "25% cost savings on mission operations",
      "90% improvement in inter-departmental communication",
      "100% on-time delivery of critical missions"
    ],
    duration: "24 months",
    teamSize: "1,200+ employees",
    image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop&crop=center"
  },
  {
    id: 3,
    company: "Porsche",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/50/Porsche_logo.svg",
    industry: "Automotive & Manufacturing",
    challenge: "Transforming manufacturing processes to support electric vehicle production while maintaining luxury standards",
    solution: "Implemented Lean Manufacturing principles and digital transformation across production facilities",
    results: [
      "45% reduction in production waste",
      "30% faster assembly line efficiency",
      "95% quality improvement in final products",
      "20% reduction in energy consumption"
    ],
    duration: "30 months",
    teamSize: "800+ employees",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop&crop=center"
  }
]

export default function CaseStudies() {
  const [selectedCase, setSelectedCase] = useState<number | null>(null)

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[6px] text-yellow-400 lg:text-[20px] text-[16px] font-medium mb-3">
            Success Stories
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Real-World Impact
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            See how leading organizations transformed their operations using our Lean Enterprise methodologies
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-16">
          {caseStudies.map((study) => (
            <Card
              key={study.id}
              className="bg-gray-900/50 border-gray-800 hover:border-yellow-400/50 transition-all duration-300 group cursor-pointer"
              onClick={() => setSelectedCase(selectedCase === study.id ? null : study.id)}
            >
              <div className="p-6">
                {/* Company Logo */}
                <div className="flex items-center justify-between mb-4">
                  <Image
                    src={study.logo}
                    alt={`${study.company} logo`}
                    width={32}
                    height={32}
                    className="h-8 w-auto filter brightness-0 invert"
                  />
                  <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                    {study.industry}
                  </span>
                </div>

                {/* Company Name */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                  {study.company}
                </h3>

                {/* Challenge Preview */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {study.challenge}
                </p>

                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="text-sm font-semibold text-white">{study.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Team Size</p>
                    <p className="text-sm font-semibold text-white">{study.teamSize}</p>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  variant="outline"
                  className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                >
                  {selectedCase === study.id ? "Hide Details" : "View Case Study"}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Detailed Case Study Modal */}
        {selectedCase && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="bg-gray-900 border-gray-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                {(() => {
                  const study = caseStudies.find(s => s.id === selectedCase)
                  if (!study) return null

                  return (
                    <>
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <Image
                            src={study.logo}
                            alt={`${study.company} logo`}
                            width={48}
                            height={48}
                            className="h-12 w-auto filter brightness-0 invert"
                          />
                          <div>
                            <h2 className="text-3xl font-bold text-white">{study.company}</h2>
                            <p className="text-gray-400">{study.industry}</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => setSelectedCase(null)}
                          className="border-gray-600 text-gray-400 hover:bg-gray-800"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </Button>
                      </div>

                      {/* Image */}
                      <div className="mb-8">
                        <Image
                          src={study.image}
                          alt={`${study.company} case study`}
                          width={800}
                          height={256}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      </div>

                      {/* Content Grid */}
                      <div className="grid lg:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-3">The Challenge</h3>
                            <p className="text-gray-300 leading-relaxed">{study.challenge}</p>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold text-white mb-3">Our Solution</h3>
                            <p className="text-gray-300 leading-relaxed">{study.solution}</p>
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-3">Key Results</h3>
                            <ul className="space-y-2">
                              {study.results.map((result, index) => (
                                <li key={index} className="flex items-start space-x-3">
                                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-300">{result}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-800 p-4 rounded-lg">
                              <p className="text-sm text-gray-400">Duration</p>
                              <p className="text-lg font-semibold text-white">{study.duration}</p>
                            </div>
                            <div className="bg-gray-800 p-4 rounded-lg">
                              <p className="text-sm text-gray-400">Team Size</p>
                              <p className="text-lg font-semibold text-white">{study.teamSize}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })()}
              </div>
            </Card>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Transform Your Organization?
          </h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join industry leaders who have revolutionized their operations with our proven methodologies
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500 px-8 py-3">
              Start Your Transformation
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-3">
              Download Case Studies
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
