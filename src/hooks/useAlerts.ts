import { useMemo, useState } from "react"
import type { TravelPackage, Alert, AlertRule } from "@/types"
import { HOLIDAYS } from "@/lib/constants"
import { getBookingAlerts } from "@/lib/bookingAlerts"

export function useAlerts(packages: TravelPackage[]) {
  const [rules, setRules] = useState<AlertRule[]>([
    { id: "r1", type: "low_availability", threshold: 5, enabled: true },
    { id: "r2", type: "price_variation", threshold: 15, enabled: true },
  ])

  const alerts = useMemo(() => {
    const result: Alert[] = []

    const lowAvailRule = rules.find(r => r.type === "low_availability")
    if (lowAvailRule?.enabled) {
      packages.forEach(p => {
        if (p.availableSpots < lowAvailRule.threshold) {
          result.push({
            id: `la-${p.id}`,
            type: "low_availability",
            severity: p.availableSpots === 0 ? "high" : "medium",
            message: `Cupos bajos en "${p.name}": ${p.availableSpots} disponibles`,
            date: new Date().toISOString().split("T")[0],
            packageId: p.id,
            read: false,
          })
        }
      })
    }

    const today = new Date()
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    HOLIDAYS.forEach(h => {
      const hDate = new Date(h.date)
      if (hDate >= today && hDate <= nextWeek) {
        result.push({
          id: `hol-${h.date}`, type: "event", severity: "low",
          message: `Festivo próximo: ${h.name} (${h.date})`, date: h.date, read: false,
        })
      }
    })

    result.push(...getBookingAlerts())
    return result
  }, [packages, rules])

  return { alerts, rules, setRules }
}
