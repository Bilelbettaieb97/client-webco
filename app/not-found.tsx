import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary px-4">
      <div className="text-center">
        <h1 className="text-8xl font-display font-bold text-gradient">404</h1>
        <p className="mt-4 text-xl text-text-primary font-display">
          Page introuvable
        </p>
        <p className="mt-2 text-text-muted">
          La page que vous recherchez n&apos;existe pas ou a ete deplacee.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center px-8 py-3 rounded-xl bg-gradient-to-r from-neon-violet to-neon-blue text-white font-display font-semibold text-sm hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] transition-all min-h-[44px]"
        >
          Retour a l&apos;accueil
        </Link>
      </div>
    </div>
  )
}
