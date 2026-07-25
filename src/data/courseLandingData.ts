// Course landing page data types & content
// Matches the white/amber design system of the homepage

export interface CourseModule {
  title: string
  topics: string[]
}

export interface CourseInstructor {
  name: string
  designation: string
  experience: string
  specialization: string
  photo: string
  linkedin?: string
}

export interface CourseFAQItem {
  question: string
  answer: string
}

export interface CourseLandingData {
  slug: string
  title: string
  shortTitle: string
  badge: string
  tagline: string
  valueProposition: string
  duration: string
  hours: string
  certification: string
  targetRoles: string[]
  rating: number
  reviewCount: number
  heroStats: { label: string; value: string }[]
  trustItems: { label: string; icon: string }[]
  video?: {
    title?: string
    url?: string
    thumbnailUrl?: string
  }
  overview: {
    what: string
    who: string
    why: string
    outcomes: string[]
  }
  whatYouLearn: string[]
  curriculum: CourseModule[]
  careerRoles: string[]
  certificationTimeline: string[]
  instructor: CourseInstructor
  whyLeanMultiverse: { title: string; description: string; icon: string }[]
  pricing: {
    fee: string
    originalFee?: string
    inclusions: string[]
    emiNote?: string
  }
  faqs: CourseFAQItem[]
  metaTitle: string
  metaDescription: string
}

// ─── Platform-level content (shared across course landing pages) ──────────
export interface ValuePropItem {
  icon: string
  title: string
  description: string
}

export const valuePropositions: ValuePropItem[] = [
  {
    icon: '🎓',
    title: 'Expert-Led Coaching',
    description: 'Personalized, coach-led training built around your goals — not a generic workout plan.',
  },
  {
    icon: '🤝',
    title: 'On-Demand Library',
    description: 'Train on your schedule with a growing library of workout videos you can access anytime.',
  },
  {
    icon: '🚀',
    title: 'Ongoing Support',
    description: 'Progress check-ins and guidance to keep you accountable throughout your program.',
  },
]

export interface PlatformPromiseItem {
  icon: string
  title: string
  description: string
}

export const platformPromises: PlatformPromiseItem[] = [
  {
    icon: '💳',
    title: 'One-Time Program Fee',
    description: 'Pay once — no recurring subscription or auto-renewal lock-in.',
  },
  {
    icon: '🔍',
    title: 'No Hidden Fees',
    description: 'The price you see at checkout is the price you pay. Every inclusion is listed upfront.',
  },
  {
    icon: '↩️',
    title: '7-Day Refund Policy',
    description: 'Full refund available up to 7 days before your program start date.',
  },
]

