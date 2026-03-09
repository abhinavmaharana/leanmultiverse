'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  Award, 
  Target, 
  Zap, 
  TrendingUp, 
  Cpu, 
  Cloud, 
  Database, 
  ShieldCheck, 
  Settings, 
  Layout, 
  BarChart3, 
  Terminal 
} from 'lucide-react';
import certData from '@/data/certifications.json';
import awsCertData from '@/data/aws-certifications.json';

const getCertIcon = (code: string) => {
  if (code.includes('AI')) return <Cpu className="w-5 h-5" />;
  if (code.includes('DP-100')) return <Cpu className="w-5 h-5" />;
  if (code.includes('DP')) return <Database className="w-5 h-5" />;
  if (code.includes('AZ-900')) return <Cloud className="w-5 h-5" />;
  if (code.includes('AZ-500')) return <ShieldCheck className="w-5 h-5" />;
  if (code.includes('AZ-305')) return <Layout className="w-5 h-5" />;
  if (code.includes('AZ-400')) return <Settings className="w-5 h-5" />;
  if (code.includes('PL')) return <BarChart3 className="w-5 h-5" />;
  return <Terminal className="w-5 h-5" />;
};

const roadmapLevels = [
  {
    id: 'fundamentals',
    level: 'Phase 01',
    title: 'Foundational Mastery',
    color: 'bg-amber-400',
    lightColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    icon: <Zap className="w-5 h-5" />,
    desc: 'The essential building blocks. Master core AI concepts and cloud infrastructure fundamentals.',
    outcome: 'Ready for Associate specialization'
  },
  {
    id: 'associate',
    level: 'Phase 02',
    title: 'Core Specialization',
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    icon: <Target className="w-5 h-5" />,
    desc: 'Deep dive into specific engineering roles. Learn to build, deploy and manage production systems.',
    outcome: 'Industry-ready engineer status'
  },
  {
    id: 'expert',
    level: 'Phase 03',
    title: 'Architecture & Leadership',
    color: 'bg-gray-900',
    lightColor: 'bg-gray-50',
    borderColor: 'border-gray-300',
    icon: <Award className="w-5 h-5" />,
    desc: 'Strategic design and complex solution architecture. Lead digital transformation at scale.',
    outcome: 'Strategic Architect / Tech Lead'
  }
];

