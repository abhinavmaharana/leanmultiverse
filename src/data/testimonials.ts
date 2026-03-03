
// Helper function to convert Google Drive sharing link to direct image URL
const getDriveImageUrl = (driveUrl: string): string => {
  if (!driveUrl) return ""

  // Extract file ID from various Google Drive URL formats
  let fileId = null

  // Try id= pattern first (e.g., https://drive.google.com/open?id=FILE_ID)
  const idMatch = driveUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/)
  if (idMatch && idMatch[1]) {
    fileId = idMatch[1]
  } else {
    // Try /d/ pattern (e.g., https://drive.google.com/file/d/FILE_ID)
    const dMatch = driveUrl.match(/\/d\/([a-zA-Z0-9_-]+)/)
    if (dMatch && dMatch[1]) {
      fileId = dMatch[1]
    }
  }

  if (fileId) {
    // Use thumbnail API - more reliable for public files
    // sz parameter controls size: w400 = width 400px
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`
  }

  // If no match, return original URL
  return driveUrl
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  quote: string
  rating: number
  achievement?: string
  course?: string
  image?: string
  instagram?: string
  linkedin?: string
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Saurabh Gurav",
    role: "Senior Associate Consultant- Lead BA",
    company: "Synechron",
    quote: "Grateful to be trained under Nitesh Prasad for Product Management and to continue my PMP® preparation under his guidance. His ability to simplify complex concepts, provide practical insights, and consistently support learners truly stands out. Great work in helping professionals build strong understanding and confidence. Applaud the dedication and mentorship 👏",
    rating: 5,
    achievement: "Product Management Certified",
    course: "Product Management & PMP Preparation",
    image: getDriveImageUrl("https://drive.google.com/open?id=1LJlduhYpOivR9pBIpv8xH-ynSuj0LbSV"),
    instagram: "https://www.instagram.com/adrenaline_vein",
    linkedin: "https://www.linkedin.com/in/saurabh-gurav-165521195"
  },
  {
    id: "2",
    name: "Prabhkirat Singh Mehta",
    role: "Amazon",
    company: "",
    quote: "This Product Management course has been a truly transformative experience, largely because of the exceptional expertise and unwavering commitment of our trainer, Nitesh Prasad, to our growth as product professionals. His depth of knowledge on the subject, combined with the clarity with which he explained even the most complex concepts, made every session insightful and highly practical. What stood out the most was his zeal to help us genuinely upskill – he went far beyond the standard curriculum, investing extra hours, conducting long study sessions, and patiently addressing every doubt so that we did not just pass an exam but became more confident and capable in real-world product roles. I am genuinely grateful for the energy, time, and dedication Nitesh brought to every class, and would highly recommend him as a mentor and instructor to anyone looking to build a strong foundation in Management.",
    rating: 5,
    achievement: "Product Management Certified",
    course: "Product Management Training",
    image: getDriveImageUrl("https://drive.google.com/open?id=1PUhMdogdS01gnY5g2IeR39ZHlxBlP-GA"),
    instagram: "https://www.instagram.com/prabhkiratmehta",
    linkedin: "https://www.linkedin.com/in/prabhkirat-singh-mehta"
  },
  {
    id: "3",
    name: "Pratha Mathur",
    role: "Senior Associate",
    company: "MetLife",
    quote: "I'm extremely grateful to Nitesh sir for providing such an insightful and interactive coursework on Product Management and sharing his vast expertise and industry specific nuances on the subject matter. His overall ability to translate complex concepts into comprehensible viewpoints by relating it into day-to-day scenarios is noteworthy. I applaud him for his tenacious efforts, consistency and moreover his zest to bring out the best in everybody. Under his mentorship, students like me were able to obtain practical insights as well as a morale boost to believe in our potential and make the most of every opportunity presented to us. Kudos to him and his wonderful team! :)",
    rating: 5,
    achievement: "Product Management Excellence",
    course: "Product Management Program",
    image: getDriveImageUrl("https://drive.google.com/open?id=1ctCrbSVkEOF1hlKHoDlqX4OCiVlFf1Fc"),
    instagram: "https://www.instagram.com/pratha_mathur",
    linkedin: "https://www.linkedin.com/in/pratha-m-b76ba3152"
  },
  {
    id: "4",
    name: "Rudra Narayan Behera",
    role: "Fresher (Student)",
    company: "Student",
    quote: "I have been following and training under @corporate.wala.youtuber (Nitesh Prasad), and his Instagram content has genuinely transformed the way I approach my career and professional growth. His videos are not only highly engaging and easy to understand, but they are also packed with real-world insights that help learners like me improve career skills, build confidence, and better navigate the corporate world. The practical advice he shares - from choosing the right certifications to mastering workplace dynamics - has helped me grow both personally and professionally. His positive direction, motivational style, and deep understanding of corporate challenges make his content extremely valuable not just to me, but to many others who aspire to upskill, succeed in their jobs, and achieve higher goals. The consistency and quality of his guidance have made learning enjoyable and inspiring.",
    rating: 5,
    achievement: "Career Transformation",
    course: "Professional Development Program",
    image: getDriveImageUrl("https://drive.google.com/open?id=1OnMHjVoQkZARsrgwiOWsGo_tX1tyBcaB"),
    instagram: "https://www.instagram.com/rudra_nb_",
    linkedin: "https://www.linkedin.com/in/rudranarayanbehera"
  },
  {
    id: "5",
    name: "Sagar Singh",
    role: "Operation Manager",
    company: "Loop Health",
    quote: "I honestly don't think I can call Nitesh Prasad just a trainer. From day one, he showed what real mentorship looks like. The amount of effort he puts in is something you don't see often. Late nights, extra sessions, staying back just to make sure no one is left confused. He has this rare gift of explaining even the most complicated product management concepts in such a simple way that it feels like learning from scratch, calmly, patiently, without ever making you feel small for not knowing something. What really makes the experience special is the confidence he builds in you. It's not about clearing a certification. It's about believing that you can handle tough problems, take on big responsibilities, and grow into a better product professional and leader. There's a very genuine, desi 'don't worry, I'm here' feeling in the way he teaches, and that support stays with you even after the sessions end. For me, he's not just one of the best mentors I've had for product management, but someone I truly see as a lifelong coach, the kind of mentor who makes you feel like you can take on any challenge in the world as long as he's standing behind you.",
    rating: 5,
    achievement: "Lifelong Mentorship",
    course: "Product Management",
    image: getDriveImageUrl("https://drive.google.com/open?id=1bggJoIqIUIGhbLrlk_iHC6q_ZDX7JwOe"),
    instagram: "https://www.instagram.com/alfabetaboii",
    linkedin: "https://www.linkedin.com/in/sagarsinghcareer"
  },
  {
    id: "6",
    name: "Akash Dhankani",
    role: "Business Architecture Analyst",
    company: "Accenture",
    quote: "What makes this experience exceptional is the hands-on approach to complex PM frameworks. The incredible 1:1 mentorship from Nitesh Sir, this program is a deep dive into the DNA of Product Management. From mastering scrum and agile to perfecting my professional brand, the attention to detail is unmatched. If you want to move from 'learning' to 'leading' projects with confidence, this is the place to be.",
    rating: 5,
    achievement: "PM Framework Mastery",
    course: "Product Management Program",
    image: getDriveImageUrl("https://drive.google.com/open?id=1enlRMLPxGDgMGYRLFuTUBhho7X_1Mgdo"),
    instagram: "https://www.instagram.com/akash_dhankani09",
    linkedin: "https://www.linkedin.com/in/akashdhankani"
  },
  {
    id: "7",
    name: "Sumit Roy",
    role: "Professional",
    company: "Aml Rightsource",
    quote: "The product training session was very informative and well-structured. It provided a clear understanding of key product features, use cases, and customer value. The trainer explained concepts effectively with relevant examples, making it easy to connect theory with practical scenarios. Overall, it was an engaging and useful session that enhanced my product knowledge and confidence.",
    rating: 5,
    achievement: "Enhanced Product Knowledge",
    course: "Product Training Program",
    image: getDriveImageUrl("https://drive.google.com/open?id=1BIRLvauWFY-O1fyVhXlShKM_W6fbZDQ-"),
    instagram: "https://www.instagram.com/_chucklenchillz_",
    linkedin: ""
  },
  {
    id: "8",
    name: "Piyush Mahajan",
    role: "Professional",
    company: "Wipro Ltd.",
    quote: "Had a great learning experience in the Product Management session conducted by Nitish Prasad. The session was extremely insightful, well-structured, and practical. Nitish has a remarkable way of breaking down complex product concepts into simple, real-world examples, making them easy to understand and apply. The discussions around product strategy, user-centric thinking, and decision-making added immense value and clarity. Truly appreciate the energy, clarity, and depth of knowledge he brought to the session. Highly recommended for anyone looking to build or strengthen their understanding of Product Management! 🚀",
    rating: 5,
    achievement: "Product Strategy Excellence",
    course: "Product Management Training",
    image: getDriveImageUrl("https://drive.google.com/open?id=1-4fAfqtge9gSV8bBDV-G7IQxBw1P6JBh"),
    instagram: "https://www.instagram.com/Mahajan__1",
    linkedin: "https://www.linkedin.com/in/piyush-mahajan-4ab0a6220"
  },
  {
    id: "9",
    name: "Divya Choudhary",
    role: "Management Graduate",
    company: "",
    quote: "I approached the Product Management certification with some apprehension about the complexity of the framework. I was worried that without years of corporate experience, the concepts might be difficult to grasp, but Nitesh Sir made the learning curve feel effortless. What stands out about Nitesh Sir is his ability to deconstruct complex Agile concepts into simple, logical components using relatable, real-world examples. He fosters an encouraging environment where no question is considered 'too basic,' and his patience in clearing doubts is commendable—especially for someone just starting their career. He didn't just teach the syllabus; he helped bridge the gap between academic knowledge and industry application. The experience at Leanmultiverse felt less like a commercial transaction and more like a genuine partnership in my professional development.",
    rating: 5,
    achievement: "Product Management Certification Success",
    course: "Product Management Training",
    image: getDriveImageUrl("https://drive.google.com/open?id=1QG2bXq7pQ844kKDKzXHIzaGA8Zawe3hF"),
    instagram: "https://www.instagram.com/divy_choudhary27",
    linkedin: "https://www.linkedin.com/in/divyachoudhary0999"
  },
  {
    id: "10",
    name: "Sanika H S",
    role: "Software Engineer",
    company: "Ex-CGI",
    quote: "The Product Management course is really helpful in understanding real-world product management along with preparing for the product management certification. The sessions conducted by Nitesh sir are very practical. It gave me more confidence to move toward product roles.",
    rating: 4,
    achievement: "Product Role Confidence",
    course: "Product Management",
    image: getDriveImageUrl("https://drive.google.com/open?id=1UYGHLVQE8sbf2ldE3lJNJfMDWWL3AeTF"),
    instagram: "",
    linkedin: ""
  },
  {
    id: "11",
    name: "Nilesh Singh Kuntia",
    role: "Sr Manager",
    company: "Tata Steel",
    quote: "A big thank you to Nitesh for being an exceptional mentor throughout my journey into Product Management and Project Management. His guidance helped me build a strong foundation in product mindset, execution frameworks, and real-world problem-solving. He consistently challenged my thinking, provided actionable feedback, and helped me connect my past experience with product roles. Thanks to his mentorship, I now have much more clarity and confidence in navigating this new career path. Truly impactful guidance!",
    rating: 5,
    achievement: "Career Path Clarity",
    course: "Product & Project Management",
    image: getDriveImageUrl("https://drive.google.com/open?id=1f6ceq2PEIW1i_JJRzTx1STE_snXRywny"),
    instagram: "https://www.instagram.com/_nilvick_",
    linkedin: "https://www.linkedin.com/in/nilesh-singh-kuntia-401699a2"
  },
  {
    id: "12",
    name: "Nayan Bhagwat",
    role: "",
    company: "EX - Aquila Engineering LLC",
    quote: "The POPM course has been truly transformational for me 🌟. I'm very grateful to be trained under Nitesh, who provides practical, real-world insights aligned with the current job market and corporate expectations 💡🚀. His guidance is always based on ground reality, and although he may roast us during sessions 😄, it's always for our growth and better understanding. This approach really helps build confidence and prepares us for real corporate challenges 💪. Overall, this course has added great value to my learning and career direction. Highly recommended 🙌✨",
    rating: 5,
    achievement: "Career Transformation",
    course: "Product Management Training",
    image: getDriveImageUrl("https://drive.google.com/open?id=1lWmYE6aKO2cc_MHGoIrFaADbET8ELH0l"),
    instagram: "https://www.instagram.com/nayan.02_",
    linkedin: "https://www.linkedin.com/in/nayan-bhagwat"
  },
  {
    id: "13",
    name: "Tithi Kundu",
    role: "Senior Associate",
    company: "Amazon",
    quote: "I had a very good learning experience with Lean Multiverse while preparing for the Product & Scrum certifications. The coaching covered everything from strong fundamentals to hands-on practical assignments, which helped me clearly understand real-world application. Beyond certification training, the team also supported me in building my CV and optimizing my Naukri and LinkedIn profiles. They were always available for guidance and consistently supported me in interview preparation. Overall, the mentorship was structured, practical, and extremely helpful for my career growth.",
    rating: 5,
    achievement: "Dual Certification Success",
    course: "Product & Scrum",
    image: getDriveImageUrl("https://drive.google.com/open?id=1uJiQ_ngk4ryfyWqbovwqZ3I0cpkbMu5n"),
    instagram: "https://www.instagram.com/imperfectionist9",
    linkedin: "https://www.linkedin.com/in/tithikundu"
  },
  {
    id: "14",
    name: "Punit Jain",
    role: "Software Engineer",
    company: "Coforge",
    quote: "I had a great learning experience studying Product and Scrum under Nitesh Prasad. His way of explaining concepts is very clear, structured, and practical, which made complex agile frameworks easy to understand. He connects theory with real-world examples, helping learners grasp not just the what, but also the why behind Scrum and product ownership practices. His sessions were engaging, interactive, and well-paced, encouraging questions and discussions. Overall, his guidance has significantly strengthened my understanding of Product and Scrum, and I feel more confident applying these concepts in real projects.",
    rating: 5,
    achievement: "Agile Framework Mastery",
    course: "Product & Scrum Training",
    image: getDriveImageUrl("https://drive.google.com/open?id=1SdBrsctqU0JYaaZV29ctmp1PdElqb8gE"),
    instagram: "https://www.instagram.com/jpunit111",
    linkedin: "https://www.linkedin.com/in/punitmittal111"
  },
  {
    id: "15",
    name: "Ansh Srivastava",
    role: "Operations Intern",
    company: "Springworks",
    quote: "Learning from Nitesh sir has been an incredibly enriching experience. His sessions are highly engaging and filled with practical, real-world insights—especially around managing work effectively in the Product Management domain. Every insight he shares feels relevant and immediately applicable. What truly sets him apart is his unwavering support, not only during the sessions but even beyond them. His guidance with resume building and profile optimization adds immense value and makes the overall learning journey far more impactful and rewarding.",
    rating: 5,
    achievement: "Career Development",
    course: "Product Management Program",
    image: getDriveImageUrl("https://drive.google.com/open?id=1GTwNR00DScYg4BV9SR6qlELVNblF0euS"),
    instagram: "https://www.instagram.com/_._ansh.xx",
    linkedin: "https://www.linkedin.com/in/anshsrivastava2"
  },
  {
    id: "16",
    name: "Bishal Sahu",
    role: "Student",
    company: "Pursuing BCom",
    quote: "I would like to sincerely thank my trainer, Nitesh Prasad, for his guidance and support throughout the Product Management certification journey. His training approach was clear, practical, and well-structured, making complex concepts easy to understand. He consistently emphasized how the Product certification would be valuable for my future career, which motivated me to stay focused and confident during the learning process. His insights, real-world examples, and encouragement played a key role in helping me achieve this certification, and I truly appreciate his dedication and mentorship.",
    rating: 5,
    achievement: "Product Management Certified",
    course: "Product Management Training",
    image: getDriveImageUrl("https://drive.google.com/open?id=1BhqyDvfxP9iBe_v_OzPTEfBfn3XgSVfQ"),
    instagram: "https://www.instagram.com/B_I_S_H_A_L__S_A_H_U",
    linkedin: "https://www.linkedin.com/in/bishal-shau-3b8a82391"
  },
  {
    id: "17",
    name: "Mohammed Tabrez",
    role: "Senior Executive",
    company: "",
    quote: "I recently completed the Product certification course led by [Nitesh Prasad Sir], and I found the experience incredibly valuable. The instructor demonstrated a deep mastery of the Agile Framework and was able to translate complex concepts into practical, real-world applications. It was a wonderful and good experience. I particularly appreciated the way they managed the pace of the course and facilitated the breakout sessions. Their ability to bridge the gap between the Product Owner and Product Manager roles provided me with a clear roadmap for my own professional development. I feel well-equipped to apply these Lean-Agile principles to my current team.",
    rating: 5,
    achievement: "Product Management Certified",
    course: "Product Management Training",
    image: getDriveImageUrl("https://drive.google.com/open?id=1fcCN7d8wBvvDQXj0bt2gROjunWB4hHlW"),
    instagram: "https://www.instagram.com/Shams_arsalaan786",
    linkedin: "https://www.linkedin.com/in/mohdtabrez11"
  },
  {
    id: "18",
    name: "Aakash Kaushik",
    role: "SME",
    company: "Wipro",
    quote: "I can't thank you enough, Nitesh. You walked into my life as a stranger when I was feeling lost with my work, and now you're a mentor I truly look up to. Thank you for making the certification journey so smooth and for actually making the learning process fun! Your casual yet brutally honest approach makes all the difference. Here's to a lifetime bond—thanks for always being there.",
    rating: 5,
    achievement: "Lifelong Mentorship",
    course: "Certification Program",
    image: getDriveImageUrl("https://drive.google.com/open?id=1_lCRI-YDKudkdCPiAcyVlzlJvZ5ftIOR"),
    instagram: "https://www.instagram.com/aakash.kaushik.50",
    linkedin: ""
  }
]
