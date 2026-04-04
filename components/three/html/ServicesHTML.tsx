'use client'

import { motion } from 'framer-motion'
import { Globe, Rocket, ShoppingCart, Code } from 'lucide-react'
import type { Service } from '@/lib/types'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Rocket,
  ShoppingCart,
  Code,
}

interface ServicesHTMLProps {
  data: Service[]
}

export function ServicesHTML({ data }: ServicesHTMLProps) {
  return (
    <div
      style={{ position: 'absolute', top: '100vh', left: 0, width: '100%', height: '100vh' }}
      className="pointer-events-none"
    >
      <div className="flex flex-col justify-center h-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gradient"
          >
            Nos services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 text-lg text-text-muted max-w-2xl mx-auto"
          >
            Des solutions web sur-mesure pour chaque besoin
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto w-full">
          {data.map((service, i) => {
            const Icon = iconMap[service.icon] || Globe
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="pointer-events-auto backdrop-blur-xl bg-white/[0.04] border border-white/10 rounded-2xl p-5 sm:p-6 hover:bg-white/[0.06] hover:border-neon-violet/20 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-neon-violet/10 flex items-center justify-center group-hover:bg-neon-violet/20 transition-colors">
                    <Icon className="h-5 w-5 text-neon-violet" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-display font-semibold text-text-primary">
                      {service.title}
                    </h3>
                    <p className="mt-1 text-sm text-text-muted leading-relaxed line-clamp-2">
                      {service.description}
                    </p>
                    <ul className="mt-3 space-y-1">
                      {service.features.slice(0, 3).map((f) => (
                        <li key={f} className="text-xs text-text-muted flex items-center gap-1.5">
                          <span className="h-1 w-1 rounded-full bg-neon-violet/60 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-xs font-medium text-neon-violet">
                      {service.price}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
