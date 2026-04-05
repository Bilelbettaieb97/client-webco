"use client"

import { motion, useReducedMotion } from "framer-motion"

const clients = ["DataFlow", "PaySecure", "TalentHub", "CloudOps", "LegalTech Pro", "GreenSupply"]

export function LogoBar() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="relative py-12 bg-bg" aria-label="Clients">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Client names — monospace, gray, understated */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          initial={shouldReduce ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {clients.map((name) => (
            <span
              key={name}
              className="text-sm font-mono text-zinc-500 tracking-wide"
            >
              {name}
            </span>
          ))}
        </motion.div>

        {/* Stats line — small, muted */}
        <motion.p
          className="mt-6 text-center text-xs sm:text-sm text-text-muted/50 tracking-wide"
          initial={shouldReduce ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="stat-number">200+</span> landing pages livrees
          <span className="mx-2 text-zinc-700">&middot;</span>
          Conversion moyenne <span className="stat-number">x3.2</span>
          <span className="mx-2 text-zinc-700">&middot;</span>
          Reponse en 24h
        </motion.p>
      </div>
    </section>
  )
}
