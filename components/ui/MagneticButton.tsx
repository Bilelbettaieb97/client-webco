"use client"
import { useRef, useEffect, useState, type MouseEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  as?: 'button' | 'a'
  href?: string
  onClick?: () => void
  [key: string]: unknown
}

export function MagneticButton({ children, className, as = 'button', href, onClick, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)
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

  const Tag = as === 'a' ? motion.a : motion.button

  if (shouldReduce || isTouchDevice) {
    if (as === 'a') {
      return <a href={href} className={className} onClick={onClick} {...props}>{children}</a>
    }
    return <button className={className} onClick={onClick} {...props}>{children}</button>
  }

  return (
    <Tag
      ref={ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={cn("transform-gpu", className)}
      href={as === 'a' ? href : undefined}
      onClick={onClick}
      {...props}
    >
      {children}
    </Tag>
  )
}
