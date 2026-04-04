export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-neon-violet to-neon-blue animate-pulse" />
        <p className="text-sm text-text-muted">Chargement...</p>
      </div>
    </div>
  )
}
