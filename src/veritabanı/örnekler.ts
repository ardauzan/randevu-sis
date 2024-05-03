//info Bu dosya, veritabanına örnek veri eklemek için kullanılır.
import * as şema from '@/veritabanı/şema'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

//info Veritabanı bağlantısı oluşturulur ve drizzle-orm kullanılarak şema ile birlikte bağlantı sağlanır.
const havuz = new Pool()
const veritabanı = drizzle(havuz, {
  schema: şema
})

//info Şemadan tablolar destrüktüre edilir.
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

//info Bu fonksiyon, tabloları sıfırlar ve örnek veri ekler.
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
    console.info('Veritabanı sıfırlandı ve örnek veriler eklendi.')
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

//info Tablolar sıfırlanır ve örnek veri eklenir.
main()
