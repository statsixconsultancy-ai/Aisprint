'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/AuthProvider'

export default function RegistrationForm() {
  const router = useRouter()
  const { signup } = useAuth()
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  const validate = () => {
    const newErrors: Record<string, string> = {}
  
    // username validation
    if (!form.username.trim()) {
      newErrors.username = 'Username is required'
    } else if (form.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    } else if (!/^[a-zA-Z0-9_]+$/.test(form.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores'
    }
  
    // only email and password required
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
  
    if (!form.password || form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
  
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
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
      await signup(form.username, form.email, form.password)
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Username */}
      <div>
        <label htmlFor="username" className="label">
          Username <span className="text-red-500">*</span>
        </label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="yourusername"
          value={form.username}
          onChange={handleChange}
          className={`input-field ${errors.username ? 'border-red-400 focus:ring-red-400' : ''}`}
          maxLength={20}
        />
        {errors.username && (
          <p className="mt-1.5 text-xs text-red-500 font-body">{errors.username}</p>
        )}
      </div>

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
        <label htmlFor="password" className="label">
          Password <span className="text-red-500">*</span>
        </label>
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
          <p className="mt-1.5 text-xs text-red-500 font-body">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="label">
          Confirm Password <span className="text-red-500">*</span>
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          value={form.confirmPassword}
          onChange={handleChange}
          className={`input-field ${errors.confirmPassword ? 'border-red-400 focus:ring-red-400' : ''}`}
        />
        {errors.confirmPassword && (
          <p className="mt-1.5 text-xs text-red-500 font-body">
            {errors.confirmPassword}
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
            Creating Account...
          </>
        ) : (
          <>
            Create Free Account
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

      <p className="text-xs text-center text-gray-400 font-body">
        By signing up, you agree to our{' '}
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
