import { NextRequest, NextResponse } from 'next/server'

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: string
}

interface ChatRequest {
  message: string
  conversationHistory: Message[]
}

// System prompt for the AI assistant
const SYSTEM_PROMPT = `You are AIsprint's helpful AI Assistant. You represent AIsprint, an AI education and mentorship platform that offers:

1. **Courses**:
   - Machine Learning & AI course - Learn ML fundamentals, deep learning, NLP, and computer vision with 1:1 mentorship
   - Prompt Engineering course - Master prompt engineering, ChatGPT, and AI applications

2. **Key Features**:
   - Personalized 1:1 live mentorship from industry experts
   - Job placement support and career guidance
   - Startup India recognized program
   - Global placement opportunities
   - Hands-on projects and real-world applications

3. **Why Choose AiSprint**:
   - Expert mentors with industry experience
   - Personalized learning paths
   - Job placement assistance
   - Affordable pricing
   - Flexible learning schedules

Be helpful, friendly, and informative. Answer questions about our courses, programs, mentorship, placement support, and more. 
If a user wants to apply or get more information, guide them to the contact form or suggest they visit specific pages.
Always be professional and represent AiSprint positively.

When appropriate, suggest relevant courses, mentorship programs, or next steps.`

// Fallback knowledge base for course-related questions
const getKnowledgeBaseResponse = (
  userMessage: string
): string | null => {
  const message = userMessage.toLowerCase()

  // Course information
  if (
    message.includes('course') ||
    message.includes('ml') ||
    message.includes('ai') ||
    message.includes('prompt')
  ) {
    if (message.includes('prompt')) {
        return `### Prompt Engineering
      
Great question! Our **Prompt Engineering** course teaches you how to effectively work with AI models like ChatGPT, GPT-4, and other LLMs.
      
**What you'll learn**
      - Prompt design and optimization techniques
      - Advanced ChatGPT workflows
      - Integrating LLMs into applications
      - Real-world project use-cases
      
**Duration:** 8–12 weeks  
**Format:** 1:1 mentorship + group sessions        **Placement Support:** Yes  
**Price:** Competitive and affordable  
      
[Course details →](/prompt-engineering) • [Apply now →](/prompt-engineering/apply)`
      }
      
    if (message.includes('machine learning') || message.includes('ml')) {
      return `### Machine Learning & AI

Excellent! Our **Machine Learning & AI** program is comprehensive and industry-focused.

**What you'll master**
- ML fundamentals (supervised & unsupervised learning)
- Deep Learning with TensorFlow & PyTorch
- Natural Language Processing (NLP)
- Computer Vision
- Hands-on, project-based learning

**Duration:** 12–16 weeks  
**Format:** Personalized 1:1 mentorship  
**Mentors:** Industry experts  
**Placement Support:** Yes — global opportunities

[Course details →](/ml-ai) • [Apply now →](/ml-ai/apply)`
    }

    return `We offer two main courses:

  1. [**Machine Learning & AI**](/ml-ai) — Comprehensive ML & deep learning program
  2. [**Prompt Engineering**](/prompt-engineering) — Master LLMs and prompt design

  Both courses include personalized 1:1 mentorship and placement support. Which one interests you?`
  }

  // Mentorship questions
  if (message.includes('mentor') || message.includes('coaching')) {
    return `### 1:1 Mentorship

Our **1:1 Mentorship Program** is the heart of AiSprint.

Each student receives:
- A dedicated industry mentor
- A personalized learning path
- Weekly 1:1 sessions and project reviews
- Career guidance & interview prep
- Access to exclusive resources and community

Our mentors have experience at companies like Google, Microsoft, Amazon, and leading startups.

[See courses →](/courses) • [Contact us →](/contact)`
  }

  // Placement/jobs
  if (
    message.includes('placement') ||
    message.includes('job') ||
    message.includes('career') ||
    message.includes('employment')
  ) {
    return `### Placement & Career Support

We provide **comprehensive placement support** to help you land jobs:

- Resume & LinkedIn optimization  
- Interview preparation & mock interviews  
- Coding practice and DSA training  
- Job interview connections and referrals  
- Global placement opportunities  
- Startup incubation & interview pipelines

Our students are placed at top companies worldwide. Learn more on the [courses page →](/courses) or [contact our team →](/contact).`
  }

  // Pricing/pricing-related
  if (message.includes('price') || message.includes('cost') || message.includes('fee')) {
    return `### Pricing & Payment Options

Our pricing is competitive and we offer flexible payment plans.

For exact pricing and personalized quotes:

1. Email us at [support@aisprint.in](mailto:support@aisprint.in)  
2. Visit the course pages: [ML & AI →](/ml-ai) · [Prompt Engineering →](/prompt-engineering)  
3. Fill out the contact form for a tailored plan

We also provide EMI and financing options for eligible candidates.`
  }

  // Eligibility
  if (message.includes('eligibility') || message.includes('require') || message.includes('prerequisite')) {
    return `### Eligibility & Prerequisites

No strict prerequisites are required. Ideal candidates typically:

- Have basic Python familiarity (or willingness to learn)  
- Are curious about AI and ML  
- Are committed to project-based, mentor-led learning  
- Want real-world project experience

Whether you're a student, professional, or career-changer, we can craft a learning path that fits. [Contact us →](/contact)`
  }

  // Startup India / Recognition
  if (message.includes('startup india') || message.includes('recognition')) {
    return `### Recognition & Partnerships

Yes — AIsprint is recognized and partnered for quality education:

- **Startup India** recognized  
- Industry partnerships with leading tech companies

This ensures a credible, industry-aligned curriculum and stronger career opportunities.`
  }

  return null
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json()
    const { message, conversationHistory } = body

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Check for knowledge base match first
    const knowledgeResponse = getKnowledgeBaseResponse(message)

    // Try to use OpenAI API if available
    const openaiKey = process.env.OPENAI_API_KEY
    const anthropicKey = process.env.ANTHROPIC_API_KEY

    if (openaiKey) {
      try {
        return await handleOpenAI(message, conversationHistory, openaiKey)
      } catch (openaiError) {
        console.error('OpenAI error:', openaiError)
        // Fall through to knowledge base
      }
    }

    if (anthropicKey) {
      try {
        return await handleAnthropic(message, conversationHistory, anthropicKey)
      } catch (anthropicError) {
        console.error('Anthropic error:', anthropicError)
        // Fall through to knowledge base
      }
    }

    // Use knowledge base response
    if (knowledgeResponse) {
      return NextResponse.json({ reply: knowledgeResponse })
    }

    // Fallback generic response
    const fallbackResponse = `Thanks for your question about "${message}"! 
    
To get more detailed information, I recommend:
1. Visit our courses page at /courses
2. Check out the specific course pages [ML & AI Course](/ml-ai) • [Apply now](/ml-ai/apply) or [Prompt Engineering Course](/prompt-engineering) • [Apply now](/prompt-engineering/apply)
3. Contact our team at support@goaisprint.com or use the contact form at [Contact us](/contact)

Our team would be happy to answer any specific questions!`

    return NextResponse.json({ reply: fallbackResponse })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process message. Please try again.' },
      { status: 500 }
    )
  }
}

