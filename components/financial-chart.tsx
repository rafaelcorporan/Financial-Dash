"use client"

import { useEffect, useRef } from "react"

export function FinancialChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    const width = canvas.offsetWidth
    const height = canvas.offsetHeight

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Sample data points
    const dataPoints = [
      { time: "00:00", revenue: 20, expenses: 15, profit: 5 },
      { time: "06:00", revenue: 35, expenses: 25, profit: 10 },
      { time: "12:00", revenue: 60, expenses: 40, profit: 20 },
      { time: "18:00", revenue: 80, expenses: 55, profit: 25 },
      { time: "24:00", revenue: 75, expenses: 50, profit: 25 },
    ]

    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Draw grid lines
    ctx.strokeStyle = "#334155"
    ctx.lineWidth = 1

    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight / 4) * i
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()
    }

    // Vertical grid lines
    for (let i = 0; i <= 4; i++) {
      const x = padding + (chartWidth / 4) * i
      ctx.beginPath()
      ctx.moveTo(x, padding)
      ctx.lineTo(x, height - padding)
      ctx.stroke()
    }

    // Draw time labels
    ctx.fillStyle = "#64748b"
    ctx.font = "12px Inter"
    ctx.textAlign = "center"
    dataPoints.forEach((point, index) => {
      const x = padding + (chartWidth / (dataPoints.length - 1)) * index
      ctx.fillText(point.time, x, height - 10)
    })

    // Draw percentage labels
    ctx.textAlign = "right"
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight / 4) * i
      const percentage = 100 - i * 25
      ctx.fillText(`${percentage}%`, padding - 10, y + 4)
    }

    // Draw lines
    const drawLine = (data: number[], color: string, lineWidth = 2) => {
      ctx.strokeStyle = color
      ctx.lineWidth = lineWidth
      ctx.beginPath()

      data.forEach((value, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index
        const y = height - padding - (value / 100) * chartHeight

        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.stroke()

      // Draw points
      ctx.fillStyle = color
      data.forEach((value, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index
        const y = height - padding - (value / 100) * chartHeight

        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    // Draw the lines
    drawLine(
      dataPoints.map((d) => d.revenue),
      "#3b82f6",
    ) // Blue for revenue
    drawLine(
      dataPoints.map((d) => d.expenses),
      "#8b5cf6",
    ) // Purple for expenses
    drawLine(
      dataPoints.map((d) => d.profit),
      "#10b981",
    ) // Green for profit

    // Draw current system load indicator
    ctx.fillStyle = "#0ea5e9"
    ctx.font = "14px Inter"
    ctx.textAlign = "left"
    ctx.fillText("System Load", width - 150, 30)
    ctx.fillStyle = "#0ea5e9"
    ctx.font = "24px Inter"
    ctx.fillText("39%", width - 150, 55)
  }, [])

  return (
    <div className="relative w-full h-64">
      <canvas ref={canvasRef} className="w-full h-full" style={{ width: "100%", height: "100%" }} />
    </div>
  )
}
