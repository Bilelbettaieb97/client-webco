'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { Save, CheckCircle2 } from 'lucide-react'

interface ContentSection {
  id?: string
  section: string
  content: Record<string, unknown>
}

const sectionLabels: Record<string, string> = {
  hero: 'Hero (Accueil)',
  about: 'A propos',
  contact_info: 'Informations de contact',
}

export default function AdminContentPage() {
  const [sections, setSections] = useState<ContentSection[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)

  async function fetchData() {
    const res = await fetch('/api/admin/content')
    if (res.ok) setSections(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [])

  async function handleSave(section: string, content: Record<string, unknown>) {
    setSaving(section)
    await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section, content }),
    })
    setSaving(null)
    setSaved(section)
    setTimeout(() => setSaved(null), 2000)
  }

  if (loading) return <div className="text-text-muted">Chargement...</div>

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-text-primary mb-8">
        Contenu du site
      </h1>

      <div className="space-y-8">
        {/* Hero */}
        <HeroEditor
          data={sections.find((s) => s.section === 'hero')?.content ?? {}}
          onSave={(content) => handleSave('hero', content)}
          saving={saving === 'hero'}
          saved={saved === 'hero'}
        />

        {/* About */}
        <AboutEditor
          data={sections.find((s) => s.section === 'about')?.content ?? {}}
          onSave={(content) => handleSave('about', content)}
          saving={saving === 'about'}
          saved={saved === 'about'}
        />

        {/* Contact Info */}
        <ContactInfoEditor
          data={sections.find((s) => s.section === 'contact_info')?.content ?? {}}
          onSave={(content) => handleSave('contact_info', content)}
          saving={saving === 'contact_info'}
          saved={saved === 'contact_info'}
        />
      </div>
    </div>
  )
}

function HeroEditor({ data, onSave, saving, saved }: { data: Record<string, unknown>; onSave: (c: Record<string, unknown>) => void; saving: boolean; saved: boolean }) {
  const [title, setTitle] = useState((data.title as string) || '')
  const [subtitle, setSubtitle] = useState((data.subtitle as string) || '')
  const [ctaPrimary, setCtaPrimary] = useState((data.cta_primary as string) || '')
  const [ctaSecondary, setCtaSecondary] = useState((data.cta_secondary as string) || '')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onSave({ title, subtitle, cta_primary: ctaPrimary, cta_secondary: ctaSecondary })
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-semibold text-text-primary">Hero (Accueil)</h2>
        {saved && <span className="flex items-center gap-1 text-xs text-green-400"><CheckCircle2 className="h-3 w-3" /> Enregistre</span>}
      </div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre principal" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-neon-violet/50" />
      <textarea value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Sous-titre" rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-neon-violet/50 resize-none" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input value={ctaPrimary} onChange={(e) => setCtaPrimary(e.target.value)} placeholder="Texte CTA principal" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-neon-violet/50" />
        <input value={ctaSecondary} onChange={(e) => setCtaSecondary(e.target.value)} placeholder="Texte CTA secondaire" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-neon-violet/50" />
      </div>
      <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-neon-violet to-neon-blue text-white text-sm font-medium disabled:opacity-50 min-h-[40px]">
        <Save className="h-4 w-4" /> {saving ? 'Enregistrement...' : 'Enregistrer'}
      </button>
    </form>
  )
}

function AboutEditor({ data, onSave, saving, saved }: { data: Record<string, unknown>; onSave: (c: Record<string, unknown>) => void; saving: boolean; saved: boolean }) {
  const [title, setTitle] = useState((data.title as string) || '')
  const [description, setDescription] = useState((data.description as string) || '')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onSave({ title, description, stats: data.stats || [] })
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-semibold text-text-primary">A propos</h2>
        {saved && <span className="flex items-center gap-1 text-xs text-green-400"><CheckCircle2 className="h-3 w-3" /> Enregistre</span>}
      </div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-neon-violet/50" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-neon-violet/50 resize-none" />
      <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-neon-violet to-neon-blue text-white text-sm font-medium disabled:opacity-50 min-h-[40px]">
        <Save className="h-4 w-4" /> {saving ? 'Enregistrement...' : 'Enregistrer'}
      </button>
    </form>
  )
}

function ContactInfoEditor({ data, onSave, saving, saved }: { data: Record<string, unknown>; onSave: (c: Record<string, unknown>) => void; saving: boolean; saved: boolean }) {
  const [email, setEmail] = useState((data.email as string) || '')
  const [phone, setPhone] = useState((data.phone as string) || '')
  const [address, setAddress] = useState((data.address as string) || '')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onSave({ email, phone, address, socials: data.socials || [] })
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-semibold text-text-primary">Informations de contact</h2>
        {saved && <span className="flex items-center gap-1 text-xs text-green-400"><CheckCircle2 className="h-3 w-3" /> Enregistre</span>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-neon-violet/50" />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Telephone" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-neon-violet/50" />
        <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Adresse" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-neon-violet/50" />
      </div>
      <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-neon-violet to-neon-blue text-white text-sm font-medium disabled:opacity-50 min-h-[40px]">
        <Save className="h-4 w-4" /> {saving ? 'Enregistrement...' : 'Enregistrer'}
      </button>
    </form>
  )
}
