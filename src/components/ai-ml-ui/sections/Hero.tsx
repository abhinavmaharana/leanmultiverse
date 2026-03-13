'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import BookAiMlWebinarModal from './BookAiMlWebinarModal';

export const Hero = () => {
  return (
    <section className="relative flex flex-col items-center pt-4 pb-12 md:pb-20 px-4 md:px-12 text-center overflow-hidden bg-white">
      {/* Light Background Effect */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(at 0% 0%, hsla(210,100%,95%,1) 0, transparent 50%),
              radial-gradient(at 100% 0%, hsla(210,100%,95%,1) 0, transparent 50%),
              radial-gradient(at 50% 50%, hsla(200,100%,90%,1) 0, transparent 80%)
            `
          }}
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center z-10 relative max-w-6xl mx-auto mt-2">
        {/* Industry Experts Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-50 border border-gray-100 px-4 py-1.5 mb-10 flex items-center gap-3 rounded-full"
        >
          <div className="relative w-3 h-3">
            <img src="/IMG_5963.PNG" className="w-full h-full object-contain" alt="icon" style={{ filter: 'invert(19%) sepia(94%) saturate(6144%) hue-rotate(224deg) brightness(101%) contrast(105%)' }} />
          </div>
          <span className="text-gray-600 font-sans text-[10px] tracking-[0.2em] uppercase font-bold">
            REAL INDUSTRY EXPERTS »
          </span>
        </motion.div>

        <h1 className="text-gray-900 font-black text-3xl md:text-[56px] mb-6 tracking-tight leading-[1.1] uppercase">
          LEARN AI & MACHINE LEARNING <br />
          FROM <span className="text-amber-500">REAL INDUSTRY EXPERTS</span>
        </h1>

        <h2 className="text-gray-900 font-black text-6xl md:text-[90px] mb-12 tracking-tight italic -skew-x-[5deg]">
          0 - 100 %
        </h2>

        <div className="space-y-4 mb-12">
          <p className="text-gray-600 font-sans text-xs md:text-sm tracking-[0.1em] uppercase font-semibold leading-relaxed max-w-3xl">
            TRAINING DESIGNED TO PREPARE YOU FOR GLOBALLY RECOGNIZED CERTIFICATIONS SUCH AS MICROSOFT AZURE AI AND AWS MACHINE LEARNING.
          </p>
          <p className="text-gray-400 font-sans text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-bold">
            AI ENGINEER | MACHINE LEARNING ENGINEER | DATA SCIENTIST | AI PRODUCT ANALYST
          </p>
        </div>

        {/* Buttons Group */}
        <div className="flex flex-wrap justify-center gap-4">
          {/* Brochure button hidden */}
          <BookAiMlWebinarModal source="hero" />
        </div>
      </div>

      {/* Stats Section at the bottom */}
      <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-3 gap-8 z-10 relative mt-20 pt-12 border-t border-gray-100">
        {[
          { val: '40% - 120%', label: 'SALARY GROWTH' },
          { val: '70% - 80%', label: 'MARKET DEMAND GROWTH' },
          { val: '50% - 60%', label: 'CAREER LONGEVITY IN TECH' },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className="text-gray-900 font-black text-3xl md:text-[48px] mb-2 tracking-tight">
              {stat.val}
            </span>
            <span className="text-gray-500 font-sans text-[10px] md:text-[12px] tracking-[0.2em] font-bold uppercase">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

    </section>
  );
};
