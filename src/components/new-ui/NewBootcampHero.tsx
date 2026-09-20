import { Caveat } from 'next/font/google'
import BookWebinarModal from '@/components/webinar/BookWebinarModal'
import {
    ArrowLeftRight,
    Award,
    BarChart3,
    Briefcase,
    Building2,
    Check,
    Compass,
    GraduationCap,
    Layers,
    Rocket,
    Star,
    Target,
    Users,
} from 'lucide-react'

const script = Caveat({ subsets: ['latin'], weight: ['500', '600'], display: 'swap' })

const FEATURES = [
    { icon: Compass, title: 'Role Clarity', text: 'Understand the right path for you' },
    { icon: Layers, title: 'Practical Learning', text: 'Real frameworks, real case studies' },
    { icon: Users, title: 'Industry Mentors', text: 'Learn from experienced leaders' },
    { icon: Award, title: 'Certificate of Completion', text: 'Showcase your growth' },
]

const PERKS = [
    'Live Online Sessions (Weekends)',
    'Templates & Tools',
    'Lifetime Access to Resources',
    'Supportive Community',
]

const AUDIENCES = [
    { icon: GraduationCap, title: 'Freshers', text: 'Start your career with the right direction' },
    { icon: Briefcase, title: 'Working Professionals', text: 'Move to higher roles with confidence' },
    { icon: ArrowLeftRight, title: 'Career Switchers', text: 'Transition into Product, Project, Program or Leadership' },
    { icon: Users, title: 'Current Managers', text: 'Accelerate to senior leadership roles' },
    { icon: Building2, title: 'Entrepreneurs', text: 'Build management capabilities to scale your business' },
]

const PILLARS = [
    { icon: Target, text: 'Clarity for Today' },
    { icon: BarChart3, text: 'Skills for Tomorrow' },
    { icon: Rocket, text: 'Growth for the Next 15 Years' },
    { icon: Star, text: 'A Better You' },
]

// Listed bottom -> top. x/y are positions inside a 400 x 520 canvas.
const MILESTONES = [
    { label: 'START', text: 'Where You Are', x: 150, y: 470 },
    { label: 'YEAR 1–3', text: 'Build Foundation', x: 200, y: 385 },
    { label: 'YEAR 4–7', text: 'Grow Expertise', x: 250, y: 300 },
    { label: 'YEAR 8–12', text: 'Lead & Expand', x: 300, y: 215 },
    { label: 'YEAR 13–15', text: 'Create Impact', x: 345, y: 135 },
]

const W = 400
const H = 520

function RoadmapGraphic() {
    return (
        <div className="relative w-full max-w-[460px] mx-auto aspect-[400/520] rounded-[2rem] overflow-hidden bg-gradient-to-b from-[#FFF3DC] via-[#FDE7C4] to-[#F6EBDD]">
            <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 w-full h-full" aria-hidden="true">
                <defs>
                    <linearGradient id="mtn-back" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#D9C3A5" stopOpacity="0.55" />
                        <stop offset="1" stopColor="#B9A48A" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="mtn-front" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#8E7B68" />
                        <stop offset="1" stopColor="#4A4038" />
                    </linearGradient>
                    <linearGradient id="path-gold" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0" stopColor="#FFB300" />
                        <stop offset="1" stopColor="#FFE082" />
                    </linearGradient>
                </defs>
                {/* distant range */}
                <polygon points="0,330 70,240 130,300 200,210 280,320 340,260 400,330 400,520 0,520" fill="url(#mtn-back)" />
                {/* main peak */}
                <polygon points="90,520 200,300 280,190 365,60 400,110 400,520" fill="url(#mtn-front)" />
                {/* lit face */}
                <polygon points="365,60 400,110 400,300 330,220 345,130" fill="#F3D9A8" opacity="0.55" />
                {/* winding path */}
                <path
                    d="M150 470 C 90 440, 130 400, 200 385 C 270 370, 200 320, 250 300 C 310 280, 250 235, 300 215 C 350 195, 300 160, 345 135 C 362 125, 366 100, 365 74"
                    fill="none"
                    stroke="#FFC107"
                    strokeOpacity="0.35"
                    strokeWidth="14"
                    strokeLinecap="round"
                />
                <path
                    d="M150 470 C 90 440, 130 400, 200 385 C 270 370, 200 320, 250 300 C 310 280, 250 235, 300 215 C 350 195, 300 160, 345 135 C 362 125, 366 100, 365 74"
                    fill="none"
                    stroke="url(#path-gold)"
                    strokeWidth="5"
                    strokeLinecap="round"
                />
                {MILESTONES.map((m) => (
                    <circle key={m.label} cx={m.x} cy={m.y} r="6" fill="#FFC107" stroke="#fff" strokeWidth="2.5" />
                ))}
                {/* flag on the summit */}
                <line x1="365" y1="74" x2="365" y2="28" stroke="#3B3129" strokeWidth="2.5" strokeLinecap="round" />
                <polygon points="365,28 392,38 365,50" fill="#FFB300" />
            </svg>

            {/* summit label */}
            <div className="absolute top-3 right-[12%] text-right text-[11px] font-black leading-tight tracking-wide text-gray-900">
                LEAD
                <br />
                CREATE
                <br />
                INSPIRE
            </div>

            {/* milestone cards */}
            {MILESTONES.map((m) => (
                <div
                    key={m.label}
                    className="absolute rounded-lg bg-gray-900/85 backdrop-blur-sm text-white px-3 py-1.5 text-center shadow-lg"
                    style={{
                        left: `${(m.x / W) * 100}%`,
                        top: `${(m.y / H) * 100}%`,
                        transform: 'translate(calc(-100% - 12px), -50%)',
                    }}
                >
                    <p className="text-[11px] font-extrabold leading-tight tracking-wide">{m.label}</p>
                    <p className="text-[10px] font-medium leading-tight text-white/75 whitespace-nowrap">{m.text}</p>
                </div>
            ))}

            <p className={`${script.className} absolute bottom-4 right-5 text-right text-[26px] leading-[1.05] text-amber-700 rotate-[-6deg]`}>
                Same You.
                <br />A Bigger
                <br />
                Tomorrow.
            </p>
        </div>
    )
}

