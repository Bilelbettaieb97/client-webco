'use client'

import { useEffect, useState } from 'react'
import { Mail, MailOpen, Eye, Trash2 } from 'lucide-react'
import type { Contact } from '@/lib/types'

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Contact | null>(null)

  async function fetchContacts() {
    const res = await fetch('/api/admin/contacts')
    if (res.ok) {
      const data = await res.json()
      setContacts(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  async function markRead(id: string) {
    await fetch(`/api/admin/contacts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_read: true }),
    })
    fetchContacts()
  }

  async function deleteContact(id: string) {
    if (!confirm('Supprimer ce message ?')) return
    await fetch(`/api/admin/contacts/${id}`, { method: 'DELETE' })
    setSelected(null)
    fetchContacts()
  }

  if (loading) {
    return <div className="text-text-muted">Chargement...</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-text-primary mb-8">
        Messages ({contacts.length})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-2 space-y-2">
          {contacts.length === 0 ? (
            <div className="glass rounded-xl p-8 text-center text-text-muted">
              Aucun message recu
            </div>
          ) : (
            contacts.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelected(c)
                  if (!c.is_read) markRead(c.id)
                }}
                className={`w-full text-left glass rounded-xl p-4 flex items-start gap-4 transition-colors hover:bg-white/[0.04] ${
                  selected?.id === c.id ? 'border-neon-violet/40' : ''
                }`}
              >
                <div className="shrink-0 mt-1">
                  {c.is_read ? (
                    <MailOpen className="h-4 w-4 text-text-muted" />
                  ) : (
                    <Mail className="h-4 w-4 text-neon-violet" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${c.is_read ? 'text-text-muted' : 'text-text-primary'}`}>
                      {c.name}
                    </span>
                    {!c.is_read && (
                      <span className="h-2 w-2 rounded-full bg-neon-violet shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-text-muted truncate">{c.email}</p>
                  <p className="text-xs text-text-muted truncate mt-1">{c.message}</p>
                  <p className="text-[10px] text-text-muted mt-1">
                    {new Date(c.created_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Detail */}
        <div>
          {selected ? (
            <div className="glass rounded-xl p-6 space-y-4 sticky top-8">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-semibold text-text-primary">
                  {selected.name}
                </h2>
                <button
                  onClick={() => deleteContact(selected.id)}
                  className="h-8 w-8 rounded-lg hover:bg-red-400/10 flex items-center justify-center text-text-muted hover:text-red-400 transition-colors"
                  aria-label="Supprimer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-text-muted">Email:</span>{' '}
                  <a href={`mailto:${selected.email}`} className="text-neon-violet">
                    {selected.email}
                  </a>
                </p>
                {selected.phone && (
                  <p>
                    <span className="text-text-muted">Tel:</span>{' '}
                    <span className="text-text-primary">{selected.phone}</span>
                  </p>
                )}
                {selected.company && (
                  <p>
                    <span className="text-text-muted">Entreprise:</span>{' '}
                    <span className="text-text-primary">{selected.company}</span>
                  </p>
                )}
                {selected.project_type && (
                  <p>
                    <span className="text-text-muted">Projet:</span>{' '}
                    <span className="text-text-primary">{selected.project_type}</span>
                  </p>
                )}
                {selected.budget && (
                  <p>
                    <span className="text-text-muted">Budget:</span>{' '}
                    <span className="text-text-primary">{selected.budget}</span>
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-white/5">
                <p className="text-xs text-text-muted uppercase tracking-wider mb-2">
                  Message
                </p>
                <p className="text-sm text-text-primary whitespace-pre-wrap leading-relaxed">
                  {selected.message}
                </p>
              </div>
            </div>
          ) : (
            <div className="glass rounded-xl p-8 text-center">
              <Eye className="h-8 w-8 text-text-muted mx-auto mb-2" />
              <p className="text-sm text-text-muted">
                Selectionnez un message pour voir les details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
