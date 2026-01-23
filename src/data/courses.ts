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
  // ₹500 Courses
  {
    id: 2,
    title: "Fresher-to-Product Manager Blueprint™: Your Complete Beginner Roadmap to Becoming PM-Ready",
    shortTitle: "Fresher-to-Product Manager Blueprint™",
    subheading: "₹500 Courses • 60 minutes",
    description: "No experience. No MBA. No tech skills. Still become PM-ready. A 60-minute starter course that gives absolute freshers complete clarity on how to break into Product Management. Learn real entry paths, PM skills, recruiter expectations, and build your first mini PM case study. Perfect for anyone starting from zero.",
    category: "₹500 Courses",
    duration: "60 minutes",
    level: "Beginner",
    rating: 4.8,
    learners: 0,
    price: 499,
    originalPrice: 999,
    isPopular: true,
    isNew: true,
    skills: ["Product Management", "PM Entry Paths", "PM Skills", "Case Study", "Resume Building"],
    highlights: [
      "Realistic fresher entry paths into Product Management",
      "PM vs BA vs PO explained in simple terms",
      "Mini hands-on project: Zomato case study",
      "Fresher PM roadmap + resume & portfolio templates"
    ],
    university: "Lean Multiverse Consultancy Pvt. Ltd.",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "freshers"
  },
  {
    id: 3,
    title: "Working-Professional-to-Product Manager Blueprint™: Your Complete Transition Roadmap to Becoming PM-Ready",
    shortTitle: "Working-Professional-to-Product Manager Blueprint™",
    subheading: "₹500 Courses • 70 minutes",
    description: "Switch to Product Management with your existing experience — no coding, no MBA required. A power-packed 70-minute transition course designed for working professionals who want to move into Product Management but don't know where to start. Learn how to convert your past experience into PM-relevant skills, understand real transition paths, master PM fundamentals, and build your first industry-style PM case study.",
    category: "₹500 Courses",
    duration: "70 minutes",
    level: "Professional",
    rating: 4.9,
    learners: 0,
    price: 499,
    originalPrice: 999,
    isPopular: true,
    isNew: true,
    skills: ["Career Transition", "PM Transition", "PM Fundamentals", "Case Study", "Resume Rewrite"],
    highlights: [
      "Real transition paths for professionals (BA → PM, QA → PM, Sales → PM, Support → PM & more)",
      "How to map your existing experience to PM responsibilities",
      "PM vs BA vs PO vs Project Manager — practical differences",
      "Hands-on PM exercise: Real industry case study",
      "Transition roadmap + resume rewrite framework + portfolio samples"
    ],
    university: "Lean Multiverse Consultancy Pvt. Ltd.",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "working-professional"
  },
  {
    id: 4,
    title: "Fresher-to-Project Manager Blueprint™",
    shortTitle: "Fresher-to-Project Manager Blueprint™",
    subheading: "₹500 Courses • 60 minutes",
    description: "No experience. No certifications. No MBA. Still become Project-Management-ready. A beginner-friendly 60-minute course that gives freshers complete clarity on how to enter the Project Management world. Learn real entry paths, project workflow basics, practical tools, and build your first mini project plan to understand how PMs actually work inside companies.",
    category: "₹500 Courses",
    duration: "60 minutes",
    level: "Beginner",
    rating: 4.7,
    learners: 0,
    price: 499,
    originalPrice: 999,
    isPopular: true,
    isNew: true,
    skills: ["Project Management", "PM Entry Paths", "Project Workflow", "Project Planning", "Resume Building"],
    highlights: [
      "Realistic entry paths into Project Management for freshers",
      "PM vs Project Coordinator vs Scrum Master explained simply",
      "Hands-on mini project: Plan & track a sample project",
      "Fresher PM roadmap + resume & skill-building templates"
    ],
    university: "Lean Multiverse Consultancy Pvt. Ltd.",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "freshers"
  },
  {
    id: 5,
    title: "Working-Professional-to-Project Manager Blueprint™",
    shortTitle: "Working-Professional-to-Project Manager Blueprint™",
    subheading: "₹500 Courses • 70 minutes",
    description: "Switch to Project Management using your existing experience — without PMP, MBA, or technical background. A practical 70-minute transition course designed for working professionals who want to move into Project Management. Learn real transition paths, understand how to position your past experience, master essential PM workflows, and complete a hands-on mini project plan to confidently start applying for PM roles.",
    category: "₹500 Courses",
    duration: "70 minutes",
    level: "Professional",
    rating: 4.8,
    learners: 0,
    price: 499,
    originalPrice: 999,
    isPopular: true,
    isNew: true,
    skills: ["Career Transition", "Project Management", "PM Workflows", "Project Planning", "Resume Rewrite"],
    highlights: [
      "Proven transition paths (Coordinator, QA, BA, Operations, Support, Sales → PM)",
      "How to convert your current experience into PM responsibilities",
      "PM vs Project Coordinator vs Scrum Master — real-world clarity",
      "Hands-on mini project: Create & track a sample project",
      "Transition roadmap + resume rewrite + PM tool templates"
    ],
    university: "Lean Multiverse Consultancy Pvt. Ltd.",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "working-professional"
  },
  {
    id: 6,
    title: "Fresher-to-Business Analyst Blueprint™",
    shortTitle: "Fresher-to-Business Analyst Blueprint™",
    subheading: "₹500 Courses • 60 minutes",
    description: "No experience. No coding. No MBA. Still become BA-ready. A beginner-friendly 60-minute clarity course designed to help freshers enter the Business Analyst domain with confidence. Learn real industry entry paths, BA responsibilities, essential tools, documentation formats, and complete a hands-on BA case study — even if you're starting from zero.",
    category: "₹500 Courses",
    duration: "60 minutes",
    level: "Beginner",
    rating: 4.8,
    learners: 0,
    price: 499,
    originalPrice: 999,
    isPopular: true,
    isNew: true,
    skills: ["Business Analysis", "BA Entry Paths", "BA Responsibilities", "Documentation", "Case Study"],
    highlights: [
      "Real fresher entry paths into Business Analysis",
      "BA vs QA vs PM vs Data Analyst — practical differences",
      "Hands-on BA assignment: Requirement gathering + user stories",
      "Fresher BA roadmap + resume format + documentation templates"
    ],
    university: "Lean Multiverse Consultancy Pvt. Ltd.",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "freshers"
  },
  {
    id: 7,
    title: "Working-Professional-to-BA Blueprint™",
    shortTitle: "Working-Professional-to-BA Blueprint™",
    subheading: "₹500 Courses • 70 minutes",
    description: "Switch to Business Analysis using your existing experience — no coding, no MBA. A 70-minute transition course designed for professionals who want to shift into Business Analysis. Learn how to map your experience to BA responsibilities, master requirement workflows, and perform a hands-on BA case study.",
    category: "₹500 Courses",
    duration: "70 minutes",
    level: "Professional",
    rating: 4.9,
    learners: 0,
    price: 499,
    originalPrice: 999,
    isPopular: true,
    isNew: true,
    skills: ["Career Transition", "Business Analysis", "BA Responsibilities", "Requirement Workflows", "Case Study"],
    highlights: [
      "Proven transition paths (QA, Support, Ops, Sales → BA)",
      "BA vs QA vs PM vs PO — real industry clarity",
      "Hands-on BA assignment: Requirements + user stories",
      "Transition roadmap + resume rewrite + tool templates"
    ],
    university: "Lean Multiverse Consultancy Pvt. Ltd.",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "working-professional"
  },
  {
    id: 8,
    title: "Engineer-to-Management Career Breakthrough™",
    shortTitle: "Engineer-to-Management Career Breakthrough™",
    subheading: "₹500 Courses • 60 minutes",
    description: "Your roadmap to move from technical roles into high-growth management careers. A 60-minute clarity blueprint for B.Tech graduates & engineers who want to transition from technical work to managerial, business, or leadership roles. Learn the top career options, salary paths, and transition strategies.",
    category: "₹500 Courses",
    duration: "60 minutes",
    level: "Professional",
    rating: 4.8,
    learners: 0,
    price: 499,
    originalPrice: 999,
    isPopular: true,
    isNew: true,
    skills: ["Career Transition", "Management Roles", "PM", "BA", "Consultant", "Program Manager"],
    highlights: [
      "Top 7 non-coding management roles for engineers",
      "PM, BA, Consultant, Program Manager — explained simply",
      "How to convert technical experience into leadership experience",
      "Transition roadmap + resume rewrite + skills checklist"
    ],
    university: "Lean Multiverse Consultancy Pvt. Ltd.",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "working-professional"
  },
  {
    id: 9,
    title: "BBA-to-Management Career Blueprint™",
    shortTitle: "BBA-to-Management Career Blueprint™",
    subheading: "₹500 Courses • 50 minutes",
    description: "The top 5 high-income career paths every BBA graduate must know. A beginner-friendly 50-minute course for BBA students & freshers who want clarity on their best career options. Discover realistic roles, salaries, required skills, and step-by-step entry paths to reach managerial roles.",
    category: "₹500 Courses",
    duration: "50 minutes",
    level: "Beginner",
    rating: 4.7,
    learners: 0,
    price: 499,
    originalPrice: 999,
    isPopular: true,
    isNew: true,
    skills: ["Career Paths", "PM", "BA", "HRBP", "Marketing Manager", "Consultant"],
    highlights: [
      "Top 5 proven career paths after BBA",
      "PM, BA, HRBP, Marketing Manager, Consultant — explained",
      "What companies expect from BBA graduates",
      "Fresher roadmap + resume format + skill-building plan"
    ],
    university: "Lean Multiverse Consultancy Pvt. Ltd.",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "everyone"
  },
  {
    id: 10,
    title: "Graduate Career Compass™ (BA/BSc/BCom Edition)",
    shortTitle: "Graduate Career Compass™",
    subheading: "₹500 Courses • 60 minutes",
    description: "Your clarity guide to the highest-paying career options after graduation. A 60-minute career-direction course for BA, BSc, and BCom graduates who feel stuck or confused. Learn the top modern career paths, salaries, required skills, and step-by-step entry routes.",
    category: "₹500 Courses",
    duration: "60 minutes",
    level: "Beginner",
    rating: 4.7,
    learners: 0,
    price: 499,
    originalPrice: 999,
    isPopular: true,
    isNew: true,
    skills: ["Career Options", "PM", "BA", "DA", "HR", "UI/UX", "Operations"],
    highlights: [
      "Top 8 realistic, high-growth roles for graduates",
      "PM, BA, DA, HR, UI/UX, & Operations — explained simply",
      "What companies ACTUALLY want from graduates",
      "6-month career roadmap + resume format + skill plan"
    ],
    university: "Lean Multiverse Consultancy Pvt. Ltd.",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "everyone"
  },
  {
    id: 11,
    title: "Career Clarity for Confused Freshers™",
    shortTitle: "Career Clarity for Confused Freshers™",
    subheading: "₹500 Courses • 60 minutes",
    description: "The ultimate clarity blueprint for BA/BCom/BSc/BBA graduates who don't know which career to choose. A 60-minute power-packed course designed for freshers who feel lost, confused, or stuck after graduation. Get complete clarity on the top modern career paths, real salaries, skill requirements, and step-by-step entry routes — all explained in simple, practical language. No more guessing, no more random YouTube advice, no more wasting years.",
    category: "₹500 Courses",
    duration: "60 minutes",
    level: "Beginner",
    rating: 4.9,
    learners: 0,
    price: 499,
    originalPrice: 999,
    isPopular: true,
    isNew: true,
    skills: ["Career Guidance", "Career Options", "Career Paths", "Skills", "Resume Building"],
    highlights: [
      "Top 10 high-growth career options for BA/BCom/BSc/BBA",
      "Real salaries, demand, and growth for each career path",
      "Which degree fits which job role (with real hiring logic)",
      "Roadmap: Skills + certifications for each career",
      "Fresher-friendly resume template & 6-month action plan"
    ],
    university: "Lean Multiverse Consultancy Pvt. Ltd.",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "everyone"
  },
  // ₹1499 Courses
  // {
  //   id: 12,
  //   title: "Project Management Foundation: Agile to Predictive Delivery™",
  //   shortTitle: "Project Management Foundation: Agile to Predictive Delivery™",
  //   subheading: "₹1499 Courses • 90 minutes",
  //   description: "A complete starter framework for anyone who wants to understand how real projects actually run inside companies. This course gives learners a strong base in project management. It connects the dots between Agile, Scrum, Waterfall, hybrid models, and traditional PMP-style project structures. It's designed for freshers and early professionals who want to understand planning, execution, risk, timelines, and accountability in a project environment.",
  //   category: "₹1499 Courses",
  //   duration: "90 minutes",
  //   level: "Beginner",
  //   rating: 4.9,
  //   learners: 0,
  //   price: 1499,
  //   isPopular: true,
  //   isNew: true,
  //   skills: ["Project Management", "Agile", "Waterfall", "Hybrid", "Scrum", "PMP", "Project Planning"],
  //   highlights: [
  //     "How companies actually structure projects",
  //     "Core PM concepts: scope, timelines, risks, stakeholders, delivery",
  //     "Agile vs Waterfall vs Hybrid explained simply",
  //     "Sprint planning, standups, retrospectives",
  //     "Introduction to PMP process groups",
  //     "Real project lifecycle walkthrough",
  //     "Beginner-friendly templates for project planning"
  //   ],
  //   university: "Lean Multiverse Consultancy Pvt. Ltd.",
  //   buttons: {
  //     primary: "Enroll Now",
  //     secondary: "Contact us"
  //   },
  //   targetAudience: "everyone"
  // },
  // {
  //   id: 13,
  //   title: "Product Management Foundation: GenAI, Agile & Product Practices™",
  //   shortTitle: "Product Management Foundation: GenAI, Agile & Product Practices™",
  //   subheading: "₹1499 Courses • 90 minutes",
  //   description: "A modern foundation course that explains Product Management using simple language, real examples, and GenAI-supported workflows. This course helps learners understand what a Product Manager truly does, how AI is changing product roles, and how Agile teams build and ship products. It's designed to give absolute clarity for anyone exploring PM as a career.",
  //   category: "₹1499 Courses",
  //   duration: "90 minutes",
  //   level: "Beginner",
  //   rating: 4.9,
  //   learners: 0,
  //   price: 1499,
  //   isPopular: true,
  //   isNew: true,
  //   skills: ["Product Management", "GenAI", "Agile", "Product Practices", "User Stories", "Backlog"],
  //   highlights: [
  //     "What product teams actually look like",
  //     "Core PM concepts: problem statements, users, metrics",
  //     "GenAI for PM: idea testing, user story drafting, competitor analysis",
  //     "Requirements writing basics",
  //     "Agile for PMs: backlog, prioritization, ceremonies",
  //     "Real product lifecycle walkthrough",
  //     "Beginner PM case study with a template"
  //   ],
  //   university: "Lean Multiverse Consultancy Pvt. Ltd.",
  //   buttons: {
  //     primary: "Enroll Now",
  //     secondary: "Contact us"
  //   },
  //   targetAudience: "everyone"
  // },
  // {
  //   id: 14,
  //   title: "Business Analysis Foundation: Global BA Standards & Digital Tools™",
  //   shortTitle: "Business Analysis Foundation: Global BA Standards & Digital Tools™",
  //   subheading: "₹1499 Courses • 90 minutes",
  //   description: "A structured foundation course that introduces Business Analysis the way it's practiced across modern digital workplaces. This course gives clarity on BA tasks, documentation, tools, Agile collaboration, and how IIBA frameworks fit into practical work. Ideal for freshers and professionals exploring BA as a career.",
  //   category: "₹1499 Courses",
  //   duration: "90 minutes",
  //   level: "Beginner",
  //   rating: 4.9,
  //   learners: 0,
  //   price: 1499,
  //   isPopular: true,
  //   isNew: true,
  //   skills: ["Business Analysis", "IIBA", "BA Standards", "Digital Tools", "JIRA", "Confluence", "Miro", "Lucid"],
  //   highlights: [
  //     "BA roles inside Agile and traditional teams",
  //     "Requirements gathering, user stories, acceptance criteria",
  //     "IIBA foundational concepts explained simply",
  //     "Digital BA skills: workflows, process mapping, systems thinking",
  //     "Tools overview: JIRA, Confluence, Miro, Lucid",
  //     "Hands-on documentation practice",
  //     "BA career roadmap with template pack"
  //   ],
  //   university: "Lean Multiverse Consultancy Pvt. Ltd.",
  //   buttons: {
  //     primary: "Enroll Now",
  //     secondary: "Contact us"
  //   },
  //   targetAudience: "everyone"
  // },
  // ₹3999 Courses
  {
    id: 15,
    title: "Certified Product Management with GenAI™",
    shortTitle: "Certified Product Management with GenAI™",
    subheading: "₹3999 Courses • 3 hours",
    description: "A practical certification program that teaches real Product Management using modern GenAI workflows, Agile rituals, and hands-on product case work. This course is built for learners who want to move past theory and actually practice PM tasks. It teaches problem framing, user insights, documentation, prioritization, metrics, and full product thinking — supported by GenAI tools that speed up research and execution.",
    category: "₹3999 Courses",
    duration: "3 hours",
    level: "Professional",
    rating: 4.9,
    learners: 0,
    price: 3999,
    isPopular: true,
    isNew: true,
    skills: ["Product Management", "GenAI", "Agile", "PRD", "User Stories", "Prioritization", "Product Analytics"],
    highlights: [
      "End-to-end PM workflow: discovery to delivery",
      "GenAI for PM: user research, PRDs, competitor analysis",
      "User stories, acceptance criteria, epics",
      "Prioritization frameworks practiced live",
      "Product analytics and KPIs",
      "Build a complete product case study",
      "Certification exam + graded assignment"
    ],
    university: "Lean Multiverse Consultancy Pvt. Ltd.",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "everyone"
  },
  {
    id: 16,
    title: "Certified Project Management with GenAI™",
    shortTitle: "Certified Project Management with GenAI™",
    subheading: "₹3999 Courses • 3 hours",
    description: "A project-ready certification that teaches practical project planning, scheduling, execution, and reporting — enhanced with GenAI-driven workflows. This course is for professionals who want structured, real-world project skills. They learn project lifecycle, Agile operations, communication patterns, escalation handling, documentation, and how GenAI speeds up project planning and reporting.",
    category: "₹3999 Courses",
    duration: "3 hours",
    level: "Professional",
    rating: 4.9,
    learners: 0,
    price: 3999,
    isPopular: true,
    isNew: true,
    skills: ["Project Management", "GenAI", "Agile", "Waterfall", "Hybrid", "JIRA", "Confluence", "MS Project"],
    highlights: [
      "How to plan and manage real projects",
      "Project scopes, schedules, risks, dependencies",
      "GenAI for PM: reports, risk logs, meeting summaries",
      "Agile + Waterfall + Hybrid execution",
      "Stakeholder management and communication",
      "Tools: JIRA, Confluence, MS Project templates",
      "Build a complete project plan + certification assessment"
    ],
    university: "Lean Multiverse Consultancy Pvt. Ltd.",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "everyone"
  },
  {
    id: 17,
    title: "Certified Business Analysis with GenAI™",
    shortTitle: "Certified Business Analysis with GenAI™",
    subheading: "₹3999 Courses • 3 hours",
    description: "A hands-on BA certification focused on documentation, requirements, process mapping, and digital BA techniques powered by GenAI. This course helps learners practice actual BA tasks instead of just learning definitions. They work on real documentation, user stories, workflows, acceptance criteria, and digital toolkits — all supported by GenAI for faster analysis and better clarity.",
    category: "₹3999 Courses",
    duration: "3 hours",
    level: "Professional",
    rating: 4.9,
    learners: 0,
    price: 3999,
    isPopular: true,
    isNew: true,
    skills: ["Business Analysis", "GenAI", "IIBA", "Requirements", "Process Mapping", "BRD", "FRD", "User Stories"],
    highlights: [
      "Requirements gathering and documentation",
      "IIBA-aligned BA practices",
      "GenAI for BA: process mapping, requirement drafts, test scenarios",
      "User stories, BRDs, FRDs",
      "Workflow diagrams and use cases",
      "Complete digital BA toolkit",
      "Certification test + project submission"
    ],
    university: "Lean Multiverse Consultancy Pvt. Ltd.",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "everyone"
  },
  {
    id: 18,
    title: "Communication Mastery with Resume Building™",
    shortTitle: "Communication Mastery with Resume Building™",
    subheading: "₹3999 Courses • 2.5 hours",
    description: "A complete communication transformation program designed to improve speaking, writing, and interview clarity — with a resume that actually gets shortlisted. This course helps freshers and professionals build strong communication habits. It teaches confident speaking, corporate writing, structured answering, email etiquette, and a resume that makes immediate sense to recruiters. It ends with a mock interview framework and a polished resume.",
    category: "₹3999 Courses",
    duration: "2.5 hours",
    level: "Professional",
    rating: 4.9,
    learners: 0,
    price: 3999,
    isPopular: true,
    isNew: true,
    skills: ["Communication", "Resume Building", "Interview Skills", "STAR", "Email Etiquette", "Speaking"],
    highlights: [
      "Confident English speaking frameworks",
      "Fix fillers, hesitation, nervous tone, unclear communication",
      "Corporate email etiquette and chat professionalism",
      "Resume building: structure, clarity, keywords",
      "Interview frameworks: STAR, context mapping, role-fit answers",
      "Body language and voice clarity",
      "Final resume review checklist"
    ],
    university: "Lean Multiverse Consultancy Pvt. Ltd.",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "everyone"
  },
  // ₹5999 Courses
  {
    id: 19,
    title: "Product Management Elite™: PM + Interview Skills and Resume Building",
    shortTitle: "Product Management Elite™",
    subheading: "₹5999 Courses • 4 hours",
    description: "Your complete job-ready Product Management program combining advanced PM skills, full interview prep, and a recruiter-ready resume. This program is designed for learners serious about breaking into PM roles. It blends advanced product concepts, hands-on product work, GenAI workflows, and deep interview training. They walk away with a polished resume, strong portfolio material, and the confidence to explain their PM thinking in interviews.",
    category: "₹5999 Courses",
    duration: "4 hours",
    level: "Professional",
    rating: 5.0,
    learners: 0,
    price: 5999,
    isPopular: true,
    isNew: true,
    skills: ["Product Management", "GenAI", "Interview Skills", "Resume Building", "Portfolio", "Product Thinking"],
    highlights: [
      "Advanced product thinking",
      "GenAI for PM: deep-dive templates and workflows",
      "User research, PRDs, metrics, and roadmapping",
      "High-impact case study practice",
      "PM interview frameworks: product sense, estimations, strategy",
      "Story-based resume building",
      "One complete product portfolio project"
    ],
    university: "Lean Multiverse Consultancy Pvt. Ltd.",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "everyone"
  },
  {
    id: 20,
    title: "Project Management Pro™: PM + Interview Skills",
    shortTitle: "Project Management Pro™",
    subheading: "₹5999 Courses • 4 hours",
    description: "A full-spectrum program for transitioning into strong project roles, combining real PM execution skills with targeted interview preparation. This course is built for anyone aiming for project roles in IT, consulting, or operations. It covers advanced project planning, breakdown structures, Agile-Waterfall integration, stakeholder communication, risk management, and interview mastery for PM profiles.",
    category: "₹5999 Courses",
    duration: "4 hours",
    level: "Professional",
    rating: 5.0,
    learners: 0,
    price: 5999,
    isPopular: true,
    isNew: true,
    skills: ["Project Management", "GenAI", "Interview Skills", "Agile", "Waterfall", "JIRA", "Confluence", "MS Project"],
    highlights: [
      "Advanced project planning and scheduling",
      "Risk, escalation, dependency, and stakeholder management",
      "GenAI for PM documentation and reporting",
      "Tools walkthrough: JIRA, Confluence, MS Project",
      "PM interview frameworks and scenario questions",
      "Role-specific communication patterns",
      "Final project assignment for job-ready practice"
    ],
    university: "Lean Multiverse Consultancy Pvt. Ltd.",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "everyone"
  },
  {
    id: 21,
    title: "Business Analysis Advanced™: BA + Interview Skills",
    shortTitle: "Business Analysis Advanced™",
    subheading: "₹5999 Courses • 4 hours",
    description: "A job-focused BA program that blends advanced analysis techniques with structured interview preparation for BA, PO, and PM roles. This course is ideal for learners who want to move beyond basics and practice real BA work — documentation, workflows, systems analysis, and Agile collaboration — along with interview mastery that teaches them how to speak like a BA in real scenarios.",
    category: "₹5999 Courses",
    duration: "4 hours",
    level: "Professional",
    rating: 5.0,
    learners: 0,
    price: 5999,
    isPopular: true,
    isNew: true,
    skills: ["Business Analysis", "GenAI", "IIBA", "Interview Skills", "BRD", "FRD", "User Stories", "Stakeholder Communication"],
    highlights: [
      "Advanced requirements analysis and documentation",
      "Workflow design, system behavior, and impact mapping",
      "GenAI for BA: analysis, documentation, scenario modeling",
      "BRDs, FRDs, user stories, acceptance criteria",
      "BA and PO interview frameworks",
      "Stakeholder communication skills",
      "A full BA case study project"
    ],
    university: "Lean Multiverse Consultancy Pvt. Ltd.",
    buttons: {
      primary: "Enroll Now",
      secondary: "Contact us"
    },
    targetAudience: "everyone"
  }
]

export const categories = ["All", "Webinar", "₹500 Courses", "₹3999 Courses", "₹5999 Courses"]
export const levels = ["All", "All Levels", "Beginner", "Professional"]
export const targetAudiences = ["All", "Freshers", "Working Professional", "Everyone"]


