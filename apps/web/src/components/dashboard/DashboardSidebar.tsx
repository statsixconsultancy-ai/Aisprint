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
    <div className="w-full md:w-64 bg-white rounded-xl border border-gray-200 md:h-fit md:sticky md:top-24">
      <nav className="flex md:flex-col overflow-x-auto md:overflow-x-visible">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-3 px-6 py-4 font-medium text-sm whitespace-nowrap md:whitespace-normal transition-all border-b-2 md:border-b-0 md:border-l-4 ${
              activeTab === tab.id
                ? 'border-brand-600 text-brand-600 bg-brand-50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50 md:hover:bg-gray-50'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
