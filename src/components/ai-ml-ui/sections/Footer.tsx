'use client';

import React from 'react';
import { Logo } from '../ui/Logo';
import { Facebook, Linkedin, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative min-h-[600px] md:min-h-[700px] flex flex-col justify-between pt-24 pb-12 px-8 md:px-24 overflow-hidden">
      {/* Exact Fluid Background from Image 7 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#000821]" />
        <div 
          className="absolute inset-0 opacity-80"
          style={{
            background: `
              radial-gradient(at 10% 10%, hsla(210,100%,15%,1) 0, transparent 40%),
              radial-gradient(at 90% 10%, hsla(220,100%,10%,1) 0, transparent 40%),
              radial-gradient(at 100% 50%, hsla(190,100%,35%,1) 0, transparent 60%),
              radial-gradient(at 20% 90%, hsla(200,100%,40%,1) 0, transparent 50%),
              radial-gradient(at 80% 90%, hsla(180,100%,30%,1) 0, transparent 50%)
            `
          }}
        />
        {/* Swirling highlight effect to mimic the image flow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-500/20 via-transparent to-transparent opacity-50" />
      </div>

      <div className="relative z-10 max-w-[1400px] w-full mx-auto">
        {/* Content Section */}
        <div className="mb-20">
          <span className="text-white font-sans text-[10px] md:text-[11px] tracking-[0.3em] uppercase mb-8 block opacity-80">
            GET STARTED
          </span>
          <h2 className="text-white font-black text-4xl md:text-[64px] mb-6 uppercase tracking-tight leading-tight">
            LEARN AI ML <br /> 0 - 100 %
          </h2>
          <p className="text-white/60 font-sans text-[9px] md:text-[10px] tracking-[0.2em] uppercase mb-12">
            AI ENGINEER | MACHINE LEARNING ENGINEER | DATA SCIENTIST | AI PRODUCT ANALYST
          </p>
          
          <div className="flex gap-4">
            <button className="bg-white text-black font-sans text-[11px] md:text-xs font-bold px-10 py-3 rounded-none uppercase tracking-wider hover:bg-gray-200 transition-colors">
              Book Now
            </button>
            <button className="bg-[#004B63]/40 border border-[#00A3FF]/20 text-[#00A3FF] font-sans text-[11px] md:text-xs font-bold px-10 py-3 rounded-none uppercase tracking-wider hover:bg-[#004B63]/60 transition-colors">
              Brochure
            </button>
          </div>
        </div>

        {/* Branding and Bottom Info */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full mt-32 gap-8">
          <Logo className="scale-150 origin-left" />
          
          <div className="flex flex-col items-center md:items-end gap-6 mt-12 md:mt-0">
            <div className="flex gap-8">
              <a href="#" className="text-white/40 hover:text-white font-sans text-[10px] tracking-wider transition-colors">Privacy policy</a>
              <a href="#" className="text-white/40 hover:text-white font-sans text-[10px] tracking-wider transition-colors">Terms & condition!</a>
            </div>
            
            <div className="flex gap-5">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <XLogo />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Custom X (Twitter) Logo
const XLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
