"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Globe, Rocket, ShoppingCart, Code, type LucideIcon } from "lucide-react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { SpotlightCard } from "@/components/ui/SpotlightCard"
import type { Service } from "@/lib/types"

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Rocket,
  ShoppingCart,
  Code,
}

interface ServicesProps {
  data: Service[]
}

export function Services({ data }: ServicesProps) {
  const shouldReduce = useReducedMotion()

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-bg" aria-label="Nos services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Nos services"
          title="Des solutions sur-mesure pour chaque besoin"
          subtitle="Du site vitrine au e-commerce, nous concevons des experiences digitales qui convertissent et qui durent."
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((service, index) => {
            const Icon = iconMap[service.icon] || Code
            const isFeatured = index === 0

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={isFeatured ? "md:col-span-2" : ""}
              >
                <SpotlightCard
                  className={`h-full ${isFeatured ? "p-8 sm:p-10" : "p-6 sm:p-8"}`}
                >
                  <div className={isFeatured ? "flex flex-col sm:flex-row gap-8" : ""}>
                    <div className={isFeatured ? "flex-1" : ""}>
                      {/* Icon */}
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 text-accent mb-4">
                        <Icon size={24} />
                      </div>

                      {/* Title + Price */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                        <h3 className={`font-display font-bold text-text ${isFeatured ? "text-2xl" : "text-xl"}`}>
                          {service.title}
                        </h3>
                        <span className="text-xs font-medium px-3 py-1 rounded-full bg-accent/10 text-accent w-fit">
                          {service.price}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-text-muted text-sm sm:text-base leading-relaxed mb-6">
                        {service.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className={isFeatured ? "flex-1" : ""}>
                      <ul className={`grid gap-3 ${isFeatured ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
                        {service.features.map((feature, fi) => (
                          <li key={fi} className="flex items-center gap-2.5 text-sm text-text-muted">
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
