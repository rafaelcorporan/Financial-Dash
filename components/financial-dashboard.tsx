"use client"
import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { FinancialSidebar } from "@/components/financial-sidebar"
import { DashboardContent } from "@/components/dashboard-content"
import { AnalyticsContent } from "@/components/analytics-content"
import { CashFlowContent } from "@/components/cashflow-content"
import { ReportsContent } from "@/components/reports-content"
import { BudgetsContent } from "@/components/budgets-content"
import { TransactionsContent } from "@/components/transactions-content"
import { AlertsContent } from "@/components/alerts-content"
import { SettingsContent } from "@/components/settings-content"
import { ForecastingContent } from "@/components/forecasting-content"

export function FinancialDashboard() {
  const [activeView, setActiveView] = useState("Dashboard")

  const renderContent = () => {
    switch (activeView) {
      case "Analytics":
        return <AnalyticsContent />
      case "Cash Flow":
        return <CashFlowContent />
      case "Reports":
        return <ReportsContent />
      case "Budgets":
        return <BudgetsContent />
      case "Transactions":
        return <TransactionsContent />
      case "Alerts":
        return <AlertsContent />
      case "Settings":
        return <SettingsContent />
      case "Forecasting":
        return <ForecastingContent />
      case "Dashboard":
      default:
        return <DashboardContent onViewChange={setActiveView} />
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen">
          <FinancialSidebar activeView={activeView} onViewChange={setActiveView} />
          {renderContent()}
        </div>
      </SidebarProvider>
    </div>
  )
}
