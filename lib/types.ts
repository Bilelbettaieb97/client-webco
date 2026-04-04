export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  price: string
  sort_order: number
}

export interface PortfolioItem {
  id: string
  title: string
  description: string
  image_url: string
  category: string
  technologies: string[]
  url: string
  sort_order: number
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  sort_order: number
}

export interface PricingPlan {
  id: string
  name: string
  price: string
  description: string
  features: string[]
  is_popular: boolean
  sort_order: number
}

export interface Contact {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  project_type: string | null
  budget: string | null
  message: string
  is_read: boolean
  created_at: string
}

export interface SiteContent {
  id: string
  section: string
  content: Record<string, unknown>
}

export interface Setting {
  id: string
  key: string
  value: string
}

export interface HeroContent {
  title: string
  subtitle: string
  cta_primary: string
  cta_secondary: string
}

export interface AboutContent {
  title: string
  description: string
  stats: { label: string; value: number; suffix: string }[]
}

export interface ContactInfo {
  email: string
  phone: string
  address: string
  socials: { platform: string; url: string }[]
}
