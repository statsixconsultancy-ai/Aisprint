'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/AuthProvider'

export default function SignUpForm() {
  const router = useRouter()
  const { signinWithGoogle } = useAuth()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Email is required')
      return
    }

    setLoading(true)

    try {
      // 👉 You can store email in query or state
      router.push(`/auth/signup/password?email=${encodeURIComponent(email)}`)
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5">

      {/* ✅ Google Button */}
      <button
        onClick={signinWithGoogle}
        className="w-full h-12 rounded-xl border border-gray-200 bg-white text-sm font-medium flex items-center justify-center gap-3 hover:bg-gray-50 transition"
      >
        <svg width="18" height="18" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.2 0 6.1 1.2 8.4 3.1l6.3-6.3C34.6 2.6 29.6 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.4 5.7C12.1 13.1 17.6 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-2.7-.4-3.9H24v7.4h12.8c-.3 2-1.8 5-5.2 7l8 6.2c4.6-4.3 7-10.6 7-16.7z"/>
          <path fill="#FBBC05" d="M10.1 28.9c-1-2-1.6-4.2-1.6-6.4s.6-4.4 1.6-6.4l-7.4-5.7C1 13.7 0 16.8 0 20s1 6.3 2.7 9.6l7.4-5.7z"/>
          <path fill="#34A853" d="M24 48c6.6 0 12.2-2.2 16.2-6l-8-6.2c-2.2 1.5-5 2.5-8.2 2.5-6.4 0-11.9-3.6-13.9-8.8l-7.4 5.7C6.6 42.6 14.6 48 24 48z"/>
        </svg>

        Continue with Google
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400">or</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Error */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Email Form */}
      <form onSubmit={handleContinue} className="space-y-4">

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Email Address
          </label>

          <input
            type="email"
            placeholder="jane@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm 
                       focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        {/* Continue Button (no gradient — elegant) */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl bg-brand-600 text-white font-medium text-sm 
                     hover:bg-brand-700 transition-all 
                     disabled:opacity-60"
        >
          {loading ? 'Loading...' : 'Continue'}
        </button>

      </form>
    </div>
  )
}