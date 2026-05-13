import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { TravelPackage } from "@/types"

export interface BookingCartItem {
  packageId: string
  packageName: string
  destination: string
  accommodation: string
  duration: string
  travelers: number
  price: number
  imageUrl: string
  startDate: string
}

interface CartStore {
  items: BookingCartItem[]
  addItem: (pkg: TravelPackage, travelers: number, startDate: string) => void
  removeItem: (packageId: string) => void
  updateTravelers: (packageId: string, delta: number) => void
  clearCart: () => void
  totalItems: number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (pkg, travelers, startDate) => {
        const maxTravelers = pkg.availableSpots
        if (maxTravelers <= 0) return

        set(state => {
          const existing = state.items.find(i => i.packageId === pkg.id)
          const currentTravelers = existing ? existing.travelers : 0
          const maxAdd = Math.max(0, maxTravelers - currentTravelers)
          const actualTravelers = Math.min(travelers, maxAdd)
          if (actualTravelers <= 0) return state

          let newItems
          if (existing) {
            newItems = state.items.map(i =>
              i.packageId === pkg.id
                ? { ...i, travelers: i.travelers + actualTravelers }
                : i
            )
          } else {
            newItems = [...state.items, {
              packageId: pkg.id,
              packageName: pkg.name,
              destination: pkg.destination,
              accommodation: pkg.accommodation,
              duration: pkg.duration,
              travelers: actualTravelers,
              price: pkg.price,
              imageUrl: pkg.imageUrl,
              startDate,
            }]
          }
          return {
            items: newItems,
            totalItems: newItems.reduce((sum, i) => sum + i.travelers, 0),
          }
        })
      },

      removeItem: (packageId) => {
        set(state => {
          const newItems = state.items.filter(i => i.packageId !== packageId)
          return {
            items: newItems,
            totalItems: newItems.reduce((sum, i) => sum + i.travelers, 0),
          }
        })
      },

      updateTravelers: (packageId, delta) => {
        set(state => {
          const newItems = state.items.map(i => {
            if (i.packageId === packageId) {
              return { ...i, travelers: Math.max(1, i.travelers + delta) }
            }
            return i
          })
          return {
            items: newItems,
            totalItems: newItems.reduce((sum, i) => sum + i.travelers, 0),
          }
        })
      },

      clearCart: () => set({ items: [], totalItems: 0 }),
      totalItems: 0,
    }),
    { name: "turismo-cart" }
  )
)
