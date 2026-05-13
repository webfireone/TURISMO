import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import type { Booking, BookingItem } from "@/types"
import { useParamsStore } from "@/store/paramsStore"
import { X, Plane, ArrowLeft, ChevronRight, Calendar } from "lucide-react"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  items: BookingItem[]
  onSubmit: (booking: Booking) => void
}

function genId() { return crypto.randomUUID?.() ?? Date.now().toString(36) + Math.random().toString(36).slice(2) }

export function CheckoutModal({ isOpen, onClose, items, onSubmit }: CheckoutModalProps) {
  const { params } = useParamsStore()
  const [step, setStep] = useState<"review" | "form" | "confirm">("review")
  const [form, setForm] = useState({ name: "", phone: "", email: "", notes: "" })
  const [paymentMethod, setPaymentMethod] = useState(params.booking.paymentMethods[0]?.name || "Efectivo")

  if (!isOpen) return null

  const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.travelers, 0)
  const paymentRate = params.booking.paymentMethods.find(p => p.name === paymentMethod)?.rate || 0
  const discount = subtotal * paymentRate
  const taxRate = params.general.taxRate / 100
  const taxes = Math.round((subtotal - discount) * taxRate)
  const total = Math.round(subtotal - discount + taxes)

  const handleSubmit = () => {
    onSubmit({
      id: genId(),
      customerName: form.name,
      customerPhone: form.phone,
      customerEmail: form.email,
      items,
      subtotal,
      discount,
      taxes,
      total,
      paymentMethod,
      paymentRate,
      status: "pending",
      notes: form.notes,
      createdAt: new Date().toISOString(),
    })
    setStep("confirm")
  }

  if (step === "confirm") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="relative max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
          <Card className="text-center p-8 border-primary/20">
            <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
              <Plane className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-display text-xl font-bold mb-2">Reserva Confirmada</h3>
            <p className="text-sm text-muted-foreground mb-6">Te enviaremos los detalles a tu correo electrónico</p>
            <Button onClick={onClose}>Cerrar</Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto pt-10 pb-20" onClick={onClose}>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative max-w-2xl w-full mx-4" onClick={e => e.stopPropagation()}>
        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">
              {step === "review" ? "Revisá tu reserva" : "Tus datos"}
            </CardTitle>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              {items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                  <img src={item.imageUrl} alt={item.packageName} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.packageName}</p>
                    <p className="text-xs text-muted-foreground">{item.destination} · {item.duration}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {item.startDate}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold">{item.unitPrice.toLocaleString("es-AR")} ARS</p>
                    <p className="text-xs text-muted-foreground">x{item.travelers} viajeros</p>
                  </div>
                </div>
              ))}
            </div>

            {step === "form" && (
              <div className="space-y-4">
                <Input placeholder="Nombre completo" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required />
                <Input placeholder="Teléfono" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} required />
                <Input placeholder="Email" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required />
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Método de pago</label>
                  <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}
                    className="w-full h-11 rounded-xl border border-input bg-card px-4 text-sm text-foreground">
                    {params.booking.paymentMethods.map(pm => <option key={pm.name} value={pm.name}>{pm.name}</option>)}
                  </select>
                </div>
                <textarea placeholder="Notas adicionales..." value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                  className="flex min-h-[80px] w-full rounded-xl border border-input bg-card px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 transition-all" />
              </div>
            )}

            <div className="border-t border-primary/10 pt-4 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span>{subtotal.toLocaleString("es-AR")} ARS</span></div>
              {discount > 0 && <div className="flex justify-between text-sm"><span className="text-muted-foreground">Descuento ({paymentMethod})</span><span className="text-success">-{discount.toLocaleString("es-AR")} ARS</span></div>}
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Impuestos ({(taxRate * 100).toFixed(0)}%)</span><span>{taxes.toLocaleString("es-AR")} ARS</span></div>
              <div className="flex justify-between text-lg font-bold border-t border-primary/10 pt-2">
                <span>Total</span><span className="text-primary">{total.toLocaleString("es-AR")} ARS</span>
              </div>
            </div>

            <div className="flex gap-3">
              {step === "form" ? (
                <>
                  <Button variant="outline" onClick={() => setStep("review")} className="flex-1">
                    <ArrowLeft className="h-4 w-4" /> Volver
                  </Button>
                  <Button onClick={handleSubmit} className="flex-1" disabled={!form.name || !form.phone || !form.email}>
                    Confirmar Reserva
                  </Button>
                </>
              ) : (
                <Button onClick={() => setStep("form")} className="w-full">
                  Continuar <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
