import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function requireAdmin() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  const secret = process.env.ADMIN_SECRET
  if (!token || !secret || token !== secret) {
    redirect('/admin/login')
  }
}

export function isAdminRequest(req: Request): boolean {
  const cookie = req.headers.get('cookie') ?? ''
  const token = cookie
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith('admin_token='))
    ?.split('=')[1]
    ?.trim()
  return !!token && token === process.env.ADMIN_SECRET
}
