'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Package, Search, Plus, AlertTriangle, TrendingDown, BarChart3 } from 'lucide-react'

const mockInventory = [
  { id: '1', sku: 'SKU-001', name: 'Widget Pro X', category: 'Electronics', quantity: 150, reorderLevel: 20, unitPrice: 49.99, location: 'Warehouse A' },
  { id: '2', sku: 'SKU-002', name: 'Gadget Plus', category: 'Electronics', quantity: 8, reorderLevel: 15, unitPrice: 79.99, location: 'Warehouse A' },
  { id: '3', sku: 'SKU-003', name: 'Component Alpha', category: 'Parts', quantity: 500, reorderLevel: 100, unitPrice: 5.99, location: 'Warehouse B' },
  { id: '4', sku: 'SKU-004', name: 'Module Beta', category: 'Parts', quantity: 12, reorderLevel: 25, unitPrice: 29.99, location: 'Warehouse B' },
  { id: '5', sku: 'SKU-005', name: 'Accessory Pack', category: 'Accessories', quantity: 200, reorderLevel: 30, unitPrice: 19.99, location: 'Warehouse A' },
  { id: '6', sku: 'SKU-006', name: 'Premium Cable', category: 'Accessories', quantity: 5, reorderLevel: 50, unitPrice: 14.99, location: 'Warehouse A' },
]

const categories = ['All', 'Electronics', 'Parts', 'Accessories']

export default function InventoryPage() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  const filteredItems = mockInventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                          item.sku.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const lowStockItems = mockInventory.filter(item => item.quantity <= item.reorderLevel)

  const stats = {
    totalItems: mockInventory.length,
    totalValue: mockInventory.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0),
    lowStock: lowStockItems.length,
    categories: 3,
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="ml-64">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Inventory</h1>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg text-white font-medium hover:shadow-lg transition-all">
                <Plus className="w-4 h-4" />
                Add Item
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
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <span className="text-slate-400 text-sm">Total Items</span>
              </div>
              <p className="text-3xl font-bold text-white">{stats.totalItems}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50 p-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <span className="text-slate-400 text-sm">Total Value</span>
              </div>
              <p className="text-3xl font-bold text-white">${stats.totalValue.toLocaleString()}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50 p-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <span className="text-slate-400 text-sm">Low Stock</span>
              </div>
              <p className="text-3xl font-bold text-white">{stats.lowStock}</p>
              <p className="text-red-400 text-sm mt-2">Needs attention</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50 p-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-white" />
                </div>
                <span className="text-slate-400 text-sm">Categories</span>
              </div>
              <p className="text-3xl font-bold text-white">{stats.categories}</p>
            </motion.div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="flex items-center gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    categoryFilter === cat
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Low Stock Alert */}
          {lowStockItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-medium">Low Stock Alert:</span>
                <span className="text-slate-300">{lowStockItems.length} items need restocking</span>
              </div>
            </motion.div>
          )}

          {/* Inventory Table */}
          <div className="rounded-2xl bg-slate-900/50 border border-slate-700/50 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Item</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Quantity</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Unit Price</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredItems.map((item, i) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className={`hover:bg-slate-800/30 transition-colors ${
                      item.quantity <= item.reorderLevel ? 'bg-red-500/5' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-white">{item.name}</p>
                        <p className="text-sm text-slate-500">{item.sku}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full bg-slate-700 text-slate-300 text-sm">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${item.quantity <= item.reorderLevel ? 'text-red-400' : 'text-white'}`}>
                          {item.quantity}
                        </span>
                        {item.quantity <= item.reorderLevel && (
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-emerald-400">${item.unitPrice.toFixed(2)}</td>
                    <td className="px-6 py-4 text-slate-400">{item.location}</td>
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
