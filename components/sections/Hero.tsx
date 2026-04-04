"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Star } from "lucide-react"
import { AnimatedPaths } from "@/components/ui/AnimatedPaths"
import { BrowserMockup } from "@/components/ui/BrowserMockup"
import type { HeroContent } from "@/lib/types"

interface HeroProps {
  data: HeroContent
}

export function Hero({ data }: HeroProps) {
  const shouldReduce = useReducedMotion()

  const title = data.title || "Multipliez vos conversions B2B par 3 en 30 jours"

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-bg"
      aria-label="Accueil"
    >
      {/* Static gradient background — always visible */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.1) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(59,130,246,0.07) 0%, transparent 50%)",
        }}
      />

      {/* Animated Background Paths */}
      <div className="absolute inset-0 z-0">
        <AnimatedPaths />
      </div>

      {/* Content — NO framer-motion initial:opacity:0, everything visible immediately */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-green-400 border border-green-400/30 rounded-full bg-green-400/5">
              <span className="pulsing-dot" />
              3 places disponibles ce mois-ci
            </span>
          </motion.div>

          {/* Big multiplier — static, always visible */}
          <div className="mt-6">
            <span className="text-6xl sm:text-7xl md:text-8xl font-mono font-black text-gradient leading-none select-none">
              x3.2
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] tracking-tight text-gradient">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
            {data.subtitle ||
              "Nos landing pages génèrent en moyenne x3.2 de conversions pour les entreprises B2B. Design stratégique, copywriting data-driven, A/B testing inclus."}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="group relative px-8 py-3.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-accent to-accent-blue text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 cursor-pointer min-h-[44px] flex items-center"
            >
              <span className="relative z-10">
                {data.cta_primary || "Obtenir mon audit CRO gratuit"}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              href="#resultats"
              className="px-8 py-3.5 text-sm font-semibold rounded-lg border border-zinc-700 text-text hover:border-accent/50 hover:bg-accent/5 transition-all duration-300 cursor-pointer min-h-[44px] flex items-center"
            >
              {data.cta_secondary || "Voir les résultats clients →"}
            </a>
          </div>

          {/* Micro-proof */}
          <div className="mt-8 flex flex-col items-center gap-2">
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="ml-2 text-sm font-medium text-text stat-number">
                4.9/5
              </span>
              <span className="text-sm text-text-muted">
                — Noté par +50 directeurs marketing B2B
              </span>
            </div>
            <p className="text-xs text-text-muted/70">
              Déjà adopté par DataFlow, PaySecure, CloudOps et{" "}
              <span className="stat-number">200+</span> entreprises B2B
            </p>
          </div>
        </div>

        {/* Browser mockup with fake landing page */}
        <div className="mt-16 sm:mt-20 max-w-4xl mx-auto">
          <BrowserMockup url="votre-landing-page.com">
            <div className="p-6 sm:p-8 min-h-[300px] bg-[#09090b] relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.06)_0%,transparent_60%)]" />
              <div className="relative z-10 space-y-4">
                <div className="h-2.5 w-24 bg-zinc-800 rounded" />
                <div className="h-7 w-3/4 bg-gradient-to-r from-accent/40 to-accent-blue/40 rounded" />
                <div className="h-7 w-1/2 bg-gradient-to-r from-accent/30 to-accent-blue/30 rounded" />
                <div className="h-3 w-full bg-zinc-800/60 rounded mt-4" />
                <div className="h-3 w-5/6 bg-zinc-800/40 rounded" />
                <div className="flex items-center gap-2 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-3 h-3 rounded-full bg-yellow-400/50" />
                  ))}
                  <span className="text-[10px] text-zinc-500">200+ clients</span>
                </div>
                <div className="mt-4 h-10 w-48 bg-gradient-to-r from-accent to-accent-blue rounded-lg" />
                <div className="flex items-center gap-2 mt-3">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] text-green-400 bg-green-400/10 border border-green-400/20 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    Taux de conversion: 7.8%
                  </span>
                </div>
              </div>
            </div>
          </BrowserMockup>
        </div>
      </div>

      {/* Gradient line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="animated-gradient-line w-full" />
      </div>
    </section>
  )
}
