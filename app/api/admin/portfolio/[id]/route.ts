import { createClient } from '@supabase/supabase-js'
import { isAdminRequest } from '@/lib/admin-auth'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic'

function getDb() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminRequest(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const { data, error } = await getDb().from('portfolio').update(body).eq('id', id).select().single()
  if (error) return Response.json({ error: error.message }, { status: 500 })
  revalidatePath('/')
  return Response.json(data)
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminRequest(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const { error } = await getDb().from('portfolio').delete().eq('id', id)
  if (error) return Response.json({ error: error.message }, { status: 500 })
  revalidatePath('/')
  return Response.json({ success: true })
}
