import { authenticatedAdmin } from '@/lib/admin.mjs'
import { rows } from '@/lib/supabase.mjs'
import { USER_FIELDS, userRecord } from '@/lib/people.mjs'

export { POST, PUT, DELETE } from '../users/route'

export async function GET(request) {
  try {
    if (!await authenticatedAdmin(request)) return Response.json({ success: false, message: 'Administrator access required' }, { status: 403 })
    const users = await rows('users', `role=neq.super_admin&select=${USER_FIELDS}&order=sortOrder.asc,createdAt.asc`)
    return Response.json({ success: true, people: users.map(userRecord) })
  } catch { return Response.json({ success: false, message: 'Could not load people' }, { status: 500 }) }
}
