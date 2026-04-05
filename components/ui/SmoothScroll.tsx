"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "framer-motion"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion()
  const lenisRef = useRef<{ destroy: () => void } | null>(null)
  const rafRef = useRef<number>(0)
  const clickHandlerRef = useRef<((e: MouseEvent) => void) | null>(null)

  useEffect(() => {
    if (reducedMotion) return

    let mounted = true

    async function init() {
      try {
        const { default: Lenis } = await import("lenis")
        if (!mounted) return

        const lenis = new Lenis({
          duration: 1.4,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          touchMultiplier: 2,
        })
        lenisRef.current = lenis

        // Anchor link support — buttery smooth scroll to hash targets
        function handleAnchorClick(e: MouseEvent) {
          const target = e.target as HTMLElement
          const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null
          if (!anchor) return
          const hash = anchor.getAttribute("href")
          if (!hash || hash === "#") return
          const el = document.querySelector(hash) as HTMLElement | null
          if (!el) return
          e.preventDefault()
          lenis.scrollTo(el, { offset: -80, duration: 1.6 })
        }
        clickHandlerRef.current = handleAnchorClick
        document.addEventListener("click", handleAnchorClick)

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
      if (clickHandlerRef.current) {
        document.removeEventListener("click", clickHandlerRef.current)
        clickHandlerRef.current = null
      }
      lenisRef.current?.destroy()
    }
  }, [reducedMotion])

  return <>{children}</>
}
