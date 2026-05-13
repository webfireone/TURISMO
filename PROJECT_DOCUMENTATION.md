# TURISMO — Agencia de Viajes

Aplicación web de paquetes turísticos con reservas, carrito de compras, dashboard administrativo y catálogo de destinos.

## Stack

- **Frontend:** React 19, TypeScript, Vite
- **Estado:** Zustand (stores), TanStack Query (server state)
- **UI:** Tailwind CSS v4, Framer Motion, Lenis (smooth scroll)
- **Backend:** Firebase Firestore (datos), Firebase Auth (autenticación)
- **Gráficos:** Recharts
- **Import/Export:** PapaParse (CSV), XLSX (Excel)

## Arquitectura

Sigue el patrón del proyecto de referencia Tienda de Ropa, adaptando:
- Productos → Paquetes Turísticos (TravelPackage)
- Órdenes → Reservas (Booking)
- Carrito → Carrito de Reservas (BookingCartItem)

## Modo Mock

Cuando `VITE_FIREBASE_API_KEY` no está configurada o es `"demo-api-key"`, la app funciona en modo mock con datos locales y autenticación simulada (toggle admin/viajero).

## Estructura de Carpetas

```
src/
├── components/
│   ├── alerts/        # Panel de alertas (cupos bajos, eventos)
│   ├── booking/       # Checkout modal multi-step
│   ├── catalog/       # Vista de catálogo con filtros
│   ├── config/        # Formulario de parámetros globales
│   ├── dashboard/     # KPIs, gráficos, tarjetas, PageHero/Decorative3D
│   ├── destinations/  # Vista de destinos e itinerarios
│   ├── import-export/ # Diálogos de import/export CSV/Excel/Web
│   ├── layout/        # AppLayout, Header, Sidebar, Logo, SmoothScroll
│   ├── packages/      # PackageCard, PackageForm, PackageManager
│   └── ui/            # Button, Card, Input, Select, Table, Tabs, Badge, Switch, CursorGlow
├── context/           # AuthContext (Firebase Auth + mock)
├── hooks/             # usePackages, useBookings, useAlerts, usePromotions, etc.
├── lib/               # firebase, constants, utils, calculations, bookingAlerts
├── pages/             # Landing, Catalog, Cart, Dashboard, Packages, Bookings, etc.
├── store/             # cartStore, bookingsStore, paramsStore, themeStore
├── test/              # Vitest setup + tests
├── types/             # TypeScript types
├── App.tsx            # Root con lazy loading y routing
├── main.tsx           # Entry point
└── index.css          # Estilos globales Tailwind + tema oscuro
```

## Rutas

| Ruta | Página | Acceso |
|------|--------|--------|
| `/` | Landing Page | Público |
| `/catalog` | Catálogo de paquetes | Público |
| `/package/:id` | Detalle de paquete | Público |
| `/cart` | Carrito de reservas | Público |
| `/destinations` | Destinos | Público |
| `/itineraries` | Itinerarios día a día | Público |
| `/contact` | Contacto | Público |
| `/login` | Login/Register | Público |
| `/admin` | Admin Home | Admin |
| `/dashboard` | Dashboard KPIs | Admin |
| `/packages` | CRUD paquetes | Admin |
| `/bookings` | Reservas | Admin |
| `/alerts` | Alertas | Admin |
| `/import-export` | Import/Export | Admin |
| `/marketing` | Promociones | Admin |
| `/config` | Configuración global | Admin |

## Variables de Entorno (.env)

```
VITE_FIREBASE_API_KEY=demo-api-key
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_WHATSAPP_NUMBER=5491122618116
```

## Comandos

```bash
npm install      # Instalar dependencias
npm run dev      # Desarrollo
npm run build    # Build producción
npm run lint     # Linter
npm run preview  # Preview build
```

## Deploy

Render estático configurado via `render.yaml`. Build command: `npm run build`, Publish directory: `dist`.
