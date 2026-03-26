'use client'

import { useState } from "react"
import { useAuth } from "@/components/providers/AuthProvider"
import { useRouter } from "next/navigation"
import Link from "next/link"

const courseDetails: Record<string, { label: string; price: string; priceAmount: number }> = {
  "ml-ai": {
    label: "Machine Learning & AI",
    price: "₹79,999",
    priceAmount: 79999,
  },
  "prompt-engineering": {
    label: "Prompt Engineering",
    price: "₹199",
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

export default function PaymentPage({ params }: { params: { courseSlug: string } }) {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")

  if (isLoading) {
    return <div className="min-h-screen pt-20 flex items-center justify-center">
      <p className="text-gray-600">Loading...</p>
    </div>
  }

  if (!isAuthenticated) {
    router.push("/auth/signin")
    return null
  }

  const details = courseDetails[params.courseSlug]

  if (!details) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="container-custom text-center py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <Link href="/dashboard" className="btn-primary px-6 py-3">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const handleRazorpayPayment = async () => {
    setIsProcessing(true)
    setError("")

    try {
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          course_type: params.courseSlug,
          amount: details.priceAmount,
        }),
      })

      const orderData = await orderRes.json()

      if (!orderData.success) {
        throw new Error(orderData.message || "Failed to create order")
      }

      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.async = true
      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: details.priceAmount * 100,
          currency: "INR",
          order_id: orderData.order_id,
          name: "AiSprint",
          description: details.label,
          image: "/logo.png",
          handler: async (response: RazorpayResponse) => {
            try {
              const verifyRes = await fetch("/api/payment/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  course_type: params.courseSlug,
                }),
              })

              const verifyData = await verifyRes.json()

              if (verifyData.success) {
                router.push(`/dashboard/course/${params.courseSlug}/success`)
              } else {
                setError("Payment verification failed")
              }
            } catch (err) {
              setError("Payment verification error")
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
            color: "#2563eb",
          },
        }

        const rzp = new window.Razorpay(options)
        rzp.open()
      }
      document.body.appendChild(script)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment error")
      setIsProcessing(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>
          <span>/</span>
          <Link
            href={`/dashboard/course/${params.courseSlug}`}
            className="hover:text-blue-600"
          >
            {details.label}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Payment</span>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-12 text-white text-center">
            <h1 className="text-3xl font-bold mb-2">Complete Your Purchase</h1>
            <p className="text-blue-100">Secure payment powered by Razorpay</p>
          </div>

          <div className="p-8 space-y-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">{details.label}</span>
                  <span className="font-semibold text-gray-900">{details.price}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-3xl font-bold text-blue-600">{details.price}</span>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleRazorpayPayment}
                disabled={isProcessing}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
              >
                {isProcessing ? "Processing..." : `Pay ${details.price}`}
              </button>
              <Link
                href={`/dashboard/course/${params.courseSlug}`}
                className="px-8 py-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

