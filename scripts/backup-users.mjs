import dotenv from 'dotenv'
import { mkdir, writeFile, rename } from 'node:fs/promises'
import { dirname, resolve, sep } from 'node:path'
import { rows } from '../src/lib/supabase.mjs'

dotenv.config({ path: '.env', quiet: true })
const users = []
for (let offset = 0; ; offset += 1000) {
  const page = await rows('users', `order=_id.asc&limit=1000&offset=${offset}`)
  users.push(...page)
  if (page.length < 1000) break
}
const root = resolve('backups')
await mkdir(root, { recursive: true })
for (const user of users) {
  if (!user.imagePath) continue
  const target = resolve(root, 'people', user.imagePath)
  if (!target.startsWith(resolve(root, 'people') + sep)) throw new Error('Invalid photo backup path')
  let bytes
  for (let attempt = 0; ; attempt++) {
    try {
      const response = await fetch(`${process.env.SUPABASE_URL}/storage/v1/object/public/people/${user.imagePath}`, { cache: 'no-store', signal: AbortSignal.timeout(30000) })
      if (!response.ok) throw Object.assign(new Error(`Could not back up photo for ${user._id}`), { status: response.status })
      bytes = Buffer.from(await response.arrayBuffer())
      break
    } catch (error) {
      if (attempt >= 2 || (error.status && error.status !== 429 && error.status < 500)) throw error
    }
  }
  if (!bytes.length || bytes.length > 204800) throw new Error('Photo backup exceeds the upload limit')
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, bytes)
}
await writeFile(resolve(root, 'users.json.tmp'), JSON.stringify({ exportedAt: new Date().toISOString(), users }, null, 2))
await rename(resolve(root, 'users.json.tmp'), resolve(root, 'users.json'))
console.log(`Backed up ${users.length} unified users and their Storage photos to ignored backups/.`)
