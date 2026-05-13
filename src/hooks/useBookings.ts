import { useQuery } from "@tanstack/react-query"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import { getBookings, subscribe } from "@/store/bookingsStore"
import { useState, useEffect } from "react"
import type { Booking } from "@/types"

const USE_MOCK = !import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY === "demo-api-key"

export { addBooking } from "@/store/bookingsStore"

async function fetchBookings(): Promise<Booking[]> {
  if (USE_MOCK) return getBookings()
  try {
    const snapshot = await getDocs(collection(db, "bookings"))
    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() })) as Booking[]
  } catch { return getBookings() }
}

export function useBookings() {
  const [localBookings, setLocalBookings] = useState<Booking[]>(getBookings)
  useEffect(() => {
    if (!USE_MOCK) return
    const unsub = subscribe(() => setLocalBookings([...getBookings()]))
    return unsub
  }, [])
  return useQuery({
    queryKey: ["bookings"],
    queryFn: fetchBookings,
    staleTime: USE_MOCK ? Infinity : 10 * 1000,
    initialData: USE_MOCK ? localBookings : undefined,
  })
}
