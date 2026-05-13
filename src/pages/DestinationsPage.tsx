import { usePackages } from "@/hooks/useFirestore"
import { DestinationsView } from "@/components/destinations/DestinationsView"
import { Compass } from "lucide-react"

export function DestinationsPage() {
  const { data: packages = [], isLoading } = usePackages()

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
            <Compass className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold">Destinos</h1>
            <p className="text-sm text-muted-foreground">Explorá por destino</p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-64 rounded-2xl bg-muted animate-pulse" />)}
          </div>
        ) : (
          <DestinationsView packages={packages} />
        )}
      </div>
    </div>
  )
}
