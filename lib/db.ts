import { getSupabaseServiceClient } from './supabase'
import type {
  Service,
  PortfolioItem,
  Testimonial,
  PricingPlan,
  HeroContent,
  AboutContent,
  ProcessContent,
  ResultsContent,
  ContactInfo,
} from './types'

// ── Default fallback data ──────────────────────────────────────────

const DEFAULT_HERO: HeroContent = {
  title: 'Nous creons des sites web qui convertissent',
  subtitle:
    'Agence web premium specialisee dans la creation de sites performants, modernes et sur-mesure qui transforment vos visiteurs en clients.',
  cta_primary: 'Demarrer un projet',
  cta_secondary: 'Voir nos realisations',
}

const DEFAULT_ABOUT: AboutContent = {
  title: "Votre trafic ne convertit pas ?",
  description:
    "On transforme vos visiteurs en clients qualifies grace a des landing pages B2B strategiques.",
  problem_points: [
    "Vous investissez en ads mais les visiteurs repartent sans convertir",
    "Votre landing page est jolie mais ne genere pas de leads",
    "Vous ne savez pas pourquoi votre taux de conversion stagne",
    "Chaque lead vous coute de plus en plus cher",
  ],
  solution_points: [
    "Chaque element de la page pense pour la conversion",
    "Copywriting B2B oriente resultats, pas du blabla",
    "A/B testing et optimisation data-driven",
    "ROI mesurable des les premieres semaines",
  ],
}

const DEFAULT_PROCESS: ProcessContent = {
  title: "Notre process en 4 etapes",
  subtitle: "Une methodologie eprouvee pour maximiser vos conversions.",
  steps: [
    { number: "01", title: "Audit & Strategie", description: "Analyse de votre marche, vos concurrents et votre audience pour definir la strategie de conversion optimale." },
    { number: "02", title: "Copywriting & Design", description: "Redaction orientee conversion et design strategique. Chaque mot, chaque element visuel a un objectif precis." },
    { number: "03", title: "Developpement & Integration", description: "Developpement sur-mesure, integration avec votre stack technique (CRM, analytics, ads)." },
    { number: "04", title: "Optimisation & Growth", description: "A/B testing, analyse des heatmaps, optimisation continue pour ameliorer vos taux de conversion." },
  ],
}

const DEFAULT_RESULTS: ResultsContent = {
  title: "Des resultats, pas des promesses",
  subtitle: "Voici les resultats concrets que nous avons obtenus pour nos clients B2B.",
  cases: [
    { client_type: "SaaS B2B", before: "1.8%", after: "7.2%", metric: "taux de conversion", description: "Refonte complete de la landing page d'acquisition avec A/B testing sur 3 variantes.", multiplier: "x4" },
    { client_type: "Fintech B2B", before: "2.1%", after: "6.7%", metric: "taux de conversion", description: "Nouvelle landing page avec social proof et copywriting oriente decision-makers.", multiplier: "x3.2" },
    { client_type: "RH & Recrutement", before: "1.5%", after: "5.8%", metric: "taux de conversion", description: "Landing page orientee demo avec video testimoniale et formulaire simplifie.", multiplier: "x3.9" },
  ],
}

const DEFAULT_CONTACT_INFO: ContactInfo = {
  email: 'contact@webco.fr',
  phone: '+33 1 23 45 67 89',
  address: 'Paris, France',
  socials: [
    { platform: 'LinkedIn', url: 'https://linkedin.com/company/webco' },
    { platform: 'Twitter', url: 'https://twitter.com/webco' },
    { platform: 'GitHub', url: 'https://github.com/webco' },
  ],
}

const DEFAULT_SERVICES: Service[] = [
  {
    id: '1',
    title: 'Site Vitrine',
    description:
      'Un site elegant et performant qui presente votre activite et convertit vos visiteurs.',
    icon: 'Globe',
    features: [
      'Design sur-mesure',
      'Responsive mobile',
      'SEO optimise',
      'Animations premium',
      'Panel admin CMS',
    ],
    price: 'A partir de 3 000 EUR',
    sort_order: 1,
  },
  {
    id: '2',
    title: 'Landing Page',
    description:
      'Une page de conversion optimisee pour maximiser vos resultats marketing.',
    icon: 'Rocket',
    features: [
      'Taux de conversion eleve',
      'A/B testing ready',
      'Chargement ultra-rapide',
      'Analytics integre',
      'Formulaire capture',
    ],
    price: 'A partir de 1 500 EUR',
    sort_order: 2,
  },
  {
    id: '3',
    title: 'E-commerce',
    description:
      'Une boutique en ligne complete avec paiement securise et gestion des commandes.',
    icon: 'ShoppingCart',
    features: [
      'Catalogue produits',
      'Paiement Stripe',
      'Gestion commandes',
      'Espace client',
      'Dashboard admin',
    ],
    price: 'A partir de 5 000 EUR',
    sort_order: 3,
  },
  {
    id: '4',
    title: 'Application Web',
    description:
      'Des applications web sur-mesure pour digitaliser vos processus metier.',
    icon: 'Code',
    features: [
      'Architecture scalable',
      'API RESTful',
      'Authentification',
      'Temps reel',
      'CI/CD automatise',
    ],
    price: 'Sur devis',
    sort_order: 4,
  },
]

