import { create } from "zustand"

export interface ColorPalette {
  primary: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  accent: string
  accentForeground: string
  background: string
  foreground: string
  card: string
  cardForeground: string
  muted: string
  mutedForeground: string
  border: string
  success: string
  warning: string
  destructive: string
  highlight: string
}

export type BackgroundType =
  | "gradient-dark"
  | "gradient-mesh"
  | "gradient-sunset"
  | "gradient-ocean"
  | "gradient-forest"
  | "gradient-purple"
  | "particles"
  | "grid"
  | "solid-dark"
  | "solid-card"
  | "stars"
  | "abstract"

export interface ThemeConfig {
  colors: ColorPalette
  background: BackgroundType
  effects: { particles: boolean; orbs: boolean; grid: boolean; glass: boolean }
  typography: { fontDisplay: string; fontBody: string }
}

const DEFAULT_COLORS: ColorPalette = {
  primary: "#0ea5e9",
  primaryForeground: "#ffffff",
  secondary: "#1f1f3a",
  secondaryForeground: "#7dd3fc",
  accent: "#0c4a6e",
  accentForeground: "#38bdf8",
  background: "#0d0d1a",
  foreground: "#e8e8f0",
  card: "#161627",
  cardForeground: "#e8e8f0",
  muted: "#1a1a30",
  mutedForeground: "#8888a8",
  border: "#1e1e3a",
  success: "#10b981",
  warning: "#f59e0b",
  destructive: "#ef4444",
  highlight: "#06b6d4",
}

const PRESET_THEMES: { name: string; colors: Partial<ColorPalette> }[] = [
  { name: "Océano", colors: { primary: "#0ea5e9", highlight: "#06b6d4", background: "#0d0d1a" } },
  { name: "Atardecer", colors: { primary: "#f97316", highlight: "#ec4899", background: "#0d0d1a" } },
  { name: "Naturaleza", colors: { primary: "#10b981", highlight: "#22c55e", background: "#0a1a0a" } },
  { name: "Noche", colors: { primary: "#7c3aed", highlight: "#a78bfa", background: "#050510" } },
  { name: "Minimalista", colors: { primary: "#ffffff", highlight: "#a0a0a0", background: "#000000" } },
]

interface ThemeStore {
  config: ThemeConfig
  setConfig: (config: Partial<ThemeConfig>) => void
  setColors: (colors: Partial<ColorPalette>) => void
  setBackground: (background: BackgroundType) => void
  setEffects: (effects: Partial<ThemeConfig["effects"]>) => void
  applyPreset: (presetIndex: number) => void
  resetTheme: () => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
  config: {
    colors: DEFAULT_COLORS,
    background: "gradient-dark",
    effects: { particles: true, orbs: true, grid: true, glass: true },
    typography: { fontDisplay: "Playfair Display", fontBody: "Inter" },
  },
  setConfig: (newConfig) => set((state) => ({ config: { ...state.config, ...newConfig } })),
  setColors: (colors) => set((state) => ({ config: { ...state.config, colors: { ...state.config.colors, ...colors } } })),
  setBackground: (background) => set((state) => ({ config: { ...state.config, background } })),
  setEffects: (effects) => set((state) => ({ config: { ...state.config, effects: { ...state.config.effects, ...effects } } })),
  applyPreset: (presetIndex) => {
    const preset = PRESET_THEMES[presetIndex]
    if (preset) set((state) => ({ config: { ...state.config, colors: { ...state.config.colors, ...preset.colors } } }))
  },
  resetTheme: () => set({
    config: {
      colors: DEFAULT_COLORS,
      background: "gradient-dark",
      effects: { particles: true, orbs: true, grid: true, glass: true },
      typography: { fontDisplay: "Playfair Display", fontBody: "Inter" },
    },
  }),
}))

export { PRESET_THEMES, DEFAULT_COLORS }
