import { authenticatedAdmin } from '@/lib/admin.mjs'
import { rows, changeRow } from '@/lib/supabase.mjs'
import { USER_FIELDS, userRecord } from '@/lib/people.mjs'
import { validatePerson, validatePassword } from '@/lib/people-validation.mjs'
import { readProfileImage } from '@/lib/profile-image.mjs'
import { saveUser } from '@/lib/save-user.mjs'
import { hashPassword } from '@/lib/auth'
import { deletionIds, deleteRecords } from '@/lib/delete-records.mjs'

const denied = () => Response.json({ success: false, message: 'Administrator access required' }, { status: 403 })

export async function GET(request) {
  try {
    if (!await authenticatedAdmin(request)) return denied()
    const users = await rows('users', `select=${USER_FIELDS}&order=createdAt.desc`)
    return Response.json({ success: true, users: users.map(userRecord) })
  } catch { return Response.json({ success: false, message: 'Could not load users' }, { status: 500 }) }
}

async function save(request, create) {
  try {
    const actor = await authenticatedAdmin(request)
    if (!actor) return denied()
    let existing, profile, password, image, role
    try {
      const multipart = request.headers.get('content-type')?.includes('multipart/form-data')
      const form = multipart ? await request.formData() : null
      const body = multipart ? JSON.parse(form.get('profile')) : await request.json()
      const id = multipart ? form.get('id') : body.id
      if (!create) {
        if (typeof id !== 'string' || !/^[a-zA-Z0-9-]{1,64}$/.test(id)) throw new Error('Invalid user ID')
        existing = (await rows('users', `_id=eq.${id}&select=${USER_FIELDS}&limit=1`))[0]
        if (!existing) return Response.json({ success: false, message: 'User not found' }, { status: 404 })
      }
      if (existing?.role === 'super_admin') {
        if (actor._id !== existing._id) return Response.json({ success: false, message: 'Only the super admin can edit this account' }, { status: 403 })
        if (body.email !== existing.email || body.role !== 'super_admin') throw new Error('The super admin email and role cannot be changed')
        if (typeof body.name !== 'string' || !body.name.trim() || body.name.length > 200) throw new Error('Full name is required')
        password = validatePassword(body.password, { required: false })
        await changeRow('users', existing._id, 'PATCH', { name: body.name.trim(), ...(password === undefined ? {} : { password: await hashPassword(password) }), updatedAt: new Date().toISOString() })
        return Response.json({ success: true, id: existing._id, message: 'Account saved successfully.' })
      }
      if (!multipart) throw new Error('Complete professional details and a photograph are required')
      profile = validatePerson(body)
      password = validatePassword(form.get('password'), { required: create })
      role = body.role
      if (!['admin', 'alp'].includes(role)) throw new Error('Choose a valid role')
      if (profile.email === 'admin@alplaw.in') throw new Error('This email is reserved for the super admin')
      if (existing?._id === actor._id && role !== existing.role) throw new Error('You cannot change your own administrator role')
      const file = form.get('image')
      if (file?.size) image = await readProfileImage(file)
      else if (!existing?.imagePath) throw new Error('A profile photo is required')
    } catch (error) { return Response.json({ success: false, message: error.message }, { status: 400 }) }
    const result = await saveUser({ profile, password, image, existing, role })
    return Response.json({ success: true, ...result }, { status: create ? 201 : 200 })
  } catch (error) {
    return Response.json({ success: false, message: error.status === 409 ? 'That email or profile URL is already used' : 'Could not save user. Please retry.' }, { status: error.status === 409 ? 409 : 500 })
  }
}

export const POST = request => save(request, true)
export const PUT = request => save(request, false)

export async function DELETE(request) {
  try {
    const actor = await authenticatedAdmin(request)
    if (!actor) return denied()
    let ids
    try { ids = deletionIds((await request.json()).ids) }
    catch (error) { return Response.json({ success: false, message: error.message }, { status: 400 }) }
    const result = await deleteRecords('users', ids, actor._id)
    return Response.json(result, { status: result.success ? 200 : 207 })
  } catch { return Response.json({ success: false, message: 'Could not delete users' }, { status: 500 }) }
}
