// Third-party chatbot integrations
export interface ChatbotConfig {
  provider: 'openai' | 'anthropic' | 'custom' | 'mock'
  apiKey?: string
  model?: string
  baseUrl?: string
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp?: Date
}

export interface ChatResponse {
  message: string
  usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
  model?: string
}

// OpenAI Integration
export class OpenAIService {
  private apiKey: string
  private model: string

  constructor(apiKey: string, model: string = 'gpt-3.5-turbo') {
    this.apiKey = apiKey
    this.model = model
  }

  async sendMessage(messages: ChatMessage[]): Promise<ChatResponse> {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          messages: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          max_tokens: 500,
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`)
      }

      const data = await response.json()
      
      return {
        message: data.choices[0].message.content,
        usage: data.usage,
        model: data.model
      }
    } catch (error) {
      console.error('OpenAI API error:', error)
      throw error
    }
  }
}

// Anthropic Claude Integration
export class AnthropicService {
  private apiKey: string
  private model: string

  constructor(apiKey: string, model: string = 'claude-3-sonnet-20240229') {
    this.apiKey = apiKey
    this.model = model
  }

  async sendMessage(messages: ChatMessage[]): Promise<ChatResponse> {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': this.apiKey,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: this.model,
          max_tokens: 500,
          messages: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
        }),
      })

      if (!response.ok) {
        throw new Error(`Anthropic API error: ${response.statusText}`)
      }

      const data = await response.json()
      
      return {
        message: data.content[0].text,
        usage: data.usage,
        model: data.model
      }
    } catch (error) {
      console.error('Anthropic API error:', error)
      throw error
    }
  }
}

// Custom API Integration
export class CustomAPIService {
  private baseUrl: string
  private apiKey?: string

  constructor(baseUrl: string, apiKey?: string) {
    this.baseUrl = baseUrl
    this.apiKey = apiKey
  }

  async sendMessage(messages: ChatMessage[]): Promise<ChatResponse> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }

      if (this.apiKey) {
        headers['Authorization'] = `Bearer ${this.apiKey}`
      }

      const response = await fetch(`${this.baseUrl}/chat`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          messages: messages.map(msg => ({
            role: msg.role,
            content: msg.content,
            timestamp: msg.timestamp
          })),
        }),
      })

      if (!response.ok) {
        throw new Error(`Custom API error: ${response.statusText}`)
      }

      const data = await response.json()
      
      return {
        message: data.message || data.response,
        usage: data.usage,
        model: data.model
      }
    } catch (error) {
      console.error('Custom API error:', error)
      throw error
    }
  }
}

// Mock Service for development/testing
export class MockService {
  async sendMessage(messages: ChatMessage[]): Promise<ChatResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

    const lastMessage = messages[messages.length - 1]
    const userInput = lastMessage.content.toLowerCase()

    // Generate contextual responses
    let response = "I understand you're interested in Lean Multiverse. How can I help you today?"

    if (userInput.includes('course') || userInput.includes('training')) {
      response = "We offer comprehensive SAFe certifications including SAFe APM, Leading SAFe, SAFe POPM, and more. Each course includes hands-on training and certification. Would you like to know about specific courses?"
    } else if (userInput.includes('price') || userInput.includes('cost')) {
      response = "Our courses range from ₹15,000 to ₹45,000. We also offer corporate packages and early bird discounts. Would you like detailed pricing information?"
    } else if (userInput.includes('consultation') || userInput.includes('book')) {
      response = "I'd be happy to help you book a consultation with our experts. Let me get some details from you to schedule the best time."
    } else if (userInput.includes('contact') || userInput.includes('support')) {
      response = "You can reach us via WhatsApp (+91 8062177938), email (support@leanmultiverse.com), or phone (08062177938). We're available 24/7 for support."
    } else if (userInput.includes('case study') || userInput.includes('success')) {
      response = "We've helped 500+ organizations including Netflix, Porsche, NASA, and Philips transform their operations. Would you like to see detailed case studies?"
    }

    return {
      message: response,
      usage: {
        prompt_tokens: 50,
        completion_tokens: 30,
        total_tokens: 80
      },
      model: 'mock-model'
    }
  }
}

// Chatbot Service Factory
export class ChatbotService {
  private service: OpenAIService | AnthropicService | CustomAPIService | MockService

  constructor(config: ChatbotConfig) {
    switch (config.provider) {
      case 'openai':
        if (!config.apiKey) throw new Error('OpenAI API key is required')
        this.service = new OpenAIService(config.apiKey, config.model)
        break
      case 'anthropic':
        if (!config.apiKey) throw new Error('Anthropic API key is required')
        this.service = new AnthropicService(config.apiKey, config.model)
        break
      case 'custom':
        if (!config.baseUrl) throw new Error('Custom API base URL is required')
        this.service = new CustomAPIService(config.baseUrl, config.apiKey)
        break
      case 'mock':
      default:
        this.service = new MockService()
        break
    }
  }

  async sendMessage(messages: ChatMessage[]): Promise<ChatResponse> {
    return this.service.sendMessage(messages)
  }
}

// Utility functions
export const createSystemPrompt = (): string => {
  return `You are a helpful AI assistant for Lean Multiverse, a company specializing in enterprise agility training and SAFe certifications. 

Your role:
- Help users learn about our courses (SAFe APM, Leading SAFe, SAFe POPM, SAFe Scrum Master, SAFe LPM, SAFe RTE)
- Provide pricing information (₹15,000 - ₹45,000 range)
- Help with consultation bookings
- Share success stories (Netflix, Porsche, NASA, Philips)
- Connect users with support (WhatsApp, email, phone)

Guidelines:
- Be professional, friendly, and helpful
- Provide accurate information about our services
- Ask clarifying questions when needed
- Offer to connect users with human support when appropriate
- Keep responses concise but informative
- Use emojis sparingly but effectively

Company info:
- Website: leanmultiverse.com
- Email: support@leanmultiverse.com
- Phone: 08062177938
- WhatsApp: +91 8062177938
- Location: India (IST timezone)`
}

export const formatMessagesForAPI = (messages: ChatMessage[]): ChatMessage[] => {
  const systemPrompt = createSystemPrompt()
  
  return [
    { role: 'system', content: systemPrompt },
    ...messages
  ]
}

// Environment configuration
export const getChatbotConfig = (): ChatbotConfig => {
  const provider = (process.env.NEXT_PUBLIC_CHATBOT_PROVIDER as ChatbotConfig['provider']) || 'mock'
  
  return {
    provider,
    apiKey: process.env.NEXT_PUBLIC_CHATBOT_API_KEY,
    model: process.env.NEXT_PUBLIC_CHATBOT_MODEL,
    baseUrl: process.env.NEXT_PUBLIC_CHATBOT_BASE_URL,
  }
}
