import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Prompt Engineering & LLM Course — 1:1 Live Mentorship',
  description:
    'Master Prompt Engineering and LLM systems with personalized 1:1 live sessions. 8-week intensive program covering GPT-4, Claude, RAG, LangChain, and AI product development.',
}

const modules = [
  {
    number: '01',
    title: 'Foundations of LLMs & Prompt Science',
    weeks: 'Week 1',
    topics: ['How LLMs actually work (transformers demystified)', 'Tokens, context windows & temperature', 'GPT-4, Claude, Gemini API setup', 'Baseline vs. advanced prompting'],
  },
  {
    number: '02',
    title: 'Advanced Prompting Patterns',
    weeks: 'Week 2',
    topics: ['Chain-of-thought & self-consistency', 'Few-shot vs zero-shot strategies', 'Prompt chaining & decomposition', 'Role prompting & meta-prompting'],
  },
  {
    number: '03',
    title: 'RAG & Knowledge Systems',
    weeks: 'Week 3–4',
    topics: ['Vector databases (Pinecone, Chroma, Weaviate)', 'Embedding models & semantic search', 'LangChain & LlamaIndex in production', 'Building document Q&A systems'],
  },
  {
    number: '04',
    title: 'LLM Fine-Tuning & Customization',
    weeks: 'Week 5',
    topics: ['When to fine-tune vs. prompt', 'LoRA & QLoRA techniques', 'Dataset preparation & annotation', 'Open-source models (Mistral, Llama 3)'],
  },
  {
    number: '05',
    title: 'AI Product Development',
    weeks: 'Week 6–7',
    topics: ['Building LLM-powered SaaS products', 'Guardrails, safety & hallucination mitigation', 'Cost optimization strategies', 'Streaming responses & UX patterns'],
  },
  {
    number: '06',
    title: 'Deployment, Evaluation & Career Sprint',
    weeks: 'Week 8',
    topics: ['LLM evaluation frameworks (RAGAS, TruLens)', 'Deploying with FastAPI & Vercel', 'Portfolio project completion', 'Interview prep & demo day'],
  },
]

const mentors = [
  {
    initials: 'RS',
    color: 'from-indigo-500 to-indigo-700',
    name: 'Rohan Seth',
    title: 'Former NLP Lead, HuggingFace',
    experience: '8 Years',
    expertise: ['LLMs', 'RAG Systems', 'Fine-Tuning', 'Prompt Design'],
    bio: 'Built and shipped 20+ LLM products. Was part of the HuggingFace open-source team. Consults for AI startups in the EU and US.',
  },
  {
    initials: 'MA',
    color: 'from-pink-500 to-pink-700',
    name: 'Meera Agarwal',
    title: 'AI Product Lead, Freshworks',
    experience: '6 Years',
    expertise: ['AI Products', 'Prompt Systems', 'LangChain', 'Evaluation'],
    bio: 'Led AI feature development for 50K+ enterprise customers at Freshworks. Expert in building reliable, production-safe LLM systems.',
  },
]

const faqs = [
  {
    q: 'Do I need a technical background?',
    a: 'No. This course is designed for professionals from all backgrounds. You\'ll learn everything you need — Python basics, API usage, and product thinking — through personalized 1:1 sessions.',
  },
  {
    q: 'How is this different from ChatGPT courses on YouTube?',
    a: 'YouTube courses give you surface-level prompting tips. This program takes you to the engineering level — building RAG systems, fine-tuning models, and deploying AI products that companies actually pay for.',
  },
  {
    q: 'What job titles does this prepare me for?',
    a: 'Prompt Engineer, AI Product Manager, LLM Engineer, AI Consultant, Conversational AI Developer, and AI Solutions Architect are the most common titles our graduates pursue.',
  },
  {
    q: 'How quickly can I land a job after this course?',
    a: '71% of our Prompt Engineering graduates land a relevant role within 4 months of completion. The fastest placement we have had was 3 weeks.',
  },
]

