import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { TravelPackage } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAvailableSpots(pkg: TravelPackage): number {
  return pkg.availableSpots
}

export function isFullyBooked(pkg: TravelPackage): boolean {
  return pkg.availableSpots <= 0
}

export function getOccupancyRate(pkg: TravelPackage): number {
  if (pkg.maxCapacity <= 0) return 0
  return ((pkg.maxCapacity - pkg.availableSpots) / pkg.maxCapacity) * 100
}

export function formatPrice(price: number, currency: string = "$"): string {
  return `${currency}${price.toLocaleString("es-AR")}`
}

export function calculateTotalPrice(unitPrice: number, travelers: number, taxRate: number, discount: number = 0): { subtotal: number; discount: number; taxes: number; total: number } {
  const subtotal = unitPrice * travelers
  const discountAmount = subtotal * discount
  const afterDiscount = subtotal - discountAmount
  const taxes = Math.round(afterDiscount * taxRate)
  const total = afterDiscount + taxes
  return { subtotal, discount: discountAmount, taxes, total }
}
