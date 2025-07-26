"use client"

import { useEffect, useRef } from "react"

export function RevenueChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    const width = canvas.offsetWidth
    const height = canvas.offsetHeight

    ctx.clearRect(0, 0, width, height)

    // Sample revenue data
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    const revenue = [180, 220, 280, 320, 380, 420]
    const maxRevenue = Math.max(...revenue)

    const padding = 30
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Draw bars
    const barWidth = (chartWidth / months.length) * 0.6
    const barSpacing = chartWidth / months.length

    revenue.forEach((value, index) => {
      const barHeight = (value / maxRevenue) * chartHeight
      const x = padding + index * barSpacing + (barSpacing - barWidth) / 2
      const y = height - padding - barHeight

      // Create gradient
      const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight)
      gradient.addColorStop(0, "#3b82f6")
      gradient.addColorStop(1, "#1d4ed8")

      ctx.fillStyle = gradient
      ctx.fillRect(x, y, barWidth, barHeight)

      // Draw value labels
      ctx.fillStyle = "#e2e8f0"
      ctx.font = "12px Inter"
      ctx.textAlign = "center"
      ctx.fillText(`$${value}K`, x + barWidth / 2, y - 5)

      // Draw month labels
      ctx.fillStyle = "#64748b"
      ctx.fillText(months[index], x + barWidth / 2, height - 5)
    })
  }, [])

  return (
    <div className="w-full h-48">
      <canvas ref={canvasRef} className="w-full h-full" style={{ width: "100%", height: "100%" }} />
    </div>
  )
}
