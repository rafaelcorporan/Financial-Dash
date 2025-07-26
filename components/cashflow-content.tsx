"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  CreditCard,
  Calendar,
  Clock,
  Target,
  AlertTriangle,
  CheckCircle,
  Filter,
  Download,
  RefreshCw,
  Banknote,
  Receipt,
  Building2,
  Users,
} from "lucide-react"
import { useEffect, useRef } from "react"

export function CashFlowContent() {
  const cashFlowChartRef = useRef<HTMLCanvasElement>(null)
  const waterfallChartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Main Cash Flow Chart
    const canvas = cashFlowChartRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    const width = canvas.offsetWidth
    const height = canvas.offsetHeight

    ctx.clearRect(0, 0, width, height)

    // Sample cash flow data
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const cashInflow = [450, 520, 380, 620, 580, 720, 650, 750, 680, 800, 720, 850]
    const cashOutflow = [420, 480, 410, 590, 520, 680, 590, 710, 620, 740, 680, 780]
    const netCashFlow = cashInflow.map((inflow, i) => inflow - cashOutflow[i])

    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    const maxValue = Math.max(...cashInflow, ...cashOutflow)
    const minValue = Math.min(...netCashFlow)
    const range = maxValue - minValue

    // Draw grid lines
    ctx.strokeStyle = "#1e293b"
    ctx.lineWidth = 1
    for (let i = 0; i <= 6; i++) {
      const y = padding + (chartHeight / 6) * i
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()

      // Y-axis labels
      ctx.fillStyle = "#64748b"
      ctx.font = "12px Inter"
      ctx.textAlign = "right"
      const value = Math.round(maxValue - (range / 6) * i)
      ctx.fillText(`$${value}K`, padding - 10, y + 4)
    }

    // Draw month labels
    months.forEach((month, index) => {
      const x = padding + (chartWidth / (months.length - 1)) * index
      ctx.fillStyle = "#64748b"
      ctx.font = "10px Inter"
      ctx.textAlign = "center"
      ctx.fillText(month, x, height - 10)
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
        const y = height - padding - ((value - minValue) / range) * chartHeight

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
        const y = height - padding - ((value - minValue) / range) * chartHeight

        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    drawLine(cashInflow, "#3b82f6")
    drawLine(cashOutflow, "#f59e0b")
  }, [])

  return (
    <div className="flex-1 bg-slate-950 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Cash Flow Management</h1>
              <p className="text-slate-400 mt-1">Monitor and analyze your cash flow patterns and liquidity</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                <Calendar className="w-4 h-4 mr-2" />
                This Month
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Key Cash Flow Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Net Cash Flow</CardTitle>
              <Wallet className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$127K</div>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-sm text-green-400">+15.3%</span>
                <span className="text-sm text-slate-400 ml-1">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Cash Position</CardTitle>
              <Banknote className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$1.85M</div>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-sm text-green-400">+8.7%</span>
                <span className="text-sm text-slate-400 ml-1">current balance</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Burn Rate</CardTitle>
              <TrendingDown className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$45K</div>
              <div className="flex items-center mt-2">
                <ArrowDownRight className="w-4 h-4 text-orange-400 mr-1" />
                <span className="text-sm text-orange-400">per month</span>
                <span className="text-sm text-slate-400 ml-1">avg rate</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Runway</CardTitle>
              <Clock className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">41 months</div>
              <div className="flex items-center mt-2">
                <CheckCircle className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-sm text-green-400">Healthy</span>
                <span className="text-sm text-slate-400 ml-1">runway</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Cash Flow Chart */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Cash Flow Overview</CardTitle>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-slate-400">Cash Inflow</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-slate-400">Cash Outflow</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="w-full h-80">
              <canvas ref={cashFlowChartRef} className="w-full h-full" />
            </div>
          </CardContent>
        </Card>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Working Capital</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-300">Current Assets</span>
                <span className="text-sm text-green-400">$2.8M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-300">Current Liabilities</span>
                <span className="text-sm text-orange-400">$1.9M</span>
              </div>
              <div className="border-t border-slate-700 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-300">Working Capital</span>
                  <span className="text-sm text-blue-400 font-semibold">$0.9M</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Payment Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-slate-300">Due Today</span>
                </div>
                <span className="text-sm text-blue-400">$45K</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-slate-300">Due This Week</span>
                </div>
                <span className="text-sm text-yellow-400">$127K</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-slate-300">Due This Month</span>
                </div>
                <span className="text-sm text-green-400">$384K</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Cash Flow Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-300">Cash Conversion</span>
                  <span className="text-sm text-green-400">82%</span>
                </div>
                <Progress value={82} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-300">Collection Rate</span>
                  <span className="text-sm text-blue-400">76%</span>
                </div>
                <Progress value={76} className="h-2" />
              </div>
              <div className="pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-300">Overall Score</span>
                  <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                    Excellent
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 