'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Building2 } from 'lucide-react';

function CompanyBadge({ company, logo, size = 'md' }: { company: string; logo?: string; size?: 'sm' | 'md' }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const isSmall = size === 'sm';
  return (
    <div className={`absolute ${isSmall ? 'top-3 left-3' : 'top-4 left-4'} z-20 bg-white rounded-xl shadow-lg ${isSmall ? 'px-2 py-1.5' : 'px-3 py-2'
      } flex items-center gap-2 max-w-[160px]`}>
      {logo && !logoFailed && (
        <img
          src={logo}
          alt={company}
          className={`${isSmall ? 'w-5 h-5' : 'w-6 h-6'} object-contain flex-shrink-0 rounded-sm`}
          onError={() => setLogoFailed(true)}
        />
      )}
      <span className={`text-gray-900 font-black ${isSmall ? 'text-[9px]' : 'text-[10px]'} uppercase tracking-wider leading-tight truncate`}>
        {company}
      </span>
    </div>
  );
}

const placements = [
  {
    id: "TITHI",
    name: "Tithi Kundu",
    role: "Associate Product Manager",
    company: "InMobi",
    logo: "https://logo.clearbit.com/inmobi.com",
    location: "Bangalore, India",
    image: "/placements/tithi.jpg",
    linkedin: "https://www.linkedin.com/",
    achievement: "Transitioned from non-tech → APM at InMobi",
  },
  {
    id: "NAYAN",
    name: "Nayan Bhagwat",
    role: "Technical Product Coordinator",
    company: "HUBER+SUHNER",
    logo: "https://logo.clearbit.com/hubersuhner.com",
    location: "Pune, India",
    image: "/placements/nayan.png",
    linkedin: "https://www.linkedin.com/",
    achievement: "Placed after 2-year gap · HUBER+SUHNER",
  },
  {
    id: "TANUSHREE",
    name: "Tanushree",
    role: "Consultant",
    company: "KPMG",
    logo: "https://logo.clearbit.com/kpmg.com",
    location: "India",
    image: "/placements/tanushree.png",
    linkedin: "https://www.linkedin.com/",
    achievement: "Placed at KPMG as Consultant",
  },
  {
    id: "PRABHKIRAT",
    name: "Prabhkirat",
    role: "Lead Consultant",
    company: "Myntra",
    logo: "https://logo.clearbit.com/myntra.com",
    location: "Bangalore, India",
    image: "/placements/prabhkirat.png",
    linkedin: "https://www.linkedin.com/in/prabhkirat-singh-mehta/",
    achievement: "Placed within 6 weeks of graduation",
  },
  {
    id: "ABHINAV",
    name: "Abhinav Maharana",
    role: "Software Development Engineer - UI",
    company: "Flipkart",
    logo: "https://logo.clearbit.com/flipkart.com",
    location: "Bangalore, India",
    image: "/mentors/abhinav.png",
    linkedin: "https://www.linkedin.com/in/abhinavmaharana/",
    achievement: "Google AI Hackathon Winner",
  },
];

export const NewPlacementSection = () => {
  const duplicated = [...placements, ...placements, ...placements, ...placements];

  return (
    <section className="bg-white py-12 md:py-24 px-4 md:px-12 relative overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes placement-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-300px * 3 - 2rem * 3)); }
        }
        .placement-marquee-content {
          display: flex;
          gap: 2rem;
          width: max-content;
          animation: placement-marquee 30s linear infinite;
        }
        .placement-marquee-content:hover {
          animation-play-state: paused;
        }
      ` }} />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-amber-500 font-black text-xs tracking-[0.3em] uppercase mb-4 block">
              Our Alumni Impact
            </span>
            <h2 className="text-gray-900 font-black text-4xl md:text-6xl tracking-tight uppercase leading-[0.9]">
              Placed At <br />
              <span className="text-gray-400">The Best.</span>
            </h2>
          </div>
          <p className="text-gray-500 max-w-sm font-medium text-sm md:text-base leading-relaxed">
            Our alumni are leading at the world's top technology companies. Real transitions, real packages, real proof.
          </p>
        </div>

        {/* Stats bar */}
        {/* <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "500+", label: "Placements" },
            { value: "50+", label: "Top Companies" },
            { value: "95%", label: "Placement Rate" },
            { value: "6 Weeks", label: "Avg. Time to Offer" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-gray-100 rounded-2xl p-5 bg-white shadow-sm"
            >
              <p className="text-3xl font-black text-gray-900 tracking-tight">{stat.value}</p>
              <p className="text-xs font-bold text-amber-500 uppercase tracking-widest mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div> */}
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-3 gap-8 max-w-7xl mx-auto">
        {placements.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="relative group cursor-default"
          >
            {/* Image Card */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-8 bg-gray-100 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
              {/* Fallback gradient bg so the card looks premium even without a photo */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0 relative z-[1]"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <CompanyBadge company={p.company} logo={p.logo} size="md" />


              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[2]" />

              <div className="absolute bottom-8 left-8 right-8 translate-y-10 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100 z-[3]">
                <p className="text-amber-400 text-[10px] font-black uppercase tracking-widest mb-3">
                  {p.achievement}
                </p>
                {/* {p.points && (
                  <ul className="mb-6 space-y-1.5">
                    {p.points.map((pt, idx) => (
                      <li key={idx} className="text-white/90 font-bold text-[10px] tracking-widest uppercase flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-amber-500 flex-shrink-0" />
                        <span className="truncate">{pt}</span>
                      </li>
                    ))}
                  </ul>
                )} */}
                <div className="flex items-center gap-4">
                  <a
                    href={p?.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition-all border border-white/20"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all border border-white/20"
                  >
                    <Building2 className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Info Area */}
            <div className="px-4">
              {/* <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">
                {p.location}
              </span> */}
              <h3 className="text-gray-900 font-black text-2xl uppercase tracking-tight mb-1">
                {p.name}
              </h3>
              <p className="text-gray-400 font-bold text-sm uppercase tracking-tight">
                {p.role}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile Marquee */}
      <div className="relative w-full overflow-hidden py-4 md:hidden">
        <div className="placement-marquee-content">
          {duplicated.map((p, i) => (
            <div
              key={`${p.id}-${i}`}
              className="relative group cursor-default w-[300px] flex-shrink-0"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-8 bg-gray-100 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover grayscale-[0.2] relative z-[1]"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />

                <CompanyBadge company={p.company} logo={p.logo} size="sm" />

                {/* Persistent overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-70 z-[2]" />

                <div className="absolute bottom-6 left-6 right-6 z-[3]">
                  <p className="text-amber-400 text-[9px] font-black uppercase tracking-widest mb-2 line-clamp-1">
                    {p.achievement}
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href={p.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition-all border border-white/20"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href="#"
                      className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all border border-white/20"
                    >
                      <Building2 className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Info Area */}
              <div className="px-4 text-center">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">
                  {p.location}
                </span>
                <h3 className="text-gray-900 font-black text-xl uppercase tracking-tight mb-1">
                  {p.name}
                </h3>
                <p className="text-gray-400 font-bold text-xs uppercase tracking-tight">
                  {p.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
