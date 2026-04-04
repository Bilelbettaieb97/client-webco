import { adminGetStats } from '@/lib/db'
import { Briefcase, FolderOpen, MessageSquare, CreditCard, Mail, MailOpen } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const stats = await adminGetStats()

  const cards = [
    { label: 'Messages total', value: stats.contacts, icon: Mail, color: 'text-neon-violet' },
    { label: 'Non lus', value: stats.unread, icon: MailOpen, color: 'text-yellow-400' },
    { label: 'Services', value: stats.services, icon: Briefcase, color: 'text-neon-blue' },
    { label: 'Portfolio', value: stats.portfolio, icon: FolderOpen, color: 'text-neon-cyan' },
    { label: 'Temoignages', value: stats.testimonials, icon: MessageSquare, color: 'text-green-400' },
    { label: 'Tarifs', value: stats.pricing, icon: CreditCard, color: 'text-orange-400' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-text-primary mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.label}
            className="glass rounded-xl p-6 flex items-center gap-4"
          >
            <div className={`h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center ${card.color}`}>
              <card.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-text-primary">
                {card.value}
              </p>
              <p className="text-sm text-text-muted">{card.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
