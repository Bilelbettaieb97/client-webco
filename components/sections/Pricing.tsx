"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Check } from "lucide-react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { SpotlightCard } from "@/components/ui/SpotlightCard"
import type { PricingPlan } from "@/lib/types"

interface PricingProps {
  data: PricingPlan[]
}

export function Pricing({ data }: PricingProps) {
  const shouldReduce = useReducedMotion()

  return (
    <section id="tarifs" className="relative py-24 sm:py-32 bg-bg" aria-label="Nos tarifs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Tarifs"
          title="Des formules adaptees a vos ambitions"
          subtitle="Des solutions transparentes et sans surprise. Chaque projet est unique, contactez-nous pour un devis personnalise."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {data.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={plan.is_popular ? "md:-translate-y-4" : ""}
            >
              <SpotlightCard
                className={`h-full flex flex-col p-6 sm:p-8 ${
                  plan.is_popular
                    ? "border-accent/40 shadow-lg shadow-accent/5 ring-1 ring-accent/20"
                    : ""
                }`}
              >
                {/* Popular badge */}
                {plan.is_popular && (
                  <span className="inline-block w-fit mb-4 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-accent to-accent-blue rounded-full">
                    Populaire
                  </span>
                )}

                {/* Plan name */}
                <h3 className="text-xl font-display font-bold text-text">
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-display font-bold text-gradient">
                    {plan.price}
                  </span>
                  <span className="text-text-muted text-sm">EUR</span>
                </div>

                {/* Description */}
                <p className="mt-3 text-sm text-text-muted leading-relaxed">
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="mt-8 space-y-3 flex-1">
                  {plan.features.map((feature, fi) => (
                    <li key={fi} className="flex items-start gap-3 text-sm text-text-muted">
                      <Check size={16} className="flex-shrink-0 mt-0.5 text-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  className={`mt-8 block text-center py-3 px-6 text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer min-h-[44px] flex items-center justify-center ${
                    plan.is_popular
                      ? "bg-gradient-to-r from-accent to-accent-blue text-white hover:opacity-90 hover:shadow-lg hover:shadow-accent/25"
                      : "border border-zinc-700 text-text hover:border-accent/50 hover:bg-accent/5"
                  }`}
                >
                  Demarrer ce projet
                </a>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
