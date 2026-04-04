'use client'

import dynamic from 'next/dynamic'
import type {
  HeroContent,
  Service,
  PortfolioItem,
  AboutContent,
  PricingPlan,
  Testimonial,
  ContactInfo,
} from '@/lib/types'

const WebcoScene = dynamic(
  () => import('@/components/WebcoScene').then((m) => m.WebcoScene),
  { ssr: false }
)

interface WebcoSceneLoaderProps {
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

export function WebcoSceneLoader({ data }: WebcoSceneLoaderProps) {
  return <WebcoScene data={data} />
}
