import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useState } from "react"
import type { TravelPackage } from "@/types"
import { Plus, X } from "lucide-react"

interface PackageFormProps {
  pkg?: TravelPackage
  onSave: (pkg: TravelPackage) => void
  onCancel: () => void
}

function genId() { return crypto.randomUUID?.() ?? Date.now().toString(36) + Math.random().toString(36).slice(2) }

export function PackageForm({ pkg, onSave, onCancel }: PackageFormProps) {
  const [form, setForm] = useState({
    name: pkg?.name || "",
    destination: pkg?.destination || "Nacional",
    country: pkg?.country || "",
    duration: pkg?.duration || "7 días",
    accommodation: pkg?.accommodation || "Estándar",
    price: pkg?.price || 0,
    previousPrice: pkg?.previousPrice || 0,
    description: pkg?.description || "",
    includes: pkg?.includes || [""],
    excludes: pkg?.excludes || [""],
    itinerary: pkg?.itinerary || [{ day: 1, title: "", description: "", activities: [""], meals: [""], accommodation: "" }],
    maxCapacity: pkg?.maxCapacity || 20,
    availableSpots: pkg?.availableSpots || 20,
    imageUrl: pkg?.imageUrl || "https://placehold.co/600x800/0ea5e9/ffffff?text=Destino",
    tags: pkg?.tags || [""],
    featured: pkg?.featured || false,
    status: pkg?.status || "active",
  })

  const updateField = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      id: pkg?.id || genId(),
      ...form,
      includes: form.includes.filter(i => i.trim()),
      excludes: form.excludes.filter(e => e.trim()),
      tags: form.tags.filter(t => t.trim()),
      itinerary: form.itinerary.map(day => ({
        ...day,
        activities: day.activities.filter(a => a.trim()),
        meals: day.meals.filter(m => m.trim()),
      })),
      createdAt: pkg?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      images: pkg?.images || [],
    } as TravelPackage)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">Nombre del paquete</label>
          <Input value={form.name} onChange={e => updateField("name", e.target.value)} required />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">País</label>
          <Input value={form.country} onChange={e => updateField("country", e.target.value)} required />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">Destino</label>
          <Select options={[
            { value: "Caribe", label: "Caribe" }, { value: "Europa", label: "Europa" },
            { value: "Sudamérica", label: "Sudamérica" }, { value: "Norteamérica", label: "Norteamérica" },
            { value: "Asia", label: "Asia" }, { value: "África", label: "África" },
            { value: "Oceanía", label: "Oceanía" }, { value: "Nacional", label: "Nacional" },
          ]} value={form.destination} onChange={e => updateField("destination", e.target.value)} />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">Duración</label>
          <Select options={[
            { value: "3 días", label: "3 días" }, { value: "5 días", label: "5 días" },
            { value: "7 días", label: "7 días" }, { value: "10 días", label: "10 días" },
            { value: "14 días", label: "14 días" }, { value: "21 días", label: "21 días" },
          ]} value={form.duration} onChange={e => updateField("duration", e.target.value)} />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">Alojamiento</label>
          <Select options={[
            { value: "Económico", label: "Económico" }, { value: "Estándar", label: "Estándar" },
            { value: "Premium", label: "Premium" }, { value: "Lujo", label: "Lujo" },
          ]} value={form.accommodation} onChange={e => updateField("accommodation", e.target.value as any)} />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">Estado</label>
          <Select options={[
            { value: "active", label: "Activo" }, { value: "draft", label: "Borrador" },
            { value: "archived", label: "Archivado" },
          ]} value={form.status} onChange={e => updateField("status", e.target.value as "active" | "draft" | "archived")} />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">Precio (ARS)</label>
          <Input type="number" value={form.price} onChange={e => updateField("price", Number(e.target.value))} required />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">Precio anterior (ARS)</label>
          <Input type="number" value={form.previousPrice} onChange={e => updateField("previousPrice", Number(e.target.value))} />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">Capacidad máxima</label>
          <Input type="number" value={form.maxCapacity} onChange={e => updateField("maxCapacity", Number(e.target.value))} required />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">Cupos disponibles</label>
          <Input type="number" value={form.availableSpots} onChange={e => updateField("availableSpots", Number(e.target.value))} required />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">Descripción</label>
        <textarea value={form.description} onChange={e => updateField("description", e.target.value)}
          className="flex min-h-[80px] w-full rounded-xl border border-input bg-card px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 transition-all"
          required />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">URL de imagen</label>
        <Input value={form.imageUrl} onChange={e => updateField("imageUrl", e.target.value)} />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">Tags</label>
        <div className="flex flex-wrap gap-2">
          {form.tags.map((tag, i) => (
            <div key={i} className="flex items-center gap-1">
              <Input value={tag} onChange={e => {
                const newTags = [...form.tags]; newTags[i] = e.target.value; updateField("tags", newTags)
              }} className="w-24 h-8 text-xs" />
              <button type="button" onClick={() => updateField("tags", form.tags.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-destructive"><X className="h-3 w-3" /></button>
            </div>
          ))}
          <button type="button" onClick={() => updateField("tags", [...form.tags, ""])} className="flex items-center gap-1 text-xs text-primary"><Plus className="h-3 w-3" />Agregar</button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">Incluye</label>
        {form.includes.map((inc, i) => (
          <div key={i} className="flex items-center gap-2">
            <Input value={inc} onChange={e => {
              const newIncludes = [...form.includes]; newIncludes[i] = e.target.value; updateField("includes", newIncludes)
            }} className="flex-1" />
            <button type="button" onClick={() => updateField("includes", form.includes.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-destructive"><X className="h-4 w-4" /></button>
          </div>
        ))}
        <button type="button" onClick={() => updateField("includes", [...form.includes, ""])} className="flex items-center gap-1 text-xs text-primary"><Plus className="h-3 w-3" />Agregar</button>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">No incluye</label>
        {form.excludes.map((exc, i) => (
          <div key={i} className="flex items-center gap-2">
            <Input value={exc} onChange={e => {
              const newExcludes = [...form.excludes]; newExcludes[i] = e.target.value; updateField("excludes", newExcludes)
            }} className="flex-1" />
            <button type="button" onClick={() => updateField("excludes", form.excludes.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-destructive"><X className="h-4 w-4" /></button>
          </div>
        ))}
        <button type="button" onClick={() => updateField("excludes", [...form.excludes, ""])} className="flex items-center gap-1 text-xs text-primary"><Plus className="h-3 w-3" />Agregar</button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Itinerario</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {form.itinerary.map((day, i) => (
            <div key={i} className="p-4 rounded-xl bg-muted/30 border border-primary/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-primary">Día {day.day}</span>
                <button type="button" onClick={() => updateField("itinerary", form.itinerary.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-destructive"><X className="h-4 w-4" /></button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Título del día" value={day.title} onChange={e => {
                  const newIt = [...form.itinerary]; newIt[i] = { ...newIt[i], title: e.target.value }; updateField("itinerary", newIt)
                }} />
                <Input placeholder="Alojamiento" value={day.accommodation} onChange={e => {
                  const newIt = [...form.itinerary]; newIt[i] = { ...newIt[i], accommodation: e.target.value }; updateField("itinerary", newIt)
                }} />
              </div>
              <textarea placeholder="Descripción del día" value={day.description} onChange={e => {
                const newIt = [...form.itinerary]; newIt[i] = { ...newIt[i], description: e.target.value }; updateField("itinerary", newIt)
              }} className="flex min-h-[60px] w-full rounded-xl border border-input bg-card px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 transition-all" />
            </div>
          ))}
          <button type="button" onClick={() => updateField("itinerary", [...form.itinerary, { day: form.itinerary.length + 1, title: "", description: "", activities: [""], meals: [""], accommodation: "" }])}
            className="flex items-center gap-1 text-xs text-primary"><Plus className="h-3 w-3" />Agregar día</button>
        </CardContent>
      </Card>

      <div className="flex items-center gap-2">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.featured} onChange={e => updateField("featured", e.target.checked)} className="rounded border-primary/30" />
          Destacado
        </label>
      </div>

      <div className="flex gap-3">
        <Button type="submit">{pkg ? "Actualizar" : "Crear"} Paquete</Button>
        <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
      </div>
    </form>
  )
}
