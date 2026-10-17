import { getTokenFromRequest, verifyToken } from './auth.js'
import { rows } from './supabase.mjs'

export async function authenticatedStaff(request) {
  const claims = verifyToken(getTokenFromRequest(request))
  if (!claims?.userId) return null
  const [user] = await rows('users', `_id=eq.${encodeURIComponent(claims.userId)}&select=_id,name,email,role,imagePath,profileId&limit=1`)
  return ['super_admin', 'admin', 'alp'].includes(user?.role) ? user : null
}

export async function authenticatedAdmin(request) {
  const user = await authenticatedStaff(request)
  return ['super_admin', 'admin'].includes(user?.role) ? user : null
}
