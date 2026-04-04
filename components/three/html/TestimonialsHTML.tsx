'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import type { Testimonial } from '@/lib/types'

interface TestimonialsHTMLProps {
  data: Testimonial[]
}

export function TestimonialsHTML({ data }: TestimonialsHTMLProps) {
  const hasItems = data.length > 0

  return (
    <div
      style={{ position: 'absolute', top: '500vh', left: 0, width: '100%', height: '100vh' }}
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
            Ce que disent nos clients
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 text-lg text-text-muted max-w-2xl mx-auto"
          >
            La satisfaction client est notre priorite absolue
          </motion.p>
        </div>

        {hasItems ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto w-full">
            {data.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="backdrop-blur-xl bg-white/[0.04] border border-white/10 rounded-2xl p-5 sm:p-6 relative"
              >
                <Quote className="h-6 w-6 text-neon-violet/20 absolute top-4 right-4" />

                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={`h-4 w-4 ${
                        j < testimonial.rating
                          ? 'text-neon-violet fill-neon-violet'
                          : 'text-white/10'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-sm text-text-muted leading-relaxed line-clamp-4">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                <div className="mt-4 pt-4 border-t border-white/5">
                  <p className="text-sm font-display font-semibold text-text-primary">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-text-muted">
                    {testimonial.role}{testimonial.company ? `, ${testimonial.company}` : ''}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="backdrop-blur-xl bg-white/[0.04] border border-white/10 rounded-2xl p-12 max-w-md mx-auto">
              <div className="flex justify-center mb-4 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-neon-violet fill-neon-violet" />
                ))}
              </div>
              <p className="text-text-muted text-sm">
                Les temoignages de nos clients seront bientot disponibles.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
