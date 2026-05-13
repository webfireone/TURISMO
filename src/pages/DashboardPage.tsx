import { useAuth } from "@/context/AuthContext"
import { usePackages } from "@/hooks/useFirestore"
import { Button } from "@/components/ui/button"
import { DashboardGrid } from "@/components/dashboard/DashboardGrid"
import { ChartPanel } from "@/components/dashboard/ChartPanel"
import { PageHero } from "@/components/dashboard/Decorative3D"
import { calculateKpis } from "@/lib/calculations"
import { useParamsStore } from "@/store/paramsStore"
import { BarChart3 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Card } from "@/components/ui/card"

export function DashboardPage() {
  const { isAdmin } = useAuth()
  const { data: packages = [], isLoading } = usePackages()
  const { params, scenarioConfig } = useParamsStore()
  const navigate = useNavigate()

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md text-center p-8">
          <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold mb-2">Acceso restringido</h2>
          <p className="text-sm text-muted-foreground mb-6">Necesitás permisos de administrador</p>
          <Button onClick={() => navigate("/")}>Volver al inicio</Button>
        </Card>
      </div>
    )
  }

  const formatMoney = (n: number) => `$${n.toLocaleString("es-AR")}`
  const kpis = calculateKpis(packages, params, scenarioConfig)

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <PageHero title="Dashboard" subtitle="KPIs y métricas de la agencia" icon={BarChart3} />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-28 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            <DashboardGrid kpis={kpis} formatMoney={formatMoney} />
            <ChartPanel packages={packages} />
          </div>
        )}
      </div>
    </div>
  )
}
