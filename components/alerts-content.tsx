"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Clock,
  Bell,
  BellOff,
  Filter,
  Search,
  Settings,
  Plus,
  Eye,
  X,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Shield,
  Zap,
  Users,
  Database,
  Wifi,
  Activity,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Download,
  RefreshCw,
} from "lucide-react"

export function AlertsContent() {
  const activeAlerts = [
    {
      id: "ALT-001",
      type: "critical",
      title: "High-Value Transaction Alert",
      message: "Transaction of $25,000 exceeds daily limit threshold",
      timestamp: "2024-12-28 14:32:18",
      source: "Transaction Monitor",
      acknowledged: false,
      category: "Transaction",
      severity: "Critical"
    },
    {
      id: "ALT-002", 
      type: "warning",
      title: "Budget Variance Alert",
      message: "Marketing budget exceeded by 15% for current month",
      timestamp: "2024-12-28 13:45:22",
      source: "Budget Monitor",
      acknowledged: false,
      category: "Budget",
      severity: "Warning"
    },
    {
      id: "ALT-003",
      type: "info",
      title: "Cash Flow Projection",
      message: "Positive cash flow expected next week (+$45K)",
      timestamp: "2024-12-28 12:15:10",
      source: "Cash Flow Analytics",
      acknowledged: true,
      category: "Cash Flow",
      severity: "Info"
    },
    {
      id: "ALT-004",
      type: "critical",
      title: "Failed Payment Alert",
      message: "Payment processing failure for 3 consecutive transactions",
      timestamp: "2024-12-28 11:28:45",
      source: "Payment Gateway",
      acknowledged: false,
      category: "Payment",
      severity: "Critical"
    },
    {
      id: "ALT-005",
      type: "warning",
      title: "Unusual Activity Pattern",
      message: "Multiple small transactions detected outside business hours",
      timestamp: "2024-12-28 09:15:33",
      source: "Fraud Detection",
      acknowledged: false,
      category: "Security",
      severity: "Warning"
    }
  ]

  const alertRules = [
    {
      id: "RULE-001",
      name: "High Value Transaction Alert",
      condition: "Amount > $10,000",
      threshold: "$10,000",
      enabled: true,
      triggered: 12,
      category: "Transaction"
    },
    {
      id: "RULE-002",
      name: "Budget Variance Monitor",
      condition: "Variance > 10%",
      threshold: "10%",
      enabled: true,
      triggered: 3,
      category: "Budget"
    },
    {
      id: "RULE-003",
      name: "Cash Flow Warning",
      condition: "Balance < $50,000",
      threshold: "$50,000",
      enabled: true,
      triggered: 1,
      category: "Cash Flow"
    },
    {
      id: "RULE-004",
      name: "Failed Payment Monitor",
      condition: "Failed payments > 2",
      threshold: "2 failures",
      enabled: true,
      triggered: 5,
      category: "Payment"
    },
    {
      id: "RULE-005",
      name: "After Hours Activity",
      condition: "Transactions after 10 PM",
      threshold: "10:00 PM",
      enabled: false,
      triggered: 0,
      category: "Security"
    }
  ]

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="w-5 h-5 text-red-400" />
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-400" />
      case "info":
        return <CheckCircle className="w-5 h-5 text-blue-400" />
      default:
        return <Bell className="w-5 h-5 text-gray-400" />
    }
  }

  const getAlertBadge = (type: string) => {
    switch (type) {
      case "critical":
        return <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/30">Critical</Badge>
      case "warning":
        return <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Warning</Badge>
      case "info":
        return <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">Info</Badge>
      default:
        return <Badge variant="outline" className="bg-gray-500/20 text-gray-400 border-gray-500/30">Unknown</Badge>
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "transaction":
        return <DollarSign className="w-4 h-4" />
      case "budget":
        return <BarChart3 className="w-4 h-4" />
      case "cash flow":
        return <TrendingUp className="w-4 h-4" />
      case "payment":
        return <Database className="w-4 h-4" />
      case "security":
        return <Shield className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  return (
    <div className="flex-1 bg-slate-950 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Alert Management</h1>
              <p className="text-slate-400 mt-1">Monitor and manage financial alerts and notifications</p>
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
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                New Alert Rule
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Alert Overview Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Active Alerts</CardTitle>
              <Bell className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">24</div>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="w-4 h-4 text-red-400 mr-1" />
                <span className="text-sm text-red-400">+5</span>
                <span className="text-sm text-slate-400 ml-1">since yesterday</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Critical</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">7</div>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="w-4 h-4 text-red-400 mr-1" />
                <span className="text-sm text-red-400">+2</span>
                <span className="text-sm text-slate-400 ml-1">requiring action</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Warnings</CardTitle>
              <AlertCircle className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">12</div>
              <div className="flex items-center mt-2">
                <ArrowDownRight className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-sm text-green-400">-3</span>
                <span className="text-sm text-slate-400 ml-1">vs yesterday</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Response Time</CardTitle>
              <Clock className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">4.2m</div>
              <div className="flex items-center mt-2">
                <ArrowDownRight className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-sm text-green-400">-1.3m</span>
                <span className="text-sm text-slate-400 ml-1">avg response</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Resolution Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">94.2%</div>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-sm text-green-400">+2.1%</span>
                <span className="text-sm text-slate-400 ml-1">this week</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alert Tabs */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="active">Active Alerts</TabsTrigger>
            <TabsTrigger value="rules">Alert Rules</TabsTrigger>
            <TabsTrigger value="history">Alert History</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            {/* Filter Bar */}
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                  <div className="flex flex-1 gap-3 w-full lg:w-auto">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search alerts..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                      <Filter className="w-4 h-4 mr-2" />
                      All Severities
                    </Button>
                    <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                      <Calendar className="w-4 h-4 mr-2" />
                      Last 24h
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                      Mark All Read
                    </Button>
                    <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Alerts List */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Active Alerts</CardTitle>
                <p className="text-slate-400 text-sm">Current system alerts requiring attention</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeAlerts.map((alert) => (
                  <div key={alert.id} className={`p-4 rounded-lg border transition-colors ${
                    alert.acknowledged 
                      ? 'border-slate-700 bg-slate-800/30' 
                      : alert.type === 'critical' 
                        ? 'border-red-500/30 bg-red-500/5'
                        : alert.type === 'warning'
                          ? 'border-yellow-500/30 bg-yellow-500/5'
                          : 'border-blue-500/30 bg-blue-500/5'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`p-2 rounded-lg ${
                          alert.type === 'critical' ? 'bg-red-500/20' :
                          alert.type === 'warning' ? 'bg-yellow-500/20' : 'bg-blue-500/20'
                        }`}>
                          {getAlertIcon(alert.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-slate-200 font-medium">{alert.title}</span>
                            {getAlertBadge(alert.type)}
                            {alert.acknowledged && (
                              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
                                Acknowledged
                              </Badge>
                            )}
                          </div>
                          <p className="text-slate-300 text-sm mb-3">{alert.message}</p>
                          <div className="flex items-center gap-4 text-xs text-slate-400">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{alert.timestamp}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {getCategoryIcon(alert.category)}
                              <span>{alert.category}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Database className="w-3 h-3" />
                              <span>{alert.source}</span>
                            </div>
                            <span>•</span>
                            <span>{alert.id}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {!alert.acknowledged && (
                          <Button variant="ghost" size="sm" className="text-green-400 hover:text-green-300">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                          <X className="w-4 h-4" />
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
          </TabsContent>

          <TabsContent value="rules" className="space-y-6">
            {/* Alert Rules Management */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Alert Rules</CardTitle>
                    <p className="text-slate-400 text-sm">Configure and manage automated alert triggers</p>
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Rule
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {alertRules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-700 hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <Switch defaultChecked={rule.enabled} />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-slate-200 font-medium">{rule.name}</span>
                          <Badge variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600 text-xs">
                            {rule.category}
                          </Badge>
                        </div>
                        <div className="text-slate-400 text-sm">
                          <span className="font-mono bg-slate-800 px-2 py-1 rounded text-xs">{rule.condition}</span>
                          <span className="mx-2">•</span>
                          <span>Triggered {rule.triggered} times</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-sm">{rule.threshold}</span>
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Rule Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Transaction Rules</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Active Rules</span>
                    <span className="text-blue-400 font-medium">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Triggered Today</span>
                    <span className="text-yellow-400 font-medium">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Avg Response</span>
                    <span className="text-green-400 font-medium">2.3m</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Budget Rules</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Active Rules</span>
                    <span className="text-blue-400 font-medium">2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Triggered Today</span>
                    <span className="text-yellow-400 font-medium">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Avg Response</span>
                    <span className="text-green-400 font-medium">5.7m</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Security Rules</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Active Rules</span>
                    <span className="text-blue-400 font-medium">4</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Triggered Today</span>
                    <span className="text-red-400 font-medium">7</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Avg Response</span>
                    <span className="text-green-400 font-medium">1.2m</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            {/* Alert History Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Total Resolved</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">1,247</div>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-sm text-green-400">+23</span>
                    <span className="text-sm text-slate-400 ml-1">this week</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Avg Resolution</CardTitle>
                  <Clock className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">6.3m</div>
                  <div className="flex items-center mt-2">
                    <ArrowDownRight className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-sm text-green-400">-1.2m</span>
                    <span className="text-sm text-slate-400 ml-1">improvement</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">False Positives</CardTitle>
                  <X className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">2.8%</div>
                  <div className="flex items-center mt-2">
                    <ArrowDownRight className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-sm text-green-400">-0.5%</span>
                    <span className="text-sm text-slate-400 ml-1">vs last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Escalations</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">47</div>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="w-4 h-4 text-red-400 mr-1" />
                    <span className="text-sm text-red-400">+8</span>
                    <span className="text-sm text-slate-400 ml-1">this month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* History Filters */}
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                  <div className="flex flex-1 gap-3 w-full lg:w-auto">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search alert history..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                      <Filter className="w-4 h-4 mr-2" />
                      All Status
                    </Button>
                    <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                      <Calendar className="w-4 h-4 mr-2" />
                      Last 30 Days
                    </Button>
                    <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                      All Categories
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                      <Download className="w-4 h-4 mr-2" />
                      Export History
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alert History Timeline */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Alert History</CardTitle>
                    <p className="text-slate-400 text-sm">Chronological view of resolved and dismissed alerts</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                      <Activity className="w-4 h-4 mr-2" />
                      Timeline View
                    </Button>
                    <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Analytics View
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Today */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-slate-200 font-medium">Today - December 28, 2024</h3>
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">
                      8 Resolved
                    </Badge>
                  </div>
                  <div className="space-y-3 pl-4 border-l-2 border-slate-700">
                    <div className="flex items-start gap-3 relative">
                      <div className="absolute -left-6 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></div>
                      <div className="flex-1 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-slate-200 font-medium">Payment Gateway Recovery</span>
                            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
                              Resolved
                            </Badge>
                          </div>
                          <span className="text-xs text-slate-400">15:42:18</span>
                        </div>
                        <p className="text-slate-300 text-sm mb-2">Payment processing restored after 3-minute outage. All queued transactions processed successfully.</p>
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <span>ID: ALT-004</span>
                          <span>Category: Payment</span>
                          <span>Resolved by: System Auto-Recovery</span>
                          <span>Duration: 3m 24s</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 relative">
                      <div className="absolute -left-6 w-3 h-3 bg-blue-500 rounded-full border-2 border-slate-900"></div>
                      <div className="flex-1 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-blue-400" />
                            <span className="text-slate-200 font-medium">Budget Threshold Alert</span>
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">
                              Acknowledged
                            </Badge>
                          </div>
                          <span className="text-xs text-slate-400">14:15:33</span>
                        </div>
                        <p className="text-slate-300 text-sm mb-2">Marketing budget variance alert acknowledged. Budget adjustment approved for Q1 campaign.</p>
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <span>ID: ALT-002</span>
                          <span>Category: Budget</span>
                          <span>Resolved by: Finance Team</span>
                          <span>Duration: 47m 12s</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 relative">
                      <div className="absolute -left-6 w-3 h-3 bg-yellow-500 rounded-full border-2 border-slate-900"></div>
                      <div className="flex-1 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <X className="w-4 h-4 text-yellow-400" />
                            <span className="text-slate-200 font-medium">False Positive Detection</span>
                            <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 text-xs">
                              Dismissed
                            </Badge>
                          </div>
                          <span className="text-xs text-slate-400">11:28:45</span>
                        </div>
                        <p className="text-slate-300 text-sm mb-2">Large transaction alert dismissed as false positive. Pre-approved capital expenditure.</p>
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <span>ID: ALT-001</span>
                          <span>Category: Transaction</span>
                          <span>Resolved by: Operations Manager</span>
                          <span>Duration: 12m 8s</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Yesterday */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-slate-200 font-medium">Yesterday - December 27, 2024</h3>
                    <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
                      15 Resolved
                    </Badge>
                  </div>
                  <div className="space-y-3 pl-4 border-l-2 border-slate-700">
                    <div className="flex items-start gap-3 relative">
                      <div className="absolute -left-6 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900"></div>
                      <div className="flex-1 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-400" />
                            <span className="text-slate-200 font-medium">Security Breach Attempt</span>
                            <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20 text-xs">
                              Escalated
                            </Badge>
                          </div>
                          <span className="text-xs text-slate-400">23:45:12</span>
                        </div>
                        <p className="text-slate-300 text-sm mb-2">Multiple failed login attempts detected. Security team notified and IP blocked.</p>
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <span>ID: ALT-SEC-015</span>
                          <span>Category: Security</span>
                          <span>Escalated to: Security Team</span>
                          <span>Duration: 2h 15m</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 relative">
                      <div className="absolute -left-6 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></div>
                      <div className="flex-1 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-slate-200 font-medium">Cash Flow Optimization</span>
                            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
                              Resolved
                            </Badge>
                          </div>
                          <span className="text-xs text-slate-400">16:20:08</span>
                        </div>
                        <p className="text-slate-300 text-sm mb-2">Low cash flow alert resolved through accounts receivable collection efforts.</p>
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <span>ID: ALT-CF-009</span>
                          <span>Category: Cash Flow</span>
                          <span>Resolved by: Finance Team</span>
                          <span>Duration: 4h 32m</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 relative">
                      <div className="absolute -left-6 w-3 h-3 bg-blue-500 rounded-full border-2 border-slate-900"></div>
                      <div className="flex-1 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Database className="w-4 h-4 text-blue-400" />
                            <span className="text-slate-200 font-medium">Data Sync Completion</span>
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">
                              Auto-Resolved
                            </Badge>
                          </div>
                          <span className="text-xs text-slate-400">09:15:22</span>
                        </div>
                        <p className="text-slate-300 text-sm mb-2">Scheduled bank account synchronization completed successfully across all connected accounts.</p>
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <span>ID: ALT-SYN-003</span>
                          <span>Category: System</span>
                          <span>Auto-Resolved</span>
                          <span>Duration: 15m 45s</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Load More */}
                <div className="flex items-center justify-center pt-4">
                  <Button variant="outline" className="bg-slate-800 border-slate-700">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Load More History
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Alert Performance Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Resolution Trends</CardTitle>
                  <p className="text-slate-400 text-sm">Alert resolution performance over time</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">This Week</span>
                    <div className="flex items-center gap-2">
                      <Progress value={94} className="w-20 h-2 bg-slate-800" />
                      <span className="text-green-400 text-sm font-medium">94%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Last Week</span>
                    <div className="flex items-center gap-2">
                      <Progress value={87} className="w-20 h-2 bg-slate-800" />
                      <span className="text-blue-400 text-sm font-medium">87%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Two Weeks Ago</span>
                    <div className="flex items-center gap-2">
                      <Progress value={91} className="w-20 h-2 bg-slate-800" />
                      <span className="text-green-400 text-sm font-medium">91%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Monthly Average</span>
                    <div className="flex items-center gap-2">
                      <Progress value={89} className="w-20 h-2 bg-slate-800" />
                      <span className="text-blue-400 text-sm font-medium">89%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Category Breakdown</CardTitle>
                  <p className="text-slate-400 text-sm">Alert types by frequency this month</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      <span className="text-slate-300 text-sm">Transaction</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={45} className="w-20 h-2 bg-slate-800" />
                      <span className="text-slate-400 text-sm">342</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-blue-400" />
                      <span className="text-slate-300 text-sm">Budget</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={28} className="w-20 h-2 bg-slate-800" />
                      <span className="text-slate-400 text-sm">187</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-red-400" />
                      <span className="text-slate-300 text-sm">Security</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={35} className="w-20 h-2 bg-slate-800" />
                      <span className="text-slate-400 text-sm">156</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-purple-400" />
                      <span className="text-slate-300 text-sm">Cash Flow</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={22} className="w-20 h-2 bg-slate-800" />
                      <span className="text-slate-400 text-sm">89</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            {/* Notification Settings */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Notification Settings</CardTitle>
                <p className="text-slate-400 text-sm">Configure how you receive alerts</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-blue-400" />
                      <div>
                        <span className="text-slate-200 font-medium">Browser Notifications</span>
                        <p className="text-slate-400 text-sm">Get desktop notifications for critical alerts</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Database className="w-5 h-5 text-green-400" />
                      <div>
                        <span className="text-slate-200 font-medium">Email Notifications</span>
                        <p className="text-slate-400 text-sm">Receive email alerts for high-priority issues</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      <div>
                        <span className="text-slate-200 font-medium">SMS Alerts</span>
                        <p className="text-slate-400 text-sm">Critical alerts via SMS (extra charges apply)</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Activity className="w-5 h-5 text-purple-400" />
                      <div>
                        <span className="text-slate-200 font-medium">Real-time Dashboard</span>
                        <p className="text-slate-400 text-sm">Live alert updates in dashboard</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="border-t border-slate-700 pt-6">
                  <h4 className="text-slate-200 font-medium mb-4">Alert Thresholds</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-slate-300 text-sm">Transaction Amount Threshold</label>
                      <input 
                        type="text" 
                        defaultValue="$10,000"
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-slate-300 text-sm">Budget Variance Threshold</label>
                      <input 
                        type="text" 
                        defaultValue="10%"
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-slate-300 text-sm">Cash Flow Warning Level</label>
                      <input 
                        type="text" 
                        defaultValue="$50,000"
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-slate-300 text-sm">Failed Payment Limit</label>
                      <input 
                        type="text" 
                        defaultValue="3"
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="bg-blue-600 hover:bg-blue-700">Save Settings</Button>
                  <Button variant="outline" className="bg-slate-800 border-slate-700">Reset to Default</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 