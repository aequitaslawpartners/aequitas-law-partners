import { rows, supabaseRequest, resumePath } from './supabase.mjs'

export async function readResume(id) {
  const [application] = await rows('recruitment', `_id=eq.${encodeURIComponent(id)}&limit=1`)
  if (!application?.resumePath) return null
  const buffer = await supabaseRequest(resumePath(application.resumePath), { binary: true })
  const fileName = `${application.firstName}_${application.lastName}_resume.pdf`.replace(/[^a-zA-Z0-9_.-]/g, '_')
  return { application, buffer, fileName }
}
