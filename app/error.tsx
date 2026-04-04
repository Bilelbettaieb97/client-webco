'use client'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary px-4">
      <div className="text-center">
        <h1 className="text-6xl font-display font-bold text-gradient">Erreur</h1>
        <p className="mt-4 text-xl text-text-primary font-display">
          Quelque chose s&apos;est mal passe
        </p>
        <p className="mt-2 text-text-muted">
          Une erreur inattendue est survenue. Veuillez reessayer.
        </p>
        <button
          onClick={reset}
          className="mt-8 inline-flex items-center justify-center px-8 py-3 rounded-xl bg-gradient-to-r from-neon-violet to-neon-blue text-white font-display font-semibold text-sm hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] transition-all min-h-[44px]"
        >
          Reessayer
        </button>
      </div>
    </div>
  )
}
