"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Star } from "lucide-react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import type { Testimonial } from "@/lib/types"

interface TestimonialsProps {
  data: Testimonial[]
}

const defaultTestimonials: Testimonial[] = [
  {
    id: "d1", name: "Sophie Laurent", role: "Head of Growth", company: "DataFlow",
    content: "Notre taux de conversion est passe de 1.8% a 7.2% en 3 semaines. L'investissement s'est rembourse en 10 jours. Webco maitrise la conversion B2B.",
    rating: 5, sort_order: 1,
  },
  {
    id: "d2", name: "Marc Dubois", role: "CMO", company: "PaySecure",
    content: "On a teste 3 agences avant Webco. La difference ? Ils comprennent le B2B. Chaque element de la page a un objectif mesurable.",
    rating: 5, sort_order: 2,
  },
  {
    id: "d3", name: "Claire Martin", role: "CEO", company: "TalentHub",
    content: "Le copywriting a tout change. Nos visiteurs comprennent enfin notre proposition de valeur en 5 secondes. Les demandes de demo ont explose.",
    rating: 5, sort_order: 3,
  },
  {
    id: "d4", name: "Thomas Petit", role: "VP Marketing", company: "CloudOps",
    content: "Le process est carre : audit, strategie, execution, optimisation. Pas de blabla. En 2 semaines on avait une landing page qui convertit x3.",
    rating: 5, sort_order: 4,
  },
  {
    id: "d5", name: "Julie Moreau", role: "Head of Demand Gen", company: "LegalTech Pro",
    content: "L'A/B testing continu nous a permis d'optimiser chaque semaine. Apres 2 mois, notre cout par lead a baisse de 60%.",
    rating: 5, sort_order: 5,
  },
  {
    id: "d6", name: "Antoine Bernard", role: "Fondateur", company: "GreenSupply",
    content: "Webco a compris notre marche en un call. La landing page parle directement aux directeurs logistique. Les leads sont ultra-qualifies.",
    rating: 5, sort_order: 6,
  },
]

function TestimonialCard({ t }: { t: Testimonial }) {
  const initials = t.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 mb-4 break-inside-avoid">
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
        ))}
      </div>
      {/* Quote */}
      <p className="text-sm text-text-muted leading-relaxed mb-5">
        &ldquo;{t.content}&rdquo;
      </p>
      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-accent-blue flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
          {initials}
        </div>
        <div>
          <p className="text-sm font-medium text-text">{t.name}</p>
          <p className="text-xs text-text-muted">
            {t.role}, {t.company}
          </p>
        </div>
      </div>
    </div>
  )
}

export function Testimonials({ data }: TestimonialsProps) {
  const shouldReduce = useReducedMotion()
  const testimonials = data.length > 0 ? data : defaultTestimonials

  // Split into 3 columns
  const col1 = testimonials.filter((_, i) => i % 3 === 0)
  const col2 = testimonials.filter((_, i) => i % 3 === 1)
  const col3 = testimonials.filter((_, i) => i % 3 === 2)

  // Duplicate for seamless loop
  const doubled1 = [...col1, ...col1]
  const doubled2 = [...col2, ...col2]
  const doubled3 = [...col3, ...col3]

  return (
    <section id="temoignages" className="relative py-24 sm:py-32 bg-bg overflow-hidden" aria-label="Temoignages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Temoignages"
          title="Ce que nos clients B2B en disent"
          subtitle="Des resultats concrets, racontes par ceux qui les vivent au quotidien."
        />

        {/* Columns container with mask */}
        <div
          className="relative h-[600px] overflow-hidden"
          style={{
            maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
            {/* Column 1 -- scrolls up */}
            <div className="overflow-hidden relative">
              <motion.div
                className={shouldReduce ? "" : "animate-scroll-up"}
              >
                {doubled1.map((t, i) => (
                  <TestimonialCard key={`c1-${i}`} t={t} />
                ))}
              </motion.div>
            </div>

            {/* Column 2 -- scrolls down */}
            <div className="overflow-hidden relative hidden md:block">
              <motion.div
                className={shouldReduce ? "" : "animate-scroll-down"}
              >
                {doubled2.map((t, i) => (
                  <TestimonialCard key={`c2-${i}`} t={t} />
                ))}
              </motion.div>
            </div>

            {/* Column 3 -- scrolls up (different speed) */}
            <div className="overflow-hidden relative hidden md:block">
              <motion.div
                className={shouldReduce ? "" : "animate-scroll-up"}
                style={{ animationDuration: "50s" }}
              >
                {doubled3.map((t, i) => (
                  <TestimonialCard key={`c3-${i}`} t={t} />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
