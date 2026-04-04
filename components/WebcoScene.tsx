'use client'

import { useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Experience } from './three/Experience'
import type {
  HeroContent,
  Service,
  PortfolioItem,
  AboutContent,
  PricingPlan,
  Testimonial,
  ContactInfo,
} from '@/lib/types'

interface WebcoSceneProps {
  data: {
    hero: HeroContent
    services: Service[]
    portfolio: PortfolioItem[]
    about: AboutContent
    pricing: PricingPlan[]
    testimonials: Testimonial[]
    contactInfo: ContactInfo
  }
}

function Loader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-primary">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-neon-violet to-neon-blue flex items-center justify-center">
          <span className="text-white font-display font-bold text-sm">W</span>
        </div>
        <span className="text-xl font-display font-bold text-text-primary">Webco</span>
      </div>
      <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-neon-violet to-neon-blue rounded-full transition-all duration-300"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <p className="mt-3 text-xs text-text-muted">
        Chargement de l&apos;experience 3D...
      </p>
    </div>
  )
}

export function WebcoScene({ data }: WebcoSceneProps) {
  const [mounted, setMounted] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    setMounted(true)
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mq.matches)

    const loadTimer = setTimeout(() => setLoaded(true), 2000)
    return () => clearTimeout(loadTimer)
  }, [])

  if (!mounted) return null

  // Fallback for reduced motion
  if (prefersReduced) {
    return (
      <div className="fixed inset-0 bg-bg-primary" style={{ zIndex: 0 }}>
        <div className="absolute inset-0 bg-gradient-to-b from-neon-violet/5 via-transparent to-neon-blue/5" />
      </div>
    )
  }

  return (
    <>
      {!loaded && <Loader />}
      <div
        className="fixed inset-0"
        style={{ zIndex: 0 }}
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
          }}
          onCreated={() => {
            setTimeout(() => setLoaded(true), 500)
          }}
          style={{ background: '#050510' }}
        >
          <Suspense fallback={null}>
            <Experience
              hero={data.hero}
              services={data.services}
              portfolio={data.portfolio}
              about={data.about}
              pricing={data.pricing}
              testimonials={data.testimonials}
              contactInfo={data.contactInfo}
            />
          </Suspense>
        </Canvas>
      </div>
    </>
  )
}
