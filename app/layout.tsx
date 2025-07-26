import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/contexts/auth-context'

export const metadata: Metadata = {
  title: 'Financial Dashboard',
  description: 'Secure Financial Dashboard Application',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
