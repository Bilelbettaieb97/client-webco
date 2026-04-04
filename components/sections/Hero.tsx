"use client"

import { motion, useReducedMotion } from "framer-motion"
import { AnimatedPaths } from "@/components/ui/AnimatedPaths"
import { ContainerScroll } from "@/components/ui/ContainerScroll"
import type { HeroContent } from "@/lib/types"

interface HeroProps {
  data: HeroContent
}

export function Hero({ data }: HeroProps) {
  const shouldReduce = useReducedMotion()

  const titleWords = (data.title || "Nous creons des sites web d'exception").split(" ")

  return (
    <section className="relative min-h-screen overflow-hidden bg-bg" aria-label="Accueil">
      {/* Animated Background Paths */}
      <AnimatedPaths />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08)_0%,transparent_60%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-accent border border-accent/30 rounded-full bg-accent/5">
              Agence web premium
            </span>
          </motion.div>

          {/* Title — word by word spring animation */}
          <h1 className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] tracking-tight">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.25em]"
                initial={{ opacity: 0, y: shouldReduce ? 0 : 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  type: "spring",
                  damping: 20,
                  stiffness: 100,
                  delay: 0.3 + i * 0.08,
                }}
              >
                <span
                  className={
                    word === "exception" || word === "d'exception"
                      ? "text-gradient"
                      : "text-text"
                  }
                >
                  {word}
                </span>
              </motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            className="mt-6 text-base sm:text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {data.subtitle ||
              "Design haut de gamme, developpement sur-mesure et performance optimale pour propulser votre business."}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <a
              href="#contact"
              className="group relative px-8 py-3.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-accent to-accent-blue text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 cursor-pointer min-h-[44px] flex items-center"
            >
              <span className="relative z-10">{data.cta_primary || "Demarrer un projet"}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              href="#realisations"
              className="px-8 py-3.5 text-sm font-semibold rounded-lg border border-zinc-700 text-text hover:border-accent/50 hover:bg-accent/5 transition-all duration-300 cursor-pointer min-h-[44px] flex items-center"
            >
              {data.cta_secondary || "Voir nos realisations"}
            </a>
          </motion.div>
        </div>

        {/* Container Scroll — Laptop Mockup */}
        <ContainerScroll>
          {/* Website preview inside the laptop */}
          <div className="aspect-video bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 relative overflow-hidden">
            {/* Fake website layout */}
            <div className="absolute inset-0 p-6 sm:p-10">
              {/* Nav bar */}
              <div className="flex items-center justify-between mb-8">
                <div className="h-4 w-20 bg-accent/30 rounded-full" />
                <div className="flex gap-4">
                  <div className="h-3 w-12 bg-zinc-600 rounded-full" />
                  <div className="h-3 w-12 bg-zinc-600 rounded-full" />
                  <div className="h-3 w-12 bg-zinc-600 rounded-full" />
                </div>
              </div>
              {/* Hero area */}
              <div className="flex flex-col items-center text-center mt-4 sm:mt-8">
                <div className="h-3 w-32 bg-accent/20 rounded-full mb-4" />
                <div className="h-5 sm:h-6 w-3/4 bg-zinc-600 rounded-full mb-3" />
                <div className="h-5 sm:h-6 w-1/2 bg-zinc-600 rounded-full mb-6" />
                <div className="h-3 w-2/3 bg-zinc-700 rounded-full mb-2" />
                <div className="h-3 w-1/2 bg-zinc-700 rounded-full mb-8" />
                <div className="flex gap-3">
                  <div className="h-8 w-28 bg-gradient-to-r from-accent to-accent-blue rounded-md" />
                  <div className="h-8 w-28 border border-zinc-600 rounded-md" />
                </div>
              </div>
              {/* Cards */}
              <div className="grid grid-cols-3 gap-4 mt-8 sm:mt-12">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                    <div className="h-3 w-8 bg-accent/30 rounded-full mb-3" />
                    <div className="h-2 w-full bg-zinc-700 rounded-full mb-2" />
                    <div className="h-2 w-3/4 bg-zinc-700 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
            {/* Subtle glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.1)_0%,transparent_50%)]" />
          </div>
        </ContainerScroll>
      </div>
    </section>
  )
}
