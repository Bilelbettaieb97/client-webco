'use client'

import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'
import type { PricingPlan } from '@/lib/types'

interface PricingHTMLProps {
  data: PricingPlan[]
}

export function PricingHTML({ data }: PricingHTMLProps) {
  return (
    <div
      style={{ position: 'absolute', top: '400vh', left: 0, width: '100%', height: '100vh' }}
      className="pointer-events-none"
    >
      <div className="flex flex-col justify-center h-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gradient"
          >
            Nos tarifs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 text-lg text-text-muted max-w-2xl mx-auto"
          >
            Des offres transparentes adaptees a votre ambition
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto w-full">
          {data.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`pointer-events-auto relative backdrop-blur-xl rounded-2xl p-6 sm:p-7 transition-all duration-300 ${
                plan.is_popular
                  ? 'bg-white/[0.06] border-2 border-neon-violet/40 shadow-[0_0_30px_rgba(139,92,246,0.15)]'
                  : 'bg-white/[0.04] border border-white/10 hover:border-white/20'
              }`}
            >
              {plan.is_popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-gradient-to-r from-neon-violet to-neon-blue text-white">
                    <Star className="h-3 w-3" />
                    Populaire
                  </span>
                </div>
              )}

              <h3 className="text-lg font-display font-semibold text-text-primary">
                {plan.name}
              </h3>
              <p className="mt-1 text-sm text-text-muted">
                {plan.description}
              </p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-display font-bold text-gradient">
                  {plan.price}
                </span>
                <span className="text-sm text-text-muted">EUR</span>
              </div>

              <ul className="mt-5 space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-text-muted">
                    <Check className="h-4 w-4 text-neon-violet shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-6 block text-center px-6 py-3 rounded-xl text-sm font-display font-semibold transition-all duration-300 min-h-[44px] ${
                  plan.is_popular
                    ? 'bg-gradient-to-r from-neon-violet to-neon-blue text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:scale-105'
                    : 'bg-white/5 border border-white/10 text-text-primary hover:bg-white/10'
                }`}
              >
                Choisir {plan.name}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
