"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Target,
  Plus,
  Edit,
  Calendar,
  Filter,
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  Users,
  Building2,
  Zap,
  RefreshCw,
  Eye,
  Settings,
  FileText,
  ChevronRight,
  Info,
  Calculator,
  LineChart,
  MoreHorizontal,
  AlertCircle,
  CheckCircle2,
  Lightbulb,
  Brain,
  Minus,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function BudgetsContent() {
  const budgetOverviewRef = useRef<HTMLCanvasElement>(null)
  const varianceChartRef = useRef<HTMLCanvasElement>(null)
  const categoryBreakdownRef = useRef<HTMLCanvasElement>(null)
  
  // Enhanced state for interactive features
  const [showBudgetDetails, setShowBudgetDetails] = useState(false)
  const [showVarianceDetails, setShowVarianceDetails] = useState(false)
  const [showAllocationDetails, setShowAllocationDetails] = useState(false)
  const [showReallocationDialog, setShowReallocationDialog] = useState(false)
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [selectedTimeRange, setSelectedTimeRange] = useState("12months")
  const [selectedCategory, setSelectedCategory] = useState("all")
  
  // Export state
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [exportStage, setExportStage] = useState("")
  const [lastExportTime, setLastExportTime] = useState<string | null>("Never")
  const [exportSettings, setExportSettings] = useState({
    dataTypes: {
      budgetData: true,
      allocations: true,
      variance: true,
      performance: false,
      forecasts: true,
      reports: false
    },
    categories: {
      operations: true,
      marketing: true,
      rd: true,
      sales: true,
      admin: true
    },
    format: "xlsx",
    dateRange: "12months",
    includeCharts: true,
    includeAnalysis: false,
    compression: false
  })
  const [budgetAnalysisData, setBudgetAnalysisData] = useState({
    totalVariance: 2.3,
    favorableVariance: 145600,
    unfavorableVariance: 78200,
    accuracyScore: 94.2,
    riskLevel: "Low"
  })
  
  // Budget allocation state
  const [allocationSettings, setAllocationSettings] = useState({
    autoRebalance: true,
    rebalanceFrequency: "quarterly",
    thresholdPercent: 10,
    enableAlerts: true,
    minAllocation: 5,
    maxAllocation: 50
  })
  
  // Reallocation state
  const [isReallocating, setIsReallocating] = useState(false)
  const [reallocationProgress, setReallocationProgress] = useState(0)
  const [reallocationStage, setReallocationStage] = useState("")
  const [proposedAllocations, setProposedAllocations] = useState({
    operations: 40,
    marketing: 25,
    rd: 20,
    sales: 10,
    admin: 5
  })
  
  // Enhanced budget data with more details
  const [budgetData] = useState({
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    budgeted: [800, 820, 850, 880, 900, 920, 950, 980, 1000, 1020, 1050, 1080],
    actual: [780, 840, 820, 920, 890, 940, 980, 960, 1020, 980, 1070, 1100],
    variance: [20, -20, 30, -40, 10, -20, -30, 20, -20, 40, -20, -20]
  })
  
  // Enhanced variance data with more categories
  const [varianceData] = useState([
    { 
      category: "Operations", 
      variance: 5, 
      budgeted: 4480000, 
      actual: 4256000,
      impact: "Favorable",
      reason: "Process optimization and efficiency gains",
      trend: "Improving"
    },
    { 
      category: "Marketing", 
      variance: -8, 
      budgeted: 2800000, 
      actual: 3024000,
      impact: "Unfavorable", 
      reason: "Additional digital campaigns and market expansion",
      trend: "Stable"
    },
    { 
      category: "R&D", 
      variance: 12, 
      budgeted: 2240000, 
      actual: 1971200,
      impact: "Favorable",
      reason: "Delayed hiring and equipment purchases",
      trend: "Improving"
    },
    { 
      category: "Sales", 
      variance: -3, 
      budgeted: 1120000, 
      actual: 1153600,
      impact: "Unfavorable",
      reason: "Higher commission rates and travel expenses",
      trend: "Declining"
    },
    { 
      category: "Admin", 
      variance: 7, 
      budgeted: 560000, 
      actual: 520800,
      impact: "Favorable",
      reason: "Reduced office expenses and automation",
      trend: "Stable"
    }
  ])
  
  // Enhanced allocation data with more details
  const [allocationData] = useState([
    {
      category: "Operations",
      currentAllocation: 40,
      currentAmount: 4480000,
      utilization: 92,
      efficiency: 94,
      roi: 2.8,
      historicalAvg: 38,
      recommended: 42,
      color: "#3b82f6",
      subcategories: [
        { name: "Personnel", allocation: 60, amount: 2688000 },
        { name: "Infrastructure", allocation: 25, amount: 1120000 },
        { name: "Utilities", allocation: 10, amount: 448000 },
        { name: "Other", allocation: 5, amount: 224000 }
      ]
    },
    {
      category: "Marketing",
      currentAllocation: 25,
      currentAmount: 2800000,
      utilization: 108,
      efficiency: 78,
      roi: 3.2,
      historicalAvg: 22,
      recommended: 23,
      color: "#10b981",
      subcategories: [
        { name: "Digital Advertising", allocation: 45, amount: 1260000 },
        { name: "Content Creation", allocation: 20, amount: 560000 },
        { name: "Events & PR", allocation: 25, amount: 700000 },
        { name: "Other", allocation: 10, amount: 280000 }
      ]
    },
    {
      category: "R&D",
      currentAllocation: 20,
      currentAmount: 2240000,
      utilization: 78,
      efficiency: 88,
      roi: 4.1,
      historicalAvg: 24,
      recommended: 18,
      color: "#f59e0b",
      subcategories: [
        { name: "Product Development", allocation: 70, amount: 1568000 },
        { name: "Research", allocation: 20, amount: 448000 },
        { name: "Testing", allocation: 10, amount: 224000 }
      ]
    },
    {
      category: "Sales",
      currentAllocation: 10,
      currentAmount: 1120000,
      utilization: 85,
      efficiency: 92,
      roi: 5.6,
      historicalAvg: 12,
      recommended: 12,
      color: "#8b5cf6",
      subcategories: [
        { name: "Commissions", allocation: 60, amount: 672000 },
        { name: "Travel & Expenses", allocation: 25, amount: 280000 },
        { name: "Training", allocation: 15, amount: 168000 }
      ]
    },
    {
      category: "Admin",
      currentAllocation: 5,
      currentAmount: 560000,
      utilization: 93,
      efficiency: 85,
      roi: 1.2,
      historicalAvg: 6,
      recommended: 5,
      color: "#ef4444",
      subcategories: [
        { name: "Finance & Legal", allocation: 40, amount: 224000 },
        { name: "HR", allocation: 35, amount: 196000 },
        { name: "IT Support", allocation: 25, amount: 140000 }
      ]
    }
  ])

  // Allocation adjustment functions
  const updateAllocationSetting = (key: string, value: any) => {
    setAllocationSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const updateProposedAllocation = (category: string, value: number) => {
    setProposedAllocations(prev => ({
      ...prev,
      [category]: value
    }))
  }

  // Helper function to get category key for proposedAllocations
  const getCategoryKey = (category: string): keyof typeof proposedAllocations => {
    const mapping: { [key: string]: keyof typeof proposedAllocations } = {
      'Operations': 'operations',
      'Marketing': 'marketing',
      'R&D': 'rd',
      'Sales': 'sales',
      'Admin': 'admin'
    }
    return mapping[category] || 'operations'
  }

  // Export Settings Functions
  const updateExportDataType = (key: string, value: boolean) => {
    setExportSettings(prev => ({
      ...prev,
      dataTypes: {
        ...prev.dataTypes,
        [key]: value
      }
    }))
  }

  const updateExportCategory = (key: string, value: boolean) => {
    setExportSettings(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [key]: value
      }
    }))
  }

  const updateExportSetting = (key: string, value: any) => {
    setExportSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Export Budget Data Function
  const exportBudgetData = async () => {
    if (isExporting) return
    
    setIsExporting(true)
    setExportProgress(0)
    
    const exportStages = [
      { name: "Preparing budget data...", duration: 1500 },
      { name: "Collecting allocation details...", duration: 2000 },
      { name: "Gathering variance reports...", duration: 1800 },
      { name: "Processing performance metrics...", duration: 2200 },
      { name: "Generating charts and visualizations...", duration: 2500 },
      { name: "Formatting export file...", duration: 2000 },
      { name: "Finalizing export...", duration: 1000 }
    ]
    
    let totalProgress = 0
    const progressPerStage = 100 / exportStages.length
    
    for (let i = 0; i < exportStages.length; i++) {
      setExportStage(exportStages[i].name)
      
      // Simulate gradual progress within each stage
      const stageStartProgress = totalProgress
      const steps = 20
      const stepDuration = exportStages[i].duration / steps
      
      for (let step = 0; step < steps; step++) {
        await new Promise(resolve => setTimeout(resolve, stepDuration))
        const stageProgress = stageStartProgress + (progressPerStage * (step + 1) / steps)
        setExportProgress(Math.min(stageProgress, 100))
      }
      
      totalProgress += progressPerStage
    }
    
    // Simulate file generation and download
    const timestamp = new Date().toISOString().split('T')[0]
    const selectedCategories = Object.entries(exportSettings.categories)
      .filter(([_, selected]) => selected)
      .map(([category, _]) => category)
      .join('_')
    
    const fileName = `budget_export_${selectedCategories}_${timestamp}.${exportSettings.format}`
    
    // In a real app, this would trigger the actual file download
    const link = document.createElement('a')
    link.href = '#' // This would be a generated file URL
    link.download = fileName
    
    setExportProgress(100)
    setExportStage("Export completed successfully!")
    setLastExportTime("Just now")
    
    // Reset after completion
    setTimeout(() => {
      setIsExporting(false)
      setExportProgress(0)
      setExportStage("")
      setShowExportDialog(false)
      // Show success message
      alert(`Budget export completed! File: ${fileName}`)
    }, 1500)
  }

  // Reallocation function
  const performReallocation = async () => {
    if (isReallocating) return
    
    setIsReallocating(true)
    setReallocationProgress(0)
    
    const stages = [
      { name: "Validating allocation changes...", duration: 1500 },
      { name: "Checking budget constraints...", duration: 2000 },
      { name: "Analyzing impact on operations...", duration: 2500 },
      { name: "Updating budget allocations...", duration: 2000 },
      { name: "Recalculating utilization metrics...", duration: 1500 },
      { name: "Generating allocation reports...", duration: 1000 },
      { name: "Finalizing changes...", duration: 500 }
    ]
    
    let totalProgress = 0
    const progressPerStage = 100 / stages.length
    
    for (let i = 0; i < stages.length; i++) {
      setReallocationStage(stages[i].name)
      
      // Simulate gradual progress within each stage
      const stageStartProgress = totalProgress
      const steps = 20
      const stepDuration = stages[i].duration / steps
      
      for (let step = 0; step < steps; step++) {
        await new Promise(resolve => setTimeout(resolve, stepDuration))
        const stageProgress = stageStartProgress + (progressPerStage * (step + 1) / steps)
        setReallocationProgress(Math.min(stageProgress, 100))
      }
      
      totalProgress += progressPerStage
    }
    
    setReallocationProgress(100)
    setReallocationStage("Reallocation completed successfully!")
    
    // Reset after completion
    setTimeout(() => {
      setIsReallocating(false)
      setReallocationProgress(0)
      setReallocationStage("")
      setShowReallocationDialog(false)
      // In a real app, you would update the actual allocation data here
    }, 2000)
  }

  useEffect(() => {
    // Budget Overview Chart
    const canvas = budgetOverviewRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    const width = canvas.offsetWidth
    const height = canvas.offsetHeight

    ctx.clearRect(0, 0, width, height)

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const budgeted = [800, 820, 850, 880, 900, 920, 950, 980, 1000, 1020, 1050, 1080]
    const actual = [780, 840, 820, 920, 890, 940, 980, 960, 1020, 980, 1070, 1100]

    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    const maxValue = Math.max(...budgeted, ...actual)

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

    // Draw month labels
    months.forEach((month, index) => {
      const x = padding + (chartWidth / (months.length - 1)) * index
      ctx.fillStyle = "#64748b"
      ctx.font = "10px Inter"
      ctx.textAlign = "center"
      ctx.fillText(month, x, height - 10)
    })

    // Draw lines
    const drawLine = (data: number[], color: string, lineWidth = 3, isDashed = false) => {
      ctx.strokeStyle = color
      ctx.lineWidth = lineWidth
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      if (isDashed) {
        ctx.setLineDash([8, 4])
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

      // Draw points
      ctx.setLineDash([])
      ctx.fillStyle = color
      data.forEach((value, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index
        const y = height - padding - (value / maxValue) * chartHeight

        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    drawLine(budgeted, "#3b82f6", 3, true)
    drawLine(actual, "#10b981", 3)
  }, [])

  useEffect(() => {
    // Variance Chart
    const canvas = varianceChartRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    const width = canvas.offsetWidth
    const height = canvas.offsetHeight

    ctx.clearRect(0, 0, width, height)

    const categories = ["Operations", "Marketing", "R&D", "Sales", "Admin"]
    const variance = [5, -8, 12, -3, 7] // Percentage variance
    const colors = variance.map(v => v >= 0 ? "#10b981" : "#ef4444")

    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2
    const barHeight = chartHeight / categories.length * 0.6
    const barSpacing = chartHeight / categories.length

    const maxVariance = Math.max(...variance.map(Math.abs))

    categories.forEach((category, index) => {
      const value = variance[index]
      const barWidth = Math.abs(value) / maxVariance * (chartWidth / 2)
      const y = padding + index * barSpacing + (barSpacing - barHeight) / 2
      const centerX = width / 2

      // Draw bar
      ctx.fillStyle = colors[index]
      if (value >= 0) {
        ctx.fillRect(centerX, y, barWidth, barHeight)
      } else {
        ctx.fillRect(centerX - barWidth, y, barWidth, barHeight)
      }

      // Category labels
      ctx.fillStyle = "#e2e8f0"
      ctx.font = "12px Inter"
      ctx.textAlign = "center"
      ctx.fillText(category, centerX, y - 8)

      // Value labels
      ctx.textAlign = "center"
      ctx.fillText(`${value > 0 ? '+' : ''}${value}%`, centerX, y + barHeight / 2 + 4)
    })

    // Draw center line
    ctx.strokeStyle = "#64748b"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(width / 2, padding)
    ctx.lineTo(width / 2, height - padding)
    ctx.stroke()
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
    const outerRadius = Math.min(width, height) / 2 - 20
    const innerRadius = outerRadius * 0.6

    ctx.clearRect(0, 0, width, height)

    const data = [
      { label: "Operations", value: 40, color: "#3b82f6" },
      { label: "Marketing", value: 25, color: "#10b981" },
      { label: "R&D", value: 20, color: "#f59e0b" },
      { label: "Sales", value: 10, color: "#8b5cf6" },
      { label: "Admin", value: 5, color: "#ef4444" },
    ]

    let currentAngle = -Math.PI / 2

    data.forEach((item) => {
      const sliceAngle = (item.value / 100) * 2 * Math.PI

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, outerRadius, currentAngle, currentAngle + sliceAngle)
      ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true)
      ctx.closePath()
      ctx.fillStyle = item.color
      ctx.fill()

      currentAngle += sliceAngle
    })

    // Center text
    ctx.fillStyle = "#e2e8f0"
    ctx.font = "16px Inter"
    ctx.textAlign = "center"
    ctx.fillText("Budget", centerX, centerY - 5)
    ctx.font = "12px Inter"
    ctx.fillStyle = "#64748b"
    ctx.fillText("Allocation", centerX, centerY + 15)
  }, [])

  return (
    <>
      <div className="flex-1 bg-slate-950 text-slate-100">
        {/* Header */}
        <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">Budget Management</h1>
                <p className="text-slate-400 mt-1">Plan, track, and manage your financial budgets</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  FY 2024
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  New Budget
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Budget Overview Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Total Budget</CardTitle>
                <Target className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">$11.2M</div>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">+5.2%</span>
                  <span className="text-sm text-slate-400 ml-1">vs last year</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Spent to Date</CardTitle>
                <DollarSign className="h-4 w-4 text-orange-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">$9.8M</div>
                <div className="flex items-center mt-2">
                  <Clock className="w-4 h-4 text-blue-400 mr-1" />
                  <span className="text-sm text-blue-400">87.5%</span>
                  <span className="text-sm text-slate-400 ml-1">of budget</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Variance</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">+2.3%</div>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">Under</span>
                  <span className="text-sm text-slate-400 ml-1">budget</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Budget Health</CardTitle>
                <Activity className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">Excellent</div>
                <div className="flex items-center mt-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">On track</span>
                  <span className="text-sm text-slate-400 ml-1">92% score</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Budget Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-slate-800 border-slate-700">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="planning">Planning</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Enhanced Budget vs Actual Chart */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white flex items-center gap-2">
                        <LineChart className="w-5 h-5 text-blue-400" />
                        Budget vs Actual Performance
                      </CardTitle>
                      <p className="text-slate-400 text-sm mt-1">Monthly budget comparison with variance analysis</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                        <SelectTrigger className="w-32 bg-slate-800 border-slate-700 text-slate-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="6months">6 Months</SelectItem>
                          <SelectItem value="12months">12 Months</SelectItem>
                          <SelectItem value="24months">24 Months</SelectItem>
                        </SelectContent>
                      </Select>
                      <Dialog open={showBudgetDetails} onOpenChange={setShowBudgetDetails}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                            <Eye className="w-4 h-4 mr-2" />
                            Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-xl font-semibold text-white flex items-center gap-2">
                              <BarChart3 className="w-6 h-6 text-blue-400" />
                              Budget vs Actual - Detailed Analysis
                            </DialogTitle>
                          </DialogHeader>
                          
                          <div className="space-y-6 py-4">
                            {/* Summary Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                                <div className="flex items-center gap-2 mb-2">
                                  <Target className="w-5 h-5 text-blue-400" />
                                  <span className="text-slate-300 font-medium">Total Variance</span>
                                </div>
                                <div className="text-2xl font-bold text-green-400">+{budgetAnalysisData.totalVariance}%</div>
                                <div className="text-sm text-slate-400">Under budget</div>
                              </div>
                              
                              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                                <div className="flex items-center gap-2 mb-2">
                                  <DollarSign className="w-5 h-5 text-green-400" />
                                  <span className="text-slate-300 font-medium">Favorable Variance</span>
                                </div>
                                <div className="text-2xl font-bold text-green-400">
                                  ${(budgetAnalysisData.favorableVariance / 1000).toFixed(0)}K
                                </div>
                                <div className="text-sm text-slate-400">Cost savings</div>
                              </div>
                              
                              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                                <div className="flex items-center gap-2 mb-2">
                                  <AlertTriangle className="w-5 h-5 text-orange-400" />
                                  <span className="text-slate-300 font-medium">Unfavorable Variance</span>
                                </div>
                                <div className="text-2xl font-bold text-orange-400">
                                  ${(budgetAnalysisData.unfavorableVariance / 1000).toFixed(0)}K
                                </div>
                                <div className="text-sm text-slate-400">Overspend</div>
                              </div>
                              
                              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                                <div className="flex items-center gap-2 mb-2">
                                  <Brain className="w-5 h-5 text-purple-400" />
                                  <span className="text-slate-300 font-medium">Accuracy Score</span>
                                </div>
                                <div className="text-2xl font-bold text-purple-400">{budgetAnalysisData.accuracyScore}%</div>
                                <div className="text-sm text-slate-400">Forecast accuracy</div>
                              </div>
                            </div>

                            {/* Monthly Breakdown Table */}
                            <div className="space-y-4">
                              <h3 className="text-lg font-medium text-white border-b border-slate-700 pb-2">Monthly Performance Breakdown</h3>
                              
                              <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className="border-b border-slate-700">
                                      <th className="text-left text-slate-300 font-medium py-2">Month</th>
                                      <th className="text-right text-slate-300 font-medium py-2">Budgeted</th>
                                      <th className="text-right text-slate-300 font-medium py-2">Actual</th>
                                      <th className="text-right text-slate-300 font-medium py-2">Variance</th>
                                      <th className="text-right text-slate-300 font-medium py-2">Variance %</th>
                                      <th className="text-center text-slate-300 font-medium py-2">Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {budgetData.months.map((month, index) => {
                                      const budgeted = budgetData.budgeted[index]
                                      const actual = budgetData.actual[index]
                                      const variance = budgeted - actual
                                      const variancePercent = ((variance / budgeted) * 100).toFixed(1)
                                      const isPositive = variance >= 0
                                      
                                      return (
                                        <tr key={month} className="border-b border-slate-800">
                                          <td className="py-3 text-slate-300">{month} 2024</td>
                                          <td className="py-3 text-right text-slate-300">${budgeted}K</td>
                                          <td className="py-3 text-right text-slate-300">${actual}K</td>
                                          <td className={`py-3 text-right font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                                            {isPositive ? '+' : ''}${variance}K
                                          </td>
                                          <td className={`py-3 text-right font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                                            {isPositive ? '+' : ''}{variancePercent}%
                                          </td>
                                          <td className="py-3 text-center">
                                            <Badge 
                                              variant="outline" 
                                              className={`text-xs ${
                                                Math.abs(parseFloat(variancePercent)) <= 5
                                                  ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                  : Math.abs(parseFloat(variancePercent)) <= 10
                                                  ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                                  : 'bg-red-500/10 text-red-400 border-red-500/20'
                                              }`}
                                            >
                                              {Math.abs(parseFloat(variancePercent)) <= 5 ? 'On Track' :
                                               Math.abs(parseFloat(variancePercent)) <= 10 ? 'Monitor' : 'Alert'}
                                            </Badge>
                                          </td>
                                        </tr>
                                      )
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>

                            {/* Insights and Recommendations */}
                            <div className="space-y-4">
                              <h3 className="text-lg font-medium text-white border-b border-slate-700 pb-2">AI Insights & Recommendations</h3>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/30">
                                  <div className="flex items-center gap-2 mb-3">
                                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                                    <h4 className="text-slate-300 font-medium">Key Insights</h4>
                                  </div>
                                  <ul className="space-y-2 text-sm text-slate-400">
                                    <li className="flex items-start gap-2">
                                      <CheckCircle2 className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                                      Overall budget performance is favorable with 2.3% savings
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <AlertCircle className="w-3 h-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                                      Marketing exceeded budget by 8% due to expansion campaigns
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <CheckCircle2 className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                                      R&D shows consistent underspend indicating planning opportunity
                                    </li>
                                  </ul>
                                </div>
                                
                                <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/30">
                                  <div className="flex items-center gap-2 mb-3">
                                    <Target className="w-5 h-5 text-blue-400" />
                                    <h4 className="text-slate-300 font-medium">Recommendations</h4>
                                  </div>
                                  <ul className="space-y-2 text-sm text-slate-400">
                                    <li className="flex items-start gap-2">
                                      <ChevronRight className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
                                      Reallocate unused R&D budget to marketing for Q4 push
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <ChevronRight className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
                                      Implement tighter controls on marketing campaign spending
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <ChevronRight className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
                                      Update Q1 2025 budgets based on current variance patterns
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                              <div className="flex items-center gap-2 text-sm text-slate-400">
                                <Info className="w-4 h-4" />
                                <span>Data updated daily at 6:00 AM</span>
                              </div>
                              
                              <div className="flex gap-3">
                                <Button 
                                  variant="outline" 
                                  onClick={() => setShowBudgetDetails(false)}
                                  className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white hover:border-slate-600"
                                >
                                  Close
                                </Button>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                  <Download className="w-4 h-4 mr-2" />
                                  Export Report
                                </Button>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                  
                  {/* Enhanced legend and summary */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 border-2 border-blue-500 rounded-full bg-transparent"></div>
                        <span className="text-slate-400">Budgeted ($11.2M)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-slate-400">Actual ($10.9M)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ArrowUpRight className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-medium">+2.3% under budget</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Performing Well
                      </Badge>
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">
                        {budgetAnalysisData.accuracyScore}% Accuracy
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-80">
                    <canvas ref={budgetOverviewRef} className="w-full h-full" />
                  </div>
                  
                  {/* Quick insights below chart */}
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-700">
                    <div className="text-center">
                      <div className="text-slate-400 text-xs">YTD Savings</div>
                      <div className="text-green-400 font-bold text-lg">$255K</div>
                      <div className="text-slate-500 text-xs">2.3% under budget</div>
                    </div>
                    <div className="text-center">
                      <div className="text-slate-400 text-xs">Largest Variance</div>
                      <div className="text-blue-400 font-bold text-lg">R&D +12%</div>
                      <div className="text-slate-500 text-xs">$269K underspend</div>
                    </div>
                    <div className="text-center">
                      <div className="text-slate-400 text-xs">Risk Level</div>
                      <div className="text-green-400 font-bold text-lg">Low</div>
                      <div className="text-slate-500 text-xs">Stable performance</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Enhanced Variance Analysis */}
                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-white flex items-center gap-2">
                          <BarChart3 className="w-5 h-5 text-purple-400" />
                          Variance Analysis
                        </CardTitle>
                        <p className="text-slate-400 text-sm mt-1">Budget variance by category with trend analysis</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Dialog open={showVarianceDetails} onOpenChange={setShowVarianceDetails}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                              <Calculator className="w-4 h-4 mr-2" />
                              Analyze
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-5xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-xl font-semibold text-white flex items-center gap-2">
                                <BarChart3 className="w-6 h-6 text-purple-400" />
                                Detailed Variance Analysis
                              </DialogTitle>
                            </DialogHeader>
                            
                            <div className="space-y-6 py-4">
                              {/* Variance Summary */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                                  <div className="flex items-center gap-2 mb-2">
                                    <TrendingUp className="w-5 h-5 text-green-400" />
                                    <span className="text-slate-300 font-medium">Favorable Variances</span>
                                  </div>
                                  <div className="text-2xl font-bold text-green-400">3</div>
                                  <div className="text-sm text-slate-400">Categories under budget</div>
                                </div>
                                
                                <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                                  <div className="flex items-center gap-2 mb-2">
                                    <TrendingDown className="w-5 h-5 text-red-400" />
                                    <span className="text-slate-300 font-medium">Unfavorable Variances</span>
                                  </div>
                                  <div className="text-2xl font-bold text-red-400">2</div>
                                  <div className="text-sm text-slate-400">Categories over budget</div>
                                </div>
                                
                                <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Target className="w-5 h-5 text-blue-400" />
                                    <span className="text-slate-300 font-medium">Net Impact</span>
                                  </div>
                                  <div className="text-2xl font-bold text-green-400">+$67.4K</div>
                                  <div className="text-sm text-slate-400">Total favorable variance</div>
                                </div>
                              </div>

                              {/* Detailed Category Analysis */}
                              <div className="space-y-4">
                                <h3 className="text-lg font-medium text-white border-b border-slate-700 pb-2">Category Breakdown</h3>
                                
                                <div className="space-y-4">
                                  {varianceData.map((item, index) => (
                                    <div key={item.category} className="p-4 border border-slate-700 rounded-lg bg-slate-800/30">
                                      <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                          <h4 className="text-slate-300 font-medium">{item.category}</h4>
                                          <Badge 
                                            variant="outline" 
                                            className={`text-xs ${
                                              item.impact === "Favorable"
                                                ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                : 'bg-red-500/10 text-red-400 border-red-500/20'
                                            }`}
                                          >
                                            {item.impact}
                                          </Badge>
                                        </div>
                                        <div className="text-right">
                                          <div className={`text-lg font-bold ${item.variance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                            {item.variance >= 0 ? '+' : ''}{item.variance}%
                                          </div>
                                          <div className="text-sm text-slate-400">
                                            ${((item.budgeted - item.actual) / 1000).toFixed(0)}K variance
                                          </div>
                                        </div>
                                      </div>
                                      
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                                        <div>
                                          <div className="text-xs text-slate-400">Budgeted</div>
                                          <div className="text-slate-300 font-medium">${(item.budgeted / 1000).toFixed(0)}K</div>
                                        </div>
                                        <div>
                                          <div className="text-xs text-slate-400">Actual</div>
                                          <div className="text-slate-300 font-medium">${(item.actual / 1000).toFixed(0)}K</div>
                                        </div>
                                        <div>
                                          <div className="text-xs text-slate-400">Utilization</div>
                                          <div className="text-slate-300 font-medium">{((item.actual / item.budgeted) * 100).toFixed(1)}%</div>
                                        </div>
                                      </div>
                                      
                                      <div className="p-3 rounded-lg bg-slate-700/30 border border-slate-600">
                                        <div className="text-xs text-slate-400 mb-1">Analysis</div>
                                        <div className="text-sm text-slate-300">{item.reason}</div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Variance Insights */}
                              <div className="space-y-4">
                                <h3 className="text-lg font-medium text-white border-b border-slate-700 pb-2">Variance Insights</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/30">
                                    <div className="flex items-center gap-2 mb-3">
                                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                                      <h4 className="text-slate-300 font-medium">Risk Areas</h4>
                                    </div>
                                    <ul className="space-y-2 text-sm text-slate-400">
                                      <li className="flex items-start gap-2">
                                        <AlertCircle className="w-3 h-3 text-red-400 mt-0.5 flex-shrink-0" />
                                        Marketing overspend trend requires immediate attention
                                      </li>
                                      <li className="flex items-start gap-2">
                                        <AlertCircle className="w-3 h-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                                        Sales variance shows declining trend
                                      </li>
                                      <li className="flex items-start gap-2">
                                        <Info className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
                                        R&D underspend may indicate resource allocation issues
                                      </li>
                                    </ul>
                                  </div>
                                  
                                  <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/30">
                                    <div className="flex items-center gap-2 mb-3">
                                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                                      <h4 className="text-slate-300 font-medium">Opportunities</h4>
                                    </div>
                                    <ul className="space-y-2 text-sm text-slate-400">
                                      <li className="flex items-start gap-2">
                                        <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                                        Operations efficiency gains can be replicated
                                      </li>
                                      <li className="flex items-start gap-2">
                                        <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                                        R&D savings available for strategic reallocation
                                      </li>
                                      <li className="flex items-start gap-2">
                                        <Lightbulb className="w-3 h-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                                        Automation opportunities in Admin functions
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>

                              {/* Action Items */}
                              <div className="space-y-4">
                                <h3 className="text-lg font-medium text-white border-b border-slate-700 pb-2">Recommended Actions</h3>
                                
                                <div className="space-y-3">
                                  <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <div className="text-red-400 font-medium text-sm">High Priority</div>
                                      <div className="text-slate-300 text-sm">Review marketing spend authorization process to prevent future overruns</div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
                                    <Clock className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <div className="text-yellow-400 font-medium text-sm">Medium Priority</div>
                                      <div className="text-slate-300 text-sm">Investigate R&D underspend and consider budget reallocation for Q4</div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                                    <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <div className="text-blue-400 font-medium text-sm">Low Priority</div>
                                      <div className="text-slate-300 text-sm">Document operations efficiency practices for organizational learning</div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                                <div className="flex items-center gap-2 text-sm text-slate-400">
                                  <RefreshCw className="w-4 h-4" />
                                  <span>Analysis updated hourly</span>
                                </div>
                                
                                <div className="flex gap-3">
                                  <Button 
                                    variant="outline" 
                                    onClick={() => setShowVarianceDetails(false)}
                                    className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white hover:border-slate-600"
                                  >
                                    Close
                                  </Button>
                                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                                    <FileText className="w-4 h-4 mr-2" />
                                    Generate Action Plan
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full h-64 mb-4">
                      <canvas ref={varianceChartRef} className="w-full h-full" />
                    </div>
                    
                    {/* Quick variance summary */}
                    <div className="space-y-3">
                      {varianceData.slice(0, 3).map((item, index) => (
                        <div key={item.category} className="flex items-center justify-between p-2 rounded-lg bg-slate-800/30">
                          <div className="flex items-center gap-3">
                            <div className="text-slate-300 text-sm font-medium">{item.category}</div>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                item.impact === "Favorable"
                                  ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                  : 'bg-red-500/10 text-red-400 border-red-500/20'
                              }`}
                            >
                              {item.impact}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`text-sm font-medium ${item.variance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {item.variance >= 0 ? '+' : ''}{item.variance}%
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Budget Health */}
                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white">Budget Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-300">Operations</span>
                        <span className="text-sm text-green-400">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                      <p className="text-xs text-slate-500 mt-1">$3.68M / $4.0M</p>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-300">Marketing</span>
                        <span className="text-sm text-orange-400">108%</span>
                      </div>
                      <Progress value={100} className="h-2" />
                      <p className="text-xs text-slate-500 mt-1">$2.7M / $2.5M</p>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-300">R&D</span>
                        <span className="text-sm text-blue-400">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                      <p className="text-xs text-slate-500 mt-1">$1.56M / $2.0M</p>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-300">Sales</span>
                        <span className="text-sm text-green-400">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                      <p className="text-xs text-slate-500 mt-1">$0.85M / $1.0M</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="categories" className="space-y-6">
              {/* Categories Sub-tabs */}
              <Tabs defaultValue="allocation" className="space-y-6">
                <TabsList className="bg-slate-800 border-slate-700">
                  <TabsTrigger value="allocation">Budget Allocation</TabsTrigger>
                  <TabsTrigger value="export">Export</TabsTrigger>
                </TabsList>

                <TabsContent value="allocation" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="bg-slate-900 border-slate-800">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                          <PieChart className="w-5 h-5 text-blue-400" />
                          Budget Allocation
                        </CardTitle>
                        <p className="text-slate-400">Strategic budget distribution with AI optimization</p>
                      </CardHeader>
                      <CardContent>
                        <div className="w-full h-64 mb-4">
                          <canvas ref={categoryBreakdownRef} className="w-full h-full" />
                        </div>
                        
                        {/* Allocation summary */}
                        <div className="space-y-3">
                          {allocationData.map((item, index) => (
                            <div key={item.category} className="flex items-center justify-between p-2 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                              <div className="flex items-center gap-3">
                                <div 
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: item.color }}
                                />
                                <span className="text-sm text-slate-300 font-medium">{item.category}</span>
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${
                                    item.utilization > 100 
                                      ? 'bg-red-500/10 text-red-400 border-red-500/20'
                                      : item.utilization > 95
                                      ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                      : 'bg-green-500/10 text-green-400 border-green-500/20'
                                  }`}
                                >
                                  {item.utilization}% utilized
                                </Badge>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="text-right">
                                  <div className="text-sm text-slate-400">{item.currentAllocation}% - ${(item.currentAmount / 1000000).toFixed(1)}M</div>
                                  <div className="text-xs text-slate-500">ROI: {item.roi}x | Efficiency: {item.efficiency}%</div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-400" />
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Action buttons */}
                        <div className="flex items-center justify-end gap-2 mt-4">
                          <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-500 hover:text-white hover:border-slate-600 text-xs px-3 py-1.5 h-auto transition-colors">
                            <BarChart3 className="w-3 h-3 mr-1" />
                            Analyze
                          </Button>
                          <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-500 hover:text-white hover:border-slate-600 text-xs px-3 py-1.5 h-auto transition-colors">
                            <Settings className="w-3 h-3 mr-1" />
                            Reallocate
                          </Button>
                          <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-500 hover:text-white hover:border-slate-600 text-xs px-3 py-1.5 h-auto transition-colors">
                            <Download className="w-3 h-3 mr-1" />
                            Export
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-slate-800">
                      <CardHeader>
                        <CardTitle className="text-white">Category Performance</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="border border-slate-700 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-slate-300">Operations</span>
                            <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                              On Track
                            </Badge>
                          </div>
                          <div className="text-xs text-slate-500">$3.68M spent of $4.48M budget</div>
                          <div className="text-xs text-green-400">5% under budget</div>
                        </div>
                        <div className="border border-slate-700 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-slate-300">Marketing</span>
                            <Badge variant="outline" className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                              Over Budget
                            </Badge>
                          </div>
                          <div className="text-xs text-slate-500">$2.7M spent of $2.8M budget</div>
                          <div className="text-xs text-orange-400">8% over budget</div>
                        </div>
                        <div className="border border-slate-700 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-slate-300">R&D</span>
                            <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                              Under Used
                            </Badge>
                          </div>
                          <div className="text-xs text-slate-500">$1.56M spent of $2.24M budget</div>
                          <div className="text-xs text-blue-400">12% under budget</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="export" className="space-y-6">
                  <Card className="bg-slate-900 border-slate-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Download className="w-5 h-5 text-blue-400" />
                        Export Budget Data
                      </CardTitle>
                      <p className="text-slate-400">Export comprehensive budget reports and analysis</p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Export Options Overview */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="w-5 h-5 text-green-400" />
                            <span className="text-slate-300 font-medium">Available Formats</span>
                          </div>
                          <div className="text-sm text-slate-400 space-y-1">
                            <div>• Excel Workbooks (.xlsx)</div>
                            <div>• CSV Data Files (.csv)</div>
                            <div>• PDF Reports (.pdf)</div>
                            <div>• JSON Data (.json)</div>
                          </div>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                          <div className="flex items-center gap-2 mb-2">
                            <BarChart3 className="w-5 h-5 text-blue-400" />
                            <span className="text-slate-300 font-medium">Data Types</span>
                          </div>
                          <div className="text-sm text-slate-400 space-y-1">
                            <div>• Budget vs Actual Data</div>
                            <div>• Category Allocations</div>
                            <div>• Variance Analysis</div>
                            <div>• Performance Metrics</div>
                          </div>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-5 h-5 text-purple-400" />
                            <span className="text-slate-300 font-medium">Export Status</span>
                          </div>
                          <div className="text-sm text-slate-400 space-y-1">
                            <div>Last Export: {lastExportTime}</div>
                            <div>Status: {isExporting ? 'In Progress' : 'Ready'}</div>
                            <div>Est. Time: 2-3 minutes</div>
                          </div>
                        </div>
                      </div>

                      {/* Quick Export Actions */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-white border-b border-slate-700 pb-2">Quick Export Options</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="p-2 rounded-lg bg-blue-500/10">
                                <FileText className="w-6 h-6 text-blue-400" />
                              </div>
                              <div>
                                <h4 className="text-slate-300 font-medium">Full Budget Report</h4>
                                <p className="text-slate-400 text-sm">Complete budget analysis</p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="text-xs text-slate-400">
                                Includes: All categories, variance analysis, performance metrics
                              </div>
                              <Button 
                                size="sm" 
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                onClick={exportBudgetData}
                                disabled={isExporting}
                              >
                                <Download className="w-3 h-3 mr-2" />
                                Export Excel
                              </Button>
                            </div>
                          </div>
                          
                          <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="p-2 rounded-lg bg-green-500/10">
                                <PieChart className="w-6 h-6 text-green-400" />
                              </div>
                              <div>
                                <h4 className="text-slate-300 font-medium">Allocation Summary</h4>
                                <p className="text-slate-400 text-sm">Category breakdown only</p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="text-xs text-slate-400">
                                Includes: Category allocations, utilization rates, ROI metrics
                              </div>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="w-full bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white"
                                onClick={() => setShowExportDialog(true)}
                                disabled={isExporting}
                              >
                                <Download className="w-3 h-3 mr-2" />
                                Custom Export
                              </Button>
                            </div>
                          </div>
                          
                          <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="p-2 rounded-lg bg-purple-500/10">
                                <TrendingUp className="w-6 h-6 text-purple-400" />
                              </div>
                              <div>
                                <h4 className="text-slate-300 font-medium">Variance Report</h4>
                                <p className="text-slate-400 text-sm">Budget vs actual analysis</p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="text-xs text-slate-400">
                                Includes: Monthly variances, trends, forecast accuracy
                              </div>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="w-full bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white"
                                onClick={() => setShowExportDialog(true)}
                                disabled={isExporting}
                              >
                                <FileText className="w-3 h-3 mr-2" />
                                Export PDF
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Recent Exports */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-white border-b border-slate-700 pb-2">Recent Exports</h3>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 border border-slate-700">
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-blue-400" />
                              <div>
                                <div className="text-slate-300 font-medium">budget_full_report_2024-03-15.xlsx</div>
                                <div className="text-slate-400 text-sm">Generated 2 hours ago • 2.4 MB</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
                                Complete
                              </Badge>
                              <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 border border-slate-700">
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-green-400" />
                              <div>
                                <div className="text-slate-300 font-medium">allocation_summary_2024-03-14.csv</div>
                                <div className="text-slate-400 text-sm">Generated yesterday • 845 KB</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
                                Complete
                              </Badge>
                              <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 border border-slate-700">
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-purple-400" />
                              <div>
                                <div className="text-slate-300 font-medium">variance_analysis_2024-03-10.pdf</div>
                                <div className="text-slate-400 text-sm">Generated 5 days ago • 1.8 MB</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
                                Complete
                              </Badge>
                              <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Export Progress Display (when exporting) */}
                      {isExporting && (
                        <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/30">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Download className="w-5 h-5 text-blue-400 animate-pulse" />
                              <span className="text-white font-medium">Exporting Budget Data</span>
                            </div>
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                              {Math.round(exportProgress)}% Complete
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-slate-300 text-sm">{exportStage}</span>
                              <span className="text-slate-400 text-sm">{Math.round(exportProgress)}%</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-3">
                              <div 
                                className="bg-blue-400 h-3 rounded-full transition-all duration-300"
                                style={{ width: `${exportProgress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <Info className="w-4 h-4" />
                          <span>All exports include timestamp and metadata</span>
                        </div>
                        
                        <div className="flex gap-3">
                          <Button 
                            variant="outline" 
                            onClick={() => setShowExportDialog(true)}
                            className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white hover:border-slate-600"
                            disabled={isExporting}
                          >
                            <Settings className="w-4 h-4 mr-2" />
                            Advanced Export
                          </Button>
                          <Button 
                            onClick={exportBudgetData}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            disabled={isExporting}
                          >
                            <Download className={`w-4 h-4 mr-2 ${isExporting ? 'animate-pulse' : ''}`} />
                            {isExporting ? 'Exporting...' : 'Quick Export'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value="planning" className="space-y-6">
              {/* Budget Planning Dashboard */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-400" />
                      Budget Planning Calendar
                    </CardTitle>
                    <p className="text-slate-400">Strategic budget planning timeline and milestones</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-green-400" />
                          <span className="text-slate-300 text-sm font-medium">Q1 2025 Planning</span>
                        </div>
                        <div className="text-xs text-slate-400 space-y-1">
                          <div>• Budget review: Dec 15-20</div>
                          <div>• Department submissions: Dec 21-31</div>
                          <div>• Final approval: Jan 5</div>
                        </div>
                        <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-xs mt-2">
                          On Schedule
                        </Badge>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-400" />
                          <span className="text-slate-300 text-sm font-medium">Mid-Year Review</span>
                        </div>
                        <div className="text-xs text-slate-400 space-y-1">
                          <div>• Performance assessment: Jun 15</div>
                          <div>• Budget adjustments: Jun 20</div>
                          <div>• Reallocation approval: Jun 25</div>
                        </div>
                        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 text-xs mt-2">
                          Upcoming
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-slate-300 font-medium">Upcoming Tasks</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 rounded bg-slate-800/30">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-sm text-slate-300">Marketing budget proposal</span>
                          </div>
                          <span className="text-xs text-slate-400">Completed</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-slate-800/30">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-400" />
                            <span className="text-sm text-slate-300">R&D resource allocation</span>
                          </div>
                          <span className="text-xs text-slate-400">Due Dec 18</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-slate-800/30">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm text-slate-300">Operations budget review</span>
                          </div>
                          <span className="text-xs text-slate-400">Due Dec 20</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Target className="w-5 h-5 text-green-400" />
                      Budget Targets & Goals
                    </CardTitle>
                    <p className="text-slate-400">Financial objectives and performance targets</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-300 font-medium">Cost Reduction Target</span>
                          <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
                            Achieved
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3">
                          <Progress value={112} className="flex-1 h-2" />
                          <span className="text-sm text-green-400">112%</span>
                        </div>
                        <div className="text-xs text-slate-400 mt-1">Target: 5% | Actual: 5.6%</div>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-300 font-medium">Revenue Growth</span>
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">
                            On Track
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3">
                          <Progress value={85} className="flex-1 h-2" />
                          <span className="text-sm text-blue-400">85%</span>
                        </div>
                        <div className="text-xs text-slate-400 mt-1">Target: 12% | Current: 10.2%</div>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-300 font-medium">Operational Efficiency</span>
                          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 text-xs">
                            At Risk
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3">
                          <Progress value={68} className="flex-1 h-2" />
                          <span className="text-sm text-yellow-400">68%</span>
                        </div>
                        <div className="text-xs text-slate-400 mt-1">Target: 95% | Current: 64.6%</div>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-slate-700">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300 text-sm">Overall Progress</span>
                        <span className="text-blue-400 text-sm font-medium">88%</span>
                      </div>
                      <Progress value={88} className="h-2 mt-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Budget Scenarios & Forecasting */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-purple-400" />
                    Budget Scenarios & Forecasting
                  </CardTitle>
                  <p className="text-slate-400">Strategic planning scenarios and financial projections</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-5 h-5 text-green-400" />
                        <h4 className="text-green-400 font-medium">Optimistic Scenario</h4>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Revenue Growth:</span>
                          <span className="text-green-400">+18%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Cost Reduction:</span>
                          <span className="text-green-400">8%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Profit Margin:</span>
                          <span className="text-green-400">32%</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-xs mt-3">
                        75% Probability
                      </Badge>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-3">
                        <Activity className="w-5 h-5 text-blue-400" />
                        <h4 className="text-blue-400 font-medium">Realistic Scenario</h4>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Revenue Growth:</span>
                          <span className="text-blue-400">+12%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Cost Reduction:</span>
                          <span className="text-blue-400">5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Profit Margin:</span>
                          <span className="text-blue-400">28%</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs mt-3">
                        85% Probability
                      </Badge>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingDown className="w-5 h-5 text-yellow-400" />
                        <h4 className="text-yellow-400 font-medium">Conservative Scenario</h4>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Revenue Growth:</span>
                          <span className="text-yellow-400">+6%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Cost Reduction:</span>
                          <span className="text-yellow-400">3%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Profit Margin:</span>
                          <span className="text-yellow-400">24%</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 text-xs mt-3">
                        95% Probability
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-slate-300 font-medium mb-3">Key Planning Assumptions</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          <span className="text-slate-400">Market expansion into APAC region</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          <span className="text-slate-400">Product development cycle optimization</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-3 h-3 text-yellow-400" />
                          <span className="text-slate-400">Inflation impact on operational costs</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-3 h-3 text-yellow-400" />
                          <span className="text-slate-400">Supply chain stabilization timeline</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-slate-300 font-medium mb-3">Risk Factors</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between p-2 rounded bg-slate-800/30">
                          <span className="text-slate-400">Economic downturn</span>
                          <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20 text-xs">
                            High Impact
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-slate-800/30">
                          <span className="text-slate-400">Competition pressure</span>
                          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 text-xs">
                            Medium
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-slate-800/30">
                          <span className="text-slate-400">Regulatory changes</span>
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">
                            Low Impact
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              {/* Performance Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <LineChart className="w-5 h-5 text-blue-400" />
                      Budget Performance Analytics
                    </CardTitle>
                    <p className="text-slate-400">AI-powered budget analysis and insights</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-center">
                        <div className="text-2xl font-bold text-green-400">94.2%</div>
                        <div className="text-xs text-slate-400">Forecast Accuracy</div>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-center">
                        <div className="text-2xl font-bold text-blue-400">2.3%</div>
                        <div className="text-xs text-slate-400">Avg Variance</div>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-center">
                        <div className="text-2xl font-bold text-purple-400">87%</div>
                        <div className="text-xs text-slate-400">Efficiency Score</div>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-center">
                        <div className="text-2xl font-bold text-yellow-400">3</div>
                        <div className="text-xs text-slate-400">Risk Alerts</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-slate-300 font-medium">Performance Insights</h4>
                      <div className="space-y-2">
                        <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-green-400 text-sm font-medium">Positive Trend</span>
                          </div>
                          <p className="text-slate-400 text-xs">Operations showing consistent 5% cost savings</p>
                        </div>
                        <div className="p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
                          <div className="flex items-center gap-2 mb-1">
                            <AlertTriangle className="w-4 h-4 text-yellow-400" />
                            <span className="text-yellow-400 text-sm font-medium">Attention Needed</span>
                          </div>
                          <p className="text-slate-400 text-xs">Marketing spend trending 8% over budget</p>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                          <div className="flex items-center gap-2 mb-1">
                            <Lightbulb className="w-4 h-4 text-blue-400" />
                            <span className="text-blue-400 text-sm font-medium">Opportunity</span>
                          </div>
                          <p className="text-slate-400 text-xs">R&D underspend allows for strategic reallocation</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Brain className="w-5 h-5 text-purple-400" />
                      AI Budget Recommendations
                    </CardTitle>
                    <p className="text-slate-400">Machine learning insights and actionable recommendations</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-300 text-sm font-medium">Reallocation Opportunity</span>
                          <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
                            High Impact
                          </Badge>
                        </div>
                        <p className="text-slate-400 text-xs mb-2">
                          Move $180K from R&D to Marketing for Q4 campaign boost
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500">Confidence:</span>
                          <Progress value={92} className="flex-1 h-1" />
                          <span className="text-xs text-slate-400">92%</span>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-300 text-sm font-medium">Cost Optimization</span>
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">
                            Medium Impact
                          </Badge>
                        </div>
                        <p className="text-slate-400 text-xs mb-2">
                          Automate manual processes to reduce admin costs by 12%
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500">Confidence:</span>
                          <Progress value={78} className="flex-1 h-1" />
                          <span className="text-xs text-slate-400">78%</span>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-300 text-sm font-medium">Revenue Enhancement</span>
                          <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-xs">
                            High Value
                          </Badge>
                        </div>
                        <p className="text-slate-400 text-xs mb-2">
                          Increase sales team by 15% to capture market opportunities
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500">Confidence:</span>
                          <Progress value={85} className="flex-1 h-1" />
                          <span className="text-xs text-slate-400">85%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-slate-700">
                      <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                        <Brain className="w-4 h-4 mr-2" />
                        Generate More Insights
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Analysis Tables */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-green-400" />
                    Category Analysis Deep Dive
                  </CardTitle>
                  <p className="text-slate-400">Comprehensive category-wise performance breakdown</p>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-700">
                          <th className="text-left text-slate-300 font-medium py-3">Category</th>
                          <th className="text-right text-slate-300 font-medium py-3">Budget</th>
                          <th className="text-right text-slate-300 font-medium py-3">Actual</th>
                          <th className="text-right text-slate-300 font-medium py-3">Variance</th>
                          <th className="text-right text-slate-300 font-medium py-3">Efficiency</th>
                          <th className="text-right text-slate-300 font-medium py-3">ROI</th>
                          <th className="text-center text-slate-300 font-medium py-3">Trend</th>
                          <th className="text-center text-slate-300 font-medium py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {varianceData.map((item, index) => (
                          <tr key={index} className="border-b border-slate-800 hover:bg-slate-800/30">
                            <td className="py-3 text-slate-300 font-medium">{item.category}</td>
                            <td className="py-3 text-right text-slate-300">${(item.budgeted / 1000000).toFixed(1)}M</td>
                            <td className="py-3 text-right text-slate-300">${(item.actual / 1000000).toFixed(1)}M</td>
                            <td className={`py-3 text-right font-medium ${item.variance > 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {item.variance > 0 ? '+' : ''}{item.variance}%
                            </td>
                            <td className="py-3 text-right text-slate-300">
                              {allocationData.find(a => a.category === item.category)?.efficiency || 'N/A'}%
                            </td>
                            <td className="py-3 text-right text-slate-300">
                              {allocationData.find(a => a.category === item.category)?.roi || 'N/A'}x
                            </td>
                            <td className="py-3 text-center">
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${
                                  item.trend === 'Improving' 
                                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                    : item.trend === 'Declining'
                                    ? 'bg-red-500/10 text-red-400 border-red-500/20'
                                    : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                }`}
                              >
                                {item.trend}
                              </Badge>
                            </td>
                            <td className="py-3 text-center">
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${
                                  item.impact === 'Favorable' 
                                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                    : 'bg-red-500/10 text-red-400 border-red-500/20'
                                }`}
                              >
                                {item.impact}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
} 