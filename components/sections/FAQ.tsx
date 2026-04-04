"use client"

import { useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { SectionHeading } from "@/components/ui/SectionHeading"

const faqs = [
  {
    question: "Combien de temps pour livrer une landing page ?",
    answer:
      "5 jours ouvres pour une landing page One-Shot. 2-3 semaines pour un Pack Conversion complet avec A/B testing et optimisation.",
  },
  {
    question: "Vous travaillez avec quelle technologie ?",
    answer:
      "On s'adapte a votre stack : Next.js, Webflow, WordPress, HubSpot CMS... L'important c'est la conversion, pas la techno.",
  },
  {
    question: "Comment mesurez-vous les resultats ?",
    answer:
      "Analytics, heatmaps (Hotjar), A/B testing. On vous fournit un rapport detaille avec les KPIs : taux de conversion, cout par lead, ROI.",
  },
  {
    question: "Que se passe-t-il apres la livraison ?",
    answer:
      "Avec le Pack Conversion, on optimise pendant 30 jours. Avec l'abonnement Growth, on optimise en continu chaque mois.",
  },
  {
    question: "Vous faites aussi le copywriting ?",
    answer:
      "Oui. Le copy est le levier #1 de conversion. Chaque landing page inclut un copywriting oriente conversion, redige par nos experts B2B.",
  },
  {
    question: "Quel est le ROI moyen de vos landing pages ?",
    answer:
      "Nos clients voient en moyenne un x3.2 sur leur taux de conversion. L'investissement est rentabilise en 2 a 4 semaines.",
  },
]

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/30"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer min-h-[44px] hover:bg-zinc-800/30 transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span className="text-sm sm:text-base font-medium text-text pr-4">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-text-muted"
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-sm text-text-muted leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="relative py-24 sm:py-32 bg-bg" aria-label="Questions frequentes">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="FAQ"
          title="Questions frequentes"
          subtitle="Tout ce que vous devez savoir avant de travailler avec nous."
        />

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
