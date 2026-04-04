"use client"

import { motion, useReducedMotion } from "framer-motion"

export function CTAFinal() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden" aria-label="Appel a l'action">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-accent-blue/5 to-transparent" />
      <div className="absolute inset-0 bg-bg/80" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gradient leading-tight">
            Pret a multiplier vos conversions ?
          </h2>
          <p className="mt-6 text-base sm:text-lg text-text-muted leading-relaxed max-w-xl mx-auto">
            Reservez un appel strategique de 30 minutes. On analyse votre situation et on vous propose un plan d&apos;action.
          </p>

          <div className="mt-10">
            <a
              href="#contact"
              className="group relative inline-flex items-center px-10 py-4 text-base font-semibold rounded-lg bg-gradient-to-r from-accent to-accent-blue text-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-accent/25 cursor-pointer min-h-[44px]"
            >
              <span className="relative z-10">Reserver un appel gratuit</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </div>

          <p className="mt-6 text-sm text-text-muted">
            Ou ecrivez-nous a{" "}
            <a href="mailto:contact@webco.fr" className="text-accent hover:underline">
              contact@webco.fr
            </a>
          </p>

          {/* Trust elements */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-text-muted">
            <span>Sans engagement</span>
            <span className="w-1 h-1 rounded-full bg-zinc-600" />
            <span>Reponse sous 24h</span>
            <span className="w-1 h-1 rounded-full bg-zinc-600" />
            <span>+200 projets livres</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
