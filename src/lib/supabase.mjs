import { Buffer } from 'node:buffer'

// This module is for server routes and maintenance scripts only.
export async function supabaseRequest(path, { method = 'GET', body, headers = {}, binary = false } = {}) {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SECRET_KEY
  if (!url || !key) throw new Error('Supabase server configuration is missing')
  const response = await fetch(`${url}${path}`, {
    method, cache: 'no-store',
    headers: { apikey: key, ...(body && !Buffer.isBuffer(body) ? { 'Content-Type': 'application/json' } : {}), ...headers },
    body: body === undefined ? undefined : Buffer.isBuffer(body) ? body : JSON.stringify(body),
    signal: AbortSignal.timeout(15000),
  })
  if (!response.ok) throw Object.assign(new Error(`Supabase request failed (${response.status})`), { status: response.status })
  if (binary) return Buffer.from(await response.arrayBuffer())
  const text = await response.text()
  return text ? JSON.parse(text) : null
}

export const RESUME_BUCKET = 'resumes'
export const resumePath = path => `/storage/v1/object/${RESUME_BUCKET}/${path.split('/').map(encodeURIComponent).join('/')}`

export async function rows(table, query = '') {
  return supabaseRequest(`/rest/v1/${table}?${query}`)
}

export async function insertRow(table, data) {
  const [row] = await supabaseRequest(`/rest/v1/${table}`, {
    method: 'POST', body: data, headers: { Prefer: 'return=representation' },
  })
  return row
}

export async function changeRow(table, id, method, body) {
  return supabaseRequest(`/rest/v1/${table}?_id=eq.${encodeURIComponent(id)}`, {
    method, body, headers: { Prefer: 'return=representation' },
  })
}

export async function removeResume(path) {
  await removeFiles(RESUME_BUCKET, [path])
}

export async function removeFiles(bucket, paths) {
  if (paths.length) await supabaseRequest(`/storage/v1/object/${bucket}`, { method: 'DELETE', body: { prefixes: paths } })
}

export async function removeUserImages(id) {
  return removeImageFolder(id)
}

export async function removeImageFolder(folder) {
  // Images use an account-specific folder, including any earlier interrupted uploads.
  while (true) {
    const files = await supabaseRequest('/storage/v1/object/list/people', { method: 'POST', body: { prefix: `${folder}/`, limit: 100, offset: 0 } })
    const paths = files.filter(file => file.id).map(file => `${folder}/${file.name}`)
    if (!paths.length) return
    await removeFiles('people', paths)
    if (files.length < 100) return
  }
}
