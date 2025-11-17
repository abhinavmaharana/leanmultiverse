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
  targetAudience?: "freshers" | "working-professional" | "everyone"
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
    limitedSeats: true,
    targetAudience: "everyone"
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
    discount: "₹2,500 OFF",
    targetAudience: "everyone"
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
    discount: "₹2,500 OFF",
    targetAudience: "everyone"
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
    discount: "₹2,500 OFF",
    targetAudience: "everyone"
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
    discount: "₹5,000 OFF",
    targetAudience: "working-professional"
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
    discount: "₹5,000 OFF",
    targetAudience: "everyone"
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
    discount: "₹5,000 OFF",
    targetAudience: "everyone"
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
    discount: "₹5,000 OFF",
    targetAudience: "everyone"
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
    discount: "₹12,000 OFF",
    targetAudience: "working-professional"
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
    discount: "₹12,000 OFF",
    targetAudience: "working-professional"
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
    discount: "₹12,000 OFF",
    targetAudience: "working-professional"
  },
  // ₹500 Courses
  {
    id: 12,
    title: "Product Sprint: Freshers to Product Management",
    shortTitle: "Product Sprint: Freshers to PM",
    subheading: "₹500 Courses • Beginner",
    description: "Start your journey into Product Management with this comprehensive course designed for freshers. Learn product thinking, GenAI for ideation, and build your first portfolio artifact.",
    category: "₹500 Courses",
    duration: "Self-paced",
    level: "Beginner",
    rating: 4.8,
    learners: 0,
    price: 500,
    isPopular: true,
    isNew: true,
    skills: ["Product Management", "Design Thinking", "GenAI", "Trello", "Miro", "Portfolio Building"],
    highlights: [
      "What is Product Management? Product vs Project vs BA",
      "Types of Product Managers (Tech/Non-Tech/Data/Product Ops)",
      "Beginner Product Thinking with Design Thinking Lite",
      "GenAI for Product Ideation using ChatGPT",
      "Industry Tools Preview: Trello, Miro",
      "Mini-Portfolio Task: Ideate and blueprint a digital product"
    ],
    university: "Lean Multiverse",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "freshers"
  },
  {
    id: 13,
    title: "Level-Up: Working Professionals to Product Management",
    shortTitle: "Level-Up: Working Professionals to PM",
    subheading: "₹500 Courses • Professional",
    description: "Transition from your current role to Product Management. Learn to map your existing skills to PM must-haves, understand Agile & Scrum, and accelerate your career transition.",
    category: "₹500 Courses",
    duration: "Self-paced",
    level: "Professional",
    rating: 4.9,
    learners: 0,
    price: 500,
    isPopular: true,
    isNew: true,
    skills: ["Career Transition", "Agile & Scrum", "Stakeholder Alignment", "Jira", "Productboard"],
    highlights: [
      "Transitioning to Product - Overcoming the 'Frozen Middle'",
      "Mapping current skills to PM must-haves",
      "Introduction to Agile & Scrum in Product",
      "Stakeholder Alignment with practical exercises",
      "Tools Deep-Dive: Jira, Productboard",
      "Career Ladder Assignment: Map your career story to PM competencies"
    ],
    university: "Lean Multiverse",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "working-professional"
  },
  {
    id: 14,
    title: "Project Launchpad: Fresher to Project Management",
    shortTitle: "Project Launchpad: Fresher to PM",
    subheading: "₹500 Courses • Beginner",
    description: "Begin your Project Management journey with this foundational course. Learn planning basics, communication drills, and run your first mini-project.",
    category: "₹500 Courses",
    duration: "Self-paced",
    level: "Beginner",
    rating: 4.7,
    learners: 0,
    price: 500,
    isPopular: true,
    isNew: true,
    skills: ["Project Management", "Waterfall", "Agile", "Hybrid", "WBS", "Gantt", "ClickUp"],
    highlights: [
      "What is Project Management? Waterfall vs Agile vs Hybrid",
      "Planning Basics: WBS, Gantt with free tools (ClickUp demo)",
      "Communication Drills: Mock email-writing, status updates",
      "Starter PM Toolkit: Run a mini-project (template provided)"
    ],
    university: "Lean Multiverse",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "freshers"
  },
  {
    id: 15,
    title: "Growth Path: Working Professional to Project Management",
    shortTitle: "Growth Path: Working Professional to PM",
    subheading: "₹500 Courses • Professional",
    description: "Leverage your professional experience to transition into Project Management. Learn Agile execution, modern PM tools, and risk management.",
    category: "₹500 Courses",
    duration: "Self-paced",
    level: "Professional",
    rating: 4.8,
    learners: 0,
    price: 500,
    isPopular: true,
    isNew: true,
    skills: ["Career Transition", "Agile Execution", "Jira", "Wrike", "Resource Allocation", "Risk Management"],
    highlights: [
      "Inventorying Your Managerial Skills - Translation to PM must-haves",
      "Agile Execution with Sprint simulation",
      "Tools for Professionals: Jira, Wrike demo; resource allocation basics",
      "Risk Spotting with mini-case study assignment"
    ],
    university: "Lean Multiverse",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "working-professional"
  },
  {
    id: 16,
    title: "Analyst Insights: Fresher to Business Analyst",
    shortTitle: "Analyst Insights: Fresher to BA",
    subheading: "₹500 Courses • Beginner",
    description: "Discover the Business Analyst role and start building essential BA skills. Learn core tools, requirements gathering, and communication fundamentals.",
    category: "₹500 Courses",
    duration: "Self-paced",
    level: "Beginner",
    rating: 4.8,
    learners: 0,
    price: 500,
    isPopular: true,
    isNew: true,
    skills: ["Business Analysis", "BA vs PM vs Product vs QA", "Lucidchart", "Microsoft Excel", "Requirements Gathering", "User Stories"],
    highlights: [
      "Role of a Business Analyst: BA vs PM vs Product vs QA",
      "Core BA Tools: Lucidchart, Microsoft Excel analyzer demo",
      "Requirements Gathering 101: Practical assignment on user story writing",
      "BA Communication: Email, documentation basics"
    ],
    university: "Lean Multiverse",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "freshers"
  },
  {
    id: 17,
    title: "Analyst Pro: Working Professional to Business Analyst",
    shortTitle: "Analyst Pro: Working Professional to BA",
    subheading: "₹500 Courses • Professional",
    description: "Transition your professional experience into a Business Analyst role. Learn IIBA overview, modern BA tools, and advanced elicitation techniques.",
    category: "₹500 Courses",
    duration: "Self-paced",
    level: "Professional",
    rating: 4.9,
    learners: 0,
    price: 500,
    isPopular: true,
    isNew: true,
    skills: ["Career Transition", "IIBA Overview", "Agile BA", "JIRA", "Confluence", "Elicitation"],
    highlights: [
      "Leverage Prior Experience in BA: BA in Tech/Consulting/Banking contexts",
      "IIBA Overview & Agile BA: Practical frameworks preview",
      "Modern BA Tools: JIRA, Confluence walkthrough",
      "Elicitation Scenarios: Assignment with live case study"
    ],
    university: "Lean Multiverse",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "working-professional"
  },
  {
    id: 18,
    title: "Beyond B.Tech: Career Shifts from Engineer to Management",
    shortTitle: "Beyond B.Tech: Engineer to Management",
    subheading: "₹500 Courses • Professional",
    description: "Explore management career paths from engineering. Learn transition options, skill mapping, and find your perfect role fitment.",
    category: "₹500 Courses",
    duration: "Self-paced",
    level: "Professional",
    rating: 4.8,
    learners: 0,
    price: 500,
    isPopular: true,
    isNew: true,
    skills: ["Career Transition", "PM", "BA", "Consulting", "Skill Mapping", "Role Fitment"],
    highlights: [
      "Transition Options: PM, BA, Consulting, and more",
      "Skill-Mapping Interactive session",
      "Role Fitment Hackathon with peer and alumni examples"
    ],
    university: "Lean Multiverse",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "working-professional"
  },
  {
    id: 19,
    title: "From BBA to Manager: BBA to Top 5 Career options",
    shortTitle: "From BBA to Manager",
    subheading: "₹500 Courses • Beginner",
    description: "Discover top management career paths for BBA graduates. Learn entry management roles, practical caselets, and communication skills for managers.",
    category: "₹500 Courses",
    duration: "Self-paced",
    level: "Beginner",
    rating: 4.7,
    learners: 0,
    price: 500,
    isPopular: true,
    isNew: true,
    skills: ["Management Paths", "PM", "BA", "Ops", "Data Management", "Communication"],
    highlights: [
      "Entry Management Paths: PM, BA, Ops",
      "Practical Caselet: Managing with Data",
      "Communication for Managers with peer feedback task"
    ],
    university: "Lean Multiverse",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "everyone"
  },
  {
    id: 20,
    title: "Graduate Gateway: BBA/BSc/BCom Career options",
    shortTitle: "Graduate Gateway: Career options",
    subheading: "₹500 Courses • Beginner",
    description: "Explore modern career roles for graduates. Build your skill inventory and create a compelling career story to showcase to employers.",
    category: "₹500 Courses",
    duration: "Self-paced",
    level: "Beginner",
    rating: 4.7,
    learners: 0,
    price: 500,
    isPopular: true,
    isNew: true,
    skills: ["Career Exploration", "Product", "BA", "Project", "Ops", "Analytics", "Skill Inventory"],
    highlights: [
      "Exploring Modern Roles: Product, BA, Project, Ops, Analytics",
      "Skill Inventory Maker",
      "Career Story Assignment"
    ],
    university: "Lean Multiverse",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "everyone"
  },
  // ₹1500 Courses
  {
    id: 21,
    title: "Project Management Foundation: Agile to PMP",
    shortTitle: "Project Management Foundation",
    subheading: "₹1500 Courses • Professional",
    description: "Deep dive into project life cycle, methodologies, and tools. Learn Agile, SAFe, PMP perspectives with hands-on sprint simulation.",
    category: "₹1500 Courses",
    duration: "Comprehensive",
    level: "Professional",
    rating: 4.9,
    learners: 0,
    price: 1500,
    isPopular: true,
    isNew: true,
    skills: ["Agile", "SAFe", "PMP", "MS Project", "Jira", "Kanban", "Stakeholder Management", "Risk Management"],
    highlights: [
      "Project Life Cycle & Methodology Deep Dive: Agile, SAFe, PMP perspectives; modern hybrids",
      "Tools Examined: MS Project, Jira, Kanban boards",
      "Stakeholder & Risk Management (Templates provided)",
      "Sprint Simulation Assignment: Group project to plan and deliver a mini Agile project"
    ],
    university: "Lean Multiverse",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "everyone"
  },
  {
    id: 22,
    title: "Product Management Foundation: GenAI, Agile, & More",
    shortTitle: "Product Management Foundation",
    subheading: "₹1500 Courses • Professional",
    description: "Master PM frameworks, GenAI tools, and build your portfolio. Includes mock PM interviews with real company scenarios.",
    category: "₹1500 Courses",
    duration: "Comprehensive",
    level: "Professional",
    rating: 4.9,
    learners: 0,
    price: 1500,
    isPopular: true,
    isNew: true,
    skills: ["SAFe", "Scrum", "Agile", "Lean", "GenAI Tools", "PRD", "BRD", "Mock Interviews"],
    highlights: [
      "PM Frameworks Compared: SAFe, Scrum, Agile, Lean",
      "GenAI Tools for PM: Ideation, user feedback mining, roadmap building with AI",
      "Portfolio Builder: Create a product doc (PRD/BRD) using real tools",
      "Interview Loops: Mock PM interviews with real company scenarios"
    ],
    university: "Lean Multiverse",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "everyone"
  },
  {
    id: 23,
    title: "Business Analysis Foundation: IIBA, Agile, and Digital",
    shortTitle: "Business Analysis Foundation",
    subheading: "₹1500 Courses • Professional",
    description: "Master BA Body of Knowledge, digital tools, and process modeling. Build your BA portfolio with real-world assignments.",
    category: "₹1500 Courses",
    duration: "Comprehensive",
    level: "Professional",
    rating: 4.9,
    learners: 0,
    price: 1500,
    isPopular: true,
    isNew: true,
    skills: ["BABOK", "IIBA", "AWS", "PowerBI", "Jira", "Process Modeling", "Use Cases"],
    highlights: [
      "BA Body of Knowledge (BABOK/IIBA)",
      "Digital BA Tools: AWS, PowerBI, Jira",
      "Process Modeling & Use Case Writing",
      "Assignment: Model a digital business process"
    ],
    university: "Lean Multiverse",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "everyone"
  },
  // ₹4000 Courses (with Certification)
  {
    id: 24,
    title: "Certified Product Management with GenAI",
    shortTitle: "Certified Product Management with GenAI",
    subheading: "₹4000 Courses • Certification",
    description: "Master advanced PM frameworks and GenAI for product design. Build features with GenAI support and complete a capstone project for certification.",
    category: "₹4000 Courses",
    duration: "Certification Program",
    level: "Professional",
    rating: 4.9,
    learners: 0,
    price: 4000,
    isPopular: true,
    isNew: true,
    skills: ["SAFe", "Lean", "OKRs", "GenAI", "Product Design", "PowerBI", "Tableau", "Product Metrics"],
    highlights: [
      "Product Management Mastery: Deep dive into advanced practical frameworks (SAFe, Lean, OKRs)",
      "Using GenAI for Product Design: Live case - Build features with GenAI support",
      "Product Metrics & Analytics: PowerBI & Tableau for PMs",
      "Industry Simulation: Team-based product launch challenge",
      "Certification Assignment: Capstone + digital badge"
    ],
    university: "Lean Multiverse",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "everyone"
  },
  {
    id: 25,
    title: "Certified Project Management with GenAI",
    shortTitle: "Certified Project Management with GenAI",
    subheading: "₹4000 Courses • Certification",
    description: "Master SAFe, Agile, PMP with GenAI for execution. Plan and execute a complete project lifecycle with certification.",
    category: "₹4000 Courses",
    duration: "Certification Program",
    level: "Professional",
    rating: 4.9,
    learners: 0,
    price: 4000,
    isPopular: true,
    isNew: true,
    skills: ["SAFe", "Agile", "PMP", "GenAI", "Resource Planning", "Risk Detection", "MS Project", "Confluence"],
    highlights: [
      "SAFe, Agile, PMP Practice: Real-world mapping of frameworks",
      "Leveraging GenAI for Execution: Resource planning, risk detection auto-demo",
      "Project Analytics & Reporting: MS Project, Confluence deep-dive",
      "Live Simulation: Plan & execute a project lifecycle",
      "Certification Task: Full simulation with grading"
    ],
    university: "Lean Multiverse",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "everyone"
  },
  {
    id: 26,
    title: "Certified Business Analysis with GenAI",
    shortTitle: "Certified Business Analysis with GenAI",
    subheading: "₹4000 Courses • Certification",
    description: "Master advanced IIBA applications, automation, and process mining. Build a real-world BA portfolio with GenAI support.",
    category: "₹4000 Courses",
    duration: "Certification Program",
    level: "Professional",
    rating: 4.9,
    learners: 0,
    price: 4000,
    isPopular: true,
    isNew: true,
    skills: ["IIBA", "Automation", "Process Mining", "GenAI", "Requirements Gathering", "Lucidchart", "PowerBI", "AWS"],
    highlights: [
      "Advanced IIBA Applications",
      "Automation & Process Mining: Using GenAI for requirements gathering",
      "Digital Tool Mastery: Lucidchart, PowerBI, AWS hands-on",
      "Real-World Portfolio Assignment"
    ],
    university: "Lean Multiverse",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "everyone"
  },
  {
    id: 27,
    title: "Communication Mastery with Resume Building: Ace Your Resume and Interview",
    shortTitle: "Communication Mastery with Resume Building",
    subheading: "₹4000 Courses • Certification",
    description: "Master interview techniques, build compelling resumes, and ace your interviews. Includes roleplay labs and GenAI tools for communication.",
    category: "₹4000 Courses",
    duration: "Certification Program",
    level: "Professional",
    rating: 4.9,
    learners: 0,
    price: 4000,
    isPopular: true,
    isNew: true,
    skills: ["STAR", "CAR", "Behavioral Frameworks", "Resume Building", "Interview Skills", "GenAI", "Video Storytelling"],
    highlights: [
      "Interview Mindset Shift: STAR, CAR, and real-time behavioral frameworks",
      "Roleplay Labs: Video-based storytelling practice",
      "Toolkits for Communication: GenAI for resume and response building",
      "Assignment: Record & submit an interview pitch"
    ],
    university: "Lean Multiverse",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "everyone"
  },
  // ₹6000 Courses
  {
    id: 28,
    title: "Product Management Elite: PM + Interview Skills and Resume Building",
    shortTitle: "Product Management Elite",
    subheading: "₹6000 Courses • Elite Program",
    description: "Advanced PM case masterclass with real employer panels, portfolio accelerator, and placement lab. Includes SAFe POPM, Scrum & RTE certification previews.",
    category: "₹6000 Courses",
    duration: "Elite Program",
    level: "Professional",
    rating: 5.0,
    learners: 0,
    price: 6000,
    isPopular: true,
    isNew: true,
    skills: ["SAFe POPM", "Scrum", "RTE", "PM Case Studies", "Interview Skills", "Figma", "Jira", "PowerBI", "Resume Building"],
    highlights: [
      "PM Case Masterclass: Advanced SAFe/POPM Simulation",
      "Interview Room: Real Employer Panels with video interviews and review",
      "Portfolio Accelerator: Build with industry-grade tools (Figma, Jira, PowerBI)",
      "Placement Lab: Employer connect, alumni chat",
      "Bonus: Preview of SAFe POPM, Scrum & RTE certification tracks"
    ],
    university: "Lean Multiverse",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "everyone"
  },
  {
    id: 29,
    title: "Project Management Pro: PM + Interview Skills",
    shortTitle: "Project Management Pro",
    subheading: "₹6000 Courses • Elite Program",
    description: "Master PMP & SAFe case simulation, 1:1 interview labs, and employer panel simulations. Includes preview of SAFe LPM/PMP certification.",
    category: "₹6000 Courses",
    duration: "Elite Program",
    level: "Professional",
    rating: 5.0,
    learners: 0,
    price: 6000,
    isPopular: true,
    isNew: true,
    skills: ["PMP", "SAFe", "Case Simulation", "Interview Skills", "PM", "Agile", "Program Manager", "Analytics", "Reporting"],
    highlights: [
      "PMP & SAFe Case Simulation",
      "1:1 Interview Labs: PM, Agile, Program Manager roles",
      "Analytics & Reporting, portfolio task",
      "Employer Panel Simulations",
      "Bonus: Preview of SAFe LPM/PMP certification"
    ],
    university: "Lean Multiverse",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "everyone"
  },
  {
    id: 30,
    title: "Business Analysis Advanced: BA + Interview Skills",
    shortTitle: "Business Analysis Advanced",
    subheading: "₹6000 Courses • Elite Program",
    description: "Master IIBA & Agile, advanced BA tools, and live interview room with industry panel. Includes preview of SAFe BA/POPM certifications.",
    category: "₹6000 Courses",
    duration: "Elite Program",
    level: "Professional",
    rating: 5.0,
    learners: 0,
    price: 6000,
    isPopular: true,
    isNew: true,
    skills: ["IIBA", "Agile", "PowerBI", "AWS", "Jira", "BA Tools", "Interview Skills", "SAFe BA", "POPM"],
    highlights: [
      "IIBA & Agile Masterclass",
      "Advanced BA Tools: PowerBI, AWS, Jira",
      "Employer Caselets + Portfolio Building",
      "Live Interview Room with Industry Panel",
      "Bonus: Preview of SAFe BA/POPM certifications"
    ],
    university: "Lean Multiverse",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "everyone"
  }
]

export const categories = ["All", "Webinar", "Foundation Course", "Professional Course", "Career Accelerator", "Dual Program", "₹500 Courses", "₹1500 Courses", "₹4000 Courses", "₹6000 Courses"]
export const levels = ["All", "All Levels", "Beginner", "Professional"]
export const targetAudiences = ["All", "Freshers", "Working Professional", "Everyone"]
