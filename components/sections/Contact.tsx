"use client"

import { useState, type FormEvent } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { SpotlightCard } from "@/components/ui/SpotlightCard"
import type { ContactInfo } from "@/lib/types"

interface ContactProps {
  data: ContactInfo
}

const projectTypes = [
  "Site Vitrine",
  "Landing Page",
  "E-commerce",
  "Application Web",
  "Refonte de site",
  "Autre",
]

const budgets = [
  "< 2 000 EUR",
  "2 000 - 5 000 EUR",
  "5 000 - 10 000 EUR",
  "10 000 - 20 000 EUR",
  "> 20 000 EUR",
]

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
      phone: (formData.get("phone") as string) || undefined,
      company: (formData.get("company") as string) || undefined,
      project_type: (formData.get("project_type") as string) || undefined,
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

  const contactItems = [
    { icon: Mail, label: "Email", value: data.email, href: `mailto:${data.email}` },
    { icon: Phone, label: "Telephone", value: data.phone, href: `tel:${data.phone.replace(/\s/g, "")}` },
    { icon: MapPin, label: "Adresse", value: data.address, href: undefined },
  ]

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-bg bg-grid" aria-label="Contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Contact"
          title="Parlons de votre projet"
          subtitle="Decrivez-nous votre besoin et nous vous repondrons sous 24 heures avec une proposition personnalisee."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form — 3 cols */}
          <div className="lg:col-span-3">
            <SpotlightCard className="p-6 sm:p-8">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle2 size={48} className="mx-auto text-green-400 mb-4" />
                  <h3 className="text-xl font-display font-bold text-text mb-2">
                    Message envoye !
                  </h3>
                  <p className="text-text-muted">
                    Merci pour votre message. Nous vous repondrons dans les 24 heures.
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-text mb-1.5">
                        Nom complet *
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
                        Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        aria-required="true"
                        className="w-full px-4 py-3 text-sm rounded-lg bg-zinc-800/50 border border-zinc-700 text-text placeholder:text-text-muted/50 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                        placeholder="jean@exemple.fr"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-text mb-1.5">
                        Telephone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="w-full px-4 py-3 text-sm rounded-lg bg-zinc-800/50 border border-zinc-700 text-text placeholder:text-text-muted/50 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                        placeholder="+33 6 12 34 56 78"
                      />
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
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="project_type" className="block text-sm font-medium text-text mb-1.5">
                        Type de projet
                      </label>
                      <select
                        id="project_type"
                        name="project_type"
                        className="w-full px-4 py-3 text-sm rounded-lg bg-zinc-800/50 border border-zinc-700 text-text focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors cursor-pointer"
                      >
                        <option value="">Selectionnez...</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-text mb-1.5">
                        Budget
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        className="w-full px-4 py-3 text-sm rounded-lg bg-zinc-800/50 border border-zinc-700 text-text focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors cursor-pointer"
                      >
                        <option value="">Selectionnez...</option>
                        {budgets.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text mb-1.5">
                      Votre message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      aria-required="true"
                      rows={5}
                      className="w-full px-4 py-3 text-sm rounded-lg bg-zinc-800/50 border border-zinc-700 text-text placeholder:text-text-muted/50 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-none"
                      placeholder="Decrivez votre projet, vos objectifs, votre calendrier..."
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
                        Envoyer le message
                      </>
                    )}
                  </button>
                </form>
              )}
            </SpotlightCard>
          </div>

          {/* Info — 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            {contactItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <SpotlightCard className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-text-muted mb-1">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-text hover:text-accent transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-text">{item.value}</p>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}

            {/* Social links */}
            {data.socials && data.socials.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <SpotlightCard className="p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-text-muted mb-3">
                    Reseaux sociaux
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {data.socials.map((social) => (
                      <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-sm rounded-lg bg-zinc-800/50 text-text-muted hover:text-accent hover:bg-zinc-800 transition-all duration-200 cursor-pointer min-h-[44px] flex items-center"
                        aria-label={social.platform}
                      >
                        {social.platform}
                      </a>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
