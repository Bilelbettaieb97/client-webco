"use client"

const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Supabase",
  "Framer Motion",
  "Three.js",
  "Vercel",
  "Stripe",
  "Figma",
  "Node.js",
  "PostgreSQL",
]

export function LogoMarquee() {
  return (
    <section className="relative py-12 sm:py-16 bg-bg overflow-hidden" aria-label="Technologies">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

      {/* Label */}
      <p className="text-center text-xs uppercase tracking-widest text-text-muted mb-8">
        Technologies que nous maitrisons
      </p>

      {/* Marquee */}
      <div className="flex overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...techStack, ...techStack].map((tech, i) => (
            <span
              key={i}
              className="mx-6 sm:mx-8 text-lg sm:text-xl font-display font-semibold text-zinc-600 hover:text-accent transition-colors duration-300 select-none"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex animate-marquee whitespace-nowrap" aria-hidden="true">
          {[...techStack, ...techStack].map((tech, i) => (
            <span
              key={`dup-${i}`}
              className="mx-6 sm:mx-8 text-lg sm:text-xl font-display font-semibold text-zinc-600 hover:text-accent transition-colors duration-300 select-none"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
