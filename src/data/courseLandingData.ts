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

// ─── POPM ────────────────────────────────────────────────
export const popmData: CourseLandingData = {
  slug: 'popm',
  title: 'AI-Integrated Product Owner / Product Manager (POPM)',
  shortTitle: 'AI-Integrated POPM',
  badge: 'Certified',
  tagline: 'AI-Integrated Product Owner / Product Manager (POPM) helps you to become a Certified Product Owner capable of leading Agile Release Trains.',
  valueProposition: 'Master enterprise-scale Agile product ownership — from backlog to PI Planning — and earn your globally recognised POPM certification.',
  duration: '2 Days',
  hours: '15–16 Hours',
  certification: 'Industry recognised POPM Certification',
  targetRoles: ['Product Owner', 'Product Manager', 'Business Analyst', 'Requirements Engineer', 'Agile Project Manager'],
  rating: 4.9,
  reviewCount: 142,
  heroStats: [
    { label: 'Duration', value: '2 Days' },
    { label: 'Hours', value: '15–16 Hrs' },
    { label: 'Certification', value: 'Industry recognised POPM Certification' },
    { label: 'Learners', value: '1,000+' },
  ],
  trustItems: [
    { label: 'Certified', icon: '🏅' },
    { label: 'Enterprise Ready', icon: '🏢' },
    { label: 'Hands-on Workshops', icon: '🛠️' },
    { label: 'Industry Trainers', icon: '👨‍🏫' },
    { label: 'Live Sessions', icon: '🎥' },
  ],
  overview: {
    what: 'The POPM course is a 2-day immersive program designed to prepare Product Owners and Product Managers to thrive in enterprise Agile environments powered by the Scaled Agile Framework ().',
    who: 'Ideal for Product Owners, Product Managers, Business Analysts, Requirements Engineers, and Agile Project Managers who work in or want to join large-scale Agile organisations.',
    why: 'Enterprise organisations are increasingly adopting to scale Agile across multiple teams. A POPM certification validates your ability to define product vision, manage backlogs, and collaborate within Agile Release Trains.',
    outcomes: [
      'Lead Agile Release Trains as a certified Product Owner',
      'Define and communicate a compelling Product Vision',
      'Create and manage Program Backlogs effectively',
      'Master PI Planning and iteration execution',
      'Apply WSJF to prioritise business value',
      'Write high-quality Epics, Features, and User Stories',
    ],
  },
  whatYouLearn: [
    'Product Vision',
    'PI Planning',
    'Program Backlog',
    'Epics & Features',
    'User Stories',
    'WSJF Prioritisation',
    'Agile Release Trains',
    'Iteration Execution',
    'Backlog Management',
    'Customer Centricity',
    'Value Stream Mapping',
    'Principles',
  ],
  curriculum: [
    {
      title: 'Module 1 — Introduction to',
      topics: ['What is and why enterprises adopt it', 'principles and values', 'Roles in: PO vs PM vs RTE', 'The Agile Release Train (ART) explained'],
    },
    {
      title: 'Module 2 — Product Vision & Strategy',
      topics: ['Defining and communicating Product Vision', 'Customer-centric thinking in', 'Value Streams and Solution Context', 'Vision → Roadmap → Backlog alignment'],
    },
    {
      title: 'Module 3 — PI Planning',
      topics: ['What is a Program Increment (PI)?', 'PI Planning ceremony structure', 'Team and Program objectives', 'Risks, dependencies, and confidence votes'],
    },
    {
      title: 'Module 4 — Backlog Management',
      topics: ['Program Backlog vs Team Backlog', 'Writing Epics, Features, and Stories', 'Acceptance criteria and Definition of Done', 'Iteration planning and execution'],
    },
    {
      title: 'Module 5 — WSJF Prioritisation',
      topics: ['Weighted Shortest Job First (WSJF) formula', 'Cost of Delay components', 'Prioritising the Program Backlog', 'Practical WSJF workshop'],
    },
    {
      title: 'Module 6 — Certification Preparation',
      topics: ['Exam format and structure (90-minute online)', 'Sample questions and key concepts review', 'Tips for the POPM exam', 'Post-certification career roadmap'],
    },
  ],
  careerRoles: ['Product Owner', 'Product Manager', 'Business Analyst', 'Requirements Engineer', 'Agile Project Manager', 'Scrum Master'],
  certificationTimeline: ['2-Day Live Training', '1–2 Weeks Self-Study', '90-Minute Certification Exam', 'POPM Badge'],
  instructor: {
    name: 'Nitesh Prasad',
    designation: 'Practice Consultant | TEDx Speaker',
    experience: '15+ Years Industry Experience',
    specialization: ', Agile Transformation, Product Management',
    photo: '/nitesh-prasad-updated-pic.png',
    linkedin: 'https://www.linkedin.com/in/nitesh-prasad-agile/',
  },
  whyLeanMultiverse: [
    { title: 'Enterprise Trainers', description: 'Learn from practitioners who have led transformations at Fortune 500 companies.', icon: '🏢' },
    { title: 'Interactive Workshops', description: 'Hands-on exercises and real-world simulations, not just lectures.', icon: '🛠️' },
    { title: 'Certification Support', description: 'Dedicated exam prep materials and mock tests included.', icon: '🎓' },
    { title: 'Real Case Studies', description: 'Work through actual PI Planning scenarios from enterprise environments.', icon: '📊' },
    { title: 'Career Guidance', description: 'Post-certification guidance on roles, resumes, and salary negotiation.', icon: '🚀' },
    { title: 'Small Batch Learning', description: 'Limited cohort sizes ensure personalised attention and better outcomes.', icon: '👥' },
    { title: 'Industry Best Practices', description: 'Content aligned with the latest 6.0 framework updates.', icon: '✅' },
    { title: 'Lifetime Alumni Access', description: 'Join a network of 1,000+ certified professionals across industries.', icon: '🤝' },
  ],
  pricing: {
    fee: '₹35,000',
    originalFee: '₹45,000',
    inclusions: [
      'Official POPM Course Materials',
      '2-Day Live Instructor-Led Training',
      'Certification Exam Voucher',
      'Hands-on Workshop Exercises',
      'PI Planning Simulation',
      'Certificate of Completion',
      'Post-Training Support',
      'Alumni Community Access',
    ],
    emiNote: 'EMI options available from ₹3,500/month',
  },
  faqs: [
    { question: 'Who should attend this course?', answer: 'Product Owners, Product Managers, Business Analysts, Requirements Engineers, and Agile Project Managers who work in or aspire to join enterprise Agile organisations.' },
    { question: 'Are there any prerequisites?', answer: 'No formal prerequisites. A basic familiarity with Agile or Scrum concepts is helpful but not mandatory.' },
    { question: 'What certification do I receive?', answer: 'Upon passing the online exam, you receive the official 6 Product Owner / Product Manager (POPM) certification from Scaled Agile, Inc.' },
    { question: 'Is the training online or in-person?', answer: 'We offer both live online (virtual) and in-person options. All sessions are instructor-led with real-time interaction.' },
    { question: 'How long is the exam?', answer: 'The POPM certification exam is 90 minutes with 45 multiple-choice questions. A score of 73% or above is required to pass.' },
    { question: 'What is the exam format?', answer: 'Online, open-book exam taken through the Scaled Agile community portal after training. You receive 1 attempt included in the course fee.' },
    { question: 'Will I get a recording of the sessions?', answer: 'Yes, all virtual sessions are recorded and available to participants for 30 days post-training.' },
    { question: 'Do you offer corporate group training?', answer: 'Absolutely. We offer customised group training for teams of 5 or more with special pricing. Contact us for details.' },
    { question: 'What is your refund policy?', answer: 'Full refund available up to 7 days before the training date. Please refer to our Refund Policy page for complete details.' },
  ],
  metaTitle: 'POPM Certification Training | Lean Multiverse',
  metaDescription: 'Get Product Owner / Product Manager (POPM) certified in 2 days. Live instructor-led training with hands-on PI Planning workshops. Trusted by enterprise teams.',
}

