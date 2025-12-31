"use client"

import { useState, useEffect, useMemo, memo, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  quote: string
  rating: number
  achievement: string
  course: string
  image?: string
  instagram?: string
  linkedin?: string
}

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

// Placeholder image for when Google Drive images fail to load
const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23fbbf24'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='14' fill='%23000'%3E%3C/text%3E%3C/svg%3E"

const testimonials: Testimonial[] = [
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
    role: "Professional",
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
    role: "EX - Aquila Engineering LLC",
    company: "Unemployed",
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

// Memoized testimonial card component
const TestimonialCard = memo(({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div
      key={testimonial.id}
      className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 relative overflow-hidden group"
    >
      {/* Hover effect background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      <div className="relative z-10">
        <div 
          className="mb-4 flex items-start gap-3"
        >
          {/* Profile Image - Always render container for consistent structure */}
          <div className="flex-shrink-0 relative w-16 h-16">
            {/* Image - always rendered, hidden if no image URL */}
            {testimonial.image ? (
              <div className="relative w-16 h-16">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={96}
                  height={96}
                  className="rounded-full object-cover object-center border-2 border-yellow-400/30 flex-shrink-0 bg-yellow-400/20"
                  style={{ objectPosition: 'center top' }}
                  unoptimized={testimonial.image.includes('drive.google.com') || testimonial.image.includes('lh3.googleusercontent.com')}
                  loading="lazy"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement
                    const currentSrc = img.src
                    
                    // Try alternative Google Drive formats
                    const fileIdMatch = currentSrc.match(/id=([a-zA-Z0-9_-]+)/)
                    if (fileIdMatch && fileIdMatch[1]) {
                      const fileId = fileIdMatch[1]
                      
                      // Try uc?export=view format
                      if (!currentSrc.includes('uc?export=view')) {
                        img.src = `https://drive.google.com/uc?export=view&id=${fileId}`
                        return
                      }
                      
                      // Try lh3.googleusercontent.com format
                      if (!currentSrc.includes('lh3.googleusercontent.com')) {
                        img.src = `https://lh3.googleusercontent.com/d/${fileId}`
                        return
                      }
                    }
                    
                    // If all formats fail, show placeholder
                    img.style.display = 'none'
                    const placeholder = img.parentElement?.parentElement?.querySelector('[data-placeholder]') as HTMLElement
                    if (placeholder) {
                      placeholder.style.display = 'flex'
                    }
                  }}
                  onLoad={() => {
                    // Hide placeholder when image loads successfully
                    const placeholder = document.querySelector(`[data-placeholder-for="${testimonial.name}"]`) as HTMLElement
                    if (placeholder) {
                      placeholder.style.display = 'none'
                    }
                  }}
                />
              </div>
            ) : null}
            {/* Fallback placeholder - always rendered, shown when no image */}
            <div 
              data-placeholder
              data-placeholder-for={testimonial.name}
              className="w-16 h-16 rounded-full border-2 border-yellow-400/30 bg-yellow-400/20 flex items-center justify-center flex-shrink-0 absolute inset-0"
              style={{ display: testimonial.image ? 'none' : 'flex' }}
            >
              <span className="text-yellow-400 text-lg font-bold">
                {testimonial.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 
              className="text-white font-semibold mb-1"
            >
              {testimonial.name}
            </h4>
            <p 
              className="text-gray-400 text-sm"
            >
              {testimonial.role} {testimonial.company && `• ${testimonial.company}`}
            </p>
            {/* Social Links */}
            <div className="flex gap-2 mt-2">
              {testimonial.instagram && (
                <a
                  href={testimonial.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-pink-300 transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
              {testimonial.linkedin && (
                <a
                  href={testimonial.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        <div 
          className="flex mb-3"
        >
        {[...Array(testimonial.rating)].map((_, i) => (
            <svg
            key={i}
            className="w-4 h-4 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        <p 
          className="text-gray-300 text-sm mb-4 line-clamp-3"
        >
        &ldquo;{testimonial.quote}&rdquo;
        </p>

        <div 
          className="border-t border-white/10 pt-4"
        >
          <div 
            className="achievement-badge text-yellow-400 font-semibold text-sm bg-yellow-400/10 px-3 py-1 rounded-full inline-block mb-2"
          >
          {testimonial.achievement}
          </div>
          <div 
            className="text-gray-400 text-xs"
          >
          {testimonial.course}
          </div>
        </div>
      </div>
    </div>
  )
})

TestimonialCard.displayName = 'TestimonialCard'

export default function SuccessStories() {
  const [selectedTestimonial, setSelectedTestimonial] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Memoize testimonials array to prevent unnecessary re-renders
  const memoizedTestimonials = useMemo(() => testimonials, [])

  // Safety check
  if (!memoizedTestimonials || memoizedTestimonials.length === 0) {
    return null
  }

  // Memoize callbacks
  const nextTestimonial = useCallback(() => {
    setSelectedTestimonial((prev) => (prev + 1) % memoizedTestimonials.length)
  }, [memoizedTestimonials.length])

  const prevTestimonial = useCallback(() => {
    setSelectedTestimonial((prev) => (prev - 1 + memoizedTestimonials.length) % memoizedTestimonials.length)
  }, [memoizedTestimonials.length])

  // Auto-play functionality with debouncing
  useEffect(() => {
    if (!isAutoPlaying || memoizedTestimonials.length === 0) return
    
    const interval = setInterval(() => {
      setSelectedTestimonial((prev) => (prev + 1) % memoizedTestimonials.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying, memoizedTestimonials.length])

  return (
    <section className="py-20 bg-black relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[6px] text-yellow-400 lg:text-[20px] text-[16px] font-medium mb-3">
            Success Stories
          </p>
          <h2 className="text-[30px] md:text-[46.13px] font-bold mb-6 text-white">
            Transform Your Career
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Join thousands of professionals who have transformed their careers 
            and organizations through our comprehensive learning programs.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div 
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden"
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full blur-2xl"
            />
          </div>

          <div 
            key={selectedTestimonial}
            className="relative z-10"
          >
            <div className="text-center lg:text-left">
                <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
                  {/* Profile Image - Always render container for consistent structure */}
                  <div className="flex-shrink-0 relative w-24 h-24">
                    {/* Image - always rendered */}
                    {memoizedTestimonials[selectedTestimonial].image ? (
                      <div className="relative w-24 h-24">
                        <Image
                          src={memoizedTestimonials[selectedTestimonial].image}
                          alt={memoizedTestimonials[selectedTestimonial].name}
                          width={120}
                          height={120}
                          className="rounded-full object-cover object-center border-4 border-yellow-400/30 shadow-lg bg-yellow-400/20"
                          style={{ objectPosition: 'center top' }}
                          unoptimized={memoizedTestimonials[selectedTestimonial].image.includes('drive.google.com') || memoizedTestimonials[selectedTestimonial].image.includes('lh3.googleusercontent.com')}
                          onError={(e) => {
                            const img = e.currentTarget as HTMLImageElement
                            const currentSrc = img.src
                            
                            // Try alternative Google Drive formats
                            const fileIdMatch = currentSrc.match(/id=([a-zA-Z0-9_-]+)/)
                            if (fileIdMatch && fileIdMatch[1]) {
                              const fileId = fileIdMatch[1]
                              
                              // Try uc?export=view format
                              if (!currentSrc.includes('uc?export=view')) {
                                img.src = `https://drive.google.com/uc?export=view&id=${fileId}`
                                return
                              }
                              
                              // Try lh3.googleusercontent.com format
                              if (!currentSrc.includes('lh3.googleusercontent.com')) {
                                img.src = `https://lh3.googleusercontent.com/d/${fileId}`
                                return
                              }
                            }
                            
                            // If all formats fail, hide image and show placeholder
                            img.style.display = 'none'
                            const placeholder = img.parentElement?.parentElement?.querySelector('[data-placeholder]') as HTMLElement
                            if (placeholder) {
                              placeholder.style.display = 'flex'
                            }
                          }}
                          onLoad={() => {
                            // Hide placeholder when image loads successfully
                            const placeholder = document.querySelector(`[data-placeholder-for="${memoizedTestimonials[selectedTestimonial].name}"]`) as HTMLElement
                            if (placeholder) {
                              placeholder.style.display = 'none'
                            }
                          }}
                        />
                      </div>
                    ) : null}
                    {/* Fallback placeholder - always rendered */}
                    <div 
                      data-placeholder-for={memoizedTestimonials[selectedTestimonial].name}
                      className="w-24 h-24 rounded-full border-4 border-yellow-400/30 shadow-lg bg-yellow-400/20 flex items-center justify-center absolute inset-0"
                      style={{ display: memoizedTestimonials[selectedTestimonial].image ? 'none' : 'flex' }}
                    >
                      <span className="text-yellow-400 text-2xl font-bold">
                        {memoizedTestimonials[selectedTestimonial].name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                <div 
                  className="flex justify-center lg:justify-start mb-4"
                >
                {[...Array(5)].map((_, i) => (
                    <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <blockquote 
                  className="text-xl md:text-2xl text-white mb-6 leading-relaxed"
                >
                    &ldquo;{memoizedTestimonials[selectedTestimonial].quote}&rdquo;
                </blockquote>
                  </div>
                </div>

                <div 
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6"
                >
                  <div>
                    <h4 
                      className="text-xl font-bold text-white"
                    >
                      {memoizedTestimonials[selectedTestimonial].name}
                    </h4>
                    <p 
                      className="text-gray-300"
                    >
                      {memoizedTestimonials[selectedTestimonial].role}
                    </p>
                    <p 
                      className="text-yellow-400 font-semibold"
                    >
                      {memoizedTestimonials[selectedTestimonial].company}
                    </p>
                    {/* Social Links */}
                    <div className="flex gap-3 mt-3">
                      {memoizedTestimonials[selectedTestimonial].instagram && (
                        <a
                          href={memoizedTestimonials[selectedTestimonial].instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-400 hover:text-pink-300 transition-colors"
                          aria-label="Instagram"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </a>
                      )}
                      {memoizedTestimonials[selectedTestimonial].linkedin && (
                        <a
                          href={memoizedTestimonials[selectedTestimonial].linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                          aria-label="LinkedIn"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                  <div 
                    className="text-center sm:text-right"
                  >
                    <div 
                      className="achievement-badge text-yellow-400 font-bold text-lg bg-yellow-400/10 px-4 py-2 rounded-full border border-yellow-400/30"
                    >
                      {memoizedTestimonials[selectedTestimonial].achievement}
                    </div>
                    <div 
                      className="text-gray-400 text-sm mt-1"
                    >
                      {memoizedTestimonials[selectedTestimonial].course}
                    </div>
                  </div>
                </div>
              </div>
          </div>

          {/* Enhanced Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              onClick={prevTestimonial}
              className="bg-white/10 text-white hover:bg-white/20 rounded-full w-12 h-12 p-0 border border-white/20 backdrop-blur-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            
            <Button
              onClick={nextTestimonial}
              className="bg-white/10 text-white hover:bg-white/20 rounded-full w-12 h-12 p-0 border border-white/20 backdrop-blur-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>

            <Button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`rounded-full w-12 h-12 p-0 border backdrop-blur-md ${
                isAutoPlaying 
                  ? "bg-yellow-400/20 text-yellow-400 border-yellow-400/30" 
                  : "bg-white/10 text-white border-white/20"
              }`}
            >
              {isAutoPlaying ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </Button>
          </div>

          {/* Enhanced Dots */}
          <div 
            className="flex justify-center gap-2 mt-6"
          >
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === selectedTestimonial ? "bg-yellow-400" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* All Testimonials Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {memoizedTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div 
          className="text-center mt-16 relative"
        >
          {/* Background glow effect */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-transparent to-blue-400/10 rounded-3xl blur-3xl"
          />

          <div className="relative z-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-12">
            <h3 
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
            Ready to Transform Your Career?
            </h3>
            <p 
              className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg"
            >
            Join thousands of successful professionals who have advanced their careers 
            through our comprehensive learning programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/book-webinar">
                <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto">
                  Book Webinar
              </Button>
              </Link>
              <Link href="/book-one-on-one">
                <Button className="bg-white/10 text-white hover:bg-white/20 rounded-full px-8 py-4 text-lg font-semibold border border-white/20 backdrop-blur-md hover:border-white/40 transition-all duration-300 w-full sm:w-auto">
                  Book One on One
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
