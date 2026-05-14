import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function LoginPage() {
  const { signIn, signUp, signInWithGoogle, resetPassword } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<"login" | "register">("login")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [resetSent, setResetSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      if (mode === "login") {
        await signIn(email, password)
      } else {
        await signUp(name, email, password)
      }
      navigate("/")
    } catch (err: any) {
      setError(err.message || "Error de autenticación")
    }
  }

  const handleGoogle = async () => {
    try {
      await signInWithGoogle()
      navigate("/")
    } catch { setError("Error al iniciar con Google") }
  }

  const handleReset = async () => {
    try { await resetPassword(email); setResetSent(true) } catch { setError("Error al enviar reset") }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <Card className="max-w-md w-full border-primary/20">
        <CardHeader className="text-center">
          <div className="w-12 h-12 rounded-xl overflow-hidden mx-auto mb-4 shadow-lg shadow-primary/25 ring-2 ring-primary/20">
            <img src="/logo.jpeg" alt="SI VIAJES" className="w-full h-full object-cover" />
          </div>
          <CardTitle className="text-xl">{mode === "login" ? "Iniciar sesión" : "Crear cuenta"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === "register" && (
              <Input placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} required />
            )}
            <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <Input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
            <Button type="submit" className="w-full">{mode === "login" ? "Ingresar" : "Registrarse"}</Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-primary/10" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-card px-2 text-muted-foreground">o</span></div>
          </div>

          <Button variant="outline" className="w-full" onClick={handleGoogle}>
            <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continuar con Google
          </Button>

          {mode === "login" && (
            <button onClick={handleReset} className="text-xs text-primary hover:underline w-full text-center">
              {resetSent ? "Email de recuperación enviado" : "¿Olvidaste tu contraseña?"}
            </button>
          )}

          {error && <p className="text-xs text-destructive text-center">{error}</p>}

          <p className="text-xs text-muted-foreground text-center">
            {mode === "login" ? "¿No tenés cuenta?" : "¿Ya tenés cuenta?"}{" "}
            <button onClick={() => setMode(mode === "login" ? "register" : "login")} className="text-primary hover:underline">
              {mode === "login" ? "Registrate" : "Iniciar sesión"}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
