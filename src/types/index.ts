export const DURATIONS = ["3 días", "5 días", "7 días", "10 días", "14 días", "21 días"] as const
export type Duration = typeof DURATIONS[number]

export const DESTINATIONS = [
  "Caribe",
  "Europa",
  "Sudamérica",
  "Norteamérica",
  "Asia",
  "África",
  "Oceanía",
  "Nacional",
] as const
export type Destination = typeof DESTINATIONS[number]

export const ACCOMMODATIONS = ["Económico", "Estándar", "Premium", "Lujo"] as const
export type Accommodation = typeof ACCOMMODATIONS[number]

export type Role = "admin" | "viewer"

export interface User {
  uid: string
  email: string
  name: string
  role: Role
}

export interface TravelPackage {
  id: string
  name: string
  destination: string
  country: string
  duration: string
  accommodation: Accommodation
  price: number
  previousPrice: number
  description: string
  includes: string[]
  excludes: string[]
  itinerary: ItineraryDay[]
  imageUrl: string
  images: string[]
  maxCapacity: number
  availableSpots: number
  tags: string[]
  featured: boolean
  status: "active" | "draft" | "archived"
  createdAt: string
  updatedAt: string
}

export interface ItineraryDay {
  day: number
  title: string
  description: string
  activities: string[]
  meals: string[]
  accommodation: string
}

export interface BookingItem {
  packageId: string
  packageName: string
  destination: string
  accommodation: Accommodation
  duration: string
  travelers: number
  unitPrice: number
  imageUrl: string
  startDate: string
}

export interface Booking {
  id: string
  customerName: string
  customerPhone: string
  customerEmail: string
  items: BookingItem[]
  subtotal: number
  discount: number
  taxes: number
  total: number
  paymentMethod: string
  paymentRate: number
  status: "pending" | "confirmed" | "cancelled" | "completed"
  notes: string
  createdAt: string
}

export interface PaymentMethod {
  name: string
  rate: number
}

export interface GlobalParams {
  booking: {
    baseCharge: number
    paymentMethods: PaymentMethod[]
    earlyBirdDiscount: number
    groupDiscounts: { minTravelers: number; discount: number }[]
  }
  general: {
    taxRate: number
    currencySymbol: string
    currencyCode: string
    contactEmail: string
    contactPhone: string
    contactWhatsApp: string
  }
  announcement: {
    enabled: boolean
    text: string
  }
}

export type Scenario = "base" | "optimistic" | "pessimistic"

export interface ScenarioConfig {
  label: string
  demandMultiplier: number
  priceMultiplier: number
}

export interface KpiData {
  monthlyRevenue: number
  annualRevenue: number
  totalBookings: number
  averageBookingValue: number
  occupancyRate: number
  topDestinations: { name: string; revenue: number }[]
}

export interface Alert {
  id: string
  type: "low_availability" | "price_variation" | "booking_anomaly" | "event"
  severity: "low" | "medium" | "high"
  message: string
  date: string
  packageId?: string
  read: boolean
}

export interface AlertRule {
  id: string
  type: Alert["type"]
  threshold: number
  enabled: boolean
}

export interface ImportResult {
  success: boolean
  imported: number
  errors: string[]
}

export const CATEGORIES = [
  "Playa",
  "Aventura",
  "Cultural",
  "Romántico",
  "Familiar",
  "Lujo",
  "Ecoturismo",
  "City Break",
] as const

export const PACKAGE_STATUS = ["active", "draft", "archived"] as const

export interface Promotion {
  id: string
  title: string
  description: string
  discountPercent: number
  promoCode: string
  startDate: string
  endDate: string
  bannerImage: string
  active: boolean
  createdAt: string
}

export interface Subscriber {
  id: string
  email: string
  subscribedAt: string
  source: string
  active: boolean
}

export interface Testimonial {
  id: string
  name: string
  location: string
  text: string
  rating: number
  avatar?: string
}
