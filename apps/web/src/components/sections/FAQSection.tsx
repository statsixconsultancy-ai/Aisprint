'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'Do I need a programming background to join?',
    a: 'Not for the Prompt Engineering course — it is designed for professionals from any background. For the ML & AI program, basic Python familiarity is helpful but not required. We assess your starting point in the orientation call and customise your learning path accordingly.',
  },
  {
    q: 'How does 1:1 scheduling work?',
    a: 'After enrollment, you pick session slots from your mentor\'s calendar that fit your schedule. Sessions are typically 60–90 minutes, held via Google Meet with recording. You can reschedule with 24-hour notice.',
  },
  {
    q: 'What happens if I am not satisfied?',
    a: 'We offer a 7-day full refund policy after your first session. If the mentor isn\'t the right fit, we reassign at no cost. We would rather lose a payment than keep a student who isn\'t progressing.',
  },
  {
    q: 'Is the Startup India recognition real?',
    a: 'Yes. We are DPIIT-recognized under Startup India with registration number DIPP103457. This recognition is verifiable on the official Startup India portal.',
  },
  {
    q: 'What is the placement guarantee?',
    a: 'We guarantee placement support for 6 months post-completion. If you do not receive a suitable offer within 6 months of completing all program requirements and engaging with our placement process, we extend your support at no additional cost.',
  },
  {
    q: 'Can I pay in installments (EMI)?',
    a: 'Yes. We offer 3, 6, and 12-month no-cost EMI options through leading Indian banks and fintech partners. International students can pay via Stripe in USD, EUR, or GBP.',
  },
  {
    q: 'Will the curriculum keep up with AI advancements?',
    a: 'AI evolves fast and we update curriculum quarterly. As a student, you get lifetime access to all updates including new modules added after your enrollment — at zero extra cost.',
  },
  {
    q: 'Is there group interaction or is it fully 1:1?',
    a: 'Your learning is 1:1 with your dedicated mentor. However, you also get access to our private alumni Discord with 2,400+ professionals, monthly group Q&A calls with senior mentors, and peer study groups.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="font-heading font-semibold text-base text-neutral-950 group-hover:text-gray-900 transition-colors">
          {q}
        </span>
        <span className={`flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center transition-all ${open ? 'bg-gray-900 border-gray-900 rotate-45' : 'group-hover:border-gray-300'}`}>
          <svg className={`w-3 h-3 ${open ? 'text-white' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12M6 12h12" />
          </svg>
        </span>
      </button>
      {open && (
        <p className="pb-5 text-gray-600 text-sm leading-relaxed font-body pr-8">
          {a}
        </p>
      )}
    </div>
  )
}

export default function FAQSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="badge bg-gray-100 text-gray-900 mb-4">FAQs</span>
          <h2 className="section-heading mt-3 mb-5">
            Questions We Get All the Time
          </h2>
        </div>

        <div className="max-w-3xl mx-auto bg-gray-50/80 rounded-3xl p-6 md:p-10 border border-gray-100">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  )
}
