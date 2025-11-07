'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { ChatbotService, getChatbotConfig, formatMessagesForAPI, type ChatMessage, type ChatResponse } from '@/lib/chatbot-integrations'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  type?: 'text' | 'quick_reply' | 'card' | 'form' | 'loading' | 'error'
  quickReplies?: string[]
  cardData?: {
    title: string
    description: string
    image?: string
    action?: string
    price?: string
    link?: string
  }
  formData?: {
    fields: Array<{
      name: string
      type: 'text' | 'email' | 'phone' | 'select' | 'textarea'
      placeholder: string
      required: boolean
      options?: string[]
    }>
    submitText: string
  }
  isTyping?: boolean
}


const quickReplies = [
  "View All Courses",
  "Get Pricing Info",
  "Book Consultation",
  "Contact Support",
  "View Case Studies",
  "Download Brochure"
]

export default function PerfectChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Welcome to Lean Multiverse! I'm your AI assistant, powered by advanced language models. I can help you with:\n\n• Course information and pricing\n• Consultation bookings\n• Success stories and case studies\n• Technical support\n• And much more!\n\nHow can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
      quickReplies: quickReplies
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [chatbotService, setChatbotService] = useState<ChatbotService | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Initialize chatbot service
  useEffect(() => {
    try {
      const config = getChatbotConfig()
      const service = new ChatbotService(config)
      setChatbotService(service)
      setIsConnected(true)
    } catch (err) {
      console.error('Failed to initialize chatbot service:', err)
      setError('Chatbot service unavailable')
    }
  }, [])

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
    if (!text.trim() || !chatbotService) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)
    setError(null)

    try {
      // Convert messages to API format
      const apiMessages: ChatMessage[] = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
        timestamp: msg.timestamp
      }))

      // Add current user message
      apiMessages.push({
        role: 'user',
        content: text.trim(),
        timestamp: new Date()
      })

      // Format messages with system prompt
      const formattedMessages = formatMessagesForAPI(apiMessages)

      // Send to AI service
      const response: ChatResponse = await chatbotService.sendMessage(formattedMessages)

      // Process response and add quick replies if needed
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.message,
        sender: 'bot',
        timestamp: new Date(),
        quickReplies: shouldAddQuickReplies(response.message) ? quickReplies : undefined
      }

      setMessages(prev => [...prev, botMessage])
    } catch (err) {
      console.error('Error sending message:', err)
      setError('Sorry, I encountered an error. Please try again.')
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I encountered an error processing your request. Please try again or contact our support team.",
        sender: 'bot',
        timestamp: new Date(),
        type: 'error',
        quickReplies: ["Try Again", "Contact Support", "View Courses"]
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const shouldAddQuickReplies = (message: string): boolean => {
    const lowerMessage = message.toLowerCase()
    return lowerMessage.includes('help') || 
           lowerMessage.includes('assist') || 
           lowerMessage.includes('course') ||
           lowerMessage.includes('pricing') ||
           lowerMessage.includes('consultation')
  }

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply)
  }

  const handleCardAction = (cardData: { link?: string }) => {
    if (cardData.link) {
      // Scroll to section or navigate
      const element = document.querySelector(cardData.link)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
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

  const getConnectionStatus = () => {
    if (error) return { text: 'Error', color: 'text-red-500' }
    if (isConnected) return { text: 'Connected', color: 'text-green-500' }
    return { text: 'Connecting...', color: 'text-yellow-500' }
  }

  const status = getConnectionStatus()

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
            className={`fixed bottom-28 right-6 z-40 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden backdrop-blur-sm ${
              isMinimized ? 'h-20' : 'h-[550px]'
            }`}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Enhanced Chat Header */}
            <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 px-6 py-5 flex items-center justify-between relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20"></div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
              
              <div className="flex items-center space-x-4 relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">Lean Multiverse AI</h3>
                  <p className={`text-yellow-100 text-sm flex items-center ${status.color}`}>
                    <span className={`w-2 h-2 rounded-full mr-2 animate-pulse ${
                      error ? 'bg-red-400' : isConnected ? 'bg-green-400' : 'bg-yellow-400'
                    }`}></span>
                    {status.text}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 relative z-10">
                <button
                  onClick={minimizeChat}
                  className="text-white/80 hover:text-white transition-colors p-3 rounded-full hover:bg-white/20"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <button
                  onClick={toggleChat}
                  className="text-white/80 hover:text-white transition-colors p-3 rounded-full hover:bg-white/20"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Enhanced Messages Container */}
                <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-gradient-to-b from-gray-50 via-white to-gray-50 h-[430px] relative">
                  {/* Subtle background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-24 h-24 bg-yellow-600 rounded-full blur-2xl"></div>
                  </div>
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
                          className={`px-6 py-5 rounded-2xl shadow-lg backdrop-blur-sm ${
                            message.sender === 'user'
                              ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border border-yellow-300'
                              : message.type === 'error'
                              ? 'bg-red-50 text-red-800 border border-red-200'
                              : 'bg-white/90 text-gray-800 border border-gray-200/50'
                          }`}
                        >
                          <p className="text-base leading-relaxed whitespace-pre-line mb-4">{message.text}</p>
                          <p className={`text-sm ${
                            message.sender === 'user' 
                              ? 'text-yellow-100' 
                              : message.type === 'error'
                              ? 'text-red-600'
                              : 'text-gray-500'
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                        
                        {/* Enhanced Quick Replies */}
                        {message.quickReplies && (
                          <div className="mt-5 flex flex-wrap gap-3 relative z-10">
                            {message.quickReplies.map((reply, index) => (
                              <motion.button
                                key={index}
                                onClick={() => handleQuickReply(reply)}
                                className="px-6 py-3 bg-white/90 border border-gray-300/50 rounded-full text-sm text-gray-700 hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-200 shadow-sm backdrop-blur-sm hover:shadow-md font-medium whitespace-nowrap"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {reply}
                              </motion.button>
                            ))}
                          </div>
                        )}
                        
                        {/* Course Cards */}
                        {message.cardData && (
                          <div className="mt-4 bg-white border border-gray-200 rounded-xl p-5 shadow-lg">
                            {message.cardData.image && (
                              <Image
                                src={message.cardData.image}
                                alt={message.cardData.title}
                                width={300}
                                height={200}
                                className="w-full h-28 object-cover rounded-lg mb-3"
                              />
                            )}
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-bold text-sm text-gray-800">{message.cardData.title}</h4>
                              <span className="text-sm font-bold text-yellow-600">{message.cardData.price}</span>
                            </div>
                            <p className="text-xs text-gray-600 mb-3">{message.cardData.description}</p>
                            <button 
                              onClick={() => message.cardData && handleCardAction(message.cardData)}
                              className="w-full text-xs text-yellow-600 hover:text-yellow-700 font-medium py-2 border border-yellow-300 rounded-lg hover:bg-yellow-50 transition-colors"
                            >
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
                <div className="p-5 bg-white/90 backdrop-blur-sm border-t border-gray-200/50 relative flex-shrink-0">
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-yellow-50/30 to-transparent"></div>
                  
                  <div className="flex items-center space-x-3 relative z-10">
                    <div className="flex-1 relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                        placeholder="Ask me anything about Lean Multiverse..."
                        className="w-full px-4 py-3 border border-gray-300/50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 bg-white/90 backdrop-blur-sm shadow-sm"
                        disabled={!isConnected || isTyping}
                      />
                      {/* Input focus indicator */}
                      <div className="absolute inset-0 rounded-full border-2 border-transparent focus-within:border-yellow-400 transition-colors pointer-events-none"></div>
                    </div>
                    <motion.button
                      onClick={() => handleSendMessage(inputValue)}
                      className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                      whileHover={{ scale: isConnected && !isTyping ? 1.1 : 1 }}
                      whileTap={{ scale: isConnected && !isTyping ? 0.9 : 1 }}
                      disabled={!isConnected || isTyping}
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </motion.button>
                  </div>
                  
                  {/* Quick action buttons */}
                  <div className="flex items-center justify-center space-x-3 mt-3 relative z-10">
                    <motion.button 
                      onClick={() => window.open('https://wa.me/918062177938', '_blank')}
                      className="text-xs text-gray-600 hover:text-green-600 transition-colors flex items-center space-x-1 px-3 py-1.5 rounded-full hover:bg-green-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-sm">💬</span>
                      <span className="font-medium">WhatsApp</span>
                    </motion.button>
                    <span className="text-gray-300">•</span>
                    <motion.button 
                      onClick={() => window.open('tel:+918062177938', '_blank')}
                      className="text-xs text-gray-600 hover:text-blue-600 transition-colors flex items-center space-x-1 px-3 py-1.5 rounded-full hover:bg-blue-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-sm">📞</span>
                      <span className="font-medium">Call Us</span>
                    </motion.button>
                    <span className="text-gray-300">•</span>
                    <motion.button 
                      onClick={() => window.open('mailto:support@leanmultiverse.com', '_blank')}
                      className="text-xs text-gray-600 hover:text-yellow-600 transition-colors flex items-center space-x-1 px-3 py-1.5 rounded-full hover:bg-yellow-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-sm">📧</span>
                      <span className="font-medium">Email</span>
                    </motion.button>
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
