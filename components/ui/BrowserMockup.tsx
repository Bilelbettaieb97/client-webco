"use client"

import { type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface BrowserMockupProps {
  children: ReactNode
  url?: string
  className?: string
  compact?: boolean
}

export function BrowserMockup({ children, url = "votresite.com", className, compact = false }: BrowserMockupProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-zinc-800 border border-zinc-700 shadow-2xl shadow-violet-500/5 overflow-hidden",
        className
      )}
    >
      {/* Browser chrome */}
      <div className={cn("flex items-center gap-2 px-4 bg-zinc-800/80 border-b border-zinc-700/50", compact ? "py-1.5" : "py-2.5")}>
        <div className="flex gap-1.5">
          <div className={cn("rounded-full bg-red-500/70", compact ? "w-2 h-2" : "w-2.5 h-2.5")} />
          <div className={cn("rounded-full bg-yellow-500/70", compact ? "w-2 h-2" : "w-2.5 h-2.5")} />
          <div className={cn("rounded-full bg-green-500/70", compact ? "w-2 h-2" : "w-2.5 h-2.5")} />
        </div>
        <div className="flex-1 mx-4 sm:mx-8">
          <div className={cn("bg-zinc-700/80 rounded-md flex items-center justify-center", compact ? "h-4" : "h-5")}>
            <span className={cn("text-zinc-400 font-mono", compact ? "text-[8px]" : "text-[10px]")}>{url}</span>
          </div>
        </div>
      </div>
      {/* Content area */}
      <div className="bg-zinc-900 overflow-hidden">
        {children}
      </div>
    </div>
  )
}
