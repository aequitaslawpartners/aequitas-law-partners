import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import { rows, insertRow } from '../src/lib/supabase.mjs'

dotenv.config({ path: '.env', quiet: true })
const { ADMIN_EMAIL: email, ADMIN_PASSWORD: password } = process.env
if (!email || !password || password.length < 8) throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD (at least 8 characters)')
if (email.toLowerCase() !== 'admin@alplaw.in') throw new Error('The super admin email must be admin@alplaw.in')
if ((await rows('users', 'select=_id&limit=1')).length) {
  console.log('An administrator already exists; use the admin screen to add users.')
} else {
  await insertRow('users', { name: 'ALP Admin', email: email.toLowerCase(), password: await bcrypt.hash(password, 12), role: 'super_admin' })
  console.log('Administrator created.')
}
