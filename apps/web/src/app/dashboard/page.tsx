'use client'

import { useState } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import GeneralTab from '@/components/dashboard/GeneralTab'
import CoursesTab from '@/components/dashboard/CoursesTab'
import SettingsTab from '@/components/dashboard/SettingsTab'

type Tab = 'general' | 'courses' | 'settings'

const sidebarTabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'general', label: 'General', icon: '👤' },
  { id: 'courses', label: 'Courses', icon: '📚' },]

export default function DashboardPage() {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('general')

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    router.push('/auth/signin')
    return null
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome, {user?.name}!
          </h1>
          <p className="text-gray-600">Manage your learning journey and account</p>
        </div>

        {/* Main Layout with Sidebar and Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar - Left */}
          <DashboardSidebar
            tabs={sidebarTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Tab Content - Right */}
          <div className="flex-1 bg-white rounded-xl border border-gray-200 p-8">
            {activeTab === 'general' && <GeneralTab />}
            {activeTab === 'courses' && <CoursesTab />}
            {activeTab === 'settings' && <SettingsTab />}
          </div>
        </div>
      </div>
    </main>
  )
}
