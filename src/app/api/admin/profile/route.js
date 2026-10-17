import { randomUUID } from 'node:crypto'
import { authenticatedStaff } from '@/lib/admin.mjs'
import { rows, changeRow, supabaseRequest, removeFiles } from '@/lib/supabase.mjs'
import { USER_FIELDS, userRecord, imageUrl } from '@/lib/people.mjs'
import { saveUser } from '@/lib/save-user.mjs'
import { validatePerson, validatePassword } from '@/lib/people-validation.mjs'
import { readProfileImage } from '@/lib/profile-image.mjs'

export async function GET(request) {
  try {
    const user = await authenticatedStaff(request)
    if (!user) return Response.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    const [record] = await rows('users', `_id=eq.${encodeURIComponent(user._id)}&select=${USER_FIELDS}&limit=1`)
    const safe = userRecord(record)
    return Response.json({ success: true, person: safe.role === 'super_admin' ? null : safe, user: safe })
  } catch { return Response.json({ success: false, message: 'Failed to load profile' }, { status: 500 }) }
}

export async function PUT(request) {
  try {
    const user = await authenticatedStaff(request)
    if (!user) return Response.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    if (user.role === 'super_admin') return Response.json({ success: false, message: 'Edit your super admin account in account settings' }, { status: 400 })
    const [existing] = await rows('users', `_id=eq.${encodeURIComponent(user._id)}&select=${USER_FIELDS}&limit=1`)
    let profile, password, image
    try {
      const form = await request.formData()
      if (form.has('id') && form.get('id') !== user._id) return Response.json({ success: false, message: 'You can only edit your own profile' }, { status: 403 })
      profile = validatePerson(JSON.parse(form.get('profile')))
      if (profile.email === 'admin@alplaw.in') throw new Error('This email is reserved for the super admin')
      password = validatePassword(form.get('password'), { required: user.role === 'alp' })
      const file = form.get('image')
      if (file?.size) image = await readProfileImage(file)
      else if (!existing?.imagePath) throw new Error('A profile photo is required')
    } catch (error) { return Response.json({ success: false, message: error.message }, { status: 400 }) }
    const result = await saveUser({ profile, password, image, existing, role: existing.role })
    return Response.json({ success: true, ...result })
  } catch (error) {
    return Response.json({ success: false, message: error.status === 409 ? 'That email is already used by another account' : 'Could not save your profile. Please retry.' }, { status: error.status === 409 ? 409 : 500 })
  }
}

export async function POST(request) {
  try {
    const user = await authenticatedStaff(request)
    if (!user) return Response.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    let image
    try { image = await readProfileImage((await request.formData()).get('image')) }
    catch (error) { return Response.json({ success: false, message: error.message }, { status: 400 }) }
    const path = `${user.profileId ? `profiles/${user.profileId}` : user._id}/${randomUUID()}.${image.extension}`
    await supabaseRequest(`/storage/v1/object/people/${path}`, { method: 'POST', body: image.buffer, headers: { 'Content-Type': image.type } })
    try {
      const changed = await changeRow('users', user._id, 'PATCH', { imagePath: path, updatedAt: new Date().toISOString() })
      if (!changed.length) throw new Error('User no longer exists')
    } catch (error) {
      await removeFiles('people', [path]).catch(() => {})
      throw error
    }
    let message = 'Profile photo updated successfully.'
    try { if (user.imagePath) await removeFiles('people', [user.imagePath]) }
    catch { message = 'Photo saved. Previous photo cleanup could not finish; it will be included when this user is deleted.' }
    return Response.json({ success: true, avatarUrl: imageUrl(path), message })
  } catch { return Response.json({ success: false, message: 'Failed to save profile image; please retry' }, { status: 500 }) }
}
