"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

export function StickyCta() {
  const [isVisible, setIsVisible] = useState(false)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    function handleScroll() {
      // Show after scrolling past ~100vh
      const threshold = window.innerHeight
      setIsVisible(window.scrollY > threshold)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="sticky-cta-bar md:hidden"
          initial={{ y: shouldReduce ? 0 : 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: shouldReduce ? 0 : 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          aria-label="Action rapide"
        >
          <p className="text-xs text-green-400 text-center mb-2 flex items-center justify-center gap-1.5">
            <span className="pulsing-dot" />
            3 places disponibles en avril
          </p>
          <a
            href="#contact"
            className="block w-full text-center py-3 text-sm font-semibold rounded-lg bg-gradient-to-r from-accent to-accent-blue text-white min-h-[48px] flex items-center justify-center"
          >
            Obtenir mon audit gratuit
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
