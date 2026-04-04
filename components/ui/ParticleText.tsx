"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useReducedMotion } from "framer-motion"

interface ParticleTextProps {
  text: string
  className?: string
}

interface Particle {
  x: number
  y: number
  targetX: number
  targetY: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
}

const COLORS = [
  "rgba(139,92,246,",
  "rgba(59,130,246,",
  "rgba(6,182,212,",
  "rgba(255,255,255,",
]

export function ParticleText({ text, className = "" }: ParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const shouldReduce = useReducedMotion()
  const [isMobile, setIsMobile] = useState(true) // Default true = static text first
  const [canvasReady, setCanvasReady] = useState(false)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef<number>(0)
  const mountedRef = useRef(true)
  const readyFiredRef = useRef(false)

  useEffect(() => {
    setIsMobile(
      window.innerWidth < 768 ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0
    )
  }, [])

  const initParticles = useCallback(
    (canvas: HTMLCanvasElement, w: number, h: number) => {
      try {
        const offscreen = document.createElement("canvas")
        offscreen.width = w
        offscreen.height = h
        const offCtx = offscreen.getContext("2d")
        if (!offCtx) return

        const fontSize = Math.min(w * 0.35, 160)
        offCtx.font = `900 ${fontSize}px "JetBrains Mono", monospace`
        offCtx.textAlign = "center"
        offCtx.textBaseline = "middle"
        offCtx.fillStyle = "#fff"
        offCtx.fillText(text, w / 2, h / 2)

        const imageData = offCtx.getImageData(0, 0, w, h)
        const pixels = imageData.data
        const particles: Particle[] = []
        const gap = Math.max(3, Math.floor(w / 200))

        for (let y = 0; y < h; y += gap) {
          for (let x = 0; x < w; x += gap) {
            const i = (y * w + x) * 4
            if (pixels[i + 3] > 128) {
              particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                targetX: x,
                targetY: y,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: 1.5 + Math.random() * 1.2,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                alpha: 0.6 + Math.random() * 0.4,
              })
            }
          }
        }
        particlesRef.current = particles
      } catch {
        // Init failed — canvas stays hidden, static text visible
      }
    },
    [text]
  )

  useEffect(() => {
    if (shouldReduce || isMobile) return

    const canvas = canvasRef.current
    if (!canvas) return

    mountedRef.current = true
    readyFiredRef.current = false

    try {
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const dpr = Math.min(window.devicePixelRatio, 2)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)

      initParticles(canvas, w, h)

      let time = 0

      function render() {
        if (!mountedRef.current || !ctx) return
        try {
          ctx.clearRect(0, 0, w, h)
          time += 0.016

          const mx = mouseRef.current.x
          const my = mouseRef.current.y

          for (const p of particlesRef.current) {
            p.vx += (p.targetX - p.x) * 0.05
            p.vy += (p.targetY - p.y) * 0.05

            const mdx = p.x - mx
            const mdy = p.y - my
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy)
            if (mDist < 100) {
              const force = (100 - mDist) / 100
              p.vx += (mdx / mDist) * force * 3
              p.vy += (mdy / mDist) * force * 3
            }

            p.vx += Math.sin(time + p.targetX * 0.01) * 0.02
            p.vy += Math.cos(time + p.targetY * 0.01) * 0.02
            p.vx *= 0.9
            p.vy *= 0.9
            p.x += p.vx
            p.y += p.vy

            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
            ctx.fillStyle = p.color + p.alpha + ")"
            ctx.fill()
          }

          // After first frame with particles → signal ready
          if (!readyFiredRef.current && particlesRef.current.length > 0 && mountedRef.current) {
            readyFiredRef.current = true
            setCanvasReady(true)
          }

          rafRef.current = requestAnimationFrame(render)
        } catch {
          // Render failed — canvas stays hidden
        }
      }

      rafRef.current = requestAnimationFrame(render)

      let lastUpdate = 0
      const handleMouseMove = (e: MouseEvent) => {
        const now = performance.now()
        if (now - lastUpdate < 16) return
        lastUpdate = now
        const rect = canvas.getBoundingClientRect()
        mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      }
      canvas.addEventListener("mousemove", handleMouseMove, { passive: true })

      return () => {
        mountedRef.current = false
        cancelAnimationFrame(rafRef.current)
        canvas.removeEventListener("mousemove", handleMouseMove)
      }
    } catch {
      // Canvas completely failed — static text stays visible
      return
    }
  }, [shouldReduce, isMobile, initParticles])

  const showCanvas = !shouldReduce && !isMobile

  return (
    <div className={`relative ${className}`} style={{ height: "180px" }}>
      {/* BASE LAYER: static gradient text — ALWAYS rendered, fades out when canvas ready */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
          canvasReady ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="text-6xl sm:text-7xl md:text-8xl font-mono font-black text-gradient leading-none select-none">
          {text}
        </span>
      </div>

      {/* OVERLAY: canvas that fades in when ready (desktop only) */}
      {showCanvas && (
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full cursor-crosshair transition-opacity duration-700 ${
            canvasReady ? "opacity-100" : "opacity-0"
          }`}
          aria-label={`Texte animé: ${text}`}
          role="img"
        />
      )}
    </div>
  )
}
