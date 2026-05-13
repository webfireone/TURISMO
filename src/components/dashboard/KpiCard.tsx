import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"

interface KpiCardProps {
  title: string
  value: string
  subtitle?: string
  icon?: React.ComponentType<{ className?: string }>
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  className?: string
}

export function KpiCard({ title, value, subtitle, icon: Icon, trend, trendValue, className }: KpiCardProps) {
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground tracking-wider uppercase">{title}</p>
          {Icon && (
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon className="h-4 w-4 text-primary" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-display font-bold tracking-tight">{value}</div>
        {subtitle && (
          <div className="flex items-center gap-2 mt-1">
            <p className="text-xs text-muted-foreground">{subtitle}</p>
            {trend && trendValue && (
              <span className={cn("flex items-center gap-0.5 text-xs font-medium",
                trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground"
              )}>
                {trend === "up" ? <TrendingUp className="h-3 w-3" /> : trend === "down" ? <TrendingDown className="h-3 w-3" /> : null}
                {trendValue}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
