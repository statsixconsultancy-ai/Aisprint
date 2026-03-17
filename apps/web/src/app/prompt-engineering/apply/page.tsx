import type { Metadata } from 'next'
import ApplicationForm from '@/components/forms/ApplicationForm'

export const metadata: Metadata = {
  title: 'Apply for Prompt Engineering Program',
  description: 'Apply for AIsprint\'s Prompt Engineering & LLMs 1:1 live mentorship program. 8 weeks, 16 live sessions, no coding required.',
}

export default function PromptEngineeringApplyPage() {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Left panel */}
            <div className="lg:col-span-2 lg:sticky lg:top-24">
              <div className="mb-8">
                <span className="badge-blue mb-4 block">Application Form</span>
                <h1 className="font-heading text-3xl font-bold text-neutral-950 mb-4 leading-tight">
                  Apply for the Prompt Engineering Program
                </h1>
                <p className="text-gray-600 text-sm leading-relaxed font-body">
                  No technical background required. Our team will contact you within 24 hours to schedule your free orientation call.
                </p>
              </div>

              {/* What happens next */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6">
                <h3 className="font-heading font-bold text-sm text-neutral-950 mb-4">What happens next</h3>
                <ol className="flex flex-col gap-4">
                  {[
                    { step: '1', text: 'Our team reviews your application within 24 hours' },
                    { step: '2', text: 'You receive a calendar link for a free 30-min orientation call' },
                    { step: '3', text: 'Your mentor builds a personalized 8-week curriculum for you' },
                    { step: '4', text: 'Sessions begin on your schedule — weekday or weekend' },
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
                <h3 className="font-heading font-bold text-sm text-brand-800 mb-3">Prompt Engineering Program</h3>
                <div className="flex flex-col gap-2">
                  {[
                    '8 weeks · 16 live 1:1 sessions',
                    'GPT-4, Claude, Gemini hands-on',
                    'RAG systems with LangChain',
                    'No coding background required',
                    '₹499 ',
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
                  courseType="prompt-engineering"
                  courseTitle="Prompt Engineering Program"
                  coursePrice="₹499"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
