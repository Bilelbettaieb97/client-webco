import { createClient } from '@supabase/supabase-js'
import { isAdminRequest } from '@/lib/admin-auth'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic'

function getDb() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

export async function GET(req: Request) {
  if (!isAdminRequest(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const { data, error } = await getDb().from('pricing').select('*').order('sort_order')
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}

export async function POST(req: Request) {
  if (!isAdminRequest(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { data, error } = await getDb().from('pricing').insert(body).select().single()
  if (error) return Response.json({ error: error.message }, { status: 500 })
  revalidatePath('/')
  return Response.json(data, { status: 201 })
}
