'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/AuthProvider'
import Link from 'next/link'

export default function SignInForm() {
  const router = useRouter()
  const { signin } = useAuth()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Valid email address is required'
    }

    if (!form.password) {
      newErrors.password = 'Password is required'
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError('')

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setIsSubmitting(true)

    try {
      await signin(form.email, form.password)
      router.push('/dashboard')
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Email */}
      <div>
        <label htmlFor="email" className="label">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          className={`input-field ${errors.email ? 'border-red-400 focus:ring-red-400' : ''}`}
        />
        {errors.email && (
          <p className="mt-1.5 text-xs text-red-500 font-body">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="label">
            Password <span className="text-red-500">*</span>
          </label>
          <Link
            href="#"
            className="text-xs text-brand-600 hover:text-brand-700 font-medium"
          >
            Forgot password?
          </Link>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          className={`input-field ${errors.password ? 'border-red-400 focus:ring-red-400' : ''}`}
        />
        {errors.password && (
          <p className="mt-1.5 text-xs text-red-500 font-body">
            {errors.password}
          </p>
        )}
      </div>

      {/* Server error */}
      {serverError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200">
          <p className="text-sm text-red-600 font-body">{serverError}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary justify-center py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {isSubmitting ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            Signing In...
          </>
        ) : (
          <>
            Sign In
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </>
        )}
      </button>

      {/* Sign up link */}
      <p className="text-sm text-center text-gray-600 font-body">
        Don't have an account?{' '}
        <Link
          href="/auth/signup"
          className="text-brand-600 hover:text-brand-700 font-semibold"
        >
          Sign up here
        </Link>
      </p>

      <p className="text-xs text-center text-gray-400 font-body">
        By signing in, you agree to our{' '}
        <a
          href="/policies/privacy"
          className="underline hover:text-gray-600"
        >
          Privacy Policy
        </a>
        {' '}and{' '}
        <a
          href="/policies/terms"
          className="underline hover:text-gray-600"
        >
          Terms & Conditions
        </a>
        .
      </p>
    </form>
  )
}
