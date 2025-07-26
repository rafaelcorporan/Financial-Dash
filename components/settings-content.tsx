"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Settings,
  User,
  Shield,
  Bell,
  Database,
  Palette,
  Globe,
  Key,
  Download,
  Upload,
  RefreshCw,
  Save,
  RotateCcw,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  Lock,
  Calendar,
  DollarSign,
  BarChart3,
  Activity,
  Zap,
  Users,
  Building,
  CreditCard,
  Wifi,
  Monitor,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react"

export function SettingsContent() {
  return (
    <div className="flex-1 bg-slate-950 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Settings</h1>
              <p className="text-slate-400 mt-1">Manage your dashboard preferences and configurations</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                <Download className="w-4 h-4 mr-2" />
                Export Settings
              </Button>
              <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                <Upload className="w-4 h-4 mr-2" />
                Import Settings
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Settings Tabs */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700 grid w-full grid-cols-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            {/* User Profile */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="w-5 h-5" />
                  User Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-slate-300 text-sm">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue="John Anderson"
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-slate-300 text-sm">Email Address</label>
                    <input 
                      type="email" 
                      defaultValue="john.anderson@company.com"
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-slate-300 text-sm">Job Title</label>
                    <input 
                      type="text" 
                      defaultValue="Financial Director"
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-slate-300 text-sm">Department</label>
                    <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="finance">Finance</option>
                      <option value="accounting">Accounting</option>
                      <option value="operations">Operations</option>
                      <option value="executive">Executive</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Display Preferences */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Display Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Moon className="w-5 h-5 text-blue-400" />
                        <div>
                          <span className="text-slate-200 font-medium">Dark Mode</span>
                          <p className="text-slate-400 text-sm">Use dark theme for better visibility</p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Monitor className="w-5 h-5 text-green-400" />
                        <div>
                          <span className="text-slate-200 font-medium">High Contrast</span>
                          <p className="text-slate-400 text-sm">Enhanced contrast for accessibility</p>
                        </div>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Activity className="w-5 h-5 text-purple-400" />
                        <div>
                          <span className="text-slate-200 font-medium">Animations</span>
                          <p className="text-slate-400 text-sm">Enable smooth transitions</p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <label className="text-slate-300 text-sm">Language</label>
                      <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="en">English (US)</option>
                        <option value="en-gb">English (UK)</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-slate-300 text-sm">Timezone</label>
                      <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="UTC-8">Pacific Time (UTC-8)</option>
                        <option value="UTC-5">Eastern Time (UTC-5)</option>
                        <option value="UTC-6">Central Time (UTC-6)</option>
                        <option value="UTC+0">UTC (GMT)</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-slate-300 text-sm">Date Format</label>
                      <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            {/* Currency & Formatting */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Currency & Formatting
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-slate-300 text-sm">Primary Currency</label>
                    <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="JPY">JPY - Japanese Yen</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-slate-300 text-sm">Number Format</label>
                    <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="1,234.56">1,234.56</option>
                      <option value="1.234,56">1.234,56</option>
                      <option value="1 234.56">1 234.56</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-slate-300 text-sm">Fiscal Year Start</label>
                    <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="january">January</option>
                      <option value="april">April</option>
                      <option value="july">July</option>
                      <option value="october">October</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-slate-300 text-sm">Decimal Places</label>
                    <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="0">0</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Budget Settings */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Budget & Alert Thresholds
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-slate-300 text-sm">Budget Variance Alert (%)</label>
                    <input 
                      type="number" 
                      defaultValue="10"
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-slate-300 text-sm">High Transaction Alert ($)</label>
                    <input 
                      type="number" 
                      defaultValue="10000"
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-slate-300 text-sm">Low Cash Flow Alert ($)</label>
                    <input 
                      type="number" 
                      defaultValue="50000"
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-slate-300 text-sm">Auto-categorization Confidence (%)</label>
                    <input 
                      type="number" 
                      defaultValue="85"
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            {/* Account Security */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Account Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Key className="w-5 h-5 text-blue-400" />
                      <div>
                        <span className="text-slate-200 font-medium">Two-Factor Authentication</span>
                        <p className="text-slate-400 text-sm">Add an extra layer of security to your account</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-green-400" />
                      <div>
                        <span className="text-slate-200 font-medium">SMS Verification</span>
                        <p className="text-slate-400 text-sm">Receive verification codes via SMS</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-yellow-400" />
                      <div>
                        <span className="text-slate-200 font-medium">Auto-logout</span>
                        <p className="text-slate-400 text-sm">Automatically log out after inactivity</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-700">
                  <div className="space-y-3">
                    <label className="text-slate-300 text-sm">Session Timeout (minutes)</label>
                    <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-slate-300 text-sm">Password Strength</label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full w-4/5 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-green-400 text-sm">Strong</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="bg-slate-800 border-slate-700">
                    <Lock className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="bg-slate-800 border-slate-700">
                    <Download className="w-4 h-4 mr-2" />
                    Download Recovery Codes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            {/* Notification Preferences */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h4 className="text-slate-200 font-medium">Email Notifications</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-slate-300 text-sm">Critical Alerts</span>
                          <p className="text-slate-500 text-xs">High-priority system alerts</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-slate-300 text-sm">Budget Notifications</span>
                          <p className="text-slate-500 text-xs">Budget variance and threshold alerts</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-slate-300 text-sm">Weekly Reports</span>
                          <p className="text-slate-500 text-xs">Automated weekly summary reports</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-slate-200 font-medium">Push Notifications</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-slate-300 text-sm">Transaction Alerts</span>
                          <p className="text-slate-500 text-xs">Real-time transaction notifications</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-slate-300 text-sm">Security Alerts</span>
                          <p className="text-slate-500 text-xs">Login and security notifications</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-slate-300 text-sm">System Updates</span>
                          <p className="text-slate-500 text-xs">System maintenance and updates</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            {/* Connected Services */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Connected Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-slate-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <span className="text-slate-200 font-medium">Chase Business Banking</span>
                        <p className="text-slate-400 text-sm">Last sync: 2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                        Connected
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-slate-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <span className="text-slate-200 font-medium">QuickBooks Online</span>
                        <p className="text-slate-400 text-sm">Last sync: 15 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                        Connected
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-slate-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <span className="text-slate-200 font-medium">Stripe Payments</span>
                        <p className="text-slate-400 text-sm">Ready to connect</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-slate-700/50 text-slate-400 border-slate-600">
                        Disconnected
                      </Badge>
                      <Button variant="ghost" size="sm" className="text-blue-400">
                        Connect
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-700">
                  <Button variant="outline" className="bg-slate-800 border-slate-700">
                    <Zap className="w-4 h-4 mr-2" />
                    Add New Integration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            {/* Data Management */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Data Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-slate-200 font-medium">Backup & Export</h4>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full bg-slate-800 border-slate-700 justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        Export All Data
                      </Button>
                      <Button variant="outline" className="w-full bg-slate-800 border-slate-700 justify-start">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Create Backup
                      </Button>
                      <Button variant="outline" className="w-full bg-slate-800 border-slate-700 justify-start">
                        <Upload className="w-4 h-4 mr-2" />
                        Restore Backup
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-slate-200 font-medium">System Reset</h4>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full bg-slate-800 border-slate-700 justify-start">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset Preferences
                      </Button>
                      <Button variant="outline" className="w-full bg-red-900/20 border-red-700 text-red-400 justify-start">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Factory Reset
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-slate-200 font-medium">Developer Mode</span>
                      <p className="text-slate-400 text-sm">Enable advanced debugging features</p>
                    </div>
                    <Switch />
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