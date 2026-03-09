'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, ExternalLink } from 'lucide-react';

const mentors = [
  {
    id: "PALLAVI",
    name: "Pallavi",
    role: "Machine Learning Engineer",
    company: "Ex Deloitte",
    location: "Melbourne, Australia",
    desc: "Experience includes building enterprise AI systems and applying machine learning to real business problems.",
    image: "/mentors/pallavi.jpg",
    color: "amber",
    linkedin: "https://www.linkedin.com/in/pallavi-bhimte/",
    points: [
      "Machine Learning Systems",
      "Enterprise AI Solutions",
    ]
  },
  {
    id: "JIGAR",
    name: "Jigar",
    role: "Lead Engineer",
    company: "",
    location: "Melbourne, Australia",
    desc: "Lead Engineer with experience in building scalable software systems and applying AI/ML technologies to solve real-world business problems.\n\nExperience includes developing intelligent systems, integrating machine learning into production environments, and leading engineering teams on data-driven solutions.",
    image: "/mentors/jigar.png",
    color: "blue",
    linkedin: "https://www.linkedin.com/in/parekh-jigar/",
    points: [
      "AI & Machine Learning Systems",
      "Intelligent Software Solutions",
      "Scalable Data-Driven Platforms",
      "Applied Predictive Models"
    ]
  },
  {
    id: "ABHINAV",
    name: "Abhinav",
    role: "AI/ML Engineer",
    company: "Razorpay",
    location: "Bangalore, India",
    desc: "Razorpay | Google Agentic AI Hackathon Winner\n\nExperience includes building AI-driven systems, developing machine learning solutions, and applying intelligent automation to solve real-world business problems.",
    image: "/mentors/abhinav.png",
    color: "gray",
    linkedin: "https://www.linkedin.com/in/abhinavmaharana/",
    points: [
      "Machine Learning Systems",
      "Agentic AI Applications",
      "Intelligent Automation Solutions",
      "AI-Powered Data Models"
    ]
  }
];

export const MentorsGrid = () => {
  // Duplicate mentors to create seamless loop
  const duplicatedMentors = [...mentors, ...mentors, ...mentors, ...mentors];

  return (
    <section className="bg-white py-12 md:py-24 px-4 md:px-12 relative overflow-hidden">
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-300px * 3 - 2rem * 3)); }
        }
        @media (min-width: 768px) {
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-400px * 3 - 2rem * 3)); }
          }
        }
        .marquee-content {
          display: flex;
          gap: 2rem;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .marquee-content:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-amber-500 font-black text-xs tracking-[0.3em] uppercase mb-4 block">Our Elite Faculty</span>
            <h2 className="text-gray-900 font-black text-4xl md:text-6xl tracking-tight uppercase leading-[0.9]">
              Learn From <br />
              <span className="text-gray-400">The Masters.</span>
            </h2>
          </div>
          <p className="text-gray-500 max-w-sm font-medium text-sm md:text-base leading-relaxed">
            Direct access to practitioners from the world's leading technology teams. No theoretical fluff, just production experience.
          </p>
        </div>
      </div>

      {/* Auto-scrolling Carousel */}
      <div className="relative w-full overflow-hidden py-4">
        <div className="marquee-content">
          {duplicatedMentors.map((m, i) => (
            <div
              key={`${m.id}-${i}`}
              className="relative group cursor-default w-[300px] md:w-[400px] flex-shrink-0"
            >
              {/* Image Container with Custom Shape */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-8 bg-gray-100 shadow-xl transition-transform duration-500 md:group-hover:scale-[1.02]">
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-full h-full object-cover transition-all duration-700 md:group-hover:scale-110 grayscale-[0.2] md:group-hover:grayscale-0"
                />

                {/* Overlay - visible on hover for desktop, always visible details for mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 opacity-70 md:hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 hidden md:block" />

                <div className="absolute bottom-6 left-6 right-6 md:translate-y-10 md:group-hover:translate-y-0 transition-transform duration-500 md:opacity-0 md:group-hover:opacity-100 opacity-100 translate-y-0">
                  <p className="text-white text-[10px] md:text-xs leading-relaxed mb-4 font-medium line-clamp-4 md:line-clamp-none">
                    {m.desc}
                  </p>
                  {m.points && (
                    <ul className="mb-4 md:mb-6 space-y-1 md:space-y-1.5 hidden sm:block">
                      {m.points.map((p, idx) => (
                        <li key={idx} className="text-white/90 font-bold text-[8px] md:text-[10px] tracking-widest uppercase flex items-center gap-2">
                          <span className="w-1 md:w-1.5 h-1 md:h-1.5 bg-amber-500 flex-shrink-0" />
                          <span className="truncate">{p}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex items-center gap-3 md:gap-4">
                    <a 
                      href={m.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition-all border border-white/20"
                    >
                      <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
                    </a>
                    <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all border border-white/20">
                      <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Info Area */}
              <div className="px-4">
                <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1 block">
                  {m.company ? `${m.company}${m.location ? ` · ${m.location}` : ''}` : m.location}
                </span>
                <h3 className="text-gray-900 font-black text-xl md:text-2xl uppercase tracking-tight mb-1">
                  {m.name}
                </h3>
                <p className="text-gray-400 font-bold text-xs md:text-sm uppercase tracking-tight">
                  {m.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
