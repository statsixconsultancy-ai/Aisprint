'use client'

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/components/providers/AuthProvider"
import { useRouter } from "next/navigation"
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import GeneralTab from "@/components/dashboard/GeneralTab"
import CoursesTab from "@/components/dashboard/CoursesTab"
import GlassCard from "@/components/dashboard/GlassCard"

type Tab = "general" | "courses"

const sidebarTabs = [
  { id: "general", label: "Overview", icon: "📊" },
  { id: "courses", label: "My Courses", icon: "📚" }
]

export default function DashboardPage() {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>("general")

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    router.push("/auth/signin")
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex">
        <DashboardSidebar 
          tabs={sidebarTabs} 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <main className="flex-1 p-8">
          <GlassCard>
            {activeTab === "general" && <GeneralTab />}
            {activeTab === "courses" && <CoursesTab />}
          </GlassCard>
        </main>
      </div>
    </div>
  )
}

