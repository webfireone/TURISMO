import { useAuth } from "@/context/AuthContext"
import { usePromotions, useSubscribers, useSavePromotion, useDeletePromotion } from "@/hooks/usePromotions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Sparkles, Plus, Trash2, Mail } from "lucide-react"

export function MarketingPage() {
  const { isAdmin } = useAuth()
  const { data: promotions = [] } = usePromotions()
  const { data: subscribers = [] } = useSubscribers()
  const savePromotion = useSavePromotion()
  const deletePromotion = useDeletePromotion()
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: "", description: "", discountPercent: 0, promoCode: "", startDate: "", endDate: "", bannerImage: "" })

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md text-center p-8">
          <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold mb-2">Acceso restringido</h2>
          <p className="text-sm text-muted-foreground mb-6">Necesitás permisos de administrador</p>
          <Button onClick={() => navigate("/")}>Volver al inicio</Button>
        </Card>
      </div>
    )
  }

  const handleSave = () => {
    savePromotion.mutate({ ...form, discountPercent: Number(form.discountPercent), active: true, createdAt: new Date().toISOString() })
    setShowForm(false)
    setForm({ title: "", description: "", discountPercent: 0, promoCode: "", startDate: "", endDate: "", bannerImage: "" })
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold">Marketing</h1>
              <p className="text-sm text-muted-foreground">Promociones y suscriptores</p>
            </div>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4" /> {showForm ? "Cancelar" : "Nueva Promoción"}
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8 border-primary/20">
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Título" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
                <Input placeholder="Código promocional" value={form.promoCode} onChange={e => setForm(p => ({ ...p, promoCode: e.target.value }))} />
              </div>
              <Input placeholder="Descripción" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
              <div className="grid grid-cols-3 gap-4">
                <Input type="number" placeholder="% descuento" value={form.discountPercent} onChange={e => setForm(p => ({ ...p, discountPercent: Number(e.target.value) }))} />
                <Input type="date" placeholder="Inicio" value={form.startDate} onChange={e => setForm(p => ({ ...p, startDate: e.target.value }))} />
                <Input type="date" placeholder="Fin" value={form.endDate} onChange={e => setForm(p => ({ ...p, endDate: e.target.value }))} />
              </div>
              <Button onClick={handleSave} disabled={!form.title || !form.promoCode}>Crear Promoción</Button>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="font-display text-lg font-semibold">Promociones ({promotions.length})</h2>
            {promotions.length === 0 && <p className="text-sm text-muted-foreground">Sin promociones activas</p>}
            {promotions.map(promo => (
              <Card key={promo.id} className="border-primary/10">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm">{promo.title}</h3>
                      <Badge variant={promo.active ? "default" : "secondary"}>{promo.active ? "Activa" : "Inactiva"}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{promo.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">Código: <span className="font-mono text-primary">{promo.promoCode}</span> · {promo.discountPercent}% OFF</p>
                    <p className="text-[10px] text-muted-foreground">{promo.startDate} → {promo.endDate}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => deletePromotion.mutate(promo.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-primary" /> Suscriptores ({subscribers.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {subscribers.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No hay suscriptores registrados</p>
                ) : (
                  <div className="space-y-2">
                    {subscribers.map(sub => (
                      <div key={sub.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                        <div>
                          <p className="text-sm font-medium">{sub.email}</p>
                          <p className="text-[10px] text-muted-foreground">{new Date(sub.subscribedAt).toLocaleDateString("es-AR")}</p>
                        </div>
                        <Badge variant={sub.active ? "default" : "secondary"}>{sub.active ? "Activo" : "Inactivo"}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
