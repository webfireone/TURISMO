import { lazy, Suspense, useEffect } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AuthProvider } from "@/context/AuthContext"
import { AppLayout } from "@/components/layout/AppLayout"
import { useParamsStore } from "@/store/paramsStore"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
  },
})

const LandingPage = lazy(() => import("@/pages/LandingPage").then(m => ({ default: m.LandingPage })))
const LoginPage = lazy(() => import("@/pages/LoginPage").then(m => ({ default: m.LoginPage })))
const CatalogPage = lazy(() => import("@/pages/CatalogPage").then(m => ({ default: m.CatalogPage })))
const PackageDetailPage = lazy(() => import("@/pages/PackageDetailPage").then(m => ({ default: m.PackageDetailPage })))
const CartPage = lazy(() => import("@/pages/CartPage").then(m => ({ default: m.CartPage })))
const DestinationsPage = lazy(() => import("@/pages/DestinationsPage").then(m => ({ default: m.DestinationsPage })))
const ItinerariesPage = lazy(() => import("@/pages/ItinerariesPage").then(m => ({ default: m.ItinerariesPage })))
const ContactPage = lazy(() => import("@/pages/ContactPage").then(m => ({ default: m.ContactPage })))
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage").then(m => ({ default: m.NotFoundPage })))
const AdminHomePage = lazy(() => import("@/pages/AdminHomePage").then(m => ({ default: m.AdminHomePage })))
const DashboardPage = lazy(() => import("@/pages/DashboardPage").then(m => ({ default: m.DashboardPage })))
const PackagesPage = lazy(() => import("@/pages/PackagesPage").then(m => ({ default: m.PackagesPage })))
const BookingsPage = lazy(() => import("@/pages/BookingsPage").then(m => ({ default: m.BookingsPage })))
const AlertsPage = lazy(() => import("@/pages/AlertsPage").then(m => ({ default: m.AlertsPage })))
const ImportExportPage = lazy(() => import("@/pages/ImportExportPage").then(m => ({ default: m.ImportExportPage })))
const MarketingPage = lazy(() => import("@/pages/MarketingPage").then(m => ({ default: m.MarketingPage })))
const ConfigPage = lazy(() => import("@/pages/ConfigPage").then(m => ({ default: m.ConfigPage })))

function PageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function FirestoreSync() {
  const { initFirestoreSync } = useParamsStore()
  useEffect(() => { const unsub = initFirestoreSync(); return () => unsub?.() }, [initFirestoreSync])
  return null
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <FirestoreSync />
          <ScrollToTop />
          <Suspense fallback={<PageLoading />}>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<LandingPage />} />
                <Route path="catalog" element={<CatalogPage />} />
                <Route path="package/:id" element={<PackageDetailPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="destinations" element={<DestinationsPage />} />
                <Route path="itineraries" element={<ItinerariesPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="admin" element={<AdminHomePage />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="packages" element={<PackagesPage />} />
                <Route path="bookings" element={<BookingsPage />} />
                <Route path="alerts" element={<AlertsPage />} />
                <Route path="import-export" element={<ImportExportPage />} />
                <Route path="marketing" element={<MarketingPage />} />
                <Route path="config" element={<ConfigPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
