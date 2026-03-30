'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { BarChart3, Users, DollarSign, Package, FolderKanban, Brain, Settings, Menu, Search, Bell, Zap, Command } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { icon: BarChart3, label: 'Dashboard', href: '/dashboard' },
  { icon: Users, label: 'CRM', href: '/crm' },
  { icon: DollarSign, label: 'Finance', href: '/finance' },
  { icon: Package, label: 'Inventory', href: '/inventory' },
  { icon: FolderKanban, label: 'Projects', href: '/projects' },
  { icon: Users, label: 'Team', href: '/team' },
  { icon: Brain, label: 'AI Assistant', href: '/ai-assistant' },
  { icon: Settings, label: 'Settings', href: '/settings' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-pulse text-slate-400">Loading ERP Pro...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-screen bg-slate-950/50 backdrop-blur-xl border-r border-slate-800/50",
        "flex flex-col transition-all duration-300 z-50",
        sidebarCollapsed ? "w-20" : "w-64"
      )}>
        <div className="p-4 border-b border-slate-800/50">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            {!sidebarCollapsed && <span className="text-xl font-bold text-white">ERP Pro</span>}
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                "hover:bg-slate-800/50 hover:text-white",
                pathname === item.href ? "bg-indigo-600/20 text-indigo-400 border-l-2 border-indigo-500" : "text-slate-400"
              )}
            >
              <item.icon className="w-5 h-5" />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-medium">
              MP
            </div>
            {!sidebarCollapsed && (
              <div>
                <p className="text-sm font-medium text-white">Matthieu</p>
                <p className="text-xs text-slate-500">Admin</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn("transition-all duration-300", sidebarCollapsed ? "ml-20" : "ml-64")}>
        {/* Header */}
        <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <Menu className="w-5 h-5 text-slate-400" />
              </button>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg text-slate-400">
                <Search className="w-4 h-4" />
                <span className="text-sm">Search...</span>
                <kbd className="hidden sm:flex items-center gap-1 ml-4 px-2 py-0.5 bg-slate-700 rounded text-xs">
                  <Command className="w-3 h-3" />K
                </kbd>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-slate-800 transition-colors">
                <Bell className="w-5 h-5 text-slate-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
            </div>
          </div>
        </header>
        {children}
      </div>
    </div>
  )
}
