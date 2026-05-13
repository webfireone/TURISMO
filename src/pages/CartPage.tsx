import { useCartStore } from "@/store/cartStore"
import { usePackages, useCreateBooking } from "@/hooks/useFirestore"
import { CheckoutModal } from "@/components/booking/CheckoutModal"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ShoppingCart, Trash2, ArrowLeft, Plus, Minus, Calendar, MapPin } from "lucide-react"
import type { Booking, BookingItem } from "@/types"

export function CartPage() {
  const { items, removeItem, updateTravelers, clearCart } = useCartStore()
  const { data: packages = [] } = usePackages()
  const createBooking = useCreateBooking()
  const navigate = useNavigate()
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  const cartItems: BookingItem[] = items.map(item => {
    const pkg = packages.find(p => p.id === item.packageId)
    return {
      packageId: item.packageId,
      packageName: item.packageName,
      destination: item.destination,
      accommodation: (pkg?.accommodation || "Estándar") as any,
      duration: item.duration,
      travelers: item.travelers,
      unitPrice: item.price,
      imageUrl: item.imageUrl,
      startDate: item.startDate,
    }
  })

  const subtotal = cartItems.reduce((sum, i) => sum + i.unitPrice * i.travelers, 0)

  const handleSubmit = (booking: Booking) => {
    createBooking.mutate(booking)
    clearCart()
    setCheckoutOpen(false)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md text-center p-8 border-primary/20">
          <ShoppingCart className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold mb-2">Carrito vacío</h2>
          <p className="text-sm text-muted-foreground mb-6">Agregá paquetes para empezar tu reserva</p>
          <Button onClick={() => navigate("/catalog")}>Explorar paquetes</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold">Carrito de Reservas</h1>
              <p className="text-sm text-muted-foreground">{items.length} paquetes</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={clearCart} className="text-muted-foreground">
            <Trash2 className="h-4 w-4" /> Vaciar
          </Button>
        </div>

        <div className="space-y-4">
          {items.map(item => (
            <Card key={item.packageId} className="border-primary/10">
              <CardContent className="p-4 flex items-center gap-4">
                <img src={item.imageUrl} alt={item.packageName} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold truncate">{item.packageName}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" /> {item.destination} · {item.duration}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {item.startDate}
                  </p>
                  <p className="text-sm font-bold text-primary mt-1">{item.price.toLocaleString("es-AR")} ARS</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => updateTravelers(item.packageId, -1)} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80"><Minus className="h-3 w-3" /></button>
                  <span className="text-sm font-semibold w-6 text-center">{item.travelers}</span>
                  <button onClick={() => updateTravelers(item.packageId, 1)} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80"><Plus className="h-3 w-3" /></button>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-lg font-bold text-primary">{(item.price * item.travelers).toLocaleString("es-AR")} ARS</p>
                </div>
                <button onClick={() => removeItem(item.packageId)} className="text-muted-foreground hover:text-destructive transition-colors shrink-0">
                  <Trash2 className="h-4 w-4" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-card border border-primary/10">
          <div>
            <p className="text-sm text-muted-foreground">Total estimado</p>
            <p className="text-3xl font-bold text-primary">{subtotal.toLocaleString("es-AR")} ARS</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/catalog")}>
              <ArrowLeft className="h-4 w-4" /> Seguir comprando
            </Button>
            <Button onClick={() => setCheckoutOpen(true)} className="btn-shine">Ir al check out</Button>
          </div>
        </div>
      </div>

      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} items={cartItems} onSubmit={handleSubmit} />
    </div>
  )
}
