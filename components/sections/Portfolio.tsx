"use client"

import { useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { BrowserMockup } from "@/components/ui/BrowserMockup"
import type { PortfolioItem } from "@/lib/types"

const categories = ["Tous", "SaaS", "Fintech", "RH & Recrutement", "LegalTech", "Logistique"]

function matchCategory(itemCategory: string, filterCategory: string): boolean {
  if (filterCategory === "Tous") return true
  const lower = itemCategory.toLowerCase()
  const filterLower = filterCategory.toLowerCase()
  return lower.includes(filterLower) || filterLower.includes(lower)
}

interface PortfolioProps {
  data: PortfolioItem[]
}

/* ─────────────────── Fake page contents for each project ─────────────────── */

function DataFlowPage() {
  return (
    <div className="aspect-video bg-[#0a0a1a] p-3 sm:p-5 relative overflow-hidden group/page">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.08)_0%,transparent_60%)]" />
      <div className="relative z-10">
        <div className="flex gap-1.5 mb-3">
          <div className="h-2 w-12 bg-blue-500/40 rounded" />
          <div className="h-2 w-8 bg-zinc-800 rounded" />
          <div className="h-2 w-8 bg-zinc-800 rounded" />
        </div>
        <p className="text-[10px] sm:text-sm font-bold text-white mb-1">Analysez vos données</p>
        <p className="text-[8px] sm:text-xs text-blue-300/60 mb-2">en temps réel</p>
        <div className="h-5 sm:h-7 w-20 sm:w-28 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-md mb-3" />
        {/* Dashboard elements */}
        <div className="grid grid-cols-3 gap-1.5 mt-2">
          <div className="h-8 sm:h-12 rounded bg-zinc-800/60 border border-zinc-700/30" />
          <div className="h-8 sm:h-12 rounded bg-zinc-800/60 border border-zinc-700/30" />
          <div className="h-8 sm:h-12 rounded bg-zinc-800/60 border border-zinc-700/30" />
        </div>
        <div className="h-12 sm:h-16 mt-2 rounded bg-zinc-800/40 border border-zinc-700/20 group-hover/page:border-blue-500/20 transition-colors duration-500" />
      </div>
    </div>
  )
}

function PaySecurePage() {
  return (
    <div className="aspect-video bg-gradient-to-br from-[#0a1628] to-[#0f1f3d] p-3 sm:p-5 relative overflow-hidden group/page">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-3 w-3 rounded-full bg-blue-400/60" />
          <div className="h-2 w-14 bg-blue-400/30 rounded" />
        </div>
        <div className="flex items-center gap-2 mb-2">
          {/* Shield icon */}
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <p className="text-[10px] sm:text-sm font-bold text-white">Paiements sécurisés</p>
        </div>
        <p className="text-[8px] sm:text-xs text-blue-200/40 mb-3">Conformité PCI DSS. Zéro friction.</p>
        <div className="h-5 sm:h-7 w-24 sm:w-32 bg-gradient-to-r from-blue-500 to-blue-700 rounded-md mb-3" />
        <div className="flex gap-2 mt-2">
          <div className="h-6 sm:h-8 flex-1 rounded bg-white/5 border border-white/10" />
          <div className="h-6 sm:h-8 flex-1 rounded bg-white/5 border border-white/10" />
        </div>
      </div>
    </div>
  )
}

function TalentHubPage() {
  return (
    <div className="aspect-video bg-gradient-to-br from-[#1a0f1e] to-[#15091e] p-3 sm:p-5 relative overflow-hidden group/page">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.06)_0%,transparent_60%)]" />
      <div className="relative z-10">
        <div className="flex gap-1.5 mb-3">
          <div className="h-2 w-14 bg-purple-400/30 rounded" />
          <div className="h-2 w-8 bg-zinc-800 rounded" />
        </div>
        <div className="flex items-center gap-2 mb-2">
          {/* People icons */}
          <div className="flex -space-x-1">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-purple-400/50 border border-purple-300/20" />
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-pink-400/50 border border-pink-300/20" />
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-fuchsia-400/50 border border-fuchsia-300/20" />
          </div>
        </div>
        <p className="text-[10px] sm:text-sm font-bold text-white mb-1">Recrutez les meilleurs talents</p>
        <p className="text-[8px] sm:text-xs text-purple-300/50 mb-3">IA matching + scoring prédictif</p>
        <div className="h-5 sm:h-7 w-24 sm:w-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md" />
        <div className="mt-3 space-y-1.5">
          <div className="h-3 sm:h-4 w-full rounded bg-purple-500/10 border border-purple-500/20 group-hover/page:bg-purple-500/15 transition-colors duration-500" />
          <div className="h-3 sm:h-4 w-[85%] rounded bg-purple-500/10 border border-purple-500/20" />
        </div>
      </div>
    </div>
  )
}

