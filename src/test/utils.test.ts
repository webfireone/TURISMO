import { describe, it, expect } from "vitest"
import { cn, formatPrice, getOccupancyRate, calculateTotalPrice } from "@/lib/utils"
import type { TravelPackage } from "@/types"

const mockPkg: TravelPackage = {
  id: "t1",
  name: "Test",
  destination: "Caribe",
  country: "República Dominicana",
  duration: "7 días",
  accommodation: "Premium",
  price: 100000,
  previousPrice: 120000,
  description: "",
  includes: [],
  excludes: [],
  itinerary: [],
  imageUrl: "",
  images: [],
  maxCapacity: 20,
  availableSpots: 5,
  tags: [],
  featured: false,
  status: "active",
  createdAt: "2026-01-01",
  updatedAt: "2026-05-01",
}

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar")
    expect(cn("foo", false && "bar")).toBe("foo")
  })
})

describe("formatPrice", () => {
  it("formats with currency symbol", () => {
    expect(formatPrice(1000)).toBe("$1.000")
    expect(formatPrice(1000, "U$S")).toBe("U$S1.000")
  })
})

describe("getOccupancyRate", () => {
  it("calculates percentage", () => {
    expect(getOccupancyRate(mockPkg)).toBe(75)
  })
})

describe("calculateTotalPrice", () => {
  it("applies discount and tax", () => {
    const result = calculateTotalPrice(100000, 2, 0.21, 0.1)
    expect(result.subtotal).toBe(200000)
    expect(result.discount).toBe(20000)
    expect(result.taxes).toBe(37800)
    expect(result.total).toBe(217800)
  })
})
