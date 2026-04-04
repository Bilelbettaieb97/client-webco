'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import type { PortfolioItem } from '@/lib/types'

interface PortfolioHTMLProps {
  data: PortfolioItem[]
}

export function PortfolioHTML({ data }: PortfolioHTMLProps) {
  const categories = ['Tous', ...new Set(data.map((p) => p.category))]
  const [activeFilter, setActiveFilter] = useState('Tous')

  const filtered = activeFilter === 'Tous' ? data : data.filter((p) => p.category === activeFilter)

  const hasItems = data.length > 0

  return (
    <div
      style={{ position: 'absolute', top: '200vh', left: 0, width: '100%', height: '100vh' }}
      className="pointer-events-none"
    >
      <div className="flex flex-col justify-center h-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gradient"
          >
            Nos realisations
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 text-lg text-text-muted max-w-2xl mx-auto"
          >
            Decouvrez nos projets les plus recents
          </motion.p>
        </div>

        {hasItems ? (
          <>
            {/* Filter tabs */}
            {categories.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap justify-center gap-2 mb-8 pointer-events-auto"
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 min-h-[44px] ${
                      activeFilter === cat
                        ? 'bg-neon-violet/20 text-neon-violet border border-neon-violet/30'
                        : 'bg-white/5 text-text-muted border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto w-full">
              <AnimatePresence mode="popLayout">
                {filtered.map((item) => (
                  <motion.a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="pointer-events-auto group backdrop-blur-xl bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden hover:border-neon-violet/20 transition-all duration-300"
                  >
                    <div className="aspect-video bg-gradient-to-br from-neon-violet/10 to-neon-blue/10 relative overflow-hidden">
                      {item.image_url && (
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <ExternalLink className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-display font-semibold text-text-primary">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-text-muted line-clamp-2">
                        {item.description}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {item.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-[10px] rounded-full bg-white/5 text-text-muted border border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </AnimatePresence>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="backdrop-blur-xl bg-white/[0.04] border border-white/10 rounded-2xl p-12 max-w-md mx-auto">
              <p className="text-text-muted text-sm">
                Nos projets arrivent bientot. Contactez-nous pour decouvrir notre portfolio complet.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
