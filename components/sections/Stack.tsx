"use client"

import { motion, useReducedMotion } from "framer-motion"
import { SectionHeading } from "@/components/ui/SectionHeading"

const categories = [
  {
    name: "Frameworks",
    items: ["Next.js", "React", "Webflow", "WordPress", "HubSpot CMS"],
  },
  {
    name: "CRM & Marketing",
    items: ["HubSpot", "Salesforce", "Pipedrive", "Mailchimp", "ActiveCampaign"],
  },
  {
    name: "Analytics",
    items: ["Google Analytics", "Mixpanel", "Hotjar", "PostHog", "Segment"],
  },
  {
    name: "Ads",
    items: ["Google Ads", "LinkedIn Ads", "Meta Ads", "Twitter Ads"],
  },
  {
    name: "Paiement",
    items: ["Stripe", "LemonSqueezy"],
  },
]

export function Stack() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="relative py-24 sm:py-32 bg-bg" aria-label="Stack technique">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Integrations"
          title="Compatible avec votre stack"
          subtitle="Peu importe votre ecosysteme technique, on s'integre."
        />

        <div className="space-y-8 max-w-4xl mx-auto">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: catIndex * 0.08 }}
            >
              <h3 className="text-xs font-medium uppercase tracking-widest text-text-muted mb-3">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 text-sm rounded-full border border-zinc-800 bg-zinc-900/50 text-text-muted hover:text-text hover:border-zinc-700 transition-colors duration-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
