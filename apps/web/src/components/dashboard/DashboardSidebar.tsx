'use client'

interface SidebarTab<T = string> {
  id: T
  label: string
  icon: string
}

interface DashboardSidebarProps<T = string> {
  tabs: SidebarTab<T>[]
  activeTab: T
  onTabChange: (tabId: T) => void
}

export default function DashboardSidebar<T extends string = string>({
  tabs,
  activeTab,
  onTabChange,
}: DashboardSidebarProps<T>) {
  return (
    <div className="w-64 bg-white rounded-lg border border-gray-200 h-fit sticky top-24">
      <nav className="p-4">
        <ul className="space-y-2">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-brand-50 text-brand-700 border border-brand-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
