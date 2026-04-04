"use client"

import { motion, useReducedMotion } from "framer-motion"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { ROICalculator } from "@/components/ui/ROICalculator"

export function ROISection() {
  const shouldReduce = useReducedMotion()

  return (
    <section id="roi" className="relative py-20 sm:py-28 bg-bg" aria-label="Calculateur ROI">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Calculateur ROI"
          title="Calculez votre ROI en 30 secondes"
          subtitle="Entrez vos chiffres. Voyez ce que Webco peut générer pour vous."
        />

        <ROICalculator />

        <motion.p
          className="text-center text-sm text-text-muted/60 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Ce ne sont pas des promesses — ce sont des mathématiques.
        </motion.p>
      </div>
    </section>
  )
}