function CloudOpsPage() {
  return (
    <div className="aspect-video bg-[#0a0f0a] p-3 sm:p-5 relative overflow-hidden font-mono group/page">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-[8px] sm:text-[10px] text-green-400/70">terminal</span>
        </div>
        <p className="text-[10px] sm:text-sm font-bold text-white mb-1">Déployez en confiance</p>
        <p className="text-[8px] sm:text-xs text-green-300/40 mb-3">CI/CD automatisé. Zéro downtime.</p>
        <div className="h-5 sm:h-7 w-24 sm:w-32 bg-gradient-to-r from-green-600 to-emerald-500 rounded-md mb-3" />
        {/* Code-style lines */}
        <div className="mt-2 space-y-1 p-2 rounded bg-black/40 border border-green-500/10">
          <div className="flex gap-1">
            <span className="text-[7px] sm:text-[9px] text-green-500/60">$</span>
            <div className="h-1.5 w-20 bg-green-500/20 rounded" />
          </div>
          <div className="flex gap-1">
            <span className="text-[7px] sm:text-[9px] text-green-500/60">$</span>
            <div className="h-1.5 w-28 bg-green-500/15 rounded" />
          </div>
          <div className="flex gap-1">
            <span className="text-[7px] sm:text-[9px] text-green-500/40">✓</span>
            <div className="h-1.5 w-16 bg-green-500/20 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}

function LegalTechPage() {
  return (
    <div className="aspect-video bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] p-3 sm:p-5 relative overflow-hidden group/page">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-2 w-14 bg-amber-500/20 rounded" />
        </div>
        {/* Scale of justice icon */}
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400/60 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0-18l-4 4m4-4l4 4M4 15l2-6h12l2 6M6 9l-2 6h4M18 9l2 6h-4" />
        </svg>
        <p className="text-[10px] sm:text-sm font-bold text-white mb-1">Simplifiez le juridique</p>
        <p className="text-[8px] sm:text-xs text-amber-200/40 mb-3">Automatisation documentaire intelligente</p>
        <div className="h-5 sm:h-7 w-24 sm:w-32 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-md" />
        <div className="mt-3 flex gap-2">
          <div className="flex-1 h-8 sm:h-10 rounded bg-amber-500/5 border border-amber-500/15 group-hover/page:border-amber-500/25 transition-colors duration-500" />
          <div className="flex-1 h-8 sm:h-10 rounded bg-amber-500/5 border border-amber-500/15" />
        </div>
      </div>
    </div>
  )
}

function GreenSupplyPage() {
  return (
    <div className="aspect-video bg-gradient-to-br from-[#0a1a0f] to-[#0f1a12] p-3 sm:p-5 relative overflow-hidden group/page">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(34,197,94,0.05)_0%,transparent_60%)]" />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          {/* Leaf icon */}
          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          <div className="h-2 w-14 bg-green-500/20 rounded" />
        </div>
        <p className="text-[10px] sm:text-sm font-bold text-white mb-1">Supply chain durable</p>
        <p className="text-[8px] sm:text-xs text-green-300/40 mb-3">Traçabilité. Impact. Conformité RSE.</p>
        <div className="h-5 sm:h-7 w-24 sm:w-32 bg-gradient-to-r from-green-600 to-emerald-400 rounded-md" />
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          <div className="h-6 sm:h-8 rounded bg-green-500/5 border border-green-500/15 group-hover/page:border-green-500/25 transition-colors duration-500" />
          <div className="h-6 sm:h-8 rounded bg-green-500/5 border border-green-500/15" />
          <div className="h-6 sm:h-8 rounded bg-green-500/5 border border-green-500/15" />
          <div className="h-6 sm:h-8 rounded bg-green-500/5 border border-green-500/15" />
        </div>
      </div>
    </div>
  )
}

const pageComponentMap: Record<string, React.FC> = {
  "DataFlow SaaS": DataFlowPage,
  "PaySecure Fintech": PaySecurePage,
  "TalentHub RH": TalentHubPage,
  "CloudOps DevOps": CloudOpsPage,
  "LegalTech Pro": LegalTechPage,
  "GreenSupply": GreenSupplyPage,
}

