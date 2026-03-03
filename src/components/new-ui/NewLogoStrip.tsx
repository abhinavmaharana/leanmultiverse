'use client'

import Image from 'next/image'

const companies = [
    { name: 'Accenture', logo: '/AccentureLOGO.png', width: 120, height: 40 },
    { name: 'Infosys', logo: '/Infosys_logo.png', width: 100, height: 40 },
    { name: 'TCS', logo: '/Tata_Consultancy.png', width: 120, height: 40 },
    { name: 'Deloitte', logo: '/DeloitteLOGO.png', width: 100, height: 40 },
    { name: 'JP Morgan', logo: '/J_P_Morgan.png', width: 100, height: 40 },
    { name: 'PwC', logo: '/pwcLOGO.png', width: 60, height: 40 },
    { name: 'Cognizant', logo: '/CognizanTLOGO.png', width: 110, height: 40 },
]

export function NewLogoStrip() {
    return (
        <section 
            className="w-full py-12 bg-white border-y border-gray-100"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-10">
                    Trusted by professionals from world-class companies
                </p>
                
                <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-16">
                    {companies.map((company) => (
                        <div 
                            key={company.name} 
                            className="flex items-center justify-center grayscale opacity-50 hover:opacity-100 transition-all duration-500 hover:grayscale-0 hover:scale-110"
                        >
                            <Image
                                src={company.logo}
                                alt={`${company.name} logo`}
                                width={company.width}
                                height={company.height}
                                className="object-contain h-8 w-auto md:h-9"
                            />
                        </div>
                    ))}
                </div>

                {/* Expanded Content - Always Visible Now */}
                <div className="mt-12">
                    <div className="p-8 bg-amber-50/50 rounded-2xl border border-amber-100 text-center max-w-4xl mx-auto shadow-sm">
                        <h4 className="text-gray-900 font-bold text-lg mb-4 uppercase tracking-tight">Real Industry Impact</h4>
                        <p className="text-gray-700 leading-relaxed md:text-lg">
                            Our training frameworks aren't just theoretical. They are battle-tested by professionals currently leading projects at 
                            <span className="font-black text-amber-600"> Microsoft, Google, Amazon, and Deloitte.</span> 
                            By joining, you gain access to the exact workflows used to manage multi-million dollar product portfolios globally.
                        </p>
                        <div className="mt-6 flex justify-center gap-4">
                            <div className="flex flex-col items-center">
                                <span className="text-2xl font-black text-gray-900">50K+</span>
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Alumni</span>
                            </div>
                            <div className="w-px h-10 bg-amber-200" />
                            <div className="flex flex-col items-center">
                                <span className="text-2xl font-black text-gray-900">100+</span>
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Countries</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
