import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { db } from "@/lib/firebase"
import { useAuth } from "@/context/AuthContext"
import { collection, addDoc } from "firebase/firestore"
import { motion } from "framer-motion"
import { Reveal, StaggerReveal } from "@/hooks/useScrollReveal"
import { Plane, Shield, CreditCard, Headphones, Star, ArrowRight, Compass, Globe2 } from "lucide-react"

const HERO_IMAGES = [
  "https://images.pexels.com/photos/7589674/pexels-photo-7589674.jpeg",
  "https://images.pexels.com/photos/13688695/pexels-photo-13688695.jpeg",
  "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg",
  "https://images.pexels.com/photos/2082103/pexels-photo-2082103.jpeg",
  "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg",
  "https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg",
  "https://images.pexels.com/photos/3616234/pexels-photo-3616234.jpeg",
  "https://images.pexels.com/photos/235734/pexels-photo-235734.jpeg",
  "https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg",
  "https://images.pexels.com/photos/235734/pexels-photo-235734.jpeg",
  "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg",
  "https://images.pexels.com/photos/235734/pexels-photo-235734.jpeg",
  "https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg",
  "https://images.pexels.com/photos/235734/pexels-photo-235734.jpeg",
  "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg",
  "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg",
  "https://images.pexels.com/photos/2082103/pexels-photo-2082103.jpeg",
  "https://images.pexels.com/photos/13688695/pexels-photo-13688695.jpeg",
  "https://images.pexels.com/photos/3616234/pexels-photo-3616234.jpeg",
  "https://images.pexels.com/photos/235734/pexels-photo-235734.jpeg",
  "https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg",
  "https://images.pexels.com/photos/235734/pexels-photo-235734.jpeg",
]

const DESTINATION_BANNERS = [
  {
    title: "Caribe",
    desc: "Playas paradisíacas",
    images: [
      "https://images.pexels.com/photos/7589674/pexels-photo-7589674.jpeg",
      "https://images.pexels.com/photos/14212425/pexels-photo-14212425.jpeg",
      "https://images.pexels.com/photos/13688695/pexels-photo-13688695.jpeg",
    ],
    gradient: "from-sky-600/80 via-sky-600/20 to-transparent",
  },
  {
    title: "Europa",
    desc: "Cultura e historia",
    images: [
      "https://images.pexels.com/photos/2082103/pexels-photo-2082103.jpeg",
      "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg",
      "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg",
    ],
    gradient: "from-rose-600/80 via-rose-600/20 to-transparent",
  },
  {
    title: "Patagonia",
    desc: "Aventura natural",
    images: [
      "https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg",
      "https://images.pexels.com/photos/3616234/pexels-photo-3616234.jpeg",
      "https://images.pexels.com/photos/235734/pexels-photo-235734.jpeg",
    ],
    gradient: "from-emerald-600/80 via-emerald-600/20 to-transparent",
  },
]

