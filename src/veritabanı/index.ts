import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as şema from '@/veritabanı/şema'
import { type Pool } from 'pg'

export default function veritabanınaBağlan(
  havuz: Pool
): NodePgDatabase<typeof şema> {
  const veritabanı = drizzle(havuz, {
    schema: şema
  })
  return veritabanı
}
