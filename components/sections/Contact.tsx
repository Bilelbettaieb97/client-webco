"use client"

import React, { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Send, CheckCircle2, AlertCircle } from "lucide-react"
import type { ContactInfo } from "@/lib/types"

interface ContactProps {
  data: ContactInfo
}

export function Contact({ data }: ContactProps) {
  const shouldReduce = useReducedMotion()
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    const formData = new FormData(e.currentTarget)
    const body = {
      name: (formData.get("company") as string) || "Non renseigne",
      email: formData.get("email") as string,
      company: (formData.get("company") as string) || undefined,
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
    <section id="contact" className="relative py-24 sm:py-32 lg:py-40 bg-bg" aria-label="Contact">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top CTA area */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2
            className="text-huge text-gradient"
            initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Pret ?
          </motion.h2>
          <motion.p
            className="mt-4 text-sm sm:text-base text-text-muted"
            initial={shouldReduce ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Reponse personnalisee en moins de 24h.
          </motion.p>
          <motion.p
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-green-400"
            initial={shouldReduce ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <span className="pulsing-dot" />
            3 places disponibles
          </motion.p>
        </div>

        {/* Form */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="text-center py-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
              >
                <CheckCircle2 size={48} className="mx-auto text-green-400 mb-4" />
              </motion.div>
              <h3 className="text-xl font-display font-bold text-text mb-2">
                Message envoye.
              </h3>
              <p className="text-sm text-text-muted">
                Vous recevrez une reponse personnalisee sous 24h.
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
                  placeholder="vous@entreprise.com"
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
                  placeholder="Decrivez votre projet en quelques mots..."
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
                    Envoyer
                  </>
                )}
              </button>

              <p className="text-xs text-text-muted/50 text-center">
                {data.email} &middot; Sans engagement
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
