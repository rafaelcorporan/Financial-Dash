"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Download,
  Calendar,
  Filter,
  Eye,
  Share2,
  Printer,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  PieChart,
  Activity,
  Building2,
  CreditCard,
  Wallet,
  Target,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  Plus,
  Trash2,
  GripVertical,
  Save,
  Play,
  Copy,
  Edit3,
  Database,
  Layers,
  Layout,
  Palette,
  Sliders,
  Search,
  Mail,
  Users,
  Repeat,
  Pause,
  MoreHorizontal,
  Bell,
  Send,
  Archive,
  History,
} from "lucide-react"
import { useEffect, useRef } from "react"

export function ReportsContent() {
  const revenueBreakdownRef = useRef<HTMLCanvasElement>(null)
  const expenseBreakdownRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Revenue Breakdown Chart
    const canvas = revenueBreakdownRef.current
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
      { label: "Product Sales", value: 45, color: "#3b82f6" },
      { label: "Services", value: 30, color: "#10b981" },
      { label: "Subscriptions", value: 15, color: "#f59e0b" },
      { label: "Other", value: 10, color: "#8b5cf6" },
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
    // Expense Breakdown Chart
    const canvas = expenseBreakdownRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    const width = canvas.offsetWidth
    const height = canvas.offsetHeight

    ctx.clearRect(0, 0, width, height)

    const categories = ["Operations", "Marketing", "R&D", "Admin", "Other"]
    const values = [35, 25, 20, 15, 5]
    const colors = ["#ef4444", "#f59e0b", "#3b82f6", "#8b5cf6", "#64748b"]

    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2
    const barHeight = chartHeight / categories.length * 0.6
    const barSpacing = chartHeight / categories.length

    const maxValue = Math.max(...values)

    categories.forEach((category, index) => {
      const value = values[index]
      const barWidth = (value / maxValue) * chartWidth
      const y = padding + index * barSpacing + (barSpacing - barHeight) / 2

      // Draw bar
      ctx.fillStyle = colors[index]
      ctx.fillRect(padding, y, barWidth, barHeight)

      // Category labels
      ctx.fillStyle = "#e2e8f0"
      ctx.font = "12px Inter"
      ctx.textAlign = "left"
      ctx.fillText(category, padding + 5, y + barHeight / 2 + 4)

      // Value labels
      ctx.textAlign = "right"
      ctx.fillText(`${value}%`, padding + barWidth - 5, y + barHeight / 2 + 4)
    })
  }, [])

  return (
    <div className="flex-1 bg-slate-950 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Financial Reports</h1>
              <p className="text-slate-400 mt-1">Generate and analyze comprehensive financial reports</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                <Calendar className="w-4 h-4 mr-2" />
                Q4 2024
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Export All
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Report Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Generated Reports</CardTitle>
              <FileText className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">24</div>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-sm text-green-400">+6</span>
                <span className="text-sm text-slate-400 ml-1">this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Data Coverage</CardTitle>
              <BarChart3 className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">98.5%</div>
              <div className="flex items-center mt-2">
                <CheckCircle className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-sm text-green-400">Complete</span>
                <span className="text-sm text-slate-400 ml-1">accuracy</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Processing Time</CardTitle>
              <Clock className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">2.3s</div>
              <div className="flex items-center mt-2">
                <ArrowDownRight className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-sm text-green-400">-15%</span>
                <span className="text-sm text-slate-400 ml-1">faster</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Report Status</CardTitle>
              <Activity className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Live</div>
              <div className="flex items-center mt-2">
                <CheckCircle className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-sm text-green-400">Real-time</span>
                <span className="text-sm text-slate-400 ml-1">updates</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports Tabs */}
        <Tabs defaultValue="statements" className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="statements">Financial Statements</TabsTrigger>
            <TabsTrigger value="analysis">Analysis Reports</TabsTrigger>
            <TabsTrigger value="custom">Custom Reports</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          </TabsList>

          <TabsContent value="statements" className="space-y-6">
            {/* Financial Statements */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Profit & Loss</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm">Income statement for Q4 2024</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Total Revenue</span>
                      <span className="text-sm text-green-400 font-semibold">$2,450,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Cost of Goods Sold</span>
                      <span className="text-sm text-orange-400">($980,000)</span>
                    </div>
                    <div className="border-t border-slate-700 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-300">Gross Profit</span>
                        <span className="text-sm text-blue-400 font-semibold">$1,470,000</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Operating Expenses</span>
                      <span className="text-sm text-orange-400">($890,000)</span>
                    </div>
                    <div className="border-t border-slate-700 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-300 font-semibold">Net Income</span>
                        <span className="text-sm text-green-400 font-bold">$580,000</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                      +23.7% vs Q3
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Balance Sheet</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm">Financial position as of Dec 31, 2024</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="text-sm text-slate-400 font-medium">ASSETS</div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Current Assets</span>
                      <span className="text-sm text-blue-400">$3,200,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Fixed Assets</span>
                      <span className="text-sm text-blue-400">$1,800,000</span>
                    </div>
                    <div className="border-t border-slate-700 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-300 font-semibold">Total Assets</span>
                        <span className="text-sm text-blue-400 font-bold">$5,000,000</span>
                      </div>
                    </div>
                    <div className="text-sm text-slate-400 font-medium pt-2">LIABILITIES & EQUITY</div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Total Liabilities</span>
                      <span className="text-sm text-orange-400">$1,950,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Total Equity</span>
                      <span className="text-sm text-green-400">$3,050,000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Cash Flow</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm">Statement of cash flows Q4 2024</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Operating Activities</span>
                      <span className="text-sm text-green-400">$485,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Investing Activities</span>
                      <span className="text-sm text-orange-400">($120,000)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Financing Activities</span>
                      <span className="text-sm text-orange-400">($85,000)</span>
                    </div>
                    <div className="border-t border-slate-700 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-300 font-semibold">Net Cash Flow</span>
                        <span className="text-sm text-green-400 font-bold">$280,000</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Cash at Beginning</span>
                      <span className="text-sm text-blue-400">$1,570,000</span>
                    </div>
                    <div className="border-t border-slate-700 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-300 font-semibold">Cash at End</span>
                        <span className="text-sm text-green-400 font-bold">$1,850,000</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Report Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Revenue Breakdown</CardTitle>
                  <p className="text-slate-400 text-sm">Revenue sources by category</p>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-48 mb-4">
                    <canvas ref={revenueBreakdownRef} className="w-full h-full" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-slate-300">Product Sales</span>
                      </div>
                      <span className="text-sm text-slate-400">45%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-slate-300">Services</span>
                      </div>
                      <span className="text-sm text-slate-400">30%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-slate-300">Subscriptions</span>
                      </div>
                      <span className="text-sm text-slate-400">15%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm text-slate-300">Other</span>
                      </div>
                      <span className="text-sm text-slate-400">10%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Expense Breakdown</CardTitle>
                  <p className="text-slate-400 text-sm">Operating expenses by category</p>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-48 mb-4">
                    <canvas ref={expenseBreakdownRef} className="w-full h-full" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-slate-300">Operations</span>
                      </div>
                      <span className="text-sm text-slate-400">35%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-slate-300">Marketing</span>
                      </div>
                      <span className="text-sm text-slate-400">25%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-slate-300">R&D</span>
                      </div>
                      <span className="text-sm text-slate-400">20%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm text-slate-300">Admin</span>
                      </div>
                      <span className="text-sm text-slate-400">15%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            {/* Analysis Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Current Ratio</CardTitle>
                  <Target className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">1.64</div>
                  <div className="flex items-center mt-2">
                    <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                      Healthy
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">ROE</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">19.02%</div>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-sm text-green-400">+2.3%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Debt-to-Equity</CardTitle>
                  <Building2 className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">0.64</div>
                  <div className="flex items-center mt-2">
                    <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      Optimal
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Profit Margin</CardTitle>
                  <DollarSign className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">23.67%</div>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-sm text-green-400">+1.8%</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Ratio Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Liquidity Ratios</CardTitle>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-slate-400 text-sm">Short-term debt paying ability</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Current Ratio</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-blue-400">1.64</span>
                        <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          Good
                        </Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Quick Ratio</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-blue-400">1.32</span>
                        <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          Good
                        </Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Cash Ratio</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-blue-400">0.58</span>
                        <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                          Fair
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-slate-700 pt-3">
                    <div className="text-sm text-slate-400">
                      <p>Strong liquidity position with current ratio above 1.5. Consider optimizing cash deployment.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Profitability Ratios</CardTitle>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-slate-400 text-sm">Ability to generate earnings</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Gross Profit Margin</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-green-400">60.0%</span>
                        <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          Excellent
                        </Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Operating Margin</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-green-400">23.7%</span>
                        <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          Good
                        </Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Net Profit Margin</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-green-400">23.67%</span>
                        <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          Good
                        </Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">ROE</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-green-400">19.02%</span>
                        <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          Strong
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-slate-700 pt-3">
                    <div className="text-sm text-slate-400">
                      <p>Excellent profitability metrics across all measures. ROE indicates efficient use of equity.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Trend Analysis */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Trend Analysis</CardTitle>
                    <p className="text-slate-400 text-sm">12-month financial performance trends</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                      <Calendar className="w-4 h-4 mr-2" />
                      12 Months
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-slate-300 font-medium">Revenue Growth</span>
                    </div>
                    <div className="text-2xl font-bold text-white">+18.5%</div>
                    <div className="text-sm text-slate-400">Consistent quarter-over-quarter growth</div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-slate-300 font-medium">Margin Improvement</span>
                    </div>
                    <div className="text-2xl font-bold text-white">+2.3%</div>
                    <div className="text-sm text-slate-400">Operational efficiency gains</div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-slate-300 font-medium">Cash Flow Stability</span>
                    </div>
                    <div className="text-2xl font-bold text-white">+12.8%</div>
                    <div className="text-sm text-slate-400">Strong cash generation</div>
                    <Progress value={78} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comparative Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Industry Benchmarks</CardTitle>
                  <p className="text-slate-400 text-sm">Performance vs. industry averages</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Revenue Growth</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-400">Industry: 12.5%</span>
                        <span className="text-sm text-green-400">Us: 18.5%</span>
                        <ArrowUpRight className="w-3 h-3 text-green-400" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Profit Margin</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-400">Industry: 18.2%</span>
                        <span className="text-sm text-green-400">Us: 23.7%</span>
                        <ArrowUpRight className="w-3 h-3 text-green-400" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">ROE</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-400">Industry: 15.8%</span>
                        <span className="text-sm text-green-400">Us: 19.0%</span>
                        <ArrowUpRight className="w-3 h-3 text-green-400" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Debt-to-Equity</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-400">Industry: 0.72</span>
                        <span className="text-sm text-green-400">Us: 0.64</span>
                        <ArrowUpRight className="w-3 h-3 text-green-400" />
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-slate-700 pt-3">
                    <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                      Outperforming Industry
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Financial Health Score</CardTitle>
                  <p className="text-slate-400 text-sm">Overall financial stability assessment</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-400 mb-2">8.7</div>
                    <div className="text-sm text-slate-400 mb-4">out of 10</div>
                    <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                      Excellent Financial Health
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Liquidity</span>
                      <div className="flex items-center gap-2">
                        <Progress value={82} className="h-2 w-16" />
                        <span className="text-sm text-green-400">8.2</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Profitability</span>
                      <div className="flex items-center gap-2">
                        <Progress value={91} className="h-2 w-16" />
                        <span className="text-sm text-green-400">9.1</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Efficiency</span>
                      <div className="flex items-center gap-2">
                        <Progress value={85} className="h-2 w-16" />
                        <span className="text-sm text-green-400">8.5</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Stability</span>
                      <div className="flex items-center gap-2">
                        <Progress value={88} className="h-2 w-16" />
                        <span className="text-sm text-green-400">8.8</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-6">
            {/* Report Builder Header */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Custom Report Builder</CardTitle>
                    <p className="text-slate-400">Drag and drop components to build your custom financial reports</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                      <Copy className="w-4 h-4 mr-2" />
                      Templates
                    </Button>
                    <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                      <Save className="w-4 h-4 mr-2" />
                      Save Draft
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Play className="w-4 h-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Report Builder Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Component Palette */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Components</CardTitle>
                  <p className="text-slate-400 text-sm">Drag components to build your report</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-slate-300">Data Sources</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-2 bg-slate-800 rounded-lg cursor-move hover:bg-slate-700 transition-colors">
                        <Database className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-slate-300">Revenue Data</span>
                        <GripVertical className="w-3 h-3 text-slate-500 ml-auto" />
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-slate-800 rounded-lg cursor-move hover:bg-slate-700 transition-colors">
                        <Database className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-slate-300">Expense Data</span>
                        <GripVertical className="w-3 h-3 text-slate-500 ml-auto" />
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-slate-800 rounded-lg cursor-move hover:bg-slate-700 transition-colors">
                        <Database className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-slate-300">Cash Flow</span>
                        <GripVertical className="w-3 h-3 text-slate-500 ml-auto" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-slate-300">Charts</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-2 bg-slate-800 rounded-lg cursor-move hover:bg-slate-700 transition-colors">
                        <BarChart3 className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-slate-300">Bar Chart</span>
                        <GripVertical className="w-3 h-3 text-slate-500 ml-auto" />
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-slate-800 rounded-lg cursor-move hover:bg-slate-700 transition-colors">
                        <PieChart className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-slate-300">Pie Chart</span>
                        <GripVertical className="w-3 h-3 text-slate-500 ml-auto" />
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-slate-800 rounded-lg cursor-move hover:bg-slate-700 transition-colors">
                        <TrendingUp className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-slate-300">Line Chart</span>
                        <GripVertical className="w-3 h-3 text-slate-500 ml-auto" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-slate-300">Widgets</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-2 bg-slate-800 rounded-lg cursor-move hover:bg-slate-700 transition-colors">
                        <Target className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-slate-300">KPI Card</span>
                        <GripVertical className="w-3 h-3 text-slate-500 ml-auto" />
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-slate-800 rounded-lg cursor-move hover:bg-slate-700 transition-colors">
                        <FileText className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-slate-300">Data Table</span>
                        <GripVertical className="w-3 h-3 text-slate-500 ml-auto" />
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-slate-800 rounded-lg cursor-move hover:bg-slate-700 transition-colors">
                        <Activity className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-slate-300">Summary</span>
                        <GripVertical className="w-3 h-3 text-slate-500 ml-auto" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Report Canvas */}
              <div className="lg:col-span-3 space-y-6">
                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">Report Canvas</CardTitle>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Layout className="w-4 h-4 mr-2" />
                          Layout
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Palette className="w-4 h-4 mr-2" />
                          Theme
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="min-h-[600px] border-2 border-dashed border-slate-700 rounded-lg p-6 space-y-4">
                      {/* Sample Report Components */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="bg-slate-800 border-slate-700 relative group">
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Edit3 className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-slate-300">Total Revenue</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-white">$2.45M</div>
                            <div className="text-sm text-green-400">+18.5% vs last quarter</div>
                          </CardContent>
                        </Card>

                        <Card className="bg-slate-800 border-slate-700 relative group">
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Edit3 className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-slate-300">Net Income</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-white">$580K</div>
                            <div className="text-sm text-green-400">+23.7% profit margin</div>
                          </CardContent>
                        </Card>

                        <Card className="bg-slate-800 border-slate-700 relative group">
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Edit3 className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-slate-300">Cash Flow</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-white">$280K</div>
                            <div className="text-sm text-blue-400">Positive operating CF</div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card className="bg-slate-800 border-slate-700 relative group">
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Edit3 className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle className="text-white">Monthly Revenue Trend</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-48 flex items-center justify-center border border-slate-600 rounded-lg">
                            <div className="text-center text-slate-500">
                              <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                              <p className="text-sm">Chart visualization will appear here</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="bg-slate-800 border-slate-700 relative group">
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Edit3 className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          <CardHeader>
                            <CardTitle className="text-white">Top Expenses</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-300">Operations</span>
                                <span className="text-sm text-slate-400">$311K</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-300">Marketing</span>
                                <span className="text-sm text-slate-400">$222K</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-300">R&D</span>
                                <span className="text-sm text-slate-400">$178K</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-slate-800 border-slate-700 relative group">
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Edit3 className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          <CardHeader>
                            <CardTitle className="text-white">Key Ratios</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-300">Current Ratio</span>
                                <span className="text-sm text-green-400">1.64</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-300">ROE</span>
                                <span className="text-sm text-green-400">19.02%</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-300">Debt-to-Equity</span>
                                <span className="text-sm text-blue-400">0.64</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Drop Zone */}
                      <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center">
                        <div className="text-slate-500">
                          <Plus className="w-8 h-8 mx-auto mb-2" />
                          <p className="text-sm">Drop components here to add them to your report</p>
                          <p className="text-xs mt-1">Or click to browse available components</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Report Configuration */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Report Configuration</CardTitle>
                <p className="text-slate-400 text-sm">Configure data sources, filters, and styling options</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-slate-300">Data Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <label className="text-xs text-slate-400">Date Range</label>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-300">Q4 2024</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-slate-400">Currency</label>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-300">USD</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-slate-400">Filters</label>
                        <div className="flex items-center gap-2">
                          <Filter className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-300">Active</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-slate-300">Layout Options</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <label className="text-xs text-slate-400">Page Size</label>
                        <div className="flex items-center gap-2">
                          <Layout className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-300">A4 Portrait</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-slate-400">Columns</label>
                        <div className="flex items-center gap-2">
                          <Layers className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-300">2 Columns</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-slate-400">Spacing</label>
                        <div className="flex items-center gap-2">
                          <Sliders className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-300">Standard</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-slate-300">Export Options</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <label className="text-xs text-slate-400">Format</label>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-300">PDF</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-slate-400">Quality</label>
                        <div className="flex items-center gap-2">
                          <Settings className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-300">High</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-slate-400">Delivery</label>
                        <div className="flex items-center gap-2">
                          <Share2 className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-300">Email</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Report Templates */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Report Templates</CardTitle>
                <p className="text-slate-400 text-sm">Start with a pre-built template or create from scratch</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="bg-slate-800 border-slate-700 cursor-pointer hover:bg-slate-700 transition-colors">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <BarChart3 className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                        <h3 className="text-sm font-medium text-slate-300">Monthly Summary</h3>
                        <p className="text-xs text-slate-400 mt-1">Revenue, expenses, and profit overview</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800 border-slate-700 cursor-pointer hover:bg-slate-700 transition-colors">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <PieChart className="w-8 h-8 mx-auto mb-2 text-green-400" />
                        <h3 className="text-sm font-medium text-slate-300">Department Analysis</h3>
                        <p className="text-xs text-slate-400 mt-1">Cost breakdown by department</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800 border-slate-700 cursor-pointer hover:bg-slate-700 transition-colors">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                        <h3 className="text-sm font-medium text-slate-300">Quarterly Trends</h3>
                        <p className="text-xs text-slate-400 mt-1">Performance trends over time</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800 border-slate-700 cursor-pointer hover:bg-slate-700 transition-colors">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <Plus className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                        <h3 className="text-sm font-medium text-slate-300">Blank Template</h3>
                        <p className="text-xs text-slate-400 mt-1">Start from scratch</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-6">
            {/* Scheduled Reports Header */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Scheduled Reports</CardTitle>
                    <p className="text-slate-400">Automated report generation and delivery management</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                      <Archive className="w-4 h-4 mr-2" />
                      History
                    </Button>
                    <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      New Schedule
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Schedule Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Active Schedules</CardTitle>
                  <Clock className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">12</div>
                  <div className="flex items-center mt-2">
                    <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                      Running
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Reports Sent</CardTitle>
                  <Send className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">247</div>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-sm text-green-400">+18</span>
                    <span className="text-sm text-slate-400 ml-1">this week</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Success Rate</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">98.5%</div>
                  <div className="flex items-center mt-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-sm text-green-400">Excellent</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Next Run</CardTitle>
                  <Bell className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">2h 15m</div>
                  <div className="flex items-center mt-2">
                    <Clock className="w-4 h-4 text-blue-400 mr-1" />
                    <span className="text-sm text-blue-400">Monthly P&L</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Scheduled Reports List */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Scheduled Reports</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Scheduled Report Item 1 */}
                  <Card className="bg-slate-800 border-slate-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-slate-300">Monthly Financial Summary</h3>
                            <p className="text-xs text-slate-400">P&L, Balance Sheet, Cash Flow</p>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-slate-400" />
                                <span className="text-xs text-slate-400">Every 1st of month at 9:00 AM</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3 text-slate-400" />
                                <span className="text-xs text-slate-400">5 recipients</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                            Active
                          </Badge>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Scheduled Report Item 2 */}
                  <Card className="bg-slate-800 border-slate-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                            <BarChart3 className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-slate-300">Weekly Performance Dashboard</h3>
                            <p className="text-xs text-slate-400">KPIs, Trends, Department Analysis</p>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-slate-400" />
                                <span className="text-xs text-slate-400">Every Monday at 8:00 AM</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3 text-slate-400" />
                                <span className="text-xs text-slate-400">12 recipients</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                            Active
                          </Badge>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Scheduled Report Item 3 */}
                  <Card className="bg-slate-800 border-slate-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                            <PieChart className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-slate-300">Quarterly Business Review</h3>
                            <p className="text-xs text-slate-400">Comprehensive analysis and forecasting</p>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-slate-400" />
                                <span className="text-xs text-slate-400">Every quarter end at 2:00 PM</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3 text-slate-400" />
                                <span className="text-xs text-slate-400">8 recipients</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                            Active
                          </Badge>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Scheduled Report Item 4 */}
                  <Card className="bg-slate-800 border-slate-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-slate-300">Daily Cash Flow Report</h3>
                            <p className="text-xs text-slate-400">Bank balances and cash positions</p>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-slate-400" />
                                <span className="text-xs text-slate-400">Daily at 7:00 AM</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3 text-slate-400" />
                                <span className="text-xs text-slate-400">3 recipients</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                            Paused
                          </Badge>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Scheduled Report Item 5 */}
                  <Card className="bg-slate-800 border-slate-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-slate-300">Budget Variance Alert</h3>
                            <p className="text-xs text-slate-400">Automated budget monitoring and alerts</p>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-slate-400" />
                                <span className="text-xs text-slate-400">When variance {'>'}10%</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3 text-slate-400" />
                                <span className="text-xs text-slate-400">15 recipients</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                            Active
                          </Badge>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Schedule Configuration & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Schedule Setup */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Quick Schedule Setup</CardTitle>
                  <p className="text-slate-400 text-sm">Create a new scheduled report in minutes</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <label className="text-sm text-slate-300">Report Type</label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" className="justify-start bg-slate-800 border-slate-700">
                          <FileText className="w-4 h-4 mr-2" />
                          Financial
                        </Button>
                        <Button variant="outline" className="justify-start bg-slate-800 border-slate-700">
                          <BarChart3 className="w-4 h-4 mr-2" />
                          Analytics
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-slate-300">Frequency</label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                          <Repeat className="w-3 h-3 mr-1" />
                          Daily
                        </Button>
                        <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                          <Calendar className="w-3 h-3 mr-1" />
                          Weekly
                        </Button>
                        <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                          <Calendar className="w-3 h-3 mr-1" />
                          Monthly
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-slate-300">Recipients</label>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-400">Add email addresses...</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Schedule
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                  <p className="text-slate-400 text-sm">Latest scheduled report executions</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-300">Monthly Financial Summary sent</p>
                        <p className="text-xs text-slate-500">5 recipients • 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-300">Weekly Performance Dashboard generated</p>
                        <p className="text-xs text-slate-500">12 recipients • 1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-300">Budget Variance Alert triggered</p>
                        <p className="text-xs text-slate-500">Marketing dept exceeded by 12% • 2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-300">Quarterly Business Review completed</p>
                        <p className="text-xs text-slate-500">8 recipients • 3 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Pause className="w-4 h-4 text-slate-400 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-300">Daily Cash Flow Report paused</p>
                        <p className="text-xs text-slate-500">Manual suspension • 5 days ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-700">
                    <Button variant="ghost" size="sm" className="w-full">
                      <History className="w-4 h-4 mr-2" />
                      View Full History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Delivery Settings */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Delivery & Notification Settings</CardTitle>
                <p className="text-slate-400 text-sm">Configure how and when reports are delivered</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-slate-300">Email Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <label className="text-xs text-slate-400">From Address</label>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-300">reports@financeos.com</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-slate-400">Reply To</label>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-300">noreply@financeos.com</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-slate-400">Subject Template</label>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-300">[Report] %name% - %date%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-slate-300">Retry & Backup</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <label className="text-xs text-slate-400">Retry Attempts</label>
                        <div className="flex items-center gap-2">
                          <Repeat className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-300">3 attempts</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-slate-400">Retry Interval</label>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-300">15 minutes</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-slate-400">Backup Storage</label>
                        <div className="flex items-center gap-2">
                          <Archive className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-300">30 days</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-slate-300">Notifications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <label className="text-xs text-slate-400">Success Notifications</label>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-300">Admin only</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-slate-400">Failure Alerts</label>
                        <div className="flex items-center gap-2">
                          <Bell className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-300">All administrators</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-slate-400">Alert Method</label>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-300">Email + Dashboard</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 