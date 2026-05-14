import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { TravelPackage } from "@/types"
import { useNavigate } from "react-router-dom"
import { MapPin } from "lucide-react"

const DESTINATION_META: Record<string, { gradient: string; desc: string }> = {
  Caribe: { gradient: "from-cyan-600 via-blue-700 to-slate-800", desc: "Playas paradisíacas, aguas turquesas y resorts todo incluido" },
  Europa: { gradient: "from-rose-600 via-purple-700 to-slate-800", desc: "Historia, arte y cultura en las ciudades más emblemáticas" },
  Sudamérica: { gradient: "from-emerald-600 via-teal-700 to-slate-800", desc: "Naturaleza salvaje, ruinas ancestrales y ciudades vibrantes" },
  Norteamérica: { gradient: "from-amber-600 via-orange-700 to-slate-800", desc: "Rascacielos, cultura urbana y paisajes infinitos" },
  Asia: { gradient: "from-violet-600 via-purple-700 to-slate-800", desc: "Templos dorados, sabores exóticos y tradiciones milenarias" },
  África: { gradient: "from-amber-700 via-yellow-800 to-slate-800", desc: "Safaris, atardeceres inolvidables y naturaleza en estado puro" },
  Oceanía: { gradient: "from-teal-500 via-cyan-700 to-slate-800", desc: "Playas vírgenes, arrecifes de coral y aventura al aire libre" },
  Nacional: { gradient: "from-green-600 via-emerald-700 to-slate-800", desc: "Descubrí la diversidad argentina, de la Patagonia al norte" },
}

export function DestinationsView({ packages }: { packages: TravelPackage[] }) {
  const navigate = useNavigate()

  const active = packages.filter(p => p.status === "active")
  const destinations = [...new Set(active.map(p => p.destination))]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {destinations.map(dest => {
        const destPackages = active.filter(p => p.destination === dest)
        const prices = destPackages.map(p => p.price)
        const minPrice = Math.min(...prices)
        const maxPrice = Math.max(...prices)
        const meta = DESTINATION_META[dest]
        const mainImage = destPackages.find(p => p.imageUrl)?.imageUrl
        const countries = [...new Set(destPackages.map(p => p.country))]
        const allTags = [...new Set(destPackages.flatMap(p => p.tags))]

        return (
          <Card key={dest} className="overflow-hidden group cursor-pointer hover:border-primary/20 transition-all"
            onClick={() => navigate(`/catalog?destination=${dest}`)}
          >
            <div className="relative h-48 overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${meta?.gradient || "from-zinc-600 to-slate-800"} opacity-60`} />
              {mainImage && (
                <img src={mainImage} alt={dest}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="font-display text-xl font-bold text-white">{dest}</h3>
                {meta?.desc && (
                  <p className="text-xs text-white/60 mt-0.5">{meta.desc}</p>
                )}
              </div>
            </div>
            <CardContent className="p-4 space-y-3">
              {countries.length > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 shrink-0" />
                  <span className="truncate">{countries.join(", ")}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{destPackages.length} paquete{destPackages.length !== 1 ? "s" : ""}</span>
                <span className="font-semibold text-primary">
                  {minPrice.toLocaleString("es-AR")}
                  {minPrice !== maxPrice ? ` – ${maxPrice.toLocaleString("es-AR")}` : ""} ARS
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {allTags.slice(0, 4).map(tag => (
                  <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">{tag}</Badge>
                ))}
                {allTags.length > 4 && (
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">+{allTags.length - 4}</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
