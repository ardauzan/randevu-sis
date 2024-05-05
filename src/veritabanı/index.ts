//info Bu dosya, drizzle-orm'un kullanımı için gerekli olan veritabanı bağlantısını sağlar.
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as şema from '@/veritabanı/şema'

//info Veritabanı bağlantısı oluşturulur ve drizzle-orm kullanılarak şema ile birlikte bağlantı sağlanır.
const havuz = new Pool()
const veritabanı = drizzle(havuz, {
  schema: şema
})

//info veritabanı değişkeni export edilir.
export default veritabanı
