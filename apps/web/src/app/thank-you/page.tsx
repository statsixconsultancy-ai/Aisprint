import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Application Received — AIsprint',
  description: 'Thank you for applying to AIsprint. Our team will contact you within 24 hours.',
}

export default function ThankYouPage() {
  return (
    <div className="pt-16 min-h-screen bg-white flex items-center">
      <div className="container-custom py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success icon */}
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="section-heading text-4xl text-gray-600 mb-12">Application Received! 🎉</h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-8 font-body">
            Thank you for applying to AIsprint. Our admissions team will review your application and reach out within 24 hours to schedule your free 30-minute orientation call.
          </p>

          {/* What to expect */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-left mb-10">
            <h2 className="font-heading font-bold text-lg text-neutral-950 mb-5">What happens next</h2>
            <ol className="flex flex-col gap-5">
              {[
                {
                  step: '1',
                  title: 'Application Review (Within 24 hours)',
                  desc: 'Our admissions team reviews your application and experience level to match you with the right mentor.',
                },
                {
                  step: '2',
                  title: 'Orientation Call Invite',
                  desc: 'You\'ll receive a calendar link via email to book your free 30-minute orientation call at a time that suits you.',
                },
                {
                  step: '3',
                  title: 'Mentor Match & Curriculum',
                  desc: 'After the call, we match you with your dedicated mentor and build your personalised learning path.',
                },
                {
                  step: '4',
                  title: 'First Live Session',
                  desc: 'Your learning journey begins. Typically within 5–7 days of your application.',
                },
              ].map((item) => (
                <li key={item.step} className="flex items-start gap-4">
                  <span className="w-7 h-7 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 font-body mt-0.5">
                    {item.step}
                  </span>
                  <div>
                    <p className="font-heading font-semibold text-sm text-neutral-950 mb-0.5">{item.title}</p>
                    <p className="text-sm text-gray-600 font-body">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Check email notice */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 mb-10">
            <p className="text-sm text-amber-800 font-body">
              📧 <strong>Check your inbox</strong> — a confirmation email is on its way. If you don&apos;t see it within 10 minutes, check your spam folder.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="btn-secondary">
              Return to Homepage
            </Link>
            <Link href="/contact" className="btn-primary">
              Have Questions? Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
