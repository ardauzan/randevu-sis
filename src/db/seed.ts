//info Bu dosya, veritabanına örnek veri eklemek için kullanılır.
import * as schema from '@/db/schema'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

//info Veritabanı bağlantısı oluşturulur ve drizzle-orm kullanılarak şema ile birlikte bağlantı sağlanır.
const pool = new Pool()
const db = drizzle(pool, {
  schema
})

//info Schema'dan tablolar destrüktüre edilir.
const {
  kişiler,
  projeler,
  kişilerProjeler,
  gereçler,
  sarflar,
  randevular,
  tatiller,
  ziyaretler
} = schema

//info Bu fonksiyon, tabloları sıfırlar ve örnek veri ekler.
const main = async () => {
  try {
    console.info('Veritabanı sıfırlanıyor ve örnek veri ekleniyor.')
    await db.delete(kişiler)
    await db.delete(projeler)
    await db.delete(kişilerProjeler)
    await db.delete(gereçler)
    await db.delete(sarflar)
    await db.delete(randevular)
    await db.delete(tatiller)
    await db.delete(ziyaretler)
    await db.insert(kişiler).values([
      {
        id: 1,
        öğrenciNo: 2311310817,
        ad: 'Ali Arda',
        soyAd: 'Uzan',
        email: 'arda.uzan@protonmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$FqEit14mHfP9mRIeM/xR5OmkOtCpKUpoF3bkcPwtR5E$2T+QDIA57p6WyB6X/aT2pjOgEmlF+B6DRGipTJYtYGU'
      }
    ])
    console.info('Veritabanı sıfırlandı ve örnek veri eklendi.')
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

//info Tablolar sıfırlanır ve örnek veri eklenir.
main()
