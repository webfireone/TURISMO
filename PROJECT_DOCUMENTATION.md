# SI VIAJES — Agencia de Viajes

Aplicación web de paquetes turísticos con reservas, carrito de compras, dashboard administrativo y catálogo de destinos.

---

## 📋 ESTADO ACTUAL DEL PROYECTO

### Información General
- **Nombre**: SI VIAJES (rebrand de "Turismo")
- **WhatsApp**: +54 9 11 3390-0101
- **Paquetes**: 11 paquetes turísticos
- **Build**: ✅ Pasa con 0 errores TypeScript
- **GitHub**: https://github.com/webfireone/TURISMO
- **Dev Server**: localhost:5174
- **Deploy**: Render (estático via render.yaml), build command `npm run build`, publish `dist/`

---

## 🔧 STACK TÉCNICO

- **Frontend:** React 19, TypeScript, Vite
- **Estado:** Zustand (stores), TanStack Query (server state)
- **UI:** Tailwind CSS v4, Framer Motion, Lenis (smooth scroll)
- **Backend:** Firebase Firestore (datos), Firebase Auth (autenticación)
- **Gráficos:** Recharts
- **Import/Export:** PapaParse (CSV), XLSX (Excel)
- **Modo Mock:** ACTIVO (USE_MOCK=true forzado en usePackages.ts)

---

## 📁 ESTRUCTURA DE CARPETAS

```
src/
├── components/
│   ├── alerts/        # Panel de alertas (cupos bajos, eventos)
│   ├── booking/       # Checkout modal multi-step
│   ├── catalog/       # Vista de catálogo con filtros (CatalogView.tsx)
│   ├── config/        # Formulario de parámetros globales
│   ├── dashboard/     # KPIs, gráficos, tarjetas, PageHero/Decorative3D
│   ├── destinations/  # DestinosView (cards por destino) e ItineraryView (timeline)
│   ├── import-export/ # Diálogos de import/export CSV/Excel/Web
│   ├── layout/        # AppLayout, Header, Sidebar, Logo, SmoothScroll
│   ├── packages/      # PackageCard, PackageForm, PackageManager
│   └── ui/            # Button, Card, Input, Select, Table, Tabs, Badge, Switch, CursorGlow
├── context/           # AuthContext (Firebase Auth + mock)
├── hooks/             # usePackages, useBookings, useAlerts, usePromotions, useScrollReveal
├── lib/               # firebase, constants, utils, calculations, bookingAlerts
├── pages/             # Landing, Catalog, Cart, Dashboard, Packages, Bookings, etc.
├── store/             # cartStore, bookingsStore, paramsStore, themeStore
├── types/             # TypeScript types
├── App.tsx            # Root con lazy loading y routing
├── main.tsx           # Entry point
└── index.css          # Estilos globales Tailwind + tema oscuro
```

---

## 🗺️ RUTAS

| Ruta | Página | Acceso |
|------|--------|--------|
| `/` | Landing Page | Público |
| `/catalog` | Catálogo de paquetes | Público |
| `/package/:id` | Detalle de paquete | Público |
| `/cart` | Carrito de reservas | Público |
| `/destinations` | Destinos (cards por zona) | Público |
| `/itineraries` | Itinerarios día a día por destino/paquete | Público |
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

---

## 📦 PAQUETES TURÍSTICOS (11 TOTALES)

| ID | Nombre | Destino | País | Precio | Estado |
|----|--------|---------|------|--------|--------|
| pkg1 | Caribe Mexicano | Caribe | México | $385.000 | ✅ Activo |
| pkg2 | Maravillas de Perú | Sudamérica | Perú | $295.000 | ✅ Activo |
| pkg3 | Europa Imperial | Europa | Italia/Francia/España | $890.000 | ✅ Activo |
| pkg4 | Brasil Tropical | Sudamérica | Brasil | $250.000 | ✅ Activo |
| pkg5 | Patagonia Argentina | Nacional | Argentina | $340.000 | ✅ Activo |
| pkg6 | Norte Argentino | Nacional | Argentina | $165.000 | ✅ Activo |
| pkg7 | Tailandia y Vietnam | Asia | Tailandia/Vietnam | $580.000 | ✅ Activo |
| pkg8 | Nueva York | Norteamérica | Estados Unidos | $420.000 | ✅ Activo |
| pkg9 | Italia Clásica | Europa | Italia | $520.000 | ✅ Activo |
| pkg10 | España Vibrante | Europa | España | $480.000 | ✅ Activo |
| pkg11 | Francia Encantadora | Europa | Francia | $550.000 | ✅ Activo |

---

## ✅ FIXES Y ACTUALIZACIONES REALIZADAS

### Sesión 2026-05-13
- **Menú mobile**: Botones `<button>` → `<a>` para respuesta táctil
- **Hero**: Intervalo 5s → 120s, transición 1.5s → 5s
- **Paleta oscura**: #0d0d1a → #0a0a0b, texto #e8e8f0 → #fafafa, cards #161627 → #121214
- **Stats en Landing**: 15+ años, 50K+ viajeros, 150+ destinos, 24/7
- **Footer**: Datos de empresa, contacto, enlaces, redes sociales, copyright
- **Lenis smooth scroll**: duration 1.2, touchMultiplier 1.5, prefers-reduced-motion
- **Imágenes paquetes**: Wikimedia → Unsplash/Pexels con fallback gradiente
- **Galería detalles**: Sección "Más imágenes" con grid 4 columnas
- **Catálogo**: Grid uniforme sin cards hero/tall, ordenamiento (destacados/precio/nombre/destino)
- **3 paquetes nuevos**: Italia Clásica, España Vibrante, Francia Encantadora
- **Botón X**: En PackageDetailPage para cerrar vista
- **Ordenamiento**: Destacados → menor precio por defecto

