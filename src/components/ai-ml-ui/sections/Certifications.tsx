'use client';

import React from 'react';
import { motion } from 'framer-motion';

const certs = [
  {
    title: "MICROSOFT AZURE AI FUNDAMENTALS (AI-900)",
    desc: "This certification introduces the basic concepts of artificial intelligence and machine learning on the Azure cloud platform. It covers foundational topics such as machine learning principles, computer vision, natural language processing, and Azure AI services, helping learners understand how AI solutions are built and used in real-world applications.",
    type: "microsoft"
  },
  {
    title: "MICROSOFT AZURE AI ENGINEER (AI-102)",
    desc: "This certification focuses on designing and implementing AI-powered applications using Azure services. It covers how to build, integrate, and deploy AI solutions such as computer vision systems, language processing tools, and conversational AI in cloud-based environments.",
    type: "microsoft"
  },
  {
    title: "AWS MACHINE LEARNING CERTIFICATION",
    desc: "This certification focuses on building, training, and deploying machine learning models using AWS cloud infrastructure. It provides an understanding of the machine learning lifecycle and how scalable ML systems are developed and managed in production environments.",
    type: "amazon"
  }
];

const MicrosoftLogo = () => (
  <div className="grid grid-cols-2 gap-1 w-10 h-10">
    <div className="bg-[#F25022]" />
    <div className="bg-[#7FBA00]" />
    <div className="bg-[#00A4EF]" />
    <div className="bg-[#FFB900]" />
  </div>
);

const AmazonLogo = () => (
  <div className="flex flex-col items-center">
    <span className="text-white font-bold text-3xl leading-none">amazon</span>
    <svg width="60" height="15" viewBox="0 0 60 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 5C15 12 45 12 58 5M55 3.5C56 4.5 58 5 58 5L55.5 7.5" stroke="#FF9900" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

export const Certifications = () => {
  return (
    <section className="bg-black py-24 px-4 md:px-12 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-2 mb-16"
      >
        <div className="relative w-4 h-4">
          <img src="/IMG_5963.PNG" className="w-full h-full object-contain brightness-0 invert" alt="icon" />
        </div>
        <h2 className="text-white font-orbitron text-2xl md:text-4xl font-bold uppercase tracking-tight">
          CERTIFICATION PREPARATION
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full">
        {certs.map((cert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#1A1A1A] p-10 flex flex-col justify-between min-h-[450px]"
          >
            <div>
              <h3 className="text-white font-orbitron text-sm md:text-base font-bold mb-6 tracking-tight leading-snug">
                {cert.title}
              </h3>
              <p className="text-white/50 font-sans text-xs md:text-sm leading-relaxed mb-12">
                {cert.desc}
              </p>
            </div>
            <div className="mt-auto">
              {cert.type === 'microsoft' ? <MicrosoftLogo /> : <AmazonLogo />}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-white/30 font-sans text-[10px] mt-20 text-center"
      >
        LeanMultiverse Consultancy Pvt Ltd is an independent training provider and is not affiliated with Microsoft or Amazon.
      </motion.p>
    </section>
  );
};
