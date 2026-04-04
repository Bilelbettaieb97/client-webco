import { getAllData } from '@/lib/db'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Portfolio } from '@/components/sections/Portfolio'
import { Pricing } from '@/components/sections/Pricing'
import { Testimonials } from '@/components/sections/Testimonials'
import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'

export const revalidate = 3600

export default async function HomePage() {
  const { hero, about, contactInfo, services, portfolio, testimonials, pricing } =
    await getAllData()

  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero data={hero} />
        <Services data={services} />
        <Portfolio data={portfolio} />
        <About data={about} />
        <Pricing data={pricing} />
        <Testimonials data={testimonials} />
        <Contact data={contactInfo} />
      </main>
      <Footer />
    </>
  )
}
