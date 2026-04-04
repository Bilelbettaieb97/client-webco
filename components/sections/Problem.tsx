"use client"

import { motion, useReducedMotion } from "framer-motion"
import { X, Check } from "lucide-react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { SpotlightCard } from "@/components/ui/SpotlightCard"
import { ParallaxSection } from "@/components/ui/ParallaxSection"
import { TextReveal } from "@/components/ui/TextReveal"
import type { AboutContent } from "@/lib/types"

interface ProblemProps {
  data: AboutContent
}

const defaultProblems = [
  "Vous depensez +5 000\u20AC/mois en ads mais votre landing page convertit a moins de 2%",
  "Votre page est jolie mais elle ne genere ni leads, ni demos, ni appels",
  "Vous ne savez pas pourquoi vos visiteurs partent sans agir",
  "Chaque lead vous coute de plus en plus cher — votre CAC explose",
]

const defaultSolutions = [
  "Chaque element de la page teste et optimise pour convertir",
  "Copywriting B2B base sur les mots exacts de vos clients",
  "A/B testing systematique — on ne devine pas, on mesure",
  "ROI visible des les 2 premieres semaines",
]

export function Problem({ data }: ProblemProps) {
  const shouldReduce = useReducedMotion()
  const problems = data.problem_points?.length ? data.problem_points : defaultProblems
  const solutions = data.solution_points?.length ? data.solution_points : defaultSolutions

  return (
    <section className="relative py-24 sm:py-32 bg-bg" aria-label="Probleme et solution">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Le constat"
          title="Votre trafic ne convertit pas ?"
          subtitle="Vous depensez du budget en acquisition, mais votre landing page ne fait pas le travail. On change ca."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Problem side — parallax slightly higher */}
          <ParallaxSection speed={-0.08}>
            <motion.div
              initial={{ opacity: 0, x: shouldReduce ? 0 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <SpotlightCard className="h-full p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <X size={20} className="text-red-400" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-text">
                    <TextReveal text="Le probleme" />
                  </h3>
                </div>
                <ul className="space-y-4">
                  {problems.map((point, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, y: shouldReduce ? 0 : 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                    >
                      <span className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center">
                        <X size={12} className="text-red-400" />
                      </span>
                      <span className="text-sm text-text-muted leading-relaxed">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </SpotlightCard>
            </motion.div>
          </ParallaxSection>

          {/* Solution side — parallax slightly lower */}
          <ParallaxSection speed={0.08}>
            <motion.div
              initial={{ opacity: 0, x: shouldReduce ? 0 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <SpotlightCard className="h-full p-6 sm:p-8 border-accent/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Check size={20} className="text-accent" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-text">
                    <TextReveal text="Notre solution" />
                  </h3>
                </div>
                <ul className="space-y-4">
                  {solutions.map((point, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, y: shouldReduce ? 0 : 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
                    >
                      <span className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center">
                        <Check size={12} className="text-accent" />
                      </span>
                      <span className="text-sm text-text-muted leading-relaxed">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </SpotlightCard>
            </motion.div>
          </ParallaxSection>
        </div>

        {/* Agitation box — between problem and solution */}
        <motion.div
          className="mt-6 lg:mt-8"
          initial={{ opacity: 0, y: shouldReduce ? 0 : 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
            <p className="text-sm sm:text-base font-medium text-red-400 leading-relaxed">
              Chaque mois sans optimisation, vous perdez en moyenne <span className="stat-number">73%</span> de vos visiteurs — et vos concurrents les recuperent.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
