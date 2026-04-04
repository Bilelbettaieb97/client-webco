"use client"

import { motion, useReducedMotion } from "framer-motion"
import { MagneticButton } from "@/components/ui/MagneticButton"
import { ParallaxSection } from "@/components/ui/ParallaxSection"

export function CTAFinal() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden" aria-label="Appel a l'action">
      {/* Gradient background — parallax slower than content */}
      <ParallaxSection speed={-0.2} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-accent-blue/5 to-transparent" />
      </ParallaxSection>
      <div className="absolute inset-0 bg-bg/80" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gradient leading-tight">
            Chaque jour sans optimisation vous coute des leads
          </h2>
          <p className="mt-6 text-base sm:text-lg text-text-muted leading-relaxed max-w-xl mx-auto">
            Reservez votre audit CRO gratuit. On analyse votre landing page actuelle et on vous montre exactement ou vous perdez des conversions.
          </p>

          {/* Urgency */}
          <p className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-green-400">
            <span className="pulsing-dot" />
            3 places disponibles en avril
          </p>

          <div className="mt-8 flex justify-center">
            <MagneticButton
              as="a"
              href="#contact"
              className="group relative inline-flex items-center px-10 py-4 text-base font-semibold rounded-lg bg-gradient-to-r from-accent to-accent-blue text-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-accent/25 cursor-pointer min-h-[44px]"
            >
              <span className="relative z-10">Obtenir mon audit gratuit — Reponse en 24h</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </MagneticButton>
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
            <span>Audit offert</span>
            <span className="w-1 h-1 rounded-full bg-zinc-600" />
            <span>Reponse en 24h</span>
            <span className="w-1 h-1 rounded-full bg-zinc-600" />
            <span><span className="stat-number">+200</span> entreprises accompagnees</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
