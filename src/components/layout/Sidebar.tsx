'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BarChart3, Users, DollarSign, Package, FolderKanban, 
  Brain, Settings, Menu, Zap, ChevronDown, LogOut, X
} from 'lucide-react'
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

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-slate-950/50 backdrop-blur-xl border-r border-slate-800/50',
        'flex flex-col transition-all duration-300 z-50',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-slate-800/50">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          {!collapsed && <span className="text-xl font-bold text-white">ERP Pro</span>}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-indigo-600/20 text-indigo-400 border-l-2 border-indigo-500'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* User Menu */}
      <div className="p-4 border-t border-slate-800/50 relative">
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className={cn(
            'w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/50 transition-colors',
            collapsed && 'justify-center'
          )}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-medium flex-shrink-0">
            MP
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-white">Matthieu</p>
                <p className="text-xs text-slate-500">Admin</p>
              </div>
              <ChevronDown className={cn('w-4 h-4 text-slate-400 transition-transform', showUserMenu && 'rotate-180')} />
            </>
          )}
        </button>

        {/* User Dropdown */}
        <AnimatePresence>
          {showUserMenu && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={cn(
                'absolute bottom-full left-4 right-4 mb-2 bg-slate-900 border border-slate-700 rounded-xl shadow-xl overflow-hidden',
                collapsed && 'left-0 right-0'
              )}
            >
              <Link
                href="/settings"
                className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 transition-colors"
                onClick={() => setShowUserMenu(false)}
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
              <button
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-slate-800 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  )
}

export function MobileSidebar({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean
  onClose: () => void 
}) {
  const pathname = usePathname()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-0 top-0 h-screen w-64 bg-slate-950 border-r border-slate-800 z-50 lg:hidden"
          >
            <div className="p-4 border-b border-slate-800/50 flex items-center justify-between">
              <Link href="/dashboard" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">ERP Pro</span>
              </Link>
              <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-indigo-600/20 text-indigo-400 border-l-2 border-indigo-500'
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
