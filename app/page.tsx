import { getAllData } from "@/lib/db"
import { Navbar } from "@/components/layout/Navbar"
import { Hero } from "@/components/sections/Hero"
import { LogoBar } from "@/components/sections/LogoBar"
import { Problem } from "@/components/sections/Problem"
import { Process } from "@/components/sections/Process"
import { Results } from "@/components/sections/Results"
import { Services } from "@/components/sections/Services"
import { Portfolio } from "@/components/sections/Portfolio"
import { Pricing } from "@/components/sections/Pricing"
import { Testimonials } from "@/components/sections/Testimonials"
import { Stack } from "@/components/sections/Stack"
import { FAQ } from "@/components/sections/FAQ"
import { CTAFinal } from "@/components/sections/CTAFinal"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/layout/Footer"
import { StickyCta } from "@/components/ui/StickyCta"

export const revalidate = 3600

export default async function HomePage() {
  const data = await getAllData()

  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero data={data.hero} />
        <div className="section-divider" />
        <LogoBar />
        <Problem data={data.about} />
        <Results data={data.results} />
        <div className="section-divider" />
        <Process data={data.process} />
        <Portfolio data={data.portfolio} />
        <Services data={data.services} />
        <FAQ />
        <Pricing data={data.pricing} />
        <Testimonials data={data.testimonials} />
        <div className="section-divider" />
        <Stack />
        <CTAFinal />
        <Contact data={data.contactInfo} />
      </main>
      <Footer />
      <StickyCta />
    </>
  )
}
