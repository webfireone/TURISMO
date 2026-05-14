import { useState, useMemo } from "react"
import { usePackages } from "@/hooks/useFirestore"
import { Tabs } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ItineraryView } from "@/components/destinations/ItineraryView"
import { Compass, MapPin } from "lucide-react"
import type { TravelPackage } from "@/types"

function PackageSelector({ packages }: { packages: TravelPackage[] }) {
  const [selectedId, setSelectedId] = useState(packages[0]?.id)

  if (packages.length === 0) return null

  const pkg = packages.find(p => p.id === selectedId) || packages[0]

  return (
    <div>
      {packages.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {packages.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border ${
                p.id === (selectedId || packages[0].id)
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "bg-transparent border-primary/5 text-muted-foreground hover:border-primary/20 hover:text-foreground"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="font-display text-2xl font-bold">{pkg.name}</h2>
          <Badge variant="outline">{pkg.duration}</Badge>
          <Badge variant="outline">{pkg.accommodation}</Badge>
        </div>
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          <MapPin className="h-3 w-3" />{pkg.country} · {pkg.destination}
        </p>
      </div>

      <ItineraryView pkg={pkg} />
    </div>
  )
}

export function ItinerariesPage() {
  const { data: packages = [], isLoading } = usePackages()
  const activePackages = packages.filter(p => p.status === "active")

  const grouped = useMemo(() => {
    const map = new Map<string, TravelPackage[]>()
    for (const pkg of activePackages) {
      const list = map.get(pkg.destination) || []
      list.push(pkg)
      map.set(pkg.destination, list)
    }
    return Array.from(map.entries()).sort((a, b) => b[1].length - a[1].length)
  }, [activePackages])

  if (isLoading) {
    return (
      <div className="min-h-screen pb-20">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-muted animate-pulse" />
            <div><div className="h-8 w-48 bg-muted rounded animate-pulse mb-1" /><div className="h-4 w-32 bg-muted rounded animate-pulse" /></div>
          </div>
          <div className="space-y-4">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-32 rounded-2xl bg-muted animate-pulse" />)}</div>
        </div>
      </div>
    )
  }

  if (activePackages.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md text-center p-8 border-primary/20">
          <Compass className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold mb-2">Sin itinerarios</h2>
          <p className="text-sm text-muted-foreground">No hay paquetes disponibles para mostrar</p>
        </Card>
      </div>
    )
  }

  const tabs = grouped.map(([dest, pkgs]) => ({
    id: dest,
    label: `${dest} (${pkgs.length})`,
    content: <PackageSelector packages={pkgs} />,
  }))

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
            <Compass className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold">Itinerarios</h1>
            <p className="text-sm text-muted-foreground">Planificá tu viaje día a día</p>
          </div>
        </div>
        <Tabs tabs={tabs} />
      </div>
    </div>
  )
}
