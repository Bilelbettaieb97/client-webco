"use client"

import { useRef, useState, useEffect, useCallback, type ReactNode } from "react"
import { useReducedMotion } from "framer-motion"

interface RevealCursorProps {
  children: ReactNode
  revealContent: ReactNode
  hint?: string
}

export function RevealCursor({
  children,
  revealContent,
  hint = "Deplacez votre curseur pour reveler les insights",
}: RevealCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 })
  const [isHovering, setIsHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(
      "ontouchstart" in window || navigator.maxTouchPoints > 0
    )
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || isMobile) return
      const rect = containerRef.current.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    },
    [isMobile]
  )

  const handleMouseEnter = useCallback(() => {
    if (!isMobile) setIsHovering(true)
  }, [isMobile])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    setMousePos({ x: -9999, y: -9999 })
  }, [])

  // Mobile or reduced motion: show reveal layer permanently
  if (isMobile || shouldReduce) {
    return (
      <div className="relative">
        {children}
        <div className="absolute inset-0 pointer-events-none z-10">
          {revealContent}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Normal layer */}
      {children}

      {/* Reveal layer — masked to cursor circle */}
      <div
        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          maskImage: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, black 60px, transparent 150px)`,
          WebkitMaskImage: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, black 60px, transparent 150px)`,
        }}
      >
        {revealContent}
      </div>

      {/* Hint text */}
      {!isHovering && (
        <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-text-muted/60 whitespace-nowrap z-20 pointer-events-none">
          {hint}
        </p>
      )}
    </div>
  )
}
