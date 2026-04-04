'use client'

import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Mail,
  Briefcase,
  FolderOpen,
  MessageSquare,
  CreditCard,
  FileText,
  Settings,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/contacts', label: 'Messages', icon: Mail },
  { href: '/admin/services', label: 'Services', icon: Briefcase },
  { href: '/admin/portfolio', label: 'Portfolio', icon: FolderOpen },
  { href: '/admin/testimonials', label: 'Temoignages', icon: MessageSquare },
  { href: '/admin/pricing', label: 'Tarifs', icon: CreditCard },
  { href: '/admin/content', label: 'Contenu', icon: FileText },
  { href: '/admin/settings', label: 'Parametres', icon: Settings },
]

interface AdminSidebarProps {
  unread: number
}

export function AdminSidebar({ unread }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="w-64 shrink-0 bg-bg-card border-r border-white/5 flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-neon-violet to-neon-blue flex items-center justify-center">
            <span className="text-white font-display font-bold text-sm">W</span>
          </div>
          <div>
            <span className="text-sm font-display font-bold text-text-primary">Webco</span>
            <span className="block text-[10px] text-text-muted">Administration</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto" aria-label="Menu admin">
        {links.map((link) => {
          const isActive =
            link.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(link.href)

          return (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors min-h-[40px]',
                isActive
                  ? 'bg-neon-violet/10 text-neon-violet font-medium'
                  : 'text-text-muted hover:text-text-primary hover:bg-white/5'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <link.icon className="h-4 w-4 shrink-0" />
              {link.label}
              {link.href === '/admin/contacts' && unread > 0 && (
                <span className="ml-auto text-[10px] font-bold bg-neon-violet text-white h-5 min-w-[20px] flex items-center justify-center rounded-full px-1.5">
                  {unread}
                </span>
              )}
            </a>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-muted hover:text-red-400 hover:bg-red-400/5 transition-colors w-full min-h-[40px]"
        >
          <LogOut className="h-4 w-4" />
          Deconnexion
        </button>
      </div>

      {/* Back to site */}
      <div className="px-4 pb-4">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-xs text-text-muted hover:text-text-primary transition-colors py-2"
        >
          Voir le site
        </a>
      </div>
    </aside>
  )
}
