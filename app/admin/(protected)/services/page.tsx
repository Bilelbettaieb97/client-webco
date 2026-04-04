'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react'
import type { Service } from '@/lib/types'

const emptyService = {
  title: '',
  description: '',
  icon: 'Code',
  features: [''],
  price: '',
  sort_order: 0,
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Service | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [form, setForm] = useState(emptyService)
  const [saving, setSaving] = useState(false)

  async function fetchData() {
    const res = await fetch('/api/admin/services')
    if (res.ok) setServices(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [])

  function startCreate() {
    setIsNew(true)
    setEditing(null)
    setForm(emptyService)
  }

  function startEdit(s: Service) {
    setIsNew(false)
    setEditing(s)
    setForm({
      title: s.title,
      description: s.description,
      icon: s.icon,
      features: s.features.length > 0 ? s.features : [''],
      price: s.price,
      sort_order: s.sort_order,
    })
  }

  function cancel() {
    setIsNew(false)
    setEditing(null)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    const body = { ...form, features: form.features.filter((f) => f.trim()) }

    if (isNew) {
      await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    } else if (editing) {
      await fetch(`/api/admin/services/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    }

    setSaving(false)
    cancel()
    fetchData()
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer ce service ?')) return
    await fetch(`/api/admin/services/${id}`, { method: 'DELETE' })
    fetchData()
  }

  if (loading) return <div className="text-text-muted">Chargement...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold text-text-primary">
          Services ({services.length})
        </h1>
        <button
          onClick={startCreate}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-neon-violet to-neon-blue text-white text-sm font-medium hover:shadow-lg transition-all min-h-[40px]"
        >
          <Plus className="h-4 w-4" /> Ajouter
        </button>
      </div>

      {/* Form */}
      {(isNew || editing) && (
        <form onSubmit={handleSubmit} className="glass rounded-xl p-6 mb-8 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-display font-semibold text-text-primary">
              {isNew ? 'Nouveau service' : 'Modifier le service'}
            </h2>
            <button type="button" onClick={cancel} className="text-text-muted hover:text-text-primary">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Titre"
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-neon-violet/50"
            />
            <input
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              placeholder="Icone (Globe, Rocket, ShoppingCart, Code...)"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-neon-violet/50"
            />
          </div>

          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Description"
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-neon-violet/50 resize-none"
          />

          <div>
            <p className="text-xs text-text-muted mb-2">Fonctionnalites</p>
            {form.features.map((f, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={f}
                  onChange={(e) => {
                    const features = [...form.features]
                    features[i] = e.target.value
                    setForm({ ...form, features })
                  }}
                  placeholder={`Fonctionnalite ${i + 1}`}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-text-primary outline-none focus:border-neon-violet/50"
                />
                {form.features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, features: form.features.filter((_, j) => j !== i) })}
                    className="text-text-muted hover:text-red-400"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => setForm({ ...form, features: [...form.features, ''] })}
              className="text-xs text-neon-violet hover:text-neon-blue"
            >
              + Ajouter une fonctionnalite
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="Prix (ex: A partir de 3 000 EUR)"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-neon-violet/50"
            />
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
              placeholder="Ordre"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-neon-violet/50"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-neon-violet to-neon-blue text-white text-sm font-medium disabled:opacity-50 min-h-[40px]"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </form>
      )}

      {/* List */}
      <div className="space-y-2">
        {services.map((s) => (
          <div key={s.id} className="glass rounded-xl p-4 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-text-primary text-sm">{s.title}</h3>
              <p className="text-xs text-text-muted mt-0.5">{s.description}</p>
              <p className="text-xs text-neon-violet mt-1">{s.price}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => startEdit(s)}
                className="h-8 w-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-text-muted hover:text-neon-violet transition-colors"
                aria-label="Modifier"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(s.id)}
                className="h-8 w-8 rounded-lg hover:bg-red-400/10 flex items-center justify-center text-text-muted hover:text-red-400 transition-colors"
                aria-label="Supprimer"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
