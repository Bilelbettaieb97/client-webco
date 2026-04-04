'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import type { AboutContent } from '@/lib/types'

function Counter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const increment = Math.max(1, Math.floor(value / 40))
    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 50)
    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl sm:text-4xl font-display font-bold text-gradient">
        {count}{suffix}
      </div>
      <div className="mt-1 text-xs sm:text-sm text-text-muted uppercase tracking-wider">
        {label}
      </div>
    </div>
  )
}

interface AboutHTMLProps {
  data: AboutContent
}

export function AboutHTML({ data }: AboutHTMLProps) {
  return (
    <div
      style={{ position: 'absolute', top: '300vh', left: 0, width: '100%', height: '100vh' }}
      className="pointer-events-none"
    >
      <div className="flex flex-col justify-center h-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gradient leading-tight"
            >
              {data.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 text-base sm:text-lg text-text-muted leading-relaxed"
            >
              {data.description}
            </motion.p>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-6 sm:gap-8"
          >
            {data.stats.map((stat) => (
              <div
                key={stat.label}
                className="backdrop-blur-xl bg-white/[0.04] border border-white/10 rounded-2xl p-5 sm:p-6"
              >
                <Counter value={stat.value} suffix={stat.suffix} label={stat.label} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
