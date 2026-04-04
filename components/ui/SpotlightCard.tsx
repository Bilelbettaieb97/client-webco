"use client"

import { useRef, type MouseEvent, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  as?: "div" | "article"
}

export function SpotlightCard({ children, className, as: Tag = "div" }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    cardRef.current.style.setProperty("--spotlight-x", `${e.clientX - rect.left}px`)
    cardRef.current.style.setProperty("--spotlight-y", `${e.clientY - rect.top}px`)
  }

  return (
    <Tag
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "spotlight-card rounded-xl border border-zinc-800 bg-zinc-900/50 p-6",
        "transition-all duration-300 hover:-translate-y-1",
        className
      )}
    >
      <div className="relative z-20">{children}</div>
    </Tag>
  )
}
