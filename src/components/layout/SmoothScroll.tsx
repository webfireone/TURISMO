import Lenis from "lenis"
import { useEffect, useRef, type ReactNode } from "react"

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({ duration: 0.8, easing: (t) => Math.min(1, 1 - Math.pow(1 - t, 3)), wheelMultiplier: 1, smoothWheel: true })
    lenisRef.current = lenis

    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)

    return () => { lenis.destroy() }
  }, [])

  return <>{children}</>
}
