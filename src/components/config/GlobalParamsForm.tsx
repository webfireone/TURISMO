import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Plus, X } from "lucide-react"
import type { GlobalParams, PaymentMethod } from "@/types"

interface GlobalParamsFormProps {
  params: GlobalParams
  onSave: (params: GlobalParams) => void
}

export function GlobalParamsForm({ params, onSave }: GlobalParamsFormProps) {
  const addPaymentMethod = () => {
    const newMethods = [...params.booking.paymentMethods, { name: "", rate: 0 }]
    onSave({ ...params, booking: { ...params.booking, paymentMethods: newMethods } })
  }

  const updatePaymentMethod = (index: number, field: keyof PaymentMethod, value: string | number) => {
    const newMethods = params.booking.paymentMethods.map((pm, i) =>
      i === index ? { ...pm, [field]: value } : pm
    )
    onSave({ ...params, booking: { ...params.booking, paymentMethods: newMethods } })
  }

  const removePaymentMethod = (index: number) => {
    onSave({ ...params, booking: { ...params.booking, paymentMethods: params.booking.paymentMethods.filter((_, i) => i !== index) } })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle className="text-sm">Parámetros de Reserva</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Cargo base (%)</label>
              <Input type="number" value={params.booking.baseCharge * 100} onChange={e => onSave({ ...params, booking: { ...params.booking, baseCharge: Number(e.target.value) / 100 } })} />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Descuento early bird (%)</label>
              <Input type="number" value={params.booking.earlyBirdDiscount * 100} onChange={e => onSave({ ...params, booking: { ...params.booking, earlyBirdDiscount: Number(e.target.value) / 100 } })} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">Métodos de pago</label>
            {params.booking.paymentMethods.map((pm, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input value={pm.name} onChange={e => updatePaymentMethod(i, "name", e.target.value)} placeholder="Nombre" className="flex-1" />
                <Input type="number" value={pm.rate * 100} onChange={e => updatePaymentMethod(i, "rate", Number(e.target.value) / 100)} placeholder="Tasa %" className="w-24" />
                <button onClick={() => removePaymentMethod(i)} className="text-muted-foreground hover:text-destructive"><X className="h-4 w-4" /></button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addPaymentMethod}><Plus className="h-3 w-3" />Agregar</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-sm">Información General</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">Email de contacto</label>
            <Input value={params.general.contactEmail} onChange={e => onSave({ ...params, general: { ...params.general, contactEmail: e.target.value } })} />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">Teléfono</label>
            <Input value={params.general.contactPhone} onChange={e => onSave({ ...params, general: { ...params.general, contactPhone: e.target.value } })} />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">WhatsApp</label>
            <Input value={params.general.contactWhatsApp} onChange={e => onSave({ ...params, general: { ...params.general, contactWhatsApp: e.target.value } })} />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">IVA/Impuestos (%)</label>
            <Input type="number" value={params.general.taxRate} onChange={e => onSave({ ...params, general: { ...params.general, taxRate: Number(e.target.value) } })} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-sm">Banner de Anuncios</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Mostrar banner</span>
            <Switch checked={params.announcement.enabled} onChange={v => onSave({ ...params, announcement: { ...params.announcement, enabled: v } })} />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">Texto del banner</label>
            <Input value={params.announcement.text} onChange={e => onSave({ ...params, announcement: { ...params.announcement, text: e.target.value } })} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
