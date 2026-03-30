'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BarChart3, Users, DollarSign, Package, FolderKanban, 
  Brain, Settings, Menu, Search, Bell, Moon, Sun,
  Sparkles, TrendingUp, Activity, Zap, ArrowUpRight, ArrowDownRight, Command
} from 'lucide-react'
import { cn } from '@/lib/utils'

// KPI Card Component
function KPICard({ title, value, change, trend, icon: Icon, color }: {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: React.ElementType
  color: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative overflow-hidden rounded-2xl p-6",
        "bg-gradient-to-br from-slate-900/90 to-slate-800/90",
        "border border-slate-700/50 backdrop-blur-xl",
        "group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-900/50" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", color)}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium",
            trend === 'up' ? 'text-emerald-400' : 'text-red-400'
          )}>
            {trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            {change}
          </div>
        </div>
        <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
    </motion.div>
  )
}

// Activity Feed Component
function ActivityFeed() {
  const activities = [
    { user: 'Sarah Chen', action: 'closed deal', target: 'Acme Corp', time: '2m ago', avatar: 'SC' },
    { user: 'Mike Johnson', action: 'created invoice', target: '#INV-2024-089', time: '15m ago', avatar: 'MJ' },
    { user: 'Emma Davis', action: 'updated task', target: 'Q4 Marketing Plan', time: '1h ago', avatar: 'ED' },
    { user: 'Alex Kim', action: 'added contact', target: 'john@techstart.io', time: '2h ago', avatar: 'AK' },
  ]

  return (
    <div className="rounded-2xl bg-slate-900/50 border border-slate-700/50 p-6 backdrop-blur-xl">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5 text-cyan-400" />
        Live Activity
      </h3>
      <div className="space-y-4">
        {activities.map((activity, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
              {activity.avatar}
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-300">
                <span className="font-medium text-white">{activity.user}</span>
                {' '}{activity.action}{' '}
                <span className="text-cyan-400">{activity.target}</span>
              </p>
              <p className="text-xs text-slate-500">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Animated Counter
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [value])
  
  return <span>{count.toLocaleString()}{suffix}</span>
}

// Hero Section
function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-slate-900" />
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-indigo-300">AI-Powered Enterprise Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">Run Your </span>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Entire Business</span>
            <br />
            <span className="text-white">From One Platform</span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            Modern ERP with AI insights, real-time analytics, and seamless collaboration. 
            Built for teams that move fast.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all"
            >
              Start Free Trial
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white font-semibold hover:bg-slate-800 transition-all"
            >
              Watch Demo
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {[
            { value: 50000, suffix: '+', label: 'Active Users' },
            { value: 99.9, suffix: '%', label: 'Uptime SLA' },
            { value: 150, suffix: '+', label: 'Integrations' },
            { value: 24, suffix: '/7', label: 'Support' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-slate-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* 3D Cards Showcase */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { 
              title: 'AI Assistant', 
              desc: 'Chat with your data. Ask questions, get insights, automate workflows.',
              icon: Brain, 
              color: 'from-purple-500 to-pink-500',
              delay: 0.1 
            },
            { 
              title: 'Real-time Analytics', 
              desc: 'Live dashboards with predictive insights and anomaly detection.',
              icon: BarChart3, 
              color: 'from-cyan-500 to-blue-500',
              delay: 0.2 
            },
            { 
              title: 'Smart Automation', 
              desc: 'Workflows that learn from your patterns and optimize themselves.',
              icon: Zap, 
              color: 'from-amber-500 to-orange-500',
              delay: 0.3 
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: card.delay, duration: 0.8 }}
              whileHover={{ y: -10 }}
              className={cn(
                "relative overflow-hidden rounded-2xl p-8",
                "bg-gradient-to-br from-slate-900/80 to-slate-800/80",
                "border border-slate-700/50 backdrop-blur-xl"
              )}
            >
              <div className={cn(
                "w-14 h-14 rounded-xl bg-gradient-to-r flex items-center justify-center mb-6",
                card.color
              )}>
                <card.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
              <p className="text-slate-400">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Sidebar Navigation
function Sidebar({ collapsed }: { collapsed: boolean }) {
  const navItems = [
    { icon: BarChart3, label: 'Dashboard', href: '/dashboard', active: true },
    { icon: Users, label: 'CRM', href: '/crm' },
    { icon: DollarSign, label: 'Finance', href: '/finance' },
    { icon: Package, label: 'Inventory', href: '/inventory' },
    { icon: FolderKanban, label: 'Projects', href: '/projects' },
    { icon: Users, label: 'Team', href: '/team' },
    { icon: Brain, label: 'AI Assistant', href: '/ai-assistant' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ]

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-screen bg-slate-950/50 backdrop-blur-xl border-r border-slate-800/50",
      "flex flex-col transition-all duration-300 z-50",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="p-4 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          {!collapsed && <span className="text-xl font-bold text-white">ERP Pro</span>}
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 transition-colors",
              "hover:bg-slate-800/50 hover:text-white",
              item.active && "bg-indigo-600/20 text-indigo-400 border-l-2 border-indigo-500"
            )}
          >
            <item.icon className="w-5 h-5" />
            {!collapsed && <span>{item.label}</span>}
          </a>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-medium">
            MP
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-medium text-white">Matthieu</p>
              <p className="text-xs text-slate-500">Admin</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

// Command Palette
function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-800">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search anything..."
                className="flex-1 bg-transparent text-white placeholder-slate-500 focus:outline-none"
                autoFocus
              />
              <kbd className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-400">ESC</kbd>
            </div>
            <div className="p-2 max-h-80 overflow-y-auto">
              {[
                { icon: Users, label: 'Go to CRM', shortcut: 'G C' },
                { icon: DollarSign, label: 'Create Invoice', shortcut: 'N I' },
                { icon: Package, label: 'Check Inventory', shortcut: 'G I' },
                { icon: Brain, label: 'Ask AI Assistant', shortcut: 'G A' },
              ].map((item, i) => (
                <button
                  key={i}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors text-left"
                >
                  <item.icon className="w-5 h-5 text-slate-400" />
                  <span className="text-white">{item.label}</span>
                  <span className="ml-auto text-xs text-slate-500">{item.shortcut}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Main Dashboard Page
export default function DashboardPage() {
  const { theme, setTheme } = useTheme()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)

  // Keyboard shortcuts
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandOpen(true)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Sidebar collapsed={sidebarCollapsed} />
      
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
              
              <button
                onClick={() => setCommandOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors"
              >
                <Search className="w-4 h-4" />
                <span className="text-sm">Search...</span>
                <kbd className="hidden sm:flex items-center gap-1 ml-4 px-2 py-0.5 bg-slate-700 rounded text-xs">
                  <Command className="w-3 h-3" />K
                </kbd>
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5 text-slate-400" /> : <Moon className="w-5 h-5 text-slate-400" />}
              </button>
              
              <button className="relative p-2 rounded-lg hover:bg-slate-800 transition-colors">
                <Bell className="w-5 h-5 text-slate-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <HeroSection />

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* KPI Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <KPICard title="Total Revenue" value="$284,500" change="+12.5%" trend="up" icon={DollarSign} color="bg-gradient-to-br from-emerald-500 to-teal-600" />
            <KPICard title="Active Deals" value="156" change="+8.2%" trend="up" icon={TrendingUp} color="bg-gradient-to-br from-indigo-500 to-purple-600" />
            <KPICard title="Inventory Items" value="2,847" change="-3.1%" trend="down" icon={Package} color="bg-gradient-to-br from-amber-500 to-orange-600" />
            <KPICard title="Team Members" value="24" change="+2" trend="up" icon={Users} color="bg-gradient-to-br from-cyan-500 to-blue-600" />
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 rounded-2xl bg-slate-900/50 border border-slate-700/50 p-6 backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Revenue Overview</h3>
              <div className="h-64 flex items-end gap-2">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    className="flex-1 bg-gradient-to-t from-indigo-600 to-cyan-400 rounded-t-lg opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                  />
                ))}
              </div>
              <div className="flex justify-between mt-4 text-xs text-slate-500">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => <span key={m}>{m}</span>)}
              </div>
            </div>
            
            <ActivityFeed />
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { label: 'New Invoice', icon: DollarSign, color: 'from-emerald-500 to-teal-600' },
              { label: 'Add Contact', icon: Users, color: 'from-indigo-500 to-purple-600' },
              { label: 'Create Project', icon: FolderKanban, color: 'from-amber-500 to-orange-600' },
              { label: 'Ask AI', icon: Brain, color: 'from-pink-500 to-rose-600' },
            ].map((action, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex items-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r text-white font-medium hover:shadow-lg transition-all",
                  action.color
                )}
              >
                <action.icon className="w-5 h-5" />
                {action.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <CommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} />
    </div>
  )
}
