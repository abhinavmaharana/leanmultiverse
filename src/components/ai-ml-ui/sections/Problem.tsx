'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, BarChart, RefreshCw, Layers, Shield } from 'lucide-react';

const problems = [
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "TRAINERS WITHOUT REAL INDUSTRY EXPERIENCE",
    desc: "Many courses are taught by instructors who have never worked on production AI systems, so students learn concepts but not how AI is applied in real companies."
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: "LOW RETURN ON INVESTMENT",
    desc: "Many students spend large amounts of money on courses but gain little practical value because the curriculum does not match real industry requirements."
  },
  {
    icon: <BarChart className="w-6 h-6" />,
    title: "MISLEADING STATISTICS AND CLAIMS",
    desc: "Some programs advertise unrealistic placement numbers or salary claims without showing real career outcomes or project experience."
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: "TOO MUCH THEORY, VERY LITTLE PRACTICAL WORK",
    desc: "Most programs focus on slides and notebooks instead of real datasets, real models, and real deployment workflows used in industry."
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "NO CLEAR CAREER DIRECTION",
    desc: "Students finish courses without knowing which AI roles to apply for, how to build a strong portfolio, or how to prepare for industry certifications."
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "NO LONG-TERM CAREER SECURITY",
    desc: "Without strong technical skills and real project experience, students struggle to stay relevant as technology evolves and industry expectations grow."
  }
];

export const Problem = () => {
  return (
    <section className="bg-white py-24 px-4 md:px-12 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-2 mb-12"
      >
        <div className="relative w-4 h-4">
          <img src="/IMG_5963.PNG" className="w-full h-full object-contain" alt="icon" style={{ filter: 'invert(19%) sepia(94%) saturate(6144%) hue-rotate(224deg) brightness(101%) contrast(105%)' }} />
        </div>
        <span className="text-primary-blue font-orbitron text-[10px] tracking-[0.2em] uppercase font-bold">
          BUILT FOR MODERN PEOPLE
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-primary-dark font-orbitron text-3xl md:text-5xl font-bold mb-8 text-center uppercase tracking-tight"
      >
        THE PROBLEM WITH MOST AI COURSES
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-slate-600 font-sans text-xs md:text-sm max-w-3xl text-center mb-20 leading-relaxed"
      >
        Many AI programs promise quick results but fail to teach the skills companies actually expect from engineers. Students often finish these courses with theoretical knowledge but without the practical experience required to work on real AI systems or apply for industry roles.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16 max-w-7xl">
        {problems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-start group"
          >
            <div className="w-12 h-12 bg-[#1A233A] text-white flex items-center justify-center mb-6">
              {item.icon}
            </div>
            <h3 className="font-orbitron text-sm md:text-base font-bold mb-4 text-primary-dark tracking-tight leading-snug">
              {item.title}
            </h3>
            <p className="text-slate-500 font-sans text-xs md:text-sm leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
