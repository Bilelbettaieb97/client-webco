'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { NeonButton } from '@/components/ui/NeonButton'
import type { PricingPlan } from '@/lib/types'

interface PricingProps {
  data: PricingPlan[]
}

export function Pricing({ data }: PricingProps) {
  const shouldReduce = useReducedMotion()

  return (
    <section id="pricing" className="py-24 sm:py-32 relative" aria-label="Nos tarifs">
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Des tarifs transparents"
          subtitle="Choisissez la formule adaptee a vos besoins. Chaque projet est unique, contactez-nous pour un devis personnalise."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {data.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`relative glass rounded-2xl p-8 flex flex-col ${
                plan.is_popular
                  ? 'border-neon-violet/40 neon-glow'
                  : ''
              }`}
            >
              {plan.is_popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 text-xs font-display font-semibold bg-gradient-to-r from-neon-violet to-neon-blue text-white rounded-full">
                    Populaire
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-lg font-display font-semibold text-text-primary">
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-text-muted">{plan.description}</p>
              </div>

              <div className="mt-6">
                <span className="text-4xl font-display font-bold text-gradient">
                  {plan.price}
                </span>
                <span className="text-text-muted text-sm ml-1">EUR</span>
              </div>

              <ul className="mt-8 space-y-3 flex-1">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-text-muted">
                    <Check className="h-4 w-4 text-neon-violet shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <NeonButton
                  href="#contact"
                  variant={plan.is_popular ? 'primary' : 'secondary'}
                  className="w-full text-center"
                >
                  Demarrer
                </NeonButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
