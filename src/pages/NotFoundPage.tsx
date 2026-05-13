import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { Compass, ArrowLeft } from "lucide-react"

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="max-w-md text-center p-8 border-primary/20">
        <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6">
          <Compass className="h-10 w-10 text-white" />
        </div>
        <h1 className="font-display text-6xl font-bold mb-2">404</h1>
        <p className="text-lg text-muted-foreground mb-2">Página no encontrada</p>
        <p className="text-sm text-muted-foreground mb-8">El destino que buscás no existe en nuestro mapa</p>
        <Button onClick={() => navigate("/")} size="lg">
          <ArrowLeft className="h-4 w-4" /> Volver al inicio
        </Button>
      </Card>
    </div>
  )
}
