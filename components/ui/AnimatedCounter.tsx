'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  label: string
  duration?: number
}

export function AnimatedCounter({
  value,
  suffix = '',
  label,
  duration = 2,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const shouldReduce = useReducedMotion()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    if (shouldReduce) {
      setCount(value)
      return
    }

    let start = 0
    const end = value
    const incrementTime = (duration * 1000) / end
    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start >= end) clearInterval(timer)
    }, incrementTime)

    return () => clearInterval(timer)
  }, [isInView, value, duration, shouldReduce])

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-4xl sm:text-5xl font-display font-bold text-gradient">
        {count}
        {suffix}
      </div>
      <div className="mt-2 text-sm text-text-muted uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  )
}
