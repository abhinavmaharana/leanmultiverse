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
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg",
      image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?q=80&w=2000&auto=format&fit=crop",
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
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/77/Netflix_2015_logo.svg",
      image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=2000&auto=format&fit=crop&crop=center",
      challenge: "Scaling personalized recommendations globally.",
      solution: "Implemented a hybrid ML + rules-based recommendation engine.",
      results: [
        "10% increase in user engagement",
        "15% reduction in churn",
        "Global rollout in under 6 months"
      ],
      duration: "9 months",
      teamSize: "6 engineers"
    },
    {
      id: "porsche",
      company: "Porsche",
      industry: "Automotive",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/50/Porsche_logo.svg",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop&crop=center",
      challenge: "Optimizing manufacturing processes for electric vehicle production.",
      solution: "Implemented lean manufacturing principles with AI-driven quality control.",
      results: [
        "25% reduction in production time",
        "40% improvement in quality metrics",
        "Zero defect rate achieved"
      ],
      duration: "18 months",
      teamSize: "12 engineers"
    }
    // ➕ add more studies here
  ]
  