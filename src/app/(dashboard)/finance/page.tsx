'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Search, Plus, Download, TrendingUp, TrendingDown, FileText, Clock } from 'lucide-react'

const mockInvoices = [
  { id: '1', number: 'INV-2024-001', client: 'Acme Corp', amount: 12500, status: 'PAID', dueDate: '2024-03-15', paidAt: '2024-03-10' },
  { id: '2', number: 'INV-2024-002', client: 'TechStart', amount: 8750, status: 'SENT', dueDate: '2024-03-20', paidAt: null },
  { id: '3', number: 'INV-2024-003', client: 'Global Firm', amount: 32000, status: 'OVERDUE', dueDate: '2024-02-28', paidAt: null },
  { id: '4', number: 'INV-2024-004', client: 'Innovate Co', amount: 15000, status: 'PAID', dueDate: '2024-03-01', paidAt: '2024-02-28' },
  { id: '5', number: 'INV-2024-005', client: 'NextEra', amount: 6800, status: 'DRAFT', dueDate: null, paidAt: null },
]

const statusColors: Record<string, string> = {
  DRAFT: 'bg-slate-500/20 text-slate-400',
  SENT: 'bg-blue-500/20 text-blue-400',
  PAID: 'bg-emerald-500/20 text-emerald-400',
  OVERDUE: 'bg-red-500/20 text-red-400',
}

export default function FinancePage() {
  const [search, setSearch] = useState('')

  const stats = {
    totalRevenue: 156250,
    outstanding: 52750,
    overdue: 32000,
    paidThisMonth: 103500,
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="ml-64">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Finance</h1>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg text-white font-medium hover:shadow-lg transition-all">
                <Plus className="w-4 h-4" />
                New Invoice
              </button>
            </div>
          </div>
        </header>

        {/* Stats */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50 p-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <span className="text-slate-400 text-sm">Total Revenue</span>
              </div>
              <p className="text-3xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-2 text-emerald-400 text-sm">
                <TrendingUp className="w-4 h-4" /> +12.5%
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50 p-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <span className="text-slate-400 text-sm">Outstanding</span>
              </div>
              <p className="text-3xl font-bold text-white">${stats.outstanding.toLocaleString()}</p>
              <p className="text-slate-500 text-sm mt-2">4 invoices pending</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50 p-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-white" />
                </div>
                <span className="text-slate-400 text-sm">Overdue</span>
              </div>
              <p className="text-3xl font-bold text-white">${stats.overdue.toLocaleString()}</p>
              <p className="text-red-400 text-sm mt-2">1 invoice overdue</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50 p-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-slate-400 text-sm">Paid This Month</span>
              </div>
              <p className="text-3xl font-bold text-white">${stats.paidThisMonth.toLocaleString()}</p>
              <p className="text-slate-500 text-sm mt-2">2 invoices paid</p>
            </motion.div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search invoices..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Invoices Table */}
          <div className="rounded-2xl bg-slate-900/50 border border-slate-700/50 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Invoice</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Client</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Due Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {mockInvoices.map((invoice, i) => (
                  <motion.tr
                    key={invoice.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-slate-800/30 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium text-indigo-400">{invoice.number}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{invoice.client}</td>
                    <td className="px-6 py-4">
                      <span className="text-white font-medium">${invoice.amount.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[invoice.status]}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : '-'}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
