// Course data for all career starter programs
export interface CareerStarterCourse {
    id: string
    slug: string
    title: string
    shortTitle: string
    price: number
    originalPrice: number
    duration: string
    schedule: string
    timePerWeek: string
    totalHours: string
    goal: string[]
    targetAudience: string[]
    weeklyStructure: {
      week: number
      title: string
      goal: string
      sessions: {
        title: string
        topics: string[]
        outcome?: string
      }[]
    }[]
    deliverables: string[]
    certification: string
    upsell?: {
      title: string
      description: string
      includes: string[]
    }
  }
  
  export const careerStarterCourses: CareerStarterCourse[] = [
    {
      id: 'ai-ml-foundation',
      slug: 'ai-ml-foundation',
      title: 'AI & Machine Learning – Career Foundation Program',
      shortTitle: 'AI & ML Career Foundation',
      price: 2499,
      originalPrice: 4999,
      duration: '1 Month',
      schedule: 'Flexible Schedule',
      timePerWeek: 'Self-paced',
      totalHours: '12+ Hours',
      goal: [
        'Clearly understand how AI and ML work',
        'Be able to explain AI concepts confidently',
        'Identify the right AI career path for yourself',
        'Understand industry-relevant AI roles',
        'Build and present a foundation-level AI project',
        'Know the exact next steps toward global certifications'
      ],
      targetAudience: [
        'Freshers from any educational background',
        'Non-technical professionals (MBA, HR, Sales, Marketing, Operations)',
        'IT professionals (Support, QA, Developers, Analysts)',
        'Career switchers exploring AI opportunities'
      ],
      weeklyStructure: [
        {
          week: 1,
          title: 'AI FOUNDATIONS (CLARITY WEEK)',
          goal: 'Build absolute clarity around AI, remove fear, and establish strong fundamentals.',
          sessions: [
            {
              title: 'MODULE 1: AI in the Real World',
              topics: [
                'Why Artificial Intelligence exists',
                'Problems AI is designed to solve',
                'Difference between rule-based software and AI systems',
                'Human intelligence vs machine intelligence',
                'Common myths around AI (job loss, super-intelligence, replacement fear)',
                'Realistic impact of AI on careers and industries',
                'Real-world applications: Google Search, Netflix, UPI fraud detection, Swiggy/Uber routing, ChatGPT'
              ],
              outcome: 'Learners can identify AI around them in daily life and stop seeing AI as complex or scary'
            },
            {
              title: 'MODULE 2: AI vs ML vs Data Science vs Automation',
              topics: [
                'What exactly Artificial Intelligence means',
                'What Machine Learning actually does',
                'What Data Science focuses on',
                'Where Generative AI fits',
                'Difference between Automation and AI',
                'Why many tools are marketed as AI but are not truly intelligent'
              ],
              outcome: 'Learners can confidently explain differences between AI, ML, and Data Science'
            },
            {
              title: 'MODULE 3: How AI Systems Work (No Math, No Code)',
              topics: [
                'What data is and why it matters',
                'Types of data: Text, Images, Audio, Numerical',
                'What an AI model is (conceptual understanding)',
                'What training means in AI',
                'Difference between training and prediction',
                'Understanding accuracy, bias, and errors conceptually'
              ],
              outcome: 'Learners understand what happens inside an AI system without seeing it as a black box'
            }
          ]
        },
        {
          week: 2,
          title: 'MACHINE LEARNING & GENERATIVE AI',
          goal: 'Understand how modern AI systems learn and generate content without technical complexity.',
          sessions: [
            {
              title: 'MODULE 4: Types of Machine Learning',
              topics: [
                'Supervised Learning: Learning with labeled examples',
                'Unsupervised Learning: Pattern discovery and clustering',
                'Reinforcement Learning: Learning through rewards and penalties',
                'Mini case studies: Spam detection, Customer segmentation, Product recommendation'
              ],
              outcome: 'Learners understand where each ML type is used in industry'
            },
            {
              title: 'MODULE 5: Generative AI Deep Dive',
              topics: [
                'What Generative AI is and why it is revolutionary',
                'How tools like ChatGPT work (simplified explanation)',
                'Concepts of tokens, probability, and context',
                'Strengths and limitations of Generative AI',
                'Ethical considerations and misuse scenarios',
                'Live demonstrations: Text generation, Image generation'
              ],
              outcome: 'Learners understand GenAI capabilities and boundaries'
            },
            {
              title: 'MODULE 6: Prompt Engineering & No-Code AI',
              topics: [
                'What prompt engineering is and why prompts matter',
                'Prompt structure and best practices',
                'Good vs bad prompts',
                'Using AI tools without coding',
                'No-Code Tools: Notion AI, Zapier, Airtable AI, Canva AI',
                'Hands-on practice: Resume optimization, Marketing content, Data summarization'
              ],
              outcome: 'Learners can effectively use AI tools in real-world tasks'
            }
          ]
        },
        {
          week: 3,
          title: 'CAREERS, ROLES & SKILL MAPS',
          goal: 'Provide career direction, confidence, and realistic pathways.',
          sessions: [
            {
              title: 'MODULE 7: Who Can Transition into AI',
              topics: [
                'AI opportunities for non-technical backgrounds',
                'AI paths for technical professionals',
                'Fresher-specific strategies',
                'Career switcher approaches',
                'Identifying transferable skills'
              ],
              outcome: 'Learners clearly see how their background fits into AI'
            },
            {
              title: 'MODULE 8: AI Job Roles (Industry Reality)',
              topics: [
                'AI Analyst: Day-to-day responsibilities, tools, skills, salary',
                'Data Analyst (AI-enabled): Responsibilities, tools, skills, salary',
                'Prompt Engineer: Responsibilities, tools, skills, salary',
                'AI Product Associate: Responsibilities, tools, skills, salary',
                'Business Analyst (AI-focused): Responsibilities, tools, skills, salary',
                'Entry-level ML Engineer: Responsibilities, tools, skills, salary'
              ],
              outcome: 'Learners shortlist realistic job roles'
            },
            {
              title: 'MODULE 9: Skill Roadmaps by Role',
              topics: [
                'Skill stacks for each AI role',
                'Tools to learn first',
                'Skills to avoid initially',
                'Learning timelines: 3-month, 6-month, 12-month plans'
              ],
              outcome: 'Each learner selects a primary career path'
            }
          ]
        },
        {
          week: 4,
          title: 'CERTIFICATIONS, PROJECT & CERTIFICATION',
          goal: 'Convert learning into credibility and proof of work.',
          sessions: [
            {
              title: 'MODULE 10: Global AI Certification Roadmap',
              topics: [
                'Microsoft AI-900: Who should take, cost, difficulty, preparation time',
                'Microsoft DP-900: Details and preparation',
                'Microsoft PL-900: Details and preparation',
                'AWS AI Practitioner: Details and preparation',
                'Google Data & AI: Details and preparation',
                'IBM AI Engineer: Details and preparation',
                'Recommended certification order'
              ],
              outcome: 'Learners know exactly which certification to target next'
            },
            {
              title: 'MODULE 11: FOUNDATION PROJECT (MANDATORY)',
              topics: [
                'Project: AI-Powered Business/Career Use Case Design',
                'Problem statement creation',
                'Why AI is required for the problem',
                'Type of AI involved',
                'Data involved (conceptual)',
                'Expected outcomes',
                'Tools/platforms to be used',
                'Risks and limitations',
                'NO coding required - Focus on thinking like an AI professional'
              ],
              outcome: 'Demonstrate understanding through a real-world use case'
            },
            {
              title: 'MODULE 12: Assessment, Certification & Closure',
              topics: [
                'Conceptual MCQ-based evaluation',
                'Project review and presentation',
                'Feedback and improvement suggestions',
                'Certified AI Career Foundation – LeanMultiverse'
              ],
              outcome: 'Receive verifiable certification, resume & LinkedIn ready credential'
            }
          ]
        }
      ],
      deliverables: [
        'Structured foundation training with real-world context',
        'Clear understanding of AI without jargon or hype',
        'Career-focused learning (not theory-heavy)',
        'Personalized skill roadmap',
        'Foundation-level AI project (resume-ready)',
        'LeanMultiverse AI Career Foundation Certification',
        'Lifetime access to recordings and resources',
        'Clear upgrade path to global AI certifications'
      ],
      certification: 'LeanMultiverse AI Career Foundation Certification',
      upsell: {
        title: 'AI & ML Advanced Certification Program',
        description: 'Ready to go deeper? Our advanced program will make you job-ready with hands-on projects and certification prep.',
        includes: [
          'Python for AI (beginner-friendly)',
          'Machine Learning fundamentals',
          'Real-world projects portfolio',
          'AWS/Google AI certification prep',
          'Mock interviews',
          'Job placement support'
        ]
      }
    },
    {
      id: 'cloud-devops',
      slug: 'cloud-devops-career-starter',
      title: 'Cloud & DevOps Career Starter – From Zero to Decision',
      shortTitle: 'Cloud & DevOps Career Starter',
      price: 2499,
      originalPrice: 4999,
      duration: '1 Month',
      schedule: 'Friday, Saturday, Sunday',
      timePerWeek: '2 Hours per Week',
      totalHours: '8 Hours Total',
      goal: [
        'Make non-IT & IT people understand Cloud + DevOps in simple language',
        'Help them decide: Is this career for me?',
        'Show real salary, roles, growth',
        'Give certification roadmap',
        'Prepare them for the Advanced Certification Cracking Program'
      ],
      targetAudience: [
        'Non-IT professionals exploring Cloud careers',
        'IT professionals wanting to transition to DevOps',
        'Fresh graduates seeking career clarity',
        'Career switchers exploring high-growth domains'
      ],
      weeklyStructure: [
        {
          week: 1,
          title: 'IT & CLOUD FOUNDATION (Career Orientation Week)',
          goal: 'Understand IT industry and Cloud fundamentals in simple terms',
          sessions: [
            {
              title: 'Session 1: How IT Industry Actually Works',
              topics: [
                'What is Software, Server, Network, Database (Real-life analogies)',
                'What is Cloud? (AWS, Azure, GCP explained like Zomato Cloud Kitchen)',
                'Difference: IT Support vs Developer vs Cloud Engineer vs DevOps',
                'Why companies pay 6-25 LPA for Cloud & DevOps'
              ]
            },
            {
              title: 'Session 2: Cloud Career Map',
              topics: [
                'Cloud Engineer',
                'DevOps Engineer',
                'SRE (Site Reliability Engineer)',
                'Platform Engineer',
                'Cloud Architect (future growth)',
                'Fresher salary vs 3-year salary vs 7-year salary'
              ]
            },
            {
              title: 'Session 3: Certification Awareness',
              topics: [
                'Why certifications matter in Cloud',
                'Vendor-based vs Tool-based certs',
                'Global demand & MNC hiring logic'
              ]
            }
          ]
        },
        {
          week: 2,
          title: 'DEVOPS SIMPLIFIED (Tools + Flow Understanding)',
          goal: 'Understand DevOps tools and workflows without deep technical complexity',
          sessions: [
            {
              title: 'Session 1: What is DevOps in Simple Words',
              topics: [
                'Developer writes code → How it goes to live website/app',
                'CI/CD pipeline in story format',
                'Automation vs Manual work'
              ]
            },
            {
              title: 'Session 2: DevOps Tools Overview',
              topics: [
                'Git & GitHub (Version Control)',
                'Docker (Container concept)',
                'Kubernetes (Container management)',
                'Jenkins/GitHub Actions (Automation)',
                'Terraform (Infrastructure as Code)',
                'Monitoring (Prometheus, Grafana – concept level)'
              ]
            },
            {
              title: 'Session 3: Who Should Choose DevOps',
              topics: [
                'Coding vs No-coding roles',
                'Logical thinkers vs Infrastructure lovers',
                'MBA + DevOps, BCom + DevOps, Non-tech + DevOps path'
              ]
            }
          ]
        },
        {
          week: 3,
          title: 'CLOUD PLATFORMS & CERTIFICATION ROADMAP',
          goal: 'Learn about cloud platforms and certification paths',
          sessions: [
            {
              title: 'Session 1: AWS vs Azure vs GCP (Career POV)',
              topics: [
                'Market share',
                'Which companies use what',
                'Which is easier for freshers',
                'India job trend'
              ]
            },
            {
              title: 'Session 2: Certification Ladder',
              topics: [
                'AWS Path: Cloud Practitioner → Solutions Architect → DevOps Engineer',
                'Azure Path: AZ-900 → AZ-104 → AZ-400',
                'DevOps Tools: Docker Certified, Kubernetes CKA, Terraform Associate'
              ]
            },
            {
              title: 'Session 3: Job Mapping',
              topics: [
                'Which certification → Which job role',
                'Which certification → Which salary band',
                'Which certification → Which company type (Startup, MNC, Product, Service)'
              ]
            }
          ]
        },
        {
          week: 4,
          title: 'RESUME, PROJECTS & NEXT STEP FUNNEL',
          goal: 'Prepare for job applications and understand next learning steps',
          sessions: [
            {
              title: 'Session 1: Cloud & DevOps Resume Blueprint',
              topics: [
                'Fresher resume template',
                'Career switcher resume template',
                'Keywords for ATS',
                'GitHub profile importance',
                'LinkedIn optimization'
              ]
            },
            {
              title: 'Session 2: Real Career Transition Plan',
              topics: [
                '0-3 months learning roadmap',
                '3-6 months job-ready roadmap',
                'What to learn first: Linux, Networking, Cloud, Python, DevOps'
              ]
            },
            {
              title: 'Session 3: Advanced Program Introduction',
              topics: [
                'Cloud & DevOps Certification + Job Accelerator overview',
                'Career acceleration pathway',
                'From learning to earning'
              ]
            }
          ]
        }
      ],
      deliverables: [
        'Career Roadmap PDF',
        'Certification Comparison Chart',
        'Salary Progression Sheet',
        'Resume Templates (2 versions)',
        'LinkedIn Optimization Guide',
        'Learning Path Flowchart',
        'LeanMultiverse Starter Certificate'
      ],
      certification: 'Cloud & DevOps Career Foundation Certificate',
      upsell: {
        title: 'Cloud & DevOps Certification + Job Accelerator',
        description: 'This ₹2499 course helped you understand the battlefield. The next program will train you to WIN the battlefield.',
        includes: [
          'AWS / Azure Certification Training',
          'Certification Exam Preparation',
          'Hands-on Labs',
          'Real Projects',
          'Mock Interviews',
          'Resume Review',
          'Job Referrals',
          'Placement Support'
        ]
      }
    },
    {
      id: 'business-analyst',
      slug: 'business-analyst-career-starter',
      title: 'Business Analyst Career Starter – From Zero to Decision',
      shortTitle: 'Business Analyst Career Starter',
      price: 2499,
      originalPrice: 4999,
      duration: '1 Month',
      schedule: 'Friday, Saturday, Sunday',
      timePerWeek: '2 Hours per Week',
      totalHours: '8 Hours Total',
      goal: [
        'Make them understand what a Business Analyst actually does',
        'Clear confusion between BA, Data Analyst, Product Manager, Consultant',
        'Show real career path, salary, skills',
        'Give global certification roadmap',
        'Prepare them for Advanced BA Certification + Job Program'
      ],
      targetAudience: [
        'Non-tech professionals (BCom, BBA, MBA, Arts, Science)',
        'IT professionals exploring BA roles',
        'Working professionals seeking career transition',
        'Fresh graduates looking for analytical careers'
      ],
      weeklyStructure: [
        {
          week: 1,
          title: 'BUSINESS ANALYST FOUNDATION (Career Clarity)',
          goal: 'Understand what Business Analysts do and career opportunities',
          sessions: [
            {
              title: 'Session 1: What is a Business Analyst',
              topics: [
                'How companies take decisions',
                'How problems are identified',
                'How requirements are gathered',
                'BA as bridge between Business & Tech'
              ]
            },
            {
              title: 'Session 2: BA vs Other Roles',
              topics: [
                'BA vs Data Analyst',
                'BA vs Product Manager',
                'BA vs Project Manager',
                'BA vs Consultant'
              ]
            },
            {
              title: 'Session 3: Career Scope & Salary',
              topics: [
                'Fresher BA salary (4-8 LPA)',
                '3-year experience (10-18 LPA)',
                '7+ years (25-40 LPA)',
                'Global demand (US, UK, Middle East, Europe)'
              ]
            }
          ]
        },
        {
          week: 2,
          title: 'SKILLS & TOOLS OF A BUSINESS ANALYST',
          goal: 'Learn essential BA skills and tools',
          sessions: [
            {
              title: 'Session 1: Core BA Skills',
              topics: [
                'Requirement Gathering',
                'Stakeholder Management',
                'Process Mapping',
                'Business Documentation',
                'Problem Solving',
                'Communication & Presentation'
              ]
            },
            {
              title: 'Session 2: Tools Used by BAs',
              topics: [
                'Excel (Advanced)',
                'SQL (Basic)',
                'Power BI / Tableau (Conceptual)',
                'JIRA / Confluence',
                'BPMN / Visio',
                'Wireframing tools (Figma, Balsamiq)'
              ]
            },
            {
              title: 'Session 3: Who Should Choose BA',
              topics: [
                'Non-tech background suitability',
                'IT background transition',
                'Working professionals',
                'Career switchers'
              ]
            }
          ]
        },
        {
          week: 3,
          title: 'CERTIFICATION & CAREER ROADMAP',
          goal: 'Explore global certifications and career progression',
          sessions: [
            {
              title: 'Session 1: Global BA Certifications',
              topics: [
                'IIBA: ECBA → CCBA → CBAP',
                'PMI: PMI-PBA',
                'Agile: CSM, SAFe POPM, SAFe BA'
              ]
            },
            {
              title: 'Session 2: Certification for Each Level',
              topics: [
                'Fresher → ECBA / Agile BA',
                '2-4 years → CCBA / PMI-PBA',
                '5+ years → CBAP'
              ]
            },
            {
              title: 'Session 3: Job Role Mapping',
              topics: [
                'Business Analyst',
                'Functional Consultant',
                'Product Owner',
                'Business Consultant',
                'Process Analyst'
              ]
            }
          ]
        },
        {
          week: 4,
          title: 'RESUME, INTERVIEW & NEXT STEP',
          goal: 'Prepare for BA job applications and interviews',
          sessions: [
            {
              title: 'Session 1: Business Analyst Resume Blueprint',
              topics: [
                'Fresher Resume Template',
                'Career Switch Resume Template',
                'ATS Keywords',
                'Project Formatting'
              ]
            },
            {
              title: 'Session 2: Real Job Preparation Strategy',
              topics: [
                'How to build BA projects',
                'Case study approach',
                'Interview structure',
                'Domain selection (Banking, Healthcare, IT, Retail, BFSI)'
              ]
            },
            {
              title: 'Session 3: Advanced Program Overview',
              topics: [
                'Business Analyst Certification & Job Accelerator',
                'Path from clarity to conversion'
              ]
            }
          ]
        }
      ],
      deliverables: [
        'BA Career Roadmap PDF',
        'Certification Comparison Chart',
        'Salary Growth Sheet',
        'Resume Templates (Fresher & Switcher)',
        'Interview Question Bank',
        'Case Study Samples',
        'LeanMultiverse Starter Certificate'
      ],
      certification: 'Business Analyst Career Foundation Certificate',
      upsell: {
        title: 'Business Analyst Certification & Job Accelerator',
        description: 'This course gave you clarity. The advanced program will give you conversion.',
        includes: [
          'ECBA / CCBA / PMI-PBA Exam Training',
          'Agile BA + Product Owner Training',
          'Real Case Studies',
          'Mock Interviews',
          'Resume & LinkedIn Optimization',
          'Job Referral Network',
          'Placement Support'
        ]
      }
    },
    {
      id: 'ai-product-management',
      slug: 'ai-product-management-career-starter',
      title: 'AI Product Management Career Starter – From Zero to Decision',
      shortTitle: 'AI Product Management Career Starter',
      price: 2499,
      originalPrice: 4999,
      duration: '1 Month',
      schedule: 'Friday, Saturday, Sunday',
      timePerWeek: '2 Hours per Week',
      totalHours: '8 Hours Total',
      goal: [
        'Make them understand Product Management in simple language',
        'Explain how AI products are different from normal software',
        'Show real roles, skills, salary, companies',
        'Give global certification & learning roadmap',
        'Prepare them for Advanced AI Product Manager Certification Program'
      ],
      targetAudience: [
        'MBAs exploring Product Management',
        'Engineers wanting to transition to PM',
        'Business professionals interested in AI products',
        'Career switchers targeting high-growth roles'
      ],
      weeklyStructure: [
        {
          week: 1,
          title: 'PRODUCT MANAGEMENT & AI BASICS',
          goal: 'Understand Product Management and AI products fundamentals',
          sessions: [
            {
              title: 'Session 1: What is Product Management',
              topics: [
                'Idea → Market → User → Feature → Launch → Scale',
                'PM vs Developer vs Designer vs Business vs Data Scientist',
                'Why PMs are paid 15-60 LPA'
              ]
            },
            {
              title: 'Session 2: What is an AI Product',
              topics: [
                'ChatGPT, Alexa, Recommendation Systems, Fraud Detection',
                'How AI products learn vs rule-based software',
                'Why roadmap & metrics are different for AI products'
              ]
            },
            {
              title: 'Session 3: AI PM Career Path',
              topics: [
                'Associate PM (AI)',
                'Product Manager (AI)',
                'Senior PM → Group PM',
                'Director of Product (AI)'
              ]
            }
          ]
        },
        {
          week: 2,
          title: 'SKILLS & TOOLS OF AN AI PRODUCT MANAGER',
          goal: 'Learn essential PM and AI-specific skills',
          sessions: [
            {
              title: 'Session 1: Core PM Skills',
              topics: [
                'User Research',
                'PRD writing',
                'Roadmapping',
                'Prioritization (RICE, MoSCoW)',
                'Stakeholder Management',
                'Go-To-Market'
              ]
            },
            {
              title: 'Session 2: AI-Specific Skills',
              topics: [
                'Understanding ML lifecycle',
                'Data vs Model vs Feature thinking',
                'Bias, Ethics, Explainability',
                'Metrics for AI (Precision, Recall, Accuracy, Drift)'
              ]
            },
            {
              title: 'Session 3: Tools',
              topics: [
                'JIRA, Confluence',
                'Productboard, Aha',
                'SQL (concept)',
                'Analytics (Mixpanel, GA)',
                'MLOps overview (concept)'
              ]
            }
          ]
        },
        {
          week: 3,
          title: 'CERTIFICATION & LEARNING ROADMAP',
          goal: 'Explore PM and AI certifications',
          sessions: [
            {
              title: 'Session 1: Top Global Certifications',
              topics: [
                'Product: CSPO, SAFe POPM, PMI-ACP',
                'AI: Google AI for PMs, Microsoft AI-900, AWS AI Practitioner',
                'Coursera AI Product Management by Duke University'
              ]
            },
            {
              title: 'Session 2: Role Mapping',
              topics: [
                'Business PM → AI PM',
                'Data Analyst → AI PM',
                'MBA → AI PM',
                'Engineer → AI PM'
              ]
            },
            {
              title: 'Session 3: Salary & Company Targeting',
              topics: [
                'Startups vs MNC vs Big Tech',
                'India vs US vs Remote AI PM roles',
                'FAANG & AI-first startups'
              ]
            }
          ]
        },
        {
          week: 4,
          title: 'RESUME, PORTFOLIO & ADVANCED PROGRAM',
          goal: 'Build job-ready materials and explore advanced training',
          sessions: [
            {
              title: 'Session 1: AI PM Resume & Portfolio',
              topics: [
                'Resume template (Fresher / Switcher)',
                'AI Product Case Study format',
                'PRD samples',
                'GitHub / Notion Portfolio'
              ]
            },
            {
              title: 'Session 2: Interview & Case Preparation',
              topics: [
                'Product Sense',
                'Analytics Case',
                'ML Tradeoff Case',
                'Ethics & Bias Questions'
              ]
            },
            {
              title: 'Session 3: Advanced Program Preview',
              topics: [
                'AI Product Manager Certification & Job Accelerator',
                'Industry-ready transformation path'
              ]
            }
          ]
        }
      ],
      deliverables: [
        'AI PM Career Roadmap',
        'Certification Comparison Chart',
        'Salary Growth Sheet',
        'Resume & PRD Templates',
        'AI Case Study Samples',
        'Interview Question Bank',
        'LeanMultiverse Starter Certificate'
      ],
      certification: 'AI Product Management Career Foundation Certificate',
      upsell: {
        title: 'AI Product Manager Certification & Job Accelerator',
        description: 'This ₹2499 course gave you clarity. The advanced program will make you industry-ready AI PM.',
        includes: [
          'CSPO / SAFe POPM Certification',
          'AI-900 / AWS AI Practitioner',
          'Real AI Product Case Studies',
          'PRD & Roadmap Workshops',
          'Mock Interviews with PMs',
          'Portfolio Building',
          'Placement Support'
        ]
      }
    },
    {
      id: 'ai-project-management',
      slug: 'ai-project-management-career-starter',
      title: 'AI Project Management Career Starter – From Zero to Decision',
      shortTitle: 'AI Project Management Career Starter',
      price: 2499,
      originalPrice: 4999,
      duration: '1 Month',
      schedule: 'Friday, Saturday, Sunday',
      timePerWeek: '2 Hours per Week',
      totalHours: '8 Hours Total',
      goal: [
        'Explain Project Management in simple language',
        'Show how managing AI projects is different from normal IT projects',
        'Clarify roles, salary, career growth',
        'Give global certification roadmap',
        'Prepare them for Advanced AI Project Manager Certification Program'
      ],
      targetAudience: [
        'Project coordinators seeking AI project roles',
        'IT project managers transitioning to AI',
        'MBAs targeting tech project management',
        'Career switchers exploring AI leadership'
      ],
      weeklyStructure: [
        {
          week: 1,
          title: 'PROJECT MANAGEMENT + AI BASICS',
          goal: 'Understand project management and AI project specifics',
          sessions: [
            {
              title: 'Session 1: What is Project Management',
              topics: [
                'What is a project',
                'Why projects fail',
                'Role of PM as planner, leader, risk controller',
                'PM vs Scrum Master vs Product Manager vs Program Manager'
              ]
            },
            {
              title: 'Session 2: What Makes an AI Project Different',
              topics: [
                'Data dependency',
                'Model training cycles',
                'Experimentation vs fixed scope',
                'Why timelines change in AI projects',
                'Ethical & compliance risks'
              ]
            },
            {
              title: 'Session 3: Career Path in AI Project Management',
              topics: [
                'Junior Project Coordinator',
                'AI Project Manager',
                'Senior Program Manager',
                'AI Delivery Head',
                'Transformation Lead'
              ]
            }
          ]
        },
        {
          week: 2,
          title: 'SKILLS & TOOLS OF AN AI PROJECT MANAGER',
          goal: 'Learn PM skills and AI project management tools',
          sessions: [
            {
              title: 'Session 1: Core PM Skills',
              topics: [
                'Scope, Cost, Time, Quality',
                'Stakeholder Communication',
                'Risk Management',
                'Agile & Scrum',
                'Hybrid Project Management'
              ]
            },
            {
              title: 'Session 2: AI-Specific Understanding',
              topics: [
                'Data lifecycle',
                'Model development lifecycle (CRISP-DM, MLOps)',
                'Cross-team coordination (Data Scientists, Engineers, Business)',
                'AI Governance & Compliance'
              ]
            },
            {
              title: 'Session 3: Tools',
              topics: [
                'JIRA, MS Project',
                'Confluence',
                'Azure DevOps',
                'Miro, Lucidchart',
                'AI workflow tools (conceptual)'
              ]
            }
          ]
        },
        {
          week: 3,
          title: 'CERTIFICATION & CAREER ROADMAP',
          goal: 'Explore PM and AI certifications for career growth',
          sessions: [
            {
              title: 'Session 1: Global Certifications',
              topics: [
                'PM Core: PMP, PRINCE2, PMI-ACP, SAFe Agilist',
                'AI Layer: Microsoft AI-900, AWS AI Practitioner, Google AI',
                'Certified AI Project Manager (vendor neutral)'
              ]
            },
            {
              title: 'Session 2: Certification Mapping',
              topics: [
                'Fresher / Coordinator → CAPM + AI-900',
                'Working Professional → PMP + Agile',
                'Tech PM → SAFe + AI Fundamentals',
                'Leadership Track → PgMP + AI Strategy'
              ]
            },
            {
              title: 'Session 3: Job Role Mapping',
              topics: [
                'AI Project Manager',
                'Digital Transformation PM',
                'Delivery Manager',
                'Program Manager',
                'PMO – AI Portfolio'
              ]
            }
          ]
        },
        {
          week: 4,
          title: 'RESUME, INTERVIEW & UPSKILLING FUNNEL',
          goal: 'Prepare for AI PM roles and explore advanced training',
          sessions: [
            {
              title: 'Session 1: AI Project Manager Resume',
              topics: [
                'Resume Template (Fresher / Switcher / Experienced)',
                'ATS Keywords',
                'Domain-based positioning (BFSI, Healthcare, Retail, SaaS)'
              ]
            },
            {
              title: 'Session 2: Interview Preparation',
              topics: [
                'AI project case questions',
                'Risk scenarios',
                'Stakeholder conflict cases',
                'Agile vs Waterfall in AI projects'
              ]
            },
            {
              title: 'Session 3: Advanced Program Introduction',
              topics: [
                'AI Project Manager Certification & Job Accelerator',
                'Path to certified, job-ready AI Project Leader'
              ]
            }
          ]
        }
      ],
      deliverables: [
        'AI PM Career Roadmap PDF',
        'Certification Comparison Matrix',
        'Salary Growth Chart',
        'Resume Templates (3 Levels)',
        'Interview Question Bank',
        'AI Project Lifecycle Guide',
        'LeanMultiverse Starter Certificate'
      ],
      certification: 'AI Project Management Career Foundation Certificate',
      upsell: {
        title: 'AI Project Manager Certification & Job Accelerator',
        description: 'This course helped you understand AI Project Management. The advanced program will make you a certified, job-ready AI Project Leader.',
        includes: [
          'PMP / PMI-ACP / SAFe Agilist',
          'AI-900 / AWS AI Practitioner',
          'Real AI Project Simulations',
          'Mock Interviews',
          'Resume & LinkedIn Branding',
          'Job Referral Network',
          'Placement Support'
        ]
      }
    }
  ]
  