import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { PackageCard } from "@/components/packages/PackageCard"

import type { TravelPackage } from "@/types"

const CATEGORIES = ["Todos", "Playa", "Aventura", "Cultural", "Romántico", "Familiar", "Lujo", "Ecoturismo"]

export function CatalogView({ packages }: { packages: TravelPackage[] }) {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedDestination, setSelectedDestination] = useState("Todos")
  const [sortBy, setSortBy] = useState("default")

  const destinations = [...new Set(packages.map(p => p.destination))].sort()
  const active = packages.filter(p => p.status === "active")

  const filtered = active.filter(p => {
    const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) || p.country.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === "Todos" || p.tags.some(t => t.toLowerCase().includes(selectedCategory.toLowerCase()))
    const matchesDest = selectedDestination === "Todos" || p.destination === selectedDestination
    return matchesSearch && matchesCategory && matchesDest
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price
    if (sortBy === "price-desc") return b.price - a.price
    if (sortBy === "name") return a.name.localeCompare(b.name)
    if (sortBy === "destination") return a.destination.localeCompare(b.destination)
    if (sortBy === "default") {
      if (a.featured === b.featured) return a.price - b.price
      return a.featured ? -1 : 1
    }
    return 0
  })

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <Input placeholder="Buscar destinos..." value={search} onChange={e => setSearch(e.target.value)} className="flex-1" />
        <Select options={[{ value: "Todos", label: "Todos los destinos" }, ...destinations.map(d => ({ value: d, label: d }))]}
          value={selectedDestination} onChange={e => setSelectedDestination(e.target.value)} className="w-44" />
        <Select options={[
          { value: "default", label: "Destacados" }, { value: "price-asc", label: "Menor precio" },
          { value: "price-desc", label: "Mayor precio" }, { value: "name", label: "Nombre" },
          { value: "destination", label: "Destino" },
        ]} value={sortBy} onChange={e => setSortBy(e.target.value)} className="w-40" />
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-2">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-medium whitespace-nowrap transition-all duration-200 ${
              selectedCategory === cat ? "gradient-primary text-white shadow-sm" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-sm:auto-rows-auto">
        {sorted.map((pkg) => (
          <div key={pkg.id}>
            <PackageCard pkg={pkg} />
          </div>
        ))}
      </div>

      {sorted.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No se encontraron paquetes turísticos</p>
        </div>
      )}
    </div>
  )
}
