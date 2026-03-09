'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookAiMlWebinarModal from './BookAiMlWebinarModal';
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
  }
];

export const Mentors = () => {
  const [activeTab, setActiveTab] = useState(mentors[0].id);
  const activeMentor = mentors.find(m => m.id === activeTab) || mentors[0];

  return (
    <section className="bg-white py-16 px-4 md:px-12 relative overflow-hidden flex flex-col items-center">
      <div className="max-w-[1400px] w-full mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 font-black text-4xl md:text-[56px] mb-8 uppercase tracking-tight">
            MEET YOUR MENTORS
          </h2>
          <p className="text-gray-600 font-sans text-[11px] md:text-sm max-w-3xl mx-auto leading-relaxed">
            Learn from mentors who have built real systems in top technology companies. <br />
            Our instructors bring industry experience from global tech ecosystems including Australia and India, giving you exposure to how AI products are designed, deployed, and scaled in real companies.
          </p>
        </div>

        {/* Tabbed Mentor Box */}
        <div className="max-w-6xl mx-auto border border-gray-100 bg-white overflow-hidden shadow-xl rounded-2xl">
          {/* Tabs Header */}
          <div className="flex border-b border-gray-100 bg-gray-50">
            {mentors.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveTab(m.id)}
                className={cn(
                  "flex-1 py-5 text-[10px] md:text-xs font-bold tracking-[0.2em] transition-all uppercase border-r border-gray-100 last:border-none",
                  activeTab === m.id ? "text-white bg-amber-400" : "text-gray-500 bg-gray-50 hover:bg-gray-100"
                )}
              >
                {m.name}
              </button>
            ))}
          </div>

          {/* Content Body */}
          <div className="flex flex-col md:flex-row min-h-[500px] md:h-[600px]">
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
                      <h3 className="text-gray-900 font-black text-xl md:text-2xl mb-1 tracking-tight uppercase">
                        {activeMentor.role}
                      </h3>
                      <h4 className="text-amber-500 font-black text-lg md:text-2xl italic tracking-tight uppercase skew-x-[-10deg]">
                        {activeMentor.location}
                      </h4>
                    </div>

                    <div className="space-y-4">
                      <p className="text-gray-800 font-black text-[11px] md:text-[13px] uppercase tracking-widest leading-relaxed">
                        {activeMentor.tagline}
                      </p>
                      <p className="text-gray-500 font-sans text-xs md:text-sm leading-relaxed max-w-lg">
                        {activeMentor.desc}
                      </p>
                      <ul className="space-y-1.5 pt-4">
                        {activeMentor.points.map((p, i) => (
                          <li key={i} className="text-gray-700 font-bold text-[10px] md:text-[11px] tracking-[0.15em] flex items-start gap-3">
                            <span className="text-amber-500">•</span>
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-auto pt-8 relative z-20">
                <BookAiMlWebinarModal source="mentors" />
              </div>
            </div>

            <div className="flex-1 relative min-h-[300px] md:min-h-full bg-gray-100 overflow-hidden">
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
                    className="w-full h-full object-cover grayscale-[0.2] contrast-110"
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
