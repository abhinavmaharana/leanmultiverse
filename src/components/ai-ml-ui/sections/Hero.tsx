'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center pt-8 pb-20 px-4 md:px-12 text-center overflow-hidden">
      {/* Exact Background from Image 1 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#000821]" />
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            background: `
              radial-gradient(at 0% 0%, hsla(220,100%,15%,1) 0, transparent 50%),
              radial-gradient(at 100% 0%, hsla(210,100%,20%,1) 0, transparent 50%),
              radial-gradient(at 50% 50%, hsla(200,100%,35%,1) 0, transparent 80%),
              radial-gradient(at 0% 100%, hsla(190,100%,45%,1) 0, transparent 50%),
              radial-gradient(at 100% 100%, hsla(205,100%,30%,1) 0, transparent 50%)
            `
          }}
        />
        {/* Swirly highlight effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent rotate-12" />
      </div>

      {/* Left Blue Border seen in Image 1 */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00A3FF] z-10" />

      {/* Navbar */}
      <div className="w-full max-w-[1400px] flex justify-between items-center z-10 relative px-4">
        <Logo />
        <Button variant="primary" className="bg-[#FF0000] px-6 py-3 h-fit">
          BOOK AT RS 9
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center z-10 relative max-w-6xl mx-auto mt-20">
        {/* Industry Experts Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-[#0F1121] border border-white/5 px-4 py-1.5 mb-14 flex items-center gap-3 rounded-sm"
        >
          <div className="relative w-3 h-3">
            <img src="/IMG_5963.PNG" className="w-full h-full object-contain brightness-0 invert" alt="icon" />
          </div>
          <span className="text-white font-orbitron text-[9px] tracking-[0.3em] uppercase opacity-80">
            REAL INDUSTRY EXPERTS »
          </span>
        </motion.div>

        <h1 className="text-white font-orbitron text-4xl md:text-[64px] font-bold mb-6 tracking-tight leading-[1.1] uppercase">
          LEARN AI & MACHINE LEARNING <br />
          FROM REAL INDUSTRY EXPERTS
        </h1>

        <h2 className="text-white font-orbitron text-6xl md:text-[100px] font-bold mb-14 tracking-[0.15em] italic -skew-x-[5deg] opacity-95">
          0 - 100 %
        </h2>

        <div className="space-y-4 mb-14">
          <p className="text-white font-sans text-[10px] md:text-[11px] tracking-[0.15em] uppercase opacity-90 leading-relaxed max-w-3xl">
            TRAINING DESIGNED TO PREPARE YOU FOR GLOBALLY RECOGNIZED CERTIFICATIONS SUCH AS MICROSOFT AZURE AI AND AWS MACHINE LEARNING.
          </p>
          <p className="text-white/60 font-sans text-[9px] md:text-[10px] tracking-[0.2em] uppercase">
            AI ENGINEER | MACHINE LEARNING ENGINEER | DATA SCIENTIST | AI PRODUCT ANALYST
          </p>
        </div>

        {/* Buttons Group */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="outline" className="px-10 py-4 min-w-[200px]">
            BROCHURE
          </Button>
          <Button variant="primary" className="px-10 py-4 min-w-[200px]">
            BOOK AT RS 9
          </Button>
        </div>
      </div>

      {/* Stats Section at the bottom */}
      <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-3 gap-8 z-10 relative mt-24">
        {[
          { val: '40% - 120%', label: 'SALARY GROWTH' },
          { val: '70% - 80%', label: 'MARKET DEMAND GROWTH' },
          { val: '50% - 60%', label: 'CAREER LONGEVITY IN TECH' },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className="text-white font-orbitron text-4xl md:text-[56px] font-bold mb-3 tracking-tight">
              {stat.val}
            </span>
            <span className="text-white font-orbitron text-[10px] md:text-[12px] tracking-[0.25em] font-bold opacity-90">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

    </section>
  );
};
