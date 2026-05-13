import { useAuth } from "@/context/AuthContext"
import { useParamsStore } from "@/store/paramsStore"
import { GlobalParamsForm } from "@/components/config/GlobalParamsForm"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { Settings, Save } from "lucide-react"

export function ConfigPage() {
  const { isAdmin } = useAuth()
  const { params, updateParams, saveToFirestore } = useParamsStore()
  const navigate = useNavigate()

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md text-center p-8">
          <Settings className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold mb-2">Acceso restringido</h2>
          <p className="text-sm text-muted-foreground mb-6">Necesitás permisos de administrador</p>
          <Button onClick={() => navigate("/")}>Volver al inicio</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold">Configuración</h1>
              <p className="text-sm text-muted-foreground">Parámetros globales del sistema</p>
            </div>
          </div>
          <Button onClick={saveToFirestore}>
            <Save className="h-4 w-4" /> Guardar
          </Button>
        </div>
        <GlobalParamsForm params={params} onSave={updateParams} />
      </div>
    </div>
  )
}
