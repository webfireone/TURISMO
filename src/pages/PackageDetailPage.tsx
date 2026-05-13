import { usePackage } from "@/hooks/useFirestore"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { MapPin, Users, Check, X, ArrowLeft, Plus, Minus } from "lucide-react"
import { useCartStore } from "@/store/cartStore"
import { ItineraryView } from "@/components/destinations/ItineraryView"

export function PackageDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const pkg = usePackage(id)
  const { addItem } = useCartStore()
  const [travelers, setTravelers] = useState(1)
  const [startDate, setStartDate] = useState("")
  const [added, setAdded] = useState(false)

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Paquete no encontrado</p>
      </div>
    )
  }

  const total = pkg.price * travelers

  const handleAdd = () => {
    if (!startDate) return
    addItem(pkg, travelers, startDate)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <button onClick={() => navigate("/catalog")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
          <ArrowLeft className="h-4 w-4" />
          Volver al catálogo
        </button>

        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
          <img src={pkg.imageUrl} alt={pkg.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
              <MapPin className="h-3 w-3" /><span>{pkg.destination}</span><span className="opacity-30">·</span><span>{pkg.country}</span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white">{pkg.name}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-wrap gap-2">
              {pkg.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
              <Badge variant="outline">{pkg.duration}</Badge>
              <Badge variant="outline">{pkg.accommodation}</Badge>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">{pkg.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-primary/10">
                <CardContent className="p-4">
                  <h3 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-3">Incluye</h3>
                  <ul className="space-y-2">
                    {pkg.includes.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm"><Check className="h-4 w-4 text-success shrink-0 mt-0.5" /><span>{inc}</span></li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              {pkg.excludes.length > 0 && (
                <Card className="border-primary/10">
                  <CardContent className="p-4">
                    <h3 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-3">No incluye</h3>
                    <ul className="space-y-2">
                      {pkg.excludes.map((exc, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm"><X className="h-4 w-4 text-destructive shrink-0 mt-0.5" /><span className="text-muted-foreground">{exc}</span></li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>

            <div>
              <h3 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-4">Itinerario</h3>
              <ItineraryView pkg={pkg} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <Card className="border-primary/20">
                <CardContent className="p-6 space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">{pkg.price.toLocaleString("es-AR")} ARS</p>
                    {pkg.previousPrice > pkg.price && (
                      <p className="text-sm line-through text-muted-foreground">{pkg.previousPrice.toLocaleString("es-AR")} ARS</p>
                    )}
                  </div>

                  <div className="border-t border-primary/10 pt-4 space-y-3">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Viajeros</label>
                      <div className="flex items-center gap-2">
                        <button onClick={() => setTravelers(Math.max(1, travelers - 1))} className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-sm font-medium hover:bg-muted/80"><Minus className="h-3 w-3" /></button>
                        <span className="flex-1 text-center text-lg font-semibold">{travelers}</span>
                        <button onClick={() => setTravelers(Math.min(pkg.availableSpots, travelers + 1))} className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-sm font-medium hover:bg-muted/80"><Plus className="h-3 w-3" /></button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Fecha de salida</label>
                      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
                        className="w-full h-11 rounded-xl border border-input bg-card px-4 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30" />
                    </div>

                    <div className="flex items-center justify-between text-sm p-3 rounded-xl bg-muted/30">
                      <span>Total</span>
                      <span className="text-lg font-bold text-primary">{total.toLocaleString("es-AR")} ARS</span>
                    </div>

                    <Button onClick={handleAdd} disabled={!startDate || pkg.availableSpots <= 0} className="w-full btn-shine" size="lg">
                      {added ? "Agregado ✓" : pkg.availableSpots <= 0 ? "Sin cupos" : "Agregar al carrito"}
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>{pkg.availableSpots} cupos disponibles de {pkg.maxCapacity}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
