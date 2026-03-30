'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Send, Sparkles, Lightbulb, BarChart3, Zap } from 'lucide-react'

const mockMessages = [
  { id: '1', role: 'assistant', content: "Hello! I'm your AI assistant. I can help you analyze your business data, generate insights, and answer questions about your ERP system. What would you like to know?" },
  { id: '2', role: 'user', content: "What's our revenue trend this quarter?" },
  { id: '3', role: 'assistant', content: "Based on the latest data, your revenue this quarter shows a **12.5% increase** compared to the previous quarter. Here's the breakdown:\n\n• **Total Revenue**: $284,500\n• **Top Performer**: Enterprise segment (+23%)\n• **Growth Area**: SMB segment showing recovery (+8%)\n\nWould you like me to dive deeper into any specific segment?" },
]

const suggestions = [
  { icon: BarChart3, text: "Analyze sales performance" },
  { icon: Lightbulb, text: "Suggest cost optimizations" },
  { icon: Zap, text: "Identify growth opportunities" },
]

export default function AIAssistantPage() {
  const [messages, setMessages] = useState(mockMessages)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = { id: Date.now().toString(), role: 'user' as const, content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        default: `I've analyzed your request about "${input}". Here are my findings:\n\n1. **Key Insight**: Based on current trends, I recommend focusing on customer retention strategies.\n\n2. **Action Items**:\n- Review top 10 accounts\n- Schedule follow-ups with prospects\n- Analyze conversion funnel\n\n3. **Predicted Impact**: Implementing these suggestions could improve conversion by 15-20%.`,
      }

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: responses.default,
      }])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="ml-64 flex flex-col h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AI Assistant</h1>
              <p className="text-sm text-slate-400">Powered by advanced AI</p>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence>
            {messages.map((message, i) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-2xl rounded-2xl p-4 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600'
                    : 'bg-slate-800/50 border border-slate-700'
                }`}>
                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-purple-400 font-medium">AI Assistant</span>
                    </div>
                  )}
                  <div className="text-white whitespace-pre-wrap">{message.content}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        <div className="px-6 py-2">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {suggestions.map((suggestion, i) => (
              <button
                key={i}
                onClick={() => setInput(suggestion.text)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors whitespace-nowrap"
              >
                <suggestion.icon className="w-4 h-4" />
                {suggestion.text}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-6 border-t border-slate-800/50">
          <div className="flex items-center gap-4 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything about your business..."
                className="w-full px-6 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}
