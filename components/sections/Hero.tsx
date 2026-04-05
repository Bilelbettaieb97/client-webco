"use client"

import dynamic from "next/dynamic"
import { motion, useReducedMotion } from "framer-motion"
import { AnimatedPaths } from "@/components/ui/AnimatedPaths"
import { ErrorBoundary } from "@/components/ui/ErrorBoundary"
import type { HeroContent } from "@/lib/types"

const FluidBackground = dynamic(
  () => import("@/components/ui/FluidBackground").then((m) => ({ default: m.FluidBackground })),
  { ssr: false }
)

interface HeroProps {
  data: HeroContent
}

export function Hero({ /* data available for admin CMS overrides */ }: HeroProps) {
  const shouldReduce = useReducedMotion()

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg"
      aria-label="Accueil"
    >
      {/* LAYER 0: Static gradient fallback */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(59,130,246,0.05) 0%, transparent 50%)",
        }}
      />

      {/* LAYER 1: FluidBackground */}
      <div className="absolute inset-0 z-[1]">
        <ErrorBoundary>
          <FluidBackground />
        </ErrorBoundary>
      </div>

      {/* LAYER 2: AnimatedPaths — subtle */}
      <div className="absolute inset-0 z-[2] opacity-40">
        <AnimatedPaths />
      </div>

      {/* LAYER 3: Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Line 1: The problem — muted, medium size */}
        <motion.p
          className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-text-muted/70 leading-tight tracking-tight"
          initial={shouldReduce ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Vos visiteurs ne convertissent pas.
        </motion.p>

        {/* Line 2: The solution — MASSIVE gradient text, THE moment */}
        <motion.h1
          className="mt-4 sm:mt-6 text-huge text-gradient"
          initial={shouldReduce ? {} : { opacity: 0, filter: "blur(12px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Nous changeons ca.
        </motion.h1>

        {/* Stat + CTA — understated */}
        <motion.div
          className="mt-10 sm:mt-14 flex flex-col items-center gap-6"
          initial={shouldReduce ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <p className="text-sm sm:text-base font-mono text-text-muted/60 tracking-wide stat-number">
            x3.2 conversion moyenne
          </p>

          <a
            href="#transformation"
            className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-text hover:text-accent transition-colors duration-300 cursor-pointer min-h-[44px]"
          >
            Voir comment
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
