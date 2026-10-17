import { authenticatedStaff } from '@/lib/admin.mjs'
import { rows } from '@/lib/supabase.mjs'

export async function GET(request, { params }) {
  if (!(await authenticatedStaff(request))) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { id } = await params
    const [application] = await rows('recruitment', `_id=eq.${encodeURIComponent(id)}&limit=1`)
    return application ? Response.json({ application }) : Response.json({ error: 'Application not found' }, { status: 404 })
  } catch { return Response.json({ error: 'Internal server error' }, { status: 500 }) }
}
