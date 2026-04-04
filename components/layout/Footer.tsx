const navLinks = [
  { label: "Process", href: "#process" },
  { label: "Résultats", href: "#resultats" },
  { label: "Offres", href: "#offres" },
  { label: "Témoignages", href: "#temoignages" },
  { label: "Contact", href: "#contact" },
]

const legalLinks = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/confidentialite" },
]

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com/company/webco" },
  { label: "Twitter/X", href: "https://twitter.com/webco" },
]

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
              Landing pages B2B qui convertissent. Design stratégique, copywriting orienté résultats, optimisation continue.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-text-muted hover:text-text transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text mb-4">
              Légal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-text-muted hover:text-text transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Contact */}
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
            </ul>
            <div className="flex gap-3 mt-6">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 text-xs font-medium rounded-lg bg-zinc-800/50 text-text-muted hover:text-accent hover:bg-zinc-800 transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label={social.label}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-zinc-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Webco. Tous droits réservés.
          </p>
          <p className="text-xs text-text-muted">
            Conçu par Webco
          </p>
        </div>
      </div>
    </footer>
  )
}
