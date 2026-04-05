"use client"

import { motion, useReducedMotion } from "framer-motion"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { SpotlightCard } from "@/components/ui/SpotlightCard"
import { Globe, BarChart3, Megaphone, CreditCard, Mail } from "lucide-react"

const categories = [
  {
    name: "Frameworks & CMS",
    icon: Globe,
    color: "from-violet-500 to-blue-500",
    items: [
      { name: "Next.js", highlight: true },
      { name: "React", highlight: true },
      { name: "Webflow", highlight: false },
      { name: "WordPress", highlight: false },
      { name: "HubSpot CMS", highlight: false },
    ],
  },
  {
    name: "CRM & Marketing",
    icon: Mail,
    color: "from-blue-500 to-cyan-500",
    items: [
      { name: "HubSpot", highlight: true },
      { name: "Salesforce", highlight: false },
      { name: "Pipedrive", highlight: false },
      { name: "Mailchimp", highlight: false },
      { name: "ActiveCampaign", highlight: false },
    ],
  },
  {
    name: "Analytics & Tracking",
    icon: BarChart3,
    color: "from-cyan-500 to-emerald-500",
    items: [
      { name: "Google Analytics", highlight: true },
      { name: "Mixpanel", highlight: false },
      { name: "Hotjar", highlight: true },
      { name: "PostHog", highlight: false },
      { name: "Segment", highlight: false },
    ],
  },
  {
    name: "Acquisition & Ads",
    icon: Megaphone,
    color: "from-emerald-500 to-yellow-500",
    items: [
      { name: "Google Ads", highlight: true },
      { name: "LinkedIn Ads", highlight: true },
      { name: "Meta Ads", highlight: false },
      { name: "Twitter Ads", highlight: false },
    ],
  },
  {
    name: "Paiement",
    icon: CreditCard,
    color: "from-yellow-500 to-violet-500",
    items: [
      { name: "Stripe", highlight: true },
      { name: "LemonSqueezy", highlight: false },
    ],
  },
]

export function Stack() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="relative py-20 sm:py-28 bg-bg overflow-hidden" aria-label="Stack technique">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/[0.02] blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Intégrations"
          title="On s'adapte à votre écosystème"
          subtitle="Votre stack est unique. On s'intègre avec vos outils existants — pas l'inverse."
        />

        {/* Orbit-style grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {categories.map((category, catIndex) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: shouldReduce ? 0 : 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: catIndex * 0.08 }}
                className={catIndex === 4 ? "sm:col-span-2 lg:col-span-1 lg:col-start-2" : ""}
              >
                <SpotlightCard className="h-full p-5">
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br ${category.color} bg-opacity-10`}>
                      <div className="flex items-center justify-center w-full h-full rounded-lg bg-bg/80">
                        <Icon size={18} className="text-text" />
                      </div>
                    </div>
                    <h3 className="text-sm font-display font-semibold text-text">
                      {category.name}
                    </h3>
                  </div>

                  {/* Tech items */}
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item, itemIndex) => (
                      <motion.span
                        key={item.name}
                        initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: catIndex * 0.05 + itemIndex * 0.03 }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-300 cursor-default ${
                          item.highlight
                            ? "border-accent/30 bg-accent/5 text-text hover:bg-accent/10 hover:border-accent/50"
                            : "border-zinc-800 bg-zinc-900/50 text-text-muted hover:text-text hover:border-zinc-700"
                        }`}
                      >
                        {item.highlight && (
                          <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        )}
                        {item.name}
                      </motion.span>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom trust line */}
        <motion.p
          className="mt-10 text-center text-sm text-text-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Vous utilisez un outil qui n&apos;est pas listé ?{" "}
          <a href="#contact" className="text-accent hover:underline">
            Parlons-en →
          </a>
        </motion.p>
      </div>
    </section>
  )
}
