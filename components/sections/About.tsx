"use client"

import { motion, useReducedMotion } from "framer-motion"
import { AnimatedCounter } from "@/components/ui/AnimatedCounter"
import { SectionHeading } from "@/components/ui/SectionHeading"
import type { AboutContent } from "@/lib/types"

interface AboutProps {
  data: AboutContent
}

export function About({ data }: AboutProps) {
  const shouldReduce = useReducedMotion()

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-bg bg-grid" aria-label="A propos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduce ? 0 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              badge="A propos"
              title={data.title || "Pourquoi Webco ?"}
              centered={false}
            />
            <p className="text-text-muted leading-relaxed text-base sm:text-lg -mt-8">
              {data.description ||
                "Chez Webco, nous combinons expertise technique et vision strategique pour creer des experiences digitales exceptionnelles. Chaque projet est une opportunite de repousser les limites du web."}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-lg bg-gradient-to-r from-accent to-accent-blue text-white hover:opacity-90 transition-opacity cursor-pointer min-h-[44px]"
              >
                Discutons de votre projet
              </a>
            </div>
          </motion.div>

          {/* Right — Stats */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduce ? 0 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Background glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-accent/5 via-transparent to-accent-blue/5 rounded-3xl blur-xl" />
            <div className="relative grid grid-cols-2 gap-4">
              {(data.stats || [
                { label: "Projets livres", value: 50, suffix: "+" },
                { label: "Clients satisfaits", value: 98, suffix: "%" },
                { label: "Annees d'experience", value: 5, suffix: "+" },
                { label: "Temps de reponse", value: 24, suffix: "h" },
              ]).map((stat, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm"
                >
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
