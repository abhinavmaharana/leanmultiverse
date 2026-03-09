'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '@/lib/utils';

const roles = [
  {
    title: "AI ENGINEER",
    content: "AI agents generate reports, track market trends, and streamline compliance — all with verifiable audit trails for complete transparency."
  },
  {
    title: "MACHINE LEARNING ENGINEER",
    content: "Design and implement scalable machine learning models, optimize performance, and manage production-level AI infrastructure."
  },
  {
    title: "DATA SCIENTIST",
    content: "Extract meaningful insights from complex datasets, build predictive models, and communicate findings to drive business decisions."
  },
  {
    title: "AI PRODUCT ANALYST",
    content: "Bridge the gap between technical AI capabilities and business needs, ensuring products deliver real user value and ROI."
  },
  {
    title: "AI SOLUTIONS CONSULTANT",
    content: "Advise organizations on AI adoption strategies, identify high-impact use cases, and oversee implementation projects."
  }
];

export const CareerRoles = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-gray-50 py-12 md:py-24 px-4 md:px-12 flex flex-col items-center">
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
          REAL JOBS - REAL OUTCOME
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-gray-900 font-black text-3xl md:text-5xl mb-8 text-center uppercase tracking-tight"
      >
        CAREER ROLES AFTER THIS COURSE
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-gray-600 font-sans text-xs md:text-sm max-w-3xl text-center mb-20 leading-relaxed"
      >
        Many AI programs promise quick results but fail to teach the skills companies actually expect from engineers. Students often finish these courses with theoretical knowledge but without the practical experience required to work on real AI systems or apply for industry roles.
      </motion.p>

      <div className="w-full max-w-4xl bg-white p-8 md:p-16 shadow-lg rounded-2xl">
        <div className="space-y-0">
          {roles.map((role, i) => (
            <div key={i} className="border-b border-gray-100 last:border-none">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center py-6 text-left group"
              >
                <span className={cn(
                  "font-bold text-sm md:text-lg tracking-tight transition-colors",
                  openIndex === i ? "text-amber-500" : "text-gray-400 group-hover:text-gray-600"
                )}>
                  {role.title}
                </span>
                {openIndex === i ? (
                  <X className="w-5 h-5 text-amber-500" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-300 group-hover:text-gray-400" />
                )}
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
                    <p className="pb-8 text-gray-500 font-sans text-xs md:text-sm leading-relaxed max-w-2xl">
                      {role.content}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Button variant="primary" size="md" className="px-12 bg-amber-400 hover:bg-amber-500 text-white border-none">
            MORE
          </Button>
        </div>
      </div>
    </section>
  );
};
