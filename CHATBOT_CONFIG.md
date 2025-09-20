# Chatbot Configuration Guide

## Overview
The Lean Multiverse chatbot supports multiple AI providers and can be easily configured for different environments.

## Supported Providers

### 1. OpenAI (Recommended for Production)
- **Provider**: `openai`
- **Models**: GPT-3.5-turbo, GPT-4, GPT-4-turbo
- **Setup**: Get API key from OpenAI platform
- **Cost**: Pay-per-use, very affordable

### 2. Anthropic Claude (High Quality)
- **Provider**: `anthropic`
- **Models**: Claude-3-sonnet, Claude-3-opus, Claude-3-haiku
- **Setup**: Get API key from Anthropic console
- **Cost**: Pay-per-use, competitive pricing

### 3. Custom API (Your Own Backend)
- **Provider**: `custom`
- **Setup**: Deploy your own AI service
- **Cost**: Depends on your infrastructure

### 4. Mock Service (Development)
- **Provider**: `mock`
- **Setup**: No configuration needed
- **Cost**: Free for development

## Environment Variables

Create a `.env.local` file in your project root:

```bash
# Choose your AI provider
NEXT_PUBLIC_CHATBOT_PROVIDER=mock

# API Keys (only required for OpenAI and Anthropic)
NEXT_PUBLIC_CHATBOT_API_KEY=your_api_key_here

# Model Configuration
NEXT_PUBLIC_CHATBOT_MODEL=gpt-3.5-turbo

# Custom API Configuration (only required for custom provider)
NEXT_PUBLIC_CHATBOT_BASE_URL=https://your-api.com
```

## Configuration Examples

### OpenAI Configuration
```bash
NEXT_PUBLIC_CHATBOT_PROVIDER=openai
NEXT_PUBLIC_CHATBOT_API_KEY=sk-your-openai-key-here
NEXT_PUBLIC_CHATBOT_MODEL=gpt-3.5-turbo
```

### Anthropic Configuration
```bash
NEXT_PUBLIC_CHATBOT_PROVIDER=anthropic
NEXT_PUBLIC_CHATBOT_API_KEY=sk-ant-your-anthropic-key-here
NEXT_PUBLIC_CHATBOT_MODEL=claude-3-sonnet-20240229
```

### Custom API Configuration
```bash
NEXT_PUBLIC_CHATBOT_PROVIDER=custom
NEXT_PUBLIC_CHATBOT_BASE_URL=https://your-api.com
NEXT_PUBLIC_CHATBOT_API_KEY=your-custom-api-key
```

### Development Configuration
```bash
NEXT_PUBLIC_CHATBOT_PROVIDER=mock
```

## Features

### Core Features
- ✅ Real-time AI conversations
- ✅ Multiple AI provider support
- ✅ Beautiful, responsive UI
- ✅ Quick reply buttons
- ✅ Course cards with pricing
- ✅ Form handling for consultations
- ✅ Error handling and fallbacks
- ✅ Typing indicators
- ✅ Message history
- ✅ Mobile responsive

### Advanced Features
- ✅ System prompts for context
- ✅ Message formatting
- ✅ Usage tracking
- ✅ Connection status
- ✅ Smooth animations
- ✅ Accessibility support

## Customization

### Styling
The chatbot uses Tailwind CSS and can be customized by modifying the component classes in `PerfectChatbot.tsx`.

### Responses
Modify the system prompt in `chatbot-integrations.ts` to change how the AI responds.

### Quick Replies
Update the `quickReplies` array in `PerfectChatbot.tsx` to customize suggested responses.

### Course Cards
Modify the `courseCards` array to show different courses and pricing.

## Deployment

### Vercel (Recommended)
1. Set environment variables in Vercel dashboard
2. Deploy normally
3. Chatbot will work automatically

### Other Platforms
1. Set environment variables in your platform
2. Ensure all environment variables are prefixed with `NEXT_PUBLIC_`
3. Deploy and test

## Troubleshooting

### Common Issues

1. **Chatbot not responding**
   - Check if API key is set correctly
   - Verify provider configuration
   - Check browser console for errors

2. **API errors**
   - Verify API key is valid
   - Check API quota/limits
   - Ensure correct model name

3. **Styling issues**
   - Check if Tailwind CSS is loaded
   - Verify component imports

### Debug Mode
Set `NEXT_PUBLIC_CHATBOT_PROVIDER=mock` to use the mock service for debugging.

## Support

For technical support or customization requests, contact the development team.
