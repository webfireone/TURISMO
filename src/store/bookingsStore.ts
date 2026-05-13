import type { Booking } from "@/types"

const STORAGE_KEY = "turismo-bookings"

function loadBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch { return [] }
}

function saveBookings(bookings: Booking[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
  } catch (e) { console.warn("Error guardando reservas:", e) }
}

let bookingsCache: Booking[] = loadBookings()
const listeners = new Set<() => void>()

function notify() { listeners.forEach(fn => fn()) }

export function getBookings(): Booking[] { return bookingsCache }

export function addBooking(booking: Booking) {
  bookingsCache = [booking, ...bookingsCache]
  saveBookings(bookingsCache)
  notify()
}

export function subscribe(fn: () => void) {
  listeners.add(fn)
  return () => { listeners.delete(fn) }
}
