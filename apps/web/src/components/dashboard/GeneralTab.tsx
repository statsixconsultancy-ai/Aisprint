'use client'

import { useAuth } from '@/components/providers/AuthProvider'
import Link from 'next/link'

export default function GeneralTab() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.username || user?.name || 'User'}! 👋
        </h1>
        <p className="text-gray-600">
          Continue your learning journey. You have 2 upcoming sessions this week.
        </p>
      </div>

      {/* Stats Grid - Empty State */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <div className="animate-pulse space-y-2">
            <div className="w-12 h-12 mx-auto bg-gray-200 rounded-full"></div>
            <p className="text-gray-500">Loading your stats...</p>
            <p className="text-sm text-gray-400">Courses, certificates, progress</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* My Courses - Empty */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">My Courses</h2>
            <Link href="/courses" className="text-sm text-brand-600 hover:text-brand-700 font-medium">
              Browse →
            </Link>
          </div>
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">No courses yet</p>
            <p className="text-sm">Enroll in a course to get started</p>
          </div>
        </div>

        {/* Schedule - Empty */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Schedule</h2>
            <Link href="/dashboard/courses" className="text-sm text-brand-600 hover:text-brand-700 font-medium">
              View All →
            </Link>
          </div>
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">No sessions scheduled</p>
            <p className="text-sm">Sessions appear after course enrollment</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/ml-ai"
            className="flex items-center gap-3 p-4 bg-brand-50 hover:bg-brand-100 rounded-lg transition-all duration-200 hover:shadow-sm"
          >
            <span className="text-2xl">🤖</span>
            <div>
              <p className="font-medium text-gray-900">Browse Courses</p>
              <p className="text-sm text-gray-600">Find your next learning path</p>
            </div>
          </Link>
          <Link
            href="/dashboard/certificates"
            className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-all duration-200 hover:shadow-sm"
          >
            <span className="text-2xl">🏆</span>
            <div>
              <p className="font-medium text-gray-900">View Certificates</p>
              <p className="text-sm text-gray-600">Showcase your achievements</p>
            </div>
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-all duration-200 hover:shadow-sm"
          >
            <span className="text-2xl">💬</span>
            <div>
              <p className="font-medium text-gray-900">Get Support</p>
              <p className="text-sm text-gray-600">Need help? We're here</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
