export function Logo() {
  return <div className="flex items-center gap-3 cursor-pointer select-none">
    <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/25">
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-white">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
    <div className="flex flex-col">
      <span className="font-display text-lg font-bold tracking-tight text-foreground">Turismo</span>
      <span className="text-[9px] text-muted-foreground tracking-[0.2em] uppercase">Agencia de Viajes</span>
    </div>
  </div>
}
