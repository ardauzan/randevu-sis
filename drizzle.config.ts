import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: 'src/veritabanı/şema.ts',
  out: 'src/veritabanı/migrasyonlar',
  dialect: 'postgresql'
})