// ─── Scrum ───────────────────────────────────────────────────
export const scrumData: CourseLandingData = {
  slug: 'scrum',
  title: 'AI-Integrated Certified Scrum Training',
  shortTitle: 'AI-Integrated Scrum Certification',
  badge: 'Scrum',
  tagline: 'AI-Integrated Certified Scrum Training helps you to Master the Scrum Framework and become a certified Agile practitioner.',
  valueProposition: 'Learn Scrum from the ground up — roles, events, artifacts, and servant leadership — and earn an industry-recognised Scrum certification.',
  duration: '2 Days',
  hours: '14–16 Hours',
  certification: 'Industry recognised Scrum Certification',
  targetRoles: ['Scrum Master', 'Agile Coach', 'Delivery Lead', 'Team Facilitator', 'Product Owner', 'Developer'],
  rating: 4.9,
  reviewCount: 218,
  heroStats: [
    { label: 'Duration', value: '2 Days' },
    { label: 'Hours', value: '14–16 Hrs' },
    { label: 'Certification', value: 'Industry recognised Scrum Certification' },
    { label: 'Learners', value: '2,500+' },
  ],
  trustItems: [
    { label: 'Scrum Alliance', icon: '🏅' },
    { label: 'Enterprise Ready', icon: '🏢' },
    { label: 'Hands-on Sprints', icon: '🛠️' },
    { label: 'Expert Facilitators', icon: '👨‍🏫' },
    { label: 'Live Sessions', icon: '🎥' },
  ],
  overview: {
    what: 'A 2-day intensive Scrum training program that covers the complete Scrum Guide — from foundational theory to advanced facilitation techniques. Practical simulations make every concept stick.',
    who: 'Ideal for Scrum Masters, Agile Coaches, Delivery Leads, Team Facilitators, and anyone transitioning into an Agile team role.',
    why: 'Scrum is the world\'s most widely adopted Agile framework. A Scrum certification demonstrates your ability to facilitate high-performing teams, run effective ceremonies, and drive continuous improvement.',
    outcomes: [
      'Understand and apply the complete Scrum framework',
      'Facilitate Sprint Planning, Daily Scrums, Reviews, and Retrospectives',
      'Coach teams with a servant leadership mindset',
      'Manage and refine the Product Backlog effectively',
      'Apply empirical process control to complex problems',
      'Earn an internationally recognised Scrum certification',
    ],
  },
  whatYouLearn: [
    'Scrum Framework',
    'Scrum Roles',
    'Scrum Events',
    'Sprint Planning',
    'Daily Scrum',
    'Sprint Review',
    'Sprint Retrospective',
    'Product Backlog',
    'Sprint Backlog',
    'Increment & DoD',
    'Servant Leadership',
    'Empirical Process Control',
  ],
  curriculum: [
    {
      title: 'Module 1 — Agile Foundations & Scrum Theory',
      topics: ['Agile Manifesto and 12 principles', 'Empiricism: transparency, inspection, adaptation', 'Why Scrum? Comparing Agile frameworks', 'Scrum values: commitment, focus, openness, respect, courage'],
    },
    {
      title: 'Module 2 — Scrum Roles',
      topics: ['The Scrum Master: servant leader and coach', 'The Product Owner: vision, backlog, and prioritisation', 'The Developers: self-managing and cross-functional teams', 'Interactions between roles'],
    },
    {
      title: 'Module 3 — Scrum Events',
      topics: ['The Sprint as a container for all events', 'Sprint Planning: what and how', 'Daily Scrum: inspect and adapt daily', 'Sprint Review: stakeholder collaboration'],
    },
    {
      title: 'Module 4 — Sprint Retrospective & Continuous Improvement',
      topics: ['Facilitating effective retrospectives', 'Identifying improvements and action items', 'Working agreements and team health', 'Psychological safety in Agile teams'],
    },
    {
      title: 'Module 5 — Scrum Artifacts',
      topics: ['Product Backlog and refinement techniques', 'Sprint Backlog and the Sprint Goal', 'Increment and Definition of Done', 'Managing technical debt'],
    },
    {
      title: 'Module 6 — Certification Preparation',
      topics: ['Exam format and structure review', 'Sample questions and key concept drills', 'Practical scenarios and case studies', 'Post-certification career pathways'],
    },
  ],
  careerRoles: ['Scrum Master', 'Agile Coach', 'Delivery Lead', 'Team Facilitator', 'Product Owner', 'Agile Project Manager'],
  certificationTimeline: ['2-Day Live Training', 'Certification Exam', 'Scrum Certificate', 'Career Growth'],
  instructor: {
    name: 'Nitesh Prasad',
    designation: 'Certified Scrum Trainer | Agile Coach',
    experience: '15+ Years Industry Experience',
    specialization: 'Scrum,, Agile Coaching, Team Facilitation',
    photo: '/nitesh-prasad-updated-pic.png',
    linkedin: 'https://www.linkedin.com/in/nitesh-prasad-agile/',
  },
  whyLeanMultiverse: [
    { title: 'Certified Trainers', description: 'Instructors with real-world Scrum Master and Agile Coach experience at MNCs.', icon: '🏅' },
    { title: 'Immersive Simulations', description: 'Run a full Sprint simulation across both days — not just theory.', icon: '🛠️' },
    { title: 'Certification Included', description: 'Exam fee and preparation materials are bundled in the course.', icon: '🎓' },
    { title: 'Real Team Scenarios', description: 'Learn to handle dysfunction, conflict, and impediments through case studies.', icon: '📊' },
    { title: 'Servant Leadership Focus', description: 'Go beyond mechanics — develop the mindset of a high-impact Scrum Master.', icon: '🤝' },
    { title: 'Small Cohorts', description: 'Maximum 20 participants per cohort for a high-touch learning experience.', icon: '👥' },
    { title: 'Latest Scrum Guide', description: 'Training aligned with the Scrum Guide 2020 (most current version).', icon: '✅' },
    { title: 'Alumni Network', description: 'Join a growing community of 2,500+ Scrum practitioners.', icon: '🌐' },
  ],
  pricing: {
    fee: '₹35,000',
    originalFee: '₹45,000',
    inclusions: [
      'Complete Scrum Course Materials',
      '2-Day Live Instructor-Led Training',
      'Certification Exam Voucher',
      'Sprint Simulation Exercises',
      'Facilitation Technique Toolkit',
      'Certificate of Completion',
      'Post-Training Q&A Support',
      'Alumni Community Access',
    ],
    emiNote: 'EMI options available from ₹2,500/month',
  },
  faqs: [
    { question: 'Who should attend this Scrum course?', answer: 'Scrum Masters, Agile Coaches, Delivery Leads, Team Facilitators, and anyone moving into an Agile team role. No prior experience required.' },
    { question: 'Do I need any prior Agile knowledge?', answer: 'No prerequisites. This course starts from Agile fundamentals and builds up to advanced Scrum facilitation skills.' },
    { question: 'What certification will I receive?', answer: 'You will receive an industry-recognised Scrum certification upon successful completion of the exam. Details shared during enrollment.' },
    { question: 'Is the training available online?', answer: 'Yes. We offer fully live virtual training with the same interactive experience as in-person sessions.' },
    { question: 'How long is the Scrum certification exam?', answer: 'The exam is typically 60 minutes with multiple-choice questions. Format details vary by certification body.' },
    { question: 'Will I get session recordings?', answer: 'Yes, all virtual sessions are recorded and accessible for 30 days post-training.' },
    { question: 'Is this recognised globally?', answer: 'Yes. Scrum certifications are globally recognised and valued across all industries that use Agile delivery.' },
    { question: 'Can my entire team attend together?', answer: 'Absolutely. Group enrollments of 5+ get special pricing and a customised experience. Contact us to discuss.' },
    { question: 'What is the refund policy?', answer: 'Full refund up to 7 days before the training date. See our Refund Policy for full details.' },
  ],
  metaTitle: 'Scrum Certification Training | Lean Multiverse',
  metaDescription: 'Get Scrum certified in 2 days with live instructor-led training. Master Sprint Planning, Daily Scrums, Retrospectives, and servant leadership. Globally recognised.',
}

