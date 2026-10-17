import { readFile } from 'node:fs/promises'
import { MAX_FILE_BYTES } from '../src/lib/uploadLimits.mjs'
import { databaseClient } from './supabase-db.mjs'
import { supabaseRequest, RESUME_BUCKET } from '../src/lib/supabase.mjs'

const client = databaseClient()
try {
  await client.connect()
  await client.query(await readFile(new URL('../supabase/schema.sql', import.meta.url), 'utf8'))
  const buckets = await supabaseRequest('/storage/v1/bucket')
  for (const bucket of [
    { id: RESUME_BUCKET, public: false, types: ['application/pdf'] },
    { id: 'people', public: true, types: ['image/jpeg', 'image/png', 'image/webp'] },
  ]) {
    const existing = buckets.find(item => item.id === bucket.id)
    await supabaseRequest(`/storage/v1/bucket${existing ? `/${bucket.id}` : ''}`, {
      method: existing ? 'PUT' : 'POST',
      body: { ...(existing ? {} : { id: bucket.id, name: bucket.id }), public: bucket.public, file_size_limit: MAX_FILE_BYTES, allowed_mime_types: bucket.types },
    })
  }
  console.log('Supabase tables, private resumes and public people buckets configured (500 KB maximum).')
} finally {
  await client.end()
}