### Sesión 2026-05-14

#### DestinosView (`src/components/destinations/DestinationsView.tsx`)
- Reemplazadas imágenes placeholder `placehold.co` con imágenes reales de paquetes
- Gradientes por destino: Caribe (cyan), Europa (rose), Sudamérica (emerald), Nacional (green), etc.
- Descripciones informativas por zona geográfica
- Muestra países disponibles, rango de precios (min–max), badges de tags
- Grid responsivo 1–4 columnas

#### ItineraryView (`src/components/destinations/ItineraryView.tsx`)
- Rediseño completo con línea de timeline vertical conectando días
- Indicador de progreso "X días de viaje" con barra gradient
- Círculos conector en cada punto del timeline
- Gradiente decorativo en borde superior de cada card
- Diseño más limpio con mejor espaciado

#### ItinerariosPage (`src/pages/ItinerariesPage.tsx`)
- Agrupación por destino: 1 tab único por destino con contador (ej. "Europa (4)")
- Sub-filtro en pills para elegir paquete específico dentro del destino
- Eliminados tabs duplicados (antes se repetía "Europa" ×4)

#### Deploy fix
- Eliminado parámetro `index` no usado en `ItineraryView.tsx` que rompía el build de Render

---

## ⚠️ PROBLEMAS PENDIENTES

### 1. Menú Mobile - Botones Paquetes/Destinos
- **Síntoma**: Los botones de navegación no funcionan en mobile
- **Último intento**: Cambiados a etiquetas `<a>`
- **Estado**: Pendiente de testing en producción

### 2. Imágenes de Paquetes en Móvil
- **Síntoma**: Algunas imágenes no cargan en móvil
- **Solución**: Agregado fallback con gradiente de respaldo
- **Estado**: Parcialmente resuelto

---

## 🔧 CONFIGURACIÓN ACTUAL

### Variables de Entorno (.env)
```
VITE_FIREBASE_API_KEY=demo-api-key
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_WHATSAPP_NUMBER=5491133900101
```

### Configuración Forzada
- `USE_MOCK=true` en `src/hooks/usePackages.ts`
- Announcement banner deshabilitado en `src/store/paramsStore`

---

## 📝 COMANDOS

```bash
# Instalación
npm install

# Desarrollo
npm run dev

# Build producción
npm run build      # tsc -b && vite build

# Linter
npm run lint

# Preview build
npm run preview
```

---

## 🚀 DEPLOY

Render estático configurado via `render.yaml`. 
- Build command: `npm run build`
- Publish directory: `dist`
- **Importante**: El build de Render ejecuta `tsc -b && vite build`. Cualquier error TS lo rompe.

---

## 📖 NOTAS PARA CONTINUAR CON OTRA IA

### Para continuar el trabajo:

1. **Verificar build**: `npm run build` debe pasar con 0 errores
2. **Modo mock**: La app usa datos locales, no Firebase real
3. **Imágenes**: Usar Unsplash/Pexels con parámetros `?w=800&q=80`
4. **Tailwind v4**: Usar variables CSS nativas, no Tailwind config
5. **Componentes**: Lucide para iconos, Shadcn para UI base
6. **Build de Render**: Corre `tsc -b && vite build` — TS strict, no dejar parámetros no usados
7. **Commits**: Actualizar PROJECT_DOCUMENTATION.md antes de cada commit

### Estructura de datos:
- `TravelPackage`: `id`, `name`, `destination`, `country`, `duration`, `accommodation`, `price`, `previousPrice`, `description`, `includes`, `excludes`, `itinerary[]`, `imageUrl`, `images[]`, `maxCapacity`, `availableSpots`, `tags[]`, `featured`, `status`
- `ItineraryDay`: `day`, `title`, `description`, `activities[]`, `meals[]`, `accommodation`

### Pages clave:
- LandingPage: `src/pages/LandingPage.tsx`
- Catálogo: `src/pages/CatalogPage.tsx` → `CatalogView.tsx`
- Detalles: `src/pages/PackageDetailPage.tsx`
- Destinos: `src/pages/DestinationsPage.tsx` → `DestinationsView.tsx`
- Itinerarios: `src/pages/ItinerariesPage.tsx` → `ItineraryView.tsx`
- Header: `src/components/layout/Header.tsx`

### Historial de commits (main):
```
87b0d70 feat: group itineraries by destination with sub-filter for multiple packages
f48935b fix: remove unused index parameter in ItineraryView
547af78 feat: improve Destinos page with real images and Itinerarios with timeline UI
d329051 feat: add stats section to landing page
db4a16b feat: slower hero transition (12s interval, 5s fade)
8bd31df feat: slower hero transition + darker palette
d8b167a fix: use anchor tags for mobile nav
2719b73 fix: improve mobile menu click handling
```

---

## 🎨 DIRECCIÓN VISUAL PROPUESTA (Pendiente de implementar)

### Tipografía
- Display: JetBrains Mono (variable)
- Body: DM Sans

### Paleta
- Fondo: #0a0a0b
- Primary: #0ea5e9 (cyan-500)
- Acento: #f59e0b (amber)
- Texto: #fafafa

### Próximos pasos visuales
1. Aplicar tipografía fluida con clamp()
2. Implementar glassmorphism en modals
3. Agregar hover states con shadow glow
4. Implementar scroll reveal animations

---

*Última actualización: 2026-05-14*
*Proyecto: SI VIAJES - Agencia de Viajes*
