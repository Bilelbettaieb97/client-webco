"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Rocket, Layers, TrendingUp, Check, type LucideIcon } from "lucide-react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { SpotlightCard } from "@/components/ui/SpotlightCard"
import { Card3D } from "@/components/ui/Card3D"
import type { Service } from "@/lib/types"

const iconMap: Record<string, LucideIcon> = {
  Rocket,
  Layers,
  TrendingUp,
  Globe: Rocket,
  ShoppingCart: Layers,
  Code: TrendingUp,
}

interface ServicesProps {
  data: Service[]
}

export function Services({ data }: ServicesProps) {
  const shouldReduce = useReducedMotion()

  // Show only first 3 services (B2B landing page focus)
  const services = data.slice(0, 3)

  return (
    <section id="offres" className="relative py-24 sm:py-32 bg-bg" aria-label="Nos offres">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Offres"
          title="Une offre adaptee a vos objectifs"
          subtitle="Landing page unique, pack conversion ou accompagnement continu. Choisissez la formule qui correspond a votre ambition."
        />

        {/* Animated gradient line between heading and cards */}
        <div className="animated-gradient-line w-1/2 mx-auto mb-12 -mt-6" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Rocket
              const isPopular = index === 1

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={isPopular ? "md:-translate-y-4" : ""}
                >
                  <Card3D className="h-full">
                    <SpotlightCard
                      className={`h-full flex flex-col p-6 sm:p-8 ${
                        isPopular
                          ? "border-accent/40 shadow-lg shadow-accent/5 ring-1 ring-accent/20"
                          : ""
                      }`}
                    >
                      {/* Popular badge */}
                      {isPopular && (
                        <span className="inline-block w-fit mb-4 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-accent to-accent-blue rounded-full">
                          Plus demande
                        </span>
                      )}

                      {/* Icon */}
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 text-accent mb-4">
                        <Icon size={24} />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-display font-bold text-text">
                        {service.title}
                      </h3>

                      {/* Price with anchoring */}
                      <div className="mt-3">
                        {isPopular && (
                          <p className="text-xs text-text-muted mb-1">
                            <span className="line-through">Valeur estimee : 12 000&#8364;</span>
                          </p>
                        )}
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-display font-bold text-gradient stat-number">
                            {isPopular ? "Votre prix : " : ""}{service.price}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mt-3 text-sm text-text-muted leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features */}
                      <ul className="mt-6 space-y-3 flex-1">
                        {service.features.map((feature, fi) => (
                          <li key={fi} className="flex items-start gap-2.5 text-sm text-text-muted">
                            <Check size={16} className="flex-shrink-0 mt-0.5 text-accent" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* Friction reducer */}
                      <p className="mt-4 text-xs text-text-muted text-center">
                        {index === 0 ? "Sans engagement" : index === 1 ? "Satisfait ou rembourse" : "Premier resultat en 48h"}
                      </p>

                      {/* CTA */}
                      <a
                        href="#contact"
                        className={`mt-4 block text-center py-3 px-6 text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer min-h-[44px] flex items-center justify-center ${
                          isPopular
                            ? "bg-gradient-to-r from-accent to-accent-blue text-white hover:opacity-90 hover:shadow-lg hover:shadow-accent/25"
                            : "border border-zinc-700 text-text hover:border-accent/50 hover:bg-accent/5"
                        }`}
                      >
                        {index === 0 ? "Demander un devis" : index === 1 ? "Reserver mon Pack Conversion" : "Discuter de mon abonnement"}
                      </a>
                    </SpotlightCard>
                  </Card3D>
                </motion.div>
              )
            })}
          </div>
      </div>
    </section>
  )
}
