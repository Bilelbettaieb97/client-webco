import { Code, ExternalLink } from "lucide-react"

const footerLinks = {
  services: [
    { label: "Site Vitrine", href: "#services" },
    { label: "Landing Page", href: "#services" },
    { label: "E-commerce", href: "#services" },
    { label: "Application Web", href: "#services" },
  ],
  company: [
    { label: "A propos", href: "#about" },
    { label: "Realisations", href: "#realisations" },
    { label: "Tarifs", href: "#tarifs" },
    { label: "Contact", href: "#contact" },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/webco" },
    { label: "LinkedIn", href: "https://linkedin.com/company/webco" },
    { label: "Twitter", href: "https://twitter.com/webco" },
  ],
}

export function Footer() {
  return (
    <footer className="relative border-t border-zinc-800" role="contentinfo">
      {/* Gradient border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="text-2xl font-display font-bold text-gradient">
              Webco
            </a>
            <p className="mt-4 text-sm text-text-muted leading-relaxed max-w-xs">
              Agence web premium. Nous creons des sites web d&apos;exception qui transforment vos visiteurs en clients.
            </p>
            <div className="flex gap-4 mt-6">
              {footerLinks.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-zinc-800/50 text-text-muted hover:text-accent hover:bg-zinc-800 transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center gap-1.5 text-xs font-medium"
                  aria-label={social.label}
                >
                  <ExternalLink size={14} />
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-text-muted hover:text-text transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text mb-4">
              Entreprise
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-text-muted hover:text-text transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-text-muted">
              <li>
                <a href="mailto:contact@webco.fr" className="hover:text-text transition-colors">
                  contact@webco.fr
                </a>
              </li>
              <li>
                <a href="tel:+33123456789" className="hover:text-text transition-colors">
                  +33 1 23 45 67 89
                </a>
              </li>
              <li>Paris, France</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-zinc-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Webco. Tous droits reserves.
          </p>
          <p className="text-xs text-text-muted flex items-center gap-1.5">
            <Code size={14} className="text-accent" />
            Built with passion
          </p>
        </div>
      </div>
    </footer>
  )
}
