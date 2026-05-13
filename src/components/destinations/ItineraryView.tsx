import { Card, CardContent } from "@/components/ui/card"
import { Sun, Coffee, Hotel } from "lucide-react"
import type { TravelPackage } from "@/types"

export function ItineraryView({ pkg }: { pkg: TravelPackage }) {
  if (!pkg || !pkg.itinerary || pkg.itinerary.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground text-sm">
        No hay itinerario disponible para este paquete.
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {pkg.itinerary.map((day) => (
        <Card key={day.day} className="border-primary/5 hover:border-primary/20 transition-all">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                <span className="text-sm font-bold text-white">{day.day}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-sm">{day.title}</h4>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{day.description}</p>

                <div className="flex flex-wrap items-center gap-3">
                  {day.activities.filter(a => a.trim()).length > 0 && (
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Sun className="h-3 w-3 text-warning" />
                      {day.activities.filter(a => a.trim()).join(", ")}
                    </div>
                  )}
                  {day.meals.filter(m => m.trim()).length > 0 && (
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Coffee className="h-3 w-3 text-primary" />
                      {day.meals.filter(m => m.trim()).join(", ")}
                    </div>
                  )}
                  {day.accommodation && (
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Hotel className="h-3 w-3 text-success" />
                      {day.accommodation}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
