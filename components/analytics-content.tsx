"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Clock,
  Database,
  Filter,
  Info,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function AnalyticsContent() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const pieChartRef = useRef<HTMLCanvasElement>(null)
  const trendChartRef = useRef<HTMLCanvasElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  // State for chart interactions
  const [hoveredDataPoint, setHoveredDataPoint] = useState<{
    index: number;
    x: number;
    y: number;
    data: { month: string; revenue: number; profit: number; expenses: number };
  } | null>(null)

  // Enhanced financial data with more realistic figures
  const financialData = [
    { month: "Jan", revenue: 185, profit: 42, expenses: 143, growth: 8.2 },
    { month: "Feb", revenue: 198, profit: 48, expenses: 150, growth: 7.0 },
    { month: "Mar", revenue: 235, profit: 65, expenses: 170, growth: 18.7 },
    { month: "Apr", revenue: 276, profit: 78, expenses: 198, growth: 17.4 },
    { month: "May", revenue: 312, profit: 94, expenses: 218, growth: 13.0 },
    { month: "Jun", revenue: 358, profit: 118, expenses: 240, growth: 14.7 },
    { month: "Jul", revenue: 421, profit: 142, expenses: 279, growth: 17.6 },
    { month: "Aug", revenue: 465, profit: 165, expenses: 300, growth: 10.4 },
    { month: "Sep", revenue: 498, profit: 184, expenses: 314, growth: 7.1 },
    { month: "Oct", revenue: 547, profit: 212, expenses: 335, growth: 9.8 },
    { month: "Nov", revenue: 589, profit: 238, expenses: 351, growth: 7.7 },
    { month: "Dec", revenue: 642, profit: 271, expenses: 371, growth: 9.0 }
  ]

  useEffect(() => {
    // Enhanced Main Analytics Chart with interactions
    const canvas = chartRef.current
    const tooltip = tooltipRef.current
    if (!canvas || !tooltip) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const devicePixelRatio = window.devicePixelRatio || 1
    canvas.width = rect.width * devicePixelRatio
    canvas.height = rect.height * devicePixelRatio
    ctx.scale(devicePixelRatio, devicePixelRatio)

    const width = rect.width
    const height = rect.height

    let animationId: number | null = null

    function drawChart() {
      if (!ctx) return
      
      ctx.clearRect(0, 0, width, height)

      const months = financialData.map(d => d.month)
      const revenue = financialData.map(d => d.revenue)
      const profit = financialData.map(d => d.profit)
      const expenses = financialData.map(d => d.expenses)

      const padding = 50
      const chartWidth = width - padding * 2
      const chartHeight = height - padding * 2

      const maxValue = Math.max(...revenue) * 1.1 // Add 10% padding

      // Draw background grid
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
        ctx.font = "11px Inter, sans-serif"
        ctx.textAlign = "right"
        const value = Math.round(maxValue - (maxValue / 6) * i)
        ctx.fillText(`$${value}K`, padding - 10, y + 4)
      }

      // Draw month labels
      months.forEach((month, index) => {
        const x = padding + (chartWidth / (months.length - 1)) * index
        ctx.fillStyle = "#64748b"
        ctx.font = "10px Inter, sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(month, x, height - 15)
      })

      // Enhanced line drawing function
      const drawLine = (data: number[], color: string, lineWidth = 3, filled = false, dashed = false) => {
        if (filled) {
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
          ctx.lineTo(width - padding, height - padding)
          ctx.lineTo(padding, height - padding)
          
          const gradient = ctx.createLinearGradient(0, 0, 0, height)
          gradient.addColorStop(0, color + "30")
          gradient.addColorStop(1, color + "05")
          ctx.fillStyle = gradient
          ctx.fill()
        }

        ctx.strokeStyle = color
        ctx.lineWidth = lineWidth
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        
        if (dashed) {
          ctx.setLineDash([5, 5])
        } else {
          ctx.setLineDash([])
        }

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

        // Draw enhanced data points
        ctx.fillStyle = color
        ctx.setLineDash([])
        data.forEach((value, index) => {
          const x = padding + (chartWidth / (data.length - 1)) * index
          const y = height - padding - (value / maxValue) * chartHeight

          const isHovered = hoveredDataPoint?.index === index
          const radius = isHovered ? 6 : 4

          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fill()

          if (isHovered) {
            ctx.strokeStyle = "#ffffff"
            ctx.lineWidth = 2
            ctx.stroke()
          }
        })
      }

      // Draw the lines with enhancements
      drawLine(revenue, "#3b82f6", 3, true) // Revenue with area fill
      drawLine(profit, "#10b981", 3) // Profit
      drawLine(expenses, "#ef4444", 2, false, true) // Expenses with dashed line
    }

    // Mouse interaction for tooltips
    function handleMouseMove(event: MouseEvent) {
      if (!canvas || !tooltip) return

      const canvasRect = canvas.getBoundingClientRect()
      const mouseX = event.clientX - canvasRect.left
      const mouseY = event.clientY - canvasRect.top

      const padding = 50
      const chartWidth = canvasRect.width - padding * 2
      
      let closestIndex = -1
      let minDistance = Infinity

      // Find closest data point
      financialData.forEach((_, index) => {
        const x = padding + (chartWidth / (financialData.length - 1)) * index
        const distance = Math.abs(mouseX - x)
        
        if (distance < minDistance && distance < 20) {
          minDistance = distance
          closestIndex = index
        }
      })

      if (closestIndex !== -1) {
        const dataPoint = financialData[closestIndex]
        setHoveredDataPoint({
          index: closestIndex,
          x: event.clientX,
          y: event.clientY,
          data: dataPoint
        })

        tooltip.style.display = 'block'
        tooltip.style.left = `${event.clientX + 10}px`
        tooltip.style.top = `${event.clientY - 10}px`
        
        tooltip.innerHTML = `
          <div class="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-xl">
            <div class="text-white font-medium text-sm mb-2">${dataPoint.month} 2024</div>
            <div class="space-y-1 text-xs">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span class="text-slate-300">Revenue:</span>
                </div>
                <span class="text-blue-400 font-medium">$${dataPoint.revenue}K</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span class="text-slate-300">Profit:</span>
                </div>
                <span class="text-green-400 font-medium">$${dataPoint.profit}K</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span class="text-slate-300">Expenses:</span>
                </div>
                <span class="text-red-400 font-medium">$${dataPoint.expenses}K</span>
              </div>
              <div class="border-t border-slate-600 pt-1 mt-2">
                <div class="flex items-center justify-between">
                  <span class="text-slate-400">Growth:</span>
                  <span class="text-${dataPoint.growth > 0 ? 'green' : 'red'}-400 font-medium">
                    ${dataPoint.growth > 0 ? '+' : ''}${dataPoint.growth}%
                  </span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-slate-400">Margin:</span>
                  <span class="text-purple-400 font-medium">
                    ${((dataPoint.profit / dataPoint.revenue) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        `
      } else {
        setHoveredDataPoint(null)
        tooltip.style.display = 'none'
      }

      drawChart()
    }

    function handleMouseLeave() {
      setHoveredDataPoint(null)
      if (tooltip) {
        tooltip.style.display = 'none'
      }
      drawChart()
    }

    // Add event listeners
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    // Initial draw
    drawChart()

    // Cleanup
    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [hoveredDataPoint])

  useEffect(() => {
    // Pie Chart
    const canvas = pieChartRef.current
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
      { label: "Revenue", value: 45, color: "#3b82f6" },
      { label: "Expenses", value: 30, color: "#ef4444" },
      { label: "Profit", value: 15, color: "#10b981" },
      { label: "Investment", value: 10, color: "#f59e0b" },
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
      ctx.font = "12px Inter"
      ctx.textAlign = "center"
      ctx.fillText(`${item.value}%`, labelX, labelY)

      currentAngle += sliceAngle
    })
  }, [])

  useEffect(() => {
    // Trend Chart
    const canvas = trendChartRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    const width = canvas.offsetWidth
    const height = canvas.offsetHeight

    ctx.clearRect(0, 0, width, height)

    const data = [65, 72, 68, 75, 82, 78, 85, 90, 87, 92, 95, 98]
    const padding = 20
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, "#10b981")
    gradient.addColorStop(1, "#059669")

    ctx.strokeStyle = gradient
    ctx.lineWidth = 3
    ctx.lineCap = "round"
    ctx.lineJoin = "round"

    ctx.beginPath()
    data.forEach((value, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index
      const y = height - padding - ((value - 60) / 40) * chartHeight

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    // Fill area
    ctx.beginPath()
    data.forEach((value, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index
      const y = height - padding - ((value - 60) / 40) * chartHeight

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.lineTo(width - padding, height - padding)
    ctx.lineTo(padding, height - padding)
    ctx.fillStyle = gradient + "20"
    ctx.fill()
  }, [])

  return (
    <div className="flex-1 bg-slate-950 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
              <p className="text-slate-400 mt-1">Advanced financial insights and performance metrics</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                <Calendar className="w-4 h-4 mr-2" />
                Last 30 days
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$4.2M</div>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-sm text-green-400">+18.2%</span>
                <span className="text-sm text-slate-400 ml-1">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Profit Margin</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">24.8%</div>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-sm text-green-400">+2.4%</span>
                <span className="text-sm text-slate-400 ml-1">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Customer Growth</CardTitle>
              <Users className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">+1,247</div>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-sm text-green-400">+12.5%</span>
                <span className="text-sm text-slate-400 ml-1">new customers</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Efficiency Score</CardTitle>
              <Zap className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">92.5%</div>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-sm text-green-400">+5.2%</span>
                <span className="text-sm text-slate-400 ml-1">operational</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="segments">Segments</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Enhanced Main Chart */}
              <div className="lg:col-span-2">
                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-white flex items-center gap-2">
                          Revenue & Profit Analysis
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">
                            YTD 2024
                          </Badge>
                        </CardTitle>
                        <p className="text-slate-400 text-sm mt-1">Interactive 12-month financial performance overview</p>
                      </div>
                      <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-600">
                        <Info className="w-4 h-4 mr-1" />
                        Details
                      </Button>
                    </div>
                    <div className="flex items-center gap-6 text-sm mt-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-slate-400">Revenue</span>
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs ml-1">
                          Area Fill
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-slate-400">Profit</span>
                        <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-xs ml-1">
                          Solid Line
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full border border-red-500" style={{borderStyle: 'dashed'}}></div>
                        <span className="text-slate-400">Expenses</span>
                        <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20 text-xs ml-1">
                          Dashed
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <div className="w-full h-80 mb-4">
                        <canvas ref={chartRef} className="w-full h-full" />
                      </div>
                      
                      {/* Enhanced metrics below chart */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-400 text-sm">Total Revenue</span>
                            <TrendingUp className="w-4 h-4 text-green-400" />
                          </div>
                          <div className="text-lg font-bold text-white">
                            ${financialData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}K
                          </div>
                          <div className="text-xs text-green-400 mt-1">
                            +{((financialData[financialData.length - 1].revenue / financialData[0].revenue - 1) * 100).toFixed(1)}% YoY
                          </div>
                        </div>
                        
                        <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-400 text-sm">Total Profit</span>
                            <DollarSign className="w-4 h-4 text-blue-400" />
                          </div>
                          <div className="text-lg font-bold text-white">
                            ${financialData.reduce((sum, item) => sum + item.profit, 0).toLocaleString()}K
                          </div>
                          <div className="text-xs text-blue-400 mt-1">
                            {((financialData.reduce((sum, item) => sum + item.profit, 0) / financialData.reduce((sum, item) => sum + item.revenue, 0)) * 100).toFixed(1)}% margin
                          </div>
                        </div>
                        
                        <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-400 text-sm">Avg Growth</span>
                            <BarChart3 className="w-4 h-4 text-purple-400" />
                          </div>
                          <div className="text-lg font-bold text-white">
                            {(financialData.reduce((sum, item) => sum + item.growth, 0) / financialData.length).toFixed(1)}%
                          </div>
                          <div className="text-xs text-purple-400 mt-1">
                            Monthly average
                          </div>
                        </div>
                      </div>
                      
                      {/* Interactive tooltip */}
                      <div 
                        ref={tooltipRef}
                        className="absolute pointer-events-none z-50"
                        style={{ display: 'none' }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Distribution Chart */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Revenue Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-48 mb-4">
                    <canvas ref={pieChartRef} className="w-full h-full" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-slate-300">Revenue</span>
                      </div>
                      <span className="text-sm text-slate-400">45%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-slate-300">Expenses</span>
                      </div>
                      <span className="text-sm text-slate-400">30%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-slate-300">Profit</span>
                      </div>
                      <span className="text-sm text-slate-400">15%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-slate-300">Investment</span>
                      </div>
                      <span className="text-sm text-slate-400">10%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Analytics Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Performance Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-32 mb-4">
                    <canvas ref={trendChartRef} className="w-full h-full" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Overall Score</span>
                      <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                        Excellent
                      </Badge>
                    </div>
                    <Progress value={92} className="h-2" />
                    <p className="text-xs text-slate-400">92% performance rating</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Key Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">ROI</span>
                    <span className="text-sm text-green-400">+28.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">EBITDA</span>
                    <span className="text-sm text-blue-400">$1.2M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">Cash Flow</span>
                    <span className="text-sm text-purple-400">$890K</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">Burn Rate</span>
                    <span className="text-sm text-orange-400">$45K/mo</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">Runway</span>
                    <span className="text-sm text-cyan-400">18 months</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-300">Revenue target achieved</p>
                      <p className="text-xs text-slate-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-300">New analytics report</p>
                      <p className="text-xs text-slate-500">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-300">Data sync completed</p>
                      <p className="text-xs text-slate-500">6 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-300">Performance alert</p>
                      <p className="text-xs text-slate-500">8 hours ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            {/* Trends Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Revenue Trend</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">+18.4%</div>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-sm text-green-400">Upward trend</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">12-month growth rate</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Customer Acquisition</CardTitle>
                  <Users className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">+24.7%</div>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-sm text-green-400">Strong growth</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Monthly acquisition rate</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Market Share</CardTitle>
                  <Target className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">32.8%</div>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-sm text-green-400">+3.2% QoQ</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Industry position</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Efficiency Score</CardTitle>
                  <Activity className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">94.2%</div>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-sm text-green-400">+5.8% improved</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Operational efficiency</p>
                </CardContent>
              </Card>
            </div>

            {/* Trend Analysis Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Growth Trends Analysis</CardTitle>
                  <p className="text-slate-400 text-sm">Quarterly performance trends over 24 months</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { period: "Q4 2023", revenue: 185, growth: 8.2, trend: "up", color: "text-green-400" },
                    { period: "Q1 2024", revenue: 245, growth: 32.4, trend: "up", color: "text-green-400" },
                    { period: "Q2 2024", revenue: 312, growth: 27.3, trend: "up", color: "text-green-400" },
                    { period: "Q3 2024", revenue: 428, growth: 37.2, trend: "up", color: "text-green-400" },
                    { period: "Q4 2024", revenue: 589, growth: 37.6, trend: "up", color: "text-green-400" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 border border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className="w-12 text-slate-300 text-sm font-medium">{item.period}</div>
                        <div className="text-white font-semibold">${item.revenue}K</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`${item.color} text-sm font-medium`}>+{item.growth}%</div>
                        <TrendingUp className={`w-4 h-4 ${item.color.replace('text-', 'text-')}`} />
                        <Progress value={item.growth} className="w-20 h-2 bg-slate-800" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Trend Patterns</CardTitle>
                  <p className="text-slate-400 text-sm">Key patterns and seasonal insights</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      <div className="flex-1">
                        <h4 className="text-green-400 font-medium text-sm">Strong Q4 Performance</h4>
                        <p className="text-slate-300 text-xs">Revenue surge of 37.6% in Q4 driven by holiday season</p>
                      </div>
                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
                        Seasonal
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <Users className="w-5 h-5 text-blue-400" />
                      <div className="flex-1">
                        <h4 className="text-blue-400 font-medium text-sm">Customer Growth Acceleration</h4>
                        <p className="text-slate-300 text-xs">Monthly acquisition rate increased by 24.7% YoY</p>
                      </div>
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">
                        Growth
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <Target className="w-5 h-5 text-purple-400" />
                      <div className="flex-1">
                        <h4 className="text-purple-400 font-medium text-sm">Market Expansion</h4>
                        <p className="text-slate-300 text-xs">Market share increased from 29.6% to 32.8%</p>
                      </div>
                      <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-xs">
                        Expansion
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                      <Activity className="w-5 h-5 text-yellow-400" />
                      <div className="flex-1">
                        <h4 className="text-yellow-400 font-medium text-sm">Operational Efficiency</h4>
                        <p className="text-slate-300 text-xs">5.8% improvement in operational efficiency metrics</p>
                      </div>
                      <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 text-xs">
                        Efficiency
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Trend Forecasting */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Trend Forecasting</CardTitle>
                <p className="text-slate-400 text-sm">Projected trends for next 6 months based on current patterns</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h4 className="text-slate-300 font-medium">Revenue Projection</h4>
                    <div className="space-y-2">
                      {[
                        { month: "Jan 2025", value: "$685K", confidence: 92, change: "+15.0%" },
                        { month: "Feb 2025", value: "$742K", confidence: 89, change: "+18.2%" },
                        { month: "Mar 2025", value: "$798K", confidence: 85, change: "+21.4%" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">{item.month}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{item.value}</span>
                            <span className="text-green-400 text-xs">{item.change}</span>
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">
                              {item.confidence}%
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-slate-300 font-medium">Customer Growth</h4>
                    <div className="space-y-2">
                      {[
                        { month: "Jan 2025", value: "+1,450", confidence: 88, change: "+28.5%" },
                        { month: "Feb 2025", value: "+1,620", confidence: 85, change: "+32.1%" },
                        { month: "Mar 2025", value: "+1,785", confidence: 82, change: "+35.8%" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">{item.month}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{item.value}</span>
                            <span className="text-green-400 text-xs">{item.change}</span>
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">
                              {item.confidence}%
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-slate-300 font-medium">Market Share</h4>
                    <div className="space-y-2">
                      {[
                        { month: "Jan 2025", value: "34.2%", confidence: 79, change: "+1.4%" },
                        { month: "Feb 2025", value: "35.8%", confidence: 76, change: "+3.0%" },
                        { month: "Mar 2025", value: "37.1%", confidence: 73, change: "+4.3%" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">{item.month}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{item.value}</span>
                            <span className="text-green-400 text-xs">{item.change}</span>
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">
                              {item.confidence}%
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="segments" className="space-y-6">
            {/* Segment Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Total Segments</CardTitle>
                  <PieChart className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">8</div>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-sm text-green-400">+2 new segments</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Active market segments</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Top Segment</CardTitle>
                  <Target className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">Enterprise</div>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-sm text-green-400">42.3% revenue</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Highest contributing segment</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Fastest Growing</CardTitle>
                  <TrendingUp className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">SMB</div>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-sm text-green-400">+67.8% growth</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">YoY growth rate</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Segment Diversity</CardTitle>
                  <Activity className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">87.4%</div>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-sm text-green-400">Well diversified</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Portfolio balance score</p>
                </CardContent>
              </Card>
            </div>

            {/* Customer Segments Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Customer Segments</CardTitle>
                  <p className="text-slate-400 text-sm">Revenue breakdown by customer type</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { segment: "Enterprise", revenue: 1840, customers: 45, growth: 23.4, color: "bg-blue-500", share: 42.3 },
                    { segment: "Mid-Market", revenue: 1280, customers: 128, growth: 18.7, color: "bg-green-500", share: 29.4 },
                    { segment: "Small Business", revenue: 890, customers: 340, growth: 67.8, color: "bg-purple-500", share: 20.5 },
                    { segment: "Startup", revenue: 340, customers: 125, growth: 45.2, color: "bg-yellow-500", share: 7.8 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 border border-slate-700">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <div>
                          <h4 className="text-slate-200 font-medium">{item.segment}</h4>
                          <p className="text-slate-400 text-sm">{item.customers} customers</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">${item.revenue}K</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-green-400 text-sm">+{item.growth}%</span>
                          <Badge variant="outline" className="bg-slate-700 text-slate-300 border-slate-600 text-xs">
                            {item.share}%
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Geographic Segments</CardTitle>
                  <p className="text-slate-400 text-sm">Regional performance analysis</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { region: "North America", revenue: 2140, growth: 28.4, customers: 425, color: "bg-blue-500", share: 49.2 },
                    { region: "Europe", revenue: 1320, growth: 22.1, customers: 310, color: "bg-green-500", share: 30.3 },
                    { region: "Asia Pacific", revenue: 680, growth: 45.7, customers: 185, color: "bg-purple-500", share: 15.6 },
                    { region: "Latin America", revenue: 210, growth: 67.3, customers: 95, color: "bg-yellow-500", share: 4.9 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 border border-slate-700">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <div>
                          <h4 className="text-slate-200 font-medium">{item.region}</h4>
                          <p className="text-slate-400 text-sm">{item.customers} customers</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">${item.revenue}K</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-green-400 text-sm">+{item.growth}%</span>
                          <Badge variant="outline" className="bg-slate-700 text-slate-300 border-slate-600 text-xs">
                            {item.share}%
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Product & Industry Segments */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Product Segments</CardTitle>
                  <p className="text-slate-400 text-sm">Revenue by product category</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { product: "Core Platform", revenue: 2450, margin: 68.5, adoption: 89, color: "bg-blue-500" },
                    { product: "Analytics Suite", revenue: 1280, margin: 74.2, adoption: 67, color: "bg-green-500" },
                    { product: "AI Add-ons", revenue: 640, margin: 82.1, adoption: 34, color: "bg-purple-500" },
                    { product: "Professional Services", revenue: 280, margin: 45.8, adoption: 28, color: "bg-yellow-500" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 border border-slate-700">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <div>
                          <h4 className="text-slate-200 font-medium">{item.product}</h4>
                          <p className="text-slate-400 text-sm">{item.adoption}% adoption rate</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">${item.revenue}K</div>
                        <div className="text-green-400 text-sm mt-1">{item.margin}% margin</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Industry Verticals</CardTitle>
                  <p className="text-slate-400 text-sm">Performance by industry sector</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { industry: "Technology", revenue: 1680, growth: 34.2, penetration: 23.4, color: "bg-blue-500" },
                    { industry: "Financial Services", revenue: 1240, growth: 28.7, penetration: 18.9, color: "bg-green-500" },
                    { industry: "Healthcare", revenue: 890, growth: 42.1, penetration: 15.2, color: "bg-purple-500" },
                    { industry: "Manufacturing", revenue: 540, growth: 19.8, penetration: 12.1, color: "bg-yellow-500" },
                    { industry: "Retail", revenue: 300, growth: 56.3, penetration: 8.7, color: "bg-red-500" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 border border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <div>
                          <h4 className="text-slate-200 font-medium text-sm">{item.industry}</h4>
                          <p className="text-slate-400 text-xs">{item.penetration}% market penetration</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold text-sm">${item.revenue}K</div>
                        <div className="text-green-400 text-xs">+{item.growth}%</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Segment Performance Insights */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Segment Performance Insights</CardTitle>
                <p className="text-slate-400 text-sm">Key insights and opportunities across market segments</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h4 className="text-slate-300 font-medium flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      Top Performers
                    </h4>
                    <div className="space-y-2">
                      <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <h5 className="text-green-400 font-medium text-sm">Small Business Segment</h5>
                        <p className="text-slate-300 text-xs mt-1">67.8% growth rate - highest performing segment</p>
                        <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-xs mt-2">
                          High Growth
                        </Badge>
                      </div>
                      <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <h5 className="text-blue-400 font-medium text-sm">Asia Pacific Region</h5>
                        <p className="text-slate-300 text-xs mt-1">45.7% growth with expanding market presence</p>
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs mt-2">
                          Expansion
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-slate-300 font-medium flex items-center gap-2">
                      <Target className="w-4 h-4 text-purple-400" />
                      Growth Opportunities
                    </h4>
                    <div className="space-y-2">
                      <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <h5 className="text-purple-400 font-medium text-sm">AI Add-ons Product</h5>
                        <p className="text-slate-300 text-xs mt-1">82.1% margin but only 34% adoption - expansion potential</p>
                        <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-xs mt-2">
                          High Margin
                        </Badge>
                      </div>
                      <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <h5 className="text-yellow-400 font-medium text-sm">Healthcare Vertical</h5>
                        <p className="text-slate-300 text-xs mt-1">42.1% growth with significant market opportunity</p>
                        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 text-xs mt-2">
                          Opportunity
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-slate-300 font-medium flex items-center gap-2">
                      <Activity className="w-4 h-4 text-red-400" />
                      Areas to Watch
                    </h4>
                    <div className="space-y-2">
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <h5 className="text-red-400 font-medium text-sm">Professional Services</h5>
                        <p className="text-slate-300 text-xs mt-1">45.8% margin - lowest among product segments</p>
                        <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20 text-xs mt-2">
                          Low Margin
                        </Badge>
                      </div>
                      <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <h5 className="text-orange-400 font-medium text-sm">Latin America</h5>
                        <p className="text-slate-300 text-xs mt-1">4.9% revenue share - untapped potential</p>
                        <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/20 text-xs mt-2">
                          Emerging
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Segment Performance Insights */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Segment Performance Insights</CardTitle>
                <p className="text-slate-400 text-sm">Key insights and opportunities across market segments</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h4 className="text-slate-300 font-medium flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      Top Performers
                    </h4>
                    <div className="space-y-2">
                      <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <h5 className="text-green-400 font-medium text-sm">Small Business Segment</h5>
                        <p className="text-slate-300 text-xs mt-1">67.8% growth rate - highest performing segment</p>
                        <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-xs mt-2">
                          High Growth
                        </Badge>
                      </div>
                      <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <h5 className="text-blue-400 font-medium text-sm">Asia Pacific Region</h5>
                        <p className="text-slate-300 text-xs mt-1">45.7% growth with expanding market presence</p>
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs mt-2">
                          Expansion
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-slate-300 font-medium flex items-center gap-2">
                      <Target className="w-4 h-4 text-purple-400" />
                      Growth Opportunities
                    </h4>
                    <div className="space-y-2">
                      <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <h5 className="text-purple-400 font-medium text-sm">AI Add-ons Product</h5>
                        <p className="text-slate-300 text-xs mt-1">82.1% margin but only 34% adoption - expansion potential</p>
                        <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-xs mt-2">
                          High Margin
                        </Badge>
                      </div>
                      <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <h5 className="text-yellow-400 font-medium text-sm">Healthcare Vertical</h5>
                        <p className="text-slate-300 text-xs mt-1">42.1% growth with significant market opportunity</p>
                        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 text-xs mt-2">
                          Opportunity
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-slate-300 font-medium flex items-center gap-2">
                      <Activity className="w-4 h-4 text-red-400" />
                      Areas to Watch
                    </h4>
                    <div className="space-y-2">
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <h5 className="text-red-400 font-medium text-sm">Professional Services</h5>
                        <p className="text-slate-300 text-xs mt-1">45.8% margin - lowest among product segments</p>
                        <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20 text-xs mt-2">
                          Low Margin
                        </Badge>
                      </div>
                      <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <h5 className="text-orange-400 font-medium text-sm">Latin America</h5>
                        <p className="text-slate-300 text-xs mt-1">4.9% revenue share - untapped potential</p>
                        <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/20 text-xs mt-2">
                          Emerging
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            {/* Insights Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Active Insights</CardTitle>
                  <Database className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">24</div>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-sm text-green-400">+6 new insights</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">AI-generated insights</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">High Priority</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">3</div>
                  <div className="flex items-center mt-2">
                    <AlertTriangle className="w-4 h-4 text-red-400 mr-1" />
                    <span className="text-sm text-red-400">Requires attention</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Critical alerts</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Opportunities</CardTitle>
                  <Target className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">$340K</div>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-sm text-green-400">Revenue potential</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Identified opportunities</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">AI Confidence</CardTitle>
                  <Activity className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">94.2%</div>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-sm text-green-400">High accuracy</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Average confidence score</p>
                </CardContent>
              </Card>
            </div>

            {/* Critical Insights */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  Critical Insights - Immediate Action Required
                </CardTitle>
                <p className="text-slate-400 text-sm">High-priority insights that require immediate attention</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <div>
                        <h4 className="text-red-400 font-medium">Customer Churn Risk Spike</h4>
                        <p className="text-slate-300 text-sm mt-1">15% increase in churn indicators detected in Enterprise segment</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20">
                      Critical
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="text-slate-300 font-medium text-sm mb-2">Key Metrics:</h5>
                      <ul className="text-slate-400 text-sm space-y-1">
                        <li>• At-risk revenue: $285K</li>
                        <li>• Affected customers: 8 enterprise accounts</li>
                        <li>• Average contract value: $35.6K</li>
                        <li>• Time to potential churn: 30-45 days</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-slate-300 font-medium text-sm mb-2">Recommended Actions:</h5>
                      <ul className="text-slate-400 text-sm space-y-1">
                        <li>• Schedule executive check-ins immediately</li>
                        <li>• Offer additional training/support resources</li>
                        <li>• Consider contract renegotiation</li>
                        <li>• Deploy customer success team</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <TrendingDown className="w-5 h-5 text-yellow-400" />
                      <div>
                        <h4 className="text-yellow-400 font-medium">Revenue Growth Deceleration</h4>
                        <p className="text-slate-300 text-sm mt-1">Month-over-month growth rate declined from 8.4% to 5.2%</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                      High Priority
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h5 className="text-slate-300 font-medium text-sm mb-2">Analysis:</h5>
                      <ul className="text-slate-400 text-sm space-y-1">
                        <li>• Slowdown primarily in SMB segment</li>
                        <li>• New customer acquisition down 12%</li>
                        <li>• Average deal size decreased 8%</li>
                        <li>• Sales cycle extended by 15 days</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-slate-300 font-medium text-sm mb-2">Recommendations:</h5>
                      <ul className="text-slate-400 text-sm space-y-1">
                        <li>• Accelerate lead generation campaigns</li>
                        <li>• Review and optimize pricing strategy</li>
                        <li>• Streamline sales process</li>
                        <li>• Increase marketing spend in high-performing channels</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Optimization Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-400" />
                    Revenue Optimization
                  </CardTitle>
                  <p className="text-slate-400 text-sm">AI-identified opportunities to increase revenue</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-green-400 font-medium text-sm">Upsell Opportunity</h4>
                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
                        $180K potential
                      </Badge>
                    </div>
                    <p className="text-slate-300 text-xs mb-2">23 customers ready for Analytics Suite upgrade</p>
                    <div className="text-xs text-slate-400">
                      <div>• 95% usage of current plan limits</div>
                      <div>• High engagement scores (8.7/10)</div>
                      <div>• Similar customers upgraded within 30 days</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-blue-400 font-medium text-sm">Pricing Optimization</h4>
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">
                        $95K potential
                      </Badge>
                    </div>
                    <p className="text-slate-300 text-xs mb-2">SMB segment can bear 12% price increase</p>
                    <div className="text-xs text-slate-400">
                      <div>• Market analysis shows pricing gap</div>
                      <div>• Customer satisfaction remains high</div>
                      <div>• Competitive positioning supports increase</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-purple-400 font-medium text-sm">Cross-Sell Opportunity</h4>
                      <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-xs">
                        $65K potential
                      </Badge>
                    </div>
                    <p className="text-slate-300 text-xs mb-2">AI Add-ons have low penetration in Enterprise</p>
                    <div className="text-xs text-slate-400">
                      <div>• Only 34% adoption rate in Enterprise</div>
                      <div>• High ROI demonstrated by existing users</div>
                      <div>• Sales team trained on positioning</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-400" />
                    Performance Insights
                  </CardTitle>
                  <p className="text-slate-400 text-sm">Key performance patterns and improvements</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <h4 className="text-green-400 font-medium text-sm">Customer Satisfaction Peak</h4>
                    </div>
                    <p className="text-slate-300 text-xs mb-2">NPS score reached all-time high of 72</p>
                    <div className="text-xs text-slate-400">
                      <div>• 15-point increase from last quarter</div>
                      <div>• Driven by improved onboarding process</div>
                      <div>• Strong correlation with retention rates</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-blue-400" />
                      <h4 className="text-blue-400 font-medium text-sm">Sales Team Efficiency</h4>
                    </div>
                    <p className="text-slate-300 text-xs mb-2">Top 20% of sales reps generate 68% of revenue</p>
                    <div className="text-xs text-slate-400">
                      <div>• Clear patterns in successful approaches</div>
                      <div>• Opportunity for knowledge transfer</div>
                      <div>• Training program refinement needed</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-yellow-400" />
                      <h4 className="text-yellow-400 font-medium text-sm">Product Usage Patterns</h4>
                    </div>
                    <p className="text-slate-300 text-xs mb-2">Advanced features underutilized by 45% of users</p>
                    <div className="text-xs text-slate-400">
                      <div>• Significant value left on the table</div>
                      <div>• Training and onboarding gaps identified</div>
                      <div>• In-app guidance improvements planned</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Predictive Insights */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Predictive Insights
                </CardTitle>
                <p className="text-slate-400 text-sm">AI predictions and forward-looking recommendations</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h4 className="text-slate-300 font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      Next 30 Days
                    </h4>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <h5 className="text-blue-400 font-medium text-sm">Revenue Forecast</h5>
                        <div className="text-white font-semibold mt-1">$485K (+12%)</div>
                        <div className="text-xs text-slate-400 mt-1">94% confidence</div>
                      </div>
                      <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <h5 className="text-green-400 font-medium text-sm">New Customers</h5>
                        <div className="text-white font-semibold mt-1">28 acquisitions</div>
                        <div className="text-xs text-slate-400 mt-1">87% confidence</div>
                      </div>
                      <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <h5 className="text-yellow-400 font-medium text-sm">Churn Risk</h5>
                        <div className="text-white font-semibold mt-1">3 customers</div>
                        <div className="text-xs text-slate-400 mt-1">91% confidence</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-slate-300 font-medium flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      Quarter Outlook
                    </h4>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <h5 className="text-green-400 font-medium text-sm">Growth Trajectory</h5>
                        <div className="text-white font-semibold mt-1">22% QoQ growth</div>
                        <div className="text-xs text-slate-400 mt-1">Expected range: 18-26%</div>
                      </div>
                      <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <h5 className="text-purple-400 font-medium text-sm">Market Expansion</h5>
                        <div className="text-white font-semibold mt-1">2 new verticals</div>
                        <div className="text-xs text-slate-400 mt-1">Healthcare & Education</div>
                      </div>
                      <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <h5 className="text-blue-400 font-medium text-sm">Product Launch</h5>
                        <div className="text-white font-semibold mt-1">AI Suite v2.0</div>
                        <div className="text-xs text-slate-400 mt-1">Expected $120K impact</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-slate-300 font-medium flex items-center gap-2">
                      <Target className="w-4 h-4 text-red-400" />
                      Risk Factors
                    </h4>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <h5 className="text-red-400 font-medium text-sm">Competitive Threat</h5>
                        <div className="text-white font-semibold mt-1">Medium Risk</div>
                        <div className="text-xs text-slate-400 mt-1">New competitor pricing aggressive</div>
                      </div>
                      <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <h5 className="text-yellow-400 font-medium text-sm">Economic Factors</h5>
                        <div className="text-white font-semibold mt-1">Low Risk</div>
                        <div className="text-xs text-slate-400 mt-1">Stable economic indicators</div>
                      </div>
                      <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <h5 className="text-orange-400 font-medium text-sm">Resource Constraints</h5>
                        <div className="text-white font-semibold mt-1">Medium Risk</div>
                        <div className="text-xs text-slate-400 mt-1">Engineering capacity at 85%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Items */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Recommended Action Items
                </CardTitle>
                <p className="text-slate-400 text-sm">Priority actions based on AI analysis and insights</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      priority: "High", 
                      action: "Deploy retention team for at-risk Enterprise accounts", 
                      impact: "$285K revenue protection", 
                      timeline: "Next 7 days",
                      color: "bg-red-500"
                    },
                    { 
                      priority: "High", 
                      action: "Launch upsell campaign for Analytics Suite", 
                      impact: "$180K revenue opportunity", 
                      timeline: "Next 14 days",
                      color: "bg-red-500"
                    },
                    { 
                      priority: "Medium", 
                      action: "Implement SMB pricing optimization", 
                      impact: "$95K annual increase", 
                      timeline: "Next 30 days",
                      color: "bg-yellow-500"
                    },
                    { 
                      priority: "Medium", 
                      action: "Enhance product onboarding for advanced features", 
                      impact: "45% usage improvement", 
                      timeline: "Next 45 days",
                      color: "bg-yellow-500"
                    },
                    { 
                      priority: "Low", 
                      action: "Develop sales training program for top performers", 
                      impact: "Team efficiency boost", 
                      timeline: "Next 60 days",
                      color: "bg-green-500"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 border border-slate-700">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <div className="flex-1">
                          <h4 className="text-slate-200 font-medium text-sm">{item.action}</h4>
                          <p className="text-slate-400 text-xs mt-1">{item.impact}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className={`text-xs ${
                          item.priority === 'High' 
                            ? 'bg-red-500/10 text-red-400 border-red-500/20'
                            : item.priority === 'Medium'
                            ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                            : 'bg-green-500/10 text-green-400 border-green-500/20'
                        }`}>
                          {item.priority} Priority
                        </Badge>
                        <div className="text-slate-400 text-xs mt-1">{item.timeline}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 