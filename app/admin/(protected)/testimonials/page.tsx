'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { Plus, Pencil, Trash2, X, Save, Star } from 'lucide-react'
import type { Testimonial } from '@/lib/types'

const emptyTestimonial = {
  name: '',
  role: '',
  company: '',
  content: '',
  rating: 5,
  sort_order: 0,
}

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [form, setForm] = useState(emptyTestimonial)
  const [saving, setSaving] = useState(false)

  async function fetchData() {
    const res = await fetch('/api/admin/testimonials')
    if (res.ok) setItems(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [])

  function startCreate() { setIsNew(true); setEditing(null); setForm(emptyTestimonial) }

  function startEdit(t: Testimonial) {
    setIsNew(false); setEditing(t)
    setForm({ name: t.name, role: t.role, company: t.company, content: t.content, rating: t.rating, sort_order: t.sort_order })
  }

  function cancel() { setIsNew(false); setEditing(null) }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault(); setSaving(true)
    if (isNew) {
      await fetch('/api/admin/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    } else if (editing) {
      await fetch(`/api/admin/testimonials/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    }
    setSaving(false); cancel(); fetchData()
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer ?')) return
    await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' })
    fetchData()
  }

  if (loading) return <div className="text-text-muted">Chargement...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold text-text-primary">Temoignages ({items.length})</h1>
        <button onClick={startCreate} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-neon-violet to-neon-blue text-white text-sm font-medium min-h-[40px]">
          <Plus className="h-4 w-4" /> Ajouter
        </button>
      </div>

      {(isNew || editing) && (
        <form onSubmit={handleSubmit} className="glass rounded-xl p-6 mb-8 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-display font-semibold text-text-primary">{isNew ? 'Nouveau temoignage' : 'Modifier'}</h2>
            <button type="button" onClick={cancel} className="text-text-muted hover:text-text-primary"><X className="h-5 w-5" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nom" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-neon-violet/50" />
            <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Role/Poste" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-neon-violet/50" />
            <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Entreprise" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-neon-violet/50" />
          </div>
          <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Temoignage" rows={4} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-neon-violet/50 resize-none" />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((r) => (
                <button key={r} type="button" onClick={() => setForm({ ...form, rating: r })} className="p-0.5">
                  <Star className={`h-5 w-5 ${r <= form.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/10'}`} />
                </button>
              ))}
            </div>
            <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} placeholder="Ordre" className="w-24 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-neon-violet/50" />
          </div>
          <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-neon-violet to-neon-blue text-white text-sm font-medium disabled:opacity-50 min-h-[40px]">
            <Save className="h-4 w-4" /> {saving ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </form>
      )}

      <div className="space-y-2">
        {items.map((t) => (
          <div key={t.id} className="glass rounded-xl p-4 flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-text-primary text-sm">{t.name}</h3>
                <span className="text-xs text-text-muted">{t.role} — {t.company}</span>
              </div>
              <p className="text-xs text-text-muted mt-1 truncate">&ldquo;{t.content}&rdquo;</p>
              <div className="flex gap-0.5 mt-1">
                {[1,2,3,4,5].map((r) => <Star key={r} className={`h-3 w-3 ${r <= t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/10'}`} />)}
              </div>
            </div>
            <div className="flex gap-2 shrink-0 ml-4">
              <button onClick={() => startEdit(t)} className="h-8 w-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-text-muted hover:text-neon-violet" aria-label="Modifier"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => handleDelete(t.id)} className="h-8 w-8 rounded-lg hover:bg-red-400/10 flex items-center justify-center text-text-muted hover:text-red-400" aria-label="Supprimer"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
