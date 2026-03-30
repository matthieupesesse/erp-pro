import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: { default: 'ERP Pro - Enterprise Resource Planning', template: '%s | ERP Pro' },
  description: 'Modern ERP solution with AI-powered insights, CRM, Finance, Inventory, Project Management.',
  keywords: ['ERP', 'Business', 'Management', 'CRM', 'Finance', 'Inventory', 'Projects'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
