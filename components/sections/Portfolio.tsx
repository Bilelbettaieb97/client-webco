'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { PortfolioItem } from '@/lib/types'
import Image from 'next/image'

const categories = [
  'Tous',
  'Site Vitrine',
  'Landing Page',
  'E-commerce',
  'Application Web',
]

interface PortfolioProps {
  data: PortfolioItem[]
}

export function Portfolio({ data }: PortfolioProps) {
  const [active, setActive] = useState('Tous')
  const shouldReduce = useReducedMotion()

  const filtered =
    active === 'Tous' ? data : data.filter((p) => p.category === active)

  if (data.length === 0) {
    return (
      <section id="portfolio" className="py-24 sm:py-32" aria-label="Nos realisations">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Nos realisations"
            subtitle="Decouvrez nos derniers projets et les resultats obtenus pour nos clients."
          />
          <div className="mt-16 text-center">
            <div className="glass rounded-2xl p-12 max-w-lg mx-auto">
              <p className="text-text-muted">
                Nos realisations arrivent bientot. Revenez decouvrir nos projets.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="portfolio" className="py-24 sm:py-32" aria-label="Nos realisations">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Nos realisations"
          subtitle="Decouvrez nos derniers projets et les resultats obtenus pour nos clients."
        />

        {/* Filter tabs */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: shouldReduce ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 min-h-[44px] ${
                active === cat
                  ? 'bg-gradient-to-r from-neon-violet to-neon-blue text-white'
                  : 'glass text-text-muted hover:text-text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-2xl glass"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image_url || '/placeholder.jpg'}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-lg font-display font-semibold text-text-primary">
                      {item.title}
                    </h3>
                    <p className="text-sm text-text-muted mt-1">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {item.technologies.map((tech, j) => (
                        <span
                          key={j}
                          className="text-xs px-2 py-0.5 rounded-full bg-neon-violet/10 text-neon-violet border border-neon-violet/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1 text-sm text-neon-violet hover:text-neon-blue transition-colors"
                      >
                        Voir le projet
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
