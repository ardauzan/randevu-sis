import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

const pool = new Pool()
const db = drizzle(pool)

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: 'src/db/migrations'
    })
    console.log('Migration successful')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

main()
