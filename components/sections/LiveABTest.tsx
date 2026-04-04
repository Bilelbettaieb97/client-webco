"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, useReducedMotion, AnimatePresence } from "framer-motion"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { BrowserMockup } from "@/components/ui/BrowserMockup"
import { Star } from "lucide-react"

type Choice = "A" | "B" | null

const STORAGE_KEY = "webco_ab_choice"

export function LiveABTest() {
  const shouldReduce = useReducedMotion()
  const [choice, setChoice] = useState<Choice>(null)
  const [showResults, setShowResults] = useState(false)
  const [animatedA, setAnimatedA] = useState(0)
  const [animatedB, setAnimatedB] = useState(0)

  // Check localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Choice
      if (stored === "A" || stored === "B") {
        setChoice(stored)
        setShowResults(true)
        setAnimatedA(12)
        setAnimatedB(88)
      }
    } catch {
      // localStorage unavailable
    }
  }, [])

  const handleChoice = useCallback(
    (variant: "A" | "B") => {
      if (choice) return
      setChoice(variant)
      try {
        localStorage.setItem(STORAGE_KEY, variant)
      } catch {
        // ignore
      }

      // Animate results
      setTimeout(() => {
        setShowResults(true)
        // Animate numbers from 0
        const duration = shouldReduce ? 0 : 1200
        const steps = shouldReduce ? 1 : 30
        const interval = duration / steps
        let step = 0
        const timer = setInterval(() => {
          step++
          const progress = step / steps
          const ease = 1 - Math.pow(1 - progress, 3)
          setAnimatedA(Math.round(12 * ease))
          setAnimatedB(Math.round(88 * ease))
          if (step >= steps) clearInterval(timer)
        }, interval)
      }, 300)
    },
    [choice, shouldReduce]
  )

  return (
    <section
      id="ab-test"
      className="relative py-24 sm:py-32 bg-bg"
      aria-label="Test A/B interactif"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="A/B Test"
          title="Quel design convertit le mieux ?"
          subtitle="Cliquez sur votre choix. C'est exactement ce qu'on fait pour optimiser vos landing pages."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Variant A — bad */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduce ? 0 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => handleChoice("A")}
              className={`w-full text-left transition-all duration-500 rounded-2xl ${
                choice === "A"
                  ? "ring-2 ring-accent shadow-lg shadow-accent/20"
                  : choice === "B"
                  ? "opacity-50"
                  : "hover:scale-[1.02]"
              }`}
              disabled={!!choice}
              aria-label="Choisir la variante A"
            >
              {/* Label */}
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-zinc-800 text-sm font-bold text-zinc-400 border border-zinc-700">
                  A
                </span>
                <span className="text-sm text-text-muted">Variante A</span>
                {choice === "A" && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="ml-auto px-3 py-1 text-xs font-semibold text-accent bg-accent/10 border border-accent/30 rounded-full"
                  >
                    Votre choix
                  </motion.span>
                )}
              </div>

              <BrowserMockup url="landing-generique.com">
                <div className="p-6 sm:p-8 min-h-[280px] bg-white">
                  {/* Generic white landing page */}
                  <div className="space-y-4">
                    <p className="text-gray-800 text-base font-medium">
                      Notre solution pour votre entreprise
                    </p>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                      do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                      irure dolor in reprehenderit in voluptate velit esse cillum
                      dolore eu fugiat nulla pariatur.
                    </p>
                    <button className="px-3 py-1.5 text-xs text-gray-500 bg-gray-100 border border-gray-300 rounded cursor-default">
                      Contactez-nous
                    </button>
                  </div>
                </div>
              </BrowserMockup>
            </button>
          </motion.div>

          {/* Variant B — good */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduce ? 0 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <button
              onClick={() => handleChoice("B")}
              className={`w-full text-left transition-all duration-500 rounded-2xl ${
                choice === "B"
                  ? "ring-2 ring-accent shadow-lg shadow-accent/20"
                  : choice === "A"
                  ? "opacity-50"
                  : "hover:scale-[1.02]"
              }`}
              disabled={!!choice}
              aria-label="Choisir la variante B"
            >
              {/* Label */}
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent/20 text-sm font-bold text-accent border border-accent/30">
                  B
                </span>
                <span className="text-sm text-text-muted">Variante B</span>
                {choice === "B" && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="ml-auto px-3 py-1 text-xs font-semibold text-accent bg-accent/10 border border-accent/30 rounded-full"
                  >
                    Votre choix
                  </motion.span>
                )}
              </div>

              <BrowserMockup url="landing-optimisee.com">
                <div className="p-6 sm:p-8 min-h-[280px] bg-[#09090b] relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.08)_0%,transparent_60%)]" />
                  <div className="relative z-10 space-y-4">
                    <h4 className="text-lg sm:text-xl font-bold text-gradient font-display">
                      Reduisez votre CAC de 40% en 30 jours
                    </h4>

                    {/* Social proof */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={10}
                            className="fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-zinc-400">
                        200+ clients
                      </span>
                      <div className="flex gap-1 ml-1">
                        {["DF", "PS"].map((l) => (
                          <span
                            key={l}
                            className="px-1.5 py-0.5 text-[8px] font-mono text-zinc-500 bg-zinc-800 rounded border border-zinc-700"
                          >
                            {l}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bullet points */}
                    <ul className="space-y-1.5">
                      {[
                        "Audit CRO complet de votre landing page",
                        "Redesign oriente conversion",
                        "A/B testing integre et suivi",
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-xs text-zinc-300"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Urgency */}
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-medium text-green-400 bg-green-400/5 border border-green-400/20 rounded-full">
                      <span className="pulsing-dot" style={{ width: 6, height: 6 }} />
                      3 places ce mois
                    </span>

                    {/* CTA */}
                    <div>
                      <span className="inline-block px-5 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-accent to-accent-blue text-white shadow-lg shadow-accent/20 cursor-default">
                        Obtenir ma strategie gratuite
                      </span>
                    </div>
                  </div>
                </div>
              </BrowserMockup>
            </button>
          </motion.div>
        </div>

        {/* Results */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: shouldReduce ? 0 : 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              transition={{ duration: shouldReduce ? 0 : 0.6 }}
              className="mt-10 max-w-2xl mx-auto overflow-hidden"
            >
              {/* Results bar */}
              <div className="relative h-12 rounded-xl overflow-hidden bg-zinc-800 flex">
                <motion.div
                  className="h-full bg-zinc-700 flex items-center justify-center"
                  initial={{ width: "0%" }}
                  animate={{ width: `${animatedA}%` }}
                  transition={{
                    duration: shouldReduce ? 0 : 1.2,
                    ease: "easeOut",
                  }}
                >
                  <span className="text-sm font-bold text-zinc-400 stat-number">
                    A: {animatedA}%
                  </span>
                </motion.div>
                <motion.div
                  className="h-full bg-gradient-to-r from-accent to-accent-blue flex items-center justify-center"
                  initial={{ width: "0%" }}
                  animate={{ width: `${animatedB}%` }}
                  transition={{
                    duration: shouldReduce ? 0 : 1.2,
                    ease: "easeOut",
                  }}
                >
                  <span className="text-sm font-bold text-white stat-number">
                    B: {animatedB}%
                  </span>
                </motion.div>
              </div>

              {/* Message */}
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: shouldReduce ? 0 : 1.0 }}
              >
                <p className="text-base text-text-muted leading-relaxed max-w-lg mx-auto">
                  <span className="text-green-400 font-semibold stat-number">
                    88%
                  </span>{" "}
                  des visiteurs preferent la{" "}
                  <span className="text-accent font-semibold">Variante B</span>.
                  C&apos;est exactement les principes CRO que nous appliquons a
                  vos landing pages.
                </p>

                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center px-8 py-3.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-accent to-accent-blue text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 cursor-pointer min-h-[44px]"
                >
                  Appliquer ces principes a ma page →
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
