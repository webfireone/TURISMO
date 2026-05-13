import { type ComponentType } from "react"
import { Sparkles } from "lucide-react"

export function PageHero({ title, subtitle, icon: Icon }: { title: string; subtitle: string; icon: ComponentType<{ className?: string }> }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <h1 className="font-display text-2xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  )
}

export function Decorative3D() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-highlight/5 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/3 blur-3xl" />
      <div className="absolute top-10 left-10 animate-float">
        <Sparkles className="h-6 w-6 text-primary/20" />
      </div>
      <div className="absolute bottom-10 right-10 animate-float" style={{ animationDelay: "2s" }}>
        <Sparkles className="h-8 w-8 text-highlight/20" />
      </div>
    </div>
  )
}
