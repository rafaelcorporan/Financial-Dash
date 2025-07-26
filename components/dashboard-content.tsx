"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  RefreshCw,
  Download,
  Shield,
  Zap,
  Database,
  Wifi,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  CreditCard,
  Settings,
  PieChart,
  Lock,
  Key,
  Eye,
  FileCheck,
  Globe,
  Server,
  Users,
  XCircle,
  Clock,
  Link,
  Cloud,
  HardDrive,
  Banknote,
  Building2,
  CheckCircle2,
  Play,
  Pause,
} from "lucide-react"
import { FinancialChart } from "@/components/financial-chart"

interface DashboardContentProps {
  onViewChange?: (view: string) => void
}

export function DashboardContent({ onViewChange }: DashboardContentProps = {}) {
  const [showSecurityScan, setShowSecurityScan] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanStage, setScanStage] = useState("")
  const [scanResults, setScanResults] = useState<any[]>([])
  const [lastScanTime, setLastScanTime] = useState<string | null>(null)
  
  // Data Sync State
  const [showDataSync, setShowDataSync] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncProgress, setSyncProgress] = useState(0)
  const [syncStage, setSyncStage] = useState("")
  const [syncResults, setSyncResults] = useState<any[]>([])
  const [lastSyncTime, setLastSyncTime] = useState<string | null>("2 min ago")
  
  // Client-side hydration state
  const [mounted, setMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState("")
  const [currentDate, setCurrentDate] = useState("")
  
  // Expense Chart State
  const expenseChartRef = useRef<HTMLCanvasElement>(null)
  const expenseTooltipRef = useRef<HTMLDivElement>(null)
  
  // Profit Chart State
  const profitChartRef = useRef<HTMLCanvasElement>(null)
  const profitTooltipRef = useRef<HTMLDivElement>(null)

  // Handle client-side hydration
  useEffect(() => {
    setMounted(true)
    
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }))
      setCurrentDate(new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }))
    }
    
    updateTime()
    
    // Update time every second
    const interval = setInterval(updateTime, 1000)
    
    return () => clearInterval(interval)
  }, [])

  // Don't render time-dependent content until mounted
  if (!mounted) {
    return <div className="flex-1 bg-slate-950 text-white">Loading...</div>
  }

  // Security Scan Function
  const performSecurityScan = async () => {
    if (isScanning) return
    
    setIsScanning(true)
    setScanProgress(0)
    setScanResults([])
    
    const securityChecks = [
      { name: "Checking authentication systems...", duration: 2000 },
      { name: "Scanning for vulnerabilities...", duration: 2500 },
      { name: "Validating data encryption...", duration: 1800 },
      { name: "Reviewing access permissions...", duration: 2200 },
      { name: "Analyzing network security...", duration: 1500 },
      { name: "Checking financial data integrity...", duration: 2000 },
      { name: "Validating backup systems...", duration: 1300 },
      { name: "Finalizing security report...", duration: 1000 }
    ]
    
    let totalProgress = 0
    const progressPerCheck = 100 / securityChecks.length
    
    const results = []
    
    for (let i = 0; i < securityChecks.length; i++) {
      setScanStage(securityChecks[i].name)
      
      // Simulate gradual progress within each check
      const checkStartProgress = totalProgress
      const steps = 20
      const stepDuration = securityChecks[i].duration / steps
      
      for (let step = 0; step < steps; step++) {
        await new Promise(resolve => setTimeout(resolve, stepDuration))
        const checkProgress = checkStartProgress + (progressPerCheck * (step + 1) / steps)
        setScanProgress(Math.min(checkProgress, 100))
      }
      
      // Add realistic security check results
      switch (i) {
        case 0: // Authentication systems
          results.push({
            category: "Authentication",
            item: "Multi-factor Authentication",
            status: "pass",
            description: "MFA enabled for all admin accounts",
            risk: "low"
          })
          results.push({
            category: "Authentication", 
            item: "Password Policies",
            status: "pass",
            description: "Strong password requirements enforced",
            risk: "low"
          })
          break
        case 1: // Vulnerabilities
          results.push({
            category: "Vulnerabilities",
            item: "System Updates",
            status: "warning",
            description: "2 non-critical updates available",
            risk: "medium"
          })
          results.push({
            category: "Vulnerabilities",
            item: "Security Patches",
            status: "pass",
            description: "All critical patches applied",
            risk: "low"
          })
          break
        case 2: // Data encryption
          results.push({
            category: "Encryption",
            item: "Data at Rest",
            status: "pass",
            description: "AES-256 encryption enabled",
            risk: "low"
          })
          results.push({
            category: "Encryption",
            item: "Data in Transit",
            status: "pass",
            description: "TLS 1.3 encryption active",
            risk: "low"
          })
          break
        case 3: // Access permissions
          results.push({
            category: "Access Control",
            item: "User Permissions",
            status: "pass",
            description: "Principle of least privilege enforced",
            risk: "low"
          })
          results.push({
            category: "Access Control",
            item: "Inactive Accounts",
            status: "warning",
            description: "3 inactive accounts detected",
            risk: "medium"
          })
          break
        case 4: // Network security
          results.push({
            category: "Network",
            item: "Firewall Configuration",
            status: "pass",
            description: "All ports properly configured",
            risk: "low"
          })
          results.push({
            category: "Network",
            item: "Intrusion Detection",
            status: "pass",
            description: "IDS monitoring active",
            risk: "low"
          })
          break
        case 5: // Financial data integrity
          results.push({
            category: "Data Integrity",
            item: "Financial Records",
            status: "pass",
            description: "No anomalies detected",
            risk: "low"
          })
          results.push({
            category: "Data Integrity",
            item: "Audit Trails",
            status: "pass",
            description: "Complete audit logs maintained",
            risk: "low"
          })
          break
        case 6: // Backup systems
          results.push({
            category: "Backup",
            item: "Data Backup",
            status: "pass",
            description: "Last backup: 2 hours ago",
            risk: "low"
          })
          results.push({
            category: "Backup",
            item: "Recovery Testing",
            status: "warning",
            description: "Last recovery test: 30 days ago",
            risk: "medium"
          })
          break
      }
      
      totalProgress += progressPerCheck
    }
    
    setScanResults(results)
    setScanProgress(100)
    setScanStage("Security scan completed successfully!")
    setLastScanTime(new Date().toLocaleString())
    
    // Reset after showing completion
    setTimeout(() => {
      setIsScanning(false)
      setScanProgress(0)
      setScanStage("")
    }, 2000)
  }

  // Data Sync Function
  const performDataSync = async () => {
    if (isSyncing) return
    
    setIsSyncing(true)
    setSyncProgress(0)
    setSyncResults([])
    
    const syncOperations = [
      { name: "Connecting to bank APIs...", duration: 2000 },
      { name: "Fetching account balances...", duration: 2500 },
      { name: "Synchronizing transactions...", duration: 3000 },
      { name: "Updating payment processor data...", duration: 2200 },
      { name: "Syncing accounting systems...", duration: 1800 },
      { name: "Processing investment accounts...", duration: 2000 },
      { name: "Validating data integrity...", duration: 1500 },
      { name: "Finalizing synchronization...", duration: 1000 }
    ]
    
    let totalProgress = 0
    const progressPerOperation = 100 / syncOperations.length
    
    const results = []
    
    for (let i = 0; i < syncOperations.length; i++) {
      setSyncStage(syncOperations[i].name)
      
      // Simulate gradual progress within each operation
      const operationStartProgress = totalProgress
      const steps = 20
      const stepDuration = syncOperations[i].duration / steps
      
      for (let step = 0; step < steps; step++) {
        await new Promise(resolve => setTimeout(resolve, stepDuration))
        const operationProgress = operationStartProgress + (progressPerOperation * (step + 1) / steps)
        setSyncProgress(Math.min(operationProgress, 100))
      }
      
      // Add realistic sync results
      switch (i) {
        case 0: // Bank APIs
          results.push({
            source: "Chase Bank",
            type: "bank",
            status: "success",
            records: 247,
            lastSync: "Just now",
            connection: "active"
          })
          results.push({
            source: "Wells Fargo",
            type: "bank", 
            status: "success",
            records: 189,
            lastSync: "Just now",
            connection: "active"
          })
          break
        case 1: // Account balances
          results.push({
            source: "Business Checking",
            type: "account",
            status: "success",
            records: 1,
            lastSync: "Just now",
            connection: "active"
          })
          results.push({
            source: "Savings Account",
            type: "account",
            status: "success", 
            records: 1,
            lastSync: "Just now",
            connection: "active"
          })
          break
        case 2: // Transactions
          results.push({
            source: "Credit Card Transactions",
            type: "transaction",
            status: "success",
            records: 1247,
            lastSync: "Just now",
            connection: "active"
          })
          break
        case 3: // Payment processors
          results.push({
            source: "Stripe",
            type: "payment",
            status: "success",
            records: 567,
            lastSync: "Just now",
            connection: "active"
          })
          results.push({
            source: "PayPal",
            type: "payment",
            status: "warning",
            records: 89,
            lastSync: "3 min ago",
            connection: "limited"
          })
          break
        case 4: // Accounting systems
          results.push({
            source: "QuickBooks",
            type: "accounting",
            status: "success",
            records: 2847,
            lastSync: "Just now",
            connection: "active"
          })
          break
        case 5: // Investment accounts
          results.push({
            source: "Investment Portfolio",
            type: "investment",
            status: "success",
            records: 45,
            lastSync: "Just now",
            connection: "active"
          })
          break
      }
      
      totalProgress += progressPerOperation
    }
    
    setSyncResults(results)
    setSyncProgress(100)
    setSyncStage("Data synchronization completed successfully!")
    setLastSyncTime("Just now")
    
    // Reset after showing completion
    setTimeout(() => {
      setIsSyncing(false)
      setSyncProgress(0)
      setSyncStage("")
    }, 2000)
  }

  // Expense Analysis Chart Component
  function ExpenseAnalysisChart() {
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
      
      let hoveredSegment = -1
      
      // Expense data
      const expenseData = [
        { category: "Operations", amount: 630000, percentage: 35, color: "#ef4444" },
        { category: "Marketing", amount: 450000, percentage: 25, color: "#f97316" },
        { category: "R&D", amount: 360000, percentage: 20, color: "#eab308" },
        { category: "Administration", amount: 270000, percentage: 15, color: "#8b5cf6" },
        { category: "Other", amount: 90000, percentage: 5, color: "#3b82f6" }
      ]
      
      // Chart dimensions
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const radius = Math.min(rect.width, rect.height) / 2.5
      const innerRadius = radius * 0.4
      
      function drawChart() {
        if (!ctx) return
        
        // Clear canvas
        ctx.clearRect(0, 0, rect.width, rect.height)
        
        // Draw segments
        let currentAngle = -Math.PI / 2 // Start from top
        
        expenseData.forEach((segment, index) => {
          const segmentAngle = (segment.percentage / 100) * 2 * Math.PI
          const isHovered = hoveredSegment === index
          
          // Draw segment
          ctx.fillStyle = isHovered ? segment.color + 'E0' : segment.color + 'CC'
          ctx.beginPath()
          ctx.arc(centerX, centerY, isHovered ? radius + 8 : radius, currentAngle, currentAngle + segmentAngle)
          ctx.arc(centerX, centerY, innerRadius, currentAngle + segmentAngle, currentAngle, true)
          ctx.closePath()
          ctx.fill()
          
          // Draw segment outline
          ctx.strokeStyle = '#1e293b'
          ctx.lineWidth = 2
          ctx.stroke()
          
          // Draw labels for larger segments
          if (segment.percentage >= 10) {
            const labelAngle = currentAngle + segmentAngle / 2
            const labelRadius = (radius + innerRadius) / 2
            const labelX = centerX + Math.cos(labelAngle) * labelRadius
            const labelY = centerY + Math.sin(labelAngle) * labelRadius
            
            ctx.fillStyle = '#ffffff'
            ctx.font = isHovered ? 'bold 13px Inter, sans-serif' : '12px Inter, sans-serif'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(`${segment.percentage}%`, labelX, labelY)
          }
          
          currentAngle += segmentAngle
        })
        
        // Draw center circle
        ctx.fillStyle = '#0f172a'
        ctx.beginPath()
        ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI)
        ctx.fill()
        
        // Draw center text
        ctx.fillStyle = '#e2e8f0'
        ctx.font = 'bold 14px Inter, sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('Total', centerX, centerY - 10)
        ctx.fillText('$1.8M', centerX, centerY + 10)
        
        // Draw legend
        const legendStartY = 20
        const legendItemHeight = 20
        
        expenseData.forEach((segment, index) => {
          const y = legendStartY + index * legendItemHeight
          const isHovered = hoveredSegment === index
          
          // Legend color box
          ctx.fillStyle = segment.color
          ctx.fillRect(20, y, 12, 12)
          
          // Legend text
          ctx.fillStyle = isHovered ? '#ffffff' : '#e2e8f0'
          ctx.font = isHovered ? 'bold 11px Inter, sans-serif' : '11px Inter, sans-serif'
          ctx.textAlign = 'left'
          ctx.textBaseline = 'top'
          ctx.fillText(segment.category, 40, y)
          
          // Amount text
          ctx.fillStyle = '#94a3b8'
          ctx.font = '10px Inter, sans-serif'
          ctx.fillText(`$${(segment.amount / 1000).toFixed(0)}K`, 40, y + 12)
        })
      }
      
      // Mouse interaction
      function handleMouseMove(event: MouseEvent) {
        if (!canvas || !tooltip) return
        
        const canvasRect = canvas.getBoundingClientRect()
        const mouseX = event.clientX - canvasRect.left
        const mouseY = event.clientY - canvasRect.top
        
        // Calculate distance from center
        const dx = mouseX - centerX
        const dy = mouseY - centerY
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        // Check if mouse is in the donut area
        if (distance >= innerRadius && distance <= radius + 8) {
          // Calculate angle
          const angle = Math.atan2(dy, dx)
          const normalizedAngle = (angle + Math.PI / 2 + 2 * Math.PI) % (2 * Math.PI)
          
          // Find which segment
          let currentAngle = 0
          let newHoveredSegment = -1
          
          for (let i = 0; i < expenseData.length; i++) {
            const segmentAngle = (expenseData[i].percentage / 100) * 2 * Math.PI
            if (normalizedAngle >= currentAngle && normalizedAngle < currentAngle + segmentAngle) {
              newHoveredSegment = i
              break
            }
            currentAngle += segmentAngle
          }
          
          if (newHoveredSegment !== hoveredSegment) {
            hoveredSegment = newHoveredSegment
            drawChart()
          }
          
          if (hoveredSegment !== -1) {
            const segment = expenseData[hoveredSegment]
            tooltip.style.display = 'block'
            tooltip.style.left = `${event.clientX + 10}px`
            tooltip.style.top = `${event.clientY - 10}px`
            tooltip.innerHTML = `
              <div class="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-lg">
                <div class="text-white font-medium">${segment.category}</div>
                <div class="text-slate-300 text-sm mt-1">
                  <div>Amount: $${(segment.amount / 1000).toFixed(0)}K</div>
                  <div>Percentage: ${segment.percentage}%</div>
                  <div>Monthly: $${(segment.amount / 12000).toFixed(0)}K</div>
                </div>
              </div>
            `
          }
        } else {
          if (hoveredSegment !== -1) {
            hoveredSegment = -1
            tooltip.style.display = 'none'
            drawChart()
          }
        }
      }
      
      function handleMouseLeave() {
        if (!tooltip) return
        
        hoveredSegment = -1
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

  // Profit Analysis Chart Component
  function ProfitAnalysisChart() {
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
      
      let hoveredBar = -1
      
      // Profit data (6 months)
      const profitData = [
        { month: "Jul", grossProfit: 520, netProfit: 420, margin: 25.2, revenue: 2100 },
        { month: "Aug", grossProfit: 580, netProfit: 480, margin: 26.8, revenue: 2250 },
        { month: "Sep", grossProfit: 485, netProfit: 385, margin: 24.1, revenue: 1950 },
        { month: "Oct", grossProfit: 640, netProfit: 540, margin: 28.4, revenue: 2400 },
        { month: "Nov", grossProfit: 610, netProfit: 510, margin: 27.6, revenue: 2300 },
        { month: "Dec", grossProfit: 720, netProfit: 600, margin: 30.0, revenue: 2400 }
      ]
      
      // Chart dimensions
      const padding = 60
      const chartWidth = rect.width - padding * 2
      const chartHeight = rect.height - padding * 2
      const barWidth = chartWidth / profitData.length / 3 - 10
      const groupWidth = chartWidth / profitData.length
      
      // Find max values for scaling
      const maxProfit = Math.max(...profitData.map(d => d.grossProfit))
      const maxMargin = Math.max(...profitData.map(d => d.margin))
      
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
        
        // Draw profit bars
        profitData.forEach((data, index) => {
          const x = padding + index * groupWidth
          const centerX = x + groupWidth / 2
          const isHovered = hoveredBar === index
          
          // Gross profit bar
          const grossHeight = (data.grossProfit / maxProfit) * chartHeight * 0.8
          const grossY = padding + chartHeight - grossHeight
          ctx.fillStyle = isHovered ? '#10b981E0' : '#10b981CC'
          ctx.fillRect(centerX - barWidth * 1.5, grossY, barWidth, grossHeight)
          
          // Net profit bar
          const netHeight = (data.netProfit / maxProfit) * chartHeight * 0.8
          const netY = padding + chartHeight - netHeight
          ctx.fillStyle = isHovered ? '#3b82f6E0' : '#3b82f6CC'
          ctx.fillRect(centerX - barWidth * 0.5, netY, barWidth, netHeight)
          
          // Profit margin line (scaled to chart)
          const marginHeight = (data.margin / maxMargin) * chartHeight * 0.6
          const marginY = padding + chartHeight - marginHeight
          ctx.fillStyle = isHovered ? '#eab308' : '#eab308DD'
          ctx.beginPath()
          ctx.arc(centerX + barWidth * 0.5, marginY, isHovered ? 6 : 4, 0, 2 * Math.PI)
          ctx.fill()
          
          // Connect margin points with line
          if (index > 0) {
            const prevData = profitData[index - 1]
            const prevX = padding + (index - 1) * groupWidth + groupWidth / 2 + barWidth * 0.5
            const prevMarginHeight = (prevData.margin / maxMargin) * chartHeight * 0.6
            const prevMarginY = padding + chartHeight - prevMarginHeight
            
            ctx.strokeStyle = '#eab308'
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(prevX, prevMarginY)
            ctx.lineTo(centerX + barWidth * 0.5, marginY)
            ctx.stroke()
          }
          
          // Month labels
          ctx.fillStyle = isHovered ? '#ffffff' : '#e2e8f0'
          ctx.font = isHovered ? 'bold 12px Inter, sans-serif' : '11px Inter, sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText(data.month, centerX, rect.height - 20)
          
          // Values display when hovered
          if (isHovered) {
            ctx.fillStyle = '#ffffff'
            ctx.font = 'bold 10px Inter, sans-serif'
            ctx.fillText(`$${data.grossProfit}K`, centerX - barWidth, grossY - 5)
            ctx.fillText(`$${data.netProfit}K`, centerX, netY - 5)
            ctx.fillText(`${data.margin}%`, centerX + barWidth, marginY - 8)
          }
        })
        
        // Legend
        const legendY = 20
        const legendItems = [
          { label: 'Gross Profit', color: '#10b981' },
          { label: 'Net Profit', color: '#3b82f6' },
          { label: 'Profit Margin %', color: '#eab308' }
        ]
        
        legendItems.forEach((item, index) => {
          const legendX = padding + index * 120
          if (item.label === 'Profit Margin %') {
            ctx.fillStyle = item.color
            ctx.beginPath()
            ctx.arc(legendX + 6, legendY + 6, 4, 0, 2 * Math.PI)
            ctx.fill()
          } else {
            ctx.fillStyle = item.color
            ctx.fillRect(legendX, legendY, 12, 12)
          }
          ctx.fillStyle = '#e2e8f0'
          ctx.font = '11px Inter, sans-serif'
          ctx.textAlign = 'left'
          ctx.fillText(item.label, legendX + 18, legendY + 9)
        })
        
        // Y-axis labels (left side for profit amounts)
        ctx.fillStyle = '#94a3b8'
        ctx.font = '10px Inter, sans-serif'
        ctx.textAlign = 'right'
        for (let i = 0; i <= 5; i++) {
          const y = padding + (chartHeight / 5) * i
          const value = Math.round((maxProfit / 5) * (5 - i))
          ctx.fillText(`$${value}K`, padding - 10, y + 3)
        }
        
        // Right Y-axis labels (for margin percentage)
        ctx.textAlign = 'left'
        for (let i = 0; i <= 5; i++) {
          const y = padding + (chartHeight / 5) * i
          const value = Math.round((maxMargin / 5) * (5 - i))
          ctx.fillText(`${value}%`, rect.width - padding + 10, y + 3)
        }
      }
      
      // Mouse interaction
      function handleMouseMove(event: MouseEvent) {
        if (!canvas || !tooltip) return
        
        const canvasRect = canvas.getBoundingClientRect()
        const mouseX = event.clientX - canvasRect.left
        const mouseY = event.clientY - canvasRect.top
        
        let newHoveredBar = -1
        
        profitData.forEach((data, index) => {
          const x = padding + index * groupWidth
          const centerX = x + groupWidth / 2
          
          if (mouseX >= x && mouseX <= x + groupWidth && mouseY >= padding && mouseY <= rect.height - padding) {
            newHoveredBar = index
            
            // Show tooltip
            tooltip.style.display = 'block'
            tooltip.style.left = `${event.clientX + 10}px`
            tooltip.style.top = `${event.clientY - 10}px`
            tooltip.innerHTML = `
              <div class="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-lg">
                <div class="text-white font-medium">${data.month} 2024</div>
                <div class="text-slate-300 text-sm mt-1">
                  <div>Revenue: $${data.revenue}K</div>
                  <div>Gross Profit: $${data.grossProfit}K</div>
                  <div>Net Profit: $${data.netProfit}K</div>
                  <div>Profit Margin: ${data.margin}%</div>
                </div>
              </div>
            `
          }
        })
        
        if (newHoveredBar !== hoveredBar) {
          hoveredBar = newHoveredBar
          drawChart()
        }
        
        if (hoveredBar === -1) {
          tooltip.style.display = 'none'
        }
      }
      
      function handleMouseLeave() {
        if (!tooltip) return
        
        hoveredBar = -1
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

  return (
    <div className="flex-1 bg-slate-950">
      {/* Header */}
      <div className="border-b border-slate-800 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Activity className="w-6 h-6 text-blue-400" />
            <h1 className="text-2xl font-semibold text-white">Financial Overview</h1>
            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
              LIVE
            </Badge>
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400 uppercase tracking-wider">System Time</div>
            <div className="text-2xl font-mono text-blue-400">{currentTime}</div>
            <div className="text-sm text-slate-400">{currentDate}</div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$2.4M</div>
              <p className="text-xs text-slate-400">+12.5% from last month</p>
              <div className="mt-2">
                <TrendingUp className="inline w-4 h-4 text-green-400 mr-1" />
                <span className="text-sm text-green-400">$847K / $2.1M</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$1.8M</div>
              <p className="text-xs text-slate-400">+8.2% from last month</p>
              <div className="mt-2">
                <Activity className="inline w-4 h-4 text-purple-400 mr-1" />
                <span className="text-sm text-purple-400">$1.2M / $1.9M</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Cash Flow</CardTitle>
              <Wifi className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$640K</div>
              <p className="text-xs text-slate-400">+18.7% from last month</p>
              <div className="mt-2">
                <ArrowUpRight className="inline w-4 h-4 text-blue-400 mr-1" />
                <span className="text-sm text-blue-400">Positive trend</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Financial Performance</CardTitle>
                <p className="text-slate-400 text-sm">Detailed breakdown of revenue, expenses, and profit</p>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="revenue" className="space-y-6">
                  <TabsList className="bg-slate-800 border-slate-700">
                    <TabsTrigger value="revenue" className="text-xs">
                      Revenue
                    </TabsTrigger>
                    <TabsTrigger value="expenses" className="text-xs">
                      Expenses
                    </TabsTrigger>
                    <TabsTrigger value="profit" className="text-xs">
                      Profit
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="revenue" className="space-y-4">
                    <div className="flex items-center gap-4 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-slate-400">Revenue Trend</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-slate-400">Growth Rate</span>
                      </div>
                    </div>
                    <FinancialChart />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="w-5 h-5 text-blue-400" />
                          <span className="text-slate-300 font-medium">Total Revenue</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-400">$2.4M</div>
                        <div className="text-sm text-slate-400">Current month</div>
                      </div>
                      <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-5 h-5 text-green-400" />
                          <span className="text-slate-300 font-medium">Growth Rate</span>
                        </div>
                        <div className="text-2xl font-bold text-green-400">+12.5%</div>
                        <div className="text-sm text-slate-400">vs last month</div>
                      </div>
                      <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="w-5 h-5 text-purple-400" />
                          <span className="text-slate-300 font-medium">Avg Daily</span>
                        </div>
                        <div className="text-2xl font-bold text-purple-400">$77K</div>
                        <div className="text-sm text-slate-400">Daily average</div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="expenses" className="space-y-4">
                    <div className="flex items-center gap-4 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-slate-400">Total Expenses</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className="text-slate-400">Operating Costs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-slate-400">Variable Costs</span>
                      </div>
                    </div>
                    
                    {/* Expense Overview Chart */}
                    <div className="border border-slate-700 rounded-lg bg-slate-800/30 p-4">
                      <ExpenseAnalysisChart />
                    </div>

                    {/* Expense Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-slate-300 font-medium">Expense Categories</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <span className="text-sm text-slate-300">Operations</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-slate-200">$630K</div>
                              <div className="text-xs text-slate-400">35%</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                              <span className="text-sm text-slate-300">Marketing</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-slate-200">$450K</div>
                              <div className="text-xs text-slate-400">25%</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                              <span className="text-sm text-slate-300">R&D</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-slate-200">$360K</div>
                              <div className="text-xs text-slate-400">20%</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                              <span className="text-sm text-slate-300">Administration</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-slate-200">$270K</div>
                              <div className="text-xs text-slate-400">15%</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                              <span className="text-sm text-slate-300">Other</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-slate-200">$90K</div>
                              <div className="text-xs text-slate-400">5%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="text-slate-300 font-medium">Expense Analytics</h4>
                        <div className="space-y-4">
                          <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                            <div className="flex items-center gap-2 mb-2">
                              <TrendingDown className="w-5 h-5 text-red-400" />
                              <span className="text-slate-300 font-medium">Total Expenses</span>
                            </div>
                            <div className="text-2xl font-bold text-red-400">$1.8M</div>
                            <div className="text-sm text-slate-400">Current month</div>
                            <div className="flex items-center mt-2">
                              <ArrowUpRight className="w-4 h-4 text-red-400 mr-1" />
                              <span className="text-sm text-red-400">+8.2%</span>
                              <span className="text-sm text-slate-400 ml-1">vs last month</span>
                            </div>
                          </div>
                          
                          <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                            <div className="flex items-center gap-2 mb-2">
                              <Activity className="w-5 h-5 text-orange-400" />
                              <span className="text-slate-300 font-medium">Avg Daily Expense</span>
                            </div>
                            <div className="text-2xl font-bold text-orange-400">$58K</div>
                            <div className="text-sm text-slate-400">Daily average</div>
                          </div>
                          
                          <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                            <div className="flex items-center gap-2 mb-2">
                              <AlertTriangle className="w-5 h-5 text-yellow-400" />
                              <span className="text-slate-300 font-medium">Budget Variance</span>
                            </div>
                            <div className="text-2xl font-bold text-yellow-400">+5.3%</div>
                            <div className="text-sm text-slate-400">Over budget</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expense Trends */}
                    <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                      <h4 className="text-slate-300 font-medium mb-3">Monthly Expense Trends</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-slate-400 text-xs">This Month</div>
                          <div className="text-red-400 font-bold text-lg">$1.8M</div>
                          <div className="text-slate-500 text-xs">+8.2%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-slate-400 text-xs">Last Month</div>
                          <div className="text-slate-300 font-bold text-lg">$1.66M</div>
                          <div className="text-slate-500 text-xs">+3.1%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-slate-400 text-xs">Avg 3 Months</div>
                          <div className="text-slate-300 font-bold text-lg">$1.62M</div>
                          <div className="text-slate-500 text-xs">Baseline</div>
                        </div>
                        <div className="text-center">
                          <div className="text-slate-400 text-xs">YTD Total</div>
                          <div className="text-slate-300 font-bold text-lg">$18.7M</div>
                          <div className="text-slate-500 text-xs">+6.8%</div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="profit" className="space-y-4">
                    <div className="flex items-center gap-4 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-slate-400">Gross Profit</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-slate-400">Net Profit</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-slate-400">Profit Margin</span>
                      </div>
                    </div>
                    
                    {/* Profit Analysis Chart */}
                    <div className="border border-slate-700 rounded-lg bg-slate-800/30 p-4">
                      <ProfitAnalysisChart />
                    </div>

                    {/* Profit Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                      <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-5 h-5 text-green-400" />
                          <span className="text-slate-300 font-medium">Gross Profit</span>
                        </div>
                        <div className="text-2xl font-bold text-green-400">$720K</div>
                        <div className="text-sm text-slate-400">Current month</div>
                        <div className="flex items-center mt-2">
                          <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                          <span className="text-sm text-green-400">+12.5%</span>
                          <span className="text-sm text-slate-400 ml-1">vs last month</span>
                        </div>
                      </div>
                      <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="w-5 h-5 text-blue-400" />
                          <span className="text-slate-300 font-medium">Net Profit</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-400">$600K</div>
                        <div className="text-sm text-slate-400">Current month</div>
                        <div className="flex items-center mt-2">
                          <ArrowUpRight className="w-4 h-4 text-blue-400 mr-1" />
                          <span className="text-sm text-blue-400">+17.6%</span>
                          <span className="text-sm text-slate-400 ml-1">vs last month</span>
                        </div>
                      </div>
                      <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                          <PieChart className="w-5 h-5 text-yellow-400" />
                          <span className="text-slate-300 font-medium">Profit Margin</span>
                        </div>
                        <div className="text-2xl font-bold text-yellow-400">30.0%</div>
                        <div className="text-sm text-slate-400">Industry avg: 18%</div>
                        <div className="flex items-center mt-2">
                          <ArrowUpRight className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="text-sm text-yellow-400">+2.4pts</span>
                          <span className="text-sm text-slate-400 ml-1">vs last month</span>
                        </div>
                      </div>
                      <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="w-5 h-5 text-purple-400" />
                          <span className="text-slate-300 font-medium">ROI</span>
                        </div>
                        <div className="text-2xl font-bold text-purple-400">31.2%</div>
                        <div className="text-sm text-slate-400">Return on investment</div>
                        <div className="flex items-center mt-2">
                          <ArrowUpRight className="w-4 h-4 text-purple-400 mr-1" />
                          <span className="text-sm text-purple-400">+6.4pts</span>
                          <span className="text-sm text-slate-400 ml-1">vs last quarter</span>
                        </div>
                      </div>
                    </div>

                    {/* Profit Analysis */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-slate-300 font-medium">Profit Drivers</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                            <div className="flex items-center gap-3">
                              <CheckCircle className="w-5 h-5 text-green-400" />
                              <span className="text-sm text-slate-300">Revenue Growth</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-green-400">+12.5%</div>
                              <div className="text-xs text-slate-400">Strong</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                            <div className="flex items-center gap-3">
                              <CheckCircle className="w-5 h-5 text-green-400" />
                              <span className="text-sm text-slate-300">Cost Optimization</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-green-400">-8.2%</div>
                              <div className="text-xs text-slate-400">Excellent</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                            <div className="flex items-center gap-3">
                              <TrendingUp className="w-5 h-5 text-blue-400" />
                              <span className="text-sm text-slate-300">Operating Efficiency</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-blue-400">94.2%</div>
                              <div className="text-xs text-slate-400">High</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                            <div className="flex items-center gap-3">
                              <Activity className="w-5 h-5 text-purple-400" />
                              <span className="text-sm text-slate-300">Market Position</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-purple-400">Strong</div>
                              <div className="text-xs text-slate-400">Top 15%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="text-slate-300 font-medium">Profit Analytics</h4>
                        <div className="space-y-4">
                          <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                            <div className="flex items-center gap-2 mb-2">
                              <DollarSign className="w-5 h-5 text-green-400" />
                              <span className="text-slate-300 font-medium">Profit per Customer</span>
                            </div>
                            <div className="text-2xl font-bold text-green-400">$2,400</div>
                            <div className="text-sm text-slate-400">Average customer value</div>
                            <div className="flex items-center mt-2">
                              <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                              <span className="text-sm text-green-400">+$180</span>
                              <span className="text-sm text-slate-400 ml-1">vs last month</span>
                            </div>
                          </div>
                          
                          <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                            <div className="flex items-center gap-2 mb-2">
                              <TrendingUp className="w-5 h-5 text-blue-400" />
                              <span className="text-slate-300 font-medium">Profit Growth Rate</span>
                            </div>
                            <div className="text-2xl font-bold text-blue-400">17.6%</div>
                            <div className="text-sm text-slate-400">Year-over-year</div>
                          </div>
                          
                          <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                            <div className="flex items-center gap-2 mb-2">
                              <AlertTriangle className="w-5 h-5 text-yellow-400" />
                              <span className="text-slate-300 font-medium">Break-even Point</span>
                            </div>
                            <div className="text-2xl font-bold text-yellow-400">$1.2M</div>
                            <div className="text-sm text-slate-400">Monthly revenue needed</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Profit Trends */}
                    <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                      <h4 className="text-slate-300 font-medium mb-3">6-Month Profit Trends</h4>
                      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                        <div className="text-center">
                          <div className="text-slate-400 text-xs">Jul</div>
                          <div className="text-green-400 font-bold text-lg">$420K</div>
                          <div className="text-slate-500 text-xs">25.2%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-slate-400 text-xs">Aug</div>
                          <div className="text-green-400 font-bold text-lg">$480K</div>
                          <div className="text-slate-500 text-xs">26.8%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-slate-400 text-xs">Sep</div>
                          <div className="text-green-400 font-bold text-lg">$385K</div>
                          <div className="text-slate-500 text-xs">24.1%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-slate-400 text-xs">Oct</div>
                          <div className="text-green-400 font-bold text-lg">$540K</div>
                          <div className="text-slate-500 text-xs">28.4%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-slate-400 text-xs">Nov</div>
                          <div className="text-green-400 font-bold text-lg">$510K</div>
                          <div className="text-slate-500 text-xs">27.6%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-slate-400 text-xs">Dec</div>
                          <div className="text-green-400 font-bold text-lg">$600K</div>
                          <div className="text-slate-500 text-xs">30.0%</div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Financial Health Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Financial Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Liquidity Ratio</span>
                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                        Healthy
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Debt-to-Equity</span>
                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                        Optimal
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">ROI</span>
                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                        Strong
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Budget Variance</span>
                      <span className="text-sm text-blue-400">Updated 5 min ago</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-300">Overall Score</span>
                      <span className="text-sm text-slate-400">87%</span>
                    </div>
                    <Progress value={87} className="h-2 bg-slate-800" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Database className="w-5 h-5 text-blue-400" />
                    Data Sources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Bank Connections</span>
                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                        5 Active
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Payment Processors</span>
                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                        3 Active
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Accounting Systems</span>
                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                        2 Active
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Last Sync</span>
                      <span className="text-sm text-blue-400">{lastSyncTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* System Info */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-sm text-slate-300">System Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-400">Uptime</span>
                  <span className="text-sm text-white font-mono">14d 06:42:18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-400">Time Zone</span>
                  <span className="text-sm text-white">UTC-08:00</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  <Dialog open={showSecurityScan} onOpenChange={setShowSecurityScan}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex flex-col items-center gap-2 h-auto py-3 bg-slate-800 border-slate-700 hover:bg-slate-700"
                      >
                        <Shield className="w-5 h-5 text-blue-400" />
                        <span className="text-xs">Security Scan</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-6xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-white flex items-center gap-2">
                          <Shield className="w-6 h-6 text-blue-400" />
                          Financial Security Scan
                        </DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-6 py-4">
                        {/* Security Scan Header */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                            <div className="flex items-center gap-2 mb-2">
                              <Shield className="w-5 h-5 text-blue-400" />
                              <span className="text-slate-300 font-medium">Security Status</span>
                            </div>
                            <div className="text-2xl font-bold text-green-400">Secure</div>
                            <div className="text-sm text-slate-400">Last scan: {lastScanTime || "Never"}</div>
                          </div>
                          
                          <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                            <div className="flex items-center gap-2 mb-2">
                              <AlertTriangle className="w-5 h-5 text-yellow-400" />
                              <span className="text-slate-300 font-medium">Warnings</span>
                            </div>
                            <div className="text-2xl font-bold text-yellow-400">{scanResults.filter(r => r.status === 'warning').length}</div>
                            <div className="text-sm text-slate-400">Medium risk issues</div>
                          </div>
                          
                          <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle className="w-5 h-5 text-green-400" />
                              <span className="text-slate-300 font-medium">Passed</span>
                            </div>
                            <div className="text-2xl font-bold text-green-400">{scanResults.filter(r => r.status === 'pass').length}</div>
                            <div className="text-sm text-slate-400">Security checks</div>
                          </div>
                        </div>

                        {/* Scan Progress Display */}
                        {isScanning && (
                          <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/30">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <Shield className="w-5 h-5 text-blue-400 animate-pulse" />
                                <span className="text-white font-medium">Running Security Scan</span>
                              </div>
                              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                                {Math.round(scanProgress)}% Complete
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-slate-300 text-sm">{scanStage}</span>
                                <span className="text-slate-400 text-sm">{Math.round(scanProgress)}%</span>
                              </div>
                              <div className="w-full bg-slate-700 rounded-full h-3">
                                <div 
                                  className="bg-blue-400 h-3 rounded-full transition-all duration-300"
                                  style={{ width: `${scanProgress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Security Scan Results */}
                        {scanResults.length > 0 && (
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium text-white border-b border-slate-700 pb-2">Security Scan Results</h3>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              {['Authentication', 'Vulnerabilities', 'Encryption', 'Access Control', 'Network', 'Data Integrity', 'Backup'].map((category) => {
                                const categoryResults = scanResults.filter(r => r.category === category)
                                if (categoryResults.length === 0) return null
                                
                                return (
                                  <div key={category} className="p-4 border border-slate-700 rounded-lg bg-slate-800/30">
                                    <div className="flex items-center gap-2 mb-3">
                                      {category === 'Authentication' && <Key className="w-5 h-5 text-blue-400" />}
                                      {category === 'Vulnerabilities' && <AlertTriangle className="w-5 h-5 text-yellow-400" />}
                                      {category === 'Encryption' && <Lock className="w-5 h-5 text-green-400" />}
                                      {category === 'Access Control' && <Users className="w-5 h-5 text-purple-400" />}
                                      {category === 'Network' && <Globe className="w-5 h-5 text-cyan-400" />}
                                      {category === 'Data Integrity' && <FileCheck className="w-5 h-5 text-orange-400" />}
                                      {category === 'Backup' && <Server className="w-5 h-5 text-pink-400" />}
                                      <h4 className="text-slate-300 font-medium">{category}</h4>
                                    </div>
                                    
                                    <div className="space-y-3">
                                      {categoryResults.map((result, index) => (
                                        <div key={index} className="flex items-start justify-between">
                                          <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                              {result.status === 'pass' && <CheckCircle className="w-4 h-4 text-green-400" />}
                                              {result.status === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-400" />}
                                              {result.status === 'fail' && <XCircle className="w-4 h-4 text-red-400" />}
                                              <span className="text-slate-300 text-sm font-medium">{result.item}</span>
                                            </div>
                                            <p className="text-slate-400 text-xs ml-6">{result.description}</p>
                                          </div>
                                          <Badge 
                                            variant="outline" 
                                            className={`text-xs ml-2 ${
                                              result.status === 'pass' 
                                                ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                : result.status === 'warning'
                                                ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                                : 'bg-red-500/10 text-red-400 border-red-500/20'
                                            }`}
                                          >
                                            {result.status}
                                          </Badge>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )}

                        {/* Quick Security Actions */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-white border-b border-slate-700 pb-2">Security Tools</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex flex-col items-center gap-2 h-auto py-4 bg-slate-800 border-slate-700 hover:bg-slate-700"
                            >
                              <Eye className="w-5 h-5 text-blue-400" />
                              <span className="text-xs">Audit Logs</span>
                            </Button>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex flex-col items-center gap-2 h-auto py-4 bg-slate-800 border-slate-700 hover:bg-slate-700"
                            >
                              <Users className="w-5 h-5 text-purple-400" />
                              <span className="text-xs">User Access</span>
                            </Button>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex flex-col items-center gap-2 h-auto py-4 bg-slate-800 border-slate-700 hover:bg-slate-700"
                            >
                              <FileCheck className="w-5 h-5 text-green-400" />
                              <span className="text-xs">Compliance</span>
                            </Button>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex flex-col items-center gap-2 h-auto py-4 bg-slate-800 border-slate-700 hover:bg-slate-700"
                            >
                              <Settings className="w-5 h-5 text-gray-400" />
                              <span className="text-xs">Security Settings</span>
                            </Button>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                          <div className="flex items-center gap-2 text-sm text-slate-400">
                            <Clock className="w-4 h-4" />
                            <span>Recommended: Run security scan weekly</span>
                          </div>
                          
                          <div className="flex gap-3">
                            <Button 
                              variant="outline" 
                              onClick={() => setShowSecurityScan(false)}
                              className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white hover:border-slate-600"
                              disabled={isScanning}
                            >
                              Close
                            </Button>
                            <Button 
                              onClick={performSecurityScan}
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                              disabled={isScanning}
                            >
                              <Shield className={`w-4 h-4 mr-2 ${isScanning ? 'animate-pulse' : ''}`} />
                              {isScanning ? 'Scanning...' : 'Start Security Scan'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Dialog open={showDataSync} onOpenChange={setShowDataSync}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex flex-col items-center gap-2 h-auto py-3 bg-slate-800 border-slate-700 hover:bg-slate-700"
                      >
                        <RefreshCw className="w-5 h-5 text-green-400" />
                        <span className="text-xs">Sync Data</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-6xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-white flex items-center gap-2">
                          <RefreshCw className="w-6 h-6 text-green-400" />
                          Financial Data Synchronization
                        </DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-6 py-4">
                        {/* Sync Status Header */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                            <div className="flex items-center gap-2 mb-2">
                              <RefreshCw className="w-5 h-5 text-green-400" />
                              <span className="text-slate-300 font-medium">Sync Status</span>
                            </div>
                            <div className="text-2xl font-bold text-green-400">Active</div>
                            <div className="text-sm text-slate-400">Last sync: {lastSyncTime}</div>
                          </div>
                          
                          <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                            <div className="flex items-center gap-2 mb-2">
                              <Database className="w-5 h-5 text-blue-400" />
                              <span className="text-slate-300 font-medium">Data Sources</span>
                            </div>
                            <div className="text-2xl font-bold text-blue-400">{syncResults.length > 0 ? syncResults.length : 10}</div>
                            <div className="text-sm text-slate-400">Connected systems</div>
                          </div>
                          
                          <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle className="w-5 h-5 text-green-400" />
                              <span className="text-slate-300 font-medium">Records Synced</span>
                            </div>
                            <div className="text-2xl font-bold text-green-400">
                              {syncResults.length > 0 ? syncResults.reduce((sum, r) => sum + r.records, 0).toLocaleString() : '5.2K'}
                            </div>
                            <div className="text-sm text-slate-400">This session</div>
                          </div>
                        </div>

                        {/* Sync Progress Display */}
                        {isSyncing && (
                          <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/30">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <RefreshCw className="w-5 h-5 text-green-400 animate-spin" />
                                <span className="text-white font-medium">Synchronizing Data</span>
                              </div>
                              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                                {Math.round(syncProgress)}% Complete
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-slate-300 text-sm">{syncStage}</span>
                                <span className="text-slate-400 text-sm">{Math.round(syncProgress)}%</span>
                              </div>
                              <div className="w-full bg-slate-700 rounded-full h-3">
                                <div 
                                  className="bg-green-400 h-3 rounded-full transition-all duration-300"
                                  style={{ width: `${syncProgress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Data Sources */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-white border-b border-slate-700 pb-2">Connected Data Sources</h3>
                          
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {/* Default data sources */}
                            {syncResults.length === 0 && (
                              <>
                                <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/30">
                                  <div className="flex items-center gap-3 mb-3">
                                    <Banknote className="w-5 h-5 text-blue-400" />
                                    <h4 className="text-slate-300 font-medium">Banking</h4>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                      <span className="text-slate-400 text-sm">Chase Bank</span>
                                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">Active</Badge>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-slate-400 text-sm">Wells Fargo</span>
                                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">Active</Badge>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-slate-400 text-sm">Bank of America</span>
                                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">Active</Badge>
                                    </div>
                                  </div>
                                </div>

                                <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/30">
                                  <div className="flex items-center gap-3 mb-3">
                                    <CreditCard className="w-5 h-5 text-purple-400" />
                                    <h4 className="text-slate-300 font-medium">Payment Processors</h4>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                      <span className="text-slate-400 text-sm">Stripe</span>
                                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">Active</Badge>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-slate-400 text-sm">PayPal</span>
                                      <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 text-xs">Limited</Badge>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-slate-400 text-sm">Square</span>
                                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">Active</Badge>
                                    </div>
                                  </div>
                                </div>

                                <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/30">
                                  <div className="flex items-center gap-3 mb-3">
                                    <Building2 className="w-5 h-5 text-orange-400" />
                                    <h4 className="text-slate-300 font-medium">Accounting Systems</h4>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                      <span className="text-slate-400 text-sm">QuickBooks Online</span>
                                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">Active</Badge>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-slate-400 text-sm">Xero</span>
                                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">Active</Badge>
                                    </div>
                                  </div>
                                </div>

                                <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/30">
                                  <div className="flex items-center gap-3 mb-3">
                                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                                    <h4 className="text-slate-300 font-medium">Investment Accounts</h4>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                      <span className="text-slate-400 text-sm">Charles Schwab</span>
                                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">Active</Badge>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-slate-400 text-sm">Fidelity</span>
                                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">Active</Badge>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}

                            {/* Sync results */}
                            {syncResults.length > 0 && syncResults.map((result, index) => (
                              <div key={index} className="p-4 border border-slate-700 rounded-lg bg-slate-800/30">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    {result.type === 'bank' && <Banknote className="w-4 h-4 text-blue-400" />}
                                    {result.type === 'payment' && <CreditCard className="w-4 h-4 text-purple-400" />}
                                    {result.type === 'accounting' && <Building2 className="w-4 h-4 text-orange-400" />}
                                    {result.type === 'investment' && <TrendingUp className="w-4 h-4 text-cyan-400" />}
                                    {result.type === 'account' && <Banknote className="w-4 h-4 text-green-400" />}
                                    {result.type === 'transaction' && <Activity className="w-4 h-4 text-yellow-400" />}
                                    <span className="text-slate-300 text-sm font-medium">{result.source}</span>
                                  </div>
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs ${
                                      result.status === 'success' 
                                        ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                        : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                    }`}
                                  >
                                    {result.connection}
                                  </Badge>
                                </div>
                                <div className="text-xs text-slate-400 space-y-1">
                                  <div>Records: {result.records.toLocaleString()}</div>
                                  <div>Last Sync: {result.lastSync}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Quick Sync Actions */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-white border-b border-slate-700 pb-2">Sync Options</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex flex-col items-center gap-2 h-auto py-4 bg-slate-800 border-slate-700 hover:bg-slate-700"
                            >
                              <Banknote className="w-5 h-5 text-blue-400" />
                              <span className="text-xs">Banks Only</span>
                            </Button>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex flex-col items-center gap-2 h-auto py-4 bg-slate-800 border-slate-700 hover:bg-slate-700"
                            >
                              <CreditCard className="w-5 h-5 text-purple-400" />
                              <span className="text-xs">Payments</span>
                            </Button>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex flex-col items-center gap-2 h-auto py-4 bg-slate-800 border-slate-700 hover:bg-slate-700"
                            >
                              <Building2 className="w-5 h-5 text-orange-400" />
                              <span className="text-xs">Accounting</span>
                            </Button>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex flex-col items-center gap-2 h-auto py-4 bg-slate-800 border-slate-700 hover:bg-slate-700"
                            >
                              <Settings className="w-5 h-5 text-gray-400" />
                              <span className="text-xs">Sync Settings</span>
                            </Button>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                          <div className="flex items-center gap-2 text-sm text-slate-400">
                            <Clock className="w-4 h-4" />
                            <span>Auto-sync: {lastSyncTime ? 'Enabled' : 'Disabled'} • Next sync in 15 minutes</span>
                          </div>
                          
                          <div className="flex gap-3">
                            <Button 
                              variant="outline" 
                              onClick={() => setShowDataSync(false)}
                              className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white hover:border-slate-600"
                              disabled={isSyncing}
                            >
                              Close
                            </Button>
                            <Button 
                              onClick={performDataSync}
                              className="bg-green-600 hover:bg-green-700 text-white"
                              disabled={isSyncing}
                            >
                              <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
                              {isSyncing ? 'Syncing...' : 'Start Full Sync'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewChange?.("Transactions")}
                    className="flex flex-col items-center gap-2 h-auto py-3 bg-slate-800 border-slate-700 hover:bg-slate-700"
                  >
                    <CreditCard className="w-5 h-5 text-purple-400" />
                    <span className="text-xs">Transactions</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewChange?.("Analytics")}
                    className="flex flex-col items-center gap-2 h-auto py-3 bg-slate-800 border-slate-700 hover:bg-slate-700"
                  >
                    <Activity className="w-5 h-5 text-orange-400" />
                    <span className="text-xs">Analytics</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewChange?.("Alerts")}
                    className="flex flex-col items-center gap-2 h-auto py-3 bg-slate-800 border-slate-700 hover:bg-slate-700"
                  >
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <span className="text-xs">Alerts</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewChange?.("Settings")}
                    className="flex flex-col items-center gap-2 h-auto py-3 bg-slate-800 border-slate-700 hover:bg-slate-700"
                  >
                    <Settings className="w-5 h-5 text-gray-400" />
                    <span className="text-xs">Settings</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewChange?.("Forecasting")}
                    className="flex flex-col items-center gap-2 h-auto py-3 bg-slate-800 border-slate-700 hover:bg-slate-700"
                  >
                    <PieChart className="w-5 h-5 text-cyan-400" />
                    <span className="text-xs">Forecasting</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Resource Allocation */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Budget Allocation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-300">Operations</span>
                    <span className="text-sm text-blue-400">42% allocated</span>
                  </div>
                  <Progress value={42} className="h-2 bg-slate-800" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-300">Marketing</span>
                    <span className="text-sm text-purple-400">68% allocated</span>
                  </div>
                  <Progress value={68} className="h-2 bg-slate-800" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-300">R&D</span>
                    <span className="text-sm text-green-400">35% allocated</span>
                  </div>
                  <Progress value={35} className="h-2 bg-slate-800" />
                </div>
                <div className="pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">Priority Level</span>
                    <span className="text-sm text-white">3/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Environment Controls */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">System Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-slate-300">Auto-Sync</span>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-slate-300">Security Protocol</span>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-slate-300">Real-time Alerts</span>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* Financial Alerts */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white">Financial Alerts</CardTitle>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                  4 New
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-300">Budget Review Complete</p>
                    <p className="text-xs text-slate-500">Q4 budget analysis finished</p>
                    <p className="text-xs text-slate-500">14:32:12</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-300">Expense Spike Detected</p>
                    <p className="text-xs text-slate-500">Marketing spend +43% above target</p>
                    <p className="text-xs text-slate-500">13:45:06</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Download className="w-4 h-4 text-blue-400 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-300">Report Generated</p>
                    <p className="text-xs text-slate-500">Monthly P&L ready for review</p>
                    <p className="text-xs text-slate-500">09:12:45</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-300">Data Sync Complete</p>
                    <p className="text-xs text-slate-500">All bank accounts synchronized</p>
                    <p className="text-xs text-slate-500">04:30:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