export default function PromptEngineeringPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-20 pb-16">
        <div className="absolute top-20 right-[5%] w-80 h-80 rounded-full bg-brand-200/20 blur-3xl animate-float" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="badge bg-gray-100 text-gray-900">Hot Right Now</span>
              <span className="badge bg-gray-100 text-gray-900">
                <span className="flex items-center gap-2">
                  <span className="text-brand-600">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 16.5L10.5 11L14.5 15L19 10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19 7V10H16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>Startup India Partner</span>
                </span>
              </span>
            </div>
            <h1 className="section-heading text-4xl md:text-5xl mb-5">
              Prompt Engineering
              <span className="block text-gray-900 mt-1">& LLM Systems Program</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 font-body max-w-2xl">
              The fastest path to becoming an AI professional. Master prompt design, RAG systems, and LLM product development in 8 focused weeks — with a dedicated 1:1 mentor.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              {[
                { icon: '📅', label: '8 Weeks' },
                { icon: '🖥️', label: '16 Live Sessions' },
                { icon: '🤖', label: 'GPT-4 + Claude + Gemini' },
                { icon: '💼', label: '71% Place in 4 Months' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-body">
                  <span>{item.icon}</span>
                  <span className="font-medium text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/prompt-engineering/apply" className="btn-primary px-8 py-4 text-base">
                Apply Now — ₹199
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <div className="flex items-center gap-2 text-sm text-gray-500 font-body">
                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                No coding required
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="badge-blue mb-3">Who Is This For?</span>
            <h2 className="section-heading mt-3 mb-4">From Any Background to AI Professional</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { icon: '📣', title: 'Marketing Professionals', desc: 'Learn to build AI-powered content systems and campaign automation that deliver 10× output.' },
              { icon: '👨‍💼', title: 'Product Managers', desc: 'Understand what\'s possible with LLMs so you can make better product decisions and own AI features.' },
              { icon: '✍️', title: 'Content Creators', desc: 'Build prompt systems that supercharge your creative workflow without losing your voice.' },
              { icon: '🧑‍💻', title: 'Developers', desc: 'Add LLM capabilities to your applications and go beyond copy-pasting ChatGPT prompts.' },
              { icon: '🎓', title: 'Fresh Graduates', desc: 'The fastest way to build a differentiated AI skill set before entering a competitive job market.' },
              { icon: '🌟', title: 'Freelancers', desc: 'Package AI consulting services that clients will pay premium rates for, anywhere in the world.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-5 rounded-2xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all">
                <div className="text-3xl mt-0.5">{item.icon}</div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-neutral-950 mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-body">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="badge-blue mb-3">Curriculum</span>
            <h2 className="section-heading mt-3 mb-4">8 Weeks. 6 Modules. Real Deployments.</h2>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-5">
            {modules.map((mod) => (
              <div key={mod.number} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-brand-400 font-body">MODULE {mod.number}</span>
                  <span className="badge bg-gray-100 text-gray-500">{mod.weeks}</span>
                </div>
                <h3 className="font-heading font-bold text-base text-neutral-950 mb-3">{mod.title}</h3>
                <ul className="flex flex-col gap-1.5">
                  {mod.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-2 text-sm text-gray-600 font-body">
                      <span className="text-brand-500 mt-0.5 flex-shrink-0">→</span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="badge-blue mb-3">Your Mentors</span>
            <h2 className="section-heading mt-3 mb-4">LLM Experts Who Ship Real Products</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {mentors.map((mentor) => (
              <div key={mentor.name} className="card hover:shadow-lg transition-shadow">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${mentor.color} flex items-center justify-center text-white font-bold text-xl mb-4`}>
                  {mentor.initials}
                </div>
                <h3 className="font-heading font-bold text-base text-neutral-950 mb-0.5">{mentor.name}</h3>
                <p className="text-xs text-brand-600 font-semibold font-body mb-1">{mentor.title}</p>
                <p className="text-xs text-gray-500 font-body mb-3">{mentor.experience} Experience</p>
                <p className="text-sm text-gray-600 leading-relaxed font-body mb-4">{mentor.bio}</p>
                <div className="flex flex-wrap gap-1.5">
                  {mentor.expertise.map((tag) => (
                    <span key={tag} className="badge-blue text-xs">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentorship process */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-4">The 1:1 Mentorship Process</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Weekly 1:1 Video Sessions', desc: '2 sessions per week with your dedicated mentor. Real-time code review, concept clarification, and project guidance.' },
              { title: 'Async Feedback Loop', desc: 'Submit assignments and get written feedback within 24 hours. Your mentor\'s annotations are stored in your learning journal.' },
              { title: 'Personalised Curriculum', desc: 'After your orientation call, your mentor creates a learning path specific to your background, goals, and time availability.' },
              { title: 'WhatsApp Support (Business Hours)', desc: 'Text your mentor during business hours for quick questions. Most responses come within 2 hours.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-6 bg-white rounded-2xl border border-gray-100">
                <div className="w-2 h-2 rounded-full bg-brand-600 mt-2.5 flex-shrink-0"></div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-neutral-950 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-body">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <h2 className="section-heading text-center mb-10">Common Questions</h2>
          <div className="bg-gray-50 rounded-3xl p-8 divide-y divide-gray-100">
            {faqs.map((faq) => (
              <div key={faq.q} className="py-5">
                <p className="font-heading font-semibold text-base text-neutral-950 mb-2">{faq.q}</p>
                <p className="text-sm text-gray-600 leading-relaxed font-body">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-2xl text-center">
          <h2 className="section-heading mb-4">The AI Wave Won&apos;t Wait</h2>
          <p className="section-subheading mx-auto mb-8">
            Prompt Engineering roles are growing 300% YoY. Apply today to secure your spot.
          </p>
          <Link href="/prompt-engineering/apply" className="btn-primary px-10 py-4 text-base">
            Apply for Prompt Engineering Program
          </Link>
          <p className="mt-4 text-sm text-gray-400 font-body">Only 8 seats per mentor per month.</p>
        </div>
      </section>
    </div>
  )
}
