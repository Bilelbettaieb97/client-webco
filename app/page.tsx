import { getAllData } from "@/lib/db"
import { Navbar } from "@/components/layout/Navbar"
import { Hero } from "@/components/sections/Hero"
import { LogoBar } from "@/components/sections/LogoBar"
import { Transformation } from "@/components/sections/Transformation"
import { CROPlayground } from "@/components/sections/CROPlayground"
import { Work } from "@/components/sections/Work"
import { Pricing } from "@/components/sections/Pricing"
import { Testimonials } from "@/components/sections/Testimonials"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/layout/Footer"
import { StickyCta } from "@/components/ui/StickyCta"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { FloatingElement } from "@/components/ui/FloatingElement"

export const revalidate = 3600

export default async function HomePage() {
  const data = await getAllData()

  return (
    <>
      <Navbar />
      <main id="main-content" className="relative">
        {/* Floating decorative elements — reduced to 4 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <FloatingElement shape="ring" size={80} color="accent" speed={0.3} className="absolute top-[20%] left-[5%]" rotate={90} />
          <FloatingElement shape="circle" size={12} color="accent-blue" speed={-0.2} className="absolute top-[40%] right-[8%]" opacity={0.08} />
          <FloatingElement shape="line" size={120} color="accent" speed={0.4} className="absolute top-[60%] left-[15%]" rotate={45} />
          <FloatingElement shape="dot" size={60} color="accent-blue" speed={-0.3} className="absolute top-[80%] right-[6%]" />
        </div>

        <Hero data={data.hero} />

        <ScrollReveal variant="fadeUp">
          <LogoBar />
        </ScrollReveal>

        <ScrollReveal variant="clipUp">
          <Transformation />
        </ScrollReveal>

        <ScrollReveal variant="scaleUp">
          <CROPlayground />
        </ScrollReveal>

        <ScrollReveal variant="fadeUp">
          <Work data={data.portfolio} />
        </ScrollReveal>

        <ScrollReveal variant="blur">
          <Pricing data={data.pricing} />
        </ScrollReveal>

        <ScrollReveal variant="fadeUp">
          <Testimonials data={data.testimonials} />
        </ScrollReveal>

        <ScrollReveal variant="clipUp">
          <Contact data={data.contactInfo} />
        </ScrollReveal>
      </main>
      <Footer />
      <StickyCta />
    </>
  )
}
