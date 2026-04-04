'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { Save, CheckCircle2 } from 'lucide-react'

interface SettingRow {
  id?: string
  key: string
  value: string
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SettingRow[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [notificationEmail, setNotificationEmail] = useState('')

  async function fetchData() {
    const res = await fetch('/api/admin/settings')
    if (res.ok) {
      const data: SettingRow[] = await res.json()
      setSettings(data)
      const emailSetting = data.find((s) => s.key === 'notification_email')
      if (emailSetting) setNotificationEmail(emailSetting.value)
    }
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'notification_email', value: notificationEmail }),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (loading) return <div className="text-text-muted">Chargement...</div>

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-text-primary mb-8">
        Parametres
      </h1>

      <form onSubmit={handleSubmit} className="glass rounded-xl p-6 space-y-6 max-w-xl">
        <div>
          <h2 className="font-display font-semibold text-text-primary mb-4">
            Notifications
          </h2>
          <div>
            <label htmlFor="notification_email" className="block text-sm text-text-muted mb-1.5">
              Email de notification
            </label>
            <input
              id="notification_email"
              type="email"
              value={notificationEmail}
              onChange={(e) => setNotificationEmail(e.target.value)}
              placeholder="contact@webco.fr"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-neon-violet/50"
            />
            <p className="mt-1.5 text-xs text-text-muted">
              Les messages du formulaire de contact seront envoyes a cette adresse.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-neon-violet to-neon-blue text-white text-sm font-medium disabled:opacity-50 min-h-[40px]"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Enregistrement...' : 'Enregistrer'}
          </button>
          {saved && (
            <span className="flex items-center gap-1 text-sm text-green-400">
              <CheckCircle2 className="h-4 w-4" /> Parametres enregistres
            </span>
          )}
        </div>
      </form>
    </div>
  )
}
