'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { Plus, Pencil, Trash2, X, Save, Check } from 'lucide-react'
import type { PricingPlan } from '@/lib/types'

const emptyPlan = {
  name: '',
  price: '',
  description: '',
  features: [''],
  is_popular: false,
  sort_order: 0,
}

export default function AdminPricingPage() {
  const [items, setItems] = useState<PricingPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<PricingPlan | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [form, setForm] = useState(emptyPlan)
  const [saving, setSaving] = useState(false)

  async function fetchData() {
    const res = await fetch('/api/admin/pricing')
    if (res.ok) setItems(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [])

  function startCreate() { setIsNew(true); setEditing(null); setForm(emptyPlan) }
  function startEdit(p: PricingPlan) {
    setIsNew(false); setEditing(p)
    setForm({ name: p.name, price: p.price, description: p.description, features: p.features.length > 0 ? p.features : [''], is_popular: p.is_popular, sort_order: p.sort_order })
  }
  function cancel() { setIsNew(false); setEditing(null) }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault(); setSaving(true)
    const body = { ...form, features: form.features.filter((f) => f.trim()) }
    if (isNew) {
      await fetch('/api/admin/pricing', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    } else if (editing) {
      await fetch(`/api/admin/pricing/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    }
    setSaving(false); cancel(); fetchData()
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer ?')) return
    await fetch(`/api/admin/pricing/${id}`, { method: 'DELETE' })
    fetchData()
  }

  if (loading) return <div className="text-text-muted">Chargement...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold text-text-primary">Tarifs ({items.length})</h1>
        <button onClick={startCreate} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-neon-violet to-neon-blue text-white text-sm font-medium min-h-[40px]">
          <Plus className="h-4 w-4" /> Ajouter
        </button>
      </div>

      {(isNew || editing) && (
        <form onSubmit={handleSubmit} className="glass rounded-xl p-6 mb-8 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-display font-semibold text-text-primary">{isNew ? 'Nouveau tarif' : 'Modifier'}</h2>
            <button type="button" onClick={cancel} className="text-text-muted hover:text-text-primary"><X className="h-5 w-5" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nom du plan" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-neon-violet/50" />
            <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Prix (ex: 3 500)" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-neon-violet/50" />
            <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} placeholder="Ordre" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-neon-violet/50" />
          </div>
          <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description courte" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-neon-violet/50" />

          <div>
            <p className="text-xs text-text-muted mb-2">Fonctionnalites incluses</p>
            {form.features.map((f, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={f} onChange={(e) => { const features = [...form.features]; features[i] = e.target.value; setForm({ ...form, features }) }} placeholder={`Fonctionnalite ${i + 1}`} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-text-primary outline-none focus:border-neon-violet/50" />
                {form.features.length > 1 && <button type="button" onClick={() => setForm({ ...form, features: form.features.filter((_, j) => j !== i) })} className="text-text-muted hover:text-red-400"><X className="h-4 w-4" /></button>}
              </div>
            ))}
            <button type="button" onClick={() => setForm({ ...form, features: [...form.features, ''] })} className="text-xs text-neon-violet hover:text-neon-blue">+ Ajouter</button>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.is_popular} onChange={(e) => setForm({ ...form, is_popular: e.target.checked })} className="sr-only peer" />
            <div className="h-5 w-5 rounded border border-white/10 bg-white/5 flex items-center justify-center peer-checked:bg-neon-violet peer-checked:border-neon-violet transition-colors">
              {form.is_popular && <Check className="h-3 w-3 text-white" />}
            </div>
            <span className="text-sm text-text-muted">Marquer comme populaire</span>
          </label>

          <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-neon-violet to-neon-blue text-white text-sm font-medium disabled:opacity-50 min-h-[40px]">
            <Save className="h-4 w-4" /> {saving ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </form>
      )}

      <div className="space-y-2">
        {items.map((p) => (
          <div key={p.id} className="glass rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-text-primary text-sm">{p.name}</h3>
                <span className="text-sm font-bold text-gradient">{p.price} EUR</span>
                {p.is_popular && <span className="text-[10px] px-2 py-0.5 rounded-full bg-neon-violet/20 text-neon-violet">Populaire</span>}
              </div>
              <p className="text-xs text-text-muted mt-0.5">{p.description}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => startEdit(p)} className="h-8 w-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-text-muted hover:text-neon-violet" aria-label="Modifier"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => handleDelete(p.id)} className="h-8 w-8 rounded-lg hover:bg-red-400/10 flex items-center justify-center text-text-muted hover:text-red-400" aria-label="Supprimer"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
