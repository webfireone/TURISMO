import { useAuth } from "@/context/AuthContext"
import { usePackages, useSavePackage, useDeletePackage } from "@/hooks/useFirestore"
import { Button } from "@/components/ui/button"
import { PackageManager } from "@/components/packages/PackageManager"
import { PackageForm } from "@/components/packages/PackageForm"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Plus } from "lucide-react"
import type { TravelPackage } from "@/types"

export function PackagesPage() {
  const { isAdmin } = useAuth()
  const { data: packages = [] } = usePackages()
  const savePackage = useSavePackage()
  const deletePackage = useDeletePackage()
  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate()

  if (!isAdmin) {
    navigate("/"); return null
  }

  const handleSave = (pkg: TravelPackage) => {
    savePackage.mutate(pkg)
    setShowForm(false)
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold">Paquetes Turísticos</h1>
            <p className="text-sm text-muted-foreground">Administrá los paquetes de viaje</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4" />
            {showForm ? "Cancelar" : "Nuevo Paquete"}
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8 border-primary/20">
            <CardContent className="p-6">
              <h2 className="font-display text-lg font-semibold mb-4">Nuevo Paquete Turístico</h2>
              <PackageForm onSave={handleSave} onCancel={() => setShowForm(false)} />
            </CardContent>
          </Card>
        )}

        <PackageManager
          packages={packages}
          onSave={handleSave}
          onDelete={(id) => deletePackage.mutate(id)}
        />
      </div>
    </div>
  )
}
