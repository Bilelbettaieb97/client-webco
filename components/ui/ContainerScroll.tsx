"use client"

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"

interface ContainerScrollProps {
  children: ReactNode
  titleComponent?: ReactNode
}

export function ContainerScroll({ children, titleComponent }: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const rotateX = useTransform(scrollYProgress, [0, 0.4], shouldReduce ? [0, 0] : [25, 0])
  const scale = useTransform(scrollYProgress, [0, 0.4], shouldReduce ? [1, 1] : [0.85, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.5, 1])
  const translateY = useTransform(scrollYProgress, [0, 0.4], shouldReduce ? [0, 0] : [100, 0])

  return (
    <div ref={containerRef} className="relative pt-12 pb-24">
      {titleComponent && (
        <div className="text-center mb-8">{titleComponent}</div>
      )}
      <div className="mx-auto max-w-5xl" style={{ perspective: "1200px" }}>
        <motion.div
          style={{
            rotateX,
            scale,
            opacity,
            translateY,
          }}
          className="relative mx-4 sm:mx-8 rounded-[30px] bg-zinc-800 border border-zinc-700 p-2 sm:p-3 shadow-2xl shadow-violet-500/5"
        >
          {/* Laptop top bar */}
          <div className="flex items-center gap-2 px-4 py-2 mb-1">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            </div>
            <div className="flex-1 mx-8">
              <div className="h-5 bg-zinc-700 rounded-md flex items-center justify-center">
                <span className="text-[10px] text-zinc-400 font-mono">webco.fr</span>
              </div>
            </div>
          </div>
          {/* Screen content */}
          <div className="overflow-hidden rounded-2xl bg-zinc-900">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
