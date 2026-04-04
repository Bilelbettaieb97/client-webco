"use client"

import { motion, useReducedMotion } from "framer-motion"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { SpotlightCard } from "@/components/ui/SpotlightCard"
import type { ProcessContent } from "@/lib/types"

interface ProcessProps {
  data: ProcessContent
}

export function Process({ data }: ProcessProps) {
  const shouldReduce = useReducedMotion()

  return (
    <section id="process" className="relative py-24 sm:py-32 bg-bg" aria-label="Notre process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Methodologie"
          title={data.title || "Notre process en 4 etapes"}
          subtitle={data.subtitle || "Une methodologie eprouvee pour maximiser vos conversions."}
        />

        <div className="relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative"
              >
                <SpotlightCard className="h-full p-6 sm:p-7">
                  {/* Step number */}
                  <span className="text-4xl sm:text-5xl font-display font-bold text-gradient opacity-80 leading-none">
                    {step.number}
                  </span>

                  {/* Title */}
                  <h3 className="mt-4 text-lg font-display font-bold text-text">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm text-text-muted leading-relaxed">
                    {step.description}
                  </p>
                </SpotlightCard>

                {/* Arrow between steps (desktop, not on last) */}
                {index < data.steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 z-10 w-6 h-6 -translate-y-1/2 items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-accent">
                      <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
