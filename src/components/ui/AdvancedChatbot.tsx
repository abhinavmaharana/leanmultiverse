'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  type?: 'text' | 'quick_reply' | 'card' | 'form' | 'calendar' | 'file'
  quickReplies?: string[]
  cardData?: {
    title: string
    description: string
    image?: string
    action?: string
    price?: string
  }
  formData?: {
    fields: Array<{
      name: string
      type: 'text' | 'email' | 'phone' | 'select'
      placeholder: string
      required: boolean
      options?: string[]
    }>
    submitText: string
  }
}

// Integration options - removed unused constant

export default function AdvancedChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Welcome to Lean Multiverse! I'm your AI assistant. I can help you with courses, pricing, consultations, and more. What would you like to know?",
      sender: 'bot',
      timestamp: new Date(),
      quickReplies: [
        "View Courses",
        "Get Pricing",
        "Book Consultation", 
        "Contact Support",
        "View Case Studies"
      ]
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Enhanced bot response with AI-like intelligence
  const generateBotResponse = async (userInput: string): Promise<Message> => {
    const input = userInput.toLowerCase()
    
    // Course-related queries
    if (input.includes('course') || input.includes('training') || input.includes('certification')) {
      const courseCards = [
        {
          title: "Agile Product Manager (APM)",
          description: "Master product management in Agile environments",
          image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop",
          action: "Learn More",
          price: "₹25,000"
        },
        {
          title: "Agile Principles",
          description: "Executive certification for Agile leadership",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
          action: "Learn More", 
          price: "₹35,000"
        },
        {
          title: "PO/PM",
          description: "Product Owner and Product Manager certification",
          image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=200&fit=crop",
          action: "Learn More",
          price: "₹28,000"
        }
      ]
      
      return {
        id: Date.now().toString(),
        text: "Here are our top Agile certifications. Each course includes hands-on training, certification exam, and 1-year membership:",
        sender: 'bot',
        timestamp: new Date(),
        type: 'card',
        cardData: courseCards[Math.floor(Math.random() * courseCards.length)]
      }
    }
    
    // Pricing queries
    if (input.includes('price') || input.includes('cost') || input.includes('fee')) {
      return {
        id: Date.now().toString(),
        text: "💰 **Course Pricing Overview:**\n\n• Individual Courses: ₹15,000 - ₹45,000\n• Corporate Packages: Custom pricing\n• Free Courses: Available\n• Early Bird Discount: 20% off\n• Group Discounts: Up to 30% off\n\nWould you like detailed pricing for specific courses?",
        sender: 'bot',
        timestamp: new Date(),
        quickReplies: ["Detailed Pricing", "Corporate Packages", "Free Courses", "Discounts", "Schedule Call"]
      }
    }
    
    // Consultation booking
    if (input.includes('consultation') || input.includes('book') || input.includes('schedule')) {
      return {
        id: Date.now().toString(),
        text: "📅 I'd be happy to help you book a consultation! Let me get some details to find the best time for you.",
        sender: 'bot',
        timestamp: new Date(),
        type: 'form',
        formData: {
          fields: [
            { name: 'name', type: 'text', placeholder: 'Your Name', required: true },
            { name: 'email', type: 'email', placeholder: 'Email Address', required: true },
            { name: 'phone', type: 'phone', placeholder: 'Phone Number', required: false },
            { name: 'company', type: 'text', placeholder: 'Company (Optional)', required: false },
            { 
              name: 'preferred_time', 
              type: 'select', 
              placeholder: 'Preferred Time', 
              required: true,
              options: ['Morning (9-12 PM)', 'Afternoon (12-5 PM)', 'Evening (5-8 PM)', 'Weekend']
            }
          ],
          submitText: 'Schedule Consultation'
        }
      }
    }
    
    // Contact/Support
    if (input.includes('contact') || input.includes('support') || input.includes('help')) {
      return {
        id: Date.now().toString(),
        text: "🆘 **How can we help you?**\n\n• **WhatsApp**: +91-7696627657\n• **Email**: operations@leanmultiverse.com\n• **Phone**: +91-7696627657\n• **Live Chat**: Available 24/7\n• **Office Hours**: Mon-Fri 9AM-6PM IST\n\nWhat's your preferred way to connect?",
        sender: 'bot',
        timestamp: new Date(),
        quickReplies: ["WhatsApp", "Email", "Phone Call", "Live Chat", "Visit Office"]
      }
    }
    
    // Case studies
    if (input.includes('case study') || input.includes('success') || input.includes('client')) {
      return {
        id: Date.now().toString(),
        text: "📊 **Success Stories & Case Studies:**\n\nWe've helped 500+ organizations transform their operations:\n\n• **Netflix**: 40% faster feature delivery\n• **Porsche**: 50% reduction in time-to-market\n• **NASA**: Streamlined mission-critical processes\n• **Philips**: Enhanced healthcare innovation\n\nWould you like to see detailed case studies?",
        sender: 'bot',
        timestamp: new Date(),
        quickReplies: ["View Case Studies", "Download PDF", "Schedule Demo", "Talk to Expert"]
      }
    }
    
    // Default response with intelligent suggestions
    return {
      id: Date.now().toString(),
      text: "I understand you're interested in Lean Multiverse! Let me help you find the right information. Based on your query, here are some options:",
      sender: 'bot',
      timestamp: new Date(),
      quickReplies: [
        "Tell me about courses",
        "What are the prices?",
        "Book a consultation",
        "View success stories",
        "Contact support",
        "Download brochure"
      ]
    }
  }

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI processing time
    const processingTime = 800 + Math.random() * 1200
    setTimeout(async () => {
      const botResponse = await generateBotResponse(text)
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, processingTime)
  }

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply)
  }

  // Removed unused handleFormSubmit function

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const minimizeChat = () => {
    setIsMinimized(true)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      {/* Enhanced Chat Toggle Button */}
      <motion.button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5, ease: "backOut" }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.div key="chat" className="relative">
              <motion.svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </motion.svg>
              
              {/* Pulsing ring effect */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/30"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Enhanced notification badge */}
        {!isOpen && (
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 3, duration: 0.3 }}
          >
            <span className="text-xs text-white font-bold">1</span>
          </motion.div>
        )}
      </motion.button>

      {/* Enhanced Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatContainerRef}
            className={`fixed bottom-28 right-6 z-40 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden ${
              isMinimized ? 'h-20' : 'h-[600px]'
            }`}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Enhanced Chat Header */}
            <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 px-4 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Lean Multiverse AI</h3>
                  <p className="text-yellow-100 text-xs flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    Online • Ready to help
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={minimizeChat}
                  className="text-white/80 hover:text-white transition-colors p-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <button
                  onClick={toggleChat}
                  className="text-white/80 hover:text-white transition-colors p-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Enhanced Messages Container */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white h-[480px]">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`max-w-[85%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                        <div
                          className={`px-4 py-3 rounded-2xl shadow-sm ${
                            message.sender === 'user'
                              ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white'
                              : 'bg-white text-gray-800 border border-gray-200'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-line">{message.text}</p>
                          <p className={`text-xs mt-2 ${
                            message.sender === 'user' ? 'text-yellow-100' : 'text-gray-500'
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                        
                        {/* Enhanced Quick Replies */}
                        {message.quickReplies && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {message.quickReplies.map((reply, index) => (
                              <motion.button
                                key={index}
                                onClick={() => handleQuickReply(reply)}
                                className="px-3 py-2 bg-white border border-gray-300 rounded-full text-xs text-gray-700 hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-200 shadow-sm"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {reply}
                              </motion.button>
                            ))}
                          </div>
                        )}
                        
                        {/* Enhanced Course Card */}
                        {message.cardData && message.cardData.image && (
                          <div className="mt-3 bg-white border border-gray-200 rounded-xl p-4 shadow-lg">
                            <Image
                              src={message.cardData.image}
                              alt={message.cardData.title}
                              width={300}
                              height={112}
                              className="w-full h-28 object-cover rounded-lg mb-3"
                            />
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-bold text-sm text-gray-800">{message.cardData.title}</h4>
                              <span className="text-sm font-bold text-yellow-600">{message.cardData.price}</span>
                            </div>
                            <p className="text-xs text-gray-600 mb-3">{message.cardData.description}</p>
                            <button className="w-full text-xs text-yellow-600 hover:text-yellow-700 font-medium py-2 border border-yellow-300 rounded-lg hover:bg-yellow-50 transition-colors">
                              {message.cardData.action}
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Enhanced Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      className="flex justify-start"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-xs text-gray-500">AI is thinking...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Enhanced Input Area */}
                <div className="p-4 bg-white border-t border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                        placeholder="Ask me anything about Lean Multiverse..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <motion.button
                      onClick={() => handleSendMessage(inputValue)}
                      className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </motion.button>
                  </div>
                  
                  {/* Quick action buttons */}
                  <div className="flex items-center justify-center space-x-2 mt-2">
                    <button className="text-xs text-gray-500 hover:text-yellow-600 transition-colors">
                      💬 Live Chat
                    </button>
                    <span className="text-gray-300">•</span>
                    <button className="text-xs text-gray-500 hover:text-yellow-600 transition-colors">
                      📞 Call Us
                    </button>
                    <span className="text-gray-300">•</span>
                    <button className="text-xs text-gray-500 hover:text-yellow-600 transition-colors">
                      📧 Email
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
