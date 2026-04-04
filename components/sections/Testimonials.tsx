'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Testimonial } from '@/lib/types'

interface TestimonialsProps {
  data: Testimonial[]
}

export function Testimonials({ data }: TestimonialsProps) {
  const shouldReduce = useReducedMotion()
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (data.length <= 1 || paused || shouldReduce) return
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % data.length)
    }, 5000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [data.length, paused, shouldReduce])

  if (data.length === 0) {
    return (
      <section id="testimonials" className="py-24 sm:py-32" aria-label="Temoignages">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Ce que disent nos clients"
            subtitle="La satisfaction de nos clients est notre meilleure carte de visite."
          />
          <div className="mt-16 text-center">
            <div className="glass rounded-2xl p-12 max-w-lg mx-auto">
              <p className="text-text-muted">
                Les temoignages arrivent bientot.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const prev = () => setCurrent((c) => (c - 1 + data.length) % data.length)
  const next = () => setCurrent((c) => (c + 1) % data.length)

  return (
    <section id="testimonials" className="py-24 sm:py-32" aria-label="Temoignages">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Ce que disent nos clients"
          subtitle="La satisfaction de nos clients est notre meilleure carte de visite."
        />

        <div
          className="mt-16 max-w-3xl mx-auto relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <motion.div
            key={current}
            initial={{ opacity: 0, x: shouldReduce ? 0 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            className="glass rounded-2xl p-8 sm:p-12 text-center"
          >
            <Quote className="h-8 w-8 text-neon-violet/30 mx-auto mb-6" aria-hidden="true" />

            <p className="text-lg sm:text-xl text-text-primary leading-relaxed italic">
              &ldquo;{data[current].content}&rdquo;
            </p>

            <div className="flex justify-center gap-1 mt-6">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star
                  key={j}
                  className={`h-4 w-4 ${
                    j < data[current].rating
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-white/10'
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>

            <div className="mt-6">
              <p className="font-display font-semibold text-text-primary">
                {data[current].name}
              </p>
              <p className="text-sm text-text-muted">
                {data[current].role} — {data[current].company}
              </p>
            </div>
          </motion.div>

          {/* Controls */}
          {data.length > 1 && (
            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={prev}
                className="h-10 w-10 rounded-lg glass flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
                aria-label="Temoignage precedent"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-1.5">
                {data.map((_, j) => (
                  <button
                    key={j}
                    onClick={() => setCurrent(j)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      j === current
                        ? 'w-6 bg-neon-violet'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Aller au temoignage ${j + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="h-10 w-10 rounded-lg glass flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
                aria-label="Temoignage suivant"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
