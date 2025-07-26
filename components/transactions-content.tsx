"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CreditCard,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  Edit,
  MoreHorizontal,
  Building2,
  Users,
  ShoppingCart,
  Fuel,
  Coffee,
  Wifi,
  Zap,
  Shield,
} from "lucide-react"
import { useEffect, useRef } from "react"

export function TransactionsContent() {
  const transactionTrendsRef = useRef<HTMLCanvasElement>(null)
  const categoryBreakdownRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Transaction Trends Chart
    const canvas = transactionTrendsRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    const width = canvas.offsetWidth
    const height = canvas.offsetHeight

    ctx.clearRect(0, 0, width, height)

    const days = Array.from({length: 30}, (_, i) => i + 1)
    const income = [45, 52, 38, 62, 58, 72, 65, 75, 68, 80, 72, 85, 78, 92, 85, 88, 95, 102, 98, 105, 112, 108, 115, 122, 118, 125, 132, 128, 135, 142]
    const expenses = [42, 48, 41, 59, 52, 68, 59, 71, 62, 74, 68, 78, 72, 84, 78, 81, 88, 94, 91, 97, 104, 100, 107, 114, 110, 117, 124, 120, 127, 134]

    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    const maxValue = Math.max(...income, ...expenses)

    // Draw grid lines
    ctx.strokeStyle = "#1e293b"
    ctx.lineWidth = 1
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()

      // Y-axis labels
      ctx.fillStyle = "#64748b"
      ctx.font = "12px Inter"
      ctx.textAlign = "right"
      const value = Math.round(maxValue - (maxValue / 5) * i)
      ctx.fillText(`$${value}K`, padding - 10, y + 4)
    }

    // Draw day labels (every 5 days)
    days.forEach((day, index) => {
      if (index % 5 === 0) {
        const x = padding + (chartWidth / (days.length - 1)) * index
        ctx.fillStyle = "#64748b"
        ctx.font = "10px Inter"
        ctx.textAlign = "center"
        ctx.fillText(day.toString(), x, height - 10)
      }
    })

    // Draw lines
    const drawLine = (data: number[], color: string, lineWidth = 3) => {
      ctx.strokeStyle = color
      ctx.lineWidth = lineWidth
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      ctx.beginPath()
      data.forEach((value, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index
        const y = height - padding - (value / maxValue) * chartHeight

        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.stroke()

      // Draw points
      ctx.fillStyle = color
      data.forEach((value, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index
        const y = height - padding - (value / maxValue) * chartHeight

        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    drawLine(income, "#10b981")
    drawLine(expenses, "#ef4444")
  }, [])

  useEffect(() => {
    // Category Breakdown Chart
    const canvas = categoryBreakdownRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    const width = canvas.offsetWidth
    const height = canvas.offsetHeight
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 2 - 20

    ctx.clearRect(0, 0, width, height)

    const data = [
      { label: "Office Supplies", value: 30, color: "#3b82f6" },
      { label: "Travel", value: 25, color: "#10b981" },
      { label: "Marketing", value: 20, color: "#f59e0b" },
      { label: "Software", value: 15, color: "#8b5cf6" },
      { label: "Other", value: 10, color: "#ef4444" },
    ]

    let currentAngle = -Math.PI / 2

    data.forEach((item) => {
      const sliceAngle = (item.value / 100) * 2 * Math.PI

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
      ctx.closePath()
      ctx.fillStyle = item.color
      ctx.fill()

      // Add labels
      const labelAngle = currentAngle + sliceAngle / 2
      const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7)
      const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7)

      ctx.fillStyle = "white"
      ctx.font = "11px Inter"
      ctx.textAlign = "center"
      ctx.fillText(`${item.value}%`, labelX, labelY)

      currentAngle += sliceAngle
    })
  }, [])

  const recentTransactions = [
    {
      id: "TXN-001",
      date: "2024-12-28",
      description: "Office Supplies - Staples",
      category: "Office Supplies",
      amount: -342.50,
      status: "completed",
      type: "expense"
    },
    {
      id: "TXN-002",
      date: "2024-12-28",
      description: "Client Payment - ABC Corp",
      category: "Revenue",
      amount: 15750.00,
      status: "completed",
      type: "income"
    },
    {
      id: "TXN-003",
      date: "2024-12-27",
      description: "Software License - Adobe",
      category: "Software",
      amount: -299.99,
      status: "pending",
      type: "expense"
    },
    {
      id: "TXN-004",
      date: "2024-12-27",
      description: "Travel Expenses - Flight",
      category: "Travel",
      amount: -1250.00,
      status: "completed",
      type: "expense"
    },
    {
      id: "TXN-005",
      date: "2024-12-26",
      description: "Marketing Campaign - Google Ads",
      category: "Marketing",
      amount: -850.00,
      status: "completed",
      type: "expense"
    },
    {
      id: "TXN-006",
      date: "2024-12-26",
      description: "Consulting Revenue - XYZ Inc",
      category: "Revenue",
      amount: 8500.00,
      status: "completed",
      type: "income"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">Completed</Badge>
      case "pending":
        return <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pending</Badge>
      case "failed":
        return <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/30">Failed</Badge>
      default:
        return <Badge variant="outline" className="bg-gray-500/20 text-gray-400 border-gray-500/30">Unknown</Badge>
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "office supplies":
        return <Building2 className="w-4 h-4" />
      case "travel":
        return <ShoppingCart className="w-4 h-4" />
      case "marketing":
        return <TrendingUp className="w-4 h-4" />
      case "software":
        return <Wifi className="w-4 h-4" />
      case "revenue":
        return <DollarSign className="w-4 h-4" />
      default:
        return <CreditCard className="w-4 h-4" />
    }
  }

  return (
    <div className="flex-1 bg-slate-950 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Transaction Management</h1>
              <p className="text-slate-400 mt-1">Track, analyze, and manage all your financial transactions</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Transaction
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Transaction Overview Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Total Transactions</CardTitle>
              <CreditCard className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">2,847</div>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-sm text-green-400">+12.5%</span>
                <span className="text-sm text-slate-400 ml-1">this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Total Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$847K</div>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-sm text-green-400">+18.2%</span>
                <span className="text-sm text-slate-400 ml-1">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Total Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$623K</div>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="w-4 h-4 text-red-400 mr-1" />
                <span className="text-sm text-red-400">+8.7%</span>
                <span className="text-sm text-slate-400 ml-1">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Avg Transaction</CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$485</div>
              <div className="flex items-center mt-2">
                <ArrowDownRight className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-sm text-green-400">-3.2%</span>
                <span className="text-sm text-slate-400 ml-1">avg amount</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">All Transactions</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Transaction Trends */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Transaction Trends (30 Days)</CardTitle>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-slate-400">Income</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-slate-400">Expenses</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-64">
                    <canvas ref={transactionTrendsRef} className="w-full h-full" />
                  </div>
                </CardContent>
              </Card>

              {/* Category Breakdown */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Expense Categories</CardTitle>
                  <p className="text-slate-400 text-sm">Distribution of expenses by category</p>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-48 mb-4">
                    <canvas ref={categoryBreakdownRef} className="w-full h-full" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-slate-300">Office Supplies</span>
                      </div>
                      <span className="text-sm text-slate-400">30%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-slate-300">Travel</span>
                      </div>
                      <span className="text-sm text-slate-400">25%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-slate-300">Marketing</span>
                      </div>
                      <span className="text-sm text-slate-400">20%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm text-slate-300">Software</span>
                      </div>
                      <span className="text-sm text-slate-400">15%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-slate-300">Other</span>
                      </div>
                      <span className="text-sm text-slate-400">10%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Recent Transactions</CardTitle>
                  <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-700 hover:bg-slate-800/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${transaction.type === 'income' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                          {getCategoryIcon(transaction.category)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-200">{transaction.description}</span>
                            {getStatusBadge(transaction.status)}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-400 mt-1">
                            <span>{transaction.date}</span>
                            <span>•</span>
                            <span>{transaction.category}</span>
                            <span>•</span>
                            <span>{transaction.id}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`font-semibold ${transaction.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                        </span>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            {/* Filters and Search Bar */}
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                  <div className="flex flex-1 gap-3 w-full lg:w-auto">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search transactions..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700 px-4">
                      <Filter className="w-4 h-4 mr-2" />
                      All Categories
                    </Button>
                    <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700 px-4">
                      <Calendar className="w-4 h-4 mr-2" />
                      Date Range
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Transaction
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transaction Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">This Month</p>
                      <p className="text-white text-xl font-semibold">847</p>
                    </div>
                    <div className="bg-blue-500/20 p-2 rounded-lg">
                      <BarChart3 className="w-5 h-5 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Income</p>
                      <p className="text-green-400 text-xl font-semibold">$342K</p>
                    </div>
                    <div className="bg-green-500/20 p-2 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Expenses</p>
                      <p className="text-red-400 text-xl font-semibold">$287K</p>
                    </div>
                    <div className="bg-red-500/20 p-2 rounded-lg">
                      <TrendingDown className="w-5 h-5 text-red-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Pending</p>
                      <p className="text-yellow-400 text-xl font-semibold">23</p>
                    </div>
                    <div className="bg-yellow-500/20 p-2 rounded-lg">
                      <Clock className="w-5 h-5 text-yellow-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Transactions Table */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">All Transactions</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <span>2,847 total transactions</span>
                    <span>•</span>
                    <span>Showing 1-20</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-800">
                        <th className="text-left p-4 text-slate-400 font-medium">
                          <div className="flex items-center gap-2 cursor-pointer hover:text-slate-300">
                            Date
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </th>
                        <th className="text-left p-4 text-slate-400 font-medium">Transaction</th>
                        <th className="text-left p-4 text-slate-400 font-medium">Category</th>
                        <th className="text-left p-4 text-slate-400 font-medium">
                          <div className="flex items-center gap-2 cursor-pointer hover:text-slate-300">
                            Amount
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </th>
                        <th className="text-left p-4 text-slate-400 font-medium">Status</th>
                        <th className="text-left p-4 text-slate-400 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          id: "TXN-001",
                          date: "2024-12-28",
                          time: "14:32",
                          description: "Client Payment - ABC Corp",
                          reference: "Invoice #INV-2024-0845",
                          category: "Revenue",
                          amount: 15750.00,
                          status: "completed",
                          type: "income"
                        },
                        {
                          id: "TXN-002", 
                          date: "2024-12-28",
                          time: "11:15",
                          description: "Office Supplies - Staples",
                          reference: "Receipt #ST-5847293",
                          category: "Office Supplies",
                          amount: -342.50,
                          status: "completed",
                          type: "expense"
                        },
                        {
                          id: "TXN-003",
                          date: "2024-12-27",
                          time: "16:45",
                          description: "Software License - Adobe",
                          reference: "License #AD-2024-CC",
                          category: "Software",
                          amount: -299.99,
                          status: "pending",
                          type: "expense"
                        },
                        {
                          id: "TXN-004",
                          date: "2024-12-27",
                          time: "09:20",
                          description: "Travel Expenses - Flight",
                          reference: "Booking #UA-4528693",
                          category: "Travel",
                          amount: -1250.00,
                          status: "completed",
                          type: "expense"
                        },
                        {
                          id: "TXN-005",
                          date: "2024-12-26",
                          time: "13:30",
                          description: "Marketing Campaign - Google Ads",
                          reference: "Campaign #GA-Q4-2024",
                          category: "Marketing",
                          amount: -850.00,
                          status: "completed",
                          type: "expense"
                        },
                        {
                          id: "TXN-006",
                          date: "2024-12-26",
                          time: "10:15",
                          description: "Consulting Revenue - XYZ Inc",
                          reference: "Contract #CON-2024-012",
                          category: "Revenue",
                          amount: 8500.00,
                          status: "completed",
                          type: "income"
                        },
                        {
                          id: "TXN-007",
                          date: "2024-12-25",
                          time: "15:45",
                          description: "Utility Bill - Electric Company",
                          reference: "Account #EC-558479",
                          category: "Utilities",
                          amount: -275.80,
                          status: "completed",
                          type: "expense"
                        },
                        {
                          id: "TXN-008",
                          date: "2024-12-25",
                          time: "08:30",
                          description: "Freelance Payment - Design Work",
                          reference: "Project #DES-2024-047",
                          category: "Revenue",
                          amount: 2250.00,
                          status: "processing",
                          type: "income"
                        },
                        {
                          id: "TXN-009",
                          date: "2024-12-24",
                          time: "17:20",
                          description: "Equipment Purchase - Laptop",
                          reference: "Order #DELL-8574692",
                          category: "Equipment",
                          amount: -1899.99,
                          status: "completed",
                          type: "expense"
                        },
                        {
                          id: "TXN-010",
                          date: "2024-12-24",
                          time: "12:00",
                          description: "Insurance Premium - Business",
                          reference: "Policy #INS-2024-BIZ",
                          category: "Insurance",
                          amount: -450.00,
                          status: "completed",
                          type: "expense"
                        },
                        {
                          id: "TXN-011",
                          date: "2024-12-23",
                          time: "14:15",
                          description: "Product Sales - Online Store",
                          reference: "Order #OS-2024-3847",
                          category: "Revenue",
                          amount: 1825.50,
                          status: "completed",
                          type: "income"
                        },
                        {
                          id: "TXN-012",
                          date: "2024-12-23",
                          time: "09:45",
                          description: "Legal Fees - Attorney Consultation",
                          reference: "Invoice #LAW-2024-Q4",
                          category: "Legal",
                          amount: -675.00,
                          status: "completed",
                          type: "expense"
                        },
                        {
                          id: "TXN-013",
                          date: "2024-12-22",
                          time: "16:30",
                          description: "Rent Payment - Office Space",
                          reference: "Lease #OFF-2024-12",
                          category: "Rent",
                          amount: -3200.00,
                          status: "completed",
                          type: "expense"
                        },
                        {
                          id: "TXN-014",
                          date: "2024-12-22",
                          time: "11:20",
                          description: "Client Retainer - Development",
                          reference: "Contract #DEV-2024-RET",
                          category: "Revenue",
                          amount: 5000.00,
                          status: "completed",
                          type: "income"
                        },
                        {
                          id: "TXN-015",
                          date: "2024-12-21",
                          time: "13:50",
                          description: "Phone Bill - Business Line",
                          reference: "Account #VZ-558479123",
                          category: "Communications",
                          amount: -127.45,
                          status: "completed",
                          type: "expense"
                        }
                      ].map((transaction) => (
                        <tr key={transaction.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                          <td className="p-4">
                            <div>
                              <div className="text-slate-200 font-medium">{transaction.date}</div>
                              <div className="text-slate-400 text-sm">{transaction.time}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div>
                              <div className="text-slate-200 font-medium">{transaction.description}</div>
                              <div className="text-slate-400 text-sm">{transaction.reference}</div>
                              <div className="text-slate-500 text-xs">{transaction.id}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className={`p-1.5 rounded-lg ${transaction.type === 'income' ? 'bg-green-500/20' : 'bg-blue-500/20'}`}>
                                {getCategoryIcon(transaction.category)}
                              </div>
                              <span className="text-slate-300 text-sm">{transaction.category}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className={`font-semibold ${transaction.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                            </div>
                          </td>
                          <td className="p-4">
                            {getStatusBadge(transaction.status)}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                <div className="flex items-center justify-between p-4 border-t border-slate-800">
                  <div className="text-sm text-slate-400">
                    Showing 1 to 15 of 2,847 transactions
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                      Previous
                    </Button>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="bg-blue-600 text-white">1</Button>
                      <Button variant="ghost" size="sm" className="text-slate-400">2</Button>
                      <Button variant="ghost" size="sm" className="text-slate-400">3</Button>
                      <span className="text-slate-400 px-2">...</span>
                      <Button variant="ghost" size="sm" className="text-slate-400">190</Button>
                    </div>
                    <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            {/* Category Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total Categories</p>
                      <p className="text-white text-xl font-semibold">24</p>
                    </div>
                    <div className="bg-blue-500/20 p-2 rounded-lg">
                      <BarChart3 className="w-5 h-5 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Auto-Rules</p>
                      <p className="text-green-400 text-xl font-semibold">18</p>
                    </div>
                    <div className="bg-green-500/20 p-2 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Uncategorized</p>
                      <p className="text-yellow-400 text-xl font-semibold">47</p>
                    </div>
                    <div className="bg-yellow-500/20 p-2 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Match Rate</p>
                      <p className="text-purple-400 text-xl font-semibold">94.2%</p>
                    </div>
                    <div className="bg-purple-500/20 p-2 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-purple-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Category Management Actions */}
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex flex-1 gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search categories..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                      <Upload className="w-4 h-4 mr-2" />
                      Import Rules
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Category
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Categories List */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Category List</CardTitle>
                  <p className="text-slate-400 text-sm">Manage your transaction categories and rules</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    {
                      name: "Office Supplies",
                      icon: Building2,
                      color: "bg-blue-500",
                      transactions: 127,
                      rules: 3,
                      lastUsed: "2 hours ago",
                      autoMatch: true
                    },
                    {
                      name: "Travel",
                      icon: ShoppingCart,
                      color: "bg-green-500",
                      transactions: 89,
                      rules: 2,
                      lastUsed: "1 day ago",
                      autoMatch: true
                    },
                    {
                      name: "Marketing",
                      icon: TrendingUp,
                      color: "bg-purple-500",
                      transactions: 156,
                      rules: 4,
                      lastUsed: "3 hours ago",
                      autoMatch: true
                    },
                    {
                      name: "Software",
                      icon: Wifi,
                      color: "bg-yellow-500",
                      transactions: 93,
                      rules: 2,
                      lastUsed: "5 hours ago",
                      autoMatch: true
                    },
                    {
                      name: "Equipment",
                      icon: Building2,
                      color: "bg-orange-500",
                      transactions: 34,
                      rules: 1,
                      lastUsed: "1 week ago",
                      autoMatch: false
                    },
                    {
                      name: "Utilities",
                      icon: Zap,
                      color: "bg-red-500",
                      transactions: 67,
                      rules: 3,
                      lastUsed: "2 days ago",
                      autoMatch: true
                    },
                    {
                      name: "Legal",
                      icon: Shield,
                      color: "bg-indigo-500",
                      transactions: 12,
                      rules: 1,
                      lastUsed: "1 month ago",
                      autoMatch: false
                    },
                    {
                      name: "Insurance",
                      icon: Shield,
                      color: "bg-pink-500",
                      transactions: 28,
                      rules: 2,
                      lastUsed: "1 week ago",
                      autoMatch: true
                    }
                  ].map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-slate-700 hover:bg-slate-800/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${category.color}/20`}>
                          <category.icon className={`w-4 h-4 text-${category.color.split('-')[1]}-400`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-200 font-medium">{category.name}</span>
                            {category.autoMatch && (
                              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
                                Auto
                              </Badge>
                            )}
                          </div>
                          <div className="text-slate-400 text-sm">
                            {category.transactions} transactions • {category.rules} rules • {category.lastUsed}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Auto-Categorization Rules */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Auto-Categorization Rules</CardTitle>
                  <p className="text-slate-400 text-sm">Set up rules to automatically categorize transactions</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      {
                        name: "Office Supplies Rule",
                        condition: "Description contains 'Staples' OR 'Office Depot'",
                        category: "Office Supplies",
                        matches: 45,
                        active: true
                      },
                      {
                        name: "Travel Expenses",
                        condition: "Amount > $100 AND Description contains 'Flight'",
                        category: "Travel",
                        matches: 23,
                        active: true
                      },
                      {
                        name: "Software Subscriptions",
                        condition: "Description contains 'Adobe' OR 'Microsoft'",
                        category: "Software",
                        matches: 12,
                        active: true
                      },
                      {
                        name: "Marketing Campaigns",
                        condition: "Description contains 'Google Ads' OR 'Facebook'",
                        category: "Marketing",
                        matches: 38,
                        active: false
                      }
                    ].map((rule, index) => (
                      <div key={index} className="p-3 rounded-lg border border-slate-700 bg-slate-800/30">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-slate-200 font-medium">{rule.name}</span>
                              <Badge variant="outline" className={`text-xs ${rule.active ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                                {rule.active ? 'Active' : 'Inactive'}
                              </Badge>
                            </div>
                            <div className="text-slate-400 text-sm mb-1">
                              → {rule.category}
                            </div>
                            <div className="text-slate-500 text-xs">
                              {rule.condition}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <span className="text-xs text-slate-400">{rule.matches} matches</span>
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full bg-slate-800 border-slate-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Rule
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Category Analytics */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Category Analytics</CardTitle>
                <p className="text-slate-400 text-sm">Analyze category usage and performance</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Top Categories by Transaction Count */}
                  <div>
                    <h4 className="text-slate-300 font-medium mb-3">Top Categories by Volume</h4>
                    <div className="space-y-3">
                      {[
                        { name: "Marketing", count: 156, percentage: 100, color: "bg-purple-500" },
                        { name: "Office Supplies", count: 127, percentage: 81, color: "bg-blue-500" },
                        { name: "Software", count: 93, percentage: 60, color: "bg-yellow-500" },
                        { name: "Travel", count: 89, percentage: 57, color: "bg-green-500" },
                        { name: "Utilities", count: 67, percentage: 43, color: "bg-red-500" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                            <span className="text-slate-300 text-sm">{item.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-20 bg-slate-800 rounded-full h-2">
                              <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.percentage}%` }}></div>
                            </div>
                            <span className="text-slate-400 text-sm w-8 text-right">{item.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category Distribution by Amount */}
                  <div>
                    <h4 className="text-slate-300 font-medium mb-3">Top Categories by Amount</h4>
                    <div className="space-y-3">
                      {[
                        { name: "Travel", amount: "$45.2K", percentage: 100, color: "bg-green-500" },
                        { name: "Marketing", amount: "$38.7K", percentage: 86, color: "bg-purple-500" },
                        { name: "Software", amount: "$28.1K", percentage: 62, color: "bg-yellow-500" },
                        { name: "Equipment", amount: "$22.8K", percentage: 50, color: "bg-orange-500" },
                        { name: "Office Supplies", amount: "$15.4K", percentage: 34, color: "bg-blue-500" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                            <span className="text-slate-300 text-sm">{item.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-20 bg-slate-800 rounded-full h-2">
                              <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.percentage}%` }}></div>
                            </div>
                            <span className="text-slate-400 text-sm w-12 text-right">{item.amount}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-slate-300 font-medium">Categorization Health</h4>
                    <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                      Excellent
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Auto-match rate:</span>
                      <span className="text-green-400 ml-2 font-medium">94.2%</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Manual review needed:</span>
                      <span className="text-yellow-400 ml-2 font-medium">47 transactions</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Accuracy score:</span>
                      <span className="text-blue-400 ml-2 font-medium">98.7%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Analytics Overview Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Avg Transaction</p>
                      <p className="text-white text-xl font-semibold">$485</p>
                      <p className="text-green-400 text-xs">+12.3% vs last month</p>
                    </div>
                    <div className="bg-blue-500/20 p-2 rounded-lg">
                      <BarChart3 className="w-5 h-5 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Transaction Velocity</p>
                      <p className="text-white text-xl font-semibold">23.4</p>
                      <p className="text-green-400 text-xs">per day</p>
                    </div>
                    <div className="bg-green-500/20 p-2 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Peak Volume Hour</p>
                      <p className="text-white text-xl font-semibold">2:00 PM</p>
                      <p className="text-blue-400 text-xs">147 transactions</p>
                    </div>
                    <div className="bg-purple-500/20 p-2 rounded-lg">
                      <Clock className="w-5 h-5 text-purple-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Success Rate</p>
                      <p className="text-white text-xl font-semibold">98.7%</p>
                      <p className="text-red-400 text-xs">23 failed</p>
                    </div>
                    <div className="bg-green-500/20 p-2 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Advanced Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Transaction Volume Heatmap */}
              <Card className="bg-slate-900 border-slate-800 h-96 flex flex-col overflow-hidden">
                <CardHeader className="pb-3 flex-shrink-0">
                  <CardTitle className="text-white text-lg">Transaction Volume Heatmap</CardTitle>
                  <p className="text-slate-400 text-sm">Hourly transaction patterns over the week</p>
                </CardHeader>
                <CardContent className="pt-2 flex-1 overflow-auto">
                  <div className="grid grid-cols-24 gap-1 mb-4">
                    {Array.from({length: 7}, (_, day) => 
                      Array.from({length: 24}, (_, hour) => {
                        const intensity = Math.random() * 100;
                        const getColor = (val: number) => {
                          if (val < 20) return 'bg-slate-800';
                          if (val < 40) return 'bg-blue-900/50';
                          if (val < 60) return 'bg-blue-700/70';
                          if (val < 80) return 'bg-blue-500/80';
                          return 'bg-blue-400';
                        };
                        return (
                          <div 
                            key={`${day}-${hour}`}
                            className={`w-2 h-2 rounded-sm ${getColor(intensity)}`}
                            title={`${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][day]} ${hour}:00 - ${Math.round(intensity)}% activity`}
                          />
                        );
                      })
                    ).flat()}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span>12 AM</span>
                    <span>6 AM</span>
                    <span>12 PM</span>
                    <span>6 PM</span>
                    <span>11 PM</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-slate-800 rounded-sm"></div>
                      <span>Low</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-700/70 rounded-sm"></div>
                      <span>Medium</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-sm"></div>
                      <span>High</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cash Flow Analysis */}
              <Card className="bg-slate-900 border-slate-800 h-96 flex flex-col overflow-hidden">
                <CardHeader className="pb-3 flex-shrink-0">
                  <CardTitle className="text-white text-lg">Cash Flow Analysis</CardTitle>
                  <p className="text-slate-400 text-sm">Weekly cash flow patterns and predictions</p>
                </CardHeader>
                <CardContent className="pt-2 flex-1 overflow-auto">
                  <div className="space-y-3">
                    {[
                      { week: 'Week 1', inflow: 85, outflow: 72, net: 13, trend: 'up' },
                      { week: 'Week 2', inflow: 92, outflow: 78, net: 14, trend: 'up' },
                      { week: 'Week 3', inflow: 78, outflow: 85, net: -7, trend: 'down' },
                      { week: 'Week 4', inflow: 96, outflow: 82, net: 14, trend: 'up' },
                      { week: 'This Week', inflow: 67, outflow: 58, net: 9, trend: 'up' },
                    ].map((item, index) => (
                     <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                       <div className="flex items-center gap-3">
                         <div className={`w-2 h-8 rounded ${item.trend === 'up' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                         <div>
                           <span className="text-slate-200 font-medium">{item.week}</span>
                           <div className="text-slate-400 text-sm">Net: {item.net > 0 ? '+' : ''}${item.net}K</div>
                         </div>
                       </div>
                       <div className="flex items-center gap-4 text-sm">
                         <div className="text-center">
                           <div className="text-green-400">${item.inflow}K</div>
                           <div className="text-slate-500">In</div>
                         </div>
                         <div className="text-center">
                           <div className="text-red-400">${item.outflow}K</div>
                           <div className="text-slate-500">Out</div>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
                </CardContent>
              </Card>
            </div>

            {/* Transaction Patterns & Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Spending Patterns */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Spending Patterns</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      { pattern: 'Recurring Monthly', amount: '$3,247', count: 12, color: 'bg-blue-500' },
                      { pattern: 'Large Purchases', amount: '$8,950', count: 3, color: 'bg-purple-500' },
                      { pattern: 'Daily Operational', amount: '$1,245', count: 89, color: 'bg-green-500' },
                      { pattern: 'Seasonal Spikes', amount: '$2,180', count: 5, color: 'bg-orange-500' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                          <div>
                            <div className="text-slate-300 text-sm font-medium">{item.pattern}</div>
                            <div className="text-slate-500 text-xs">{item.count} transactions</div>
                          </div>
                        </div>
                        <div className="text-slate-200 font-medium">{item.amount}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Risk Analysis */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Risk Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      { risk: 'High Value Transactions', level: 'Medium', count: 23, color: 'bg-yellow-500' },
                      { risk: 'Unusual Pattern', level: 'Low', count: 5, color: 'bg-green-500' },
                      { risk: 'Failed Transactions', level: 'High', count: 12, color: 'bg-red-500' },
                      { risk: 'Duplicate Entries', level: 'Low', count: 2, color: 'bg-blue-500' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                          <div>
                            <div className="text-slate-300 text-sm font-medium">{item.risk}</div>
                            <div className="text-slate-500 text-xs">{item.count} occurrences</div>
                          </div>
                        </div>
                        <Badge variant="outline" className={`text-xs ${
                          item.level === 'High' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                          item.level === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                          'bg-green-500/10 text-green-400 border-green-500/20'
                        }`}>
                          {item.level}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Predictive Insights */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Predictive Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      { insight: 'Next Month Revenue', prediction: '$847K', confidence: 92, trend: 'up' },
                      { insight: 'Expense Forecast', prediction: '$623K', confidence: 89, trend: 'stable' },
                      { insight: 'Cash Flow Peak', prediction: 'Week 3', confidence: 87, trend: 'up' },
                      { insight: 'Budget Variance', prediction: '+2.3%', confidence: 94, trend: 'stable' },
                    ].map((item, index) => (
                      <div key={index} className="p-3 rounded-lg bg-slate-800/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-300 text-sm font-medium">{item.insight}</span>
                          <div className="flex items-center gap-1">
                            {item.trend === 'up' && <ArrowUpRight className="w-3 h-3 text-green-400" />}
                            {item.trend === 'down' && <ArrowDownRight className="w-3 h-3 text-red-400" />}
                            {item.trend === 'stable' && <div className="w-3 h-0.5 bg-blue-400"></div>}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white font-semibold">{item.prediction}</span>
                          <span className="text-slate-400 text-xs">{item.confidence}% confidence</span>
                        </div>
                        <div className="mt-2">
                          <div className="w-full bg-slate-700 rounded-full h-1">
                            <div className="bg-blue-500 h-1 rounded-full" style={{ width: `${item.confidence}%` }}></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Comparative Analysis */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Comparative Analysis</CardTitle>
                <p className="text-slate-400 text-sm">Performance comparison across different time periods</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* This Month vs Last Month */}
                  <div className="space-y-3">
                    <h4 className="text-slate-300 font-medium">This vs Last Month</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Transactions</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white">847</span>
                          <span className="text-green-400 text-xs">+12.5%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Volume</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white">$1.2M</span>
                          <span className="text-green-400 text-xs">+8.7%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Avg Amount</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white">$485</span>
                          <span className="text-red-400 text-xs">-3.2%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quarter Comparison */}
                  <div className="space-y-3">
                    <h4 className="text-slate-300 font-medium">This vs Last Quarter</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Revenue</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white">$3.8M</span>
                          <span className="text-green-400 text-xs">+18.4%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Expenses</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white">$2.9M</span>
                          <span className="text-green-400 text-xs">+14.2%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Net Flow</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white">$0.9M</span>
                          <span className="text-green-400 text-xs">+28.6%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Year over Year */}
                  <div className="space-y-3">
                    <h4 className="text-slate-300 font-medium">Year over Year</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Growth Rate</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white">24.8%</span>
                          <span className="text-green-400 text-xs">Excellent</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Market Share</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white">12.4%</span>
                          <span className="text-green-400 text-xs">+2.1%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Efficiency</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white">92.5%</span>
                          <span className="text-green-400 text-xs">+5.3%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Industry Benchmark */}
                  <div className="space-y-3">
                    <h4 className="text-slate-300 font-medium">Industry Benchmark</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Success Rate</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white">98.7%</span>
                          <span className="text-green-400 text-xs">Above avg</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Processing Time</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white">2.3s</span>
                          <span className="text-green-400 text-xs">15% faster</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Cost Efficiency</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white">$0.12</span>
                          <span className="text-green-400 text-xs">22% lower</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Summary Banner */}
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Overall Performance Score</h4>
                      <p className="text-slate-400 text-sm">Based on transaction velocity, success rate, and growth metrics</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-400">92.5</div>
                      <div className="text-green-400 text-sm">Excellent Performance</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 