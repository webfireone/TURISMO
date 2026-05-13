import { useEffect, useRef, useState } from "react"
import { doc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import type { ThemeConfig } from "@/store/themeStore"

const THEME_DOC = "siteConfig/theme"
const LS_KEY = "turismo-active-config"

interface SiteThemeDoc {
  config: ThemeConfig
  updatedAt: any
  updatedBy?: string
}

export function useSiteTheme() {
  const [themeFromFirestore, setThemeFromFirestore] = useState<ThemeConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const unsubRef = useRef<(() => void) | null>(null)
  const isFirestoreAvailable =
    import.meta.env.VITE_FIREBASE_API_KEY &&
    import.meta.env.VITE_FIREBASE_API_KEY !== "demo-api-key"

  useEffect(() => {
    if (!isFirestoreAvailable) {
      const stored = localStorage.getItem(LS_KEY)
      if (stored) { try { setThemeFromFirestore(JSON.parse(stored)) } catch { setThemeFromFirestore(null) } }
      setLoading(false)
      return
    }
    const themeRef = doc(db, THEME_DOC)
    unsubRef.current = onSnapshot(themeRef, (snap: any) => {
      if (snap.exists()) {
        const data = snap.data() as SiteThemeDoc
        if (data.config) { setThemeFromFirestore(data.config as ThemeConfig); localStorage.setItem(LS_KEY, JSON.stringify(data.config)) }
      }
      setLoading(false)
    }, () => { setLoading(false) })
    return () => { unsubRef.current?.() }
  }, [isFirestoreAvailable])

  const saveSiteTheme = async (config: ThemeConfig, userEmail?: string): Promise<boolean> => {
    if (!isFirestoreAvailable) return false
    try {
      await setDoc(doc(db, THEME_DOC), { config, updatedAt: serverTimestamp(), updatedBy: userEmail || null }, { merge: true })
      return true
    } catch { return false }
  }

  return { themeFromFirestore, loading, saveSiteTheme, isFirestoreAvailable }
}
