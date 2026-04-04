"use client"
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

export function TextReveal({ text, className }: { text: string, className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const shouldReduce = useReducedMotion()

  const words = text.split(" ")

  if (shouldReduce) {
    return <span className={className}>{text}</span>
  }

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : { y: "100%" }}
            transition={{
              duration: 0.5,
              delay: i * 0.06,
              ease: [0.25, 0.4, 0.25, 1]
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
