import type { Metadata } from 'next'
import ApplicationForm from '@/components/forms/ApplicationForm'

export const metadata: Metadata = {
  title: 'Apply for ML & AI Program',
  description: 'Apply for AIsprint\'s Machine Learning & AI 1:1 live mentorship program. 16 weeks, 32 live sessions, guaranteed placement support.',
}

export default function MLAIApplyPage() {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Left panel — info */}
            <div className="lg:col-span-2 lg:sticky lg:top-24">
              <div className="mb-8">
                <span className="badge-orange mb-4 block">Application Form</span>
                <h1 className="font-heading text-3xl font-bold text-neutral-950 mb-4 leading-tight">
                  Apply for the ML & AI 1:1 Program
                </h1>
                <p className="text-gray-600 text-sm leading-relaxed font-body">
                  Fill in your details and our team will contact you within 24 hours to schedule your free orientation call.
                </p>
              </div>

              {/* What happens next */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6">
                <h3 className="font-heading font-bold text-sm text-neutral-950 mb-4">What happens next</h3>
                <ol className="flex flex-col gap-4">
                  {[
                    { step: '1', text: 'Our team reviews your application within 24 hours' },
                    { step: '2', text: 'You receive a calendar link for a free 30-min orientation call' },
                    { step: '3', text: 'We match you with the best-fit mentor from our network' },
                    { step: '4', text: 'You receive your personalized curriculum and begin sessions' },
                  ].map((item) => (
                    <li key={item.step} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 font-body">
                        {item.step}
                      </span>
                      <span className="text-sm text-gray-600 font-body">{item.text}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Course summary */}
              <div className="bg-brand-50 rounded-2xl p-5 border border-brand-100">
                <h3 className="font-heading font-bold text-sm text-brand-800 mb-3">ML & AI Program</h3>
                <div className="flex flex-col gap-2">
                  {[
                    '16 weeks · 32 live 1:1 sessions',
                    '4+ real deployment projects',
                    'PyTorch, HuggingFace, MLOps',
                    '6-month placement guarantee',
                    '₹79,000 · EMI available',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-brand-700 font-body">
                      <svg className="w-4 h-4 text-brand-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right panel — form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm">
                <ApplicationForm
                  courseType="ml-ai"
                  courseTitle="ML & AI Program"
                  coursePrice="₹79,000"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
