import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Check, MapPin, Users } from "lucide-react"
import { useParamsStore } from "@/store/paramsStore"
import { useCartStore } from "@/store/cartStore"
import type { TravelPackage } from "@/types"

interface PackageDetailModalProps {
  pkg: TravelPackage
  isOpen: boolean
  onClose: () => void
}

export function PackageDetailModal({ pkg, isOpen, onClose }: PackageDetailModalProps) {
  const [travelers, setTravelers] = useState(1)
  const [startDate, setStartDate] = useState("")
  const { addItem } = useCartStore()
  const { params } = useParamsStore()

  if (!isOpen) return null

  const tax = params.general.taxRate / 100
  const subtotal = pkg.price * travelers
  const taxes = Math.round(subtotal * tax)
  const total = subtotal + taxes

  const handleAddToCart = () => {
    if (!startDate) return
    addItem(pkg, travelers, startDate)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto pt-10 pb-20" onClick={onClose}>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative max-w-4xl w-full mx-4" onClick={e => e.stopPropagation()}>
        <Card className="overflow-hidden border-primary/20">
          <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors">
            <X className="h-4 w-4" />
          </button>

          <div className="relative h-64 md:h-80">
            <img src={pkg.imageUrl} alt={pkg.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
                <MapPin className="h-3 w-3" />
                <span>{pkg.destination}</span>
                <span className="opacity-30">·</span>
                <span>{pkg.country}</span>
              </div>
              <h2 className="font-display text-3xl font-bold text-white">{pkg.name}</h2>
            </div>
          </div>

          <CardContent className="p-6 space-y-6">
            <div className="flex flex-wrap gap-2">
              {pkg.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
              <Badge variant="outline">{pkg.duration}</Badge>
              <Badge variant="outline">{pkg.accommodation}</Badge>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">{pkg.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-3">Incluye</h4>
                <ul className="space-y-2">
                  {pkg.includes.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {pkg.excludes.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-3">No incluye</h4>
                  <ul className="space-y-2">
                    {pkg.excludes.map((exc, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <X className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {pkg.itinerary.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-3">Itinerario</h4>
                <div className="space-y-2">
                  {pkg.itinerary.slice(0, 4).map(day => (
                    <div key={day.day} className="flex items-start gap-3 p-3 rounded-xl bg-muted/30">
                      <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-white">{day.day}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{day.title}</p>
                        <p className="text-xs text-muted-foreground">{day.description}</p>
                      </div>
                    </div>
                  ))}
                  {pkg.itinerary.length > 4 && (
                    <p className="text-xs text-primary">+{pkg.itinerary.length - 4} días más</p>
                  )}
                </div>
              </div>
            )}

            <div className="border-t border-primary/10 pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-2xl font-bold text-primary">{pkg.price.toLocaleString("es-AR")} ARS</p>
                  {pkg.previousPrice > pkg.price && (
                    <p className="text-sm line-through text-muted-foreground">{pkg.previousPrice.toLocaleString("es-AR")} ARS <span className="text-destructive font-semibold">-{Math.round((1 - pkg.price / pkg.previousPrice) * 100)}%</span></p>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{pkg.availableSpots} cupos disponibles</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Viajeros</label>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setTravelers(Math.max(1, travelers - 1))} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-sm font-medium hover:bg-muted/80">-</button>
                    <span className="w-8 text-center text-sm font-semibold">{travelers}</span>
                    <button onClick={() => setTravelers(Math.min(pkg.availableSpots, travelers + 1))} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-sm font-medium hover:bg-muted/80">+</button>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Fecha de salida</label>
                  <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
                    className="w-full h-11 rounded-xl border border-input bg-card px-4 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30" />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm mb-4 p-3 rounded-xl bg-muted/30">
                <span>Total estimado</span>
                <span className="text-lg font-bold text-primary">{total.toLocaleString("es-AR")} ARS</span>
              </div>

              <Button onClick={handleAddToCart} disabled={!startDate || pkg.availableSpots <= 0} className="w-full btn-shine" size="lg">
                {pkg.availableSpots <= 0 ? "Sin cupos disponibles" : "Agregar al carrito"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
