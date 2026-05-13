import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { Phone, Mail, MapPin, MessageSquare, Send, Headphones } from "lucide-react"

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
            <Headphones className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold">Contacto</h1>
            <p className="text-sm text-muted-foreground">Estamos para ayudarte</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="border-primary/10">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Phone className="h-5 w-5 text-primary" /></div>
                  <div><p className="text-sm font-medium">Teléfono</p><p className="text-xs text-muted-foreground">+54 11 2261-8116</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Mail className="h-5 w-5 text-primary" /></div>
                  <div><p className="text-sm font-medium">Email</p><p className="text-xs text-muted-foreground">info@turismo.com</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><MapPin className="h-5 w-5 text-primary" /></div>
                  <div><p className="text-sm font-medium">Ubicación</p><p className="text-xs text-muted-foreground">Buenos Aires, Argentina</p></div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/10">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <p className="text-sm font-medium">WhatsApp</p>
                </div>
                <a href="https://wa.me/5491122618116" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full">Consultar por WhatsApp</Button>
                </a>
              </CardContent>
            </Card>
          </div>

          <Card className="border-primary/20">
            <CardContent className="p-6">
              <h3 className="font-display text-lg font-semibold mb-4">Enviar mensaje</h3>
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-white" />
                  </div>
                  <p className="font-display text-lg font-bold mb-2">Mensaje enviado</p>
                  <p className="text-sm text-muted-foreground">Te responderemos a la brevedad</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input placeholder="Nombre" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required />
                  <Input type="email" placeholder="Email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required />
                  <textarea placeholder="Tu mensaje..." value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} required
                    className="flex min-h-[120px] w-full rounded-xl border border-input bg-card px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 transition-all" />
                  <Button type="submit" className="w-full"><Send className="h-4 w-4" /> Enviar mensaje</Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
