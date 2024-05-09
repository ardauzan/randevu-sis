import { drizzle } from 'drizzle-orm/node-postgres'
import * as şema from '@/veritabanı/şema'
import type { Pool } from 'pg'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'

export default function veritabanınıOluştur(
  havuz: Pool
): NodePgDatabase<typeof şema> {
  const veritabanı = drizzle(havuz, {
    schema: şema
  })
  return veritabanı
}
