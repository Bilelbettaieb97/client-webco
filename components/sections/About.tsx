'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { AboutContent } from '@/lib/types'

interface AboutProps {
  data: AboutContent
}

export function About({ data }: AboutProps) {
  const shouldReduce = useReducedMotion()

  return (
    <section id="about" className="py-24 sm:py-32 relative" aria-label="A propos">
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <SectionHeading title={data.title} centered={false} />
            <motion.p
              className="mt-6 text-text-muted leading-relaxed text-lg"
              initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {data.description}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Vercel'].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs font-medium glass rounded-lg text-text-muted"
                  >
                    {tech}
                  </span>
                )
              )}
            </motion.div>
          </div>

          {/* Counters */}
          <div className="grid grid-cols-2 gap-8">
            {data.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
