'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NeonButton } from '@/components/ui/NeonButton'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Realisations', href: '#portfolio' },
  { label: 'Tarifs', href: '#pricing' },
  { label: 'Temoignages', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
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
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Navigation principale">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-neon-violet to-neon-blue flex items-center justify-center">
                <span className="text-white font-display font-bold text-sm">W</span>
              </div>
              <span className="text-xl font-display font-bold text-text-primary group-hover:text-gradient transition-all">
                Webco
              </span>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200 font-medium"
                >
                  {link.label}
                </a>
              ))}
              <NeonButton href="#contact" variant="primary" className="text-xs px-6 py-2.5">
                Demarrer un projet
              </NeonButton>
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
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-lg font-display font-medium text-text-muted hover:text-text-primary transition-colors py-3 border-b border-white/5"
                  initial={{ opacity: 0, x: shouldReduce ? 0 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-6">
                <NeonButton
                  href="#contact"
                  variant="primary"
                  className="w-full text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Demarrer un projet
                </NeonButton>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
