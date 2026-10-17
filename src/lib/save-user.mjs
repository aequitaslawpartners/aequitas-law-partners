import { randomUUID } from 'node:crypto'
import { supabaseRequest, removeFiles, insertRow, changeRow } from './supabase.mjs'
import { hashPassword } from './auth.js'

export async function saveUser({ profile, password, image, existing, role }) {
  const id = existing?._id || randomUUID()
  const profileId = existing?.profileId || `${profile.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40)}-${randomUUID().slice(0, 8)}`
  let uploadedPath, committed = false
  try {
    if (image) {
      uploadedPath = `profiles/${profileId}/${randomUUID()}.${image.extension}`
      await supabaseRequest(`/storage/v1/object/people/${uploadedPath}`, { method: 'POST', body: image.buffer, headers: { 'Content-Type': image.type } })
    }
    const { name, email, ...professional } = profile
    const data = { name, email, role, profileId,
      profile: { ...(existing?.profile || {}), ...professional }, imagePath: uploadedPath || existing?.imagePath,
      updatedAt: new Date().toISOString() }
    if (password !== undefined) data.password = await hashPassword(password)
    if (existing) {
      const changed = await changeRow('users', id, 'PATCH', data)
      if (!changed.length) throw new Error('User no longer exists')
    } else await insertRow('users', { _id: id, ...data })
    committed = true
    let message = 'Profile saved successfully.'
    if (uploadedPath && existing?.imagePath && uploadedPath !== existing.imagePath) {
      try { await removeFiles('people', [existing.imagePath]) }
      catch { message = 'Profile saved. Previous photo cleanup could not finish; it will be included when this user is deleted.' }
    }
    return { id, profileId, message }
  } catch (error) {
    if (uploadedPath && !committed) await removeFiles('people', [uploadedPath]).catch(() => {})
    throw error
  }
}
