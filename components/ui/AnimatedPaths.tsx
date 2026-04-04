"use client"

import { motion } from "framer-motion"

function generatePath(index: number, total: number): string {
  const yOffset = (index / total) * 100
  const amplitude = 15 + (index % 5) * 8
  return `M -100 ${yOffset} Q 25 ${yOffset - amplitude}, 50 ${yOffset} T 100 ${yOffset} T 150 ${yOffset - amplitude / 2} T 200 ${yOffset}`
}

export function AnimatedPaths() {
  const pathCount = 36
  const paths = Array.from({ length: pathCount }, (_, i) => ({
    id: i,
    d: generatePath(i, pathCount),
    delay: i * 0.08,
    duration: 8 + (i % 5) * 2,
    strokeWidth: 0.3 + (i % 3) * 0.15,
    opacity: 0.08 + (i % 4) * 0.03,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Layer 1 */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {paths.slice(0, 18).map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            fill="none"
            stroke="url(#pathGradient1)"
            strokeWidth={path.strokeWidth}
            strokeLinecap="round"
            initial={{ pathLength: 0.3, opacity: 0 }}
            animate={{
              pathLength: [0.3, 0.8, 0.3],
              opacity: [0, path.opacity, 0],
              pathOffset: [0, 1],
            }}
            transition={{
              duration: path.duration,
              delay: path.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        <defs>
          <linearGradient id="pathGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Layer 2 — mirrored */}
      <svg
        className="absolute inset-0 w-full h-full scale-x-[-1]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {paths.slice(18).map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            fill="none"
            stroke="url(#pathGradient2)"
            strokeWidth={path.strokeWidth}
            strokeLinecap="round"
            initial={{ pathLength: 0.3, opacity: 0 }}
            animate={{
              pathLength: [0.2, 0.7, 0.2],
              opacity: [0, path.opacity * 0.8, 0],
              pathOffset: [0, 1],
            }}
            transition={{
              duration: path.duration + 2,
              delay: path.delay + 0.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        <defs>
          <linearGradient id="pathGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
