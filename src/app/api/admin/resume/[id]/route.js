import { authenticatedStaff } from '@/lib/admin.mjs'
import { readResume } from '@/lib/resume.mjs'

export async function GET(request, { params }) {
  if (!(await authenticatedStaff(request))) return Response.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  try {
    const { id } = await params
    const result = await readResume(id)
    if (!result) return Response.json({ success: false, message: 'Resume not found' }, { status: 404 })
    const { application, buffer, fileName } = result
    return Response.json({ success: true, data: {
      type: 'pdf', resume: buffer.toString('base64'), fileName, contentType: 'application/pdf',
      size: buffer.length, name: `${application.firstName} ${application.lastName}`, email: application.email,
    } }, { headers: { 'Cache-Control': 'private, no-store' } })
  } catch { return Response.json({ success: false, message: 'Failed to fetch resume' }, { status: 500 }) }
}
