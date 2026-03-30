'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, User, Building, Bell, Shield, Palette, Save } from 'lucide-react'

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'company', label: 'Company', icon: Building },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [profile, setProfile] = useState({ name: 'Matthieu Pesesse', email: 'matthieu@erppro.com', phone: '+1 555-0100', timezone: 'Europe/Paris' })
  const [company, setCompany] = useState({ name: 'ERP Pro Inc.', website: 'https://erppro.com', industry: 'Technology', size: '10-50' })
  const [notifications, setNotifications] = useState({ email: true, push: true, sms: false, weeklyReport: true })

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Settings className="w-6 h-6" /> Settings</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white font-medium">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      <div className="flex gap-6">
        <div className="w-48 space-y-2">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${activeTab === tab.id ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-400 hover:bg-slate-800/50'}`}>
              <tab.icon className="w-5 h-5" /> {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-slate-900/50 border border-slate-700/50 p-6">
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white mb-4">Profile Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm text-slate-400 mb-2">Full Name</label><input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white" /></div>
                  <div><label className="block text-sm text-slate-400 mb-2">Email</label><input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white" /></div>
                  <div><label className="block text-sm text-slate-400 mb-2">Phone</label><input type="tel" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white" /></div>
                  <div><label className="block text-sm text-slate-400 mb-2">Timezone</label><select value={profile.timezone} onChange={(e) => setProfile({ ...profile, timezone: e.target.value })} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white"><option value="Europe/Paris">Europe/Paris</option><option value="America/New_York">America/New_York</option></select></div>
                </div>
              </div>
            )}
            {activeTab === 'company' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white mb-4">Company Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm text-slate-400 mb-2">Company Name</label><input type="text" value={company.name} onChange={(e) => setCompany({ ...company, name: e.target.value })} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white" /></div>
                  <div><label className="block text-sm text-slate-400 mb-2">Website</label><input type="url" value={company.website} onChange={(e) => setCompany({ ...company, website: e.target.value })} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white" /></div>
                  <div><label className="block text-sm text-slate-400 mb-2">Industry</label><select value={company.industry} onChange={(e) => setCompany({ ...company, industry: e.target.value })} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white"><option value="Technology">Technology</option><option value="Finance">Finance</option></select></div>
                  <div><label className="block text-sm text-slate-400 mb-2">Company Size</label><select value={company.size} onChange={(e) => setCompany({ ...company, size: e.target.value })} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white"><option value="1-10">1-10</option><option value="10-50">10-50</option><option value="50-200">50-200</option></select></div>
                </div>
              </div>
            )}
            {activeTab === 'notifications' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white mb-4">Notification Preferences</h2>
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl">
                    <div><p className="font-medium text-white capitalize">{key.replace(/([A-Z])/g, ' $1')}</p><p className="text-sm text-slate-400">Manage {key} notifications</p></div>
                    <button onClick={() => setNotifications({ ...notifications, [key]: !value })} className={`w-12 h-6 rounded-full transition-colors ${value ? 'bg-indigo-600' : 'bg-slate-700'}`}><div className={`w-5 h-5 bg-white rounded-full transition-transform ${value ? 'translate-x-6' : 'translate-x-0.5'}`} /></button>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'security' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white mb-4">Security Settings</h2>
                <div className="p-4 bg-slate-800/30 rounded-xl"><p className="font-medium text-white mb-2">Change Password</p><p className="text-sm text-slate-400 mb-4">Update your password regularly</p><button className="px-4 py-2 bg-slate-700 rounded-lg text-slate-300">Change Password</button></div>
                <div className="p-4 bg-slate-800/30 rounded-xl"><p className="font-medium text-white mb-2">Two-Factor Authentication</p><p className="text-sm text-slate-400 mb-4">Add extra security</p><button className="px-4 py-2 bg-emerald-600 rounded-lg text-white">Enable 2FA</button></div>
              </div>
            )}
            {activeTab === 'appearance' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white mb-4">Appearance</h2>
                <div><label className="block text-sm text-slate-400 mb-2">Theme</label><div className="flex gap-4"><button className="flex-1 p-4 bg-slate-900 border-2 border-indigo-500 rounded-xl text-white">Dark</button><button className="flex-1 p-4 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-400">Light</button></div></div>
                <div><label className="block text-sm text-slate-400 mb-2">Accent Color</label><div className="flex gap-3">{['bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-cyan-500', 'bg-emerald-500'].map((color) => (<button key={color} className={`w-10 h-10 ${color} rounded-full ring-2 ring-offset-2 ring-offset-slate-900 ${color === 'bg-indigo-500' ? 'ring-white' : 'ring-transparent'}`} />))}</div></div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