// Small screens: same roadmap as a simple vertical timeline.
function RoadmapTimeline() {
    const steps = [...MILESTONES.map((m) => ({ label: m.label, text: m.text })), { label: 'LEAD · CREATE · INSPIRE', text: 'The summit' }]
    return (
        <div className="rounded-[2rem] bg-gradient-to-b from-[#FFF3DC] to-[#F6EBDD] p-6">
            <div className="ml-3">
            <ol className="relative border-l-2 border-[#FFC107]/60 space-y-5">
                {steps.map((s) => (
                    <li key={s.label} className="pl-6 relative">
                        <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#FFC107] ring-2 ring-white" />
                        <p className="text-xs font-extrabold tracking-wide text-gray-900">{s.label}</p>
                        <p className="text-sm text-gray-600">{s.text}</p>
                    </li>
                ))}
            </ol>
            </div>
            <p className={`${script.className} mt-6 text-right text-3xl text-amber-700`}>Same You. A Bigger Tomorrow.</p>
        </div>
    )
}

export function NewBootcampHero() {
    return (
        <>
            <section id="home" className="w-full bg-white pt-10 lg:pt-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-6 items-center">
                        {/* Left: copy */}
                        <div>
                            <div className="flex items-center gap-3 mb-5">
                                <span className="hidden sm:block h-px w-10 bg-[#FFC107]" />
                                <p className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-gray-600">
                                    Asia&apos;s Top Management Transformation Platform
                                </p>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-[2.6rem] xl:text-[3.4rem] font-black tracking-tight leading-[1.05] text-gray-950">
                                From Any Background to{' '}
                                <span className="block bg-gradient-to-r from-[#C98A00] to-[#E9A800] bg-clip-text text-transparent">
                                    Leadership Transformation.
                                </span>
                            </h1>

                            <p className="mt-6 text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl">
                                A 1-Month Career Transformation Bootcamp with a 15-Year Roadmap — designed to take you from{' '}
                                <span className="font-bold text-gray-900">where you are today to where you want to be tomorrow.</span>
                            </p>

                            <div className="mt-8">
                            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6">
                                {FEATURES.map(({ icon: Icon, title, text }) => (
                                    <li key={title} className="flex flex-col lg:flex-row items-start gap-3">
                                        <span className="flex-shrink-0 w-11 h-11 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center">
                                            <Icon className="w-5 h-5 text-amber-600" />
                                        </span>
                                        <span>
                                            <span className="block text-sm font-bold text-gray-900 leading-tight">{title}</span>
                                            <span className="block mt-1 text-xs text-gray-500 leading-snug">{text}</span>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            </div>

                            <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-4">
                                <BookWebinarModal source="new-hero" />
                                <div className="flex items-center gap-3 rounded-2xl border border-gray-100 px-5 py-3">
                                    <Users className="w-6 h-6 text-amber-500 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-bold text-gray-900 leading-tight">500 Seats Only</p>
                                        <p className="text-xs text-gray-500 leading-snug">Limited Batch Size for Personal Attention</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-7">
                            <ul className="flex flex-wrap gap-x-6 gap-y-3">
                                {PERKS.map((p) => (
                                    <li key={p} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                                        <span className="w-5 h-5 rounded-full bg-[#FFC107] flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3 h-3 text-white" strokeWidth={3.5} />
                                        </span>
                                        {p}
                                    </li>
                                ))}
                            </ul>
                            </div>
                        </div>

                        {/* Right: 15-year roadmap */}
                        <div>
                            <div className="hidden lg:block">
                                <RoadmapGraphic />
                            </div>
                            <div className="lg:hidden">
                                <RoadmapTimeline />
                            </div>
                        </div>
                    </div>

                    {/* Audience */}
                    <div className="mt-14">
                        <div className="flex items-center gap-4 mb-5">
                            <span className="h-px flex-1 bg-gray-200" />
                            <p className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-gray-600 text-center">
                                Built for ambitious professionals
                            </p>
                            <span className="h-px flex-1 bg-gray-200" />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                            {AUDIENCES.map(({ icon: Icon, title, text }) => (
                                <div
                                    key={title}
                                    className="rounded-2xl border border-gray-100 bg-white px-4 py-6 text-center shadow-sm last:col-span-2 md:last:col-span-1"
                                >
                                    <Icon className="w-7 h-7 mx-auto text-gray-900" />
                                    <p className="mt-3 text-sm font-bold text-gray-900">{title}</p>
                                    <p className="mt-1 text-xs text-gray-500 leading-snug">{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom pillars strip */}
                <div className="mt-12 w-full bg-[#0B1220]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-2 lg:grid-cols-4 gap-y-4">
                        {PILLARS.map(({ icon: Icon, text }, i) => (
                            <div
                                key={text}
                                className={`flex items-center justify-center gap-3 text-white text-xs sm:text-sm lg:text-base font-medium ${i > 0 ? 'lg:border-l lg:border-white/15' : ''}`}
                            >
                                <Icon className="w-5 h-5 text-amber-400 flex-shrink-0" />
                                {text}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
