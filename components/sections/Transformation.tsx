"use client"

import { motion, useReducedMotion } from "framer-motion"
import { BrowserMockup } from "@/components/ui/BrowserMockup"

function BadPage() {
  return (
    <div className="p-4 sm:p-6 min-h-[220px] sm:min-h-[280px] bg-white relative overflow-hidden">
      {/* Generic, boring, white landing page */}
      <div className="space-y-3">
        {/* Generic navbar */}
        <div className="flex items-center justify-between mb-4">
          <div className="h-2.5 w-16 bg-gray-300 rounded" />
          <div className="flex gap-3">
            <div className="h-2 w-10 bg-gray-200 rounded" />
            <div className="h-2 w-10 bg-gray-200 rounded" />
            <div className="h-2 w-10 bg-gray-200 rounded" />
          </div>
        </div>
        {/* Generic heading */}
        <div className="h-4 w-3/4 bg-gray-300 rounded" />
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
        {/* Too much text */}
        <div className="space-y-1.5 mt-3">
          <div className="h-2 w-full bg-gray-100 rounded" />
          <div className="h-2 w-full bg-gray-100 rounded" />
          <div className="h-2 w-5/6 bg-gray-100 rounded" />
          <div className="h-2 w-full bg-gray-100 rounded" />
          <div className="h-2 w-4/5 bg-gray-100 rounded" />
        </div>
        {/* Generic blue button */}
        <div className="mt-4 h-8 w-28 bg-blue-400 rounded" />
        {/* Stock photo placeholder */}
        <div className="mt-4 h-16 sm:h-24 w-full bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-gray-200" />
        </div>
      </div>
    </div>
  )
}

function GoodPage() {
  return (
    <div className="p-4 sm:p-6 min-h-[220px] sm:min-h-[280px] bg-[#09090b] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.08)_0%,transparent_60%)]" />
      <div className="relative z-10 space-y-3">
        {/* Premium navbar */}
        <div className="flex items-center justify-between mb-4">
          <div className="h-2.5 w-14 bg-gradient-to-r from-violet-500 to-blue-500 rounded" />
          <div className="flex gap-3 items-center">
            <div className="h-2 w-8 bg-zinc-700 rounded" />
            <div className="h-2 w-8 bg-zinc-700 rounded" />
            <div className="h-5 w-16 bg-gradient-to-r from-violet-600 to-blue-600 rounded-md" />
          </div>
        </div>
        {/* Bold headline */}
        <div className="h-5 w-3/4 bg-gradient-to-r from-white to-white/80 rounded" />
        <div className="h-5 w-1/2 bg-gradient-to-r from-violet-400/60 to-blue-400/60 rounded" />
        {/* Concise subtext */}
        <div className="space-y-1.5 mt-2">
          <div className="h-2 w-full bg-zinc-800 rounded" />
          <div className="h-2 w-4/5 bg-zinc-800/60 rounded" />
        </div>
        {/* CTA */}
        <div className="mt-3 h-8 w-32 bg-gradient-to-r from-violet-600 to-blue-600 rounded-lg" />
        {/* Social proof pills */}
        <div className="flex gap-2 mt-3">
          <div className="h-5 w-16 bg-zinc-800 rounded-full border border-zinc-700" />
          <div className="h-5 w-20 bg-zinc-800 rounded-full border border-zinc-700" />
          <div className="h-5 w-14 bg-zinc-800 rounded-full border border-zinc-700" />
        </div>
        {/* Stats bar */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="h-10 rounded bg-zinc-800/60 border border-zinc-700/30 flex items-center justify-center">
            <div className="h-2 w-8 bg-green-500/40 rounded" />
          </div>
          <div className="h-10 rounded bg-zinc-800/60 border border-zinc-700/30 flex items-center justify-center">
            <div className="h-2 w-8 bg-violet-500/40 rounded" />
          </div>
          <div className="h-10 rounded bg-zinc-800/60 border border-zinc-700/30 flex items-center justify-center">
            <div className="h-2 w-8 bg-blue-500/40 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function Transformation() {
  const shouldReduce = useReducedMotion()

  return (
    <section
      id="transformation"
      className="relative py-24 sm:py-32 lg:py-40 bg-bg"
      aria-label="La transformation"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-start">
          {/* AVANT */}
          <motion.div
            className="lg:pr-12"
            initial={shouldReduce ? {} : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-3xl sm:text-4xl font-display font-bold text-zinc-500 mb-6 tracking-tight">
              Avant
            </p>
            <BrowserMockup url="landing-generique.com">
              <BadPage />
            </BrowserMockup>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-mono font-bold text-red-400/80 stat-number">
                1.2%
              </span>
              <span className="text-sm text-text-muted/50">
                Taux de conversion moyen du marche
              </span>
            </div>
          </motion.div>

          {/* Divider — vertical on desktop, horizontal on mobile */}
          <div className="hidden lg:block absolute left-1/2 top-[15%] bottom-[15%] w-px -translate-x-1/2">
            <div className="h-full w-full bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
          </div>
          <div className="lg:hidden w-full h-px my-4">
            <div className="h-full w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          </div>

          {/* APRES */}
          <motion.div
            className="lg:pl-12"
            initial={shouldReduce ? {} : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="text-3xl sm:text-4xl font-display font-bold text-text mb-6 tracking-tight">
              Apres <span className="text-gradient">Webco</span>
            </p>
            <BrowserMockup url="votre-site.webco.fr">
              <GoodPage />
            </BrowserMockup>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-mono font-bold text-green-400 stat-number">
                7.8%
              </span>
              <span className="text-sm text-text-muted/50">
                Taux de conversion de nos clients
              </span>
            </div>
          </motion.div>
        </div>

        {/* Bottom line */}
        <motion.p
          className="mt-16 sm:mt-20 text-center text-base sm:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed"
          initial={shouldReduce ? {} : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Chaque element de votre page a un objectif. Chez nous, cet objectif, c&apos;est la conversion.
        </motion.p>
      </div>
    </section>
  )
}
