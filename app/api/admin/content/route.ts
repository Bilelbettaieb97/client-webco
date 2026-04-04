import { createClient } from '@supabase/supabase-js'
import { isAdminRequest } from '@/lib/admin-auth'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic'

function getDb() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

export async function GET(req: Request) {
  if (!isAdminRequest(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const { data, error } = await getDb().from('site_content').select('*')
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}

export async function PUT(req: Request) {
  if (!isAdminRequest(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const { section, content } = await req.json() as { section: string; content: Record<string, unknown> }

  if (!section || !content) {
    return Response.json({ error: 'Section and content required' }, { status: 400 })
  }

  const { error } = await getDb()
    .from('site_content')
    .upsert({ section, content }, { onConflict: 'section' })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  revalidatePath('/')
  return Response.json({ success: true })
}
