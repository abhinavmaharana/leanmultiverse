'use client'

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useShouldAnimate } from "@/hooks/useShouldAnimate"

const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/company/leanmultiverse",
    name: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
  },
  {
    href: "https://www.facebook.com/leanmultiverse",
    name: "Facebook",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
  },
  {
    href: "https://www.instagram.com/leanmultiverse",
    name: "Instagram",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
  },
  {
    href: "https://twitter.com/leanmultiverse",
    name: "X",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
  }
]

const QUICK_LINKS = [
  { href: "#home", text: "Home" },
  { href: "#courses", text: "Courses" },
  { href: "#stories", text: "Success Stories" },
  { href: "#contact", text: "Contact" },
  { href: "/book-webinar", text: "Book Webinar" }
]

const PROGRAM_LINKS = [
  { href: "#courses", text: "Webinar" },
  { href: "#courses", text: "Foundation Courses" },
  { href: "#courses", text: "Professional Courses" },
  { href: "#courses", text: "Career Accelerator" },
  { href: "#courses", text: "Dual Programs" }
]

const SUPPORT_LINKS = [
  { href: "tel:+918062177938", text: "Talk to Expert" },
  { href: "mailto:operations@leanmultiverse.com", text: "Email Operations" },
  { href: "/privacy-policy", text: "Privacy Policy" },
  { href: "/terms-of-service", text: "Terms of Service" },
  { href: "/cookie-policy", text: "Cookie Policy" }
]

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const shouldAnimate = useShouldAnimate()

  useEffect(() => {
    if (typeof window === 'undefined' || !shouldAnimate) return

    const ctx = gsap.context(() => {
      // Animate footer content on scroll
      gsap.fromTo(contentRef.current, 
        { y: 80, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Animate bottom bar
      gsap.fromTo(bottomRef.current, 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          ease: "power3.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [shouldAnimate])

  return (
    <motion.footer 
      ref={footerRef}
      className="bg-black mt-auto"
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Main Footer Content */}
      <motion.div 
        ref={contentRef}
        className="max-w-7xl mx-auto px-6 py-16"
        initial={{ y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Company Info */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link href="/" className="cursor-pointer hover:opacity-80 transition-opacity duration-300">
                <Image src="/logo.svg" alt="Lean Multiverse Logo" width={160} height={44} className="h-8 sm:h-10 md:h-11 w-auto mb-4 sm:mb-6" />
              </Link>
            </motion.div>
            <motion.p 
              className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              viewport={{ once: true }}
            >
              Transforming careers through enterprise agility and digital transformation education. 
              Join 6,00,000+ professionals who have advanced their careers with us.
            </motion.p>
            <motion.div
              className="space-y-1 text-sm sm:text-base"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="tel:+918062177938"
                className="text-yellow-400 hover:text-yellow-300 transition-colors inline-block"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.96 }}
              >
                Call: 080 6217 7938
              </motion.a>
              <br />
              <motion.a
                href="mailto:operations@leanmultiverse.com"
                className="text-gray-300 hover:text-yellow-400 transition-colors inline-block"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.96 }}
              >
                Email: operations@leanmultiverse.com
              </motion.a>
            </motion.div>
            <motion.div 
              className="flex space-x-4"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
              viewport={{ once: true }}
            >
              {SOCIAL_LINKS.map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.href} 
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.name}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.path}/>
                  </svg>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.h3 
              className="text-white font-semibold text-lg mb-6"
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              viewport={{ once: true }}
            >
              Quick Links
            </motion.h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link, index) => (
                <motion.li 
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {link.href.startsWith('/') ? (
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-yellow-400 transition-colors"
                    >
                      <motion.span whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
                        {link.text}
                      </motion.span>
                    </Link>
                  ) : (
                    <motion.a 
                      href={link.href} 
                      className="text-gray-300 hover:text-yellow-400 transition-colors"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.text}
                    </motion.a>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Programs */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h3 
              className="text-white font-semibold text-lg mb-6"
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
              viewport={{ once: true }}
            >
              Programs
            </motion.h3>
            <ul className="space-y-3">
              {PROGRAM_LINKS.map((link, index) => (
                <motion.li 
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 1 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {link.href.startsWith('/') ? (
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-yellow-400 transition-colors"
                    >
                      <motion.span whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
                        {link.text}
                      </motion.span>
                    </Link>
                  ) : (
                    <motion.a 
                      href={link.href} 
                      className="text-gray-300 hover:text-yellow-400 transition-colors"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.text}
                    </motion.a>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h3 
              className="text-white font-semibold text-lg mb-6"
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
              viewport={{ once: true }}
            >
              Support
            </motion.h3>
            <ul className="space-y-3">
              {SUPPORT_LINKS.map((link, index) => (
                <motion.li 
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {link.href.startsWith('/') ? (
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-yellow-400 transition-colors"
                    >
                      <motion.span whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
                        {link.text}
                      </motion.span>
                    </Link>
                  ) : (
                    <motion.a 
                      href={link.href} 
                      className="text-gray-300 hover:text-yellow-400 transition-colors"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.text}
                    </motion.a>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Signup */}
        {/* <div className="border-t border-white/10 pt-8 mb-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-white font-semibold text-lg mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6">
              Get the latest course updates, industry insights, and career tips delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
              />
              <Button className="bg-yellow-400 text-black hover:bg-yellow-500 rounded-full px-6 py-3 font-semibold">
                Subscribe
              </Button>
            </div>
          </div>
        </div> */}

        {/* Bottom Bar */}
        <motion.div 
          ref={bottomRef}
          className="border-t border-white/10 pt-8"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div 
              className="text-gray-400 text-sm mb-4 md:mb-0"
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
              viewport={{ once: true }}
            >
              © {new Date().getFullYear()} Lean Multiverse Consultancy Pvt Ltd. All Rights Reserved.
            </motion.div>
            <motion.div 
              className="flex space-x-6 text-sm"
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
              viewport={{ once: true }}
            >
              {["/privacy-policy", "/terms-of-service", "/cookie-policy"].map((href, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.9 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link 
                    href={href} 
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    <motion.span
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {href === "/privacy-policy" ? "Privacy Policy" : href === "/terms-of-service" ? "Terms of Service" : "Cookie Policy"}
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.footer>
  )
}
  