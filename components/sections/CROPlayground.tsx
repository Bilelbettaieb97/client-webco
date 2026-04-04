"use client"

import { useState, useCallback } from "react"
import { motion, useReducedMotion, AnimatePresence } from "framer-motion"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { BrowserMockup } from "@/components/ui/BrowserMockup"
import { Star } from "lucide-react"

interface Toggle {
  id: string
  label: string
  offLabel: string
  onLabel: string
  impact: number
}

const toggles: Toggle[] = [
  {
    id: "headline",
    label: "Headline orientée bénéfice",
    offLabel: "Titre générique",
    onLabel: "Titre orienté résultat",
    impact: 1.8,
  },
  {
    id: "social",
    label: "Preuve sociale",
    offLabel: "Aucune preuve",
    onLabel: "Avis + logos clients",
    impact: 1.5,
  },
  {
    id: "cta",
    label: "CTA visible",
    offLabel: "CTA discret",
    onLabel: "CTA proéminent",
    impact: 2.1,
  },
  {
    id: "urgency",
    label: "Urgence & rareté",
    offLabel: "Pas d'urgence",
    onLabel: "Badge de rareté",
    impact: 0.8,
  },
  {
    id: "form",
    label: "Formulaire simplifié",
    offLabel: "8 champs",
    onLabel: "3 champs",
    impact: 1.2,
  },
]

const BASE_CONVERSION = 1.2

function getMeterColor(value: number): string {
  if (value < 3) return "#ef4444"
  if (value < 5) return "#f97316"
  return "#22c55e"
}

function getMeterGradient(value: number): string {
  if (value < 3) return "from-red-500 to-red-400"
  if (value < 5) return "from-orange-500 to-yellow-400"
  return "from-green-500 to-emerald-400"
}

