"use client"

import { motion, useReducedMotion } from "framer-motion"

interface SectionHeadingProps {
  badge?: string
  title: string
  subtitle?: string
  centered?: boolean
}

export function SectionHeading({ badge, title, subtitle, centered = true }: SectionHeadingProps) {
  const shouldReduce = useReducedMotion()
  const alignClass = centered ? "text-center mx-auto" : "text-left"

  return (
    <motion.div
      className={`max-w-3xl mb-16 ${alignClass}`}
      initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      {badge && (
        <span className="inline-block mb-4 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-accent border border-accent/30 rounded-full bg-accent/5">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gradient leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-text-muted leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
