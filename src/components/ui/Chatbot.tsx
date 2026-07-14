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
  type?: 'text' | 'quick_reply' | 'card'
  quickReplies?: string[]
  cardData?: {
    title: string
    description: string
    image?: string
    action?: string
  }
}

const quickReplies = [
  "Tell me about courses",
  "Pricing information",
  "Contact support",
  "Book a consultation",
  "View case studies"
]

const courseCards = [
  {
    title: "APM",
    description: "Agile Product Manager certification",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop",
    action: "Learn more about APM"
  },
  {
    title: "Agile Principles",
    description: "Agilist certification for executives",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
    action: "Learn more about Agile Principles"
  },
  {
    title: "POPM",
    description: "Product Owner/Product Manager certification",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=200&fit=crop",
    action: "Learn more about POPM"
  }
]

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your Lean Multiverse assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
      quickReplies: quickReplies
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

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(text)
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const generateBotResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase()
    
    if (input.includes('course') || input.includes('training')) {
      return {
        id: Date.now().toString(),
        text: "We offer comprehensive Agile certifications and enterprise agility training. Here are our top courses:",
        sender: 'bot',
        timestamp: new Date(),
        type: 'card',
        cardData: courseCards[Math.floor(Math.random() * courseCards.length)]
      }
    }
    
    if (input.includes('price') || input.includes('cost')) {
      return {
        id: Date.now().toString(),
        text: "Our courses range from ₹15,000 to ₹45,000. We also offer free courses and corporate packages. Would you like to know about specific pricing?",
        sender: 'bot',
        timestamp: new Date(),
        quickReplies: ["View pricing", "Free courses", "Corporate packages", "Schedule call"]
      }
    }
    
    if (input.includes('contact') || input.includes('support')) {
      return {
        id: Date.now().toString(),
        text: "I can help you get in touch with our team! You can reach us via WhatsApp, email, or schedule a call. What works best for you?",
        sender: 'bot',
        timestamp: new Date(),
        quickReplies: ["WhatsApp", "Email", "Schedule call", "Live chat"]
      }
    }
    
    if (input.includes('consultation') || input.includes('book')) {
      return {
        id: Date.now().toString(),
        text: "Great! I can help you book a consultation with our experts. Let me get some details from you.",
        sender: 'bot',
        timestamp: new Date(),
        quickReplies: ["Book now", "Available times", "What to expect", "Cancel"]
      }
    }
    
    return {
      id: Date.now().toString(),
      text: "I understand you're interested in learning more about Lean Multiverse. Let me help you find the right information!",
      sender: 'bot',
      timestamp: new Date(),
      quickReplies: quickReplies
    }
  }

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply)
  }

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
      {/* Chat Toggle Button */}
      <motion.button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5, ease: "backOut" }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              className="w-6 h-6 text-white"
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
            <motion.svg
              key="chat"
              className="w-6 h-6 text-white"
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
          )}
        </AnimatePresence>
        
        {/* Notification Badge */}
        {!isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 3, duration: 0.3 }}
          >
            <span className="text-xs text-white font-bold">1</span>
          </motion.div>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatContainerRef}
            className={`fixed bottom-24 right-6 z-40 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden ${
              isMinimized ? 'h-16' : 'h-[500px]'
            }`}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Lean Multiverse</h3>
                  <p className="text-yellow-100 text-xs">Online now</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={minimizeChat}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <button
                  onClick={toggleChat}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 h-[380px]">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                        <div
                          className={`px-4 py-2 rounded-2xl ${
                            message.sender === 'user'
                              ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white'
                              : 'bg-white text-gray-800 border border-gray-200'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'user' ? 'text-yellow-100' : 'text-gray-500'
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                        
                        {/* Quick Replies */}
                        {message.quickReplies && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {message.quickReplies.map((reply, index) => (
                              <button
                                key={index}
                                onClick={() => handleQuickReply(reply)}
                                className="px-3 py-1 bg-white border border-gray-300 rounded-full text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                {reply}
                              </button>
                            ))}
                          </div>
                        )}
                        
                        {/* Course Card */}
                        {message.cardData && message.cardData.image && (
                          <div className="mt-2 bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                            <Image
                              src={message.cardData.image}
                              alt={message.cardData.title}
                              width={300}
                              height={96}
                              className="w-full h-24 object-cover rounded-lg mb-2"
                            />
                            <h4 className="font-semibold text-sm text-gray-800">{message.cardData.title}</h4>
                            <p className="text-xs text-gray-600 mb-2">{message.cardData.description}</p>
                            <button className="text-xs text-yellow-600 hover:text-yellow-700 font-medium">
                              {message.cardData.action}
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      className="flex justify-start"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                      placeholder="Type your message..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => handleSendMessage(inputValue)}
                      className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-200"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
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
