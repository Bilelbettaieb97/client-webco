import { requireAdmin } from '@/lib/admin-auth'
import { adminGetStats } from '@/lib/db'
import { AdminSidebar } from './_components/AdminSidebar'

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireAdmin()
  const stats = await adminGetStats()

  return (
    <div className="flex h-screen overflow-hidden bg-bg-primary font-body">
      <AdminSidebar unread={stats.unread} />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  )
}
