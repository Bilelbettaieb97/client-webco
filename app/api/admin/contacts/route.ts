import { createClient } from '@supabase/supabase-js'
import { isAdminRequest } from '@/lib/admin-auth'

export const dynamic = 'force-dynamic'

function getDb() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

export async function GET(req: Request) {
  if (!isAdminRequest(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const { data, error } = await getDb().from('contacts').select('*').order('created_at', { ascending: false })
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}
