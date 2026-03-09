'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Linkedin, MapPin, GraduationCap } from 'lucide-react';
import BookAiMlWebinarModal from './BookAiMlWebinarModal';

const mentors = [
  {
    id: "PALLAVI",
    name: "Pallavi",
    role: "Machine Learning Engineer",
    location: "Melbourne, Australia",
    tagline: "Former Machine Learning Engineer at Deloitte.",
    desc: "Expert in building enterprise AI systems and applying machine learning to real business problems. Specialized in fraud detection and scalable ML solutions.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    stats: ["8+ Years Exp", "Deloitte Alum", "Enterprise AI"]
  },
  {
    id: "JIGAR",
    name: "Jigar",
    role: "AI Researcher",
    location: "Mumbai, India",
    tagline: "Ex-Google AI Researcher.",
    desc: "Specializes in Natural Language Processing and Large Language Models. Deeply involved in the evolution of LLMs and their ethical implementation in modern tech.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
    stats: ["NLP Expert", "Google AI", "Researcher"]
  },
  {
    id: "ABHINAV",
    name: "Abhinav",
    role: "Data Scientist",
    location: "Singapore",
    tagline: "Data Lead at Grab.",
    desc: "Expert in big data analytics and predictive modeling for scale. Helping organizations transition from raw data to actionable intelligence through advanced modeling.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
    stats: ["Data Lead", "Grab Alum", "Big Data Specialist"]
  }
];

export const MentorsRevamped = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-scroll logic
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % mentors.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-gray-50 py-20 px-4 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-amber-500 font-black text-xs tracking-[0.3em] uppercase mb-4 block"
          >
            Learn from the Best
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-gray-900 font-black text-4xl md:text-6xl tracking-tight uppercase mb-6"
          >
            Meet Your <span className="text-gray-400">Mentors.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
          >
            Our instructors aren't just teachers; they are industry veterans who have built AI systems for the world's most innovative companies.
          </motion.p>
        </div>

        <div className="relative bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden min-h-[600px] flex flex-col lg:flex-row">
          <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <img 
                  src={mentors[activeIndex].image} 
                  alt={mentors[activeIndex].name}
                  className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
                <div className="absolute bottom-6 left-6 lg:hidden">
                    <h3 className="text-white text-3xl font-black uppercase tracking-tight">{mentors[activeIndex].name}</h3>
                    <p className="text-amber-400 font-bold uppercase text-xs tracking-widest">{mentors[activeIndex].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-8 right-8 flex gap-2 z-30">
                {mentors.map((_, i) => (
                    <button 
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`w-12 h-1.5 rounded-full transition-all duration-300 ${activeIndex === i ? 'bg-amber-400 w-16' : 'bg-white/30 hover:bg-white/50'}`}
                    />
                ))}
            </div>
          </div>
          <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center relative bg-white">
            <div className="absolute top-12 right-12 opacity-[0.03] pointer-events-none">
                <Quote className="w-48 h-48 text-gray-900" />
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                        <GraduationCap className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Active Mentor</span>
                        <div className="flex items-center gap-2">
                             <MapPin className="w-3 h-3 text-gray-400" />
                             <span className="text-xs font-bold text-gray-500">{mentors[activeIndex].location}</span>
                        </div>
                    </div>
                </div>
                <h3 className="text-gray-900 font-black text-4xl md:text-5xl mb-2 tracking-tight uppercase leading-none">
                  {mentors[activeIndex].name}
                </h3>
                <h4 className="text-gray-400 font-bold text-xl mb-8 uppercase tracking-tight">
                  {mentors[activeIndex].role}
                </h4>
                <p className="text-gray-800 font-bold text-lg mb-4 leading-tight italic">
                  "{mentors[activeIndex].tagline}"
                </p>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-10 max-w-lg">
                  {mentors[activeIndex].desc}
                </p>
                <div className="flex flex-wrap gap-4 mb-12">
                   {mentors[activeIndex].stats.map((stat, i) => (
                     <div key={i} className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-600">
                        {stat}
                     </div>
                   ))}
                </div>
                <div className="flex items-center gap-6">
                   <BookAiMlWebinarModal source="mentors" />
                   <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Linkedin className="w-5 h-5" />
                      <span className="text-xs font-bold uppercase tracking-widest">Profile</span>
                   </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="mt-12 flex justify-center gap-4">
            {mentors.map((m, i) => (
                <button 
                    key={m.id}
                    onClick={() => setActiveIndex(i)}
                    className={`flex items-center gap-3 px-4 py-2 rounded-full border transition-all duration-300 ${activeIndex === i ? 'bg-gray-900 border-gray-900 text-white shadow-xl translate-y-[-4px]' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'}`}
                >
                    <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200">
                        <img src={m.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">{m.name}</span>
                </button>
            ))}
        </div>
      </div>
    </section>
  );
};
