'use client'

import { ScrollControls, Scroll, Stars, AdaptiveDpr, Preload, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

import { HeroScene } from './scenes/HeroScene'
import { ServicesScene } from './scenes/ServicesScene'
import { PortfolioScene } from './scenes/PortfolioScene'
import { AboutScene } from './scenes/AboutScene'
import { PricingScene } from './scenes/PricingScene'
import { TestimonialsScene } from './scenes/TestimonialsScene'
import { ContactScene } from './scenes/ContactScene'
import { GlobalParticles } from './effects/GlobalParticles'
import { FloatingGeometry } from './effects/FloatingGeometry'

import { HeroHTML } from './html/HeroHTML'
import { ServicesHTML } from './html/ServicesHTML'
import { PortfolioHTML } from './html/PortfolioHTML'
import { AboutHTML } from './html/AboutHTML'
import { PricingHTML } from './html/PricingHTML'
import { TestimonialsHTML } from './html/TestimonialsHTML'
import { ContactHTML } from './html/ContactHTML'

import type {
  HeroContent,
  Service,
  PortfolioItem,
  AboutContent,
  PricingPlan,
  Testimonial,
  ContactInfo,
} from '@/lib/types'

interface ExperienceProps {
  hero: HeroContent
  services: Service[]
  portfolio: PortfolioItem[]
  about: AboutContent
  pricing: PricingPlan[]
  testimonials: Testimonial[]
  contactInfo: ContactInfo
}

export function Experience({
  hero,
  services,
  portfolio,
  about,
  pricing,
  testimonials,
  contactInfo,
}: ExperienceProps) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#8b5cf6" />
      <directionalLight position={[-5, 3, -5]} intensity={0.15} color="#3b82f6" />
      <pointLight position={[0, 0, 3]} intensity={0.5} color="#8b5cf6" distance={10} />

      {/* Environment for reflections */}
      <Environment preset="night" />

      {/* Stars background */}
      <Stars
        radius={100}
        depth={60}
        count={2000}
        factor={3}
        saturation={0}
        fade
        speed={0.5}
      />

      <ScrollControls pages={7} damping={0.25}>
        {/* 3D World */}
        <Scroll>
          <HeroScene />
          <ServicesScene />
          <PortfolioScene />
          <AboutScene />
          <PricingScene />
          <TestimonialsScene />
          <ContactScene />
          <GlobalParticles />
          <FloatingGeometry />
        </Scroll>

        {/* HTML Overlays */}
        <Scroll html style={{ width: '100%' }}>
          <HeroHTML data={hero} />
          <ServicesHTML data={services} />
          <PortfolioHTML data={portfolio} />
          <AboutHTML data={about} />
          <PricingHTML data={pricing} />
          <TestimonialsHTML data={testimonials} />
          <ContactHTML data={contactInfo} />
        </Scroll>
      </ScrollControls>

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          intensity={1.5}
        />
      </EffectComposer>

      {/* Performance */}
      <AdaptiveDpr pixelated />
      <Preload all />
    </>
  )
}
