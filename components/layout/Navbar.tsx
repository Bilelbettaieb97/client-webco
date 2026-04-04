"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "#process", label: "Process" },
  { href: "#resultats", label: "Resultats" },
  { href: "#offres", label: "Offres" },
  { href: "#temoignages", label: "Temoignages" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const [progress, setProgress] = useState(0)

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(latest)
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className={`transition-all duration-300 ${
          isScrolled ? "glass-strong shadow-lg shadow-black/10" : "bg-transparent"
        }`}
        aria-label="Navigation principale"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a
              href="#"
              className="text-xl sm:text-2xl font-display font-bold text-gradient"
              aria-label="Webco - Retour a l'accueil"
            >
              Webco
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-muted hover:text-text transition-colors duration-200 font-medium"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="px-5 py-2.5 text-sm font-medium rounded-lg bg-gradient-to-r from-accent to-accent-blue text-white hover:opacity-90 transition-opacity cursor-pointer min-h-[44px] flex items-center"
              >
                Reserver un appel
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-text-muted hover:text-text transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Scroll progress bar */}
        <div className="h-[2px] bg-zinc-800/50">
          <motion.div
            className="h-full bg-gradient-to-r from-accent to-accent-blue"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-0 z-40 bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="text-2xl font-display font-semibold text-text hover:text-accent transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-4 px-8 py-3 text-lg font-medium rounded-lg bg-gradient-to-r from-accent to-accent-blue text-white"
              >
                Reserver un appel
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
