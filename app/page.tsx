import { getAllData } from "@/lib/db"
import { Navbar } from "@/components/layout/Navbar"
import { Hero } from "@/components/sections/Hero"
import { LogoMarquee } from "@/components/sections/LogoMarquee"
import { Services } from "@/components/sections/Services"
import { Portfolio } from "@/components/sections/Portfolio"
import { About } from "@/components/sections/About"
import { Pricing } from "@/components/sections/Pricing"
import { Testimonials } from "@/components/sections/Testimonials"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/layout/Footer"

export const revalidate = 3600

export default async function HomePage() {
  const data = await getAllData()

  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero data={data.hero} />
        <LogoMarquee />
        <Services data={data.services} />
        <Portfolio data={data.portfolio} />
        <About data={data.about} />
        <Pricing data={data.pricing} />
        <Testimonials data={data.testimonials} />
        <Contact data={data.contactInfo} />
      </main>
      <Footer />
    </>
  )
}
