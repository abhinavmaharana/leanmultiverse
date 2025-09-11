"use client"

import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';
import LogoLoop from '../ui/LogoLoop';

const techLogos = [
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

export default function Certification() {
  return (
    <section className="relative py-20 bg-black">
      <div className="text-center">
        <p className="uppercase line-through decoration-red-600 tracking-[6px] text-yellow-400 lg:text-[20px] text-[16px] font-medium mb-3">
            IT&apos;s Not Just A Process
        </p>
        <h1 className="text-[30px] md:text-[46.13px] font-bold mb-6">
            It&apos;s a New Way of Working
        </h1>
        <div style={{ height: '200px', position: 'relative', overflow: 'hidden'}}>
            <LogoLoop
                logos={techLogos}
                speed={120}
                direction="left"
                logoHeight={108}
                gap={40}
                pauseOnHover
                scaleOnHover
                fadeOut
                fadeOutColor="#000000"
                ariaLabel="Technology partners"
            />
        </div>
      </div>
    </section>
  )
}
