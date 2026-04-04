'use client'

import { motion, useReducedMotion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { NeonButton } from '@/components/ui/NeonButton'
import { ChevronDown } from 'lucide-react'
import type { HeroContent } from '@/lib/types'

const Scene = dynamic(() => import('@/components/three/Scene').then((m) => m.Scene), {
  ssr: false,
})

interface HeroProps {
  data: HeroContent
}

export function Hero({ data }: HeroProps) {
  const shouldReduce = useReducedMotion()

  const words = data.title.split(' ')

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Accueil"
    >
      {/* Background gradient mesh */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-violet/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-neon-cyan/5 rounded-full blur-[96px] -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* 3D Scene */}
      <Scene />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8"
        >
          <span className="h-2 w-2 rounded-full bg-neon-violet animate-pulse" />
          <span className="text-xs font-medium text-text-muted">
            Agence web premium
          </span>
        </motion.div>

        {/* Title with staggered word animation */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] tracking-tight">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.25em]"
              initial={{ opacity: 0, y: shouldReduce ? 0 : 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.5 + i * 0.08,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              {word === 'convertissent' ? (
                <span className="text-gradient">{word}</span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          className="mt-6 text-lg sm:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          {data.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <NeonButton href="#contact" variant="primary">
            {data.cta_primary}
          </NeonButton>
          <NeonButton href="#portfolio" variant="secondary">
            {data.cta_secondary}
          </NeonButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-6 w-6 text-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  )
}