// ─── Fitness ─────────────────────────────────────────────────
// NOTE: Program duration, pricing, and full curriculum are not yet finalized.
// Fields below are clearly marked "Coming Soon" rather than invented — update
// with real details before enrollment opens.
export const fitnessData: CourseLandingData = {
  slug: 'fitness',
  title: 'Personalized Fitness Coaching with Yuvraj Anand',
  shortTitle: 'Fitness Coaching',
  badge: 'Fitness Coaching Program',
  tagline: 'Fitness as a Subscription',
  valueProposition: 'One membership that adapts to your fitness lifestyle.',
  duration: 'Coming Soon',
  hours: 'Coming Soon',
  certification: 'Details Coming Soon',
  targetRoles: ['Beginners', 'Busy Professionals', 'Home Workout Enthusiasts', 'Strength & Weight Loss Goals'],
  rating: 0,
  reviewCount: 0,
  heroStats: [
    { label: 'Format', value: 'On-Demand + Live' },
    { label: 'Coach', value: 'Yuvraj Anand' },
    { label: 'Duration', value: 'Coming Soon' },
    { label: 'Pricing', value: 'Coming Soon' },
  ],
  trustItems: [
    { label: 'On-Demand Access', icon: '📱' },
    { label: 'Personalized Plans', icon: '🎯' },
    { label: 'Celebrity Coach', icon: '⭐' },
    { label: 'Home Workouts', icon: '🏠' },
    { label: 'Video Library', icon: '🎥' },
  ],
  video: {
    title: 'Meet Your Coach — Yuvraj Anand',
    url: 'https://drive.google.com/file/d/1YmbkSrlH-NjrMSN6Wm4eP5kSPwxoeQsy/preview',
  },
  overview: {
    what: 'A personalized fitness coaching program from celebrity fitness coach Yuvraj Anand, combining coaching guidance with an on-demand video library you can train from anytime. Full program details are being finalized.',
    who: 'Ideal for beginners, busy professionals, and anyone who wants a structured, coach-guided path to their fitness goals — no matter your starting point.',
    why: 'Work directly with a celebrity fitness coach and get a fitness library built around your goals, available on your schedule — not a one-size-fits-all plan.',
    outcomes: [
      'Access a personalized, on-demand fitness video library',
      'Train on your own schedule, wherever you are',
      'Get guidance from celebrity fitness coach Yuvraj Anand',
      'Follow a structured path built around your goals',
      '(Full list of outcomes will be published closer to launch)',
    ],
  },
  whatYouLearn: [
    'Personalized Workouts',
    'On-Demand Video Library',
    'Strength Training',
    'Home Workouts',
    'Nutrition Guidance',
    'Progress Tracking',
    'Mobility & Recovery',
    'Goal Setting',
  ],
  curriculum: [
    {
      title: 'Full Program Curriculum — Coming Soon',
      topics: [
        'Personalized workout breakdown by goal and experience level',
        'Nutrition and recovery guidance',
        'Access details for the on-demand video library',
        'Final curriculum will be published before enrollment opens',
      ],
    },
  ],
  careerRoles: ['Improved Strength', 'Fat Loss', 'Better Mobility', 'Higher Energy Levels', 'Sustainable Habits'],
  certificationTimeline: ['Goal & Fitness Assessment', 'Personalized Plan Delivery', 'On-Demand + Live Training', 'Progress Check-ins'],
  instructor: {
    name: 'Yuvraj Anand',
    designation: 'Celebrity Fitness Coach',
    experience: 'Personal trainer to celebrities and professionals',
    specialization: 'Strength Training, Personalized Coaching, On-Demand Fitness',
    photo: '/yuvraj-anand-coach.jpg',
  },
  whyLeanMultiverse: [
    { title: 'Celebrity Coach', description: 'Train with a coach who has worked with celebrities and professionals.', icon: '⭐' },
    { title: 'On-Demand Library', description: 'A growing library of workout videos you can access anytime.', icon: '🎥' },
    { title: 'Personalized Plans', description: 'Programs built around your goals, not a generic template.', icon: '🎯' },
    { title: 'Flexible Scheduling', description: 'Train on your own time — no fixed class schedule required.', icon: '⏱️' },
  ],
  pricing: {
    fee: 'Coming Soon',
    inclusions: [
      'On-demand fitness video library access',
      'Personalized coaching guidance',
      'Progress tracking',
      '(Full inclusions list will be published at launch)',
    ],
  },
  faqs: [
    { question: 'Who is this program for?', answer: 'Anyone looking for structured, coach-guided fitness training — from beginners to busy professionals — regardless of your starting point.' },
    { question: 'Who is Yuvraj Anand?', answer: 'Yuvraj Anand is a celebrity fitness coach bringing personalized coaching and an on-demand fitness video library to Lean Multiverse.' },
    { question: 'When does the program launch?', answer: 'We\'re finalizing program details. Reach out via the form below to be notified as soon as enrollment opens.' },
    { question: 'How much will it cost?', answer: 'Pricing is being finalized and will be published before enrollment opens.' },
    { question: 'Will this be on-demand, live, or both?', answer: 'The program combines an on-demand video library with coaching guidance, so you can train on your own schedule.' },
  ],
  metaTitle: 'Fitness Coaching with Yuvraj Anand | Lean Multiverse',
  metaDescription: 'Personalized fitness coaching and an on-demand fitness video library from celebrity fitness coach Yuvraj Anand. Program details coming soon.',
}

