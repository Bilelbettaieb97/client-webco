import { getAllData } from "@/lib/db"
import { Navbar } from "@/components/layout/Navbar"
import { Hero } from "@/components/sections/Hero"
import { LogoBar } from "@/components/sections/LogoBar"
import { Problem } from "@/components/sections/Problem"
import { CROPlayground } from "@/components/sections/CROPlayground"
import { Process } from "@/components/sections/Process"
import { Results } from "@/components/sections/Results"
import { ROISection } from "@/components/sections/ROISection"
import { LiveABTest } from "@/components/sections/LiveABTest"
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
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { FloatingElement } from "@/components/ui/FloatingElement"

export const revalidate = 3600

export default async function HomePage() {
  const data = await getAllData()

  return (
    <>
      <Navbar />
      <main id="main-content" className="relative">
        <Hero data={data.hero} />

        <div className="section-divider" />

        {/* Floating decorative elements throughout the page */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <FloatingElement shape="ring" size={80} color="accent" speed={0.3} className="absolute top-[15%] left-[5%]" rotate={90} />
          <FloatingElement shape="circle" size={12} color="accent-blue" speed={-0.2} className="absolute top-[25%] right-[8%]" opacity={0.1} />
          <FloatingElement shape="line" size={120} color="accent" speed={0.4} className="absolute top-[35%] left-[15%]" rotate={45} />
          <FloatingElement shape="cross" size={24} color="accent-cyan" speed={-0.3} className="absolute top-[45%] right-[12%]" opacity={0.08} />
          <FloatingElement shape="dot" size={60} color="accent" speed={0.5} className="absolute top-[55%] left-[8%]" />
          <FloatingElement shape="ring" size={50} color="accent-blue" speed={-0.4} className="absolute top-[65%] right-[6%]" rotate={-60} />
          <FloatingElement shape="circle" size={8} color="accent-cyan" speed={0.2} className="absolute top-[75%] left-[20%]" opacity={0.12} />
          <FloatingElement shape="line" size={90} color="accent-blue" speed={-0.3} className="absolute top-[85%] right-[15%]" rotate={-30} />
        </div>

        <ScrollReveal variant="fadeUp">
          <LogoBar />
        </ScrollReveal>

        <ScrollReveal variant="fadeLeft" delay={0.1}>
          <Problem data={data.about} />
        </ScrollReveal>

        <ScrollReveal variant="scaleUp">
          <CROPlayground />
        </ScrollReveal>

        <ScrollReveal variant="clipUp">
          <Results data={data.results} />
        </ScrollReveal>

        <div className="section-divider" />

        <ScrollReveal variant="blur">
          <ROISection />
        </ScrollReveal>

        <ScrollReveal variant="fadeRight" delay={0.1}>
          <LiveABTest />
        </ScrollReveal>

        <ScrollReveal variant="fadeUp">
          <Process data={data.process} />
        </ScrollReveal>

        <ScrollReveal variant="scaleUp">
          <Portfolio data={data.portfolio} />
        </ScrollReveal>

        <ScrollReveal variant="clipUp">
          <Services data={data.services} />
        </ScrollReveal>

        <ScrollReveal variant="fadeUp">
          <FAQ />
        </ScrollReveal>

        <ScrollReveal variant="blur">
          <Pricing data={data.pricing} />
        </ScrollReveal>

        <ScrollReveal variant="fadeUp">
          <Testimonials data={data.testimonials} />
        </ScrollReveal>

        <div className="section-divider" />

        <ScrollReveal variant="scaleUp">
          <Stack />
        </ScrollReveal>

        <ScrollReveal variant="clipUp">
          <CTAFinal />
        </ScrollReveal>

        <ScrollReveal variant="fadeUp">
          <Contact data={data.contactInfo} />
        </ScrollReveal>
      </main>
      <Footer />
      <StickyCta />
    </>
  )
}
