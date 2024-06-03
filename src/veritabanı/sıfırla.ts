import { sql } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as şema from '@/veritabanı/şema'

const havuz = new Pool()
const veritabanı = drizzle(havuz, {
  schema: şema
})

const {
  kişiler,
  projeler,
  kişilerProjeler,
  gereçler,
  araçlar,
  randevular,
  gereçlerRandevular,
  araçlarRandevular,
  tatiller,
  ziyaretler
} = şema

const main = async () => {
  try {
    console.info('Veritabanı sıfırlanıyor ve örnek veri ekleniyor.')

    await veritabanı.delete(kişilerProjeler)
    await veritabanı.delete(kişiler)
    await veritabanı.delete(gereçlerRandevular)
    await veritabanı.delete(araçlarRandevular)
    await veritabanı.delete(gereçler)
    await veritabanı.delete(araçlar)
    await veritabanı.delete(randevular)
    await veritabanı.delete(projeler)
    await veritabanı.delete(tatiller)
    await veritabanı.delete(ziyaretler)

    await veritabanı.insert(kişiler).values([
      {
        id: 1,
        yönetici: true,
        öğrenciNo: 2311310817,
        ad: 'Ali Arda',
        soyAd: 'Uzan',
        email: 'arda.uzan@protonmail.com',
        şifreHash:
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU'
      }
    ])
    await veritabanı.execute(
      sql.raw(
        `SELECT setval('kişiler_id_seq', COALESCE((SELECT MAX(id) FROM kişiler) + 1, 1), false)`
      )
    )
    await veritabanı.execute(
      sql.raw(
        `SELECT setval('projeler_id_seq', COALESCE((SELECT MAX(id) FROM projeler) + 1, 1), false)`
      )
    )
    await veritabanı.execute(
      sql.raw(
        `SELECT setval('gereçler_id_seq', COALESCE((SELECT MAX(id) FROM gereçler) + 1, 1), false)`
      )
    )
    await veritabanı.execute(
      sql.raw(
        `SELECT setval('araçlar_id_seq', COALESCE((SELECT MAX(id) FROM araçlar) + 1, 1), false)`
      )
    )
    await veritabanı.execute(
      sql.raw(
        `SELECT setval('randevular_id_seq', COALESCE((SELECT MAX(id) FROM randevular) + 1, 1), false)`
      )
    )
    await veritabanı.execute(
      sql.raw(
        `SELECT setval('tatiller_id_seq', COALESCE((SELECT MAX(id) FROM tatiller) + 1, 1), false)`
      )
    )
    await veritabanı.execute(
      sql.raw(
        `SELECT setval('ziyaretler_id_seq', COALESCE((SELECT MAX(id) FROM ziyaretler) + 1, 1), false)`
      )
    )
    console.info('Veritabanı sıfırlandı ve örnek veriler eklendi.')
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

main()
