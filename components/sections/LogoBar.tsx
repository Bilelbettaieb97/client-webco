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
  { value: 200, suffix: "+", label: "Pages livrees" },
  { value: 3.2, suffix: "x", label: "Conversion moyenne" },
  { value: 48, suffix: "h", label: "Premier draft" },
  { value: 97, suffix: "%", label: "Renouvellement" },
]

export function LogoBar() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="relative py-16 sm:py-20 bg-bg border-y border-zinc-800/50" aria-label="Clients et statistiques">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.p
          className="text-center text-sm text-text-muted uppercase tracking-widest mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          +200 landing pages livrees pour des entreprises B2B
        </motion.p>

        {/* Client logos (text-based) */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 mb-14"
          initial={{ opacity: 0, y: shouldReduce ? 0 : 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {clients.map((name) => (
            <span
              key={name}
              className="text-lg sm:text-xl font-display font-semibold text-zinc-600 hover:text-zinc-400 transition-colors duration-200"
            >
              {name}
            </span>
          ))}
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <AnimatedCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
