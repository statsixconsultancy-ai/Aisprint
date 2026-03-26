'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/components/providers/AuthProvider'

const navItems = [
  { name: "Overview", href: "/dashboard", icon: "📊" },
  { name: "Courses", href: "/dashboard/courses", icon: "📚" },
  { name: "Certificates", href: "/dashboard/certificates", icon: "🏆" }
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const { user, signout } = useAuth()
  
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/")

  return (
    <aside className="w-64 bg-white/80 backdrop-blur border-r border-gray-200 sticky top-0 h-screen overflow-y-auto">
      <div className="p-6 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo3.png" alt="AIsprint" className="w-10 h-10 rounded-lg" />
          <span className="font-bold text-xl">AIsprint</span>
        </Link>
      </div>
      
      <nav className="p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              isActive(item.href)
                ? "bg-brand-600 text-white shadow-lg"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <span>{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
      
      <div className="p-4 border-t mt-auto">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
          <img src="/logo3.png" alt="Profile" className="w-10 h-10 rounded-lg" />
          <div>
            <p className="font-semibold text-sm">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
        <button 
          onClick={signout}
          className="w-full mt-3 p-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          Sign Out
        </button>
      </div>
    </aside>
  )
}

