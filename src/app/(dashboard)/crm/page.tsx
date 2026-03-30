'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Plus, Filter, Mail, Phone, Building, MoreHorizontal } from 'lucide-react'

const mockContacts = [
  { id: '1', name: 'Sarah Chen', email: 'sarah@acmecorp.com', phone: '+1 555-0101', company: 'Acme Corp', position: 'CEO', status: 'CUSTOMER', value: 125000 },
  { id: '2', name: 'Mike Johnson', email: 'mike@techstart.io', phone: '+1 555-0102', company: 'TechStart', position: 'CTO', status: 'PROSPECT', value: 75000 },
  { id: '3', name: 'Emma Davis', email: 'emma@globalfirm.com', phone: '+1 555-0103', company: 'Global Firm', position: 'VP Sales', status: 'LEAD', value: 0 },
  { id: '4', name: 'Alex Kim', email: 'alex@innovate.co', phone: '+1 555-0104', company: 'Innovate Co', position: 'Director', status: 'CUSTOMER', value: 200000 },
  { id: '5', name: 'Lisa Wang', email: 'lisa@nextera.com', phone: '+1 555-0105', company: 'NextEra', position: 'Procurement', status: 'PROSPECT', value: 95000 },
]

const statusColors: Record<string, string> = {
  LEAD: 'bg-slate-500/20 text-slate-400',
  PROSPECT: 'bg-amber-500/20 text-amber-400',
  CUSTOMER: 'bg-emerald-500/20 text-emerald-400',
  CHURNED: 'bg-red-500/20 text-red-400',
}

export default function CRMPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredContacts = mockContacts.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.company.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">CRM</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white font-medium">
          <Plus className="w-4 h-4" /> Add Contact
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white">
            <option value="all">All Status</option>
            <option value="LEAD">Lead</option>
            <option value="PROSPECT">Prospect</option>
            <option value="CUSTOMER">Customer</option>
          </select>
        </div>
      </div>

      <div className="rounded-2xl bg-slate-900/50 border border-slate-700/50 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Contact</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Company</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Value</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {filteredContacts.map((contact, i) => (
              <motion.tr key={contact.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="hover:bg-slate-800/30">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium">
                      {contact.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-white">{contact.name}</p>
                      <p className="text-sm text-slate-400">{contact.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300">{contact.company}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[contact.status]}`}>{contact.status}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-emerald-400 font-medium">{contact.value > 0 ? `$${contact.value.toLocaleString()}` : '-'}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-slate-700 rounded-lg"><Mail className="w-4 h-4 text-slate-400" /></button>
                    <button className="p-2 hover:bg-slate-700 rounded-lg"><Phone className="w-4 h-4 text-slate-400" /></button>
                    <button className="p-2 hover:bg-slate-700 rounded-lg"><MoreHorizontal className="w-4 h-4 text-slate-400" /></button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
