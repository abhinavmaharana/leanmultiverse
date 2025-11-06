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
]

export const categories = ["All", "Certification", "Leadership", "Strategy"]
export const levels = ["All", "Professional", "Executive"]
