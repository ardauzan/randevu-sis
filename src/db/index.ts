import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from '@/db/schema'

const pool = new Pool()
const db = drizzle(pool, {
  schema
})

export default db
