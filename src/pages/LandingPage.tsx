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
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-r from-sky-900 via-purple-900 to-slate-900" />
      {HERO_IMAGES.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1500 ${i === currentIndex ? "opacity-100" : "opacity-0"}`}
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
    </div>
  )
}

import { Card } from "@/components/ui/card"
