'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FolderKanban, Plus, Clock, Users, CheckCircle2 } from 'lucide-react'

const mockProjects = [
  { id: '1', name: 'ERP System Implementation', description: 'Complete ERP system rollout', status: 'ACTIVE', progress: 75, startDate: '2024-01-15', endDate: '2024-06-30', team: 5, tasks: { total: 24, completed: 18 } },
  { id: '2', name: 'Website Redesign', description: 'Modernize company website', status: 'ACTIVE', progress: 45, startDate: '2024-02-01', endDate: '2024-04-15', team: 3, tasks: { total: 15, completed: 7 } },
  { id: '3', name: 'Mobile App Development', description: 'iOS and Android apps', status: 'PLANNING', progress: 10, startDate: '2024-04-01', endDate: '2024-09-30', team: 4, tasks: { total: 32, completed: 3 } },
  { id: '4', name: 'Data Migration', description: 'Legacy system migration', status: 'COMPLETED', progress: 100, startDate: '2023-10-01', endDate: '2024-01-15', team: 2, tasks: { total: 18, completed: 18 } },
]

const statusColors: Record<string, string> = {
  PLANNING: 'bg-amber-500/20 text-amber-400',
  ACTIVE: 'bg-emerald-500/20 text-emerald-400',
  ON_HOLD: 'bg-slate-500/20 text-slate-400',
  COMPLETED: 'bg-blue-500/20 text-blue-400',
  CANCELLED: 'bg-red-500/20 text-red-400',
}

export default function ProjectsPage() {
  const [view, setView] = useState<'grid' | 'kanban'>('grid')

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="ml-64">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Projects</h1>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg transition-all">
                <Plus className="w-4 h-4" />
                New Project
              </button>
            </div>
          </div>
        </header>

        {/* Projects Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50 p-6 hover:border-slate-600 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <FolderKanban className="w-6 h-6 text-white" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                    {project.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{project.description}</p>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-400">Progress</span>
                    <span className="text-white font-medium">{project.progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{project.team}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{project.tasks.completed}/{project.tasks.total}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(project.endDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
