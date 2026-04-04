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
    id: "d1", name: "Sophie Laurent", role: "CEO", company: "TechVision",
    content: "Webco a transforme notre presence en ligne. Le site est non seulement magnifique mais convertit deux fois plus qu'avant. Un travail exceptionnel.",
    rating: 5, sort_order: 1,
  },
  {
    id: "d2", name: "Marc Dubois", role: "Fondateur", company: "GreenStart",
    content: "Professionnalisme, reactivite et creativite. L'equipe Webco a parfaitement compris notre vision et l'a sublimee dans un site qui nous ressemble.",
    rating: 5, sort_order: 2,
  },
  {
    id: "d3", name: "Claire Martin", role: "Directrice Marketing", company: "Luxoria",
    content: "Le design est d'une elegance rare. Nos clients nous complimentent regulierement sur notre site. Le ROI a ete immediat.",
    rating: 5, sort_order: 3,
  },
  {
    id: "d4", name: "Thomas Petit", role: "CTO", company: "DataFlow",
    content: "Architecture solide, code propre, performance au rendez-vous. Webco maitrise la technique autant que le design.",
    rating: 5, sort_order: 4,
  },
  {
    id: "d5", name: "Julie Moreau", role: "Fondatrice", company: "BelleVie",
    content: "Notre boutique en ligne depasse toutes nos attentes. L'experience d'achat est fluide et nos ventes ont explose depuis le lancement.",
    rating: 5, sort_order: 5,
  },
  {
    id: "d6", name: "Antoine Bernard", role: "Directeur", company: "ArchiDesign",
    content: "Un site qui reflete parfaitement notre ADN. Les animations sont subtiles et elegantes, exactement ce que nous cherchions.",
    rating: 5, sort_order: 6,
  },
  {
    id: "d7", name: "Emma Leroy", role: "CMO", company: "FoodLab",
    content: "La landing page a un taux de conversion de 12%. Webco comprend le marketing autant que le developpement. Partenaire ideal.",
    rating: 5, sort_order: 7,
  },
  {
    id: "d8", name: "Pierre Girard", role: "Gerant", company: "AutoPro",
    content: "Depuis la refonte par Webco, les demandes de devis ont triple. Un investissement qui s'est rembourse en deux mois.",
    rating: 5, sort_order: 8,
  },
  {
    id: "d9", name: "Camille Roux", role: "Fondatrice", company: "YogaZen",
    content: "Un site qui respire la serenite, comme notre studio. Le panel admin est intuitif, je peux tout modifier moi-meme.",
    rating: 5, sort_order: 9,
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
    <section className="relative py-24 sm:py-32 bg-bg overflow-hidden" aria-label="Temoignages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Temoignages"
          title="Ce que nos clients disent de nous"
          subtitle="La satisfaction de nos clients est notre meilleure carte de visite."
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
            {/* Column 1 — scrolls up */}
            <div className="overflow-hidden relative">
              <motion.div
                className={shouldReduce ? "" : "animate-scroll-up"}
              >
                {doubled1.map((t, i) => (
                  <TestimonialCard key={`c1-${i}`} t={t} />
                ))}
              </motion.div>
            </div>

            {/* Column 2 — scrolls down */}
            <div className="overflow-hidden relative hidden md:block">
              <motion.div
                className={shouldReduce ? "" : "animate-scroll-down"}
              >
                {doubled2.map((t, i) => (
                  <TestimonialCard key={`c2-${i}`} t={t} />
                ))}
              </motion.div>
            </div>

            {/* Column 3 — scrolls up (different speed via CSS) */}
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
