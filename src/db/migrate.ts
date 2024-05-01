//info Bu dosya oluşturulan veritabanı şemasını veritabanına uygular.
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

//info Veritabanı bağlantısı oluşturulur ve drizzle-orm kullanılarak bağlantı sağlanır.
const pool = new Pool()
const db = drizzle(pool)

//info Migrasyonu yapıcak olan fonksiyon tanımlanır.
const main = async () => {
  try {
    console.info('Migrasyon yapılıyor.')
    await migrate(db, {
      migrationsFolder: 'src/db/migrations'
    })
    console.info('Migrasyon başarılı.')
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

//info Migrasyon veritabanına uygulanır.
main()