const getCompanyIcon = (isAmazon: boolean) => {
  if (isAmazon) {
    return (
      <div className="flex flex-col items-center justify-center transition-all duration-300">
        <span className="text-[11px] font-black leading-none text-gray-900">amazon</span>
        <svg width="45" height="12" viewBox="0 0 60 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5">
          <path d="M2 5C15 12 45 12 58 5M55 3.5C56 4.5 58 5 58 5L55.5 7.5" stroke="#FF9900" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-0.5 w-6 h-6 transition-all duration-300">
      <div className="bg-[#F25022]" />
      <div className="bg-[#7FBA00]" />
      <div className="bg-[#00A4EF]" />
      <div className="bg-[#FFB900]" />
    </div>
  );
};

export const ModernCertificationRoadmap = () => {
  const [activeTab, setActiveTab] = useState(roadmapLevels[0].id);
  const [activeCompany, setActiveCompany] = useState<'microsoft' | 'amazon'>('microsoft');
  
  const activeLevel = roadmapLevels.find(l => l.id === activeTab)!;
  
  // Get active certifications based on company and tab
  const getCerts = () => {
    if (activeCompany === 'microsoft') {
      return certData.tiers.find(t => t.id === activeTab)?.certifications || [];
    } else {
      // Map AWS categories to our roadmap levels
      const awsMap: Record<string, string> = {
        'fundamentals': 'foundational',
        'associate': 'associate',
        'expert': 'professional' // Mapping AWS professional to expert level
      };
      
      const awsCategory = awsMap[activeTab];
      return awsCertData.categories.find(c => c.id === awsCategory)?.certs || [];
    }
  };

  const activeCerts = getCerts();

  return (
    <section className="bg-white py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-amber-500 font-black text-xs tracking-[0.3em] uppercase mb-4 block"
            >
              Career Architecture
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-gray-900 font-black text-4xl md:text-6xl tracking-tight leading-none uppercase"
            >
              Strategic Learning <br />
              <span className="text-gray-400">Roadmap.</span>
            </motion.h2>
          </div>
          
          {/* Company Selector */}
          <div className="flex bg-gray-100 p-1 rounded-xl md:rounded-2xl w-full md:w-auto">
            <button 
              onClick={() => setActiveCompany('microsoft')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl font-bold text-xs md:text-sm transition-all duration-300 ${activeCompany === 'microsoft' ? 'bg-white shadow-md text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <div className="grid grid-cols-2 gap-0.5 w-3 h-3 md:w-3.5 md:h-3.5">
                <div className="bg-[#F25022]" />
                <div className="bg-[#7FBA00]" />
                <div className="bg-[#00A4EF]" />
                <div className="bg-[#FFB900]" />
              </div>
              Microsoft
            </button>
            <button 
              onClick={() => setActiveCompany('amazon')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl font-bold text-xs md:text-sm transition-all duration-300 ${activeCompany === 'amazon' ? 'bg-white shadow-md text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <div className="flex flex-col items-center justify-center scale-[0.6] md:scale-75">
                <span className="text-[10px] font-black leading-none text-gray-900">amazon</span>
                <svg width="24" height="6" viewBox="0 0 60 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 5C15 12 45 12 58 5M55 3.5C56 4.5 58 5 58 5L55.5 7.5" stroke="#FF9900" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              AWS
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          {/* Left: Navigation Steps */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 lg:gap-4">
            {roadmapLevels.map((level) => (
              <button
                key={level.id}
                onClick={() => setActiveTab(level.id)}
                className={`w-full text-left p-4 md:p-6 rounded-xl md:rounded-2xl border-2 transition-all duration-500 group relative overflow-hidden ${
                  activeTab === level.id 
                    ? `${level.borderColor} ${level.lightColor} shadow-lg lg:translate-x-2` 
                    : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
              >
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center transition-colors duration-500 ${
                      activeTab === level.id ? level.color + ' text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                    }`}>
                      {React.cloneElement(level.icon as React.ReactElement<{ className?: string }>, { className: "w-4 h-4 md:w-5 md:h-5" })}
                    </div>
                    <div>
                      <span className={`block text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-0.5 ${
                        activeTab === level.id ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        {level.level}
                      </span>
                      <h3 className="text-gray-900 font-bold text-sm md:text-lg leading-none">
                        {level.title}
                      </h3>
                    </div>
                  </div>
                  <ChevronRight className={`hidden md:block w-5 h-5 transition-transform duration-500 ${
                    activeTab === level.id ? 'text-gray-900 translate-x-1' : 'text-gray-300'
                  }`} />
                </div>
              </button>
            ))}

            <div className="p-4 md:p-6 bg-gray-900 rounded-xl md:rounded-2xl lg:mt-4 text-white relative overflow-hidden group sm:col-span-3 lg:col-span-1 hidden sm:block">
               <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 transition-transform group-hover:scale-125">
                 <TrendingUp className="w-16 h-16 md:w-24 md:h-24" />
               </div>
               <h4 className="font-bold text-base md:text-lg mb-1 md:mb-2 relative z-10">Accelerate Your Path</h4>
               <p className="text-gray-400 text-[10px] md:text-xs leading-relaxed relative z-10">
                 Our curriculum compresses 2 years of learning into 6 months.
               </p>
            </div>
          </div>

          {/* Right: Content & Certifications */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${activeCompany}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-50 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-12 border border-gray-100 min-h-[400px] md:min-h-[500px] flex flex-col"
              >
                <div className="mb-8 md:mb-10">
                   <h3 className="text-gray-900 font-black text-xl md:text-3xl mb-3 md:mb-4 uppercase tracking-tight">
                     {activeLevel.title}
                   </h3>
                   <p className="text-gray-600 text-sm md:text-lg leading-relaxed max-w-2xl">
                     {activeLevel.desc}
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {activeCerts.map((cert: any, i) => (
                    <div 
                      key={i} 
                      className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group flex items-start gap-3 md:gap-5"
                    >
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${activeTab === 'fundamentals' ? 'bg-amber-50 text-amber-500' : activeTab === 'associate' ? 'bg-blue-50 text-blue-500' : 'bg-gray-100 text-gray-900'} group-hover:bg-amber-400 group-hover:text-white`}>
                        {React.cloneElement(getCertIcon(cert.code || cert.title) as React.ReactElement<{ className?: string }>, { className: "w-4 h-4 md:w-5 md:h-5" })}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                           <div className="flex items-center gap-1.5 min-w-0">
                             <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${activeLevel.color}`} />
                             <span className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest truncate">{cert.code || activeTab.toUpperCase()}</span>
                           </div>
                           <div className="flex-shrink-0 scale-75 md:scale-100 origin-right">
                             {getCompanyIcon(activeCompany === 'amazon')}
                           </div>
                        </div>
                        <h4 className="text-gray-900 font-bold text-xs md:text-base leading-snug group-hover:text-amber-500 transition-colors line-clamp-2">
                          {cert.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-6 md:pt-8 border-t border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 pt-6">
                   <div>
                      <span className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5 md:mb-1 block">Expected Outcome</span>
                      <p className="text-gray-900 font-bold text-base md:text-lg">{activeLevel.outcome}</p>
                   </div>
                   <button className="w-full md:w-auto bg-white text-gray-900 font-black text-[10px] md:text-xs uppercase tracking-widest px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300">
                     Explore Curriculum
                   </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
