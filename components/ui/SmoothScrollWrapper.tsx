"use client"

import dynamic from "next/dynamic"

const SmoothScroll = dynamic(
  () => import("@/components/ui/SmoothScroll").then((m) => ({ default: m.SmoothScroll })),
  { ssr: false }
)

export function SmoothScrollWrapper({ children }: { children: React.ReactNode }) {
  return <SmoothScroll>{children}</SmoothScroll>
}
