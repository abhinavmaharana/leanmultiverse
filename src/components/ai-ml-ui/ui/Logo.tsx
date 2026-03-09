import React from 'react';
import Image from 'next/image';

export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
        <Image
          src="/IMG_5963.PNG"
          alt="Lean Multiverse Logo"
          fill
          className="object-contain brightness-0 invert"
          priority
        />
      </div>
      <div className="flex flex-col items-start justify-center">
        <span className="text-gray-900 font-black text-[16px] md:text-[20px] leading-[0.9] uppercase tracking-tighter">
          Lean
        </span>
        <span className="text-gray-900 font-black text-[16px] md:text-[20px] leading-[0.9] uppercase tracking-tighter">
          Multiverse
        </span>
        <span className="text-gray-500 font-sans text-[5px] md:text-[6.5px] uppercase tracking-[0.2em] mt-1 whitespace-nowrap">
          Consultancy Pvt Ltd
        </span>
      </div>
    </div>
  );
};
