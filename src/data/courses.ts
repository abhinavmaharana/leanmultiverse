// Course data interface
export interface Course {
  id: number
  title: string
  shortTitle: string
  description: string
  category: string
  duration: string
  level: string
  rating: number
  learners: number
  price: number
  originalPrice: number
  isPopular: boolean
  isNew: boolean
  skills: string[]
  university: string
}

// SAFe Course data
export const courses: Course[] = [
  {
    id: 1,
    title: "Leading SAFe®",
    shortTitle: "Leading SAFe",
    description: "Step confidently into a leadership role that transforms organizations. Become the driving force behind business agility and innovation.",
    category: "Leadership",
    duration: "2 Days",
    level: "Executive",
    rating: 4.9,
    learners: 1800,
    price: 31000,
    originalPrice: 34500,
    isPopular: true,
    isNew: false,
    skills: ["Lean-Agile Leadership", "PI Planning", "Strategic Alignment", "Business Agility", "Stakeholder Engagement"],
    university: "Lean Multiverse"
  },
  {
    id: 2,
    title: "SAFe® for Teams",
    shortTitle: "SAFe for Teams",
    description: "Become an essential part of an empowered Agile Release Train. Learn the teamwork skills that produce seamless, high-value delivery.",
    category: "Certification",
    duration: "2 Days",
    level: "Professional",
    rating: 4.7,
    learners: 1500,
    price: 31000,
    originalPrice: 34500,
    isPopular: true,
    isNew: false,
    skills: ["Team Collaboration", "Sprint Planning", "Agile Events", "Value Delivery", "Cross-team Communication"],
    university: "Lean Multiverse"
  },
  {
    id: 3,
    title: "SAFe® Scrum Master",
    shortTitle: "SAFe Scrum Master",
    description: "Unleash your servant leadership to enable teams to excel. Guide Agile ceremonies and clear impediments to boost team performance.",
    category: "Certification",
    duration: "2 Days",
    level: "Professional",
    rating: 4.6,
    learners: 1100,
    price: 31000,
    originalPrice: 34500,
    isPopular: false,
    isNew: false,
    skills: ["Servant Leadership", "Agile Events", "Obstacle Removal", "Team Collaboration", "Continuous Improvement"],
    university: "Lean Multiverse"
  },
  {
    id: 4,
    title: "SAFe® PO/PM",
    shortTitle: "SAFe PO/PM",
    description: "Take charge of product value delivery and customer satisfaction. Champion product vision and strategy with a Lean mindset.",
    category: "Certification",
    duration: "2 Days",
    level: "Professional",
    rating: 4.8,
    learners: 1300,
    price: 31000,
    originalPrice: 34500,
    isPopular: false,
    isNew: false,
    skills: ["Backlog Prioritization", "Product Vision", "Customer-centric Management", "Lean Economics", "Stakeholder Management"],
    university: "Lean Multiverse"
  },
  {
    id: 5,
    title: "SAFe® for DevOps",
    shortTitle: "SAFe DevOps",
    description: "Be the key to faster, reliable product releases. Bridge development and operations with streamlined workflows and automation.",
    category: "Certification",
    duration: "2 Days",
    level: "Professional",
    rating: 4.7,
    learners: 900,
    price: 31000,
    originalPrice: 34500,
    isPopular: false,
    isNew: false,
    skills: ["Continuous Delivery", "CI/CD Automation", "DevOps Collaboration", "Flow Optimization", "Quality Management"],
    university: "Lean Multiverse"
  },
  {
    id: 6,
    title: "SAFe® for Hardware",
    shortTitle: "SAFe Hardware",
    description: "Lead innovative physical product development with Agile principles. Balance speed, quality, and iterative feedback in complex environments.",
    category: "Certification",
    duration: "2 Days",
    level: "Professional",
    rating: 4.5,
    learners: 700,
    price: 31000,
    originalPrice: 34500,
    isPopular: false,
    isNew: false,
    skills: ["Hardware-Software Integration", "Rapid Prototyping", "Quality Management", "Continuous Improvement", "Customer-aligned Delivery"],
    university: "Lean Multiverse"
  },
  {
    id: 7,
    title: "Agile Software Engineering",
    shortTitle: "Agile Engineering",
    description: "Elevate your technical skills for robust Agile software delivery. Build quality and scalability into every step of the development lifecycle.",
    category: "Certification",
    duration: "3 Days",
    level: "Professional",
    rating: 4.8,
    learners: 1200,
    price: 31000,
    originalPrice: 34500,
    isPopular: false,
    isNew: false,
    skills: ["Continuous Integration", "TDD", "Automated Testing", "Scalable Architecture", "Agile Engineering"],
    university: "Lean Multiverse"
  },
  {
    id: 8,
    title: "SAFe® for Architects",
    shortTitle: "SAFe Architects",
    description: "Lead with vision to drive technical excellence and business value. Shape architecture that supports continuous delivery and innovation at scale.",
    category: "Leadership",
    duration: "3 Days",
    level: "Executive",
    rating: 4.9,
    learners: 800,
    price: 31000,
    originalPrice: 34500,
    isPopular: false,
    isNew: false,
    skills: ["Agile Architecture", "Solution Architecture", "Technical Strategy", "Roadmap Planning", "Cross-team Collaboration"],
    university: "Lean Multiverse"
  },
  {
    id: 9,
    title: "Lean Portfolio Management",
    shortTitle: "Lean Portfolio",
    description: "Take control of strategic investment and execution. Manage portfolios with Lean practices that focus on value and business outcomes.",
    category: "Strategy",
    duration: "3 Days",
    level: "Executive",
    rating: 4.8,
    learners: 600,
    price: 100000,
    originalPrice: 120000,
    isPopular: false,
    isNew: false,
    skills: ["Lean Budgeting", "Portfolio Kanban", "Strategy Alignment", "Performance Metrics", "Agile Portfolio Operations"],
    university: "Lean Multiverse"
  },
  {
    id: 10,
    title: "Agile Product Management",
    shortTitle: "Agile Product",
    description: "Become a champion of innovation and market success. Master techniques to build products users love and that drive business growth.",
    category: "Certification",
    duration: "2 Days",
    level: "Professional",
    rating: 4.7,
    learners: 1400,
    price: 31000,
    originalPrice: 34500,
    isPopular: false,
    isNew: false,
    skills: ["Customer Insight", "Design Thinking", "Product Strategy", "MVP Development", "Stakeholder Collaboration"],
    university: "Lean Multiverse"
  },
  {
    id: 11,
    title: "Implementing SAFe®",
    shortTitle: "Implementing SAFe",
    description: "Be the trusted guide for enterprise Agile transformations. Build skills to launch Agile Release Trains and coach leaders and teams through change.",
    category: "Leadership",
    duration: "3 Days",
    level: "Executive",
    rating: 4.9,
    learners: 500,
    price: 31000,
    originalPrice: 34500,
    isPopular: false,
    isNew: false,
    skills: ["SAFe Transformation", "ART Launching", "Change Management", "Coaching Skills", "Agile Adoption"],
    university: "Lean Multiverse"
  },
  {
    id: 12,
    title: "SAFe® Release Train Engineer",
    shortTitle: "SAFe RTE",
    description: "Lead the Agile Release Train to deliver value at enterprise scale. Master the art of facilitating ART events and removing impediments for optimal team performance.",
    category: "Leadership",
    duration: "3 Days",
    level: "Executive",
    rating: 4.9,
    learners: 400,
    price: 100000,
    originalPrice: 120000,
    isPopular: false,
    isNew: false,
    skills: ["ART Facilitation", "Program Increment Planning", "Release Management", "Team Coaching", "Impediment Resolution"],
    university: "Lean Multiverse"
  }
]

export const categories = ["All", "Certification", "Leadership", "Strategy"]
export const levels = ["All", "Professional", "Executive"]
