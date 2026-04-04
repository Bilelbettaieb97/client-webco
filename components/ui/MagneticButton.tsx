"use client"
import { useRef, useEffect, useState, type MouseEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
}

export function MagneticButton({ children, className, href, onClick, type = 'button' }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  function handleMouse(e: MouseEvent) {
    if (!ref.current || isTouchDevice || shouldReduce) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.3)
    y.set((e.clientY - centerY) * 0.3)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  // No magnetic effect on mobile/reduced motion
  if (shouldReduce || isTouchDevice) {
    if (href) return <a href={href} className={className} onClick={onClick}>{children}</a>
    return <button type={type} className={className} onClick={onClick}>{children}</button>
  }

  const inner = href
    ? <a href={href} className={className} onClick={onClick}>{children}</a>
    : <button type={type} className={className} onClick={onClick}>{children}</button>

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className="transform-gpu inline-block"
    >
      {inner}
    </motion.div>
  )
}
