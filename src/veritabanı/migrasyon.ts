import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

const havuz = new Pool()
const veritabanı = drizzle(havuz)

const main = async () => {
  try {
    console.info('Migrasyonlar uygulanıyor.')
    await migrate(veritabanı, {
      migrationsFolder: 'src/veritabanı/migrasyonlar'
    })
    console.info('Migrasyonlar başarılı birşekilde uygulandı.')
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

main()
