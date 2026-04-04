"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { BrowserMockup } from "./BrowserMockup"

const CYCLE_DURATION = 12000 // 12 seconds total

export function LivePageDemo() {
  const shouldReduce = useReducedMotion()
  const [step, setStep] = useState(0)
  const [typedText, setTypedText] = useState("")
  const [conversionCount, setConversionCount] = useState(0)
  const mountedRef = useRef(true)
  const headline = "Multipliez vos leads par 3"

  // Track mounted state
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  useEffect(() => {
    if (shouldReduce) {
      setStep(7)
      setTypedText(headline)
      setConversionCount(78)
      return
    }

    // Step progression
    const timings = [0, 800, 1500, 4200, 5200, 6200, 7500, 9000]
    const timeouts: ReturnType<typeof setTimeout>[] = []
    let cycleInterval: ReturnType<typeof setInterval> | null = null

    function runCycle() {
      if (!mountedRef.current) return
      setStep(0)
      setTypedText("")
      setConversionCount(0)

      timings.forEach((delay, i) => {
        const t = setTimeout(() => {
          if (mountedRef.current) setStep(i)
        }, delay)
        timeouts.push(t)
      })
    }

    runCycle()
    cycleInterval = setInterval(runCycle, CYCLE_DURATION)

    return () => {
      timeouts.forEach(clearTimeout)
      if (cycleInterval) clearInterval(cycleInterval)
    }
  }, [shouldReduce])

  // Typewriter effect for step 2
  useEffect(() => {
    if (shouldReduce) return
    if (step < 2) {
      setTypedText("")
      return
    }
    if (step === 2) {
      let index = 0
      setTypedText("")
      const typeInterval = setInterval(() => {
        if (!mountedRef.current) {
          clearInterval(typeInterval)
          return
        }
        if (index < headline.length) {
          setTypedText(headline.substring(0, index + 1))
          index++
        } else {
          clearInterval(typeInterval)
        }
      }, 60)
      return () => clearInterval(typeInterval)
    }
  }, [step, shouldReduce])

  // Conversion counter for step 7
  useEffect(() => {
    if (shouldReduce) return
    if (step === 7) {
      let count = 0
      const countInterval = setInterval(() => {
        if (!mountedRef.current) {
          clearInterval(countInterval)
          return
        }
        count += 2
        if (count >= 78) {
          setConversionCount(78)
          clearInterval(countInterval)
        } else {
          setConversionCount(count)
        }
      }, 30)
      return () => clearInterval(countInterval)
    }
  }, [step, shouldReduce])

  return (
    <BrowserMockup url="votresite-webco.com" className="w-full max-w-5xl mx-auto">
      <div className="aspect-video relative overflow-hidden bg-[#09090b] p-3 sm:p-6 md:p-8">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.06)_0%,transparent_60%)]" />

        {/* --- Step 1: Navbar slides down --- */}
        <motion.div
          className="relative z-10 flex items-center justify-between mb-4 sm:mb-6"
          initial={{ y: -30, opacity: 0 }}
          animate={step >= 1 ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="h-3 w-16 sm:w-24 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full" />
          <div className="flex gap-2 sm:gap-4 items-center">
            <div className="h-2 w-8 sm:w-12 bg-zinc-700 rounded-full hidden sm:block" />
            <div className="h-2 w-8 sm:w-12 bg-zinc-700 rounded-full hidden sm:block" />
            <div className="h-2 w-8 sm:w-12 bg-zinc-700 rounded-full hidden sm:block" />
            <div className="h-6 sm:h-7 w-16 sm:w-24 bg-gradient-to-r from-violet-600 to-blue-600 rounded-md" />
          </div>
        </motion.div>

        {/* --- Step 2: Hero headline types in --- */}
        <div className="relative z-10 mt-2 sm:mt-4 md:mt-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={step >= 2 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight min-h-[1.5em] sm:min-h-[2em]">
              {typedText}
              {step === 2 && typedText.length < headline.length && (
                <span className="typewriter-cursor" />
              )}
            </p>
            <motion.p
              className="text-[10px] sm:text-sm text-zinc-500 mt-2 max-w-[70%]"
              initial={{ opacity: 0 }}
              animate={step >= 2 && typedText.length >= headline.length ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              Des landing pages qui convertissent. Design strategique, copywriting data-driven.
            </motion.p>
          </motion.div>
        </div>

        {/* --- Step 3: CTA button scales in --- */}
        <motion.div
          className="relative z-10 mt-3 sm:mt-5"
          initial={{ scale: 0, opacity: 0 }}
          animate={step >= 3 ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-violet-600 to-blue-600 rounded-lg text-white text-[10px] sm:text-sm font-semibold shadow-lg shadow-violet-500/20">
            Obtenir mon audit gratuit
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </motion.div>

        {/* --- Step 4: Logo bar fades in --- */}
        <motion.div
          className="relative z-10 mt-4 sm:mt-6 flex items-center gap-3 sm:gap-6"
          initial={{ opacity: 0, y: 10 }}
          animate={step >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {["DataFlow", "PaySecure", "CloudOps", "TalentHub"].map((name) => (
            <motion.span
              key={name}
              className="text-[8px] sm:text-[10px] md:text-xs text-zinc-600 font-medium"
              initial={{ opacity: 0 }}
              animate={step >= 4 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {name}
            </motion.span>
          ))}
        </motion.div>

        {/* --- Step 5: Stats count up --- */}
        <motion.div
          className="relative z-10 mt-4 sm:mt-6 grid grid-cols-3 gap-2 sm:gap-4 max-w-xs sm:max-w-md"
          initial={{ opacity: 0, y: 15 }}
          animate={step >= 5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.5 }}
        >
          {[
            { val: "3.2x", label: "Conversions" },
            { val: "200+", label: "Pages" },
            { val: "48h", label: "Draft" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-1.5 sm:p-3 rounded-lg bg-zinc-800/40 border border-zinc-700/40">
              <p className="text-[10px] sm:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400 stat-number">
                {stat.val}
              </p>
              <p className="text-[7px] sm:text-[10px] text-zinc-600">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* --- Step 6: Testimonial card slides in --- */}
        <motion.div
          className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-10"
          initial={{ x: 100, opacity: 0 }}
          animate={step >= 6 ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="p-2.5 sm:p-4 rounded-lg bg-zinc-800/80 border border-zinc-700/60 backdrop-blur-sm max-w-[140px] sm:max-w-[200px]">
            <div className="flex gap-0.5 mb-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} className="w-2 h-2 sm:w-3 sm:h-3 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-[8px] sm:text-[10px] text-zinc-300 italic leading-snug">
              &quot;Notre taux de conversion a triple en 30 jours.&quot;
            </p>
            <p className="text-[7px] sm:text-[9px] text-zinc-500 mt-1">— Marc D., CEO DataFlow</p>
          </div>
        </motion.div>

        {/* --- Step 7: Conversion rate badge pulses --- */}
        <motion.div
          className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 z-10"
          initial={{ scale: 0, opacity: 0 }}
          animate={
            step >= 7
              ? { scale: 1, opacity: 1 }
              : { scale: 0, opacity: 0 }
          }
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <motion.div
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-green-500/20 border border-green-500/40"
            animate={step >= 7 && !shouldReduce ? { boxShadow: ["0 0 0 0 rgba(34,197,94,0.3)", "0 0 0 8px rgba(34,197,94,0)", "0 0 0 0 rgba(34,197,94,0.3)"] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-[10px] sm:text-xs font-bold text-green-400 stat-number">
              Conversion: {conversionCount / 10}%
            </p>
          </motion.div>
        </motion.div>
      </div>
    </BrowserMockup>
  )
}
