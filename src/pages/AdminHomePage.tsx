import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardTitle, CardContent } from "@/components/ui/card"
import { Plane, Package, ClipboardList, BarChart3, Settings, AlertTriangle, FileUp, Sparkles } from "lucide-react"
import { useNavigate } from "react-router-dom"

const adminCards = [
  { title: "Dashboard", desc: "KPIs y métricas", icon: BarChart3, to: "/dashboard", gradient: "gradient-primary" },
  { title: "Paquetes", desc: "Administrar paquetes", icon: Package, to: "/packages", gradient: "gradient-accent" },
  { title: "Reservas", desc: "Gestionar reservas", icon: ClipboardList, to: "/bookings", gradient: "gradient-cool" },
  { title: "Alertas", desc: "Notificaciones", icon: AlertTriangle, to: "/alerts", gradient: "gradient-warm" },
  { title: "Import/Export", desc: "CSV, Excel, Web", icon: FileUp, to: "/import-export", gradient: "gradient-brand" },
  { title: "Marketing", desc: "Promociones", icon: Sparkles, to: "/marketing", gradient: "gradient-sunset" },
  { title: "Configuración", desc: "Parámetros globales", icon: Settings, to: "/config", gradient: "gradient-ocean" },
]

export function AdminHomePage() {
  const { isAdmin } = useAuth()
  const navigate = useNavigate()

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md text-center p-8">
          <Plane className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold mb-2">Acceso restringido</h2>
          <p className="text-sm text-muted-foreground mb-6">Necesitás permisos de administrador</p>
          <Button onClick={() => navigate("/")}>Volver al inicio</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
            <Plane className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold">Panel de Administración</h1>
            <p className="text-sm text-muted-foreground">Gestioná tu agencia de viajes</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {adminCards.map(card => (
            <Card key={card.to} className="cursor-pointer hover:border-primary/30 transition-all duration-300 group"
              onClick={() => navigate(card.to)}>
              <CardContent className="p-6">
                <div className={`w-10 h-10 rounded-xl ${card.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                  <card.icon className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-sm mb-1">{card.title}</CardTitle>
                <p className="text-xs text-muted-foreground">{card.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
