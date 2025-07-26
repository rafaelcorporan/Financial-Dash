'use client'

import { useState, useEffect } from 'react'
import { FinancialDashboard } from "@/components/financial-dashboard"
import { LoginPage } from "@/components/login-page"
import { useAuth } from "@/contexts/auth-context"

export default function Home() {
  const { isAuthenticated, login } = useAuth()
  const [error, setError] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogin = async (username: string, password: string) => {
    setError('')
    const success = await login(username, password)
    if (!success) {
      setError('Invalid username or password. Please try again.')
    }
  }

  // Always show login page first, then check authentication
  if (!mounted || !isAuthenticated) {
    return <LoginPage onLogin={handleLogin} error={error} />
  }

  return <FinancialDashboard />
}