// ─── Career Guidance ─────────────────────────────────────────
// NOTE: Program duration and pricing are not yet finalized — marked "Coming Soon"
// rather than invented. Curriculum modules reuse the real Career Blueprint/Compass
// mini-courses already in src/data/courses.ts.
export const careerGuidanceData: CourseLandingData = {
  slug: 'career-guidance',
  title: 'Career Guidance & Mentorship Program',
  shortTitle: 'Career Guidance',
  badge: 'Career Guidance Program',
  tagline: 'Growth as a Subscription',
  valueProposition: 'The smartest membership for the smartest people.',
  duration: 'Coming Soon',
  hours: 'Coming Soon',
  certification: 'Details Coming Soon',
  targetRoles: ['Freshers', 'Career Changers', 'Working Professionals', 'Engineers Moving to Management'],
  rating: 0,
  reviewCount: 0,
  heroStats: [
    { label: 'Format', value: '1:1 + Group Sessions' },
    { label: 'Mentor', value: 'Nitesh Prasad' },
    { label: 'Duration', value: 'Coming Soon' },
    { label: 'Pricing', value: 'Coming Soon' },
  ],
  trustItems: [
    { label: 'Career Clarity', icon: '🧭' },
    { label: 'Resume & Interview Prep', icon: '📄' },
    { label: 'Role Transition Roadmaps', icon: '🗺️' },
    { label: 'Mentor-Led Sessions', icon: '🎓' },
    { label: 'Real Case Studies', icon: '📊' },
  ],
  video: {
    title: 'Message From Founder',
    url: 'https://www.youtube.com/embed/RLuItlkv-dk?si=il9BfXPvYorUrg-L',
  },
  overview: {
    what: 'A personalized career guidance and mentorship program for anyone unsure which career path best aligns with their strengths — whether you\'re starting out, switching fields, or moving from a technical to a management role.',
    who: 'Ideal for freshers, career changers, working professionals, and engineers or graduates exploring roles like Product Manager, Project Manager, or Business Analyst.',
    why: 'Choosing the wrong career path costs time and money. This program gives you expert insight into each role, personalized guidance, and a clear view of certification and skill-building pathways before you commit.',
    outcomes: [
      'Get clarity on which career path fits your background and strengths',
      'Understand real entry and transition paths into Product, Project, and BA roles',
      'Build a personalized roadmap with skills and certification pathways',
      'Rework your resume and portfolio for your target role',
      '(Full list of outcomes will be published closer to launch)',
    ],
  },
  whatYouLearn: [
    'Career Guidance',
    'Role Overview',
    'Certification Pathways',
    'Career Transition',
    'Resume Building',
    'Interview Skills',
    'Career Options',
    'Skill Mapping',
  ],
  curriculum: [
    {
      title: 'Engineer-to-Management Career Breakthrough',
      topics: [
        'Top non-coding management roles for engineers',
        'PM, BA, Consultant, Program Manager — explained simply',
        'How to convert technical experience into leadership experience',
      ],
    },
    {
      title: 'BBA-to-Management Career Blueprint',
      topics: [
        'Top proven career paths after BBA',
        'PM, BA, HRBP, Marketing Manager, Consultant — explained',
        'What companies expect from BBA graduates',
      ],
    },
    {
      title: 'Graduate Career Compass (BA/BSc/BCom)',
      topics: [
        'High-growth roles for graduates',
        'PM, BA, DA, HR, UI/UX, and Operations — explained simply',
        'What companies actually want from graduates',
      ],
    },
    {
      title: 'Career Clarity for Confused Freshers',
      topics: [
        'High-growth career options for BA/BCom/BSc/BBA graduates',
        'Real salaries, demand, and growth for each career path',
        'Roadmap: skills and certifications for each career',
      ],
    },
  ],
  careerRoles: ['Product Manager', 'Project Manager', 'Business Analyst', 'Program Manager', 'Consultant'],
  certificationTimeline: ['Career Assessment Call', 'Personalized Roadmap', 'Skill-Building Sessions', 'Resume & Interview Prep'],
  instructor: {
    name: 'Nitesh Prasad',
    designation: 'Practice Consultant | TEDx Speaker',
    experience: '15+ Years Industry Experience',
    specialization: 'Career Mentorship, Agile Transformation, Product Management',
    photo: '/nitesh-prasad-career-guidance.jpg',
    linkedin: 'https://www.linkedin.com/in/nitesh-prasad-agile/',
  },
  whyLeanMultiverse: [
    { title: 'Experienced Mentor', description: 'Guidance from a practice consultant who has mentored 1,000+ professionals.', icon: '🎓' },
    { title: 'Real Case Studies', description: 'Learn from real transition stories, not generic advice.', icon: '📊' },
    { title: 'Practical Frameworks', description: 'Frameworks used by professionals at firms like Deloitte and JPMorgan.', icon: '🧠' },
    { title: 'Alumni Network', description: 'Join a growing community of professionals who\'ve made the transition.', icon: '🤝' },
  ],
  pricing: {
    fee: 'Coming Soon',
    inclusions: [
      'Personalized career assessment',
      'Role and skills roadmap',
      'Resume and interview guidance',
      '(Full inclusions list will be published at launch)',
    ],
  },
  faqs: [
    { question: 'Who is this program for?', answer: 'Freshers, career changers, and working professionals looking for clarity on which career path — Product, Project, Business Analysis, or management — fits them best.' },
    { question: 'Who is the mentor?', answer: 'Nitesh Prasad, a Practice Consultant and TEDx speaker who has mentored 1,000+ professionals transitioning into Product, Project, and AI roles.' },
    { question: 'When does the program launch?', answer: 'We\'re finalizing program details. Reach out via the form below to be notified as soon as enrollment opens.' },
    { question: 'How much will it cost?', answer: 'Pricing for the full mentorship program is being finalized. Individual career-clarity sessions are already available starting at ₹499 — see our Course Catalog above.' },
    { question: 'Is this a one-time session or ongoing mentorship?', answer: 'The program combines an initial assessment with ongoing guidance sessions, so you have support throughout your transition — not just a single call.' },
  ],
  metaTitle: 'Career Guidance & Mentorship | Lean Multiverse',
  metaDescription: 'Personalized career guidance and mentorship from Nitesh Prasad to help you find clarity on your next role in Product, Project, or Business Analysis. Program details coming soon.',
}

export const allCourseLandingData: Record<string, CourseLandingData> = {
  'fitness': fitnessData,
  'career-guidance': careerGuidanceData,
}
