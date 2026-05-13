import { describe, it, expect } from "vitest"
import { calculateOccupancyByDestination, calculateKpis } from "@/lib/calculations"
import { MOCK_PACKAGES } from "@/lib/constants"
import { DEFAULT_PARAMS } from "@/lib/constants"
import { SCENARIOS } from "@/lib/constants"

describe("calculateKpis", () => {
  it("returns correct KPIs from active packages", () => {
    const kpis = calculateKpis(MOCK_PACKAGES, DEFAULT_PARAMS, SCENARIOS.base)

    expect(kpis.totalBookings).toBeGreaterThan(0)
    expect(kpis.monthlyRevenue).toBeGreaterThan(0)
    expect(kpis.occupancyRate).toBeGreaterThan(0)
    expect(kpis.topDestinations.length).toBeGreaterThan(0)
  })
})

describe("calculateOccupancyByDestination", () => {
  it("groups packages by destination", () => {
    const active = MOCK_PACKAGES.filter(p => p.status === "active")
    const result = calculateOccupancyByDestination(active)

    expect(Object.keys(result).length).toBeGreaterThan(0)
    Object.values(result).forEach(rate => {
      expect(rate).toBeGreaterThanOrEqual(0)
      expect(rate).toBeLessThanOrEqual(100)
    })
  })
})
