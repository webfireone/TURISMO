import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { db } from "@/lib/firebase"
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore"
import type { TravelPackage, GlobalParams, Booking } from "@/types"
import { MOCK_PACKAGES, DEFAULT_PARAMS } from "@/lib/constants"
import { addBooking } from "@/store/bookingsStore"

const USE_MOCK = !import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY === "demo-api-key"

async function fetchCollection<T>(path: string, fallback: T[]): Promise<T[]> {
  if (USE_MOCK) return fallback
  try {
    const snapshot = await getDocs(collection(db, path))
    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() })) as T[]
  } catch { return fallback }
}

export function usePackages() {
  return useQuery({
    queryKey: ["packages"],
    queryFn: () => fetchCollection<TravelPackage>("packages", MOCK_PACKAGES),
    staleTime: 5 * 60 * 1000,
  })
}

export function usePackage(id: string | undefined) {
  const { data: packages = [] } = usePackages()
  return packages.find(p => p.id === id)
}

export function useSavePackage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (pkg: TravelPackage) => {
      if (USE_MOCK) return pkg
      await setDoc(doc(db, "packages", pkg.id), pkg)
      return pkg
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["packages"] }) },
  })
}

export function useDeletePackage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      if (USE_MOCK) return id
      await deleteDoc(doc(db, "packages", id))
      return id
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["packages"] }) },
  })
}

export function useCreateBooking() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (booking: Booking) => {
      addBooking(booking)
      try {
        if (USE_MOCK) { await new Promise(r => setTimeout(r, 800)); return booking }
        await setDoc(doc(db, "bookings", booking.id), booking)
        return booking
      } catch (err) {
        console.warn("Firestore no disponible, guardando localmente:", err)
        await new Promise(r => setTimeout(r, 800))
        return booking
      }
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["bookings"] }) },
  })
}

export function useGlobalParams() {
  return useQuery({
    queryKey: ["globalParams"],
    queryFn: () => fetchCollection<GlobalParams>("config", [DEFAULT_PARAMS]).then(r => r[0] || DEFAULT_PARAMS),
    staleTime: 10 * 60 * 1000,
  })
}
