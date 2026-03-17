'use client'
import Link from 'next/link'
import { Cpu, MessageSquare } from "lucide-react";

export default function CoursesOverviewSection() {
  const courses = [
    {
      id: 'ml-ai',
      badge: 'Most Popular',
      icon: <Cpu size={38} />,
      title: 'Machine Learning & AI',
      subtitle: 'Comprehensive 16-Week Program',
      description:
        'From Python fundamentals to deploying production ML models. Master supervised learning, deep learning, NLP, computer vision, and MLOps.',
      duration: '16 Weeks',
      sessions: '32 Live Sessions',
      level: 'Beginner → Advanced',
      outcomes: [
        'Build & deploy 4 production ML models',
        'Master PyTorch, TensorFlow & HuggingFace',
        'MLOps with Docker, AWS & CI/CD',
        'NLP pipelines & LLM fine-tuning',
      ],
      href: '/ml-ai',
      applyHref: '/ml-ai/apply',
      price: '₹79,000',
      emiAvailable: true,
    },
    {
      id: 'prompt-engineering',
      badge: 'Hot Right Now',
      icon: <MessageSquare size={28} />,
      title: 'Prompt Engineering & LLMs',
      subtitle: '8-Week Intensive Program',
      description:
        'The fastest path to working with AI professionally. Master prompt design, RAG systems, GPT-4, Claude, Gemini, and build AI-powered products that companies pay top dollar for.',
      duration: '8 Weeks',
      sessions: '16 Live Sessions',
      level: 'Beginner → Professional',
      outcomes: [
        'Advanced prompt patterns & chain-of-thought',
        'Build RAG systems with LangChain & LlamaIndex',
        'Fine-tune & deploy custom LLMs',
        'AI product development for SaaS companies',
      ],
      href: '/prompt-engineering',
      applyHref: '/prompt-engineering/apply',
      price: '₹499',
      emiAvailable: false,
    },
  ]

  return (
    <section className="py-20 md:py-24 lg:py-32 bg-neutral-50">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <span className="badge bg-neutral-100 text-neutral-700 px-6 py-3 mb-6 text-base">
            Our Programs
          </span>

          <h2 className="text-h2 font-heading font-semibold text-text-primary mb-6 leading-tight">
            Two Focused Paths to an AI Career
          </h2>

          <p className="text-subtext text-text-body leading-relaxed max-w-2xl mx-auto">
            Each program is built around your outcomes, not our content library. Choose based on where you want to go.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-neutral-200 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Card header */}
              <div className="p-10 pb-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center">
                    {course.icon}
                  </div>

                  <span className="badge bg-neutral-100 text-neutral-700 px-4 py-2 text-sm">
                    {course.badge}
                  </span>
                </div>

                <h3 className="text-h3 font-heading font-semibold text-text-primary mb-2 leading-tight">
                  {course.title}
                </h3>

                <p className="text-small font-medium text-neutral-500 uppercase tracking-wide mb-4">
                  {course.subtitle}
                </p>

                {/* SMALLER DESCRIPTION */}
                <p className="text-sm text-text-body leading-relaxed">
                  {course.description}
                </p>
              </div>

              {/* Stats row */}
              <div className="px-10 py-6 border-y border-neutral-100 grid grid-cols-3 gap-6">
                {[
                  { label: 'Duration', value: course.duration },
                  { label: 'Live 1:1', value: course.sessions },
                  { label: 'Level', value: course.level },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-small text-neutral-400 mb-1">
                      {stat.label}
                    </p>

                    <p className="text-base font-semibold text-text-primary">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Outcomes */}
              <div className="px-10 py-8">
                <p className="text-small font-semibold text-neutral-500 mb-4 uppercase tracking-wide">
                  What you'll achieve
                </p>

                <ul className="flex flex-col gap-2">
                  {course.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-3">
                      <span className="text-neutral-500 mt-1 flex-shrink-0">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>

                      {/* SMALLER OUTCOME TEXT */}
                      <span className="text-sm text-text-secondary">
                        {outcome}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Buttons */}
              <div className="px-10 pb-10 pt-4">
                <div className="flex gap-4">
                  <Link
                    href={course.applyHref}
                    className="btn-primary flex-1 justify-center text-sm px-4 py-2"
                  >
                    Apply Now
                  </Link>

                  <Link
                    href={course.href}
                    className="px-4 py-2 rounded-xl border border-neutral-200 text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}