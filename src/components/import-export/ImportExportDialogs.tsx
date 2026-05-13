import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { Upload, Download, Globe, FileSpreadsheet } from "lucide-react"
import Papa from "papaparse"
import * as XLSX from "xlsx"
import type { TravelPackage } from "@/types"

interface ImportExportProps {
  packages: TravelPackage[]
  onImport: (packages: TravelPackage[]) => void
}

export function ImportDialog({ onImport }: ImportExportProps) {
  const [result, setResult] = useState<{ success: boolean; imported: number; errors: string[] } | null>(null)

  const handleFile = (file: File | undefined) => {
    if (!file) return
    const ext = file.name.split(".").pop()?.toLowerCase()
    if (ext === "csv") {
      Papa.parse(file, {
        header: true, complete: (results) => {
          const imported = results.data as TravelPackage[]
          onImport(imported)
          setResult({ success: true, imported: imported.length, errors: [] })
        }, error: () => setResult({ success: false, imported: 0, errors: ["Error al procesar CSV"] })
      })
    } else if (ext === "xlsx" || ext === "xls") {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const workbook = XLSX.read(e.target?.result, { type: "array" })
          const sheet = workbook.Sheets[workbook.SheetNames[0]]
          const data = XLSX.utils.sheet_to_json(sheet) as TravelPackage[]
          onImport(data)
          setResult({ success: true, imported: data.length, errors: [] })
        } catch { setResult({ success: false, imported: 0, errors: ["Error al procesar Excel"] }) }
      }
      reader.readAsArrayBuffer(file)
    }
  }

  return (
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Upload className="h-4 w-4" /> Importar Paquetes</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <Input type="file" accept=".csv,.xlsx,.xls" onChange={e => handleFile(e.target.files?.[0])} className="cursor-pointer" />
        {result && (
          <div className={`p-3 rounded-xl text-sm ${result.success ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
            {result.success ? `Se importaron ${result.imported} paquetes` : result.errors.join(", ")}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function ExportDialog({ packages }: ImportExportProps) {
  const exportCSV = () => {
    const csv = Papa.unparse(packages)
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `paquetes-${new Date().toISOString().split("T")[0]}.csv`
    link.click()
  }

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(packages)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Paquetes")
    XLSX.writeFile(wb, `paquetes-${new Date().toISOString().split("T")[0]}.xlsx`)
  }

  return (
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Download className="h-4 w-4" /> Exportar Paquetes</CardTitle></CardHeader>
      <CardContent className="flex gap-3">
        <Button variant="outline" onClick={exportCSV}><FileSpreadsheet className="h-4 w-4" /> CSV</Button>
        <Button variant="outline" onClick={exportExcel}><FileSpreadsheet className="h-4 w-4" /> Excel</Button>
      </CardContent>
    </Card>
  )
}

export function WebImportDialog({ onImport }: ImportExportProps) {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleImport = async () => {
    if (!url) return
    setLoading(true)
    setError("")
    try {
      const response = await fetch(url)
      const text = await response.text()
      const parsed = Papa.parse(text, { header: true }).data as TravelPackage[]
      onImport(parsed)
    } catch { setError("No se pudo importar desde la URL") }
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Globe className="h-4 w-4" /> Importar desde Web</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <Input placeholder="https://ejemplo.com/paquetes.csv" value={url} onChange={e => setUrl(e.target.value)} />
        <Button onClick={handleImport} disabled={loading}>{loading ? "Importando..." : "Importar"}</Button>
        {error && <p className="text-xs text-destructive">{error}</p>}
      </CardContent>
    </Card>
  )
}
