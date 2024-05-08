import * as şema from '@/veritabanı/şema'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

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
  tatiller,
  ziyaretler
} = şema

const main = async () => {
  try {
    console.info('Veritabanı sıfırlanıyor ve örnek veri ekleniyor.')
    await veritabanı.delete(kişiler)
    await veritabanı.delete(projeler)
    await veritabanı.delete(kişilerProjeler)
    await veritabanı.delete(gereçler)
    await veritabanı.delete(araçlar)
    await veritabanı.delete(randevular)
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
          '$argon2id$v=19$m=65536,t=2,p=1$V8GZjeEzEVK5GXwdKif5adspNmSjxPdqzGxg8GG6D7Q$MfhKjRc0iP+E7K02fWAdhE+Yf2Izx5rEf8/ICBpSNtU' //# Şifre: test1234
      }
    ])
    await veritabanı.insert(projeler).values([
      {
        id: 1,
        ad: 'Proje 1',
        başlangıçTarihi: '2021-01-01',
        bitişTarihi: '2021-12-31',
        açıklama: 'Proje 1 açıklama'
      }
    ])
    await veritabanı.insert(kişilerProjeler).values([
      {
        üye: 1,
        proje: 1
      }
    ])
    console.info('Veritabanı sıfırlandı ve örnek veriler eklendi.')
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

main()
