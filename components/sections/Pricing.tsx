"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Check } from "lucide-react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { SpotlightCard } from "@/components/ui/SpotlightCard"
import { Card3D } from "@/components/ui/Card3D"
import type { PricingPlan } from "@/lib/types"

interface PricingProps {
  data: PricingPlan[]
}

export function Pricing({ data }: PricingProps) {
  const shouldReduce = useReducedMotion()

  return (
    <section id="tarifs" className="relative py-20 sm:py-28 bg-bg" aria-label="Nos tarifs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Tarifs"
          title="Investissez dans la conversion"
          subtitle="Chaque euro investi dans une landing page optimisée vous revient multiplié. Choisissez la formule qui correspond à vos objectifs."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {data.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${plan.is_popular ? "md:-translate-y-4" : ""} hover:border-accent/30 transition-colors duration-300`}
            >
              <Card3D className="h-full">
                <SpotlightCard
                  className={`h-full flex flex-col p-6 sm:p-8 ${
                    plan.is_popular
                      ? "animated-gradient-border border-transparent shadow-lg shadow-accent/5"
                      : ""
                  }`}
                >
                  {/* Popular badge */}
                  {plan.is_popular && (
                    <span className="inline-block w-fit mb-4 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-accent to-accent-blue rounded-full">
                      Plus demandé
                    </span>
                  )}

                  {/* Plan name */}
                  <h3 className="text-xl font-display font-bold text-text">
                    {plan.name}
                  </h3>

                  {/* Price with anchoring */}
                  <div className="mt-4">
                    {plan.is_popular && (
                      <p className="text-xs text-text-muted mb-1">
                        <span className="line-through">Valeur estimée : <span className="stat-number">12 000&#8364;</span></span>
                      </p>
                    )}
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-display font-bold text-gradient stat-number">
                        {plan.is_popular ? "Votre prix : " : ""}{plan.price}
                      </span>
                      <span className="text-text-muted text-sm">EUR</span>
                    </div>
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

                  {/* Friction reducer */}
                  <p className="mt-4 text-xs text-text-muted text-center">
                    {index === 0 ? "Sans engagement" : index === 1 ? "Satisfait ou remboursé" : "Premier résultat en 48h"}
                  </p>

                  {/* CTA */}
                  <a
                    href="#contact"
                    className={`mt-4 block text-center py-3 px-6 text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer min-h-[44px] flex items-center justify-center ${
                      plan.is_popular
                        ? "bg-gradient-to-r from-accent to-accent-blue text-white hover:opacity-90 hover:shadow-lg hover:shadow-accent/25"
                        : "border border-zinc-700 text-text hover:border-accent/50 hover:bg-accent/5"
                    }`}
                  >
                    {index === 0 ? "Demander un devis" : index === 1 ? "Réserver mon Pack Conversion" : "Discuter de mon abonnement"}
                  </a>
                </SpotlightCard>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
