"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  DollarSign,
  Target,
  AlertTriangle,
  CheckCircle,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Download,
  RefreshCw,
  Filter,
  Search,
  Settings,
  Zap,
  Brain,
  LineChart,
  Layers,
  Users,
  Building,
  Wallet,
  CreditCard,
  Globe,
  Clock,
  Star,
  ThumbsUp,
  ThumbsDown,
  Eye,
  PlayCircle,
  PauseCircle,
  Package,
  Upload,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Info,
  Cpu,
  Lightbulb,
  Minus,
} from "lucide-react"

export function ForecastingContent() {
  const [isRetraining, setIsRetraining] = useState(false)
  const [retrainingProgress, setRetrainingProgress] = useState(0)
  const [retrainingStage, setRetrainingStage] = useState("")
  const [modelPerformance, setModelPerformance] = useState({
    revenuePredictor: { accuracy: 94.2, lastTrained: "2 days ago", dataPoints: 24847, status: "Active" },
    cashFlowModel: { accuracy: 87.8, lastTrained: "1 hour ago", dataPoints: 18293, status: "Training" },
    marketAnalyzer: { accuracy: 79.5, lastTrained: "5 days ago", dataPoints: 12756, status: "Needs Update" }
  })
  const [showModelSettings, setShowModelSettings] = useState(false)
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  
  // Model Update State
  const [showModelUpdate, setShowModelUpdate] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateProgress, setUpdateProgress] = useState(0)
  const [updateStage, setUpdateStage] = useState("")
  const [updateResults, setUpdateResults] = useState<any[]>([])
  const [lastUpdateTime, setLastUpdateTime] = useState<string | null>("3 days ago")
  
  // Export Forecast State
  const [showExportForecast, setShowExportForecast] = useState(false)
  const [isExportingForecast, setIsExportingForecast] = useState(false)
  const [exportForecastProgress, setExportForecastProgress] = useState(0)
  const [exportForecastStage, setExportForecastStage] = useState("")
  const [lastExportTime, setLastExportTime] = useState<string | null>("Never")
  
  // AI Analysis State
  const [showAIAnalysis, setShowAIAnalysis] = useState(false)
  const [isRunningAnalysis, setIsRunningAnalysis] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisStage, setAnalysisStage] = useState("")
  const [analysisResults, setAnalysisResults] = useState<any[]>([])
  const [lastAnalysisTime, setLastAnalysisTime] = useState<string | null>("2 hours ago")
  const [aiAnalysisSettings, setAiAnalysisSettings] = useState({
    analysisTypes: {
      trendAnalysis: true,
      anomalyDetection: true,
      seasonalityAnalysis: true,
      riskAssessment: false,
      marketCorrelation: true,
      predictiveInsights: true
    },
    dataScope: "comprehensive",
    timeHorizon: "12months",
    confidenceLevel: 95,
    includeRecommendations: true,
    enableDeepLearning: false,
    analysisDepth: "standard"
  })
  const [forecastExportSettings, setForecastExportSettings] = useState({
    dataTypes: {
      scenarios: true,
      predictions: true,
      timelineForecast: true,
      marketFactors: false,
      modelMetrics: true,
      confidenceIntervals: true
    },
    scenarios: {
      optimistic: true,
      realistic: true,
      conservative: true,
      pessimistic: false
    },
    format: "xlsx",
    dateRange: "12months",
    includeHeaders: true,
    includeCharts: true,
    compression: false,
    detailLevel: "comprehensive"
  })
  const [exportSettings, setExportSettings] = useState({
    dataTypes: {
      trainingData: true,
      modelMetrics: true,
      predictions: false,
      parameters: false,
      performance: true,
      logs: false
    },
    format: "csv",
    dateRange: "all",
    includeHeaders: true,
    compression: false,
    models: {
      revenuePredictor: true,
      cashFlowModel: true,
      marketAnalyzer: false
    }
  })
  const [modelSettings, setModelSettings] = useState({
    autoRetrain: true,
    retrainFrequency: "weekly",
    accuracyThreshold: 85,
    dataRetention: "12months",
    enableNotifications: true,
    notificationEmail: "admin@company.com",
    learningRate: 0.001,
    epochs: 100,
    batchSize: 32,
    validationSplit: 0.2,
    enableEarlyStop: true,
    enableCrossValidation: true,
    featureSelection: "automatic",
    modelComplexity: "medium"
  })

  // Update Model Settings Function
  const updateModelSettings = (key: string, value: any) => {
    setModelSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Update Export Settings Function
  const updateExportSettings = (section: string, key: string, value: any) => {
    setExportSettings(prev => {
      if (section === 'dataTypes') {
        return {
          ...prev,
          dataTypes: {
            ...prev.dataTypes,
            [key]: value
          }
        }
      } else if (section === 'models') {
        return {
          ...prev,
          models: {
            ...prev.models,
            [key]: value
          }
        }
      }
      return prev
    })
  }

  const updateExportSetting = (key: string, value: any) => {
    setExportSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Export Model Data Function
  const exportModelData = async () => {
    if (isExporting) return
    
    setIsExporting(true)
    setExportProgress(0)
    
    const steps = [
      { name: "Preparing export data...", duration: 1500 },
      { name: "Collecting model metrics...", duration: 2000 },
      { name: "Gathering training data...", duration: 2500 },
      { name: "Formatting data...", duration: 2000 },
      { name: "Compressing files...", duration: 1500 },
      { name: "Finalizing export...", duration: 1000 }
    ]
    
    let totalProgress = 0
    const progressPerStep = 100 / steps.length
    
    for (let i = 0; i < steps.length; i++) {
      // Simulate gradual progress within each step
      const stepStartProgress = totalProgress
      const stepSteps = 20
      const stepDuration = steps[i].duration / stepSteps
      
      for (let step = 0; step < stepSteps; step++) {
        await new Promise(resolve => setTimeout(resolve, stepDuration))
        const stepProgress = stepStartProgress + (progressPerStep * (step + 1) / stepSteps)
        setExportProgress(Math.min(stepProgress, 100))
      }
      
      totalProgress += progressPerStep
    }
    
    // Simulate file download
    const fileName = `model_data_export_${new Date().toISOString().split('T')[0]}.${exportSettings.format}`
    const link = document.createElement('a')
    link.href = '#' // In a real app, this would be a generated file URL
    link.download = fileName
    
    setExportProgress(100)
    
    // Reset after completion
    setTimeout(() => {
      setIsExporting(false)
      setExportProgress(0)
      setShowExportDialog(false)
      // Show success message (in a real app, you'd trigger the actual download here)
      alert(`Export completed! File: ${fileName}`)
    }, 1000)
  }

  // Retrain Models Function
  const retrainModels = async () => {
    if (isRetraining) return
    
    setIsRetraining(true)
    setRetrainingProgress(0)
    
    const stages = [
      { name: "Preparing data...", duration: 2000 },
      { name: "Feature engineering...", duration: 3000 },
      { name: "Training revenue model...", duration: 4000 },
      { name: "Training cash flow model...", duration: 3500 },
      { name: "Training market analyzer...", duration: 2500 },
      { name: "Validating models...", duration: 2000 },
      { name: "Finalizing deployment...", duration: 1500 }
    ]
    
    let totalProgress = 0
    const progressPerStage = 100 / stages.length
    
    for (let i = 0; i < stages.length; i++) {
      setRetrainingStage(stages[i].name)
      
      // Simulate gradual progress within each stage
      const stageStartProgress = totalProgress
      const stageEndProgress = totalProgress + progressPerStage
      const steps = 20
      const stepDuration = stages[i].duration / steps
      
      for (let step = 0; step < steps; step++) {
        await new Promise(resolve => setTimeout(resolve, stepDuration))
        const stageProgress = stageStartProgress + (progressPerStage * (step + 1) / steps)
        setRetrainingProgress(Math.min(stageProgress, 100))
      }
      
      totalProgress += progressPerStage
    }
    
    // Update model performance after retraining
    setModelPerformance({
      revenuePredictor: { 
        accuracy: 96.7, 
        lastTrained: "Just now", 
        dataPoints: 25143, 
        status: "Active" 
      },
      cashFlowModel: { 
        accuracy: 91.3, 
        lastTrained: "Just now", 
        dataPoints: 18567, 
        status: "Active" 
      },
      marketAnalyzer: { 
        accuracy: 84.2, 
        lastTrained: "Just now", 
        dataPoints: 13089, 
        status: "Active" 
      }
    })
    
    setRetrainingProgress(100)
    setRetrainingStage("Retraining completed successfully!")
    
    // Reset after showing completion message
    setTimeout(() => {
      setIsRetraining(false)
      setRetrainingProgress(0)
      setRetrainingStage("")
    }, 2000)
  }

  // Model Update Function
  const performModelUpdate = async () => {
    if (isUpdating) return
    
    setIsUpdating(true)
    setUpdateProgress(0)
    setUpdateResults([])
    
    const updateOperations = [
      { name: "Checking model versions...", duration: 1500 },
      { name: "Downloading latest algorithms...", duration: 3000 },
      { name: "Validating new parameters...", duration: 2000 },
      { name: "Backing up current models...", duration: 2500 },
      { name: "Installing updates...", duration: 3500 },
      { name: "Testing updated models...", duration: 2500 },
      { name: "Optimizing performance...", duration: 2000 },
      { name: "Finalizing updates...", duration: 1000 }
    ]
    
    let totalProgress = 0
    const progressPerOperation = 100 / updateOperations.length
    
    const results = []
    
    for (let i = 0; i < updateOperations.length; i++) {
      setUpdateStage(updateOperations[i].name)
      
      // Simulate gradual progress within each operation
      const operationStartProgress = totalProgress
      const steps = 20
      const stepDuration = updateOperations[i].duration / steps
      
      for (let step = 0; step < steps; step++) {
        await new Promise(resolve => setTimeout(resolve, stepDuration))
        const operationProgress = operationStartProgress + (progressPerOperation * (step + 1) / steps)
        setUpdateProgress(Math.min(operationProgress, 100))
      }
      
      // Add realistic update results
      switch (i) {
        case 0: // Version check
          results.push({
            component: "Revenue Predictor",
            currentVersion: "v2.4.1",
            newVersion: "v2.5.0",
            status: "update_available",
            improvements: ["Enhanced accuracy by 2.3%", "Reduced processing time by 15%"]
          })
          results.push({
            component: "Cash Flow Model",
            currentVersion: "v1.8.2",
            newVersion: "v1.9.0",
            status: "update_available", 
            improvements: ["Better seasonal predictions", "Improved confidence intervals"]
          })
          break
        case 1: // Download
          results.push({
            component: "Market Analyzer",
            currentVersion: "v3.1.0",
            newVersion: "v3.2.1",
            status: "downloading",
            improvements: ["New sentiment analysis", "Real-time data integration"]
          })
          break
        case 4: // Installing
          results.forEach(result => {
            result.status = "installing"
          })
          break
        case 5: // Testing
          results.forEach(result => {
            result.status = "testing"
          })
          break
        case 7: // Complete
          results.forEach(result => {
            result.status = "updated"
          })
          break
      }
      
      setUpdateResults([...results])
      totalProgress += progressPerOperation
    }
    
    // Update model performance with new versions
    setModelPerformance({
      revenuePredictor: { 
        accuracy: 96.5, 
        lastTrained: "Just now", 
        dataPoints: 25143, 
        status: "Active" 
      },
      cashFlowModel: { 
        accuracy: 89.6, 
        lastTrained: "Just now", 
        dataPoints: 18567, 
        status: "Active" 
      },
      marketAnalyzer: { 
        accuracy: 82.8, 
        lastTrained: "Just now", 
        dataPoints: 13489, 
        status: "Active" 
      }
    })
    
    setUpdateProgress(100)
    setUpdateStage("Model updates completed successfully!")
    setLastUpdateTime("Just now")
    
    // Reset after showing completion
    setTimeout(() => {
      setIsUpdating(false)
      setUpdateProgress(0)
      setUpdateStage("")
    }, 2000)
  }

  // Forecast Export Settings Functions
  const updateForecastExportDataType = (key: string, value: boolean) => {
    setForecastExportSettings(prev => ({
      ...prev,
      dataTypes: {
        ...prev.dataTypes,
        [key]: value
      }
    }))
  }

  const updateForecastExportScenario = (key: string, value: boolean) => {
    setForecastExportSettings(prev => ({
      ...prev,
      scenarios: {
        ...prev.scenarios,
        [key]: value
      }
    }))
  }

  const updateForecastExportSetting = (key: string, value: any) => {
    setForecastExportSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Export Forecast Function
  const exportForecastData = async () => {
    if (isExportingForecast) return
    
    setIsExportingForecast(true)
    setExportForecastProgress(0)
    
    const exportStages = [
      { name: "Preparing forecast data...", duration: 1500 },
      { name: "Generating scenario analysis...", duration: 2500 },
      { name: "Compiling prediction timelines...", duration: 2000 },
      { name: "Processing market factors...", duration: 1800 },
      { name: "Creating visualization charts...", duration: 2200 },
      { name: "Formatting export file...", duration: 2000 },
      { name: "Finalizing export...", duration: 1000 }
    ]
    
    let totalProgress = 0
    const progressPerStage = 100 / exportStages.length
    
    for (let i = 0; i < exportStages.length; i++) {
      setExportForecastStage(exportStages[i].name)
      
      // Simulate gradual progress within each stage
      const stageStartProgress = totalProgress
      const steps = 20
      const stepDuration = exportStages[i].duration / steps
      
      for (let step = 0; step < steps; step++) {
        await new Promise(resolve => setTimeout(resolve, stepDuration))
        const stageProgress = stageStartProgress + (progressPerStage * (step + 1) / steps)
        setExportForecastProgress(Math.min(stageProgress, 100))
      }
      
      totalProgress += progressPerStage
    }
    
    // Simulate file generation and download
    const timestamp = new Date().toISOString().split('T')[0]
    const selectedScenarios = Object.entries(forecastExportSettings.scenarios)
      .filter(([_, selected]) => selected)
      .map(([scenario, _]) => scenario)
      .join('_')
    
    const fileName = `financial_forecast_${selectedScenarios}_${timestamp}.${forecastExportSettings.format}`
    
    // In a real app, this would trigger the actual file download
    const link = document.createElement('a')
    link.href = '#' // This would be a generated file URL
    link.download = fileName
    
    setExportForecastProgress(100)
    setExportForecastStage("Export completed successfully!")
    setLastExportTime("Just now")
    
    // Reset after completion
    setTimeout(() => {
      setIsExportingForecast(false)
      setExportForecastProgress(0)
      setExportForecastStage("")
      setShowExportForecast(false)
      // Show success message
      alert(`Forecast export completed! File: ${fileName}`)
    }, 1500)
  }

  // AI Analysis Settings Functions
  const updateAiAnalysisType = (key: string, value: boolean) => {
    setAiAnalysisSettings(prev => ({
      ...prev,
      analysisTypes: {
        ...prev.analysisTypes,
        [key]: value
      }
    }))
  }

  const updateAiAnalysisSetting = (key: string, value: any) => {
    setAiAnalysisSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Run AI Analysis Function
  const runAIAnalysis = async () => {
    if (isRunningAnalysis) return
    
    setIsRunningAnalysis(true)
    setAnalysisProgress(0)
    setAnalysisResults([])
    
    const analysisStages = [
      { name: "Initializing AI engines...", duration: 1200 },
      { name: "Loading financial data...", duration: 2000 },
      { name: "Running trend analysis...", duration: 2800 },
      { name: "Detecting anomalies...", duration: 2200 },
      { name: "Analyzing seasonal patterns...", duration: 1800 },
      { name: "Assessing market correlations...", duration: 2500 },
      { name: "Generating predictive insights...", duration: 3000 },
      { name: "Compiling recommendations...", duration: 1500 },
      { name: "Finalizing analysis...", duration: 1000 }
    ]
    
    let totalProgress = 0
    const progressPerStage = 100 / analysisStages.length
    const results: any[] = []
    
    for (let i = 0; i < analysisStages.length; i++) {
      setAnalysisStage(analysisStages[i].name)
      
      // Simulate gradual progress within each stage
      const stageStartProgress = totalProgress
      const steps = 20
      const stepDuration = analysisStages[i].duration / steps
      
      for (let step = 0; step < steps; step++) {
        await new Promise(resolve => setTimeout(resolve, stepDuration))
        const stageProgress = stageStartProgress + (progressPerStage * (step + 1) / steps)
        setAnalysisProgress(Math.min(stageProgress, 100))
      }
      
      // Add realistic analysis results at specific stages
      switch (i) {
        case 2: // Trend analysis
          if (aiAnalysisSettings.analysisTypes.trendAnalysis) {
            results.push({
              type: "Trend Analysis",
              status: "completed",
              confidence: 94,
              insights: [
                "Revenue shows strong upward trend (+12.4% monthly growth)",
                "Seasonal peak detected in Q4 (+18% vs Q3)",
                "Growth acceleration observed in last 3 months"
              ],
              recommendation: "Continue current growth strategy, prepare for Q4 scaling",
              severity: "positive"
            })
          }
          break
        case 3: // Anomaly detection
          if (aiAnalysisSettings.analysisTypes.anomalyDetection) {
            results.push({
              type: "Anomaly Detection",
              status: "completed",
              confidence: 87,
              insights: [
                "Unusual expense spike detected in September (-$45K)",
                "Revenue volatility increased by 23% in last quarter",
                "Cash flow pattern deviation from historical norm"
              ],
              recommendation: "Investigate September expenses, implement volatility controls",
              severity: "warning"
            })
          }
          break
        case 4: // Seasonality
          if (aiAnalysisSettings.analysisTypes.seasonalityAnalysis) {
            results.push({
              type: "Seasonality Analysis",
              status: "completed",
              confidence: 96,
              insights: [
                "Strong Q4 seasonality pattern confirmed (+22% avg boost)",
                "Q1 typically shows -8% decline, plan accordingly",
                "Mid-year steady state with minimal seasonal impact"
              ],
              recommendation: "Optimize inventory for Q4, reduce costs in Q1",
              severity: "neutral"
            })
          }
          break
        case 5: // Market correlation
          if (aiAnalysisSettings.analysisTypes.marketCorrelation) {
            results.push({
              type: "Market Correlation",
              status: "completed",
              confidence: 82,
              insights: [
                "High correlation with consumer confidence index (0.74)",
                "Inverse correlation with interest rates (-0.68)",
                "Tech sector trends show 3-month lead indicator"
              ],
              recommendation: "Monitor Fed rate decisions, track tech sector leading indicators",
              severity: "neutral"
            })
          }
          break
        case 6: // Predictive insights
          if (aiAnalysisSettings.analysisTypes.predictiveInsights) {
            results.push({
              type: "Predictive Insights",
              status: "completed",
              confidence: 89,
              insights: [
                "87% probability of achieving $2.8M revenue target",
                "Risk of 15% cash flow shortage in Q2 if growth exceeds 20%",
                "New market opportunity valued at $340K potential"
              ],
              recommendation: "Secure additional funding line, explore new market entry",
              severity: "positive"
            })
          }
          break
        case 7: // Recommendations
          results.push({
            type: "AI Recommendations",
            status: "completed",
            confidence: 91,
            insights: [
              "Implement dynamic pricing model for 8% revenue boost",
              "Optimize cash flow timing to reduce working capital by 12%",
              "Consider strategic partnerships for market expansion"
            ],
            recommendation: "Execute top 2 recommendations within 60 days for maximum impact",
            severity: "positive"
          })
          break
      }
      
      setAnalysisResults([...results])
      totalProgress += progressPerStage
    }
    
    setAnalysisProgress(100)
    setAnalysisStage("AI analysis completed successfully!")
    setLastAnalysisTime("Just now")
    
    // Reset after completion
    setTimeout(() => {
      setIsRunningAnalysis(false)
      setAnalysisProgress(0)
      setAnalysisStage("")
    }, 2000)
  }

  // Interactive Scenario Chart Component
  function ScenarioChart() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const tooltipRef = useRef<HTMLDivElement>(null)
    
    useEffect(() => {
      const canvas = canvasRef.current
      const tooltip = tooltipRef.current
      if (!canvas || !tooltip) return
      
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      
      // Set canvas size for high DPI displays
      const rect = canvas.getBoundingClientRect()
      const devicePixelRatio = window.devicePixelRatio || 1
      canvas.width = rect.width * devicePixelRatio
      canvas.height = rect.height * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
      
      let hoveredScenario = -1
      
      // Chart data
      const scenarios = [
        { name: "Optimistic", revenue: 3200, profit: 720, growth: 15, color: "#10b981" },
        { name: "Realistic", revenue: 2800, profit: 560, growth: 8, color: "#3b82f6" },
        { name: "Conservative", revenue: 2500, profit: 450, growth: 5, color: "#eab308" },
        { name: "Risk", revenue: 2100, profit: 280, growth: -2, color: "#ef4444" }
      ]
      
      // Chart dimensions
      const padding = 60
      const chartWidth = rect.width - padding * 2
      const chartHeight = rect.height - padding * 2
      const barWidth = chartWidth / scenarios.length / 3 - 10
      const groupWidth = chartWidth / scenarios.length
      
      // Find max values for scaling
      const maxRevenue = Math.max(...scenarios.map(s => s.revenue))
      const maxProfit = Math.max(...scenarios.map(s => s.profit))
      const maxGrowth = Math.max(...scenarios.map(s => Math.abs(s.growth)))
      
      function drawChart() {
        if (!ctx) return
        
        // Clear canvas
        ctx.clearRect(0, 0, rect.width, rect.height)
        
        // Draw background grid
        ctx.strokeStyle = '#374151'
        ctx.lineWidth = 1
        for (let i = 0; i <= 5; i++) {
          const y = padding + (chartHeight / 5) * i
          ctx.beginPath()
          ctx.moveTo(padding, y)
          ctx.lineTo(rect.width - padding, y)
          ctx.stroke()
        }
        
        // Draw scenarios
        scenarios.forEach((scenario, index) => {
          const x = padding + index * groupWidth
          const centerX = x + groupWidth / 2
          const isHovered = hoveredScenario === index
          
          // Revenue bar
          const revenueHeight = (scenario.revenue / maxRevenue) * chartHeight * 0.8
          const revenueY = padding + chartHeight - revenueHeight
          ctx.fillStyle = scenario.color + (isHovered ? 'CC' : '80')
          ctx.fillRect(centerX - barWidth * 1.5, revenueY, barWidth, revenueHeight)
          
          // Profit bar
          const profitHeight = (scenario.profit / maxProfit) * chartHeight * 0.8
          const profitY = padding + chartHeight - profitHeight
          ctx.fillStyle = scenario.color + (isHovered ? 'E0' : 'B0')
          ctx.fillRect(centerX - barWidth * 0.5, profitY, barWidth, profitHeight)
          
          // Growth bar (can be negative)
          const growthHeight = Math.abs(scenario.growth / maxGrowth) * chartHeight * 0.4
          const growthY = scenario.growth >= 0 
            ? padding + chartHeight - growthHeight
            : padding + chartHeight
          ctx.fillStyle = isHovered ? scenario.color : scenario.color + 'DD'
          ctx.fillRect(centerX + barWidth * 0.5, growthY, barWidth, growthHeight)
          
          // Scenario label
          ctx.fillStyle = isHovered ? '#ffffff' : '#e2e8f0'
          ctx.font = isHovered ? 'bold 12px Inter, sans-serif' : '12px Inter, sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText(scenario.name, centerX, rect.height - 20)
          
          // Values display
          if (isHovered) {
            ctx.fillStyle = '#ffffff'
            ctx.font = 'bold 10px Inter, sans-serif'
            ctx.fillText(`$${scenario.revenue}K`, centerX - barWidth, revenueY - 5)
            ctx.fillText(`$${scenario.profit}K`, centerX, profitY - 5)
            ctx.fillText(`${scenario.growth}%`, centerX + barWidth, growthY - 5)
          }
        })
        
        // Legend
        const legendY = 20
        const legendItems = [
          { label: 'Revenue', color: '#ffffff80' },
          { label: 'Profit', color: '#ffffffB0' },
          { label: 'Growth %', color: '#ffffff' }
        ]
        
        legendItems.forEach((item, index) => {
          const legendX = padding + index * 80
          ctx.fillStyle = item.color
          ctx.fillRect(legendX, legendY, 12, 12)
          ctx.fillStyle = '#e2e8f0'
          ctx.font = '11px Inter, sans-serif'
          ctx.textAlign = 'left'
          ctx.fillText(item.label, legendX + 18, legendY + 9)
        })
        
        // Y-axis labels
        ctx.fillStyle = '#94a3b8'
        ctx.font = '10px Inter, sans-serif'
        ctx.textAlign = 'right'
        for (let i = 0; i <= 5; i++) {
          const y = padding + (chartHeight / 5) * i
          const value = Math.round((maxRevenue / 5) * (5 - i))
          ctx.fillText(`$${value}K`, padding - 10, y + 3)
        }
      }
      
      // Mouse interaction
      function handleMouseMove(event: MouseEvent) {
        if (!canvas || !tooltip) return
        
        const canvasRect = canvas.getBoundingClientRect()
        const mouseX = event.clientX - canvasRect.left
        const mouseY = event.clientY - canvasRect.top
        
        let newHoveredScenario = -1
        
        scenarios.forEach((scenario, index) => {
          const x = padding + index * groupWidth
          const centerX = x + groupWidth / 2
          
          if (mouseX >= x && mouseX <= x + groupWidth && mouseY >= padding && mouseY <= rect.height - padding) {
            newHoveredScenario = index
            
            // Show tooltip
            tooltip.style.display = 'block'
            tooltip.style.left = `${event.clientX + 10}px`
            tooltip.style.top = `${event.clientY - 10}px`
            tooltip.innerHTML = `
              <div class="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-lg">
                <div class="text-white font-medium">${scenario.name}</div>
                <div class="text-slate-300 text-sm mt-1">
                  <div>Revenue: $${scenario.revenue}K</div>
                  <div>Profit: $${scenario.profit}K</div>
                  <div>Growth: ${scenario.growth}%</div>
                </div>
              </div>
            `
          }
        })
        
        if (newHoveredScenario !== hoveredScenario) {
          hoveredScenario = newHoveredScenario
          drawChart()
        }
        
        if (hoveredScenario === -1) {
          tooltip.style.display = 'none'
        }
      }
      
      function handleMouseLeave() {
        if (!tooltip) return
        
        hoveredScenario = -1
        tooltip.style.display = 'none'
        drawChart()
      }
      
      // Add event listeners
      canvas.addEventListener('mousemove', handleMouseMove)
      canvas.addEventListener('mouseleave', handleMouseLeave)
      
      // Initial draw
      drawChart()
      
      // Cleanup
      return () => {
        if (!canvas) return
        canvas.removeEventListener('mousemove', handleMouseMove)
        canvas.removeEventListener('mouseleave', handleMouseLeave)
      }
      
    }, [])
    
    return (
      <div className="relative">
        <canvas 
          ref={canvasRef}
          className="w-full h-64 cursor-pointer hover:opacity-90 transition-opacity"
          style={{ width: '100%', height: '256px' }}
        />
        <div 
          ref={tooltipRef}
          className="absolute pointer-events-none z-10 hidden"
          style={{ display: 'none' }}
        />
      </div>
    )
    }

  // Revenue Prediction Timeline Chart Component
  function RevenuePredictionChart() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const tooltipRef = useRef<HTMLDivElement>(null)
    
    useEffect(() => {
      const canvas = canvasRef.current
      const tooltip = tooltipRef.current
      if (!canvas || !tooltip) return
      
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      
      // Set canvas size for high DPI displays
      const rect = canvas.getBoundingClientRect()
      const devicePixelRatio = window.devicePixelRatio || 1
      canvas.width = rect.width * devicePixelRatio
      canvas.height = rect.height * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
      
      let hoveredPoint = -1
      
      // Historical and predicted data (in thousands)
      const timelineData = [
        // Historical data (past 6 months)
        { month: "Jul 2024", revenue: 210, type: "historical", confidence: { upper: 210, lower: 210 } },
        { month: "Aug 2024", revenue: 225, type: "historical", confidence: { upper: 225, lower: 225 } },
        { month: "Sep 2024", revenue: 195, type: "historical", confidence: { upper: 195, lower: 195 } },
        { month: "Oct 2024", revenue: 240, type: "historical", confidence: { upper: 240, lower: 240 } },
        { month: "Nov 2024", revenue: 230, type: "historical", confidence: { upper: 230, lower: 230 } },
        { month: "Dec 2024", revenue: 220, type: "current", confidence: { upper: 220, lower: 220 } },
        // Predicted data (next 12 months)
        { month: "Jan 2025", revenue: 235, type: "predicted", confidence: { upper: 255, lower: 215 } },
        { month: "Feb 2025", revenue: 218, type: "predicted", confidence: { upper: 245, lower: 195 } },
        { month: "Mar 2025", revenue: 267, type: "predicted", confidence: { upper: 295, lower: 240 } },
        { month: "Apr 2025", revenue: 285, type: "predicted", confidence: { upper: 320, lower: 250 } },
        { month: "May 2025", revenue: 298, type: "predicted", confidence: { upper: 340, lower: 255 } },
        { month: "Jun 2025", revenue: 312, type: "predicted", confidence: { upper: 360, lower: 265 } },
        { month: "Jul 2025", revenue: 328, type: "predicted", confidence: { upper: 385, lower: 270 } },
        { month: "Aug 2025", revenue: 345, type: "predicted", confidence: { upper: 410, lower: 280 } },
        { month: "Sep 2025", revenue: 362, type: "predicted", confidence: { upper: 435, lower: 290 } },
        { month: "Oct 2025", revenue: 380, type: "predicted", confidence: { upper: 465, lower: 295 } },
        { month: "Nov 2025", revenue: 398, type: "predicted", confidence: { upper: 490, lower: 305 } },
        { month: "Dec 2025", revenue: 415, type: "predicted", confidence: { upper: 520, lower: 310 } }
      ]
      
      // Chart dimensions
      const padding = 60
      const chartWidth = rect.width - padding * 2
      const chartHeight = rect.height - padding * 2
      
      // Find max values for scaling
      const maxValue = Math.max(...timelineData.map(d => d.confidence.upper))
      const minValue = Math.min(...timelineData.map(d => d.confidence.lower))
      const valueRange = maxValue - minValue
      
      function getY(value: number) {
        return padding + chartHeight - ((value - minValue) / valueRange) * chartHeight
      }
      
      function getX(index: number) {
        return padding + (index / (timelineData.length - 1)) * chartWidth
      }
      
      function drawChart() {
        if (!ctx) return
        
        // Clear canvas
        ctx.clearRect(0, 0, rect.width, rect.height)
        
        // Draw background grid
        ctx.strokeStyle = '#374151'
        ctx.lineWidth = 1
        for (let i = 0; i <= 6; i++) {
          const y = padding + (chartHeight / 6) * i
          ctx.beginPath()
          ctx.moveTo(padding, y)
          ctx.lineTo(rect.width - padding, y)
          ctx.stroke()
        }
        
        // Vertical grid lines (quarterly)
        for (let i = 0; i < timelineData.length; i += 3) {
          const x = getX(i)
          ctx.beginPath()
          ctx.moveTo(x, padding)
          ctx.lineTo(x, rect.height - padding)
          ctx.stroke()
        }
        
        // Draw confidence intervals for predicted data
        ctx.fillStyle = '#3b82f630'
        ctx.beginPath()
        
        // Upper confidence line
        timelineData.forEach((point, index) => {
          if (point.type === 'predicted') {
            const x = getX(index)
            const y = getY(point.confidence.upper)
            if (point === timelineData.find(p => p.type === 'predicted')) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
          }
        })
        
        // Lower confidence line (reverse order)
        for (let i = timelineData.length - 1; i >= 0; i--) {
          const point = timelineData[i]
          if (point.type === 'predicted') {
            const x = getX(i)
            const y = getY(point.confidence.lower)
            ctx.lineTo(x, y)
          }
        }
        
        ctx.closePath()
        ctx.fill()
        
        // Draw historical revenue line
        ctx.strokeStyle = '#10b981'
        ctx.lineWidth = 3
        ctx.beginPath()
        
        timelineData.forEach((point, index) => {
          if (point.type === 'historical' || point.type === 'current') {
            const x = getX(index)
            const y = getY(point.revenue)
            if (index === 0) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
          }
        })
        
        ctx.stroke()
        
        // Draw predicted revenue line
        const currentIndex = timelineData.findIndex(p => p.type === 'current')
        const predictedStart = timelineData.findIndex(p => p.type === 'predicted')
        
        ctx.strokeStyle = '#3b82f6'
        ctx.lineWidth = 3
        ctx.setLineDash([5, 5])
        ctx.beginPath()
        
        // Start from current point
        if (currentIndex >= 0) {
          const currentX = getX(currentIndex)
          const currentY = getY(timelineData[currentIndex].revenue)
          ctx.moveTo(currentX, currentY)
        }
        
        timelineData.forEach((point, index) => {
          if (point.type === 'predicted') {
            const x = getX(index)
            const y = getY(point.revenue)
            ctx.lineTo(x, y)
          }
        })
        
        ctx.stroke()
        ctx.setLineDash([])
        
        // Draw data points
        timelineData.forEach((point, index) => {
          const x = getX(index)
          const y = getY(point.revenue)
          const isHovered = hoveredPoint === index
          
          ctx.fillStyle = point.type === 'historical' ? '#10b981' : 
                         point.type === 'current' ? '#eab308' : '#3b82f6'
          
          ctx.beginPath()
          ctx.arc(x, y, isHovered ? 6 : 4, 0, 2 * Math.PI)
          ctx.fill()
          
          if (isHovered) {
            ctx.strokeStyle = '#ffffff'
            ctx.lineWidth = 2
            ctx.stroke()
          }
        })
        
        // Draw Y-axis labels
        ctx.fillStyle = '#94a3b8'
        ctx.font = '10px Inter, sans-serif'
        ctx.textAlign = 'right'
        for (let i = 0; i <= 6; i++) {
          const y = padding + (chartHeight / 6) * i
          const value = Math.round(maxValue - (i / 6) * valueRange)
          ctx.fillText(`$${value}K`, padding - 10, y + 3)
        }
        
        // Draw X-axis labels (quarterly)
        ctx.textAlign = 'center'
        for (let i = 0; i < timelineData.length; i += 3) {
          const x = getX(i)
          const shortMonth = timelineData[i].month.split(' ')[0]
          const year = timelineData[i].month.split(' ')[1]
          ctx.fillText(shortMonth, x, rect.height - 30)
          ctx.fillText(year, x, rect.height - 15)
        }
        
        // Legend
        const legendY = 20
        const legendItems = [
          { label: 'Historical', color: '#10b981' },
          { label: 'Predicted', color: '#3b82f6' },
          { label: 'Confidence Interval', color: '#3b82f630' }
        ]
        
        legendItems.forEach((item, index) => {
          const legendX = padding + index * 120
          ctx.fillStyle = item.color
          if (item.label === 'Confidence Interval') {
            ctx.fillRect(legendX, legendY, 20, 8)
          } else {
            ctx.beginPath()
            ctx.arc(legendX + 6, legendY + 4, 4, 0, 2 * Math.PI)
            ctx.fill()
          }
          ctx.fillStyle = '#e2e8f0'
          ctx.font = '11px Inter, sans-serif'
          ctx.textAlign = 'left'
          ctx.fillText(item.label, legendX + 20, legendY + 8)
        })
      }
      
      // Mouse interaction
      function handleMouseMove(event: MouseEvent) {
        if (!canvas || !tooltip) return
        
        const canvasRect = canvas.getBoundingClientRect()
        const mouseX = event.clientX - canvasRect.left
        const mouseY = event.clientY - canvasRect.top
        
        let newHoveredPoint = -1
        let closestDistance = Infinity
        
        timelineData.forEach((point, index) => {
          const x = getX(index)
          const y = getY(point.revenue)
          const distance = Math.sqrt(Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2))
          
          if (distance < 20 && distance < closestDistance) {
            closestDistance = distance
            newHoveredPoint = index
          }
        })
        
        if (newHoveredPoint !== hoveredPoint) {
          hoveredPoint = newHoveredPoint
          drawChart()
        }
        
        if (hoveredPoint !== -1) {
          const point = timelineData[hoveredPoint]
          tooltip.style.display = 'block'
          tooltip.style.left = `${event.clientX + 10}px`
          tooltip.style.top = `${event.clientY - 10}px`
          
          const confidenceText = point.type === 'predicted' 
            ? `<div>Range: $${point.confidence.lower}K - $${point.confidence.upper}K</div>`
            : ''
          
          tooltip.innerHTML = `
            <div class="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-lg">
              <div class="text-white font-medium">${point.month}</div>
              <div class="text-slate-300 text-sm mt-1">
                <div>Revenue: $${point.revenue}K</div>
                ${confidenceText}
                <div class="text-xs mt-1 ${point.type === 'historical' ? 'text-green-400' : point.type === 'current' ? 'text-yellow-400' : 'text-blue-400'}">
                  ${point.type === 'historical' ? 'Historical' : point.type === 'current' ? 'Current' : 'Predicted'}
                </div>
              </div>
            </div>
          `
        } else {
          tooltip.style.display = 'none'
        }
      }
      
      function handleMouseLeave() {
        if (!tooltip) return
        
        hoveredPoint = -1
        tooltip.style.display = 'none'
        drawChart()
      }
      
      // Add event listeners
      canvas.addEventListener('mousemove', handleMouseMove)
      canvas.addEventListener('mouseleave', handleMouseLeave)
      
      // Initial draw
      drawChart()
      
      // Cleanup
      return () => {
        if (!canvas) return
        canvas.removeEventListener('mousemove', handleMouseMove)
        canvas.removeEventListener('mouseleave', handleMouseLeave)
      }
      
    }, [])
    
    return (
      <div className="relative">
        <canvas 
          ref={canvasRef}
          className="w-full h-64 cursor-pointer hover:opacity-90 transition-opacity"
          style={{ width: '100%', height: '256px' }}
        />
        <div 
          ref={tooltipRef}
          className="absolute pointer-events-none z-10 hidden"
          style={{ display: 'none' }}
        />
      </div>
    )
  }
 
  const forecastScenarios = [
    {
      id: "optimistic",
      name: "Optimistic Growth",
      description: "15% revenue growth with market expansion",
      confidence: 78,
      revenue: "$3.2M",
      profit: "$720K",
      growth: "+15%",
      probability: "High",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    },
    {
      id: "realistic",
      name: "Realistic Projection",
      description: "8% steady growth following current trends",
      confidence: 94,
      revenue: "$2.8M",
      profit: "$560K",
      growth: "+8%",
      probability: "Very High",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      id: "conservative",
      name: "Conservative Estimate",
      description: "5% growth accounting for market volatility",
      confidence: 88,
      revenue: "$2.5M",
      profit: "$450K",
      growth: "+5%",
      probability: "High",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20"
    },
    {
      id: "pessimistic",
      name: "Risk Scenario",
      description: "Economic downturn impact analysis",
      confidence: 65,
      revenue: "$2.1M",
      profit: "$280K",
      growth: "-2%",
      probability: "Medium",
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20"
    }
  ]

  const keyMetrics = [
    {
      title: "Revenue Forecast",
      current: "$2.4M",
      predicted: "$2.8M",
      change: "+16.7%",
      confidence: 94,
      trend: "up",
      period: "Next 12 months"
    },
    {
      title: "Cash Flow Projection",
      current: "$640K",
      predicted: "$785K",
      change: "+22.7%",
      confidence: 87,
      trend: "up",
      period: "Next 6 months"
    },
    {
      title: "Expense Forecast",
      current: "$1.8M",
      predicted: "$2.1M",
      change: "+16.7%",
      confidence: 91,
      trend: "up",
      period: "Next 12 months"
    },
    {
      title: "Profit Margin",
      current: "26.7%",
      predicted: "28.4%",
      change: "+1.7pts",
      confidence: 82,
      trend: "up",
      period: "Target range"
    }
  ]

  const marketFactors = [
    {
      factor: "Market Growth Rate",
      impact: "High",
      current: "12.3%",
      projected: "14.8%",
      influence: "+$340K",
      confidence: 89
    },
    {
      factor: "Competition Index",
      impact: "Medium",
      current: "73",
      projected: "78",
      influence: "-$120K",
      confidence: 76
    },
    {
      factor: "Economic Indicators",
      impact: "High",
      current: "Stable",
      projected: "Growth",
      influence: "+$280K",
      confidence: 82
    },
    {
      factor: "Seasonal Patterns",
      impact: "Medium",
      current: "Q4 Peak",
      projected: "Q1 Dip",
      influence: "-$85K",
      confidence: 95
    }
  ]

  return (
    <div className="flex-1 bg-slate-950 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Financial Forecasting</h1>
              <p className="text-slate-400 mt-1">AI-powered predictions and scenario analysis</p>
            </div>
            <div className="flex items-center gap-3">
              <Dialog open={showModelUpdate} onOpenChange={setShowModelUpdate}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Update Model
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-6xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-white flex items-center gap-2">
                      <Package className="w-6 h-6 text-green-400" />
                      AI Model Updates
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6 py-4">
                    {/* Update Status Header */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Package className="w-5 h-5 text-green-400" />
                          <span className="text-slate-300 font-medium">Update Status</span>
                        </div>
                        <div className="text-2xl font-bold text-green-400">
                          {isUpdating ? 'Updating' : 'Ready'}
                        </div>
                        <div className="text-sm text-slate-400">Last update: {lastUpdateTime}</div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Cpu className="w-5 h-5 text-blue-400" />
                          <span className="text-slate-300 font-medium">Models</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-400">3</div>
                        <div className="text-sm text-slate-400">AI components</div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-5 h-5 text-purple-400" />
                          <span className="text-slate-300 font-medium">Performance</span>
                        </div>
                        <div className="text-2xl font-bold text-purple-400">
                          {updateResults.length > 0 && updateResults.every(r => r.status === 'updated') ? '+3.2%' : '+2.1%'}
                        </div>
                        <div className="text-sm text-slate-400">Accuracy boost</div>
                      </div>
                    </div>

                    {/* Update Progress Display */}
                    {isUpdating && (
                      <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/30">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <RefreshCw className="w-5 h-5 text-green-400 animate-spin" />
                            <span className="text-white font-medium">Updating AI Models</span>
                          </div>
                          <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                            {Math.round(updateProgress)}% Complete
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-300 text-sm">{updateStage}</span>
                            <span className="text-slate-400 text-sm">{Math.round(updateProgress)}%</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-3">
                            <div 
                              className="bg-green-400 h-3 rounded-full transition-all duration-300"
                              style={{ width: `${updateProgress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Available Updates */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white border-b border-slate-700 pb-2">Available Updates</h3>
                      
                      <div className="space-y-4">
                        {/* Default available updates */}
                        {updateResults.length === 0 && (
                          <>
                            <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/30">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <Brain className="w-5 h-5 text-blue-400" />
                                  <div>
                                    <h4 className="text-slate-300 font-medium">Revenue Predictor</h4>
                                    <p className="text-slate-400 text-sm">v2.4.1 → v2.5.0</p>
                                  </div>
                                </div>
                                <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                                  Available
                                </Badge>
                              </div>
                              <div className="space-y-2">
                                <div className="text-sm text-slate-300 font-medium">Improvements:</div>
                                <ul className="text-sm text-slate-400 space-y-1">
                                  <li className="flex items-center gap-2">
                                    <ChevronRight className="w-3 h-3" />
                                    Enhanced accuracy by 2.3%
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <ChevronRight className="w-3 h-3" />
                                    Reduced processing time by 15%
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <ChevronRight className="w-3 h-3" />
                                    Better seasonal adjustments
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/30">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <DollarSign className="w-5 h-5 text-green-400" />
                                  <div>
                                    <h4 className="text-slate-300 font-medium">Cash Flow Model</h4>
                                    <p className="text-slate-400 text-sm">v1.8.2 → v1.9.0</p>
                                  </div>
                                </div>
                                <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                                  Available
                                </Badge>
                              </div>
                              <div className="space-y-2">
                                <div className="text-sm text-slate-300 font-medium">Improvements:</div>
                                <ul className="text-sm text-slate-400 space-y-1">
                                  <li className="flex items-center gap-2">
                                    <ChevronRight className="w-3 h-3" />
                                    Better seasonal predictions
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <ChevronRight className="w-3 h-3" />
                                    Improved confidence intervals
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <ChevronRight className="w-3 h-3" />
                                    Real-time cash flow tracking
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/30">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <BarChart3 className="w-5 h-5 text-purple-400" />
                                  <div>
                                    <h4 className="text-slate-300 font-medium">Market Analyzer</h4>
                                    <p className="text-slate-400 text-sm">v3.1.0 → v3.2.1</p>
                                  </div>
                                </div>
                                <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                                  Available
                                </Badge>
                              </div>
                              <div className="space-y-2">
                                <div className="text-sm text-slate-300 font-medium">Improvements:</div>
                                <ul className="text-sm text-slate-400 space-y-1">
                                  <li className="flex items-center gap-2">
                                    <ChevronRight className="w-3 h-3" />
                                    New sentiment analysis engine
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <ChevronRight className="w-3 h-3" />
                                    Real-time market data integration
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <ChevronRight className="w-3 h-3" />
                                    Enhanced volatility detection
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </>
                        )}

                        {/* Update results */}
                        {updateResults.length > 0 && updateResults.map((result, index) => (
                          <div key={index} className="p-4 border border-slate-700 rounded-lg bg-slate-800/30">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                {result.component === 'Revenue Predictor' && <Brain className="w-5 h-5 text-blue-400" />}
                                {result.component === 'Cash Flow Model' && <DollarSign className="w-5 h-5 text-green-400" />}
                                {result.component === 'Market Analyzer' && <BarChart3 className="w-5 h-5 text-purple-400" />}
                                <div>
                                  <h4 className="text-slate-300 font-medium">{result.component}</h4>
                                  <p className="text-slate-400 text-sm">{result.currentVersion} → {result.newVersion}</p>
                                </div>
                              </div>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${
                                  result.status === 'updated' 
                                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                    : result.status === 'installing' || result.status === 'testing'
                                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                    : result.status === 'downloading'
                                    ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                    : 'bg-green-500/10 text-green-400 border-green-500/20'
                                }`}
                              >
                                {result.status === 'updated' ? 'Updated' :
                                 result.status === 'installing' ? 'Installing' :
                                 result.status === 'testing' ? 'Testing' :
                                 result.status === 'downloading' ? 'Downloading' : 'Available'}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="text-sm text-slate-300 font-medium">Improvements:</div>
                              <ul className="text-sm text-slate-400 space-y-1">
                                {result.improvements.map((improvement: string, idx: number) => (
                                  <li key={idx} className="flex items-center gap-2">
                                    <ChevronRight className="w-3 h-3" />
                                    {improvement}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Update Options */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white border-b border-slate-700 pb-2">Update Options</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex flex-col items-center gap-2 h-auto py-4 bg-slate-800 border-slate-700 hover:bg-slate-700"
                        >
                          <Brain className="w-5 h-5 text-blue-400" />
                          <span className="text-xs">Revenue Only</span>
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex flex-col items-center gap-2 h-auto py-4 bg-slate-800 border-slate-700 hover:bg-slate-700"
                        >
                          <DollarSign className="w-5 h-5 text-green-400" />
                          <span className="text-xs">Cash Flow</span>
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex flex-col items-center gap-2 h-auto py-4 bg-slate-800 border-slate-700 hover:bg-slate-700"
                        >
                          <BarChart3 className="w-5 h-5 text-purple-400" />
                          <span className="text-xs">Market Analysis</span>
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex flex-col items-center gap-2 h-auto py-4 bg-slate-800 border-slate-700 hover:bg-slate-700"
                        >
                          <Settings className="w-5 h-5 text-gray-400" />
                          <span className="text-xs">Settings</span>
                        </Button>
                      </div>
                    </div>

                    {/* Update Information */}
                    <div className="p-4 border border-slate-700 rounded-lg bg-blue-500/5">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-400 mt-0.5" />
                        <div>
                          <h4 className="text-blue-400 font-medium mb-2">Update Information</h4>
                          <ul className="text-slate-300 text-sm space-y-1">
                            <li>• Updates will temporarily pause model operations (~2-3 minutes)</li>
                            <li>• Previous model versions will be backed up automatically</li>
                            <li>• Rollback is available if issues are detected</li>
                            <li>• Performance improvements take effect immediately</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Clock className="w-4 h-4" />
                        <span>Estimated update time: 3-5 minutes</span>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button 
                          variant="outline" 
                          onClick={() => setShowModelUpdate(false)}
                          className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white hover:border-slate-600"
                          disabled={isUpdating}
                        >
                          Close
                        </Button>
                        <Button 
                          onClick={performModelUpdate}
                          className="bg-green-600 hover:bg-green-700 text-white"
                          disabled={isUpdating}
                        >
                          <Package className={`w-4 h-4 mr-2 ${isUpdating ? 'animate-pulse' : ''}`} />
                          {isUpdating ? 'Updating...' : 'Update All Models'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog open={showExportForecast} onOpenChange={setShowExportForecast}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                    <Download className="w-4 h-4 mr-2" />
                    Export Forecast
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-6xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-white flex items-center gap-2">
                      <Download className="w-6 h-6 text-blue-400" />
                      Export Financial Forecasts
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6 py-4">
                    {/* Export Status Header */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Download className="w-5 h-5 text-blue-400" />
                          <span className="text-slate-300 font-medium">Export Status</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-400">
                          {isExportingForecast ? 'Exporting' : 'Ready'}
                        </div>
                        <div className="text-sm text-slate-400">Last export: {lastExportTime}</div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                          <BarChart3 className="w-5 h-5 text-green-400" />
                          <span className="text-slate-300 font-medium">Data Sets</span>
                        </div>
                        <div className="text-2xl font-bold text-green-400">
                          {Object.values(forecastExportSettings.dataTypes).filter(Boolean).length}
                        </div>
                        <div className="text-sm text-slate-400">Selected for export</div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-5 h-5 text-purple-400" />
                          <span className="text-slate-300 font-medium">Scenarios</span>
                        </div>
                        <div className="text-2xl font-bold text-purple-400">
                          {Object.values(forecastExportSettings.scenarios).filter(Boolean).length}
                        </div>
                        <div className="text-sm text-slate-400">Forecast scenarios</div>
                      </div>
                    </div>

                    {/* Export Progress Display */}
                    {isExportingForecast && (
                      <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/30">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Download className="w-5 h-5 text-blue-400 animate-pulse" />
                            <span className="text-white font-medium">Exporting Forecast Data</span>
                          </div>
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                            {Math.round(exportForecastProgress)}% Complete
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-300 text-sm">{exportForecastStage}</span>
                            <span className="text-slate-400 text-sm">{Math.round(exportForecastProgress)}%</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-3">
                            <div 
                              className="bg-blue-400 h-3 rounded-full transition-all duration-300"
                              style={{ width: `${exportForecastProgress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Data Types Selection */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white border-b border-slate-700 pb-2">Data Types to Export</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={forecastExportSettings.dataTypes.scenarios}
                            onCheckedChange={(checked) => updateForecastExportDataType('scenarios', checked)}
                          />
                          <div>
                            <Label className="text-slate-300">Scenario Analysis</Label>
                            <p className="text-xs text-slate-400">Optimistic, realistic, conservative projections</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={forecastExportSettings.dataTypes.predictions}
                            onCheckedChange={(checked) => updateForecastExportDataType('predictions', checked)}
                          />
                          <div>
                            <Label className="text-slate-300">AI Predictions</Label>
                            <p className="text-xs text-slate-400">Machine learning forecasts and trends</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={forecastExportSettings.dataTypes.timelineForecast}
                            onCheckedChange={(checked) => updateForecastExportDataType('timelineForecast', checked)}
                          />
                          <div>
                            <Label className="text-slate-300">Timeline Forecast</Label>
                            <p className="text-xs text-slate-400">12-month revenue and cash flow timeline</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={forecastExportSettings.dataTypes.marketFactors}
                            onCheckedChange={(checked) => updateForecastExportDataType('marketFactors', checked)}
                          />
                          <div>
                            <Label className="text-slate-300">Market Factors</Label>
                            <p className="text-xs text-slate-400">External market influence analysis</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={forecastExportSettings.dataTypes.modelMetrics}
                            onCheckedChange={(checked) => updateForecastExportDataType('modelMetrics', checked)}
                          />
                          <div>
                            <Label className="text-slate-300">Model Performance</Label>
                            <p className="text-xs text-slate-400">AI model accuracy and validation metrics</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={forecastExportSettings.dataTypes.confidenceIntervals}
                            onCheckedChange={(checked) => updateForecastExportDataType('confidenceIntervals', checked)}
                          />
                          <div>
                            <Label className="text-slate-300">Confidence Intervals</Label>
                            <p className="text-xs text-slate-400">Prediction confidence ranges and uncertainty</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Scenario Selection */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white border-b border-slate-700 pb-2">Forecast Scenarios</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={forecastExportSettings.scenarios.optimistic}
                            onCheckedChange={(checked) => updateForecastExportScenario('optimistic', checked)}
                          />
                          <div>
                            <Label className="text-green-400">Optimistic Growth</Label>
                            <p className="text-xs text-slate-400">15% revenue growth scenario</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={forecastExportSettings.scenarios.realistic}
                            onCheckedChange={(checked) => updateForecastExportScenario('realistic', checked)}
                          />
                          <div>
                            <Label className="text-blue-400">Realistic Projection</Label>
                            <p className="text-xs text-slate-400">8% steady growth scenario</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={forecastExportSettings.scenarios.conservative}
                            onCheckedChange={(checked) => updateForecastExportScenario('conservative', checked)}
                          />
                          <div>
                            <Label className="text-yellow-400">Conservative Estimate</Label>
                            <p className="text-xs text-slate-400">5% cautious growth scenario</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={forecastExportSettings.scenarios.pessimistic}
                            onCheckedChange={(checked) => updateForecastExportScenario('pessimistic', checked)}
                          />
                          <div>
                            <Label className="text-red-400">Risk Scenario</Label>
                            <p className="text-xs text-slate-400">Economic downturn impact</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Export Format & Options */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white border-b border-slate-700 pb-2">Export Options</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label className="text-slate-300">Export Format</Label>
                          <Select value={forecastExportSettings.format} onValueChange={(value) => updateForecastExportSetting('format', value)}>
                            <SelectTrigger className="bg-slate-800 border-slate-700">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700">
                              <SelectItem value="xlsx">Excel Workbook (.xlsx)</SelectItem>
                              <SelectItem value="csv">CSV Files (.csv)</SelectItem>
                              <SelectItem value="pdf">PDF Report (.pdf)</SelectItem>
                              <SelectItem value="json">JSON Data (.json)</SelectItem>
                              <SelectItem value="pptx">PowerPoint (.pptx)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-slate-300">Forecast Period</Label>
                          <Select value={forecastExportSettings.dateRange} onValueChange={(value) => updateForecastExportSetting('dateRange', value)}>
                            <SelectTrigger className="bg-slate-800 border-slate-700">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700">
                              <SelectItem value="3months">Next 3 Months</SelectItem>
                              <SelectItem value="6months">Next 6 Months</SelectItem>
                              <SelectItem value="12months">Next 12 Months</SelectItem>
                              <SelectItem value="18months">Next 18 Months</SelectItem>
                              <SelectItem value="24months">Next 24 Months</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-slate-300">Detail Level</Label>
                          <Select value={forecastExportSettings.detailLevel} onValueChange={(value) => updateForecastExportSetting('detailLevel', value)}>
                            <SelectTrigger className="bg-slate-800 border-slate-700">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700">
                              <SelectItem value="summary">Executive Summary</SelectItem>
                              <SelectItem value="standard">Standard Report</SelectItem>
                              <SelectItem value="comprehensive">Comprehensive Analysis</SelectItem>
                              <SelectItem value="detailed">Detailed Breakdown</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={forecastExportSettings.includeHeaders}
                            onCheckedChange={(checked) => updateForecastExportSetting('includeHeaders', checked)}
                          />
                          <div>
                            <Label className="text-slate-300">Include Headers</Label>
                            <p className="text-xs text-slate-400">Add column names and descriptions</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={forecastExportSettings.includeCharts}
                            onCheckedChange={(checked) => updateForecastExportSetting('includeCharts', checked)}
                          />
                          <div>
                            <Label className="text-slate-300">Include Charts</Label>
                            <p className="text-xs text-slate-400">Embed visualization charts</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={forecastExportSettings.compression}
                            onCheckedChange={(checked) => updateForecastExportSetting('compression', checked)}
                          />
                          <div>
                            <Label className="text-slate-300">Compress Output</Label>
                            <p className="text-xs text-slate-400">Create ZIP archive for large files</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Export Preview */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white border-b border-slate-700 pb-2">Export Preview</h3>
                      
                      <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-slate-300 font-medium mb-2">Selected Data</h4>
                            <div className="space-y-1">
                              {Object.entries(forecastExportSettings.dataTypes)
                                .filter(([_, selected]) => selected)
                                .map(([dataType, _]) => (
                                  <Badge key={dataType} variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 mr-2 mb-1 text-xs">
                                    {dataType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                  </Badge>
                                ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-slate-300 font-medium mb-2">Selected Scenarios</h4>
                            <div className="space-y-1">
                              {Object.entries(forecastExportSettings.scenarios)
                                .filter(([_, selected]) => selected)
                                .map(([scenario, _]) => (
                                  <Badge key={scenario} variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 mr-2 mb-1 text-xs">
                                    {scenario.charAt(0).toUpperCase() + scenario.slice(1)}
                                  </Badge>
                                ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-3 border-t border-slate-700">
                          <div className="text-center">
                            <div className="text-slate-400 text-xs">Format</div>
                            <div className="text-slate-200 font-medium uppercase">{forecastExportSettings.format}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-slate-400 text-xs">Period</div>
                            <div className="text-slate-200 font-medium">{forecastExportSettings.dateRange.replace(/([A-Z])/g, ' $1')}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-slate-400 text-xs">Detail Level</div>
                            <div className="text-slate-200 font-medium capitalize">{forecastExportSettings.detailLevel}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-slate-400 text-xs">Features</div>
                            <div className="text-slate-200 font-medium">
                              {[
                                forecastExportSettings.includeHeaders && 'Headers',
                                forecastExportSettings.includeCharts && 'Charts',
                                forecastExportSettings.compression && 'Compressed'
                              ].filter(Boolean).join(', ') || 'Basic'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Export Information */}
                    <div className="p-4 border border-slate-700 rounded-lg bg-green-500/5">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-green-400 mt-0.5" />
                        <div>
                          <h4 className="text-green-400 font-medium mb-2">Export Information</h4>
                          <ul className="text-slate-300 text-sm space-y-1">
                            <li>• Export includes all selected forecast data and scenarios</li>
                            <li>• Charts and visualizations will be embedded in supported formats</li>
                            <li>• Large exports may be automatically compressed</li>
                            <li>• Export process typically takes 2-4 minutes</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Clock className="w-4 h-4" />
                        <span>Estimated export time: 2-4 minutes</span>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button 
                          variant="outline" 
                          onClick={() => setShowExportForecast(false)}
                          className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white hover:border-slate-600"
                          disabled={isExportingForecast}
                        >
                          Close
                        </Button>
                        <Button 
                          onClick={exportForecastData}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          disabled={isExportingForecast || !Object.values(forecastExportSettings.dataTypes).some(Boolean)}
                        >
                          <Download className={`w-4 h-4 mr-2 ${isExportingForecast ? 'animate-pulse' : ''}`} />
                          {isExportingForecast ? 'Exporting...' : 'Export Forecast'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog open={showAIAnalysis} onOpenChange={setShowAIAnalysis}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Brain className="w-4 h-4 mr-2" />
                    Run AI Analysis
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-6xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-white flex items-center gap-2">
                      <Brain className="w-6 h-6 text-blue-400" />
                      AI Financial Analysis
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6 py-4">
                    {/* Analysis Status Header */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="w-5 h-5 text-blue-400" />
                          <span className="text-slate-300 font-medium">Analysis Status</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-400">
                          {isRunningAnalysis ? 'Running' : 'Ready'}
                        </div>
                        <div className="text-sm text-slate-400">Last run: {lastAnalysisTime}</div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="w-5 h-5 text-green-400" />
                          <span className="text-slate-300 font-medium">Analysis Types</span>
                        </div>
                        <div className="text-2xl font-bold text-green-400">
                          {Object.values(aiAnalysisSettings.analysisTypes).filter(Boolean).length}
                        </div>
                        <div className="text-sm text-slate-400">Active modules</div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="w-5 h-5 text-purple-400" />
                          <span className="text-slate-300 font-medium">Insights</span>
                        </div>
                        <div className="text-2xl font-bold text-purple-400">
                          {analysisResults.length > 0 ? analysisResults.reduce((acc, result) => acc + result.insights.length, 0) : '0'}
                        </div>
                        <div className="text-sm text-slate-400">Generated insights</div>
                      </div>
                    </div>

                    {/* Analysis Progress Display */}
                    {isRunningAnalysis && (
                      <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/30">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Brain className="w-5 h-5 text-blue-400 animate-pulse" />
                            <span className="text-white font-medium">Running AI Analysis</span>
                          </div>
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                            {Math.round(analysisProgress)}% Complete
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-300 text-sm">{analysisStage}</span>
                            <span className="text-slate-400 text-sm">{Math.round(analysisProgress)}%</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-3">
                            <div 
                              className="bg-blue-400 h-3 rounded-full transition-all duration-300"
                              style={{ width: `${analysisProgress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Analysis Types Selection */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white border-b border-slate-700 pb-2">Analysis Modules</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={aiAnalysisSettings.analysisTypes.trendAnalysis}
                            onCheckedChange={(checked) => updateAiAnalysisType('trendAnalysis', checked)}
                          />
                          <div>
                            <Label className="text-slate-300 flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-green-400" />
                              Trend Analysis
                            </Label>
                            <p className="text-xs text-slate-400">Identify revenue and growth patterns</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={aiAnalysisSettings.analysisTypes.anomalyDetection}
                            onCheckedChange={(checked) => updateAiAnalysisType('anomalyDetection', checked)}
                          />
                          <div>
                            <Label className="text-slate-300 flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 text-yellow-400" />
                              Anomaly Detection
                            </Label>
                            <p className="text-xs text-slate-400">Detect unusual patterns and outliers</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={aiAnalysisSettings.analysisTypes.seasonalityAnalysis}
                            onCheckedChange={(checked) => updateAiAnalysisType('seasonalityAnalysis', checked)}
                          />
                          <div>
                            <Label className="text-slate-300 flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-blue-400" />
                              Seasonality Analysis
                            </Label>
                            <p className="text-xs text-slate-400">Analyze seasonal trends and cycles</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={aiAnalysisSettings.analysisTypes.riskAssessment}
                            onCheckedChange={(checked) => updateAiAnalysisType('riskAssessment', checked)}
                          />
                          <div>
                            <Label className="text-slate-300 flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-red-400" />
                              Risk Assessment
                            </Label>
                            <p className="text-xs text-slate-400">Evaluate financial risks and vulnerabilities</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={aiAnalysisSettings.analysisTypes.marketCorrelation}
                            onCheckedChange={(checked) => updateAiAnalysisType('marketCorrelation', checked)}
                          />
                          <div>
                            <Label className="text-slate-300 flex items-center gap-2">
                              <BarChart3 className="w-4 h-4 text-purple-400" />
                              Market Correlation
                            </Label>
                            <p className="text-xs text-slate-400">Analyze market factor correlations</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={aiAnalysisSettings.analysisTypes.predictiveInsights}
                            onCheckedChange={(checked) => updateAiAnalysisType('predictiveInsights', checked)}
                          />
                          <div>
                            <Label className="text-slate-300 flex items-center gap-2">
                              <Lightbulb className="w-4 h-4 text-amber-400" />
                              Predictive Insights
                            </Label>
                            <p className="text-xs text-slate-400">Generate future predictions and probabilities</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Analysis Settings */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white border-b border-slate-700 pb-2">Analysis Configuration</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <Label className="text-slate-300">Data Scope</Label>
                          <Select value={aiAnalysisSettings.dataScope} onValueChange={(value) => updateAiAnalysisSetting('dataScope', value)}>
                            <SelectTrigger className="bg-slate-800 border-slate-700">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700">
                              <SelectItem value="revenue">Revenue Only</SelectItem>
                              <SelectItem value="expenses">Expenses Focus</SelectItem>
                              <SelectItem value="cashflow">Cash Flow</SelectItem>
                              <SelectItem value="comprehensive">Comprehensive</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-slate-300">Time Horizon</Label>
                          <Select value={aiAnalysisSettings.timeHorizon} onValueChange={(value) => updateAiAnalysisSetting('timeHorizon', value)}>
                            <SelectTrigger className="bg-slate-800 border-slate-700">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700">
                              <SelectItem value="3months">3 Months</SelectItem>
                              <SelectItem value="6months">6 Months</SelectItem>
                              <SelectItem value="12months">12 Months</SelectItem>
                              <SelectItem value="24months">24 Months</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-slate-300">Analysis Depth</Label>
                          <Select value={aiAnalysisSettings.analysisDepth} onValueChange={(value) => updateAiAnalysisSetting('analysisDepth', value)}>
                            <SelectTrigger className="bg-slate-800 border-slate-700">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700">
                              <SelectItem value="quick">Quick Scan</SelectItem>
                              <SelectItem value="standard">Standard</SelectItem>
                              <SelectItem value="detailed">Detailed</SelectItem>
                              <SelectItem value="comprehensive">Comprehensive</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-slate-300">Confidence Level</Label>
                          <Select value={aiAnalysisSettings.confidenceLevel.toString()} onValueChange={(value) => updateAiAnalysisSetting('confidenceLevel', parseInt(value))}>
                            <SelectTrigger className="bg-slate-800 border-slate-700">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700">
                              <SelectItem value="90">90%</SelectItem>
                              <SelectItem value="95">95%</SelectItem>
                              <SelectItem value="99">99%</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={aiAnalysisSettings.includeRecommendations}
                            onCheckedChange={(checked) => updateAiAnalysisSetting('includeRecommendations', checked)}
                          />
                          <div>
                            <Label className="text-slate-300">Include Recommendations</Label>
                            <p className="text-xs text-slate-400">Generate actionable business recommendations</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={aiAnalysisSettings.enableDeepLearning}
                            onCheckedChange={(checked) => updateAiAnalysisSetting('enableDeepLearning', checked)}
                          />
                          <div>
                            <Label className="text-slate-300">Enable Deep Learning</Label>
                            <p className="text-xs text-slate-400">Use advanced neural networks (slower but more accurate)</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Analysis Results */}
                    {analysisResults.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-white border-b border-slate-700 pb-2">Analysis Results</h3>
                        
                        <div className="space-y-4">
                          {analysisResults.map((result, index) => (
                            <div key={index} className="p-4 border border-slate-700 rounded-lg bg-slate-800/30">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  {result.type === 'Trend Analysis' && <TrendingUp className="w-5 h-5 text-green-400" />}
                                  {result.type === 'Anomaly Detection' && <AlertTriangle className="w-5 h-5 text-yellow-400" />}
                                  {result.type === 'Seasonality Analysis' && <Calendar className="w-5 h-5 text-blue-400" />}
                                  {result.type === 'Market Correlation' && <BarChart3 className="w-5 h-5 text-purple-400" />}
                                  {result.type === 'Predictive Insights' && <Lightbulb className="w-5 h-5 text-amber-400" />}
                                  {result.type === 'AI Recommendations' && <Target className="w-5 h-5 text-cyan-400" />}
                                  <div>
                                    <h4 className="text-slate-300 font-medium">{result.type}</h4>
                                    <p className="text-slate-400 text-sm">Confidence: {result.confidence}%</p>
                                  </div>
                                </div>
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${
                                    result.severity === 'positive' 
                                      ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                      : result.severity === 'warning'
                                      ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                      : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                  }`}
                                >
                                  {result.severity === 'positive' ? 'Positive' : result.severity === 'warning' ? 'Warning' : 'Neutral'}
                                </Badge>
                              </div>
                              
                              <div className="space-y-3">
                                <div>
                                  <h5 className="text-sm font-medium text-slate-300 mb-2">Key Insights:</h5>
                                  <ul className="space-y-1">
                                    {result.insights.map((insight: string, idx: number) => (
                                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-400">
                                        <CheckCircle2 className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                                        {insight}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                
                                <div className="p-3 rounded-lg bg-slate-700/30 border border-slate-600">
                                  <h5 className="text-sm font-medium text-slate-300 mb-1">Recommendation:</h5>
                                  <p className="text-sm text-slate-300">{result.recommendation}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Analysis Information */}
                    <div className="p-4 border border-slate-700 rounded-lg bg-blue-500/5">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-400 mt-0.5" />
                        <div>
                          <h4 className="text-blue-400 font-medium mb-2">AI Analysis Information</h4>
                          <ul className="text-slate-300 text-sm space-y-1">
                            <li>• Analysis uses advanced machine learning algorithms</li>
                            <li>• Results include confidence levels and actionable insights</li>
                            <li>• Deep learning mode provides more accurate but slower analysis</li>
                            <li>• Analysis typically takes 3-6 minutes depending on scope</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Clock className="w-4 h-4" />
                        <span>Estimated analysis time: 3-6 minutes</span>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button 
                          variant="outline" 
                          onClick={() => setShowAIAnalysis(false)}
                          className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white hover:border-slate-600"
                          disabled={isRunningAnalysis}
                        >
                          Close
                        </Button>
                        <Button 
                          onClick={runAIAnalysis}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          disabled={isRunningAnalysis || !Object.values(aiAnalysisSettings.analysisTypes).some(Boolean)}
                        >
                          <Brain className={`w-4 h-4 mr-2 ${isRunningAnalysis ? 'animate-pulse' : ''}`} />
                          {isRunningAnalysis ? 'Analyzing...' : 'Run AI Analysis'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Forecast Overview Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {keyMetrics.map((metric, index) => (
            <Card key={index} className="bg-slate-900 border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">{metric.title}</CardTitle>
                {metric.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-400" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-400" />
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{metric.predicted}</div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    {metric.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-400 mr-1" />
                    )}
                    <span className={`text-sm ${metric.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                      {metric.change}
                    </span>
                  </div>
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">
                    {metric.confidence}%
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 mt-1">{metric.period}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Forecasting Tabs */}
        <Tabs defaultValue="scenarios" className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="scenarios">Scenario Analysis</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
            <TabsTrigger value="models">AI Models</TabsTrigger>
            <TabsTrigger value="factors">Market Factors</TabsTrigger>
          </TabsList>

          <TabsContent value="scenarios" className="space-y-6">
            {/* Scenario Selector */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Forecast Scenarios</CardTitle>
                    <p className="text-slate-400 text-sm">Compare different business scenarios and their projected outcomes</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                    <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                      <Zap className="w-4 h-4 mr-2" />
                      New Scenario
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {forecastScenarios.map((scenario) => (
                  <div key={scenario.id} className={`p-4 rounded-lg border ${scenario.borderColor} ${scenario.bgColor} transition-colors hover:bg-opacity-20`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-slate-200 font-medium">{scenario.name}</h3>
                          <Badge variant="outline" className={`${scenario.bgColor} ${scenario.color} ${scenario.borderColor} text-xs`}>
                            {scenario.probability} Probability
                          </Badge>
                          <Badge variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600 text-xs">
                            {scenario.confidence}% Confidence
                          </Badge>
                        </div>
                        <p className="text-slate-300 text-sm mb-3">{scenario.description}</p>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <span className="text-slate-400 text-xs">Projected Revenue</span>
                            <p className="text-slate-200 font-medium">{scenario.revenue}</p>
                          </div>
                          <div>
                            <span className="text-slate-400 text-xs">Expected Profit</span>
                            <p className="text-slate-200 font-medium">{scenario.profit}</p>
                          </div>
                          <div>
                            <span className="text-slate-400 text-xs">Growth Rate</span>
                            <p className={`font-medium ${scenario.color}`}>{scenario.growth}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                          <PlayCircle className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Scenario Comparison Chart */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Scenario Impact Analysis</CardTitle>
                    <p className="text-slate-400 text-sm">Visual comparison of different scenario outcomes</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Chart View
                    </Button>
                    <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border border-slate-700 rounded-lg bg-slate-800/30 p-4">
                  <ScenarioChart />
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                  {forecastScenarios.map((scenario) => (
                    <div key={scenario.id} className="text-center p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                      <div className={`text-sm font-medium ${scenario.color} mb-1`}>
                        {scenario.name}
                      </div>
                      <div className="text-xs text-slate-400 space-y-1">
                        <div>Revenue: {scenario.revenue}</div>
                        <div>Profit: {scenario.profit}</div>
                        <div>Growth: {scenario.growth}</div>
                      </div>
                      <Badge variant="outline" className={`mt-2 text-xs ${scenario.bgColor} ${scenario.color} ${scenario.borderColor}`}>
                        {scenario.confidence}% confidence
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            {/* Revenue Prediction Timeline */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Revenue Prediction Timeline</CardTitle>
                    <p className="text-slate-400 text-sm">12-month revenue forecast with confidence intervals</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                      <Calendar className="w-4 h-4 mr-2" />
                      12 Months
                    </Button>
                    <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                      <Filter className="w-4 h-4 mr-2" />
                      All Products
                    </Button>
                    <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border border-slate-700 rounded-lg bg-slate-800/30 p-4">
                  <RevenuePredictionChart />
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-slate-300 text-sm font-medium">Historical Data</span>
                    </div>
                    <div className="text-slate-400 text-xs">
                      <div>6 months of actual revenue</div>
                      <div>Average: $220K/month</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-slate-300 text-sm font-medium">AI Predictions</span>
                    </div>
                    <div className="text-slate-400 text-xs">
                      <div>12-month forecast</div>
                      <div>Expected: +15% growth</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-blue-500 opacity-30 rounded-full"></div>
                      <span className="text-slate-300 text-sm font-medium">Confidence Range</span>
                    </div>
                    <div className="text-slate-400 text-xs">
                      <div>±25% prediction interval</div>
                      <div>94% model accuracy</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Predictions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Next 6 Months</CardTitle>
                  <p className="text-slate-400 text-sm">Detailed monthly predictions</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { month: "Jan 2025", revenue: "$235K", confidence: 94, change: "+8%" },
                    { month: "Feb 2025", revenue: "$218K", confidence: 91, change: "+5%" },
                    { month: "Mar 2025", revenue: "$267K", confidence: 89, change: "+12%" },
                    { month: "Apr 2025", revenue: "$285K", confidence: 85, change: "+15%" },
                    { month: "May 2025", revenue: "$298K", confidence: 82, change: "+18%" },
                    { month: "Jun 2025", revenue: "$312K", confidence: 78, change: "+22%" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 text-slate-300 text-sm">{item.month}</div>
                        <div className="text-slate-200 font-medium">{item.revenue}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-green-400 text-sm">{item.change}</span>
                        <div className="flex items-center gap-2">
                          <Progress value={item.confidence} className="w-16 h-2 bg-slate-800" />
                          <span className="text-slate-400 text-xs w-8">{item.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Key Predictions</CardTitle>
                  <p className="text-slate-400 text-sm">Critical forecast insights</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <p className="text-slate-200 text-sm font-medium">Revenue Growth Acceleration</p>
                      <p className="text-slate-400 text-xs">Expected 15% increase in Q2 2025</p>
                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-xs mt-1">
                        High Confidence
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <div>
                      <p className="text-slate-200 text-sm font-medium">Seasonal Dip Expected</p>
                      <p className="text-slate-400 text-xs">Q1 2025 may show 8% decline</p>
                      <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 text-xs mt-1">
                        Monitor Closely
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-slate-200 text-sm font-medium">Market Opportunity</p>
                      <p className="text-slate-400 text-xs">New segment could add $180K</p>
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs mt-1">
                        Strategic Focus
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="models" className="space-y-6">
            {/* AI Model Performance */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI Forecasting Models
                </CardTitle>
                <p className="text-slate-400 text-sm">Machine learning models powering your predictions</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="p-4 border border-slate-700 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-slate-200 font-medium">Revenue Predictor</h4>
                      <Badge variant="outline" className={`${
                        modelPerformance.revenuePredictor.status === "Active" 
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : modelPerformance.revenuePredictor.status === "Training"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                      }`}>
                        {modelPerformance.revenuePredictor.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Accuracy</span>
                        <span className="text-green-400">{modelPerformance.revenuePredictor.accuracy}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Last Trained</span>
                        <span className="text-slate-300">{modelPerformance.revenuePredictor.lastTrained}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Data Points</span>
                        <span className="text-slate-300">{modelPerformance.revenuePredictor.dataPoints.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border border-slate-700 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-slate-200 font-medium">Cash Flow Model</h4>
                      <Badge variant="outline" className={`${
                        modelPerformance.cashFlowModel.status === "Active" 
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : modelPerformance.cashFlowModel.status === "Training"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                      }`}>
                        {modelPerformance.cashFlowModel.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Accuracy</span>
                        <span className="text-blue-400">{modelPerformance.cashFlowModel.accuracy}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Last Trained</span>
                        <span className="text-slate-300">{modelPerformance.cashFlowModel.lastTrained}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Data Points</span>
                        <span className="text-slate-300">{modelPerformance.cashFlowModel.dataPoints.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border border-slate-700 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-slate-200 font-medium">Market Analyzer</h4>
                      <Badge variant="outline" className={`${
                        modelPerformance.marketAnalyzer.status === "Active" 
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : modelPerformance.marketAnalyzer.status === "Training"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                      }`}>
                        {modelPerformance.marketAnalyzer.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Accuracy</span>
                        <span className="text-yellow-400">{modelPerformance.marketAnalyzer.accuracy}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Last Trained</span>
                        <span className="text-slate-300">{modelPerformance.marketAnalyzer.lastTrained}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Data Points</span>
                        <span className="text-slate-300">{modelPerformance.marketAnalyzer.dataPoints.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Retraining Progress Display */}
                {isRetraining && (
                  <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
                        <span className="text-white font-medium">Retraining Models</span>
                      </div>
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                        {Math.round(retrainingProgress)}% Complete
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300 text-sm">{retrainingStage}</span>
                        <span className="text-slate-400 text-sm">{Math.round(retrainingProgress)}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${retrainingProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex gap-3 pt-4 border-t border-slate-700">
                  <Button 
                    variant="outline" 
                    className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white hover:border-slate-600 transition-all duration-200"
                    onClick={retrainModels}
                    disabled={isRetraining}
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isRetraining ? 'animate-spin' : ''}`} />
                    {isRetraining ? 'Retraining...' : 'Retrain Models'}
                  </Button>
                  <Dialog open={showModelSettings} onOpenChange={setShowModelSettings}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white hover:border-slate-600 transition-all duration-200">
                        <Settings className="w-4 h-4 mr-2" />
                        Model Settings
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-white flex items-center gap-2">
                          <Settings className="w-5 h-5" />
                          AI Model Configuration
                        </DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-6 py-4">
                        {/* General Settings */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-white border-b border-slate-700 pb-2">General Settings</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-slate-300">Auto-Retrain Models</Label>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={modelSettings.autoRetrain}
                                  onCheckedChange={(checked) => updateModelSettings('autoRetrain', checked)}
                                />
                                <span className="text-sm text-slate-400">
                                  {modelSettings.autoRetrain ? 'Enabled' : 'Disabled'}
                                </span>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label className="text-slate-300">Retrain Frequency</Label>
                              <Select value={modelSettings.retrainFrequency} onValueChange={(value) => updateModelSettings('retrainFrequency', value)}>
                                <SelectTrigger className="bg-slate-800 border-slate-700">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-slate-700">
                                  <SelectItem value="daily">Daily</SelectItem>
                                  <SelectItem value="weekly">Weekly</SelectItem>
                                  <SelectItem value="monthly">Monthly</SelectItem>
                                  <SelectItem value="quarterly">Quarterly</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-2">
                              <Label className="text-slate-300">Accuracy Threshold (%)</Label>
                              <Input
                                type="number"
                                value={modelSettings.accuracyThreshold}
                                onChange={(e) => updateModelSettings('accuracyThreshold', parseInt(e.target.value))}
                                className="bg-slate-800 border-slate-700"
                                min="70"
                                max="100"
                              />
                              <p className="text-xs text-slate-400">Minimum accuracy before auto-retrain triggers</p>
                            </div>
                            
                            <div className="space-y-2">
                              <Label className="text-slate-300">Data Retention</Label>
                              <Select value={modelSettings.dataRetention} onValueChange={(value) => updateModelSettings('dataRetention', value)}>
                                <SelectTrigger className="bg-slate-800 border-slate-700">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-slate-700">
                                  <SelectItem value="3months">3 Months</SelectItem>
                                  <SelectItem value="6months">6 Months</SelectItem>
                                  <SelectItem value="12months">12 Months</SelectItem>
                                  <SelectItem value="24months">24 Months</SelectItem>
                                  <SelectItem value="unlimited">Unlimited</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>

                        {/* Notification Settings */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-white border-b border-slate-700 pb-2">Notifications</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-slate-300">Enable Notifications</Label>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={modelSettings.enableNotifications}
                                  onCheckedChange={(checked) => updateModelSettings('enableNotifications', checked)}
                                />
                                <span className="text-sm text-slate-400">
                                  {modelSettings.enableNotifications ? 'Enabled' : 'Disabled'}
                                </span>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label className="text-slate-300">Notification Email</Label>
                              <Input
                                type="email"
                                value={modelSettings.notificationEmail}
                                onChange={(e) => updateModelSettings('notificationEmail', e.target.value)}
                                className="bg-slate-800 border-slate-700"
                                placeholder="admin@company.com"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Model Training Parameters */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-white border-b border-slate-700 pb-2">Training Parameters</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label className="text-slate-300">Learning Rate</Label>
                              <Input
                                type="number"
                                step="0.0001"
                                value={modelSettings.learningRate}
                                onChange={(e) => updateModelSettings('learningRate', parseFloat(e.target.value))}
                                className="bg-slate-800 border-slate-700"
                                min="0.0001"
                                max="0.1"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label className="text-slate-300">Epochs</Label>
                              <Input
                                type="number"
                                value={modelSettings.epochs}
                                onChange={(e) => updateModelSettings('epochs', parseInt(e.target.value))}
                                className="bg-slate-800 border-slate-700"
                                min="10"
                                max="1000"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label className="text-slate-300">Batch Size</Label>
                              <Input
                                type="number"
                                value={modelSettings.batchSize}
                                onChange={(e) => updateModelSettings('batchSize', parseInt(e.target.value))}
                                className="bg-slate-800 border-slate-700"
                                min="8"
                                max="128"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label className="text-slate-300">Validation Split</Label>
                              <Input
                                type="number"
                                step="0.1"
                                value={modelSettings.validationSplit}
                                onChange={(e) => updateModelSettings('validationSplit', parseFloat(e.target.value))}
                                className="bg-slate-800 border-slate-700"
                                min="0.1"
                                max="0.5"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label className="text-slate-300">Model Complexity</Label>
                              <Select value={modelSettings.modelComplexity} onValueChange={(value) => updateModelSettings('modelComplexity', value)}>
                                <SelectTrigger className="bg-slate-800 border-slate-700">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-slate-700">
                                  <SelectItem value="low">Low</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="high">High</SelectItem>
                                  <SelectItem value="adaptive">Adaptive</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-2">
                              <Label className="text-slate-300">Feature Selection</Label>
                              <Select value={modelSettings.featureSelection} onValueChange={(value) => updateModelSettings('featureSelection', value)}>
                                <SelectTrigger className="bg-slate-800 border-slate-700">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-slate-700">
                                  <SelectItem value="automatic">Automatic</SelectItem>
                                  <SelectItem value="manual">Manual</SelectItem>
                                  <SelectItem value="correlation">Correlation-based</SelectItem>
                                  <SelectItem value="importance">Importance-based</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>

                        {/* Advanced Options */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-white border-b border-slate-700 pb-2">Advanced Options</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-slate-300">Enable Early Stopping</Label>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={modelSettings.enableEarlyStop}
                                  onCheckedChange={(checked) => updateModelSettings('enableEarlyStop', checked)}
                                />
                                <span className="text-sm text-slate-400">
                                  {modelSettings.enableEarlyStop ? 'Enabled' : 'Disabled'}
                                </span>
                              </div>
                              <p className="text-xs text-slate-400">Stops training when validation loss stops improving</p>
                            </div>
                            
                            <div className="space-y-2">
                              <Label className="text-slate-300">Enable Cross Validation</Label>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={modelSettings.enableCrossValidation}
                                  onCheckedChange={(checked) => updateModelSettings('enableCrossValidation', checked)}
                                />
                                <span className="text-sm text-slate-400">
                                  {modelSettings.enableCrossValidation ? 'Enabled' : 'Disabled'}
                                </span>
                              </div>
                              <p className="text-xs text-slate-400">Uses k-fold cross validation for better accuracy</p>
                            </div>
                          </div>
                        </div>

                        {/* Current Configuration Summary */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-white border-b border-slate-700 pb-2">Configuration Summary</h3>
                          
                          <div className="bg-slate-800/50 rounded-lg p-4 space-y-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-slate-400">Auto-Retrain:</span>
                                <Badge variant="outline" className={`text-xs ${modelSettings.autoRetrain ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                                  {modelSettings.autoRetrain ? 'On' : 'Off'}
                                </Badge>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400">Frequency:</span>
                                <span className="text-slate-300 capitalize">{modelSettings.retrainFrequency}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400">Threshold:</span>
                                <span className="text-slate-300">{modelSettings.accuracyThreshold}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400">Learning Rate:</span>
                                <span className="text-slate-300">{modelSettings.learningRate}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400">Epochs:</span>
                                <span className="text-slate-300">{modelSettings.epochs}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400">Complexity:</span>
                                <span className="text-slate-300 capitalize">{modelSettings.modelComplexity}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
                          <Button 
                            variant="outline" 
                            onClick={() => setShowModelSettings(false)}
                            className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white hover:border-slate-600 transition-all duration-200"
                          >
                            Cancel
                          </Button>
                          <Button 
                            onClick={() => {
                              // Here you could add logic to save settings to backend
                              setShowModelSettings(false)
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
                          >
                            Save Settings
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white hover:border-slate-600 transition-all duration-200">
                        <Download className="w-4 h-4 mr-2" />
                        Export Model Data
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-white flex items-center gap-2">
                          <Download className="w-5 h-5" />
                          Export Model Data
                        </DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-6 py-4">
                        {/* Export Progress */}
                        {isExporting && (
                          <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/30">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <Download className="w-4 h-4 text-blue-400 animate-pulse" />
                                <span className="text-white font-medium">Exporting Data</span>
                              </div>
                              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                                {Math.round(exportProgress)}% Complete
                              </Badge>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2">
                              <div 
                                className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${exportProgress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Model Selection */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-white border-b border-slate-700 pb-2">Select Models</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={exportSettings.models.revenuePredictor}
                                onCheckedChange={(checked) => updateExportSettings('models', 'revenuePredictor', checked)}
                              />
                              <div>
                                <Label className="text-slate-300">Revenue Predictor</Label>
                                <p className="text-xs text-slate-400">Accuracy: {modelPerformance.revenuePredictor.accuracy}%</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={exportSettings.models.cashFlowModel}
                                onCheckedChange={(checked) => updateExportSettings('models', 'cashFlowModel', checked)}
                              />
                              <div>
                                <Label className="text-slate-300">Cash Flow Model</Label>
                                <p className="text-xs text-slate-400">Accuracy: {modelPerformance.cashFlowModel.accuracy}%</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={exportSettings.models.marketAnalyzer}
                                onCheckedChange={(checked) => updateExportSettings('models', 'marketAnalyzer', checked)}
                              />
                              <div>
                                <Label className="text-slate-300">Market Analyzer</Label>
                                <p className="text-xs text-slate-400">Accuracy: {modelPerformance.marketAnalyzer.accuracy}%</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Data Types */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-white border-b border-slate-700 pb-2">Data Types to Export</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={exportSettings.dataTypes.trainingData}
                                onCheckedChange={(checked) => updateExportSettings('dataTypes', 'trainingData', checked)}
                              />
                              <div>
                                <Label className="text-slate-300">Training Data</Label>
                                <p className="text-xs text-slate-400">Historical datasets used for training</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={exportSettings.dataTypes.modelMetrics}
                                onCheckedChange={(checked) => updateExportSettings('dataTypes', 'modelMetrics', checked)}
                              />
                              <div>
                                <Label className="text-slate-300">Model Metrics</Label>
                                <p className="text-xs text-slate-400">Accuracy, precision, recall scores</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={exportSettings.dataTypes.predictions}
                                onCheckedChange={(checked) => updateExportSettings('dataTypes', 'predictions', checked)}
                              />
                              <div>
                                <Label className="text-slate-300">Predictions</Label>
                                <p className="text-xs text-slate-400">Generated forecasts and predictions</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={exportSettings.dataTypes.parameters}
                                onCheckedChange={(checked) => updateExportSettings('dataTypes', 'parameters', checked)}
                              />
                              <div>
                                <Label className="text-slate-300">Model Parameters</Label>
                                <p className="text-xs text-slate-400">Weights, biases, and hyperparameters</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={exportSettings.dataTypes.performance}
                                onCheckedChange={(checked) => updateExportSettings('dataTypes', 'performance', checked)}
                              />
                              <div>
                                <Label className="text-slate-300">Performance Data</Label>
                                <p className="text-xs text-slate-400">Training history and validation results</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={exportSettings.dataTypes.logs}
                                onCheckedChange={(checked) => updateExportSettings('dataTypes', 'logs', checked)}
                              />
                              <div>
                                <Label className="text-slate-300">Training Logs</Label>
                                <p className="text-xs text-slate-400">Detailed training process logs</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Export Format & Options */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-white border-b border-slate-700 pb-2">Export Options</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-slate-300">Export Format</Label>
                              <Select value={exportSettings.format} onValueChange={(value) => updateExportSetting('format', value)}>
                                <SelectTrigger className="bg-slate-800 border-slate-700">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-slate-700">
                                  <SelectItem value="csv">CSV (Comma Separated)</SelectItem>
                                  <SelectItem value="json">JSON (JavaScript Object)</SelectItem>
                                  <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                                  <SelectItem value="parquet">Parquet (Columnar)</SelectItem>
                                  <SelectItem value="pkl">Pickle (Python Binary)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-2">
                              <Label className="text-slate-300">Date Range</Label>
                              <Select value={exportSettings.dateRange} onValueChange={(value) => updateExportSetting('dateRange', value)}>
                                <SelectTrigger className="bg-slate-800 border-slate-700">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-slate-700">
                                  <SelectItem value="all">All Time</SelectItem>
                                  <SelectItem value="last30">Last 30 Days</SelectItem>
                                  <SelectItem value="last90">Last 90 Days</SelectItem>
                                  <SelectItem value="last6months">Last 6 Months</SelectItem>
                                  <SelectItem value="lastyear">Last Year</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={exportSettings.includeHeaders}
                                onCheckedChange={(checked) => updateExportSetting('includeHeaders', checked)}
                              />
                              <div>
                                <Label className="text-slate-300">Include Headers</Label>
                                <p className="text-xs text-slate-400">Add column names to exported data</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={exportSettings.compression}
                                onCheckedChange={(checked) => updateExportSetting('compression', checked)}
                              />
                              <div>
                                <Label className="text-slate-300">Compress Output</Label>
                                <p className="text-xs text-slate-400">Create ZIP archive for large exports</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Export Summary */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-white border-b border-slate-700 pb-2">Export Summary</h3>
                          
                          <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-slate-300 font-medium mb-2">Selected Models</h4>
                                <div className="space-y-1">
                                  {exportSettings.models.revenuePredictor && (
                                    <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 mr-2">
                                      Revenue Predictor
                                    </Badge>
                                  )}
                                  {exportSettings.models.cashFlowModel && (
                                    <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 mr-2">
                                      Cash Flow Model
                                    </Badge>
                                  )}
                                  {exportSettings.models.marketAnalyzer && (
                                    <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20 mr-2">
                                      Market Analyzer
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-slate-300 font-medium mb-2">Export Details</h4>
                                <div className="space-y-1 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-slate-400">Format:</span>
                                    <span className="text-slate-300 uppercase">{exportSettings.format}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-400">Date Range:</span>
                                    <span className="text-slate-300 capitalize">{exportSettings.dateRange.replace(/([A-Z])/g, ' $1')}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-400">Compression:</span>
                                    <span className="text-slate-300">{exportSettings.compression ? 'Enabled' : 'Disabled'}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-400">Data Types:</span>
                                    <span className="text-slate-300">
                                      {Object.values(exportSettings.dataTypes).filter(Boolean).length} selected
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
                          <Button 
                            variant="outline" 
                            onClick={() => setShowExportDialog(false)}
                            className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white hover:border-slate-600 transition-all duration-200"
                            disabled={isExporting}
                          >
                            Cancel
                          </Button>
                          <Button 
                            onClick={exportModelData}
                            className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
                            disabled={isExporting || (!Object.values(exportSettings.models).some(Boolean))}
                          >
                            <Download className={`w-4 h-4 mr-2 ${isExporting ? 'animate-pulse' : ''}`} />
                            {isExporting ? 'Exporting...' : 'Start Export'}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="factors" className="space-y-6">
            {/* Market Factors Analysis */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Market Factors Impact</CardTitle>
                <p className="text-slate-400 text-sm">External factors influencing your forecasts</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {marketFactors.map((factor, index) => (
                  <div key={index} className="p-4 border border-slate-700 rounded-lg hover:bg-slate-800/30 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h4 className="text-slate-200 font-medium">{factor.factor}</h4>
                        <Badge variant="outline" className={`text-xs ${
                          factor.impact === "High" 
                            ? "bg-red-500/10 text-red-400 border-red-500/20"
                            : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                        }`}>
                          {factor.impact} Impact
                        </Badge>
                      </div>
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">
                        {factor.confidence}% Confidence
                      </Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Current</span>
                        <p className="text-slate-200 font-medium">{factor.current}</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Projected</span>
                        <p className="text-slate-200 font-medium">{factor.projected}</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Financial Impact</span>
                        <p className={`font-medium ${factor.influence.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                          {factor.influence}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={factor.confidence} className="flex-1 h-2 bg-slate-800" />
                        <span className="text-slate-400 text-xs">{factor.confidence}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Factor Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Economic Indicators</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">GDP Growth Rate</span>
                    <span className="text-green-400 font-medium">+2.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Inflation Rate</span>
                    <span className="text-yellow-400 font-medium">3.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Interest Rates</span>
                    <span className="text-blue-400 font-medium">5.25%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Consumer Confidence</span>
                    <span className="text-green-400 font-medium">78.5</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Industry Trends</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Market Size Growth</span>
                    <span className="text-green-400 font-medium">+12.4%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Digital Adoption</span>
                    <span className="text-blue-400 font-medium">+18.7%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Customer Acquisition Cost</span>
                    <span className="text-red-400 font-medium">+8.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Retention Rate</span>
                    <span className="text-green-400 font-medium">92.8%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 