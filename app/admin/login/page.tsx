'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? 'Erreur de connexion')
        setLoading(false)
        return
      }

      router.push('/admin')
      router.refresh()
    } catch {
      setError('Erreur de connexion')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-neon-violet to-neon-blue flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-display font-bold text-lg">W</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-text-primary">
            Espace Administration
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            Connectez-vous pour gerer votre site
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-text-muted mb-1.5"
            >
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-text-primary focus:border-neon-violet/50 focus:ring-1 focus:ring-neon-violet/50 transition-colors outline-none"
              placeholder="Entrez le mot de passe"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-neon-violet to-neon-blue text-white font-display font-semibold py-3 rounded-xl transition-all hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] disabled:opacity-50 min-h-[44px]"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
}
