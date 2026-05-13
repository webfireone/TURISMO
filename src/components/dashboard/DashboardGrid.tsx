import { KpiCard } from "./KpiCard"
import { DollarSign, Users, TrendingUp, Calendar, Globe, Briefcase } from "lucide-react"
import type { KpiData } from "@/types"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface DashboardGridProps {
  kpis: KpiData
  formatMoney: (n: number) => string
}

export function DashboardGrid({ kpis, formatMoney }: DashboardGridProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Ingresos Mensuales" value={formatMoney(kpis.monthlyRevenue)} icon={DollarSign} trend="up" trendValue="+12%" subtitle="vs mes anterior" />
        <KpiCard title="Ingresos Anuales" value={formatMoney(kpis.annualRevenue)} icon={TrendingUp} subtitle="proyectado" />
        <KpiCard title="Reservas" value={String(kpis.totalBookings)} icon={Calendar} subtitle="viajeros registrados" />
        <KpiCard title="Ticket Promedio" value={formatMoney(kpis.averageBookingValue)} icon={Users} trend="up" trendValue="+5%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Globe className="h-5 w-5 text-primary" />
              Destinos más vendidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {kpis.topDestinations.map((d, i) => (
                <div key={d.name} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-muted-foreground w-5">{i + 1}</span>
                    <span className="text-sm font-medium">{d.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-primary">{formatMoney(d.revenue)}</span>
                </div>
              ))}
              {kpis.topDestinations.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-6">No hay datos suficientes</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Briefcase className="h-5 w-5 text-primary" />
              Ocupación General
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" strokeWidth="3" className="text-muted" />
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={`${kpis.occupancyRate} ${100 - kpis.occupancyRate}`} className="text-primary drop-shadow-lg" style={{ transition: "stroke-dasharray 1s ease" }} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold font-display">{Math.round(kpis.occupancyRate)}%</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">Tasa de ocupación general</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
