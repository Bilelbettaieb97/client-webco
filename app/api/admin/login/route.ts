import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const { password } = (await req.json()) as { password?: string }

  if (!password || password !== process.env.ADMIN_SECRET) {
    return Response.json({ error: 'Mot de passe incorrect' }, { status: 401 })
  }

  const cookieStore = await cookies()
  cookieStore.set('admin_token', process.env.ADMIN_SECRET!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  return Response.json({ success: true })
}
