'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, TrendingUp, DollarSign, Package, Users, ArrowUpRight, ArrowDownRight, Activity, BarChart3, Brain, Zap, FolderKanban } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="p-6">Loading...</div>
  }

  const kpis = [
    { title: 'Total Revenue', value: '$284,500', change: '+12.5%', trend: 'up', icon: DollarSign, color: 'bg-gradient-to-br from-emerald-500 to-teal-600' },
    { title: 'Active Deals', value: '156', change: '+8.2%', trend: 'up', icon: TrendingUp, color: 'bg-gradient-to-br from-indigo-500 to-purple-600' },
    { title: 'Inventory Items', value: '2,847', change: '-3.1%', trend: 'down', icon: Package, color: 'bg-gradient-to-br from-amber-500 to-orange-600' },
    { title: 'Team Members', value: '24', change: '+2', trend: 'up', icon: Users, color: 'bg-gradient-to-br from-cyan-500 to-blue-600' },
  ]

  return (
    <div className="p-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-950 to-slate-900 rounded-2xl p-8 mb-8">
        <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-indigo-300">AI-Powered Enterprise Platform</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">
              <span className="text-white">Run Your </span>
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Entire Business</span>
              <span className="text-white"> From One Platform</span>
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Modern ERP with AI insights, real-time analytics, and seamless collaboration.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[{ value: '50,000+', label: 'Active Users' }, { value: '99.9%', label: 'Uptime' }, { value: '150+', label: 'Integrations' }, { value: '24/7', label: 'Support' }].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-slate-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", kpi.color)}>
                <kpi.icon className="w-6 h-6 text-white" />
              </div>
              <div className={cn("flex items-center gap-1 text-sm font-medium", kpi.trend === 'up' ? 'text-emerald-400' : 'text-red-400')}>
                {kpi.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {kpi.change}
              </div>
            </div>
            <h3 className="text-slate-400 text-sm font-medium mb-1">{kpi.title}</h3>
            <p className="text-3xl font-bold text-white">{kpi.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl bg-slate-900/50 border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Revenue Overview</h3>
          <div className="h-48 flex items-end gap-2">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.05 }}
                className="flex-1 bg-gradient-to-t from-indigo-600 to-cyan-400 rounded-t-lg"
              />
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-slate-500">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => <span key={m}>{m}</span>)}
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900/50 border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            Live Activity
          </h3>
          <div className="space-y-4">
            {[
              { user: 'Sarah Chen', action: 'closed deal', target: 'Acme Corp' },
              { user: 'Mike Johnson', action: 'created invoice', target: '#INV-089' },
              { user: 'Emma Davis', action: 'updated task', target: 'Q4 Plan' },
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs">
                  {a.user.split(' ').map(n => n[0]).join('')}
                </div>
                <p className="text-sm text-slate-300">
                  <span className="text-white font-medium">{a.user}</span> {a.action} <span className="text-cyan-400">{a.target}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
