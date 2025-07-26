"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  BarChart3,
  TrendingUp,
  Settings,
  DollarSign,
  PieChart,
  FileText,
  CreditCard,
  Target,
  AlertTriangle,
  LogOut,
  User,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const navigationItems = [
  {
    title: "Dashboard",
    icon: BarChart3,
  },
  {
    title: "Analytics",
    icon: TrendingUp,
  },
  {
    title: "Cash Flow",
    icon: DollarSign,
  },
  {
    title: "Reports",
    icon: FileText,
  },
  {
    title: "Budgets",
    icon: Target,
  },
  {
    title: "Transactions",
    icon: CreditCard,
  },
  {
    title: "Forecasting",
    icon: PieChart,
  },
  {
    title: "Alerts",
    icon: AlertTriangle,
  },
  {
    title: "Settings",
    icon: Settings,
  },
]

const systemStatus = [
  { name: "Data Sources", value: 95, color: "bg-blue-500" },
  { name: "API Health", value: 88, color: "bg-green-500" },
  { name: "Data Quality", value: 92, color: "bg-purple-500" },
]

interface FinancialSidebarProps {
  activeView: string
  onViewChange: (view: string) => void
}

export function FinancialSidebar({ activeView, onViewChange }: FinancialSidebarProps) {
  const { logout, user } = useAuth()
  return (
    <Sidebar className="border-r border-slate-800 bg-slate-900">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-lg">FinanceOS</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeView === item.title}
                    className="text-slate-300 hover:text-white hover:bg-slate-800"
                  >
                    <button 
                      onClick={() => onViewChange(item.title)}
                      className="flex items-center gap-3 w-full"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="text-slate-400 text-xs uppercase tracking-wider">
            System Status
          </SidebarGroupLabel>
          <SidebarGroupContent className="space-y-3 mt-3">
            {systemStatus.map((item) => (
              <div key={item.name} className="px-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-slate-300">{item.name}</span>
                  <span className="text-sm text-slate-400">{item.value}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-slate-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-200">{user?.username}</span>
              <span className="text-xs text-slate-400">Administrator</span>
            </div>
          </div>
          <button
            onClick={logout}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
