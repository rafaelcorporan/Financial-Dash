'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, User, Lock, BarChart3 } from 'lucide-react'

interface LoginPageProps {
  onLogin: (username: string, password: string) => void
  error?: string
}

export function LoginPage({ onLogin, error }: LoginPageProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      await onLogin(username, password)
    } finally {
      setIsLoading(false)
    }
  }

  // Animated background elements
  const AnimatedBackground = () => {
    const [mounted, setMounted] = useState(false)
    
    useEffect(() => {
      setMounted(true)
    }, [])

    if (!mounted) return null

    return (
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes with animation */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }, (_, i) => {
            const sizes = ['w-16 h-16', 'w-20 h-20', 'w-24 h-24'];
            const sizeClass = sizes[i % 3];
            
            return (
              <div
                key={i}
                className="absolute opacity-10"
                style={{
                  left: `${10 + (i * 12)}%`,
                  top: `${10 + (i * 10)}%`,
                  animation: `float ${6 + (i % 3)}s ease-in-out infinite ${i * 0.5}s`,
                }}
              >
                <div className={`${sizeClass} bg-gradient-to-br from-blue-300/30 to-purple-300/30 rounded-full blur-sm`} />
              </div>
            );
          })}
        </div>

        {/* Animated green lines */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 25 }, (_, i) => (
            <div
              key={i}
              className="absolute h-px bg-green-400"
              style={{
                width: '150px',
                left: `${i * 4}%`,
                top: `${i * 4}%`,
                transform: 'rotate(45deg)',
                animation: `slide ${8}s linear infinite ${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        {/* Pulsing circles */}
        <div className="absolute inset-0">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-blue-300/20 animate-ping"
              style={{
                left: `${5 + (i * 8)}%`,
                top: `${5 + (i * 7)}%`,
                width: `${20 + (i % 3) * 15}px`,
                height: `${20 + (i % 3) * 15}px`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${3 + (i % 2)}s`,
              }}
            />
          ))}
        </div>

        {/* Moving data streams */}
        <div className="absolute inset-0">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="absolute opacity-15"
              style={{
                left: `${i * 16}%`,
                top: '0%',
                height: '100%',
                width: '2px',
                background: 'linear-gradient(to bottom, transparent, #60a5fa, transparent)',
                animation: `dataStream ${4 + i}s linear infinite`,
              }}
            />
          ))}
        </div>

        {/* Vertical falling green lines */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }, (_, i) => (
            <div
              key={i}
              className="absolute opacity-30"
              style={{
                left: `${i * 6.5}%`,
                top: '-10%',
                width: '1px',
                height: '20px',
                background: 'linear-gradient(to bottom, transparent, #22c55e, #22c55e, transparent)',
                animation: `fallDown ${3 + (i % 3)}s linear infinite ${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        {/* Additional vertical green lines with different speeds */}
        <div className="absolute inset-0">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="absolute opacity-20"
              style={{
                left: `${3 + (i * 8)}%`,
                top: '-15%',
                width: '2px',
                height: '30px',
                background: 'linear-gradient(to bottom, transparent, #16a34a, #16a34a, #16a34a, transparent)',
                animation: `fallDown ${4 + (i % 4)}s linear infinite ${i * 0.4}s`,
              }}
            />
          ))}
        </div>

        {/* Matrix-style code rain */}
        <div className="absolute inset-0 opacity-5">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="absolute text-xs text-gray-300 font-mono"
              style={{
                left: `${i * 8}%`,
                animation: `codeRain ${10 + (i % 3) * 2}s linear infinite ${i * 0.8}s`,
              }}
            >
              {Array.from({ length: 15 }, (_, j) => (
                <div key={j} style={{ opacity: 0.3 + (j % 3) * 0.2 }}>
                  {j % 2 === 0 ? '1' : '0'}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Financial data points floating */}
        <div className="absolute top-20 left-10 opacity-10">
          <div className="bg-slate-800/50 rounded-lg p-3 animate-pulse">
            <div className="text-blue-400 text-xs">Revenue</div>
            <div className="text-slate-300 text-sm font-semibold">$124,567</div>
          </div>
        </div>
        
        <div className="absolute top-40 right-12 opacity-10">
          <div className="bg-slate-800/50 rounded-lg p-3 animate-pulse" style={{ animationDelay: '1s' }}>
            <div className="text-green-400 text-xs">Profit</div>
            <div className="text-slate-300 text-sm font-semibold">+12.4%</div>
          </div>
        </div>
        
        <div className="absolute bottom-32 left-12 opacity-10">
          <div className="bg-slate-800/50 rounded-lg p-3 animate-pulse" style={{ animationDelay: '2s' }}>
            <div className="text-purple-400 text-xs">Expenses</div>
            <div className="text-slate-300 text-sm font-semibold">$89,234</div>
          </div>
        </div>

        {/* Gradient overlays - matching dashboard slate theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/80 to-slate-950/95" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/10 via-transparent to-slate-800/20" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative">
      <AnimatedBackground />
      
      {/* Main login card */}
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-lg shadow-2xl relative z-10">
        {/* Header */}
        <div className="text-center py-8 px-6 space-y-6">
          {/* Brand Logo - matching the sidebar exactly */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <span className="font-semibold text-xl text-slate-100">FinanceOS</span>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-slate-100 leading-none tracking-tight">
              Welcome Back
            </h1>
            <p className="text-slate-400 text-sm">
              Sign in to access your financial dashboard
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-8 space-y-6">
          {error && (
            <div className="bg-red-950/50 border border-red-800 text-red-300 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium text-slate-300">
              Username
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 h-11 bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-slate-300">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 h-11 bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in...
              </div>
            ) : (
              'Sign in'
            )}
          </Button>
        </form>

        {/* System status indicator - matching dashboard theme */}
        <div className="px-6 pb-6">
          <div className="text-xs text-slate-400 uppercase tracking-wider mb-2">System Status</div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Authentication Service</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-slate-400">Online</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Database Connection</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-xs text-slate-400">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}