const DEFAULT_PORTFOLIO: PortfolioItem[] = []
const DEFAULT_TESTIMONIALS: Testimonial[] = []
const DEFAULT_PRICING: PricingPlan[] = [
  {
    id: '1',
    name: 'Starter',
    price: '1 500',
    description: 'Ideal pour lancer votre presence en ligne',
    features: [
      'Landing page optimisee',
      'Design responsive',
      'Formulaire de contact',
      'SEO de base',
      'Livraison en 2 semaines',
    ],
    is_popular: false,
    sort_order: 1,
  },
  {
    id: '2',
    name: 'Business',
    price: '3 500',
    description: 'La solution complete pour votre entreprise',
    features: [
      'Site vitrine multi-pages',
      'Design premium sur-mesure',
      'Animations Framer Motion',
      'Panel admin CMS',
      'SEO avance',
      'Support 3 mois',
    ],
    is_popular: true,
    sort_order: 2,
  },
  {
    id: '3',
    name: 'Enterprise',
    price: '8 000',
    description: 'Pour les projets ambitieux et complexes',
    features: [
      'Application web sur-mesure',
      'E-commerce ou SaaS',
      'Authentification & roles',
      'API & integrations',
      'Architecture scalable',
      'Support 6 mois',
      'Maintenance incluse',
    ],
    is_popular: false,
    sort_order: 3,
  },
]

// ── Fetch helpers ──────────────────────────────────────────────────

function getSectionContent<T>(data: { section: string; content: Record<string, unknown> }[] | null, section: string, fallback: T): T {
  if (!data) return fallback
  const row = data.find((r) => r.section === section)
  return row ? (row.content as T) : fallback
}

export async function getAllData() {
  const sb = getSupabaseServiceClient()

  if (!sb) {
    return {
      hero: DEFAULT_HERO,
      about: DEFAULT_ABOUT,
      process: DEFAULT_PROCESS,
      results: DEFAULT_RESULTS,
      contactInfo: DEFAULT_CONTACT_INFO,
      services: DEFAULT_SERVICES,
      portfolio: DEFAULT_PORTFOLIO,
      testimonials: DEFAULT_TESTIMONIALS,
      pricing: DEFAULT_PRICING,
    }
  }

  const [contentRes, servicesRes, portfolioRes, testimonialsRes, pricingRes] =
    await Promise.all([
      sb.from('site_content').select('section, content'),
      sb.from('services').select('*').order('sort_order'),
      sb.from('portfolio').select('*').order('sort_order'),
      sb.from('testimonials').select('*').order('sort_order'),
      sb.from('pricing').select('*').order('sort_order'),
    ])

  const content = contentRes.data as { section: string; content: Record<string, unknown> }[] | null

  return {
    hero: getSectionContent<HeroContent>(content, 'hero', DEFAULT_HERO),
    about: getSectionContent<AboutContent>(content, 'about', DEFAULT_ABOUT),
    process: getSectionContent<ProcessContent>(content, 'process', DEFAULT_PROCESS),
    results: getSectionContent<ResultsContent>(content, 'results', DEFAULT_RESULTS),
    contactInfo: getSectionContent<ContactInfo>(content, 'contact_info', DEFAULT_CONTACT_INFO),
    services: (servicesRes.data as Service[]) ?? DEFAULT_SERVICES,
    portfolio: (portfolioRes.data as PortfolioItem[]) ?? DEFAULT_PORTFOLIO,
    testimonials: (testimonialsRes.data as Testimonial[]) ?? DEFAULT_TESTIMONIALS,
    pricing: (pricingRes.data as PricingPlan[]) ?? DEFAULT_PRICING,
  }
}

export async function adminGetStats() {
  const sb = getSupabaseServiceClient()
  if (!sb) return { services: 0, portfolio: 0, testimonials: 0, pricing: 0, contacts: 0, unread: 0 }

  const [s, p, t, pr, c, u] = await Promise.all([
    sb.from('services').select('id', { count: 'exact', head: true }),
    sb.from('portfolio').select('id', { count: 'exact', head: true }),
    sb.from('testimonials').select('id', { count: 'exact', head: true }),
    sb.from('pricing').select('id', { count: 'exact', head: true }),
    sb.from('contacts').select('id', { count: 'exact', head: true }),
    sb.from('contacts').select('id', { count: 'exact', head: true }).eq('is_read', false),
  ])

  return {
    services: s.count ?? 0,
    portfolio: p.count ?? 0,
    testimonials: t.count ?? 0,
    pricing: pr.count ?? 0,
    contacts: c.count ?? 0,
    unread: u.count ?? 0,
  }
}

export async function getSettings(): Promise<{ notificationEmail: string }> {
  const sb = getSupabaseServiceClient()
  const fallback = { notificationEmail: process.env.CONTACT_EMAIL ?? 'contact@webco.fr' }
  if (!sb) return fallback
  const { data } = await sb.from('settings').select('key, value')
  if (!data || data.length === 0) return fallback
  const emailSetting = data.find((s: { key: string; value: string }) => s.key === 'notification_email')
  return { notificationEmail: emailSetting?.value ?? fallback.notificationEmail }
}
