'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import GeneralTab from '@/components/dashboard/GeneralTab'
import CoursesTab from '@/components/dashboard/CoursesTab'
import SettingsTab from '@/components/dashboard/SettingsTab'
import CertificatesTab from '@/components/dashboard/CertificatesTab'
import WishlistTab from '@/components/dashboard/WishlistTab'

type Tab = 'general' | 'courses' | 'certificates' | 'wishlist' | 'settings'

const sidebarTabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'general', label: 'Overview', icon: '📊' },
  { id: 'courses', label: 'My Courses', icon: '📚' },
  { id: 'certificates', label: 'Certificates', icon: '🏆' },
  { id: 'wishlist', label: 'Wishlist', icon: '❤️' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
]

export default function DashboardPage() {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('general')

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
          <div className="text-center text-gray-600">Loading dashboard...</div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    router.push('/auth/signin')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="flex items-center gap-3 -ml-2">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 truncate max-w-32">{user?.username || user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <img
                  src={user?.profile_image_url || '/avatar-placeholder.png'}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                />
              </Link>
              <button
                onClick={() => router.push('/')}
                className="ml-auto btn-primary text-sm px-4 py-2 bg-gradient-to-r from-purple-600 to-brand-600 hover:from-purple-700 hover:to-brand-700"
              >
                Home
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container-custom py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <DashboardSidebar
            tabs={sidebarTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-lg border border-gray-200">
              {activeTab === 'general' && <GeneralTab />}
              {activeTab === 'courses' && <CoursesTab />}
              {activeTab === 'certificates' && <CertificatesTab />}
              {activeTab === 'wishlist' && <WishlistTab />}
              {activeTab === 'settings' && <SettingsTab />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
