"use client"

import { motion, useReducedMotion } from "framer-motion"
import Image from "next/image"
import { BrowserMockup } from "@/components/ui/BrowserMockup"
import type { PortfolioItem } from "@/lib/types"

interface WorkProps {
  data: PortfolioItem[]
}

/* ─── Fake page contents for 3 hero projects ─── */

function DataFlowPage() {
  return (
    <div className="aspect-[16/10] bg-[#0a0a1a] p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.08)_0%,transparent_60%)]" />
      <div className="relative z-10">
        <div className="flex gap-1.5 mb-4">
          <div className="h-2 w-12 bg-blue-500/40 rounded" />
          <div className="h-2 w-8 bg-zinc-800 rounded" />
          <div className="h-2 w-8 bg-zinc-800 rounded" />
        </div>
        <p className="text-xs sm:text-sm font-bold text-white mb-1">Analysez vos donnees</p>
        <p className="text-[8px] sm:text-xs text-blue-300/60 mb-3">en temps reel</p>
        <div className="h-6 sm:h-8 w-24 sm:w-32 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-md mb-4" />
        <div className="grid grid-cols-3 gap-2 mt-3">
          <div className="h-10 sm:h-14 rounded bg-zinc-800/60 border border-zinc-700/30" />
          <div className="h-10 sm:h-14 rounded bg-zinc-800/60 border border-zinc-700/30" />
          <div className="h-10 sm:h-14 rounded bg-zinc-800/60 border border-zinc-700/30" />
        </div>
        <div className="h-14 sm:h-20 mt-3 rounded bg-zinc-800/40 border border-zinc-700/20" />
      </div>
    </div>
  )
}

function PaySecurePage() {
  return (
    <div className="aspect-[16/10] bg-gradient-to-br from-[#0a1628] to-[#0f1f3d] p-4 sm:p-6 relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-3 w-3 rounded-full bg-blue-400/60" />
          <div className="h-2 w-14 bg-blue-400/30 rounded" />
        </div>
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-5 h-5 text-blue-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <p className="text-xs sm:text-sm font-bold text-white">Paiements securises</p>
        </div>
        <p className="text-[8px] sm:text-xs text-blue-200/40 mb-4">Conformite PCI DSS. Zero friction.</p>
        <div className="h-6 sm:h-8 w-28 sm:w-36 bg-gradient-to-r from-blue-500 to-blue-700 rounded-md mb-4" />
        <div className="flex gap-3 mt-3">
          <div className="h-8 sm:h-10 flex-1 rounded bg-white/5 border border-white/10" />
          <div className="h-8 sm:h-10 flex-1 rounded bg-white/5 border border-white/10" />
        </div>
      </div>
    </div>
  )
}

function TalentHubPage() {
  return (
    <div className="aspect-[16/10] bg-gradient-to-br from-[#1a0f1e] to-[#15091e] p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.06)_0%,transparent_60%)]" />
      <div className="relative z-10">
        <div className="flex gap-1.5 mb-4">
          <div className="h-2 w-14 bg-purple-400/30 rounded" />
          <div className="h-2 w-8 bg-zinc-800 rounded" />
        </div>
        <div className="flex -space-x-1 mb-3">
          <div className="w-4 h-4 rounded-full bg-purple-400/50 border border-purple-300/20" />
          <div className="w-4 h-4 rounded-full bg-pink-400/50 border border-pink-300/20" />
          <div className="w-4 h-4 rounded-full bg-fuchsia-400/50 border border-fuchsia-300/20" />
        </div>
        <p className="text-xs sm:text-sm font-bold text-white mb-1">Recrutez les meilleurs talents</p>
        <p className="text-[8px] sm:text-xs text-purple-300/50 mb-4">IA matching + scoring predictif</p>
        <div className="h-6 sm:h-8 w-28 sm:w-36 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md" />
        <div className="mt-4 space-y-2">
          <div className="h-4 sm:h-5 w-full rounded bg-purple-500/10 border border-purple-500/20" />
          <div className="h-4 sm:h-5 w-[85%] rounded bg-purple-500/10 border border-purple-500/20" />
        </div>
      </div>
    </div>
  )
}

const defaultProjects = [
  {
    title: "DataFlow SaaS",
    description: "Plateforme d'analytics temps reel pour equipes data",
    result: "1.8% \u2192 7.2%",
    techs: ["Next.js", "Tailwind", "HubSpot"],
    url: "dataflow-saas.com",
    Page: DataFlowPage,
  },
  {
    title: "PaySecure Fintech",
    description: "Solution de paiement securise pour le e-commerce B2B",
    result: "2.1% \u2192 8.4%",
    techs: ["React", "TypeScript", "Stripe"],
    url: "paysecure.io",
    Page: PaySecurePage,
  },
  {
    title: "TalentHub RH",
    description: "Recrutement augmente par l'intelligence artificielle",
    result: "1.5% \u2192 6.8%",
    techs: ["Next.js", "Supabase", "Resend"],
    url: "talenthub.fr",
    Page: TalentHubPage,
  },
]

const pageComponentMap: Record<string, React.FC> = {
  "DataFlow SaaS": DataFlowPage,
  "PaySecure Fintech": PaySecurePage,
  "TalentHub RH": TalentHubPage,
}

export function Work({ data }: WorkProps) {
  const shouldReduce = useReducedMotion()

  // Use Supabase data if available (first 3 only), otherwise defaults
  const hasData = data.length > 0
  const projects = hasData ? data.slice(0, 3) : defaultProjects

  return (
    <section
      id="realisations"
      className="relative py-24 sm:py-32 lg:py-40 bg-bg"
      aria-label="Nos travaux"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-text tracking-tight text-center mb-16 sm:mb-20"
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Travaux
        </motion.h2>

        <div className="space-y-16 sm:space-y-20">
          {projects.map((project, index) => {
            const isDefault = !hasData
            const title = isDefault
              ? (project as (typeof defaultProjects)[0]).title
              : (project as PortfolioItem).title
            const description = isDefault
              ? (project as (typeof defaultProjects)[0]).description
              : (project as PortfolioItem).description
            const techs = isDefault
              ? (project as (typeof defaultProjects)[0]).techs
              : (project as PortfolioItem).technologies
            const url = isDefault
              ? (project as (typeof defaultProjects)[0]).url
              : (project as PortfolioItem).url || "client.webco.fr"
            const result = isDefault
              ? (project as (typeof defaultProjects)[0]).result
              : null
            const PageComponent = isDefault
              ? (project as (typeof defaultProjects)[0]).Page
              : pageComponentMap[title] || null

            return (
              <motion.article
                key={title + index}
                initial={shouldReduce ? {} : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <BrowserMockup url={url}>
                  {PageComponent ? (
                    <PageComponent />
                  ) : (
                    <div className="aspect-[16/10] relative overflow-hidden bg-zinc-800">
                      {(project as PortfolioItem).image_url ? (
                        <Image
                          src={(project as PortfolioItem).image_url}
                          alt={title}
                          fill
                          sizes="(max-width: 768px) 100vw, 896px"
                          className="object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent-blue/10" />
                      )}
                    </div>
                  )}
                </BrowserMockup>

                <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-text">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm text-text-muted">
                      {description}
                    </p>
                  </div>
                  {result && (
                    <span className="inline-flex items-center px-3 py-1.5 text-xs font-mono font-semibold text-green-400 bg-green-500/10 border border-green-500/20 rounded-full stat-number whitespace-nowrap">
                      Conversion: {result}
                    </span>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {techs.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-1 rounded-md bg-zinc-800/80 text-text-muted/70 border border-zinc-700/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
