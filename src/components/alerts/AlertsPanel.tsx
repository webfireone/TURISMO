import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { AlertTriangle, Info, AlertCircle } from "lucide-react"
import type { Alert, AlertRule } from "@/types"
import { cn } from "@/lib/utils"

interface AlertsPanelProps {
  alerts: Alert[]
  rules: AlertRule[]
  onUpdateRules: (rules: AlertRule[]) => void
}

const severityConfig = {
  high: { icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/5 border-destructive/20" },
  medium: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/5 border-warning/20" },
  low: { icon: Info, color: "text-primary", bg: "bg-primary/5 border-primary/20" },
}

export function AlertsPanel({ alerts, rules, onUpdateRules }: AlertsPanelProps) {
  const toggleRule = (ruleId: string) => {
    onUpdateRules(rules.map(r => r.id === ruleId ? { ...r, enabled: !r.enabled } : r))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle className="text-sm">Reglas de alerta</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {rules.map(rule => (
            <div key={rule.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
              <div>
                <p className="text-sm font-medium">{rule.type === "low_availability" ? "Cupos bajos" : "Variación de precio"}</p>
                <p className="text-xs text-muted-foreground">Umbral: {rule.threshold}</p>
              </div>
              <Switch checked={rule.enabled} onChange={() => toggleRule(rule.id)} />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="space-y-2">
        {alerts.length === 0 && (
          <div className="text-center text-sm text-muted-foreground py-8">No hay alertas activas</div>
        )}
        {alerts.map(alert => {
          const config = severityConfig[alert.severity]
          const Icon = config.icon
          return (
            <div key={alert.id} className={cn("flex items-start gap-3 p-4 rounded-xl border", config.bg, !alert.read && "ring-1 ring-primary/20")}>
              <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", config.color)} />
              <div className="flex-1 min-w-0">
                <p className="text-sm">{alert.message}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-muted-foreground">{alert.date}</span>
                  <Badge variant={alert.severity === "high" ? "destructive" : alert.severity === "medium" ? "warning" : "secondary"}>
                    {alert.severity}
                  </Badge>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
