'use client'

import { motion } from 'framer-motion'
import { Mail, Calendar } from 'lucide-react'

const mockTeam = [
  { id: '1', name: 'Matthieu Pesesse', email: 'matthieu@erppro.com', role: 'Admin', department: 'Executive', avatar: 'MP', status: 'online', joinedAt: '2023-01-01' },
  { id: '2', name: 'Sarah Chen', email: 'sarah@erppro.com', role: 'Manager', department: 'Sales', avatar: 'SC', status: 'online', joinedAt: '2023-03-15' },
  { id: '3', name: 'Mike Johnson', email: 'mike@erppro.com', role: 'Member', department: 'Development', avatar: 'MJ', status: 'away', joinedAt: '2023-06-01' },
  { id: '4', name: 'Emma Davis', email: 'emma@erppro.com', role: 'Member', department: 'Marketing', avatar: 'ED', status: 'offline', joinedAt: '2023-09-01' },
  { id: '5', name: 'Alex Kim', email: 'alex@erppro.com', role: 'Manager', department: 'Finance', avatar: 'AK', status: 'online', joinedAt: '2023-04-01' },
]

const roleColors: Record<string, string> = { Admin: 'bg-red-500/20 text-red-400', Manager: 'bg-amber-500/20 text-amber-400', Member: 'bg-slate-500/20 text-slate-400' }
const statusColors: Record<string, string> = { online: 'bg-emerald-500', away: 'bg-amber-500', offline: 'bg-slate-500' }

export default function TeamPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Team</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTeam.map((member, i) => (
          <motion.div key={member.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-2xl bg-slate-900/50 border border-slate-700/50 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">{member.avatar}</div>
                <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-slate-900 ${statusColors[member.status]}`} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">{member.name}</h3>
                <p className="text-slate-400 text-sm">{member.department}</p>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${roleColors[member.role]}`}>{member.role}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-400"><Mail className="w-4 h-4" /><span>{member.email}</span></div>
              <div className="flex items-center gap-2 text-sm text-slate-400"><Calendar className="w-4 h-4" /><span>Joined {new Date(member.joinedAt).toLocaleDateString()}</span></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
