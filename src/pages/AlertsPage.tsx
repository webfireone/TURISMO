import { useAuth } from "@/context/AuthContext"
import { usePackages } from "@/hooks/useFirestore"
import { useAlerts } from "@/hooks/useAlerts"
import { AlertsPanel } from "@/components/alerts/AlertsPanel"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { AlertTriangle } from "lucide-react"

export function AlertsPage() {
  const { isAdmin } = useAuth()
  const { data: packages = [] } = usePackages()
  const { alerts, rules, setRules } = useAlerts(packages)
  const navigate = useNavigate()

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md text-center p-8">
          <AlertTriangle className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold mb-2">Acceso restringido</h2>
          <p className="text-sm text-muted-foreground mb-6">Necesitás permisos de administrador</p>
          <Button onClick={() => navigate("/")}>Volver al inicio</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold">Alertas</h1>
            <p className="text-sm text-muted-foreground">Monitoreá cupos y eventos</p>
          </div>
        </div>
        <AlertsPanel alerts={alerts} rules={rules} onUpdateRules={setRules} />
      </div>
    </div>
  )
}
