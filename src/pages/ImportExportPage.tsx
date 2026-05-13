import { useAuth } from "@/context/AuthContext"
import { usePackages, useSavePackage } from "@/hooks/useFirestore"
import { ImportDialog, ExportDialog, WebImportDialog } from "@/components/import-export/ImportExportDialogs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { FileUp } from "lucide-react"
import type { TravelPackage } from "@/types"

export function ImportExportPage() {
  const { isAdmin } = useAuth()
  const { data: packages = [] } = usePackages()
  const savePackage = useSavePackage()
  const navigate = useNavigate()

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md text-center p-8">
          <FileUp className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold mb-2">Acceso restringido</h2>
          <p className="text-sm text-muted-foreground mb-6">Necesitás permisos de administrador</p>
          <Button onClick={() => navigate("/")}>Volver al inicio</Button>
        </Card>
      </div>
    )
  }

  const handleImport = (imported: TravelPackage[]) => {
    imported.forEach(pkg => savePackage.mutate(pkg))
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
            <FileUp className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold">Importar / Exportar</h1>
            <p className="text-sm text-muted-foreground">CSV, Excel y desde Web</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImportDialog packages={packages} onImport={handleImport} />
          <div className="space-y-6">
            <ExportDialog packages={packages} onImport={handleImport} />
            <WebImportDialog packages={packages} onImport={handleImport} />
          </div>
        </div>
      </div>
    </div>
  )
}
