export interface CaseStudy {
    id: string
    company: string
    industry: string
    logo: string
    image: string
    challenge: string
    solution: string
    results: string[]
    duration: string
    teamSize: string
  }
  
  export const caseStudies: CaseStudy[] = [
    {
      id: "nasa",
      company: "NASA",
      industry: "Aerospace",
      logo: "/logos/nasa.svg",
      image: "/images/nasa-case.jpg",
      challenge: "NASA needed a robust simulation platform for mission-critical training.",
      solution: "We built a real-time 3D simulation with AI-driven scenarios.",
      results: [
        "Cut astronaut training time by 30%",
        "Improved mission accuracy by 22%",
        "Reduced costs by $5M annually"
      ],
      duration: "12 months",
      teamSize: "8 engineers"
    },
    {
      id: "netflix",
      company: "Netflix",
      industry: "Entertainment",
      logo: "/logos/netflix.svg",
      image: "/images/netflix-case.jpg",
      challenge: "Scaling personalized recommendations globally.",
      solution: "Implemented a hybrid ML + rules-based recommendation engine.",
      results: [
        "10% increase in user engagement",
        "15% reduction in churn",
        "Global rollout in under 6 months"
      ],
      duration: "9 months",
      teamSize: "6 engineers"
    }
    // ➕ add more studies here
  ]
  