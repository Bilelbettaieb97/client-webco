"use client"

import { useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import { SectionHeading } from "@/components/ui/SectionHeading"
import type { PortfolioItem } from "@/lib/types"

const categories = ["Tous", "SaaS", "Fintech", "RH & Recrutement", "LegalTech", "Logistique"]

// Map Supabase categories to filter categories
function matchCategory(itemCategory: string, filterCategory: string): boolean {
  if (filterCategory === "Tous") return true
  const lower = itemCategory.toLowerCase()
  const filterLower = filterCategory.toLowerCase()
  return lower.includes(filterLower) || filterLower.includes(lower)
}

interface PortfolioProps {
  data: PortfolioItem[]
}

const defaultPortfolio = [
  {
    title: "DataFlow SaaS",
    category: "SaaS",
    techs: ["Next.js", "Tailwind", "HubSpot"],
    gradient: "from-blue-500/20 to-cyan-500/20",
    result: "+312% conversions",
  },
  {
    title: "PaySecure Fintech",
    category: "Fintech",
    techs: ["React", "TypeScript", "Stripe"],
    gradient: "from-emerald-500/20 to-teal-500/20",
    result: "+220% leads",
  },
  {
    title: "TalentHub RH",
    category: "RH & Recrutement",
    techs: ["Next.js", "Supabase", "Resend"],
    gradient: "from-violet-500/20 to-purple-500/20",
    result: "+287% demos",
  },
  {
    title: "CloudOps DevOps",
    category: "SaaS",
    techs: ["Webflow", "Mixpanel", "Segment"],
    gradient: "from-orange-500/20 to-amber-500/20",
    result: "+195% signups",
  },
  {
    title: "LegalTech Pro",
    category: "LegalTech",
    techs: ["Next.js", "Salesforce", "PostHog"],
    gradient: "from-slate-500/20 to-zinc-500/20",
    result: "+340% conversions",
  },
  {
    title: "GreenSupply",
    category: "Logistique",
    techs: ["WordPress", "HubSpot", "GA4"],
    gradient: "from-green-500/20 to-emerald-500/20",
    result: "+178% leads",
  },
]

export function Portfolio({ data }: PortfolioProps) {
  const [active, setActive] = useState("Tous")
  const shouldReduce = useReducedMotion()

  // If we have real data from Supabase
  if (data.length > 0) {
    const filtered = active === "Tous"
      ? data
      : data.filter((item) => matchCategory(item.category, active))

    return (
      <section id="realisations" className="relative py-24 sm:py-32 bg-bg" aria-label="Nos realisations B2B">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Portfolio"
            title="Nos realisations B2B"
            subtitle="Des landing pages qui ont transforme le business de nos clients."
          />

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 cursor-pointer min-h-[44px] ${
                  active === cat
                    ? "bg-accent text-white"
                    : "bg-zinc-800/50 text-text-muted hover:text-text hover:bg-zinc-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="group relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/50 hover:-translate-y-1 transition-transform duration-300"
                >
                  {/* Image */}
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
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-accent/80 px-3 py-1.5 rounded-md hover:bg-accent transition-colors"
                          aria-label={`Voir le projet ${item.title}`}
                        >
                          <ExternalLink size={14} />
                          Voir le projet
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <span className="text-xs text-accent font-medium uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="mt-2 text-lg font-display font-semibold text-text">{item.title}</h3>
                    {item.description && (
                      <p className="mt-1 text-sm text-text-muted line-clamp-2">{item.description}</p>
                    )}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <span key={tech} className="text-xs px-2 py-1 rounded-md bg-zinc-800 text-text-muted">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    )
  }

  // Default fallback with B2B case studies
  const filteredDefault = active === "Tous"
    ? defaultPortfolio
    : defaultPortfolio.filter((item) => matchCategory(item.category, active))

  return (
    <section id="realisations" className="relative py-24 sm:py-32 bg-bg" aria-label="Nos realisations B2B">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Portfolio"
          title="Nos realisations B2B"
          subtitle="Des landing pages qui ont transforme le business de nos clients."
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 cursor-pointer min-h-[44px] ${
                active === cat
                  ? "bg-accent text-white"
                  : "bg-zinc-800/50 text-text-muted hover:text-text hover:bg-zinc-800"
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
            {filteredDefault.map((item, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/50 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className={`aspect-video bg-gradient-to-br ${item.gradient} relative`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-display font-bold text-white/20">{item.title.charAt(0)}</span>
                  </div>
                  {/* Result badge */}
                  <div className="absolute bottom-3 right-3 px-3 py-1 text-xs font-semibold text-white bg-black/60 backdrop-blur-sm rounded-full">
                    {item.result}
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-xs text-accent font-medium uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="mt-2 text-lg font-display font-semibold text-text">{item.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.techs.map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 rounded-md bg-zinc-800 text-text-muted">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
