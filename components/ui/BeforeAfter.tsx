"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { motion, useReducedMotion } from "framer-motion"

export function BeforeAfter() {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const shouldReduce = useReducedMotion()

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100))
    setPosition(pct)
  }, [])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    updatePosition(e.clientX)
  }, [updatePosition])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return
    updatePosition(e.clientX)
  }, [updatePosition])

  const handlePointerUp = useCallback(() => {
    isDragging.current = false
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-5xl mx-auto"
    >
      <div
        ref={containerRef}
        className="relative w-full aspect-[16/10] sm:aspect-[16/8] rounded-xl overflow-hidden border border-zinc-700 select-none touch-none cursor-ew-resize"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        role="slider"
        aria-label="Comparaison avant/apres"
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPosition((p) => Math.max(5, p - 2))
          if (e.key === "ArrowRight") setPosition((p) => Math.min(95, p + 2))
        }}
      >
        {/* AFTER — full background (right side, shown behind) */}
        <div className="absolute inset-0">
          <AfterPage />
        </div>

        {/* BEFORE — clipped (left side) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <BeforePage />
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white/80 z-20"
          style={{ left: `${position}%` }}
        >
          {/* Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg shadow-black/30 flex items-center justify-center before-after-handle z-30">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4L3 10L7 16" stroke="#18181b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13 4L17 10L13 16" stroke="#18181b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-red-500/90 text-white text-xs font-bold uppercase tracking-wider">
          Avant
        </div>
        <div className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full bg-green-500/90 text-white text-xs font-bold uppercase tracking-wider">
          Apres
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────── BEFORE PAGE ─────────────────────── */
function BeforePage() {
  return (
    <div className="w-full h-full bg-gray-100 p-4 sm:p-8 flex flex-col overflow-hidden">
      {/* Conversion badge */}
      <div className="absolute top-10 left-1/4 -translate-x-1/2 z-10 px-3 py-1 rounded-md bg-red-100 border border-red-300 text-red-600 text-[10px] sm:text-xs font-bold stat-number">
        Taux de conversion: 1.2%
      </div>

      {/* Generic navbar */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 mt-6">
        <div className="h-3 w-16 sm:w-20 bg-gray-300 rounded" />
        <div className="flex gap-2 sm:gap-3">
          <div className="h-2 w-8 sm:w-10 bg-gray-200 rounded" />
          <div className="h-2 w-8 sm:w-10 bg-gray-200 rounded" />
          <div className="h-2 w-8 sm:w-10 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Generic headline */}
      <div className="mt-2 sm:mt-4">
        <p className="text-sm sm:text-xl md:text-2xl font-sans text-gray-600 leading-snug">
          Bienvenue sur notre site
        </p>
        <p className="text-[10px] sm:text-sm text-gray-400 mt-2 leading-relaxed max-w-[80%]">
          Nous sommes une entreprise qui fait des choses. Decouvrez nos services et contactez-nous pour en savoir plus sur ce que nous proposons.
        </p>
      </div>

      {/* Tiny boring CTA */}
      <div className="mt-3 sm:mt-4">
        <div className="inline-block px-3 py-1.5 text-[10px] sm:text-xs text-gray-400 border border-gray-300 rounded bg-gray-50">
          En savoir plus
        </div>
      </div>

      {/* Wall of text */}
      <div className="mt-4 sm:mt-6 space-y-1.5">
        <div className="h-2 w-full bg-gray-200 rounded" />
        <div className="h-2 w-full bg-gray-200 rounded" />
        <div className="h-2 w-[95%] bg-gray-200 rounded" />
        <div className="h-2 w-full bg-gray-200 rounded" />
        <div className="h-2 w-[90%] bg-gray-200 rounded" />
        <div className="h-2 w-full bg-gray-200 rounded" />
        <div className="h-2 w-[85%] bg-gray-200 rounded" />
      </div>

      {/* No social proof, just more text */}
      <div className="mt-4 sm:mt-6 space-y-1.5">
        <div className="h-2 w-full bg-gray-200 rounded" />
        <div className="h-2 w-[92%] bg-gray-200 rounded" />
        <div className="h-2 w-full bg-gray-200 rounded" />
      </div>
    </div>
  )
}

/* ─────────────────────── AFTER PAGE ─────────────────────── */
function AfterPage() {
  return (
    <div className="w-full h-full bg-[#09090b] p-4 sm:p-8 flex flex-col overflow-hidden relative">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.1)_0%,transparent_60%)]" />

      {/* Conversion badge */}
      <div className="absolute top-10 right-1/4 translate-x-1/2 z-10 px-3 py-1 rounded-md bg-green-500/20 border border-green-500/40 text-green-400 text-[10px] sm:text-xs font-bold stat-number">
        Taux de conversion: 7.8%
      </div>

      {/* Premium navbar */}
      <div className="relative z-10 flex items-center justify-between mb-4 sm:mb-6 mt-6">
        <div className="h-3 w-16 sm:w-20 bg-gradient-to-r from-violet-500 to-blue-500 rounded" />
        <div className="flex gap-2 sm:gap-3 items-center">
          <div className="h-2 w-8 sm:w-10 bg-zinc-700 rounded" />
          <div className="h-2 w-8 sm:w-10 bg-zinc-700 rounded" />
          <div className="h-6 sm:h-7 w-16 sm:w-20 bg-gradient-to-r from-violet-600 to-blue-600 rounded-md" />
        </div>
      </div>

      {/* Benefit-oriented headline */}
      <div className="relative z-10 mt-2 sm:mt-4">
        <p className="text-sm sm:text-xl md:text-2xl font-bold text-white leading-snug">
          Multipliez vos conversions
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
            par 3 en 30 jours
          </span>
        </p>
        <p className="text-[10px] sm:text-sm text-zinc-400 mt-2 leading-relaxed max-w-[80%]">
          Des landing pages qui convertissent. Design strategique et A/B testing inclus.
        </p>
      </div>

      {/* Large gradient CTA */}
      <div className="relative z-10 mt-3 sm:mt-4">
        <div className="inline-block px-4 sm:px-5 py-2 sm:py-2.5 text-[10px] sm:text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-blue-600 rounded-lg shadow-lg shadow-violet-500/20">
          Obtenir mon audit gratuit
        </div>
      </div>

      {/* Star ratings + logos */}
      <div className="relative z-10 mt-3 sm:mt-4 flex items-center gap-2">
        <div className="flex gap-0.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <svg key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-[9px] sm:text-[10px] text-zinc-400">4.9/5 — 50+ clients B2B</span>
      </div>

      {/* Clean hierarchy - stats */}
      <div className="relative z-10 mt-4 sm:mt-6 grid grid-cols-3 gap-2 sm:gap-3">
        {[
          { val: "3.2x", label: "Conversions" },
          { val: "200+", label: "Pages" },
          { val: "48h", label: "Draft" },
        ].map((s) => (
          <div key={s.label} className="text-center p-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
            <p className="text-xs sm:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400 stat-number">{s.val}</p>
            <p className="text-[8px] sm:text-[10px] text-zinc-500">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
