'use client'

import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
      {children}
      <Toaster 
        position="top-right" 
        toastOptions={{ 
          duration: 4000,
          style: { 
            background: '#1e293b', 
            color: '#f8fafc', 
            border: '1px solid #334155' 
          }
        }} 
      />
    </ThemeProvider>
  )
}
