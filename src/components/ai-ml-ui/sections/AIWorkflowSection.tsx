'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Copy, Terminal } from 'lucide-react';

const steps = [
  {
    number: "1",
    title: "Initialize Environment",
    desc: "One command to set up your enterprise-grade AI workspace. Pre-configured with all essential libraries.",
    code: "npx create-ai-workspace@latest",
    lang: "bash",
    time: "~30 seconds"
  },
  {
    number: "2",
    title: "Train Neural Models",
    desc: "Add minimal code to start training neural networks. Seamlessly track metrics and parameters.",
    code: `import leanml\n\nmodel = leanml.Trainer(\n    architecture="gpt-4",\n    device="cuda"\n)\nmodel.fit(data)`,
    lang: "python",
    time: "~5 minutes"
  },
  {
    number: "3",
    title: "Deploy & Scale",
    desc: "Ship your models to production as scalable APIs. Integrated monitoring and safety filters.",
    code: `client = LeanAI()\n\nresponse = client.deploy(\n    model_id="fin-model-v1",\n    endpoint="api/v1/predict"\n)\nprint("Ready!")`,
    lang: "python",
    time: "~1 minute"
  }
];

export const AIWorkflowSection = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-amber-500 font-black text-xs tracking-[0.3em] uppercase mb-4 block"
          >
            Efficiency at Scale
          </motion.span>
          <h2 className="text-gray-900 font-black text-3xl md:text-5xl tracking-tight uppercase mb-6">
            Simple Workflow. <span className="text-gray-400">Complex Power.</span>
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center">
              
              {/* Step Number & Connector */}
              <div className="flex items-center w-full mb-10">
                <div className="flex-1 h-[2px] bg-gray-100 hidden lg:block opacity-0" /> {/* Spacer */}
                <div className="w-12 h-12 rounded-full bg-amber-400 text-white font-black text-xl flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.4)] relative z-10">
                  {step.number}
                </div>
                <div className="flex-1 flex justify-center items-center h-[2px] bg-gray-100 relative hidden lg:flex">
                   {i < steps.length - 1 && (
                     <div className="absolute right-[-16px] z-20">
                        <ArrowRight className="text-gray-300 w-5 h-5" />
                     </div>
                   )}
                </div>
              </div>

              {/* Card Container */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="w-full bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100 flex flex-col h-full hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="text-center mb-8">
                  <h3 className="text-gray-900 font-black text-2xl mb-4 uppercase tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-[280px] mx-auto font-medium">
                    {step.desc}
                  </p>
                </div>

                {/* Code Editor Mockup */}
                <div className="bg-[#0f172a] rounded-2xl overflow-hidden shadow-xl mb-8 flex-1">
                  <div className="bg-[#1e293b] px-4 py-2 flex items-center justify-between border-b border-white/5">
                    <div className="flex items-center gap-2">
                       <Terminal className="w-3 h-3 text-gray-400" />
                       <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{step.lang}</span>
                    </div>
                    <Copy className="w-3 h-3 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                  </div>
                  <div className="p-5 font-mono text-[11px] md:text-xs leading-relaxed overflow-x-auto">
                    <pre className="text-gray-300">
                      <code>{step.code}</code>
                    </pre>
                  </div>
                </div>

                {/* Bottom Stats */}
                <div className="mt-auto pt-6 border-t border-gray-200/50 flex items-center justify-center gap-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{step.time}</span>
                </div>
              </motion.div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
