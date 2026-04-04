'use client'

import { useState, type FormEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Link2, ExternalLink, Globe } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { NeonButton } from '@/components/ui/NeonButton'
import type { ContactInfo } from '@/lib/types'

const projectTypes = [
  'Site Vitrine',
  'Landing Page',
  'E-commerce',
  'Application Web',
  'Refonte de site',
  'Autre',
]

const budgets = [
  'Moins de 2 000 EUR',
  '2 000 - 5 000 EUR',
  '5 000 - 10 000 EUR',
  'Plus de 10 000 EUR',
]

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LinkedIn: Link2,
  Twitter: ExternalLink,
  GitHub: Globe,
}

interface ContactProps {
  data: ContactInfo
}

export function Contact({ data }: ContactProps) {
  const shouldReduce = useReducedMotion()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const form = new FormData(e.currentTarget)
    const body = {
      name: form.get('name') as string,
      email: form.get('email') as string,
      phone: form.get('phone') as string,
      company: form.get('company') as string,
      project_type: form.get('project_type') as string,
      budget: form.get('budget') as string,
      message: form.get('message') as string,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Une erreur est survenue')
      }

      setStatus('success')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Erreur serveur')
      setStatus('error')
    }
  }

  const contactInfo = [
    { icon: Mail, label: 'Email', value: data.email, href: `mailto:${data.email}` },
    { icon: Phone, label: 'Telephone', value: data.phone, href: `tel:${data.phone}` },
    { icon: MapPin, label: 'Adresse', value: data.address, href: undefined },
  ]

  return (
    <section id="contact" className="py-24 sm:py-32 relative" aria-label="Contact">
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Parlons de votre projet"
          subtitle="Decrivez-nous votre besoin et recevez une proposition detaillee sous 48h."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: shouldReduce ? 0 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {status === 'success' ? (
              <motion.div
                className="glass rounded-2xl p-12 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle2 className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-display font-semibold text-text-primary">
                  Message envoye !
                </h3>
                <p className="mt-2 text-text-muted">
                  Merci pour votre message. Nous vous recontacterons sous 48h.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-sm text-neon-violet hover:text-neon-blue transition-colors"
                >
                  Envoyer un autre message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-muted mb-1.5">
                      Nom complet *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      aria-required="true"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-muted/50 focus:border-neon-violet/50 focus:ring-1 focus:ring-neon-violet/50 transition-colors outline-none"
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-muted mb-1.5">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      aria-required="true"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-muted/50 focus:border-neon-violet/50 focus:ring-1 focus:ring-neon-violet/50 transition-colors outline-none"
                      placeholder="jean@entreprise.fr"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-text-muted mb-1.5">
                      Telephone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-muted/50 focus:border-neon-violet/50 focus:ring-1 focus:ring-neon-violet/50 transition-colors outline-none"
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-text-muted mb-1.5">
                      Entreprise
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-muted/50 focus:border-neon-violet/50 focus:ring-1 focus:ring-neon-violet/50 transition-colors outline-none"
                      placeholder="Nom de votre entreprise"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="project_type" className="block text-sm font-medium text-text-muted mb-1.5">
                      Type de projet
                    </label>
                    <select
                      id="project_type"
                      name="project_type"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-text-primary focus:border-neon-violet/50 focus:ring-1 focus:ring-neon-violet/50 transition-colors outline-none appearance-none"
                    >
                      <option value="">Selectionnez</option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t} className="bg-bg-card text-text-primary">
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-text-muted mb-1.5">
                      Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-text-primary focus:border-neon-violet/50 focus:ring-1 focus:ring-neon-violet/50 transition-colors outline-none appearance-none"
                    >
                      <option value="">Selectionnez</option>
                      {budgets.map((b) => (
                        <option key={b} value={b} className="bg-bg-card text-text-primary">
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-muted mb-1.5">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    aria-required="true"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-muted/50 focus:border-neon-violet/50 focus:ring-1 focus:ring-neon-violet/50 transition-colors outline-none resize-none"
                    placeholder="Decrivez votre projet, vos objectifs, vos delais..."
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 text-sm" role="alert">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {errorMsg}
                  </div>
                )}

                <NeonButton
                  type="submit"
                  variant="primary"
                  disabled={status === 'loading'}
                  className="w-full sm:w-auto"
                >
                  {status === 'loading' ? (
                    'Envoi en cours...'
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Envoyer le message
                    </>
                  )}
                </NeonButton>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: shouldReduce ? 0 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {contactInfo.map((item) => (
              <div key={item.label} className="glass rounded-2xl p-6 flex items-center gap-4">
                <div className="h-12 w-12 shrink-0 rounded-xl bg-neon-violet/10 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-neon-violet" />
                </div>
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm font-medium text-text-primary hover:text-neon-violet transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-text-primary">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Socials */}
            <div className="glass rounded-2xl p-6">
              <p className="text-xs text-text-muted uppercase tracking-wider mb-4">
                Suivez-nous
              </p>
              <div className="flex gap-3">
                {data.socials.map((social) => {
                  const Icon = socialIconMap[social.platform] || Globe
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-neon-violet hover:border-neon-violet/30 transition-colors"
                      aria-label={social.platform}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Quick info */}
            <div className="glass rounded-2xl p-6">
              <p className="text-sm text-text-muted leading-relaxed">
                Reponse garantie sous <span className="text-text-primary font-semibold">48h</span>.
                Devis detaille et gratuit pour chaque projet.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
