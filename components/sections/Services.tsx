'use client'

import { motion, useReducedMotion } from 'framer-motion'
import {
  Globe,
  Rocket,
  ShoppingCart,
  Code,
  Palette,
  BarChart3,
  Search,
  Smartphone,
} from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassCard } from '@/components/ui/GlassCard'
import type { Service } from '@/lib/types'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Rocket,
  ShoppingCart,
  Code,
  Palette,
  BarChart3,
  Search,
  Smartphone,
}

interface ServicesProps {
  data: Service[]
}

export function Services({ data }: ServicesProps) {
  const shouldReduce = useReducedMotion()

  return (
    <section id="services" className="py-24 sm:py-32 relative" aria-label="Nos services">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-50" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Des solutions sur-mesure pour chaque projet"
          subtitle="De la landing page a l'application web complexe, nous maitrisons chaque etape de votre transformation digitale."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((service, i) => {
            const Icon = iconMap[service.icon] || Code
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <GlassCard className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-neon-violet/20 to-neon-blue/20 flex items-center justify-center border border-neon-violet/20">
                      <Icon className="h-6 w-6 text-neon-violet" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-display font-semibold text-text-primary">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm text-text-muted leading-relaxed">
                        {service.description}
                      </p>
                      <ul className="mt-4 space-y-1.5">
                        {service.features.map((feature, j) => (
                          <li
                            key={j}
                            className="flex items-center gap-2 text-sm text-text-muted"
                          >
                            <span className="h-1 w-1 rounded-full bg-neon-violet shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 pt-4 border-t border-white/5">
                        <span className="text-sm font-display font-semibold text-gradient">
                          {service.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
