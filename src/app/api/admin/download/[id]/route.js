import { authenticatedStaff } from '@/lib/admin.mjs'
import { readResume } from '@/lib/resume.mjs'

export async function GET(request, { params }) {
  if (!(await authenticatedStaff(request))) return Response.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  try {
    const { id } = await params
    const result = await readResume(id)
    if (!result) return Response.json({ success: false, message: 'Resume not found' }, { status: 404 })
    return new Response(new Uint8Array(result.buffer), { headers: {
      'Content-Type': 'application/pdf', 'Content-Disposition': `attachment; filename="${result.fileName}"`,
      'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff',
    } })
  } catch { return Response.json({ success: false, message: 'Failed to download resume' }, { status: 500 }) }
}
