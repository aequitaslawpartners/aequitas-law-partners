import { rows, changeRow } from '@/lib/supabase.mjs'
import { authenticatedStaff } from '@/lib/admin.mjs'
import { deletionIds, deleteRecords } from '@/lib/delete-records.mjs'

const authenticated = authenticatedStaff
const unauthorized = () => Response.json({ success: false, message: 'Unauthorized' }, { status: 401 })
const tableFor = type => type === 'contact' ? 'contacts' : type === 'recruitment' ? 'recruitment' : null

export async function GET(request) {
  if (!await authenticated(request)) return unauthorized()
  try {
    const all = async table => {
      const result = []
      for (let offset = 0; ; offset += 1000) {
        const page = await rows(table, `order=createdAt.desc&limit=1000&offset=${offset}`)
        result.push(...page)
        if (page.length < 1000) return result
      }
    }
    const [contacts, applications] = await Promise.all([all('contacts'), all('recruitment')])
    return Response.json({ success: true, data: { contacts, applications } })
  } catch { return Response.json({ success: false, message: 'Failed to fetch submissions' }, { status: 500 }) }
}

export async function DELETE(request) {
  try {
    const user = await authenticated(request)
    if (!user) return unauthorized()
    const search = new URL(request.url).searchParams
    let body
    try {
      body = search.has('id') ? { ids: [search.get('id')], type: search.get('type') } : await request.json()
      body.ids = deletionIds(body.ids)
      if (!tableFor(body.type)) throw new Error('Choose a valid record type')
    } catch (error) { return Response.json({ success: false, message: error.message }, { status: 400 }) }
    const result = await deleteRecords(tableFor(body.type), body.ids, user._id)
    return Response.json(result, { status: result.success ? 200 : 207 })
  } catch { return Response.json({ success: false, message: 'Failed to delete submissions' }, { status: 500 }) }
}

export async function PUT(request) {
  const user = await authenticated(request)
  if (!user) return unauthorized()
  try {
    const { id, type, status } = await request.json()
    const table = tableFor(type)
    if (!id || !table || !['pending', 'reviewed', 'contacted', 'rejected'].includes(status)) return Response.json({ success: false, message: 'Valid ID, type and status are required' }, { status: 400 })
    const result = await changeRow(table, id, 'PATCH', { status, updatedAt: new Date().toISOString(), updatedBy: user.email })
    if (!result.length) return Response.json({ success: false, message: 'Record not found' }, { status: 404 })
    return Response.json({ success: true, message: 'Status updated successfully' })
  } catch { return Response.json({ success: false, message: 'Failed to update submission' }, { status: 500 }) }
}
