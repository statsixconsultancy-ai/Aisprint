import { Metadata } from 'next'
import RegistrationForm from '@/components/forms/RegistrationForm'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sign Up - AIsprint',
  description: 'Create your AIsprint account and start your AI learning journey',
}

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-white pt-20 pb-12 px-4 md:px-6">
      <div className="container-custom max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Create Your Account
          </h1>

        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <RegistrationForm />
        </div>

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 font-body">
            Already have an account?{' '}
            <Link
              href="/auth/signin"
              className="text-gray-900 hover:text-gray-700 font-semibold"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
