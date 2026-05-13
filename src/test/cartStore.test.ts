import { describe, it, expect, beforeEach } from "vitest"
import { useCartStore } from "@/store/cartStore"
import type { TravelPackage } from "@/types"

const mockPackage: TravelPackage = {
  id: "test-1",
  name: "Test Package",
  destination: "Caribe",
  country: "República Dominicana",
  duration: "7 días",
  accommodation: "Premium",
  price: 450000,
  previousPrice: 520000,
  description: "Test description",
  includes: [],
  excludes: [],
  itinerary: [],
  imageUrl: "",
  images: [],
  maxCapacity: 30,
  availableSpots: 15,
  tags: [],
  featured: false,
  status: "active",
  createdAt: "2026-01-01",
  updatedAt: "2026-05-01",
}

describe("cartStore", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], totalItems: 0 })
  })

  it("starts empty", () => {
    const { items, totalItems } = useCartStore.getState()
    expect(items).toEqual([])
    expect(totalItems).toBe(0)
  })

  it("adds items to cart", () => {
    useCartStore.getState().addItem(mockPackage, 2, "2026-06-01")
    const { items, totalItems } = useCartStore.getState()
    expect(items).toHaveLength(1)
    expect(items[0].travelers).toBe(2)
    expect(totalItems).toBe(2)
  })

  it("removes items from cart", () => {
    useCartStore.getState().addItem(mockPackage, 2, "2026-06-01")
    useCartStore.getState().removeItem("test-1")
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(0)
  })

  it("clears cart", () => {
    useCartStore.getState().addItem(mockPackage, 2, "2026-06-01")
    useCartStore.getState().clearCart()
    const { items, totalItems } = useCartStore.getState()
    expect(items).toHaveLength(0)
    expect(totalItems).toBe(0)
  })
})
