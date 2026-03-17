'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const courseDetails: Record<string, { label: string }> = {
  'ml-ai': {
    label: 'Machine Learning & AI',
  },
  'prompt-engineering': {
    label: 'Prompt Engineering',
  },
}

export default function PaymentSuccessPage({
  params,
}: {
  params: { courseType: string }
}) {
  const router = useRouter()
  const details = courseDetails[params.courseType]

  useEffect(() => {
    // Redirect to dashboard after 5 seconds
    const timer = setTimeout(() => {
      router.push('/dashboard')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  if (!details) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="container-custom text-center py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Course Not Found
          </h1>
          <Link href="/dashboard" className="btn-primary px-6 py-3">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 pt-20 pb-12 flex items-center">
      <div className="container-custom max-w-2xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Success Icon */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-16 text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-16 h-16 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 text-center space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                🎉 Congratulations!
              </h1>
              <p className="text-xl text-gray-600 mb-2">
                You're now enrolled in
              </p>
              <p className="text-3xl font-bold text-brand-600">
                {details.label}
              </p>
            </div>

            {/* Details */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 space-y-3">
              <div className="flex items-center justify-center gap-3">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-green-900 font-medium">
                  Lifetime course access
                </span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-green-900 font-medium">
                  1-on-1 mentorship access
                </span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-green-900 font-medium">
                  Download course materials
                </span>
              </div>
            </div>

            {/* Next Steps */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What's next?
              </h3>
              <ul className="text-gray-700 space-y-2 text-left">
                <li className="flex items-start gap-3">
                  <span className="text-brand-600 font-bold">1.</span>
                  <span>
                    Check your email for course login credentials and welcome
                    guide
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-600 font-bold">2.</span>
                  <span>
                    Book your first 1-on-1 mentorship session from your
                    dashboard
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-600 font-bold">3.</span>
                  <span>
                    Start exploring course modules and complete projects
                  </span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="pt-6 space-y-3">
              <Link
                href="/dashboard"
                className="btn-primary w-full justify-center py-4 text-lg"
              >
                Go to Dashboard
              </Link>
              <p className="text-sm text-gray-500">
                Redirecting in 5 seconds...
              </p>
            </div>

            {/* Contact */}
            <div className="border-t border-gray-200 pt-6">
              <p className="text-gray-700 mb-2">
                Questions or need help getting started?
              </p>
              <div className="flex items-center justify-center gap-4 text-sm">
                <a
                  href="mailto:aisprintglobal@gmail.com"
                  className="text-brand-600 hover:text-brand-700 font-medium"
                >
                  Email Support
                </a>
                <span className="text-gray-400">•</span>
                <Link
                  href="/contact"
                  className="text-brand-600 hover:text-brand-700 font-medium"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
