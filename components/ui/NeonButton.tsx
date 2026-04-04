'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface NeonButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  href?: string
}

export function NeonButton({
  children,
  variant = 'primary',
  className,
  onClick,
  type = 'button',
  disabled = false,
  href,
}: NeonButtonProps) {
  const baseClasses = cn(
    'relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-display font-semibold text-sm tracking-wide transition-all duration-300 min-h-[44px]',
    variant === 'primary' &&
      'bg-gradient-to-r from-neon-violet to-neon-blue text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:scale-105',
    variant === 'secondary' &&
      'glass text-text-primary hover:bg-white/[0.08] hover:border-neon-violet/30',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseClasses}
        whileTap={{ scale: 0.97 }}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      whileTap={disabled ? undefined : { scale: 0.97 }}
    >
      {children}
    </motion.button>
  )
}
