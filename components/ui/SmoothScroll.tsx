"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "framer-motion"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion()
  const lenisRef = useRef<{ destroy: () => void } | null>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (reducedMotion) return

    let mounted = true

    async function init() {
      try {
        const { default: Lenis } = await import("lenis")
        if (!mounted) return

        const lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          touchMultiplier: 2,
        })
        lenisRef.current = lenis

        function raf(time: number) {
          if (!mounted) return
          lenis.raf(time)
          rafRef.current = requestAnimationFrame(raf)
        }
        rafRef.current = requestAnimationFrame(raf)
      } catch {
        // Lenis failed — native scroll works perfectly
      }
    }

    init()

    return () => {
      mounted = false
      cancelAnimationFrame(rafRef.current)
      lenisRef.current?.destroy()
    }
  }, [reducedMotion])

  return <>{children}</>
}
