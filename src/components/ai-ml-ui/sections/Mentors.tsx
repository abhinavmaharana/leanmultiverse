'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { cn } from '@/lib/utils';

const mentors = [
  {
    id: "PALLAVI",
    name: "PALLAVI",
    role: "MACHINE LEARNING ENGINEER",
    location: "MELBOURNE, AUSTRALIA",
    tagline: "FORMER MACHINE LEARNING ENGINEER AT DELOITTE.",
    desc: "EXPERIENCE INCLUDES BUILDING ENTERPRISE AI SYSTEMS AND APPLYING MACHINE LEARNING TO REAL BUSINESS PROBLEMS.",
    points: ["MACHINE LEARNING SYSTEMS", "ENTERPRISE AI SOLUTIONS", "FRAUD DETECTION MODELS"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "JIGAR",
    name: "JIGAR",
    role: "AI RESEARCHER",
    location: "MUMBAI, INDIA",
    tagline: "EX-GOOGLE AI RESEARCHER.",
    desc: "SPECIALIZES IN NATURAL LANGUAGE PROCESSING AND LARGE LANGUAGE MODELS.",
    points: ["NLP ARCHITECTURES", "LLM FINE-TUNING", "AI ETHICS"],
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "ABHINAV",
    name: "ABHINAV",
    role: "DATA SCIENTIST",
    location: "SINGAPORE",
    tagline: "DATA LEAD AT GRAB.",
    desc: "EXPERT IN BIG DATA ANALYTICS AND PREDICTIVE MODELING FOR SCALE.",
    points: ["BIG DATA PIPELINES", "PREDICTIVE ANALYTICS", "SCALABLE ML"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "ARSH",
    name: "ARSH",
    role: "AI PRODUCT MANAGER",
    location: "SAN FRANCISCO, USA",
    tagline: "PRODUCT LEAD AT OPENAI.",
    desc: "FOCUSES ON BRINGING AI PRODUCTS FROM CONCEPT TO MARKET DOMINANCE.",
    points: ["AI PRODUCT STRATEGY", "USER-CENTRIC AI", "MARKET ANALYSIS"],
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800"
  }
];

export const Mentors = () => {
  const [activeTab, setActiveTab] = useState(mentors[0].id);
  const activeMentor = mentors.find(m => m.id === activeTab) || mentors[0];

  return (
    <section className="bg-black py-24 px-4 md:px-12 relative overflow-hidden min-h-screen flex flex-col items-center">
      {/* 3D Swirling Tubes Background (Image 3) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-[-20%] w-[80%] h-full pointer-events-none opacity-80">
          <img 
            src="https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=2000" 
            alt="3D Swirl Left" 
            className="w-full h-full object-contain mix-blend-screen"
          />
        </div>
        <div className="absolute top-0 right-[-20%] w-[80%] h-full pointer-events-none opacity-80 scale-x-[-1]">
          <img 
            src="https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=2000" 
            alt="3D Swirl Right" 
            className="w-full h-full object-contain mix-blend-screen"
          />
        </div>
        {/* Dark overlay to make text pop */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="max-w-[1400px] w-full mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-white font-orbitron text-4xl md:text-[56px] font-bold mb-8 uppercase tracking-tight">
            MEET YOUR MENTORS
          </h2>
          <p className="text-white/80 font-sans text-[11px] md:text-sm max-w-3xl mx-auto leading-relaxed">
            Learn from mentors who have built real systems in top technology companies. <br />
            Our instructors bring industry experience from global tech ecosystems including Australia and India, giving you exposure to how AI products are designed, deployed, and scaled in real companies.
          </p>
        </div>

        {/* Tabbed Mentor Box */}
        <div className="max-w-6xl mx-auto border border-[#0047FF] bg-[#0A0A0A]/90 backdrop-blur-sm overflow-hidden shadow-[0_0_50px_rgba(0,71,255,0.2)]">
          {/* Tabs Header */}
          <div className="flex border-b border-[#0047FF]/30">
            {mentors.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveTab(m.id)}
                className={cn(
                  "flex-1 py-5 text-[10px] md:text-xs font-orbitron tracking-[0.2em] transition-all uppercase font-bold border-r border-[#0047FF]/30 last:border-none",
                  activeTab === m.id ? "text-white bg-[#0047FF]" : "text-white/40 hover:text-white/60 bg-[#1A1A1A]/50"
                )}
              >
                {m.name}
              </button>
            ))}
          </div>

          {/* Content Body */}
          <div className="flex flex-col md:flex-row min-h-[600px] md:h-[600px]">
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-between overflow-hidden">
              <div className="relative h-full">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="space-y-6 absolute inset-0 py-4"
                  >
                    <div>
                      <h3 className="text-white font-orbitron text-xl md:text-2xl font-bold mb-1 tracking-tight uppercase">
                        {activeMentor.role}
                      </h3>
                      <h4 className="text-[#FF0000] font-orbitron text-lg md:text-2xl font-bold italic tracking-tight uppercase skew-x-[-10deg]">
                        {activeMentor.location}
                      </h4>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-white/90 font-orbitron text-[11px] md:text-[13px] font-bold uppercase tracking-widest leading-relaxed">
                        {activeMentor.tagline}
                      </p>
                      <p className="text-white/60 font-sans text-xs md:text-sm leading-relaxed max-w-lg">
                        {activeMentor.desc}
                      </p>
                      <ul className="space-y-1.5 pt-4">
                        {activeMentor.points.map((p, i) => (
                          <li key={i} className="text-white font-orbitron text-[10px] md:text-[11px] tracking-[0.15em] font-bold opacity-90 flex items-start gap-3">
                            <span className="text-white">•</span>
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <div className="mt-auto pt-8 relative z-20">
                <Button 
                  showIcon={false}
                  className="bg-[#0047FF] hover:bg-blue-600 px-10 py-3 rounded-none text-[11px]"
                >
                  BOOK AT RS 9
                </Button>
              </div>
            </div>

            <div className="flex-1 relative min-h-[300px] md:min-h-full bg-[#111] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <img
                    src={activeMentor.image}
                    alt={activeMentor.name}
                    className="w-full h-full object-cover grayscale-[0.3] contrast-125"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
