"use client"

import { useState, useMemo, useCallback } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { SpotlightCard } from "@/components/ui/SpotlightCard"
import { NumberTicker } from "@/components/ui/NumberTicker"
import { TrendingUp, ArrowRight } from "lucide-react"

const MULTIPLIER = 3.2

export function ROICalculator() {
  const shouldReduce = useReducedMotion()
  const [visitors, setVisitors] = useState(10000)
  const [conversionRate, setConversionRate] = useState(2)
  const [leadValue, setLeadValue] = useState(50)

  const results = useMemo(() => {
    const currentLeads = Math.round(visitors * (conversionRate / 100))
    const webcoLeads = Math.round(currentLeads * MULTIPLIER)
    const extraLeads = webcoLeads - currentLeads
    const monthlyRevenue = extraLeads * leadValue
    const annualRevenue = monthlyRevenue * 12
    return { currentLeads, webcoLeads, extraLeads, monthlyRevenue, annualRevenue }
  }, [visitors, conversionRate, leadValue])

  return (
    <div className="w-full max-w-4xl mx-auto">
      <SpotlightCard className="p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Inputs */}
          <div className="space-y-8">
            <SliderInput
              label="Visiteurs mensuels"
              value={visitors}
              onChange={setVisitors}
              min={1000}
              max={100000}
              step={1000}
              suffix=""
              formatValue={(v) => v.toLocaleString("fr-FR")}
            />
            <SliderInput
              label="Taux de conversion actuel"
              value={conversionRate}
              onChange={setConversionRate}
              min={0.5}
              max={10}
              step={0.5}
              suffix="%"
              formatValue={(v) => `${v}%`}
            />
            <SliderInput
              label="Valeur par lead"
              value={leadValue}
              onChange={setLeadValue}
              min={10}
              max={500}
              step={10}
              suffix="EUR"
              formatValue={(v) => `${v}EUR`}
            />
          </div>

          {/* Outputs */}
          <div className="space-y-5">
            {/* Current vs Webco */}
            <div className="grid grid-cols-2 gap-3">
              <ResultCard
                label="Leads actuels"
                value={results.currentLeads}
                suffix="/mois"
                muted
              />
              <ResultCard
                label={`Avec Webco (x${MULTIPLIER})`}
                value={results.webcoLeads}
                suffix="/mois"
                highlight
              />
            </div>

            {/* Extra leads */}
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={16} className="text-green-400" />
                <span className="text-xs font-medium text-green-400 uppercase tracking-wider">Leads supplementaires</span>
              </div>
              <p className="text-2xl font-bold text-green-400 stat-number">
                +<NumberTicker value={results.extraLeads} />/mois
              </p>
            </div>

            {/* Monthly revenue */}
            <div className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
              <p className="text-xs text-text-muted mb-1">Revenue additionnel / mois</p>
              <p className="text-xl font-bold text-text stat-number">
                +<NumberTicker value={results.monthlyRevenue} formatThousands />EUR
              </p>
            </div>

            {/* Annual revenue — THE BIG NUMBER */}
            <motion.div
              className="p-6 rounded-xl bg-gradient-to-br from-violet-500/10 to-blue-500/10 border border-accent/30 text-center"
              animate={shouldReduce ? {} : { scale: [1, 1.01, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-xs text-text-muted mb-2">Vous pourriez gagner</p>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient stat-number leading-none">
                +<NumberTicker value={results.annualRevenue} formatThousands />EUR
              </p>
              <p className="text-sm text-text-muted mt-2">par an</p>
            </motion.div>

            {/* CTA */}
            <a
              href="#contact"
              className="group flex items-center justify-center gap-2 w-full py-3.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-accent to-accent-blue text-white hover:shadow-lg hover:shadow-accent/25 transition-all duration-300 cursor-pointer min-h-[44px]"
            >
              <span>Obtenir ces resultats</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </SpotlightCard>
    </div>
  )
}

/* ─────────────────── Slider Input ─────────────────── */
interface SliderInputProps {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
  suffix: string
  formatValue: (v: number) => string
}

function SliderInput({ label, value, onChange, min, max, step, suffix, formatValue }: SliderInputProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium text-text">{label}</label>
        <span className="text-sm font-bold text-accent stat-number">{formatValue(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        aria-label={label}
      />
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-text-muted stat-number">{formatValue(min)}</span>
        <span className="text-[10px] text-text-muted stat-number">{formatValue(max)}</span>
      </div>
    </div>
  )
}

/* ─────────────────── Result Card ─────────────────── */
function ResultCard({
  label,
  value,
  suffix,
  muted,
  highlight,
}: {
  label: string
  value: number
  suffix: string
  muted?: boolean
  highlight?: boolean
}) {
  return (
    <div
      className={`p-4 rounded-xl border ${
        highlight
          ? "bg-accent/5 border-accent/30"
          : "bg-zinc-800/30 border-zinc-700/50"
      }`}
    >
      <p className="text-[10px] sm:text-xs text-text-muted mb-1 truncate">{label}</p>
      <p
        className={`text-lg sm:text-xl font-bold stat-number ${
          muted ? "text-zinc-500" : "text-gradient"
        }`}
      >
        <NumberTicker value={value} />
        <span className="text-xs text-text-muted ml-1">{suffix}</span>
      </p>
    </div>
  )
}
