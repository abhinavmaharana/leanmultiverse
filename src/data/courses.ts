// Course data interface
export interface Course {
  id: number
  title: string
  shortTitle: string
  subheading: string
  description: string
  category: string
  duration: string
  level: string
  rating: number
  learners: number
  price: number
  originalPrice?: number
  priceWithGST?: string
  isPopular: boolean
  isNew: boolean
  skills: string[]
  highlights: string[]
  university: string
  buttons: {
    primary: string
    secondary?: string
  }
  limitedSeats?: boolean
  discount?: string
}

// Course data
export const courses: Course[] = [
  {
    id: 1,
    title: "You are from technical, or non technical background, want to switch into management into position like Product management, Project management, Business Analysis and more.",
    shortTitle: "Webinar Registration",
    subheading: "Webinar • 4 Hour",
    description: "Get an exclusive preview into how to transform your current position and experience into becoming a Product Manager, Project Manager, and Business Analyst roles and more. Understand which career path best aligns with your strengths before you commit to a full certification.",
    category: "Webinar",
    duration: "4 Hour",
    level: "All Levels",
    rating: 4.9,
    learners: 0,
    price: 99,
    isPopular: true,
    isNew: true,
    skills: ["Career Guidance", "Role Overview", "Certification Pathways"],
    highlights: [
      "Expert insights into each role",
      "Personalized career guidance",
      "Overview of certification pathways"
    ],
    university: "Lean Multiverse",
    buttons: {
      primary: "Book Your Slot",
      secondary: "Talk to Expert"
    },
    limitedSeats: true
  },
  {
    id: 2,
    title: "Product Management Fundamentals",
    shortTitle: "Product Management Foundation",
    subheading: "Foundation Course • 3 Hours",
    description: "Build a strong foundation in Product Management. Learn how to define strategy, plan roadmaps, and collaborate effectively with teams. Perfect for beginners exploring and experienced experts into a PM role.",
    category: "Foundation Course",
    duration: "3 Hours",
    level: "Beginner",
    rating: 4.8,
    learners: 0,
    price: 2500,
    originalPrice: 5000,
    isPopular: true,
    isNew: false,
    skills: ["Product Strategy", "Roadmap Planning", "Team Collaboration"],
    highlights: [
      "Real-world Product Management role overview",
      "Hands-on demo with leading tools like Jira, Trello, and Miro",
      "Live, interactive foundation session with industry mentors",
      "₹5,000 discount on the advanced Product Management program"
    ],
    university: "Lean Multiverse",
    buttons: {
      primary: "Enroll Now",
      secondary: "Talk to Expert"
    },
    discount: "₹2,500 OFF"
  },
  {
    id: 3,
    title: "Project Management Fundamentals",
    shortTitle: "Project Management Foundation",
    subheading: "Foundation Course • 3 Hours",
    description: "Explore how real projects are planned, executed, and delivered. Learn core project management principles and frameworks before pursuing your PMI-aligned certification.",
    category: "Foundation Course",
    duration: "3 Hours",
    level: "Beginner",
    rating: 4.7,
    learners: 0,
    price: 2500,
    originalPrice: 5000,
    isPopular: true,
    isNew: false,
    skills: ["Agile", "Waterfall", "Hybrid", "MS Project", "Jira", "Asana"],
    highlights: [
      "Core Project Management concepts & frameworks (Agile, Waterfall, Hybrid)",
      "Practical exposure to tools like MS Project, Jira, and Asana",
      "Live instructor-led 3-hour foundation session",
      "₹5,000 discount on the advanced Project Management program"
    ],
    university: "Lean Multiverse",
    buttons: {
      primary: "Enroll Now",
      secondary: "Talk to Expert"
    },
    discount: "₹2,500 OFF"
  },
  {
    id: 4,
    title: "Business Analyst Fundamentals",
    shortTitle: "Business Analyst Foundation",
    subheading: "Foundation Course • 3 Hours",
    description: "Gain a complete understanding of the Business Analyst role — from requirement gathering to creating user stories and communicating with stakeholders.",
    category: "Foundation Course",
    duration: "3 Hours",
    level: "Beginner",
    rating: 4.8,
    learners: 0,
    price: 2500,
    originalPrice: 5000,
    isPopular: true,
    isNew: false,
    skills: ["Requirement Gathering", "User Stories", "Stakeholder Communication", "Jira", "Confluence", "Lucidchart"],
    highlights: [
      "Comprehensive introduction to the Business Analyst role",
      "Hands-on demo of requirement gathering and documentation techniques",
      "Exposure to tools like Jira, Confluence, and Lucidchart",
      "Real-world business case walkthrough with practical examples",
      "₹5,000 discount on the advanced BA program"
    ],
    university: "Lean Multiverse",
    buttons: {
      primary: "Enroll Now",
      secondary: "Talk to Expert"
    },
    discount: "₹2,500 OFF"
  },
  {
    id: 5,
    title: "Job Switch Mastery Program",
    shortTitle: "Job Switch Mastery Program",
    subheading: "Career Accelerator • 5 Hours",
    description: "Transform your career journey with a complete guide to switching jobs successfully. Learn to craft impactful resumes, optimize your profiles, and master interview techniques.",
    category: "Career Accelerator",
    duration: "5 Hours",
    level: "Professional",
    rating: 4.9,
    learners: 0,
    price: 5000,
    originalPrice: 10000,
    isPopular: true,
    isNew: true,
    skills: ["Resume Building", "LinkedIn Optimization", "Interview Preparation", "Profile Optimization"],
    highlights: [
      "Resume building from scratch",
      "LinkedIn & Naukri optimization",
      "100+ interview questions & answers",
      "Crack interviews with proven strategies"
    ],
    university: "Lean Multiverse",
    buttons: {
      primary: "Enroll Now",
      secondary: "Talk to Expert"
    },
    discount: "₹5,000 OFF"
  },
  {
    id: 6,
    title: "Product Management with SAFe®, Scaled Agile & Scrum org Reference",
    shortTitle: "Product Management (SAFe, Scrum Alliance & Scrum org Reference)",
    subheading: "Professional Course • 2 Days",
    description: "Master the complete product lifecycle aligned with SAFe® Agile principles. Learn roadmap planning, backlog prioritization, and release management from industry experts.",
    category: "Professional Course",
    duration: "2 Days",
    level: "Professional",
    rating: 4.9,
    learners: 0,
    price: 5000,
    originalPrice: 10000,
    isPopular: true,
    isNew: false,
    skills: ["SAFe®", "Scrum Alliance", "Scrum org", "Roadmap Planning", "Backlog Prioritization", "Release Management"],
    highlights: [
      "2-day live instructor-led training",
      "Hands-on case studies & practical exercises",
      "Gain a verified Lean Multiverse certificate aligned with industry frameworks"
    ],
    university: "Lean Multiverse",
    buttons: {
      primary: "Enroll Now",
      secondary: "Talk to Expert"
    },
    discount: "₹5,000 OFF"
  },
  {
    id: 7,
    title: "Project Management with PMI® Reference",
    shortTitle: "Project Management (PMI Reference)",
    subheading: "Professional Course • 2 Days",
    description: "Develop a strong understanding of PMI-aligned frameworks. Learn professional project planning, execution, risk control, and stakeholder communication.",
    category: "Professional Course",
    duration: "2 Days",
    level: "Professional",
    rating: 4.8,
    learners: 0,
    price: 5000,
    originalPrice: 10000,
    isPopular: true,
    isNew: false,
    skills: ["PMI®", "Project Planning", "Risk Control", "Stakeholder Communication", "Execution"],
    highlights: [
      "2 days of live expert-led sessions",
      "PMI-based process framework overview",
      "Receive a Lean Multiverse Course Completion Certificate validating your learning"
    ],
    university: "Lean Multiverse",
    buttons: {
      primary: "Enroll Now",
      secondary: "Talk to Expert"
    },
    discount: "₹5,000 OFF"
  },
  {
    id: 8,
    title: "Business Analyst with IIBA® Reference",
    shortTitle: "Business Analyst (IIBA Reference)",
    subheading: "Professional Course • 2 Days",
    description: "Learn the principles of business analysis aligned with IIBA standards. Gain expertise in requirement documentation, stakeholder mapping, and business process improvement.",
    category: "Professional Course",
    duration: "2 Days",
    level: "Professional",
    rating: 4.9,
    learners: 0,
    price: 5000,
    originalPrice: 10000,
    isPopular: true,
    isNew: false,
    skills: ["IIBA®", "Requirement Documentation", "Stakeholder Mapping", "Business Process Improvement"],
    highlights: [
      "2 days of guided live training",
      "Real-world project simulations",
      "Earn a Lean Multiverse Certificate of Achievement"
    ],
    university: "Lean Multiverse",
    buttons: {
      primary: "Enroll Now",
      secondary: "Talk to Expert"
    },
    discount: "₹5,000 OFF"
  },
  {
    id: 9,
    title: "Product Management + Job Switch Mastery",
    shortTitle: "Product Management + Job Switch",
    subheading: "Dual Program • 2 Days",
    description: "Get the best of both worlds, learn product management concepts with real-world application and master how to switch or advance your career with confidence.",
    category: "Dual Program",
    duration: "2 Days",
    level: "Professional",
    rating: 4.9,
    learners: 0,
    price: 8000,
    originalPrice: 20000,
    isPopular: true,
    isNew: true,
    skills: ["Product Management", "Career Transition", "Interview Preparation"],
    highlights: [
      "Product Management foundation aligned with SAFe® reference",
      "Resume & LinkedIn optimization training",
      "100+ interview Q&A discussion",
      "Career guidance from industry mentors"
    ],
    university: "Lean Multiverse",
    buttons: {
      primary: "Enroll Now",
      secondary: "Talk to Expert"
    },
    discount: "₹12,000 OFF"
  },
  {
    id: 10,
    title: "Project Management + Job Switch Mastery",
    shortTitle: "Project Management + Job Switch",
    subheading: "Dual Program • 2 Days",
    description: "Upskill with PMI-aligned project management practices while learning how to build a powerful professional profile and confidently switch jobs.",
    category: "Dual Program",
    duration: "2 Days",
    level: "Professional",
    rating: 4.8,
    learners: 0,
    price: 8000,
    originalPrice: 20000,
    isPopular: true,
    isNew: true,
    skills: ["Project Management", "Career Transition", "Interview Preparation"],
    highlights: [
      "Project Management basics aligned with PMI® framework",
      "Resume & Naukri profile optimization",
      "100+ interview Q&A preparation",
      "Career transition roadmap guidance"
    ],
    university: "Lean Multiverse",
    buttons: {
      primary: "Enroll Now",
      secondary: "Talk to Expert"
    },
    discount: "₹12,000 OFF"
  },
  {
    id: 11,
    title: "Business Analyst + Job Switch Mastery",
    shortTitle: "Business Analyst + Job Switch",
    subheading: "Dual Program • 2 Days",
    description: "Combine practical business analysis skills with career growth strategies. Learn IIBA-aligned BA fundamentals and job-switching techniques that get results.",
    category: "Dual Program",
    duration: "2 Days",
    level: "Professional",
    rating: 4.9,
    learners: 0,
    price: 8000,
    originalPrice: 20000,
    isPopular: true,
    isNew: true,
    skills: ["Business Analysis", "Career Transition", "Interview Preparation"],
    highlights: [
      "Business Analysis concepts aligned with IIBA® standards",
      "Resume & LinkedIn enhancement workshop",
      "100+ interview preparation questions",
      "Career mentoring and guidance"
    ],
    university: "Lean Multiverse",
    buttons: {
      primary: "Enroll Now",
      secondary: "Talk to Expert"
    },
    discount: "₹12,000 OFF"
  }
]

export const categories = ["All", "Webinar", "Foundation Course", "Professional Course", "Career Accelerator", "Dual Program"]
export const levels = ["All", "All Levels", "Beginner", "Professional"]
