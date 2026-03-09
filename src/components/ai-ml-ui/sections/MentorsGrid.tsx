'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, ExternalLink } from 'lucide-react';

const mentors = [
  {
    id: "PALLAVI",
    name: "Pallavi",
    role: "Machine Learning Engineer",
    company: "Deloitte Alum",
    location: "Melbourne, Australia",
    desc: "Experience includes building enterprise AI systems and applying machine learning to real business problems.",
    image: "/mentors/pallavi.jpg",
    color: "amber",
    points: [
      "Machine Learning Systems",
      "Enterprise AI Solutions",
      "Fraud Detection Models"
    ]
  },
  {
    id: "JIGAR",
    name: "Jigar",
    role: "AI Researcher",
    company: "Ex-Google AI",
    location: "Mumbai, India",
    desc: "Specialized in NLP and LLM evolution with deep roots in academic and industrial research.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
    color: "blue",
    points: [
      "NLP Architectures",
      "LLM Fine-Tuning",
      "AI Ethics"
    ]
  },
  {
    id: "ABHINAV",
    name: "Abhinav",
    role: "Data Scientist",
    company: "Grab Lead",
    location: "Singapore",
    desc: "Predictive modeling and big data expert helping scale products in high-growth ecosystems.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
    color: "gray",
    points: [
      "Predictive Analytics",
      "Big Data Scaling",
      "Product ML"
    ]
  }
];

export const MentorsGrid = () => {
  return (
    <section className="bg-white py-24 px-4 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mentors.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative group cursor-default"
            >
              {/* Image Container with Custom Shape */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-8 bg-gray-100 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                <img 
                  src={m.image} 
                  alt={m.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute bottom-8 left-8 right-8 translate-y-10 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                    <p className="text-white text-xs leading-relaxed mb-4 font-medium">
                        {m.desc}
                    </p>
                    {m.points && (
                      <ul className="mb-6 space-y-1.5">
                        {m.points.map((p, idx) => (
                           <li key={idx} className="text-white/90 font-bold text-[10px] tracking-widest uppercase flex items-center gap-2">
                             <span className="w-1.5 h-1.5 bg-amber-500" />
                             {p}
                           </li>
                        ))}
                      </ul>
                    )}
                    <div className="flex items-center gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition-all">
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all">
                            <ExternalLink className="w-5 h-5" />
                        </a>
                    </div>
                </div>
              </div>

              {/* Info Area */}
              <div className="px-4">
                <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1 block">
                    {m.company} {m.location ? `· ${m.location}` : ''}
                </span>
                <h3 className="text-gray-900 font-black text-2xl uppercase tracking-tight mb-1">
                    {m.name}
                </h3>
                <p className="text-gray-400 font-bold text-sm uppercase tracking-tight">
                    {m.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
