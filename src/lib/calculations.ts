import type { TravelPackage, GlobalParams, ScenarioConfig, KpiData } from "@/types"

export function calculateFinalPrice(
  basePrice: number,
  _params: GlobalParams,
  scenario: ScenarioConfig
): number {
  return Math.round(basePrice * scenario.priceMultiplier)
}

export function calculateKpis(
  packages: TravelPackage[],
  _params: GlobalParams,
  _scenario: ScenarioConfig
): KpiData {
  const activePackages = packages.filter(p => p.status === "active")

  const totalCapacity = activePackages.reduce((acc, p) => acc + p.maxCapacity, 0)
  const totalSold = activePackages.reduce((acc, p) => acc + (p.maxCapacity - p.availableSpots), 0)
  const totalRevenue = activePackages.reduce((acc, p) => {
    const sold = p.maxCapacity - p.availableSpots
    return acc + sold * p.price
  }, 0)

  const avgBookingValue = totalSold > 0 ? totalRevenue / totalSold : 0
  const occupancyRate = totalCapacity > 0 ? (totalSold / totalCapacity) * 100 : 0

  const destRevenue = new Map<string, number>()
  activePackages.forEach(p => {
    const sold = p.maxCapacity - p.availableSpots
    const revenue = sold * p.price
    destRevenue.set(p.destination, (destRevenue.get(p.destination) || 0) + revenue)
  })
  const topDestinations = Array.from(destRevenue.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, revenue]) => ({ name, revenue }))

  return {
    monthlyRevenue: totalRevenue,
    annualRevenue: totalRevenue * 12,
    totalBookings: totalSold,
    averageBookingValue: Math.round(avgBookingValue),
    occupancyRate: Math.round(occupancyRate * 100) / 100,
    topDestinations,
  }
}

export function calculateOccupancyByDestination(packages: TravelPackage[]): Record<string, number> {
  const result: Record<string, number> = {}
  const destinations = [...new Set(packages.map(p => p.destination))]
  destinations.forEach(dest => {
    const destPackages = packages.filter(p => p.destination === dest)
    const totalCap = destPackages.reduce((acc, p) => acc + p.maxCapacity, 0)
    const totalSold = destPackages.reduce((acc, p) => acc + (p.maxCapacity - p.availableSpots), 0)
    result[dest] = totalCap > 0 ? (totalSold / totalCap) * 100 : 0
  })
  return result
}
