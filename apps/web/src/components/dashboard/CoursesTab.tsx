'use client'

import { useState } from 'react'
import CoursesSubTab from './CoursesSubTab.tsx'
import WishlistSubTab from './WishlistSubTab.tsx'
import CertificatesSubTab from './CertificatesSubTab.tsx'

type CourseSubTab = 'courses' | 'wishlist' | 'certificates'

interface CourseTabItem {
  id: CourseSubTab
  label: string
  icon: string
}

const courseSubTabs: CourseTabItem[] = [
  { id: 'courses', label: 'Enrolled Courses', icon: '📚' },
  { id: 'wishlist', label: 'Wishlist', icon: '❤️' },
  { id: 'certificates', label: 'Certificates', icon: '🏆' },
]

export default function CoursesTab() {
  const [activeSubTab, setActiveSubTab] = useState<CourseSubTab>('courses')

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Courses</h2>
        
        {/* Sub-tabs for courses section */}
        <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-gray-200">
          {courseSubTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                activeSubTab === tab.id
                  ? 'bg-brand-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sub-tab content */}
      {activeSubTab === 'courses' && <CoursesSubTab />}
      {activeSubTab === 'wishlist' && <WishlistSubTab />}
      {activeSubTab === 'certificates' && <CertificatesSubTab />}
    </div>
  )
}
