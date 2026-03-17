"use client"

import Link from "next/link"
import { Cpu, MessageSquare } from "lucide-react"
import { useState } from "react"


export default function CoursesClient() {
  const courses = [
    {
      id: 'ml-ai',
      icon: <Cpu size={38}/>,
      title: 'Machine Learning & AI',
      subtitle: '16-Week Deep Dive Program',
      price: '₹79,999',
      emiAvailable: true, // ✅ EMI only here
      duration: '16 Weeks',
      sessions: '32 Live Sessions',
      badge: 'Most Popular',
      badgeColor: 'badge-orange',
      features: [
        'Python, PyTorch, TensorFlow',
        'NLP, Computer Vision, MLOps',
        'AWS deployment & CI/CD',
        '4+ production projects',
        'Full placement support',
      ],
      href: '/ml-ai',
      applyHref: '/ml-ai/apply',
      for: 'Engineers, analysts & developers switching to AI/ML',
    },
    {
      id: 'prompt-engineering',
      icon: <MessageSquare size={28}/>,
      title: 'Prompt Engineering & LLMs',
      subtitle: '8-Week Intensive Program',
      price: '₹199',
      emiAvailable: false, // ❌ No EMI here
      duration: '8 Weeks',
      sessions: '16 Live Sessions',
      badge: 'No Coding Required',
      badgeColor: 'badge-blue',
      features: [
        'GPT-4, Claude, Gemini APIs',
        'RAG systems with LangChain',
        'LLM fine-tuning & deployment',
        'AI product development',
        'Full placement support',
      ],
      href: '/prompt-engineering',
      applyHref: '/prompt-engineering/apply',
      for: 'PMs, marketers, content professionals & developers',
    },
  ]

  const [selected, setSelected] = useState<string[]>([])

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const totalPrice = selected.reduce((sum, id) => {
    const course = courses.find((c) => c.id === id)
    if (!course) return sum
    const num = Number(course.price.replace(/[₹,]/g, ''))
    return sum + num
  }, 0)

  const addToWishlist = async () => {
    for (const id of selected) {
      await fetch('/api/user/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course_type: id }),
      })
    }
    alert('Added to wishlist')
  }

  return (
    <div className="pt-16">
      <section className="bg-white pt-20 pb-16">
        <div className="container-custom max-w-4xl text-center">
          <span className="badge-blue mb-4">Programs</span>
          <h1 className="section-heading mt-3 mb-5">
            Choose Your Path to an{' '}
            <span className="text-brand-600">AI Career</span>
          </h1>
          <p className="section-subheading mx-auto">
            Both programs offer 1:1 live mentorship with industry experts and
            full placement support. The difference is depth, duration, and
            target role.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-3xl border-2 border-gray-100 hover:border-brand-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-4 left-4">
                  <input
                    type="checkbox"
                    checked={selected.includes(course.id)}
                    onChange={() => toggleSelect(course.id)}
                    className="w-5 h-5 text-brand-600"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-brand-50 text-3xl flex items-center justify-center">
                      {course.icon}
                    </div>
                    <span className={course.badgeColor}>
                      {course.badge}
                    </span>
                  </div>

                  <h2 className="font-heading text-2xl font-bold text-neutral-950 mb-1">
                    {course.title}
                  </h2>

                  <p className="text-xs font-semibold text-brand-500 font-body mb-3 uppercase tracking-wide">
                    {course.subtitle}
                  </p>

                  <p className="text-xs text-gray-500 font-body italic mb-5">
                    Best for: {course.for}
                  </p>

                  <div className="flex gap-4 mb-5">
                    <div>
                      <p className="text-xs text-gray-400 font-body">
                        Duration
                      </p>
                      <p className="text-sm font-semibold text-gray-800 font-body">
                        {course.duration}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-body">
                        Live 1:1 Sessions
                      </p>
                      <p className="text-sm font-semibold text-gray-800 font-body">
                        {course.sessions}
                      </p>
                    </div>
                  </div>

                  <ul className="flex flex-col gap-2 mb-6">
                    {course.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-gray-700 font-body"
                      >
                        <svg
                          className="w-4 h-4 text-brand-500 flex-shrink-0"
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
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-end justify-between mb-5">
                    <div>
                      <p className="text-xs text-gray-400 font-body">
                        Investment
                      </p>
                      <p className="text-2xl font-heading font-bold text-neutral-950">
                        {course.price}
                      </p>
                    </div>

                    {/* ✅ EMI conditional */}
                    {course.emiAvailable && (
                      <span className="badge bg-green-50 text-green-700">
                        EMI Available
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Link
                      href={course.applyHref}
                      className="btn-primary flex-1 justify-center"
                    >
                      Apply Now
                    </Link>
                    <Link
                      href={course.href}
                      className="px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors font-body"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selected.length > 0 && (
            <div className="fixed bottom-4 left-0 right-0 bg-white shadow-lg py-4">
              <div className="container-custom flex items-center justify-between">
                <div className="text-sm">
                  {selected.length} course(s) selected – Total ₹{totalPrice.toLocaleString()}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={addToWishlist}
                    className="btn-secondary px-4 py-2"
                  >
                    Add to Wishlist
                  </button>
                  <Link
                    href="/dashboard"
                    className="btn-primary px-4 py-2"
                  >
                    Go to Cart
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className="mt-16 max-w-3xl mx-auto p-8 bg-gray-50 rounded-3xl text-center border border-gray-100">
            <p className="text-gray-600 font-body mb-4 text-sm">
              Not sure which program is right for you? Book a free 15-minute
              advisory call with our admissions team.
            </p>
            <Link href="/contact" className="btn-secondary">
              Talk to Admissions
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
