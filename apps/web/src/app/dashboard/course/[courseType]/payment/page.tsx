'use client'

import { useState } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const courseDetails: Record<
  string,
  { label: string; price: string; priceAmount: number }
> = {
  'ml-ai': {
    label: 'Machine Learning & AI',
    price: '₹79,999',
    priceAmount: 79999,
  },
  'prompt-engineering': {
    label: 'Prompt Engineering',
    price: '₹199',
    priceAmount: 199,
  },
}

declare global {
  interface Window {
    Razorpay: any
  }
}

interface RazorpayResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

export default function PaymentPage({
  params,
}: {
  params: { courseType: string }
}) {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    router.push('/auth/signin')
    return null
  }

  const details = courseDetails[params.courseType]

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

  const handleRazorpayPayment = async () => {
    setIsProcessing(true)
    setError('')

    try {
      // Create order on backend
      const orderRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          course_type: params.courseType,
          amount: details.priceAmount,
        }),
      })

      const orderData = await orderRes.json()

      if (!orderData.success) {
        throw new Error(orderData.message || 'Failed to create order')
      }

      // Load Razorpay script
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.async = true
      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: details.priceAmount * 100, // Amount in paise
          currency: 'INR',
          order_id: orderData.order_id,
          name: 'AiSprint',
          description: details.label,
          image: '/logo.png',
          handler: async (response: RazorpayResponse) => {
            try {
              // Verify payment on backend
              const verifyRes = await fetch('/api/payment/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  course_type: params.courseType,
                }),
              })

              const verifyData = await verifyRes.json()

              if (verifyData.success) {
                router.push(`/dashboard/course/${params.courseType}/success`)
              } else {
                setError('Payment verification failed')
              }
            } catch (err) {
              setError('Payment verification error')
              console.error(err)
            } finally {
              setIsProcessing(false)
            }
          },
          prefill: {
            name: user?.name,
            email: user?.email,
          },
          theme: {
            color: '#2563eb',
          },
        }

        const rzp = new window.Razorpay(options)
        rzp.open()
      }
      document.body.appendChild(script)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment error')
      setIsProcessing(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="container-custom max-w-2xl">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/dashboard" className="hover:text-brand-600">
            Dashboard
          </Link>
          <span>/</span>
          <Link
            href={`/dashboard/course/${params.courseType}`}
            className="hover:text-brand-600"
          >
            {details.label}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Payment</span>
        </div>

        {/* Payment Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-600 to-brand-700 px-8 py-12 text-white">
            <h1 className="text-3xl font-bold mb-2">Complete Your Purchase</h1>
            <p className="text-brand-100">Secure payment powered by Razorpay</p>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Order Summary */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">{details.label}</span>
                  <span className="font-semibold text-gray-900">
                    {details.price}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-3xl font-bold text-brand-600">
                  {details.price}
                </span>
              </div>
            </div>

            {/* Student Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-semibold text-blue-900 mb-4">Student Information</h3>
              <div className="space-y-2">
                <p className="text-blue-900">
                  <span className="text-xs text-blue-700 uppercase tracking-wide">
                    Name
                  </span>
                  <br />
                  {user?.name}
                </p>
                <p className="text-blue-900">
                  <span className="text-xs text-blue-700 uppercase tracking-wide">
                    Email
                  </span>
                  <br />
                  {user?.email}
                </p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Features */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Includes:</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Lifetime course access
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  1-on-1 live mentorship
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Certificate of completion
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Placement support
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <button
                onClick={handleRazorpayPayment}
                disabled={isProcessing}
                className="flex-1 btn-primary justify-center py-4 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    Pay {details.price}
                  </>
                )}
              </button>
              <Link
                href={`/dashboard/course/${params.courseType}`}
                className="px-6 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Back
              </Link>
            </div>

            {/* Security Info */}
            <div className="text-center pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-600 flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Secure payment powered by Razorpay
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
