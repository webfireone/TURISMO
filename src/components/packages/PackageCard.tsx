import { cn } from "@/lib/utils"
import { MapPin, Users } from "lucide-react"
import type { TravelPackage } from "@/types"
import { useNavigate } from "react-router-dom"

interface PackageCardProps {
  pkg: TravelPackage
  viewMode?: "grid" | "list"
}

export function PackageCard({ pkg, viewMode = "grid" }: PackageCardProps) {
  const navigate = useNavigate()
  const isFullyBooked = pkg.availableSpots <= 0

  return (
    <div
      onClick={() => navigate(`/catalog/${pkg.id}`)}
      className={cn(
        "group cursor-pointer rounded-2xl overflow-hidden border border-primary/10 bg-card hover:border-primary/20 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10",
        viewMode === "grid" ? "flex flex-col" : "flex flex-row"
      )}
    >
      <div className={cn("relative overflow-hidden", viewMode === "grid" ? "h-52" : "w-48 h-40 shrink-0")}>
        <img
          src={pkg.imageUrl}
          alt={pkg.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {pkg.featured && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 rounded-lg bg-amber-500/90 text-[9px] font-bold text-white shadow-lg tracking-wider uppercase">
              Destacado
            </span>
          </div>
        )}
        {isFullyBooked && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
            <span className="px-4 py-2 rounded-xl bg-destructive text-white text-xs font-bold tracking-wider uppercase">Sin cupos</span>
          </div>
        )}
        <div className="absolute bottom-3 right-3">
          <span className="px-2 py-1 rounded-lg bg-black/40 backdrop-blur-sm text-white text-[9px] font-medium tracking-wide">
            {pkg.duration}
          </span>
        </div>
      </div>

      <div className={cn("flex-1 p-4 flex flex-col", viewMode === "list" ? "justify-between" : "")}>
        <div>
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mb-1">
            <MapPin className="h-3 w-3" />
            <span>{pkg.destination}</span>
            <span className="opacity-30">·</span>
            <span>{pkg.country}</span>
          </div>
          <h3 className="font-display font-semibold text-sm leading-tight mb-1 group-hover:text-primary transition-colors">{pkg.name}</h3>
          <p className="text-[11px] text-muted-foreground line-clamp-2 mb-2">{pkg.description}</p>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {pkg.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded-md bg-muted text-[9px] text-muted-foreground font-medium">{tag}</span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-primary/5">
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-primary">{pkg.price.toLocaleString("es-AR")} ARS</span>
              {pkg.previousPrice > pkg.price && (
                <span className="text-[10px] text-muted-foreground line-through">{pkg.previousPrice.toLocaleString("es-AR")} ARS</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Users className="h-3 w-3" />
            <span>{pkg.availableSpots} disp.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function PackageCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-primary/5 bg-card animate-pulse">
      <div className="h-52 bg-muted" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-muted rounded w-1/3" />
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-full" />
        <div className="flex gap-2">
          <div className="h-5 bg-muted rounded w-16" />
          <div className="h-5 bg-muted rounded w-16" />
        </div>
        <div className="flex justify-between pt-2 border-t border-primary/5">
          <div className="h-5 bg-muted rounded w-20" />
          <div className="h-4 bg-muted rounded w-12" />
        </div>
      </div>
    </div>
  )
}
