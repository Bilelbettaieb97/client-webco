"use client"

import { motion, useReducedMotion } from "framer-motion"
import { AnimatedCounter } from "@/components/ui/AnimatedCounter"

const clients = [
  "DataFlow",
  "PaySecure",
  "TalentHub",
  "CloudOps",
  "LegalTech Pro",
  "GreenSupply",
]

const stats = [
  { value: 3.2, suffix: "x", label: "Conversion moyenne" },
  { value: 200, suffix: "+", label: "Pages livrees" },
  { value: 48, suffix: "h", label: "Premier draft" },
  { value: 97, suffix: "%", label: "Renouvellement" },
]

export function LogoBar() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="relative py-16 sm:py-20 bg-bg border-y border-zinc-800/50" aria-label="Clients et statistiques">
      {/* Animated gradient line at top */}
      <div className="absolute top-0 left-0 right-0 animated-gradient-line" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.p
          className="text-center text-sm text-text-muted uppercase tracking-widest mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Ils ont multiplie leurs conversions avec nous
        </motion.p>

        {/* Client logos (badge-style) */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-14"
          initial={{ opacity: 0, y: shouldReduce ? 0 : 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {clients.map((name) => (
            <span
              key={name}
              className="px-5 py-2.5 text-base sm:text-lg font-display font-semibold text-zinc-400 border border-zinc-800 rounded-lg bg-zinc-900/50 hover:border-zinc-600 hover:text-zinc-300 transition-all duration-200"
            >
              {name}
            </span>
          ))}
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className="relative">
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
              {index === 1 && (
                <p className="text-center mt-1 flex items-center justify-center gap-1.5 text-xs text-green-400">
                  <span className="pulsing-dot" />
                  et ca continue
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Animated gradient line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 animated-gradient-line" />
    </section>
  )
}
