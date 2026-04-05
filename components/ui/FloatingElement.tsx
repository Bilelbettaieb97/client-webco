"use client"
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

interface FloatingElementProps {
  shape: 'circle' | 'ring' | 'dot' | 'line' | 'cross'
  size?: number
  color?: string
  speed?: number
  className?: string
  opacity?: number
  rotate?: number
}

export function FloatingElement({
  shape,
  size = 40,
  color = 'accent',
  speed = 0.5,
  className = '',
  opacity = 0.15,
  rotate = 0,
}: FloatingElementProps) {
  const ref = useRef(null)
  const shouldReduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [speed * 120, speed * -120])
  const r = useTransform(scrollYProgress, [0, 1], [0, rotate])

  if (shouldReduce) return null

  const colorVar = `var(--${color})`

  const shapeElement = () => {
    switch (shape) {
      case 'circle':
        return <div style={{ width: size, height: size, borderRadius: '50%', background: colorVar, opacity }} />
      case 'ring':
        return <div style={{ width: size, height: size, borderRadius: '50%', border: `1.5px solid ${colorVar}`, opacity }} />
      case 'dot':
        return <div style={{ width: size * 0.3, height: size * 0.3, borderRadius: '50%', background: colorVar, opacity }} />
      case 'line':
        return <div style={{ width: size, height: 1.5, background: `linear-gradient(90deg, transparent, ${colorVar}, transparent)`, opacity }} />
      case 'cross':
        return (
          <div style={{ width: size, height: size, position: 'relative', opacity }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: 1.5, background: colorVar, transform: 'translateY(-50%)' }} />
            <div style={{ position: 'absolute', left: '50%', top: 0, width: 1.5, height: '100%', background: colorVar, transform: 'translateX(-50%)' }} />
          </div>
        )
    }
  }

  return (
    <motion.div
      ref={ref}
      style={{ y, rotate: r }}
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {shapeElement()}
    </motion.div>
  )
}