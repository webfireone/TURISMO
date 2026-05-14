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
│   ├── destinations/  # Vista de destinos e itinerarios
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

### 2026-05-13 - Sesión de Trabajo

#### Commit Reciente (d8b167a)
- **Fecha**: 2026-05-13
- **Mensaje**: "fix: use anchor tags for mobile nav"
- **Cambio**: Botones del menú mobile cambiados a etiquetas `<a>`

#### Commit Reciente (nuevo)
- **Fecha**: 2026-05-13
- **Mensaje**: "feat: slower hero transition + darker palette"
- **Cambios**: 
  - Intervalo del hero: 5s → 12s
  - Transición: 1.5s → 5s
- **Stats en Landing**: Agregada sección con 15+ años, 50K+ viajeros, 150+ destinos, 24/7
- **Footer**: Agregado pie de página con datos de empresa, contacto, enlaces, redes sociales
- **Scroll**: Configurado Lenis con duration 1.2, touchMultiplier 1.5, soporte prefers-reduced-motion
- **Spacing**: Aumentado padding entre secciones de landing (py-24, py-28)
- **Hero rotation**: 120s por imagen (antes 12s)
- **Imágenes**: `decoding="async"`, `will-change: opacity`, transición 2s
- **DestinosView**: Reemplazadas imágenes placeholder (`placehold.co`) con imágenes reales de paquetes. Agregados gradientes por destino, descripciones informativas, países, rango de precios, badges de tags
- **ItineraryView**: Rediseño con línea de timeline vertical, indicador de progreso (días totales), conectores visuales entre días, gradiente superior en cards, diseño más limpio
  - Fondo: #0d0d1a → #0a0a0b
  - Texto: #e8e8f0 → #fafafa
  - Cards: #161627 → #121214

#### 1. Imágenes de Paquetes
- **Problema**: Imágenes de Wikimedia no cargaban
- **Solución**: Cambiadas todas a URLs de Unsplash/Pexels
- **Archivos**: `src/lib/constants.ts`
- **Nota**: Agregado fallback con gradiente de color cuando imagen no carga

#### 2. Galería de Imágenes en Detalles
- **Problema**: Solo se mostraba la imagen principal
- **Solución**: Agregada sección "Más imágenes" con grid de 4 columnas
- **Archivos**: `src/pages/PackageDetailPage.tsx`
- **Nota**: Muestra 4 imágenes adicionales por paquete

#### 3. Layout del Catálogo
- **Problema**: Tarjetas de diferentes tamaños, filas desiguales
- **Solución**: Unificadas todas las tarjetas al mismo tamaño
- **Archivos**: `src/components/catalog/CatalogView.tsx`
- **Nota**: Grid 4 columnas desktop, 2 mobile

#### 4. Menú Mobile
- **Problema**: Botones "Paquetes" y "Destinos" no funcionaban en mobile
- **Solución**: Cambiados de `<button>` a `<a>` para mejor respuesta táctil
- **Archivos**: `src/components/layout/Header.tsx`
- **Estado**: ⚠️ Pendiente de verificación

#### 5. Paquetes Nuevos
- **Problema**: Necesitaban más destinos europeos
- **Solución**: Agregados 3 paquetes nuevos (Italia, España, Francia)
- **Archivos**: `src/lib/constants.ts`
- **Nota**: Total ahora es 11 paquetes

#### 6. Botón X en Página de Detalles
- **Problema**: No había forma rápida de cerrar la vista de paquete
- **Solución**: Agregado botón X en esquina superior derecha
- **Archivos**: `src/pages/PackageDetailPage.tsx`

#### 7. Ordenamiento del Catálogo
- **Problema**: Sin orden por defecto
- **Solución**: Por defecto muestra destacados primero, luego menor precio
- **Archivos**: `src/components/catalog/CatalogView.tsx`
- **Opciones**: Destacados, Menor precio, Mayor precio, Nombre, Destino

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
npm run build

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

---

## 📖 NOTAS PARA CONTINUAR CON OTRA IA

### Para continuar el trabajo:

1. **Verificar build**: `npm run build` debe pasar con 0 errores
2. **Modo mock**: La app usa datos locales, no Firebase real
3. **Imágenes**: Usar Unsplash/Pexels con parámetros `?w=800&q=80`
4. **Tailwind v4**: Usar variables CSS nativas, no Tailwind config
5. **Componentes**: Lucide para iconos, Shadcn para UI base

### Estructura de datos:
- `TravelPackage` tiene: `id`, `name`, `destination`, `country`, `duration`, `accommodation`, `price`, `previousPrice`, `description`, `includes`, `excludes`, `itinerary`, `imageUrl`, `images[]`, `maxCapacity`, `availableSpots`, `tags[]`, `featured`, `status`

### Pages clave:
- LandingPage: `src/pages/LandingPage.tsx`
- Catálogo: `src/pages/CatalogPage.tsx` → `CatalogView.tsx`
- Detalles: `src/pages/PackageDetailPage.tsx`
- Header: `src/components/layout/Header.tsx`

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