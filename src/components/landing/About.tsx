'use client'

import { useState } from "react"

export default function About() {
  const [activeTab, setActiveTab] = useState(0)

  const stats = [
    { number: "50,000+", label: "Professionals Trained", icon: "👥" },
    { number: "50+", label: "Countries Served", icon: "🌍" },
    { number: "40%", label: "Productivity Increase", icon: "📈" },
    { number: "85%", label: "Career Promotions", icon: "🚀" }
  ]

  const tabs = [
    {
      id: 0,
      title: "Our Mission",
      content: {
        title: "Empowering Boundless Creation",
        subtitle: "Catalysts for Your Success",
        description: "We transform ambitious teams and professionals into industry leaders through innovative, impactful learning experiences that drive real-world results.",
        features: [
          "Transform careers with cutting-edge methodologies",
          "Bridge the gap between theory and practice",
          "Foster innovation and continuous improvement",
          "Build lasting professional networks"
        ]
      }
    },
    {
      id: 1,
      title: "Why Choose Us",
      content: {
        title: "Globally Recognized Excellence",
        subtitle: "Your Success is Our Mission",
        description: "Join thousands of professionals who've accelerated their success with our proven approach to enterprise agility and digital transformation.",
        features: [
          "Globally Accredited by PMI, Scrum Alliance, Kanban University",
          "40% higher productivity in 90 days across 50+ countries",
          "Real-world skills that you can apply immediately",
          "Personalized programs with expert coaching and ongoing support"
        ]
      }
    },
    {
      id: 2,
      title: "What We Deliver",
      content: {
        title: "Comprehensive Learning Solutions",
        subtitle: "Training That Transforms",
        description: "From individual career advancement to organizational transformation, we provide the expertise, credentials, and commitment to get you there.",
        features: [
          "Top Certification Programs: PMP, Scrum, Leadership, Agile, Lean, Kanban",
          "Strategic Training: Enterprise, C-suite, team acceleration, tech upskilling",
          "Measurable Impact: 85% get promotions, 30% salary boost, stronger networks",
          "Custom Solutions: Tailored programs for your specific needs"
        ]
      }
    }
  ]

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <div className="text-center py-20 mb-16">
          <div className="inline-block mb-8">
            <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 backdrop-blur-xl border border-yellow-400/30 rounded-full px-8 py-4">
              <p className="uppercase tracking-[6px] text-yellow-400 lg:text-[20px] text-[16px] font-medium">
                About Lean Multiverse
              </p>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-tight">
            Empowering Boundless
            <br />
            <span className="text-yellow-400">Creation</span>
          </h1>
          
          <p className="text-gray-300 text-xl max-w-4xl mx-auto leading-relaxed">
            Catalysts for Your Success - Transforming ambitious teams and professionals 
            into industry leaders with innovative, impactful learning.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                {stat.number}
              </div>
              <p className="text-gray-300 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Interactive Tabs Section */}
        <div className="mb-20">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/25"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>

          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 group-hover:border-yellow-400/40 group-hover:bg-white/8 transition-all duration-300">
            <div key={activeTab}>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {tabs[activeTab].content.title}
              </h3>
              
              <p className="text-yellow-400 text-lg font-semibold mb-6">
                {tabs[activeTab].content.subtitle}
              </p>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {tabs[activeTab].content.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tabs[activeTab].content.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-300">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 backdrop-blur-xl border border-yellow-400/30 rounded-3xl p-12 max-w-4xl mx-auto group-hover:border-yellow-400/60 group-hover:bg-yellow-400/5 transition-all duration-300">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Career?
            </h3>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Join thousands of professionals who&apos;ve already accelerated their success with Lean Multiverse. 
              Whether you&apos;re an individual looking to advance your career or an organization seeking competitive advantage, 
              we have the expertise, credentials, and commitment to get you there.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-full hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                Explore Our Courses
              </button>
              <button className="px-8 py-4 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
 