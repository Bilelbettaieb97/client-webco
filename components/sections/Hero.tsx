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

  const titleWords = (data.title || "Une landing page. Une idee. Des conversions.").split(" ")

  const gradientWords = ["conversions.", "conversions", "idee.", "idee"]

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
              Agence landing pages B2B
            </span>
          </motion.div>

          {/* Title -- word by word spring animation */}
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
                    gradientWords.includes(word.toLowerCase())
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
              "Nous concevons des landing pages B2B qui transforment votre trafic en clients qualifies. Design strategique, copywriting oriente conversion, developpement sur-mesure."}
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
              <span className="relative z-10">{data.cta_primary || "Reserver un appel strategique"}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              href="#resultats"
              className="px-8 py-3.5 text-sm font-semibold rounded-lg border border-zinc-700 text-text hover:border-accent/50 hover:bg-accent/5 transition-all duration-300 cursor-pointer min-h-[44px] flex items-center"
            >
              {data.cta_secondary || "Voir nos resultats"}
            </a>
          </motion.div>
        </div>

        {/* Container Scroll -- Laptop Mockup */}
        <ContainerScroll>
          {/* Fake landing page preview inside the laptop */}
          <div className="aspect-video bg-white relative overflow-hidden">
            <div className="absolute inset-0 p-6 sm:p-10">
              {/* Nav bar */}
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <div className="h-3 w-24 bg-zinc-200 rounded-full" />
                <div className="flex gap-3">
                  <div className="h-2.5 w-10 bg-zinc-100 rounded-full" />
                  <div className="h-2.5 w-10 bg-zinc-100 rounded-full" />
                  <div className="h-2.5 w-10 bg-zinc-100 rounded-full" />
                </div>
              </div>
              {/* Hero area */}
              <div className="flex flex-col items-start mt-2 sm:mt-4">
                <div className="h-3 w-32 bg-zinc-200 rounded mb-4" />
                <div className="h-7 sm:h-8 w-3/4 bg-zinc-900 rounded mb-2" />
                <div className="h-7 sm:h-8 w-1/2 bg-violet-500 rounded mb-6" />
                <div className="h-3.5 w-full bg-zinc-100 rounded mb-2" />
                <div className="h-3.5 w-5/6 bg-zinc-100 rounded mb-8" />
                <div className="h-11 w-48 bg-violet-600 rounded-lg" />
              </div>
              {/* Trust bar */}
              <div className="flex items-center gap-6 mt-8 sm:mt-12">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="h-2 w-16 bg-zinc-100 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </ContainerScroll>
      </div>
    </section>
  )
}
