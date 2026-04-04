'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react'
import type { PortfolioItem } from '@/lib/types'

const emptyItem = {
  title: '',
  description: '',
  image_url: '',
  category: 'Site Vitrine',
  technologies: [''],
  url: '',
  sort_order: 0,
}

const categories = ['Site Vitrine', 'Landing Page', 'E-commerce', 'Application Web']

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<PortfolioItem | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [form, setForm] = useState(emptyItem)
  const [saving, setSaving] = useState(false)

  async function fetchData() {
    const res = await fetch('/api/admin/portfolio')
    if (res.ok) setItems(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [])

  function startCreate() { setIsNew(true); setEditing(null); setForm(emptyItem) }

  function startEdit(item: PortfolioItem) {
    setIsNew(false)
    setEditing(item)
    setForm({
      title: item.title,
      description: item.description,
      image_url: item.image_url,
      category: item.category,
      technologies: item.technologies.length > 0 ? item.technologies : [''],
      url: item.url,
      sort_order: item.sort_order,
    })
  }

  function cancel() { setIsNew(false); setEditing(null) }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    const body = { ...form, technologies: form.technologies.filter((t) => t.trim()) }

    if (isNew) {
      await fetch('/api/admin/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    } else if (editing) {
      await fetch(`/api/admin/portfolio/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    }

    setSaving(false); cancel(); fetchData()
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer ce projet ?')) return
    await fetch(`/api/admin/portfolio/${id}`, { method: 'DELETE' })
    fetchData()
  }

  if (loading) return <div className="text-text-muted">Chargement...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold text-text-primary">Portfolio ({items.length})</h1>
        <button onClick={startCreate} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-neon-violet to-neon-blue text-white text-sm font-medium min-h-[40px]">
          <Plus className="h-4 w-4" /> Ajouter
        </button>
      </div>

      {(isNew || editing) && (
        <form onSubmit={handleSubmit} className="glass rounded-xl p-6 mb-8 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-display font-semibold text-text-primary">{isNew ? 'Nouveau projet' : 'Modifier'}</h2>
            <button type="button" onClick={cancel} className="text-text-muted hover:text-text-primary"><X className="h-5 w-5" /></button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Titre" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-neon-violet/50" />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-neon-violet/50">
              {categories.map((c) => <option key={c} value={c} className="bg-bg-card">{c}</option>)}
            </select>
          </div>

          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-neon-violet/50 resize-none" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="URL de l'image" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-neon-violet/50" />
            <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="URL du projet" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-neon-violet/50" />
          </div>

          <div>
            <p className="text-xs text-text-muted mb-2">Technologies</p>
            {form.technologies.map((t, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={t} onChange={(e) => { const techs = [...form.technologies]; techs[i] = e.target.value; setForm({ ...form, technologies: techs }) }} placeholder={`Tech ${i + 1}`} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-text-primary outline-none focus:border-neon-violet/50" />
                {form.technologies.length > 1 && <button type="button" onClick={() => setForm({ ...form, technologies: form.technologies.filter((_, j) => j !== i) })} className="text-text-muted hover:text-red-400"><X className="h-4 w-4" /></button>}
              </div>
            ))}
            <button type="button" onClick={() => setForm({ ...form, technologies: [...form.technologies, ''] })} className="text-xs text-neon-violet hover:text-neon-blue">+ Ajouter</button>
          </div>

          <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} placeholder="Ordre" className="w-32 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-neon-violet/50" />

          <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-neon-violet to-neon-blue text-white text-sm font-medium disabled:opacity-50 min-h-[40px]">
            <Save className="h-4 w-4" /> {saving ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </form>
      )}

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="glass rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-text-primary text-sm">{item.title}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-neon-violet/10 text-neon-violet">{item.category}</span>
              </div>
              <p className="text-xs text-text-muted mt-0.5">{item.description}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => startEdit(item)} className="h-8 w-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-text-muted hover:text-neon-violet transition-colors" aria-label="Modifier"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => handleDelete(item.id)} className="h-8 w-8 rounded-lg hover:bg-red-400/10 flex items-center justify-center text-text-muted hover:text-red-400 transition-colors" aria-label="Supprimer"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
