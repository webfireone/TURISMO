import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { TravelPackage } from "@/types"
import { useNavigate } from "react-router-dom"

const DESTINATION_IMAGES: Record<string, string> = {
  Caribe: "https://placehold.co/800x600/0ea5e9/ffffff?text=Caribe",
  Europa: "https://placehold.co/800x600/ec4899/ffffff?text=Europa",
  Sudamérica: "https://placehold.co/800x600/10b981/ffffff?text=Sudamerica",
  Norteamérica: "https://placehold.co/800x600/f59e0b/ffffff?text=Norteamerica",
  Asia: "https://placehold.co/800x600/7c5cfc/ffffff?text=Asia",
  África: "https://placehold.co/800x600/ef4444/ffffff?text=Africa",
  Oceanía: "https://placehold.co/800x600/06b6d4/ffffff?text=Oceania",
  Nacional: "https://placehold.co/800x600/22c55e/ffffff?text=Nacional",
}

export function DestinationsView({ packages }: { packages: TravelPackage[] }) {
  const navigate = useNavigate()

  const destinations = [...new Set(packages.filter(p => p.status === "active").map(p => p.destination))]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {destinations.map(dest => {
        const destPackages = packages.filter(p => p.destination === dest && p.status === "active")
        const minPrice = Math.min(...destPackages.map(p => p.price))

        return (
          <Card key={dest} className="overflow-hidden group cursor-pointer hover:border-primary/20 transition-all"
            onClick={() => navigate(`/catalog?destination=${dest}`)}
          >
            <div className="relative h-40 overflow-hidden">
              <img src={DESTINATION_IMAGES[dest] || `https://placehold.co/800x600/0ea5e9/ffffff?text=${dest}`}
                alt={dest} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="font-display text-lg font-bold text-white">{dest}</h3>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{destPackages.length} paquetes</span>
                <span>desde {minPrice.toLocaleString("es-AR")} ARS</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {[...new Set(destPackages.flatMap(p => p.tags))].slice(0, 4).map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