function RotatingHero() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 120000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-r from-sky-900 via-purple-900 to-slate-900" />
      {HERO_IMAGES.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-[5000ms] ${i === currentIndex ? "opacity-100" : "opacity-0"}`}
          style={{ zIndex: i === currentIndex ? 1 : 0 }}
        >
          <img 
            src={img} 
            alt="Destino" 
            className="w-full h-full object-cover pointer-events-auto"
            loading={i === 0 ? "eager" : "lazy"}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
    </div>
  )
}

function RotatingBanner({ banner }: { banner: typeof DESTINATION_BANNERS[0] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banner.images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [banner.images.length])

  const bannerGradients: Record<string, string> = {
  Caribe: "bg-gradient-to-br from-cyan-600 via-blue-700 to-slate-800",
  Europa: "bg-gradient-to-br from-rose-600 via-purple-700 to-slate-800",
  Patagonia: "bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-800",
}

return (
    <div className={`relative h-72 rounded-2xl overflow-hidden group cursor-pointer border border-white/5 ${bannerGradients[banner.title] || "bg-zinc-800"}`}>
      {banner.images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`${banner.title} ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === currentIndex ? "opacity-100" : "opacity-0"}`}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
      ))}
      <div className={`absolute inset-0 bg-gradient-to-b ${banner.gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute bottom-6 left-6 right-6">
        <h3 className="font-display text-2xl font-bold text-white mb-1">{banner.title}</h3>
        <p className="text-sm text-white/70">{banner.desc}</p>
      </div>
      <div className="absolute top-3 right-3 flex gap-1.5">
        {banner.images.map((_, i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? "bg-white w-4" : "bg-white/40"}`} />
        ))}
      </div>
    </div>
  )
}

const testimonials = [
  { name: "Ana G.", location: "Buenos Aires", text: "El viaje a Europa fue increíble. Superó todas mis expectativas.", rating: 5 },
  { name: "Carlos M.", location: "Córdoba", text: "La organización impecable. Volvería a viajar con ellos sin dudar.", rating: 5 },
  { name: "Lucía P.", location: "Rosario", text: "El safari en Kenia fue la experiencia más increíble de mi vida.", rating: 5 },
]

function HeroSection() {
  const navigate = useNavigate()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-[50vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden rounded-3xl hero-grid">
      <RotatingHero />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
      <div className="relative z-10 text-center max-w-3xl mx-auto px-6 py-20">
        <Reveal variant="blur-in" duration={0.8}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
            <Plane className="h-3 w-3" />
            Descubrí tu próximo destino
          </div>
        </Reveal>
        <Reveal variant="fade-scale" delay={0.1} duration={0.7}>
          <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tight leading-[0.9] mb-6">
            Viajá por <br />
            <span className="gradient-text">el mundo</span>
          </h1>
        </Reveal>
        <Reveal variant="fade-up" delay={0.25} duration={0.5}>
          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Paquetes turísticos con los mejores destinos, alojamiento y experiencias únicas.
            Viajá con confianza.
          </p>
        </Reveal>
        <Reveal variant="fade-up" delay={0.35} duration={0.5}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" onClick={() => navigate("/catalog")} className="btn-shine text-base px-8">
              Explorar paquetes
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/destinations")} className="text-base px-8">
              <Compass className="h-5 w-5" />
              Destinos
            </Button>
          </div>
        </Reveal>
      </div>
    </motion.div>
  )
}

export function LandingPage() {
  const navigate = useNavigate()
  const { isAdmin } = useAuth()
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const stats = [
    { number: "15+", label: "Años de experiencia" },
    { number: "50K+", label: "Viajeros satisfechos" },
    { number: "150+", label: "Destinos disponibles" },
    { number: "24/7", label: "Acompañamiento" },
  ]

  useEffect(() => {
    if (isAdmin) navigate("/admin", { replace: true })
  }, [isAdmin, navigate])

  const handleSubscribe = async () => {
    if (!email) return
    try {
      await addDoc(collection(db, "subscribers"), { email, subscribedAt: new Date().toISOString(), source: "landing", active: true })
      setSubscribed(true)
    } catch {
      setSubscribed(true)
    }
  }

  return (
    <div>
      <section className="px-6 pt-8">
        <HeroSection />
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <Reveal variant="blur-in" duration={0.8} className="text-[10px] font-semibold tracking-[0.4em] uppercase text-white/20 mb-4">Destinos Populares</Reveal>
          <Reveal variant="fade-scale" delay={0.1} duration={0.7} className="font-display text-6xl md:text-8xl font-bold tracking-tight leading-[0.9] text-white/90">
            Elegí tu <span className="gradient-text">aventura</span>
          </Reveal>
        </div>
        <StaggerReveal variant="fade-up" stagger={0.1} duration={0.6} threshold={0.1}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {DESTINATION_BANNERS.map((banner, i) => (
            <div key={i} onClick={() => navigate("/catalog")}>
              <RotatingBanner banner={banner} />
            </div>
          ))}
        </StaggerReveal>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-10">
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold">Comentarios de nuestros clientes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {testimonials.map((t, i) => (
            <div key={i} className="p-5 rounded-2xl bg-card/50 border border-primary/10">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`h-3 w-3 ${j < t.rating ? "text-amber-400 fill-amber-400" : "text-muted"}`} />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-3 italic">"{t.text}"</p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-[10px] font-bold text-white">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-xs font-medium">{t.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold">¿Por qué elegirnos?</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Shield, title: "Seguro", desc: "Viajá protegido" },
            { icon: CreditCard, title: "3 cuotas", desc: "sin interés" },
            { icon: Headphones, title: "Acompañamiento", desc: "24/7" },
            { icon: Globe2, title: "Destinos", desc: "en todo el mundo" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-3 p-4 rounded-xl bg-card/50 border border-primary/10 hover:border-primary/20 transition-colors">
              <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <Icon className="h-3.5 w-3.5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">{title}</p>
                <p className="text-[9px] text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <Reveal variant="fade-up" duration={0.5}>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">¿Listo para viajar?</h2>
                <p className="text-sm text-muted-foreground mb-6">Suscribite y recibí ofertas exclusivas en tu correo</p>
                <div className="flex gap-2 max-w-md">
                  <Input placeholder="tu@email.com" value={email} onChange={e => setEmail(e.target.value)} className="flex-1" />
                  <Button onClick={handleSubscribe} disabled={subscribed}>{subscribed ? "Suscrito" : "Suscribirme"}</Button>
                </div>
              </Reveal>
            </div>
            <div className="shrink-0">
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-32 h-32 rounded-full gradient-primary/20 flex items-center justify-center"
              >
                <Plane className="h-16 w-16 text-primary" />
              </motion.div>
            </div>
          </div>
        </Card>
      </section>

      <footer className="max-w-7xl mx-auto px-6 py-16 border-t border-primary/10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Plane className="h-4 w-4 text-white" />
              </div>
              <span className="font-display text-lg font-bold">SI VIAJES</span>
            </div>
            <p className="text-sm text-muted-foreground">Tu agencia de viajes de confianza. Creando recuerdos inolvidables desde 2011.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>📍 Av. Corrientes 1234, CABA</p>
              <p>📞 +54 11 3390-0101</p>
              <p>📧 info@siviajes.com</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Enlaces</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="/catalog" className="block hover:text-foreground transition-colors">Paquetes</a>
              <a href="/destinations" className="block hover:text-foreground transition-colors">Destinos</a>
              <a href="/contact" className="block hover:text-foreground transition-colors">Contacto</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Seguinos</h4>
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://wa.me/5491133900101" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary/5 text-center text-sm text-muted-foreground">
          © 2026 SI VIAJES. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  )
}

import { Card } from "@/components/ui/card"
