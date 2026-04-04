'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Services', page: 1 },
  { label: 'Realisations', page: 2 },
  { label: 'A propos', page: 3 },
  { label: 'Tarifs', page: 4 },
  { label: 'Temoignages', page: 5 },
  { label: 'Contact', page: 6 },
]

const TOTAL_PAGES = 7

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0
      setScrollProgress(Math.min(progress, 1))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const scrollToPage = useCallback((pageIndex: number) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const targetScroll = (pageIndex / TOTAL_PAGES) * maxScroll
    window.scrollTo({ top: targetScroll, behavior: 'smooth' })
    setMobileOpen(false)
  }, [])

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-strong shadow-lg shadow-black/20' : 'bg-transparent'
        }`}
        initial={{ y: shouldReduce ? 0 : -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Scroll progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent">
          <motion.div
            className="h-full bg-gradient-to-r from-neon-violet via-neon-blue to-neon-cyan"
            style={{ width: `${scrollProgress * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Navigation principale">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => scrollToPage(0)}
              className="flex items-center gap-2 group"
              aria-label="Retour en haut"
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-neon-violet to-neon-blue flex items-center justify-center">
                <span className="text-white font-display font-bold text-sm">W</span>
              </div>
              <span className="text-xl font-display font-bold text-text-primary group-hover:text-gradient transition-all">
                Webco
              </span>
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToPage(link.page)}
                  className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200 font-medium"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollToPage(6)}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-display font-semibold text-xs tracking-wide bg-gradient-to-r from-neon-violet to-neon-blue text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:scale-105 transition-all duration-300 min-h-[44px]"
              >
                Demarrer un projet
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex items-center justify-center h-11 w-11 rounded-lg glass"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              className="absolute right-0 top-0 h-full w-72 bg-bg-card border-l border-white/10 p-6 pt-24 flex flex-col gap-2"
              initial={{ x: shouldReduce ? 0 : 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              aria-label="Menu mobile"
            >
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  className="text-lg font-display font-medium text-text-muted hover:text-text-primary transition-colors py-3 border-b border-white/5 text-left"
                  initial={{ opacity: 0, x: shouldReduce ? 0 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollToPage(link.page)}
                >
                  {link.label}
                </motion.button>
              ))}
              <div className="mt-6">
                <button
                  onClick={() => scrollToPage(6)}
                  className="w-full text-center inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-display font-semibold text-sm tracking-wide bg-gradient-to-r from-neon-violet to-neon-blue text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] transition-all duration-300 min-h-[44px]"
                >
                  Demarrer un projet
                </button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
