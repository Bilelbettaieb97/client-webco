"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Check } from "lucide-react"
import { SpotlightCard } from "@/components/ui/SpotlightCard"
import type { PricingPlan } from "@/lib/types"

interface PricingProps {
  data: PricingPlan[]
}

export function Pricing({ data }: PricingProps) {
  const shouldReduce = useReducedMotion()

  return (
    <section id="tarifs" className="relative py-24 sm:py-32 lg:py-40 bg-bg" aria-label="Tarifs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-text tracking-tight text-center mb-4"
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Tarifs
        </motion.h2>
        <motion.p
          className="text-center text-sm sm:text-base text-text-muted mb-16 sm:mb-20 max-w-lg mx-auto"
          initial={shouldReduce ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Chaque euro investi dans la conversion vous revient multiplie.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {data.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={shouldReduce ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={plan.is_popular ? "md:-translate-y-4" : ""}
            >
              <SpotlightCard
                className={`h-full flex flex-col p-6 sm:p-8 ${
                  plan.is_popular
                    ? "border-accent/20 shadow-lg shadow-accent/5 ring-1 ring-accent/10"
                    : ""
                }`}
              >
                {/* Popular badge — subtle */}
                {plan.is_popular && (
                  <span className="inline-block w-fit mb-4 px-3 py-1 text-xs font-medium tracking-wider text-accent border border-accent/30 rounded-full bg-accent/5">
                    Plus demande
                  </span>
                )}

                {/* Plan name */}
                <h3 className="text-lg font-display font-bold text-text">
                  {plan.name}
                </h3>

                {/* Price — clean */}
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-display font-bold text-gradient stat-number">
                    {plan.price}
                  </span>
                </div>

                {/* One sentence */}
                <p className="mt-3 text-sm text-text-muted leading-relaxed">
                  {plan.description}
                </p>

                {/* Features — 4 max */}
                <ul className="mt-6 space-y-3 flex-1">
                  {plan.features.slice(0, 4).map((feature, fi) => (
                    <li key={fi} className="flex items-start gap-2.5 text-sm text-text-muted">
                      <Check size={15} className="flex-shrink-0 mt-0.5 text-accent/70" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  className={`mt-6 block text-center py-3 px-6 text-sm font-medium rounded-lg transition-all duration-300 cursor-pointer min-h-[44px] flex items-center justify-center ${
                    plan.is_popular
                      ? "bg-gradient-to-r from-accent to-accent-blue text-white hover:opacity-90 hover:shadow-lg hover:shadow-accent/20"
                      : "border border-zinc-700 text-text hover:border-accent/40 hover:bg-accent/5"
                  }`}
                >
                  Nous contacter
                </a>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
