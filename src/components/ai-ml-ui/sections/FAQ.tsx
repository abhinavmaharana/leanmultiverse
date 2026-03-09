'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    q: "Do I need a coding background to join this program?",
    a: "While basic understanding of programming is helpful, our course starts from the fundamentals. However, familiarity with Python is recommended."
  },
  {
    q: "Who are the mentors for the program?",
    a: "Our mentors are industry experts from companies like Deloitte, Google, and Grab with years of real-world AI deployment experience."
  },
  {
    q: "Is this course beginner friendly?",
    a: "Yes, we structured the curriculum to take you from 0 to 100, building foundations before moving to advanced implementation."
  },
  {
    q: "How will this course help with AI careers?",
    a: "We focus on industry-ready skills, portfolio building, and certification prep that companies actually look for in AI roles."
  },
  {
    q: "Will I build real projects during the course?",
    a: "Absolutely. You will work on real datasets and deployment workflows used in industry, not just theoretical exercises."
  },
  {
    q: "Are the sessions live or recorded?",
    a: "We offer a mix of live interactive sessions and high-quality recorded content for self-paced learning."
  },
  {
    q: "Does the program include certification?",
    a: "The program prepares you for globally recognized certifications from Microsoft Azure and AWS."
  },
  {
    q: "Who should take this course?",
    a: "Aspiring AI Engineers, Data Scientists, Product Managers, and anyone looking to pivot into the AI industry."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-16 px-4 md:px-12 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-2 mb-12"
      >
        <div className="relative w-4 h-4">
          <img src="/IMG_5963.PNG" className="w-full h-full object-contain" alt="icon" style={{ filter: 'invert(19%) sepia(94%) saturate(6144%) hue-rotate(224deg) brightness(101%) contrast(105%)' }} />
        </div>
        <span className="text-amber-500 font-sans text-[10px] tracking-[0.2em] uppercase font-bold">
          QUESTIONS = ANSWERS
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-gray-900 font-black text-3xl md:text-5xl mb-8 text-center uppercase tracking-tight"
      >
        FREQUENT QUESTIONS.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-gray-600 font-sans text-xs md:text-sm max-w-3xl text-center mb-20 leading-relaxed px-4"
      >
        Here are answers to some of the most common questions about the AI and Machine Learning program, including course structure, mentors, certification preparation, and career outcomes. This section is designed to help you understand how the program works and what you can expect from the learning experience.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0 max-w-7xl w-full border-t border-gray-100">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-gray-100">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex justify-between items-center py-6 text-left group"
            >
              <span className={cn(
                "font-bold text-xs md:text-sm transition-colors",
                openIndex === i ? "text-amber-500" : "text-gray-700 group-hover:text-amber-500"
              )}>
                {faq.q}
              </span>
              <div className={cn(
                "w-8 h-8 border border-gray-200 flex items-center justify-center transition-all",
                openIndex === i ? "bg-amber-400 border-amber-400 text-white" : "text-gray-400"
              )}>
                <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", openIndex === i ? "rotate-180" : "")} />
              </div>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="pb-8 text-gray-500 font-sans text-xs md:text-sm leading-relaxed pr-12">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};
