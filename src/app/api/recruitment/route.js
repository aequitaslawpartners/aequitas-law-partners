import { authenticatedStaff } from '@/lib/admin.mjs'
import { randomUUID } from 'node:crypto'
import { rows, insertRow, supabaseRequest, resumePath, removeResume } from '@/lib/supabase.mjs'
import { decodeResume } from '@/lib/uploads.mjs'

export async function POST(request) {
  try {
    const body = await request.json()
    const required = ['firstName', 'lastName', 'email', 'phone', 'experience', 'position']
    if (required.some(key => typeof body[key] !== 'string' || !body[key].trim())) return Response.json({ error: 'All required fields must be provided' }, { status: 400 })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return Response.json({ error: 'Invalid email format' }, { status: 400 })
    if (!Array.isArray(body.specializations) || !body.specializations.length || body.specializations.some(item => typeof item !== 'string')) return Response.json({ error: 'At least one specialization must be selected' }, { status: 400 })
    if (body.coverLetter !== undefined && typeof body.coverLetter !== 'string') return Response.json({ error: 'Invalid cover letter' }, { status: 400 })
    let buffer
    try { buffer = decodeResume(body.resume) } catch (error) { return Response.json({ error: error.message }, { status: 400 }) }
    const path = `${randomUUID()}.pdf`
    await supabaseRequest(resumePath(path), { method: 'POST', body: buffer, headers: { 'Content-Type': 'application/pdf' } })
    let application
    try {
      application = await insertRow('recruitment', {
        ...Object.fromEntries(required.map(key => [key, body[key]])), specializations: body.specializations,
        coverLetter: body.coverLetter || '', resumePath: path, originalSize: buffer.length,
      })
    } catch (error) {
      await removeResume(path).catch(cleanupError => console.error('Resume cleanup failed:', cleanupError.message))
      throw error
    }
    return Response.json({ success: true, message: 'Application submitted successfully', id: application._id }, { status: 201 })
  } catch (error) {
    console.error('Recruitment submission failed:', error.message)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request) {
  if (!(await authenticatedStaff(request))) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  try { return Response.json({ applications: await rows('recruitment', 'order=createdAt.desc&limit=1000') }) }
  catch { return Response.json({ error: 'Internal server error' }, { status: 500 }) }
}
