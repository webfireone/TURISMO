import { useAuth } from "@/context/AuthContext"
import { useBookings } from "@/hooks/useBookings"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"
import { ClipboardList, Eye, MapPin, Calendar, Users } from "lucide-react"
import { useState } from "react"
import type { Booking } from "@/types"

const statusColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  pending: "secondary",
  confirmed: "default",
  cancelled: "destructive",
  completed: "outline",
}

export function BookingsPage() {
  const { isAdmin } = useAuth()
  const { data: bookings = [], isLoading } = useBookings()
  const navigate = useNavigate()
  const [selected, setSelected] = useState<Booking | null>(null)

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md text-center p-8">
          <ClipboardList className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold mb-2">Acceso restringido</h2>
          <p className="text-sm text-muted-foreground mb-6">Necesitás permisos de administrador</p>
          <Button onClick={() => navigate("/")}>Volver al inicio</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
            <ClipboardList className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold">Reservas</h1>
            <p className="text-sm text-muted-foreground">Gestioná las reservas de viajeros</p>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />)}
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No hay reservas registradas</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Paquete</TableHead>
                <TableHead>Viajeros</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map(booking => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <p className="font-medium text-sm">{booking.customerName}</p>
                    <p className="text-xs text-muted-foreground">{booking.customerEmail}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm truncate max-w-[200px]">{booking.items[0]?.packageName}</p>
                    {booking.items.length > 1 && <p className="text-xs text-muted-foreground">+{booking.items.length - 1} más</p>}
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1 text-sm"><Users className="h-3 w-3" />{booking.items.reduce((s, i) => s + i.travelers, 0)}</span>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1 text-sm"><Calendar className="h-3 w-3" />{new Date(booking.createdAt).toLocaleDateString("es-AR")}</span>
                  </TableCell>
                  <TableCell><span className="font-semibold text-primary">{booking.total.toLocaleString("es-AR")} ARS</span></TableCell>
                  <TableCell><Badge variant={statusColors[booking.status] || "outline"}>{booking.status}</Badge></TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => setSelected(booking)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setSelected(null)}>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative max-w-lg w-full mx-4" onClick={e => e.stopPropagation()}>
            <Card className="border-primary/20">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-display text-lg font-bold">Detalle de Reserva</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-muted-foreground">Cliente:</span><p className="font-medium">{selected.customerName}</p></div>
                  <div><span className="text-muted-foreground">Email:</span><p className="font-medium">{selected.customerEmail}</p></div>
                  <div><span className="text-muted-foreground">Teléfono:</span><p className="font-medium">{selected.customerPhone}</p></div>
                  <div><span className="text-muted-foreground">Método de pago:</span><p className="font-medium">{selected.paymentMethod}</p></div>
                </div>
                <div className="border-t border-primary/10 pt-4 space-y-2">
                  {selected.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                      <img src={item.imageUrl} alt={item.packageName} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.packageName}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{item.destination} · {item.duration}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" />{item.startDate} · x{item.travelers}</p>
                      </div>
                      <p className="text-sm font-semibold">{(item.unitPrice * item.travelers).toLocaleString("es-AR")} ARS</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-primary/10 pt-4 space-y-1 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{selected.subtotal.toLocaleString("es-AR")} ARS</span></div>
                  {selected.discount > 0 && <div className="flex justify-between"><span className="text-muted-foreground">Descuento</span><span className="text-success">-{selected.discount.toLocaleString("es-AR")} ARS</span></div>}
                  <div className="flex justify-between"><span className="text-muted-foreground">Impuestos</span><span>{selected.taxes.toLocaleString("es-AR")} ARS</span></div>
                  <div className="flex justify-between text-lg font-bold border-t border-primary/10 pt-2"><span>Total</span><span className="text-primary">{selected.total.toLocaleString("es-AR")} ARS</span></div>
                </div>
                <Button className="w-full" onClick={() => setSelected(null)}>Cerrar</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
