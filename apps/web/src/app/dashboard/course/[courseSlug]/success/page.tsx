'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const courseDetails: Record<string, { label: string }> = {
  "ml-ai": {
    label: "Machine Learning & AI",
  },
  "prompt-engineering": {
    label: "Prompt Engineering",
  },
}

export default function PaymentSuccessPage({ params }: { params: { courseSlug: string } }) {
  const router = useRouter()
  const details = courseDetails[params.courseSlug]

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard")
    }, 5000)
    return () => clearTimeout(timer)
  }, [router])

  if (!details) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-md mx-auto text-center py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <Link href="/dashboard" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pt-20 pb-12 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border overflow-hidden max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-16 text-center text-white">
            <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl">
                <svg className="w-14 h-14 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">🎉 Congratulations!</h1>
            <p className="text-xl text-white/90">You&apos;re now enrolled in</p>
            <p className="text-3xl md:text-4xl font-bold bg-white/20 rounded-2xl px-6 py-3 inline-block mt-2 backdrop-blur-sm">
              {details.label}
            </p>
          </div>

          <div className="p-8 md:p-12 space-y-8">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 space-y-4">
              <h3 className="text-2xl font-bold text-emerald-900 text-center">What&apos;s included</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3 p-3 bg-white/50 rounded-xl">
                  <svg className="w-6 h-6 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-emerald-900">Lifetime course access</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/50 rounded-xl">
                  <svg className="w-6 h-6 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-emerald-900">1-on-1 mentorship</span>
                </div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl font-semibold text-lg hover:from-emerald-600 hover:to-green-700 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                🎯 Go to Dashboard
              </Link>
              <p className="text-sm text-gray-500 italic">
                Redirecting automatically in 5 seconds...
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

