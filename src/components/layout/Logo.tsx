export function Logo({ showText = true }: { showText?: boolean }) {
  return (
    <div className="flex items-center gap-4 cursor-pointer select-none group">
      <div className="relative w-40 h-40 shrink-0 max-md:w-32 max-md:h-32 max-sm:w-20 max-sm:h-20">
        <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-primary/40 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
        <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden shadow-2xl shadow-primary/25 ring-2 ring-primary/30 group-hover:ring-primary/60 transition-all duration-500"
          style={{
            maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 85%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 85%)",
          }}>
          <img src="/logo.jpeg" alt="SI VIAJES" className="w-full h-full object-contain scale-105 group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-background/60 pointer-events-none" />
        </div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className="font-display text-2xl max-sm:text-lg font-bold tracking-tight text-foreground bg-gradient-to-r from-foreground via-foreground to-primary/70 bg-clip-text text-transparent">SI VIAJES</span>
          <span className="text-[11px] max-sm:text-[9px] text-muted-foreground tracking-[0.2em] uppercase">Agencia de Viajes</span>
        </div>
      )}
    </div>
  )
}
