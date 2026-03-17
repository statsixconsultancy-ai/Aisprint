import { Metadata } from 'next'
import SignInForm from '@/components/forms/SignInForm'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sign In - AIsprint',
  description: 'Sign in to your AIsprint account and access your dashboard',
}

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-white pt-20 pb-12 px-4 md:px-6">
      <div className="container-custom max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Welcome Back
          </h1>
          <p className="text-gray-600 font-body">
            Sign in to access your dashboard and continue learning
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <SignInForm />
        </div>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 font-body">
            Don't have an account?{' '}
            <Link
              href="/auth/signup"
              className="text-gray-900 hover:text-gray-700 font-semibold"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