async function handleOpenAI(
  message: string,
  conversationHistory: Message[],
  apiKey: string
): Promise<NextResponse> {
  // Convert message history to OpenAI format
  const messages = [
    { role: 'system' as const, content: SYSTEM_PROMPT },
    ...conversationHistory.map((msg) => ({
      role: msg.sender === 'user' ? ('user' as const) : ('assistant' as const),
      content: msg.content,
    })),
    { role: 'user' as const, content: message },
  ]

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 500,
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`)
  }

  const data = await response.json()
  const reply = data.choices?.[0]?.message?.content || 'Unable to generate response'

  return NextResponse.json({ reply })
}

async function handleAnthropic(
  message: string,
  conversationHistory: Message[],
  apiKey: string
): Promise<NextResponse> {
  // Build conversation for Anthropic
  const conversationText = conversationHistory
    .map((msg) => `${msg.sender === 'user' ? 'Human' : 'Assistant'}: ${msg.content}`)
    .join('\n')

  const prompt = `${SYSTEM_PROMPT}\n\n${conversationText}\n\nHuman: ${message}\n\nAssistant:`

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-3-haiku-20240307',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  })

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.statusText}`)
  }

  const data = await response.json()
  const reply = data.content?.[0]?.text || 'Unable to generate response'

  return NextResponse.json({ reply })
}