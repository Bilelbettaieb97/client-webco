"use client"

import { useState, type FormEvent } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Mail, Send, CheckCircle2, AlertCircle } from "lucide-react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { SpotlightCard } from "@/components/ui/SpotlightCard"
import type { ContactInfo } from "@/lib/types"

interface ContactProps {
  data: ContactInfo
}

export function Contact({ data }: ContactProps) {
  const shouldReduce = useReducedMotion()
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    const formData = new FormData(e.currentTarget)
    const body = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: (formData.get("company") as string) || undefined,
      project_type: (formData.get("poste") as string) || undefined,
      budget: (formData.get("budget") as string) || undefined,
      message: formData.get("message") as string,
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const json = (await res.json()) as { error?: string }
        throw new Error(json.error || "Une erreur est survenue")
      }

      setStatus("success")
      ;(e.target as HTMLFormElement).reset()
    } catch (err) {
      setStatus("error")
      setErrorMessage(err instanceof Error ? err.message : "Une erreur est survenue")
    }
  }

  return (
    <section id="contact" className="relative py-20 sm:py-28 bg-bg bg-grid" aria-label="Contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Contact"
          title="Parlons de votre projet"
          subtitle="Décrivez votre besoin en quelques mots. On vous répond sous 24h avec une proposition personnalisée."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form -- 3 cols */}
          <div className="lg:col-span-3">
            <SpotlightCard className="p-6 sm:p-8 relative overflow-hidden">
              {/* Gradient top border */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                  >
                    <CheckCircle2 size={56} className="mx-auto text-green-400 mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-display font-bold text-text mb-2">
                    Merci ! Votre audit est en préparation.
                  </h3>
                  <p className="text-text-muted">
                    Vous recevrez une réponse personnalisée sous 24h.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 px-6 py-2 text-sm font-medium rounded-lg border border-zinc-700 text-text hover:border-accent/50 transition-colors cursor-pointer min-h-[44px]"
                  >
                    Envoyer un autre message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Promise above form */}
                  <p className="text-sm text-accent font-medium text-center">
                    Réponse personnalisée en moins de 24h
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-text mb-1.5">
                        Nom *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        aria-required="true"
                        className="w-full px-4 py-3 text-sm rounded-lg bg-zinc-800/50 border border-zinc-700 text-text placeholder:text-text-muted/50 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                        placeholder="Jean Dupont"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-text mb-1.5">
                        Email professionnel *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        aria-required="true"
                        className="w-full px-4 py-3 text-sm rounded-lg bg-zinc-800/50 border border-zinc-700 text-text placeholder:text-text-muted/50 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                        placeholder="jean@entreprise.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-text mb-1.5">
                      Entreprise
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      className="w-full px-4 py-3 text-sm rounded-lg bg-zinc-800/50 border border-zinc-700 text-text placeholder:text-text-muted/50 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                      placeholder="Nom de votre entreprise"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text mb-1.5">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      aria-required="true"
                      rows={4}
                      className="w-full px-4 py-3 text-sm rounded-lg bg-zinc-800/50 border border-zinc-700 text-text placeholder:text-text-muted/50 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-none"
                      placeholder="Décrivez votre projet en quelques mots : objectifs, audience cible, délais..."
                    />
                  </div>

                  {/* Error */}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3"
                      role="alert"
                    >
                      <AlertCircle size={16} />
                      {errorMessage}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-3.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-accent to-accent-blue text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 min-h-[44px]"
                  >
                    {status === "loading" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Obtenir mon audit gratuit
                      </>
                    )}
                  </button>

                  {/* Trust below form */}
                  <p className="text-xs text-text-muted text-center flex items-center justify-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    Vos données restent confidentielles. Zéro spam.
                  </p>
                </form>
              )}
            </SpotlightCard>
          </div>

          {/* Info -- 2 cols */}
          <div className="lg:col-span-2 space-y-6 pt-6 lg:pt-0 border-t border-zinc-800 lg:border-t-0">
            <motion.div
              initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <SpotlightCard className="p-5">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-text-muted mb-1">
                      Email
                    </p>
                    <a href={`mailto:${data.email}`} className="text-sm text-text hover:text-accent transition-colors">
                      {data.email}
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* Social links */}
            {data.socials && data.socials.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <SpotlightCard className="p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-text-muted mb-3">
                    Retrouvez-nous
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {data.socials.map((social) => (
                      <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-sm rounded-lg bg-zinc-800/50 text-text-muted hover:text-accent hover:bg-zinc-800 transition-all duration-300 cursor-pointer min-h-[44px] flex items-center"
                        aria-label={social.platform}
                      >
                        {social.platform}
                      </a>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            )}

            {/* Trust */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <SpotlightCard className="p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-text-muted mb-3">
                  Garanties
                </p>
                <ul className="space-y-2 text-sm text-text-muted">
                  <li>Réponse sous 24h</li>
                  <li>Appel stratégique gratuit</li>
                  <li>Sans engagement</li>
                  <li>+200 projets B2B livrés</li>
                </ul>
              </SpotlightCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
