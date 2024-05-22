import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: 'src/veritabanı/şema.ts',
  out: 'src/veritabanı/migrasyonlar',
  dialect: 'postgresql',
  dbCredentials: {
    user: process.env['PGUSER']!,
    password: process.env['PGPASSWORD']!,
    host: process.env['PGHOST']!,
    database: process.env['PGDATABASE']!,
    port: parseInt(process.env['PGPORT']!)
  },
  verbose: true,
  strict: true
})
