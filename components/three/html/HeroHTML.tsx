'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { HeroContent } from '@/lib/types'

interface HeroHTMLProps {
  data: HeroContent
}

export function HeroHTML({ data }: HeroHTMLProps) {
  return (
    <div
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh' }}
      className="pointer-events-none"
    >
      <div className="flex flex-col items-center justify-center h-full px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6 sm:mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase backdrop-blur-xl bg-white/5 border border-white/10 text-text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-violet animate-pulse" />
            Agence web premium
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] max-w-4xl"
        >
          <span className="text-gradient">{data.title}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6 sm:mt-8 text-base sm:text-lg text-text-muted max-w-2xl leading-relaxed"
        >
          {data.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 pointer-events-auto"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-display font-semibold text-sm tracking-wide bg-gradient-to-r from-neon-violet to-neon-blue text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:scale-105 transition-all duration-300 min-h-[44px]"
          >
            {data.cta_primary}
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-display font-semibold text-sm tracking-wide backdrop-blur-xl bg-white/5 border border-white/10 text-text-primary hover:bg-white/[0.08] hover:border-neon-violet/30 transition-all duration-300 min-h-[44px]"
          >
            {data.cta_secondary}
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-text-muted uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="h-5 w-5 text-neon-violet" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
