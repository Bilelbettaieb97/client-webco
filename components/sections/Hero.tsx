"use client"

import { motion, useReducedMotion, useMotionValue, useSpring } from "framer-motion"
import { Star } from "lucide-react"
import { AnimatedPaths } from "@/components/ui/AnimatedPaths"
import { LivePageDemo } from "@/components/ui/LivePageDemo"
import { TextReveal } from "@/components/ui/TextReveal"
import { MagneticButton } from "@/components/ui/MagneticButton"
import { ParallaxSection } from "@/components/ui/ParallaxSection"
import { FluidBackground } from "@/components/ui/FluidBackground"
import { ParticleText } from "@/components/ui/ParticleText"
import { useRef, useEffect, useState, type MouseEvent as ReactMouseEvent } from "react"
import type { HeroContent } from "@/lib/types"

interface HeroProps {
  data: HeroContent
}

export function Hero({ data }: HeroProps) {
  const shouldReduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const orbX = useSpring(mouseX, { stiffness: 50, damping: 30 })
  const orbY = useSpring(mouseY, { stiffness: 50, damping: 30 })
  const [orbStyle, setOrbStyle] = useState({ left: '50%', top: '50%' })

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  useEffect(() => {
    if (isTouchDevice || shouldReduce) return
    const unsubX = orbX.on("change", (x) => {
      setOrbStyle(prev => ({ ...prev, left: `${x * 100}%` }))
    })
    const unsubY = orbY.on("change", (y) => {
      setOrbStyle(prev => ({ ...prev, top: `${y * 100}%` }))
    })
    return () => { unsubX(); unsubY() }
  }, [orbX, orbY, isTouchDevice, shouldReduce])

  function handleMouseMove(e: ReactMouseEvent) {
    if (!sectionRef.current || isTouchDevice || shouldReduce) return
    const rect = sectionRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  const title = data.title || "Multipliez vos conversions B2B par 3 en 30 jours"

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen overflow-hidden bg-bg"
      aria-label="Accueil"
      onMouseMove={handleMouseMove}
    >
      {/* WebGL Fluid Background — bottommost layer */}
      <div className="absolute inset-0 z-0">
        <FluidBackground />
      </div>

      {/* Animated Background Paths — parallax slower */}
      <ParallaxSection speed={-0.15} className="absolute inset-0 z-0">
        <AnimatedPaths />
      </ParallaxSection>

      {/* Gradient orb following mouse */}
      {!shouldReduce && !isTouchDevice && (
        <div
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-0 opacity-20 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(59,130,246,0.2) 50%, transparent 70%)',
            left: orbStyle.left,
            top: orbStyle.top,
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08)_0%,transparent_60%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge — scarcity + urgency */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-green-400 border border-green-400/30 rounded-full bg-green-400/5">
              <span className="pulsing-dot" />
              3 places disponibles ce mois-ci
            </span>
          </motion.div>

          {/* Particle morphing multiplier — WOW first impression */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <ParticleText text="x3.2" className="mx-auto" />
          </motion.div>

          {/* Title -- cinematic text reveal */}
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] tracking-tight">
            <TextReveal text={title} className="text-gradient" />
          </h1>

          {/* Subtitle */}
          <motion.p
            className="mt-6 text-base sm:text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {data.subtitle ||
              "Nos landing pages generent en moyenne x3.2 de conversions pour les entreprises B2B. Design strategique, copywriting data-driven, A/B testing inclus."}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <MagneticButton
              as="a"
              href="#contact"
              className="group relative px-8 py-3.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-accent to-accent-blue text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 cursor-pointer min-h-[44px] flex items-center"
            >
              <span className="relative z-10">{data.cta_primary || "Obtenir mon audit CRO gratuit"}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </MagneticButton>
            <a
              href="#resultats"
              className="px-8 py-3.5 text-sm font-semibold rounded-lg border border-zinc-700 text-text hover:border-accent/50 hover:bg-accent/5 transition-all duration-300 cursor-pointer min-h-[44px] flex items-center"
            >
              {data.cta_secondary || "Voir les resultats clients →"}
            </a>
          </motion.div>

          {/* Micro-proof */}
          <motion.div
            className="mt-8 flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: shouldReduce ? 0 : 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-sm font-medium text-text stat-number">4.9/5</span>
              <span className="text-sm text-text-muted">— Note par +50 directeurs marketing B2B</span>
            </div>
            <p className="text-xs text-text-muted/70">
              Deja adopte par DataFlow, PaySecure, CloudOps et <span className="stat-number">200+</span> entreprises B2B
            </p>
          </motion.div>
        </div>

        {/* LivePageDemo — Animated landing page being built in real-time */}
        <motion.div
          className="mt-16 sm:mt-20"
          initial={{ opacity: 0, y: shouldReduce ? 0 : 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <LivePageDemo />
        </motion.div>
      </div>

      {/* Animated gradient line divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="animated-gradient-line w-full" />
      </div>
    </section>
  )
}
