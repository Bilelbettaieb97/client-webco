"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, TrendingUp } from "lucide-react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { SpotlightCard } from "@/components/ui/SpotlightCard"
import { Card3D } from "@/components/ui/Card3D"
import { BeforeAfter } from "@/components/ui/BeforeAfter"
import type { ResultsContent } from "@/lib/types"

interface ResultsProps {
  data: ResultsContent
}

const roiEstimates = ["+340% en 90 jours", "+280% en 60 jours", "+410% en 90 jours"]

export function Results({ data }: ResultsProps) {
  const shouldReduce = useReducedMotion()

  return (
    <section id="resultats" className="relative py-24 sm:py-32 bg-bg" aria-label="Resultats">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Resultats"
          title={data.title || "Des resultats, pas des promesses"}
          subtitle={data.subtitle || "Voici les resultats concrets que nous avons obtenus pour nos clients B2B."}
        />

        <p className="text-center text-sm text-text-muted -mt-6 mb-10">
          Pas des promesses — des metriques verifiables.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {data.cases.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              <Card3D className="h-full">
                <SpotlightCard className="h-full p-6 sm:p-8">
                  {/* Client type badge */}
                  <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent border border-accent/30 rounded-full bg-accent/5 mb-6">
                    {item.client_type}
                  </span>

                  {/* Before / After numbers */}
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl sm:text-3xl font-bold text-zinc-500 stat-number">
                      {item.before}
                    </span>
                    <ArrowRight size={20} className="text-zinc-600 flex-shrink-0" />
                    <span className="text-5xl sm:text-6xl font-bold text-gradient-green leading-none stat-number">
                      {item.after}
                    </span>
                  </div>

                  {/* Metric label */}
                  <p className="text-sm text-text-muted mb-4">
                    {item.metric}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-text-muted leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* ROI estimate */}
                  <div className="px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20 mb-4">
                    <p className="text-xs font-medium text-green-400">
                      ROI estime : <span className="stat-number">{roiEstimates[index] || "+300% en 90 jours"}</span>
                    </p>
                  </div>

                  {/* Multiplier badge */}
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-green-400" />
                    <span className="text-sm font-semibold text-green-400 stat-number">
                      {item.multiplier}
                    </span>
                  </div>
                </SpotlightCard>
              </Card3D>
            </motion.div>
          ))}
        </div>

        {/* CTA after results */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="#contact"
            className="group relative inline-flex items-center px-8 py-3.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-accent to-accent-blue text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 cursor-pointer min-h-[44px]"
          >
            <span className="relative z-10">Obtenir les memes resultats →</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </motion.div>

        {/* ──── Before/After Interactive Slider ──── */}
        <div className="mt-20 sm:mt-24">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm text-accent font-medium uppercase tracking-widest mb-3">
              Avant / Apres
            </p>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-text">
              Glissez pour voir la difference
            </h3>
            <p className="text-sm text-text-muted mt-2">
              A gauche, une page generique. A droite, une landing page Webco.
            </p>
          </motion.div>

          <BeforeAfter />
        </div>

        {/* Animated gradient line divider at bottom */}
        <div className="mt-24 animated-gradient-line w-full" />
      </div>
    </section>
  )
}