// ─── APM ────────────────────────────────────────────────
export const apmData: CourseLandingData = {
  slug: 'apm',
  title: 'AI-Integrated Agile Product Management (APM)',
  shortTitle: 'AI-Integrated APM',
  badge: 'Certified',
  tagline: 'AI-Integrated Agile Product Management (APM) helps you to drive Customer-Centric Product Strategy at Enterprise Scale.',
  valueProposition: 'Master Design Thinking, Continuous Exploration, and value stream economics to lead product strategy across large enterprises.',
  duration: '3 Days',
  hours: '~24 Hours',
  certification: 'Industry recognised APM Certification',
  targetRoles: ['Product Manager', 'Senior Product Manager', 'Portfolio Manager', 'Business Owner', 'UX Professional'],
  rating: 4.9,
  reviewCount: 89,
  heroStats: [
    { label: 'Duration', value: '3 Days' },
    { label: 'Hours', value: '~24 Hrs' },
    { label: 'Certification', value: 'Industry recognised APM Certification' },
    { label: 'Learners', value: '500+' },
  ],
  trustItems: [
    { label: 'Certified', icon: '🏅' },
    { label: 'Enterprise Strategy', icon: '🏢' },
    { label: 'Design Thinking', icon: '🎨' },
    { label: 'Expert Coaches', icon: '👨‍🏫' },
    { label: 'Live Sessions', icon: '🎥' },
  ],
  overview: {
    what: 'The APM course is a 3-day advanced program for product leaders who want to drive customer-centric product strategy at scale. You will learn Design Thinking, Continuous Exploration, market segmentation, and value stream economics within the context.',
    who: 'Designed for Product Managers, Senior Product Managers, Portfolio Managers, Business Owners, and UX Professionals who own or influence product direction in enterprise Agile organisations.',
    why: 'As enterprises scale Agile, the need for strategic product leadership grows. APM goes beyond backlog management — it equips you to align product strategy with business outcomes, drive innovation through hypothesis-driven development, and make economics-informed decisions.',
    outcomes: [
      'Apply Design Thinking and customer empathy at enterprise scale',
      'Define product strategy, roadmaps, and market positioning',
      'Lead Continuous Exploration and hypothesis-driven development',
      'Understand value stream economics, pricing, and licensing',
      'Collaborate across ARTs to deliver end-to-end customer value',
      'Earn the APM certification from Scaled Agile, Inc.',
    ],
  },
  whatYouLearn: [
    'Design Thinking',
    'Customer Empathy',
    'Market Segmentation',
    'Product Strategy',
    'Product Roadmaps',
    'Hypothesis-Driven Dev',
    'Continuous Exploration',
    'Value Stream Economics',
    'Pricing Strategy',
    'Licensing Models',
    'Portfolio Alignment',
    'Innovation Accounting',
  ],
  curriculum: [
    {
      title: 'Module 1 — Customer Centricity & Design Thinking',
      topics: ['Human-centred design principles', 'Empathy mapping and customer personas', 'Jobs to be Done (JTBD) framework', 'Problem framing and opportunity identification'],
    },
    {
      title: 'Module 2 — Market Research & Segmentation',
      topics: ['Market segmentation strategies', 'Competitive analysis techniques', 'Customer discovery and validation', 'Identifying product-market fit signals'],
    },
    {
      title: 'Module 3 — Product Strategy & Vision',
      topics: ['Crafting a compelling product vision', 'Strategy-to-execution alignment in', 'Strategic themes and portfolio alignment', 'Product roadmapping for enterprise contexts'],
    },
    {
      title: 'Module 4 — Continuous Exploration',
      topics: ['The Continuous Exploration cycle', 'Hypothesis-driven development (HDD)', 'Build-Measure-Learn in enterprise Agile', 'Connecting customer insights to the Program Backlog'],
    },
    {
      title: 'Module 5 — Value Stream Economics',
      topics: ['Understanding value streams in', 'Lean economics and cost of delay', 'Pricing models: subscription, freemium, usage-based', 'Licensing strategies for software products'],
    },
    {
      title: 'Module 6 — Certification Preparation',
      topics: ['APM exam format: 120-minute online exam', 'Key concepts and vocabulary review', 'Sample questions and practice scenarios', 'Career paths after APM certification'],
    },
  ],
  careerRoles: ['Product Manager', 'Senior Product Manager', 'Portfolio Manager', 'Business Owner', 'UX Lead', 'Head of Product'],
  certificationTimeline: ['3-Day Live Training', '1–2 Weeks Self-Study', '120-Minute Certification Exam', 'APM Badge'],
  instructor: {
    name: 'Nitesh Prasad',
    designation: 'Practice Consultant | Product Strategy Expert',
    experience: '15+ Years Industry Experience',
    specialization: 'APM, Design Thinking, Product Strategy, Innovation',
    photo: '/nitesh-prasad-updated-pic.png',
    linkedin: 'https://www.linkedin.com/in/nitesh-prasad-agile/',
  },
  whyLeanMultiverse: [
    { title: 'Strategic Focus', description: 'Go beyond features — learn to shape markets, pricing, and innovation pipelines.', icon: '🎯' },
    { title: 'Design Thinking Labs', description: 'Hands-on customer empathy and prototyping exercises built into the curriculum.', icon: '🎨' },
    { title: 'Certification Included', description: 'APM exam voucher and prep materials bundled with the course.', icon: '🎓' },
    { title: 'Enterprise Case Studies', description: 'Real examples from Fortune 500 product transformations.', icon: '📊' },
    { title: 'Career Coaching', description: 'Post-certification guidance for senior PM roles and salary advancement.', icon: '🚀' },
    { title: 'Expert Peer Network', description: 'Learn alongside Senior PMs and Business Owners from top companies.', icon: '🤝' },
    { title: '6.0 Aligned', description: 'Fully up-to-date with the latest framework and APM course content.', icon: '✅' },
    { title: 'Executive-Level Framing', description: 'Communicate strategy, value, and outcomes in the language of leadership.', icon: '📈' },
  ],
  pricing: {
    fee: '₹1,50,000',
    originalFee: '₹1,80,000',
    inclusions: [
      'Official APM Course Materials',
      '3-Day Live Instructor-Led Training',
      'APM Certification Exam Voucher',
      'Design Thinking Workshop',
      'Product Strategy Canvas Templates',
      'Certificate of Completion',
      'Post-Training Coaching Session',
      'Alumni Community Access',
    ],
    emiNote: 'EMI options available from ₹15,000/month',
  },
  faqs: [
    { question: 'Who should attend the APM course?', answer: 'Product Managers, Senior Product Managers, Portfolio Managers, Business Owners, and UX Professionals who define product direction in enterprise Agile organisations.' },
    { question: 'Is there a prerequisite for this course?', answer: 'Familiarity with Agile or basics is recommended. Having prior POPM experience is beneficial but not mandatory.' },
    { question: 'What certification do I receive?', answer: 'Upon passing the 120-minute exam, you earn the official 6 Agile Product Manager (APM) certification from Scaled Agile, Inc.' },
    { question: 'Is the training available online?', answer: 'Yes. We offer live virtual sessions with the same interactive quality as in-person, including design thinking workshops.' },
    { question: 'How long is the APM exam?', answer: 'The exam is 120 minutes with 60 multiple-choice questions. A passing score of 73% or above is required.' },
    { question: 'Are recordings available post-training?', answer: 'Yes. Recordings of all virtual sessions are accessible for 30 days after the training date.' },
    { question: 'How is APM different from POPM?', answer: 'POPM focuses on backlog and ART-level execution. APM is strategic — covering market research, design thinking, roadmapping, pricing, and innovation at portfolio scale.' },
    { question: 'Do you offer corporate group training for APM?', answer: 'Yes. Customised group training for Senior PM and Leadership teams is available. Contact us for pricing and scheduling.' },
    { question: 'What is the refund policy?', answer: 'Full refund available up to 7 days before the training start date. See our Refund Policy for complete terms.' },
  ],
  metaTitle: 'Agile Product Management (APM) Training | Lean Multiverse',
  metaDescription: 'Get APM certified in 3 days. Master Design Thinking, Continuous Exploration, and Value Stream Economics. Trusted by Senior PMs and Portfolio Managers.',
}

export const allCourseLandingData: Record<string, CourseLandingData> = {
  'popm': popmData,
  'scrum': scrumData,
  'apm': apmData,
}
