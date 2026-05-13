import { Select } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useState } from "react"
import type { TravelPackage } from "@/types"
import { calculateOccupancyByDestination } from "@/lib/calculations"

interface ChartPanelProps {
  packages: TravelPackage[]
}

export function ChartPanel({ packages }: ChartPanelProps) {
  const [chartType, setChartType] = useState("occupancy")

  const occupancyByDest = calculateOccupancyByDestination(packages.filter(p => p.status === "active"))

  const chartData = Object.entries(occupancyByDest).map(([name, value]) => ({
    name,
    ocupación: Math.round(value * 10) / 10,
  }))

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Gráficos</CardTitle>
        <Select options={[
          { value: "occupancy", label: "Ocupación por destino" },
        ]} value={chartType} onChange={(e) => setChartType(e.target.value)} className="w-48" />
      </CardHeader>
      <CardContent>
        <div className="h-72">
          {chartType === "occupancy" && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fill: '#8888a8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#8888a8', fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip contentStyle={{ background: '#161627', border: '1px solid rgba(14,165,233,0.2)', borderRadius: '12px', color: '#e8e8f0' }} />
                <Bar dataKey="ocupación" fill="#0ea5e9" radius={[6, 6, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