const defaultPortfolio = [
  {
    title: "DataFlow SaaS",
    category: "SaaS",
    techs: ["Next.js", "Tailwind", "HubSpot"],
    gradient: "from-blue-500/20 to-cyan-500/20",
    result: "+312% conversions",
    url: "dataflow-saas.com",
  },
  {
    title: "PaySecure Fintech",
    category: "Fintech",
    techs: ["React", "TypeScript", "Stripe"],
    gradient: "from-emerald-500/20 to-teal-500/20",
    result: "+220% leads",
    url: "paysecure.io",
  },
  {
    title: "TalentHub RH",
    category: "RH & Recrutement",
    techs: ["Next.js", "Supabase", "Resend"],
    gradient: "from-violet-500/20 to-purple-500/20",
    result: "+287% demos",
    url: "talenthub.fr",
  },
  {
    title: "CloudOps DevOps",
    category: "SaaS",
    techs: ["Webflow", "Mixpanel", "Segment"],
    gradient: "from-orange-500/20 to-amber-500/20",
    result: "+195% signups",
    url: "cloudops.dev",
  },
  {
    title: "LegalTech Pro",
    category: "LegalTech",
    techs: ["Next.js", "Salesforce", "PostHog"],
    gradient: "from-slate-500/20 to-zinc-500/20",
    result: "+340% conversions",
    url: "legaltech-pro.com",
  },
  {
    title: "GreenSupply",
    category: "Logistique",
    techs: ["WordPress", "HubSpot", "GA4"],
    gradient: "from-green-500/20 to-emerald-500/20",
    result: "+178% leads",
    url: "greensupply.eu",
  },
]

export function Portfolio({ data }: PortfolioProps) {
  const [active, setActive] = useState("Tous")
  const shouldReduce = useReducedMotion()

  // If we have real data from Supabase, render with BrowserMockups too
  if (data.length > 0) {
    const filtered = active === "Tous"
      ? data
      : data.filter((item) => matchCategory(item.category, active))

    return (
      <section id="realisations" className="relative py-20 sm:py-28 bg-bg" aria-label="Nos réalisations B2B">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Portfolio"
            title="Nos réalisations B2B"
            subtitle="Des landing pages qui ont transformé le business de nos clients."
          />

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 text-sm rounded-lg transition-all duration-300 cursor-pointer min-h-[44px] ${
                  active === cat
                    ? "bg-accent text-white rounded-lg"
                    : "text-text-muted hover:text-text hover:bg-zinc-800/50 rounded-lg"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((item, index) => {
                const PageComponent = pageComponentMap[item.title]
                return (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="group"
                  >
                    <BrowserMockup url={item.url || "client.webco.fr"} compact>
                      {PageComponent ? (
                        <PageComponent />
                      ) : (
                        <div className="aspect-video relative overflow-hidden bg-zinc-800">
                          {item.image_url ? (
                            <Image
                              src={item.image_url}
                              alt={item.title}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent-blue/10" />
                          )}
                        </div>
                      )}
                    </BrowserMockup>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-accent font-medium uppercase tracking-wider">
                          {item.category}
                        </span>
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-500 hover:text-accent transition-colors"
                            aria-label={`Voir le projet ${item.title}`}
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                      <h3 className="text-lg font-display font-semibold text-text">{item.title}</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {item.technologies.map((tech) => (
                          <span key={tech} className="text-xs px-2 py-1 rounded-md bg-zinc-800 text-text-muted">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    )
  }

  // Default fallback with browser mockups
  const filteredDefault = active === "Tous"
    ? defaultPortfolio
    : defaultPortfolio.filter((item) => matchCategory(item.category, active))

  return (
    <section id="realisations" className="relative py-20 sm:py-28 bg-bg" aria-label="Nos réalisations B2B">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Portfolio"
          title="Nos réalisations B2B"
          subtitle="Des landing pages qui ont transformé le business de nos clients."
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 text-sm rounded-lg transition-all duration-300 cursor-pointer min-h-[44px] ${
                active === cat
                  ? "bg-accent text-white rounded-lg"
                  : "text-text-muted hover:text-text hover:bg-zinc-800/50 rounded-lg"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {filteredDefault.map((item, i) => {
              const PageComponent = pageComponentMap[item.title]
              return (
                <motion.article
                  key={item.title + i}
                  initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group"
                >
                  <BrowserMockup url={item.url} compact>
                    {PageComponent ? <PageComponent /> : (
                      <div className={`aspect-video bg-gradient-to-br ${item.gradient}`} />
                    )}
                  </BrowserMockup>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-accent font-medium uppercase tracking-wider">
                        {item.category}
                      </span>
                      {/* Result badge */}
                      <span className="text-[10px] font-semibold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full stat-number">
                        {item.result}
                      </span>
                    </div>
                    <h3 className="text-lg font-display font-semibold text-text">{item.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.techs.map((tech) => (
                        <span key={tech} className="text-xs px-2 py-1 rounded-md bg-zinc-800 text-text-muted">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
