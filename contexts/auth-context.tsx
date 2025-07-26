'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  user: { username: string } | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'Aa1234567$$$'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ username: string } | null>(null)

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated')
    const storedUser = localStorage.getItem('user')
    
    if (authStatus === 'true' && storedUser) {
      setIsAuthenticated(true)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
          setIsAuthenticated(true)
          const userData = { username: ADMIN_USERNAME }
          setUser(userData)
          localStorage.setItem('isAuthenticated', 'true')
          localStorage.setItem('user', JSON.stringify(userData))
          resolve(true)
        } else {
          resolve(false)
        }
      }, 1000)
    })
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}