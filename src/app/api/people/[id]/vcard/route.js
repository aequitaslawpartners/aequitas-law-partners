import { getPerson } from '@/lib/people.mjs'

export async function GET(request, { params }) {
  const { id } = await params
  const person = await getPerson(id)
  if (!person) return new Response('Not found', { status: 404 })
  const safe = value => String(value).replace(/[\r\n]/g, ' ').replace(/\\/g, '\\\\').replace(/[,;]/g, value => `\\${value}`)
  return new Response(['BEGIN:VCARD', 'VERSION:3.0', `FN:${safe(person.name)}`, 'ORG:Aequitas Law Partners', `TITLE:${safe(person.designation)}`, `EMAIL:${safe(person.email)}`, 'END:VCARD', ''].join('\r\n'), {
    headers: { 'Content-Type': 'text/vcard; charset=utf-8', 'Content-Disposition': `attachment; filename="${id.replace(/[^a-z0-9-]/g, '')}.vcf"` },
  })
}
