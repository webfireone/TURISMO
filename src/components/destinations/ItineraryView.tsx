import { Card, CardContent } from "@/components/ui/card"
import { Sun, Coffee, Hotel } from "lucide-react"
import type { TravelPackage } from "@/types"

export function ItineraryView({ pkg }: { pkg: TravelPackage }) {
  if (!pkg?.itinerary?.length) {
    return (
      <div className="text-center py-16 text-muted-foreground text-sm">
        No hay itinerario disponible para este paquete.
      </div>
    )
  }

  const totalDays = pkg.itinerary.length

  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
          <div className="h-full w-full rounded-full bg-gradient-to-r from-primary to-primary/20" />
        </div>
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {totalDays} día{totalDays !== 1 ? "s" : ""} de viaje
        </span>
      </div>

      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

        <div className="space-y-6">
          {pkg.itinerary.map((day, index) => (
            <div key={day.day} className="relative pl-14">
              <div className="absolute left-[18px] top-3 w-3 h-3 rounded-full border-2 border-primary bg-background z-10" />

              <Card className="border-primary/5 hover:border-primary/20 transition-all overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-primary/60 to-primary/10" />
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">{day.day}</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm mb-1">{day.title}</h4>
                      <p className="text-xs text-muted-foreground mb-3">{day.description}</p>

                      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                        {day.activities.filter(a => a.trim()).length > 0 && (
                          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                            <Sun className="h-3 w-3 text-amber-400 shrink-0" />
                            <span>{day.activities.filter(a => a.trim()).join(", ")}</span>
                          </div>
                        )}
                        {day.meals.filter(m => m.trim()).length > 0 && (
                          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                            <Coffee className="h-3 w-3 text-primary shrink-0" />
                            <span>{day.meals.filter(m => m.trim()).join(", ")}</span>
                          </div>
                        )}
                        {day.accommodation && (
                          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                            <Hotel className="h-3 w-3 text-emerald-400 shrink-0" />
                            <span>{day.accommodation}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
