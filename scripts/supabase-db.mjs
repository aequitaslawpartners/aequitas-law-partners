import { Client } from 'pg'
import { readFileSync } from 'node:fs'
import dotenv from 'dotenv'

dotenv.config({ path: ['.env.maintenance.local', '.env'], quiet: true })

export function databaseClient() {
  const host = new URL(process.env.SUPABASE_URL).hostname.replace('.supabase.co', '')
  return new Client({
    host: `db.${host}.supabase.co`, port: 5432, database: 'postgres', user: 'postgres',
    password: process.env.SUPABASE_DB_PASSWORD,
    ssl: { ca: readFileSync(new URL('../supabase/prod-ca-2021.crt', import.meta.url), 'utf8'), rejectUnauthorized: true },
    connectionTimeoutMillis: 8000,
  })
}
