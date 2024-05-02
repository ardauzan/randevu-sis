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
  araçlar,
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
    await db.delete(araçlar)
    await db.delete(randevular)
    await db.delete(tatiller)
    await db.delete(ziyaretler)
    await db.insert(kişiler).values([
      {
        id: 1,
        yönetici: true,
        öğrenciNo: 2311310817,
        ad: 'Ali Arda',
        soyAd: 'Uzan',
        email: 'arda.uzan@protonmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$VCLAJ0wncHSr/fPp/9IdO7yafqlQmIH17nn+h8yHvFM$61paoxFJfO64EQqL9N0VbdaIhuX6Y3iNLJVfJN36TcM' //# Şifre: tets1234
      }
    ])
    console.info('Veritabanı sıfırlandı ve örnek veriler eklendi.')
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

//info Tablolar sıfırlanır ve örnek veri eklenir.
main()
