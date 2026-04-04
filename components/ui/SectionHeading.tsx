'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  centered?: boolean
}

export function SectionHeading({ title, subtitle, centered = true }: SectionHeadingProps) {
  const shouldReduce = useReducedMotion()

  return (
    <div className={centered ? 'text-center' : ''}>
      <motion.h2
        className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gradient leading-tight"
        initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="mt-4 text-lg text-text-muted max-w-2xl mx-auto"
          initial={{ opacity: 0, y: shouldReduce ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
