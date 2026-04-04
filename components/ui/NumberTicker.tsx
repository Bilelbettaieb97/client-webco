"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { motion, useSpring, useTransform, useReducedMotion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface NumberTickerProps {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
  formatThousands?: boolean
}

function formatNumber(num: number, decimals: number, formatThousands: boolean): string {
  const fixed = num.toFixed(decimals)
  if (!formatThousands) return fixed
  const [intPart, decPart] = fixed.split(".")
  const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  return decPart ? `${formatted}.${decPart}` : formatted
}

export function NumberTicker({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
  formatThousands = true,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const shouldReduce = useReducedMotion()
  const [displayValue, setDisplayValue] = useState("0")

  const springValue = useSpring(0, {
    stiffness: 60,
    damping: 20,
    mass: 1,
  })

  const transformedValue = useTransform(springValue, (v) =>
    formatNumber(v, decimals, formatThousands)
  )

  useEffect(() => {
    if (!isInView) return
    if (shouldReduce) {
      setDisplayValue(formatNumber(value, decimals, formatThousands))
      return
    }
    springValue.set(value)
  }, [isInView, value, springValue, shouldReduce, decimals, formatThousands])

  useEffect(() => {
    if (shouldReduce) return
    const unsub = transformedValue.on("change", (v) => {
      setDisplayValue(v)
    })
    return unsub
  }, [transformedValue, shouldReduce])

  return (
    <span ref={ref} className={cn("stat-number tabular-nums", className)}>
      {prefix}{displayValue}{suffix}
    </span>
  )
}
