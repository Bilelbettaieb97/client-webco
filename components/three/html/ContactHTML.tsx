'use client'

import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Link2, ExternalLink, Globe } from 'lucide-react'
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

interface ContactHTMLProps {
  data: ContactInfo
}

export function ContactHTML({ data }: ContactHTMLProps) {
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
        const resData = await res.json()
        throw new Error(resData.error || 'Une erreur est survenue')
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
    <div
      style={{ position: 'absolute', top: '600vh', left: 0, width: '100%', height: '100vh' }}
      className="pointer-events-none"
    >
      <div className="flex flex-col justify-center h-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gradient"
          >
            Parlons de votre projet
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 text-lg text-text-muted max-w-2xl mx-auto"
          >
            Decrivez-nous votre besoin et recevez une proposition detaillee sous 48h.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 max-w-6xl mx-auto w-full">
          {/* Form */}
          <div className="lg:col-span-3 pointer-events-auto">
            {status === 'success' ? (
              <motion.div
                className="backdrop-blur-xl bg-white/[0.04] border border-white/10 rounded-2xl p-10 text-center"
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
              <form
                onSubmit={handleSubmit}
                className="backdrop-blur-xl bg-white/[0.04] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-text-muted mb-1">
                      Nom complet *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      aria-required="true"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-text-primary placeholder-text-muted/50 focus:border-neon-violet/50 focus:ring-1 focus:ring-neon-violet/50 transition-colors outline-none"
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-text-muted mb-1">
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      aria-required="true"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-text-primary placeholder-text-muted/50 focus:border-neon-violet/50 focus:ring-1 focus:ring-neon-violet/50 transition-colors outline-none"
                      placeholder="jean@entreprise.fr"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-medium text-text-muted mb-1">
                      Telephone
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-text-primary placeholder-text-muted/50 focus:border-neon-violet/50 focus:ring-1 focus:ring-neon-violet/50 transition-colors outline-none"
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-company" className="block text-xs font-medium text-text-muted mb-1">
                      Entreprise
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-text-primary placeholder-text-muted/50 focus:border-neon-violet/50 focus:ring-1 focus:ring-neon-violet/50 transition-colors outline-none"
                      placeholder="Nom de votre entreprise"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-type" className="block text-xs font-medium text-text-muted mb-1">
                      Type de projet
                    </label>
                    <select
                      id="contact-type"
                      name="project_type"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-text-primary focus:border-neon-violet/50 focus:ring-1 focus:ring-neon-violet/50 transition-colors outline-none appearance-none"
                    >
                      <option value="">Selectionnez</option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t} className="bg-[#0a0a1a] text-text-primary">
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contact-budget" className="block text-xs font-medium text-text-muted mb-1">
                      Budget
                    </label>
                    <select
                      id="contact-budget"
                      name="budget"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-text-primary focus:border-neon-violet/50 focus:ring-1 focus:ring-neon-violet/50 transition-colors outline-none appearance-none"
                    >
                      <option value="">Selectionnez</option>
                      {budgets.map((b) => (
                        <option key={b} value={b} className="bg-[#0a0a1a] text-text-primary">
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-text-muted mb-1">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    aria-required="true"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-text-primary placeholder-text-muted/50 focus:border-neon-violet/50 focus:ring-1 focus:ring-neon-violet/50 transition-colors outline-none resize-none"
                    placeholder="Decrivez votre projet..."
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 text-sm" role="alert">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-display font-semibold text-sm tracking-wide bg-gradient-to-r from-neon-violet to-neon-blue text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:scale-105 transition-all duration-300 min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    'Envoi en cours...'
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Envoyer le message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="lg:col-span-2 space-y-4 pointer-events-auto">
            {contactInfo.map((item) => (
              <div key={item.label} className="backdrop-blur-xl bg-white/[0.04] border border-white/10 rounded-2xl p-4 flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-neon-violet/10 flex items-center justify-center">
                  <item.icon className="h-4 w-4 text-neon-violet" />
                </div>
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider">{item.label}</p>
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
            <div className="backdrop-blur-xl bg-white/[0.04] border border-white/10 rounded-2xl p-4">
              <p className="text-[10px] text-text-muted uppercase tracking-wider mb-3">Suivez-nous</p>
              <div className="flex gap-2">
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

            <div className="backdrop-blur-xl bg-white/[0.04] border border-white/10 rounded-2xl p-4">
              <p className="text-sm text-text-muted leading-relaxed">
                Reponse garantie sous <span className="text-text-primary font-semibold">48h</span>.
                Devis detaille et gratuit pour chaque projet.
              </p>
            </div>

            {/* Footer info */}
            <div className="pt-4 border-t border-white/5 text-center">
              <p className="text-xs text-text-muted">
                &copy; {new Date().getFullYear()} Webco. Tous droits reserves.
              </p>
              <p className="text-xs text-text-muted mt-1">
                Concu avec passion a Paris
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
