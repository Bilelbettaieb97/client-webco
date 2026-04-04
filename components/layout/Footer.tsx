import { Globe, Link2, ExternalLink } from 'lucide-react'

const footerLinks = [
  {
    title: 'Services',
    links: [
      { label: 'Site Vitrine', href: '#services' },
      { label: 'Landing Page', href: '#services' },
      { label: 'E-commerce', href: '#services' },
      { label: 'Application Web', href: '#services' },
    ],
  },
  {
    title: 'Entreprise',
    links: [
      { label: 'A propos', href: '#about' },
      { label: 'Realisations', href: '#portfolio' },
      { label: 'Tarifs', href: '#pricing' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Mentions legales', href: '#' },
      { label: 'Politique de confidentialite', href: '#' },
      { label: 'CGV', href: '#' },
    ],
  },
]

const socialLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com/company/webco', icon: Link2 },
  { label: 'Twitter', href: 'https://twitter.com/webco', icon: ExternalLink },
  { label: 'GitHub', href: 'https://github.com/webco', icon: Globe },
]

export function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      {/* Gradient border top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-violet/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-neon-violet to-neon-blue flex items-center justify-center">
                <span className="text-white font-display font-bold text-sm">W</span>
              </div>
              <span className="text-xl font-display font-bold">Webco</span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              Agence web premium specialisee dans la creation de sites
              performants et sur-mesure qui transforment vos visiteurs en
              clients.
            </p>
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-lg glass flex items-center justify-center text-text-muted hover:text-neon-violet hover:border-neon-violet/30 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-text-primary mb-4">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-text-muted hover:text-text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Webco. Tous droits reserves.
          </p>
          <p className="text-xs text-text-muted">
            Concu avec passion a Paris
          </p>
        </div>
      </div>
    </footer>
  )
}
