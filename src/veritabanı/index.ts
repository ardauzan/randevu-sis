import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as şema from '@/veritabanı/şema'

const havuz = new Pool()
const veritabanı = drizzle(havuz, {
  schema: şema
})

export default veritabanı