export function CROPlayground() {
  const shouldReduce = useReducedMotion()
  const [active, setActive] = useState<Record<string, boolean>>({})

  const conversion = toggles.reduce(
    (acc, t) => acc + (active[t.id] ? t.impact : 0),
    BASE_CONVERSION
  )

  const maxConversion = toggles.reduce((acc, t) => acc + t.impact, BASE_CONVERSION)
  const percentage = (conversion / maxConversion) * 100

  const toggle = useCallback((id: string) => {
    setActive((prev) => ({ ...prev, [id]: !prev[id] }))
  }, [])

  return (
    <section
      id="cro-playground"
      className="relative py-24 sm:py-32 bg-bg"
      aria-label="CRO Playground interactif"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Interactif"
          title="Testez l'impact du CRO en temps réel"
          subtitle="Activez les leviers de conversion et observez le taux grimper."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left: Browser Mockup (60%) */}
          <div className="lg:col-span-3">
            <BrowserMockup url="votrelanding.com">
              <div className="p-6 sm:p-8 min-h-[380px] bg-[#09090b] relative overflow-hidden">
                {/* Subtle radial bg */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.04)_0%,transparent_60%)] pointer-events-none" />

                <div className="relative z-10 space-y-5">
                  {/* Headline */}
                  <AnimatePresence mode="wait">
                    {active.headline ? (
                      <motion.h3
                        key="headline-on"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: shouldReduce ? 0 : 0.3 }}
                        className="text-2xl sm:text-3xl font-display font-bold text-gradient leading-tight"
                      >
                        Doublez vos ventes en 30 jours
                      </motion.h3>
                    ) : (
                      <motion.h3
                        key="headline-off"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: shouldReduce ? 0 : 0.3 }}
                        className="text-lg text-zinc-500 font-medium"
                      >
                        Bienvenue chez nous
                      </motion.h3>
                    )}
                  </AnimatePresence>

                  {/* Subtitle text */}
                  <p className="text-sm text-zinc-500 leading-relaxed max-w-md">
                    Nous aidons les entreprises B2B a optimiser leurs conversions avec un design strategique et du copywriting data-driven.
                  </p>

                  {/* Social proof */}
                  <AnimatePresence>
                    {active.social && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: shouldReduce ? 0 : 0.4 }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-center gap-3 flex-wrap">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className="fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                          <span className="text-xs text-zinc-400 stat-number">
                            4.9/5 — 200+ clients
                          </span>
                          <div className="flex gap-2">
                            {["DF", "PS", "CO"].map((logo) => (
                              <span
                                key={logo}
                                className="px-2 py-0.5 text-[10px] font-mono font-bold text-zinc-500 bg-zinc-800 rounded border border-zinc-700"
                              >
                                {logo}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Urgency badge */}
                  <AnimatePresence>
                    {active.urgency && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: shouldReduce ? 0 : 0.3 }}
                      >
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-green-400 border border-green-400/30 rounded-full bg-green-400/5">
                          <span className="pulsing-dot" />3 places disponibles
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* CTA */}
                  <AnimatePresence mode="wait">
                    {active.cta ? (
                      <motion.div
                        key="cta-on"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: shouldReduce ? 0 : 0.3 }}
                      >
                        <button className="px-8 py-3 text-sm font-semibold rounded-lg bg-gradient-to-r from-accent to-accent-blue text-white shadow-lg shadow-accent/25 cursor-default">
                          Obtenir mon audit gratuit
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="cta-off"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: shouldReduce ? 0 : 0.3 }}
                      >
                        <button className="px-4 py-1.5 text-xs text-zinc-500 rounded border border-zinc-700 bg-zinc-800/50 cursor-default">
                          En savoir plus
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Form */}
                  <AnimatePresence mode="wait">
                    {active.form ? (
                      <motion.div
                        key="form-simple"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: shouldReduce ? 0 : 0.3 }}
                        className="space-y-2 max-w-xs"
                      >
                        {["Nom", "Email", "Message"].map((f) => (
                          <div
                            key={f}
                            className="h-7 rounded bg-zinc-800 border border-zinc-700 px-2 flex items-center"
                          >
                            <span className="text-[10px] text-zinc-500">{f}</span>
                          </div>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="form-complex"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: shouldReduce ? 0 : 0.3 }}
                        className="grid grid-cols-2 gap-1.5 max-w-xs"
                      >
                        {[
                          "Nom",
                          "Prenom",
                          "Email",
                          "Telephone",
                          "Entreprise",
                          "Poste",
                          "Budget",
                          "Message",
                        ].map((f) => (
                          <div
                            key={f}
                            className="h-5 rounded bg-zinc-800/50 border border-zinc-700/50 px-1.5 flex items-center"
                          >
                            <span className="text-[8px] text-zinc-600">{f}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </BrowserMockup>
          </div>

          {/* Right: Toggle panel (40%) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-semibold text-text-muted uppercase tracking-widest mb-6">
              Leviers de conversion
            </h3>
            {toggles.map((t) => {
              const isOn = !!active[t.id]
              return (
                <button
                  key={t.id}
                  onClick={() => toggle(t.id)}
                  className="w-full flex items-center justify-between gap-4 p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/50 transition-colors text-left group"
                  aria-pressed={isOn}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text truncate">
                      {t.label}
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">
                      {isOn ? t.onLabel : t.offLabel}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span
                      className={`text-xs font-mono font-semibold ${
                        isOn ? "text-green-400" : "text-zinc-600"
                      }`}
                    >
                      +{t.impact}%
                    </span>
                    {/* Custom toggle switch */}
                    <div
                      className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
                        isOn
                          ? "bg-gradient-to-r from-accent to-accent-blue"
                          : "bg-zinc-700"
                      }`}
                    >
                      <motion.div
                        className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md"
                        animate={{ left: isOn ? "22px" : "2px" }}
                        transition={{
                          type: shouldReduce ? "tween" : "spring",
                          stiffness: 500,
                          damping: 30,
                          duration: shouldReduce ? 0 : undefined,
                        }}
                      />
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Conversion Meter */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-text-muted">Taux de conversion</span>
            <motion.span
              className="text-3xl sm:text-4xl font-bold stat-number font-mono"
              style={{ color: getMeterColor(conversion) }}
              key={conversion}
              initial={shouldReduce ? {} : { scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              {conversion.toFixed(1)}%
            </motion.span>
          </div>

          {/* Progress bar */}
          <div className="relative h-4 rounded-full bg-zinc-800 overflow-hidden">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${getMeterGradient(conversion)}`}
              initial={{ width: `${(BASE_CONVERSION / maxConversion) * 100}%` }}
              animate={{ width: `${percentage}%` }}
              transition={{
                type: shouldReduce ? "tween" : "spring",
                stiffness: 80,
                damping: 20,
                duration: shouldReduce ? 0 : undefined,
              }}
            />
          </div>

          {/* Scale labels */}
          <div className="flex justify-between mt-2">
            <span className="text-[10px] text-red-400/60 font-mono">1.2%</span>
            <span className="text-[10px] text-orange-400/60 font-mono">4.0%</span>
            <span className="text-[10px] text-green-400/60 font-mono">8.6%</span>
          </div>
        </div>

        {/* Bottom message */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-base text-text-muted max-w-xl mx-auto leading-relaxed">
            Chaque decision de design impacte vos conversions. Chez Webco, rien
            n&apos;est laisse au hasard.
          </p>
          <a
            href="#contact"
            className="mt-6 inline-flex items-center px-8 py-3.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-accent to-accent-blue text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 cursor-pointer min-h-[44px]"
          >
            Optimiser ma landing page →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
