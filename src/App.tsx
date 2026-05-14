import { lazy, Suspense, useEffect } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AuthProvider } from "@/context/AuthContext"
import { AppLayout } from "@/components/layout/AppLayout"
import { AnimatePresence, motion } from "framer-motion"
import { useParamsStore } from "@/store/paramsStore"
import { useSiteTheme } from "@/hooks/useSiteTheme"

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </motion.div>
  )
}

const PAGE_TITLES: Record<string, string> = {
  "/": "SI VIAJES — Agencia de Viajes",
  "/catalog": "Paquetes Turísticos — SI VIAJES",
  "/destinations": "Destinos — SI VIAJES",
  "/itineraries": "Itinerarios — SI VIAJES",
  "/cart": "Carrito de Reservas — SI VIAJES",
  "/contact": "Contacto — SI VIAJES",
  "/login": "Iniciar Sesión — SI VIAJES",
  "/admin": "Admin — SI VIAJES",
  "/dashboard": "Dashboard — SI VIAJES",
  "/packages": "Administrar Paquetes — SI VIAJES",
  "/bookings": "Reservas — SI VIAJES",
  "/alerts": "Alertas — SI VIAJES",
  "/import-export": "Importar/Exportar — SI VIAJES",
  "/marketing": "Marketing — SI VIAJES",
  "/config": "Configuración — SI VIAJES",
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    const title = pathname.startsWith("/package/")
      ? "Detalle del Paquete — SI VIAJES"
      : PAGE_TITLES[pathname] || "SI VIAJES — Agencia de Viajes"
    document.title = title
  }, [pathname])
  return null
}

function ThemeApplier() {
  const { themeFromFirestore } = useSiteTheme()
  useEffect(() => {
    if (!themeFromFirestore) return
    const { colors } = themeFromFirestore
    const root = document.documentElement
    Object.entries(colors).forEach(([key, value]) => {
      const cssVar = `--color-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`
      root.style.setProperty(cssVar, value)
    })
  }, [themeFromFirestore])
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
          <ThemeApplier />
          <ScrollToTop />
          <Suspense fallback={<PageLoading />}>
            <AnimatePresence mode="wait">
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
            </AnimatePresence>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
