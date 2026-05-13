import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Edit, Trash2, Eye, EyeOff } from "lucide-react"
import type { TravelPackage } from "@/types"
import { useState } from "react"
import { PackageForm } from "./PackageForm"

interface PackageManagerProps {
  packages: TravelPackage[]
  onSave: (pkg: TravelPackage) => void
  onDelete: (id: string) => void
}

export function PackageManager({ packages, onSave, onDelete }: PackageManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showArchived, setShowArchived] = useState(false)

  const filtered = packages.filter(p => showArchived || p.status !== "archived")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{filtered.length} paquetes</p>
        <button onClick={() => setShowArchived(!showArchived)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          {showArchived ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
          {showArchived ? "Ocultar archivados" : "Mostrar archivados"}
        </button>
      </div>

      {editingId && (
        <Card className="border-primary/20">
          <CardContent className="p-6">
            <h3 className="font-display text-lg font-semibold mb-4">Editar Paquete</h3>
            <PackageForm
              pkg={filtered.find(p => p.id === editingId)}
              onSave={(pkg) => { onSave(pkg); setEditingId(null) }}
              onCancel={() => setEditingId(null)}
            />
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {filtered.map(pkg => (
          <Card key={pkg.id} className="hover:border-primary/20 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <img src={pkg.imageUrl} alt={pkg.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm truncate">{pkg.name}</p>
                    <Badge variant={pkg.status === "active" ? "success" : pkg.status === "draft" ? "warning" : "secondary"}>{pkg.status}</Badge>
                    {pkg.featured && <Badge variant="default">Destacado</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{pkg.destination} · {pkg.duration} · {pkg.accommodation}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs">
                    <span className="text-primary font-semibold">{pkg.price.toLocaleString("es-AR")} ARS</span>
                    <span className={pkg.availableSpots <= 5 ? "text-destructive font-medium" : "text-muted-foreground"}>
                      {pkg.availableSpots}/{pkg.maxCapacity} cupos
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" onClick={() => setEditingId(editingId === pkg.id ? null : pkg.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(pkg.id)} className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
