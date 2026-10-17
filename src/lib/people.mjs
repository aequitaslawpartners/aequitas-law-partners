import { rows } from './supabase.mjs'

export const USER_FIELDS = '_id,name,email,role,profileId,profile,imagePath,sortOrder,createdAt,updatedAt'
export const imageUrl = path => path ? `${process.env.SUPABASE_URL}/storage/v1/object/public/people/${path}` : null

export function publicProfile(user) {
  if (!user || user.role === 'super_admin') return null
  return { ...user.profile, id: user.profileId, name: user.name, email: user.email, image: imageUrl(user.imagePath), vcard: `/api/people/${user.profileId}/vcard` }
}

export const userRecord = user => ({ ...user, profile: publicProfile(user), avatarUrl: imageUrl(user.imagePath) })

export async function getPeople() {
  return (await rows('users', `role=neq.super_admin&select=${USER_FIELDS}&order=sortOrder.asc,createdAt.asc`)).map(publicProfile)
}

export async function getPerson(id) {
  return publicProfile((await rows('users', `profileId=eq.${encodeURIComponent(id)}&role=neq.super_admin&select=${USER_FIELDS}&limit=1`))[0])
}
