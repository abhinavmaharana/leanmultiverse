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
      id: "netflix",
      company: "Netflix",
      industry: "Streaming",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/77/Netflix_2015_logo.svg",
      image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=2000&auto=format&fit=crop&crop=center",
      challenge: "Accelerate feature releases and keep pace with shifting audience expectations while delivering robust digital experiences at scale.",
      solution: "Netflix harnesses Agile to accelerate feature releases, keep pace with shifting audience expectations, and deliver robust digital experiences at scale. By applying Lean-agile principles, Netflix boosts team alignment for faster decisions, streamlines content delivery pipelines, and stays responsive to market demands.",
      results: [
        "Accelerates go-to-market for new features",
        "Increases cross-team collaboration for platform development",
        "Facilitates rapid response to content trends"
      ],
      duration: "Ongoing",
      teamSize: "Global Teams"
    },
    {
      id: "porsche",
      company: "Porsche",
      industry: "Automotive",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/50/Porsche_logo.svg",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop&crop=center",
      challenge: "Move beyond traditional automotive manufacturing toward agile software development and electric mobility while adapting to technological disruptions.",
      solution: "Porsche utilises Agile to move beyond traditional automotive manufacturing toward agile software development and electric mobility. The framework empowers Porsche to adapt swiftly to technological disruptions—such as in-vehicle connectivity and autonomous driving—by enabling iterative product development, reducing time-to-market, and fostering collaboration across engineering, supply chain, and customer teams.",
      results: [
        "Speeds up product launches for vehicles and interfaces",
        "Aligns hardware/software teams on innovation cycles",
        "Enables responsive and stable automotive engineering"
      ],
      duration: "Ongoing",
      teamSize: "Cross-functional Teams"
    },
    {
      id: "nasa",
      company: "NASA",
      industry: "Aerospace",
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg",
      image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?q=80&w=2000&auto=format&fit=crop",
      challenge: "Drive purposeful innovation in space missions and research while managing dependencies and reacting quickly to new scientific challenges.",
      solution: "NASA applies Agile principles to drive purposeful innovation in space missions and research. Organization-wide alignment helps NASA teams efficiently manage dependencies, automate processes, and react quickly to new scientific challenges and opportunities. This agility ensures NASA's mission work remains both cutting-edge and reliably executed.",
      results: [
        "Streamlines collaboration across diverse project teams",
        "Supports rapid prototyping and testing for research",
        "Enhances adaptability to mission goals and external events"
      ],
      duration: "Ongoing",
      teamSize: "Mission Teams"
    },
    {
      id: "philips",
      company: "Philips",
      industry: "Healthcare",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Philips_logo.svg",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=2000&auto=format&fit=crop",
      challenge: "Develop patient-focused solutions more efficiently while maintaining regulatory compliance and high product standards in healthcare technology.",
      solution: "Philips uses Agile frameworks to develop patient-focused solutions more efficiently while maintaining regulatory compliance and high product standards. By building agility into its R&D and operational teams, Philips is able to deliver new health technologies, optimize workflows, and respond quickly to healthcare market shifts.",
      results: [
        "Accelerates development of medical devices and software",
        "Enables better alignment between clinical and business functions",
        "Improves speed and quality in regulatory processes"
      ],
      duration: "Ongoing",
      teamSize: "Healthcare Teams"
    }
  ]
  