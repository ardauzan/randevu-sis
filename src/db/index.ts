//info Bu dosya, drizzle-orm'un kullanımı için gerekli olan veritabanı bağlantısını sağlar.
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from '@/db/schema'

//info Veritabanı bağlantısı oluşturulur ve drizzle-orm kullanılarak şema ile birlikte bağlantı sağlanır.
const pool = new Pool()
const db = drizzle(pool, {
  schema
})
console.info('Veritabanı bağlantısı sağlandı.')

//info db değişkeni export edilir.
export default db
