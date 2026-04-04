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
  "rgba(139,92,246,",   // violet
  "rgba(59,130,246,",   // blue
  "rgba(6,182,212,",    // cyan
  "rgba(255,255,255,",  // white
]

export function ParticleText({ text, className = "" }: ParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const shouldReduce = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef<number>(0)
  const initializedRef = useRef(false)

  useEffect(() => {
    setIsMobile(
      window.innerWidth < 768 ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0
    )
  }, [])

  const initParticles = useCallback(
    (canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const dpr = Math.min(window.devicePixelRatio, 2)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)

      // Draw text to offscreen canvas to sample pixels
      const offscreen = document.createElement("canvas")
      offscreen.width = w
      offscreen.height = h
      const offCtx = offscreen.getContext("2d")
      if (!offCtx) return

      // Calculate font size based on container
      const fontSize = Math.min(w * 0.35, 160)
      offCtx.font = `900 ${fontSize}px "JetBrains Mono", monospace`
      offCtx.textAlign = "center"
      offCtx.textBaseline = "middle"
      offCtx.fillStyle = "#fff"
      offCtx.fillText(text, w / 2, h / 2)

      // Sample pixel data
      const imageData = offCtx.getImageData(0, 0, w, h)
      const pixels = imageData.data

      const particles: Particle[] = []
      const gap = Math.max(3, Math.floor(w / 200))

      for (let y = 0; y < h; y += gap) {
        for (let x = 0; x < w; x += gap) {
          const i = (y * w + x) * 4
          if (pixels[i + 3] > 128) {
            const colorIdx = Math.floor(Math.random() * COLORS.length)
            particles.push({
              x: Math.random() * w,
              y: Math.random() * h,
              targetX: x,
              targetY: y,
              vx: (Math.random() - 0.5) * 2,
              vy: (Math.random() - 0.5) * 2,
              size: 1.5 + Math.random() * 1.2,
              color: COLORS[colorIdx],
              alpha: 0.6 + Math.random() * 0.4,
            })
          }
        }
      }

      particlesRef.current = particles
    },
    [text]
  )

  useEffect(() => {
    if (shouldReduce || isMobile) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Initialize particles
    if (!initializedRef.current) {
      initParticles(canvas)
      initializedRef.current = true
    }

    const dpr = Math.min(window.devicePixelRatio, 2)
    const w = canvas.clientWidth
    const h = canvas.clientHeight

    let time = 0

    function render() {
      if (!ctx) return
      ctx.clearRect(0, 0, w, h)
      time += 0.016

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (const p of particlesRef.current) {
        // Spring toward target
        const dx = p.targetX - p.x
        const dy = p.targetY - p.y
        p.vx += dx * 0.05
        p.vy += dy * 0.05

        // Mouse repulsion
        const mdx = p.x - mx
        const mdy = p.y - my
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mDist < 100) {
          const force = (100 - mDist) / 100
          p.vx += (mdx / mDist) * force * 3
          p.vy += (mdy / mDist) * force * 3
        }

        // Gentle breathing
        p.vx += Math.sin(time + p.targetX * 0.01) * 0.02
        p.vy += Math.cos(time + p.targetY * 0.01) * 0.02

        // Friction
        p.vx *= 0.9
        p.vy *= 0.9

        p.x += p.vx
        p.y += p.vy

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color + p.alpha + ")"
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(render)
    }

    rafRef.current = requestAnimationFrame(render)

    // Throttled mouse listener
    let lastUpdate = 0
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now()
      if (now - lastUpdate < 16) return
      lastUpdate = now
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    canvas.addEventListener("mousemove", handleMouseMove, { passive: true })

    // Handle resize
    const ro = new ResizeObserver(() => {
      const newDpr = Math.min(window.devicePixelRatio, 2)
      const newW = canvas.clientWidth
      const newH = canvas.clientHeight
      canvas.width = newW * newDpr
      canvas.height = newH * newDpr
      ctx.scale(newDpr, newDpr)
      initializedRef.current = false
      initParticles(canvas)
      initializedRef.current = true
    })
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(rafRef.current)
      canvas.removeEventListener("mousemove", handleMouseMove)
      ro.disconnect()
    }
  }, [shouldReduce, isMobile, initParticles])

  // Mobile / reduced motion: static gradient text
  if (shouldReduce || isMobile) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <span className="text-6xl sm:text-7xl md:text-8xl font-mono font-black text-gradient leading-none select-none">
          {text}
        </span>
      </div>
    )
  }

  return (
    <canvas
      ref={canvasRef}
      className={`w-full cursor-crosshair ${className}`}
      style={{ height: "180px" }}
      aria-label={`Texte animé: ${text}`}
      role="img"
    />
  )
}
