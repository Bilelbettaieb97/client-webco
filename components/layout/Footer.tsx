export function Footer() {
  return (
    <footer className="py-8 border-t border-zinc-800/50" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs text-text-muted/50">
          &copy; {new Date().getFullYear()} Webco &middot; contact@webco.fr &middot; Paris
        </p>
      </div>
    </footer>
  )
}
