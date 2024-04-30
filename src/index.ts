//info Bu dosya, projemizin giriş noktasıdır. Bu dosyayı çalıştırdığımızda projemiz çalışmaya başlar.
import { Pool } from 'pg'
import sunucuyuOluştur from '@/server'

//info Önce tailwindcss in çalışması için gerekli olan css dosyasını oluşturuyoruz.

Bun.spawnSync([
  'bunx',
  'tailwindcss',
  '-i',
  './src/styles.css',
  '-o',
  './public/styles.css'
])

//info Sonra da react arayüzlerimizin client bundle larını oluşturuyoruz.

/*
const anasayfa = await Bun.build({
  entrypoints: ['./src/client/anasayfa/index.tsx'],
  outdir: './public',
  minify: true,
  naming: '[dir]/anasayfa.[ext]'
})

console.info(anasayfa)

const admin = await Bun.build({
  entrypoints: ['./src/client/admin/index.tsx'],
  outdir: './public',
  minify: true,
  naming: '[dir]/admin.[ext]'
})

console.info(admin)
*/
const pool = new Pool()

sunucuyuOluştur(pool)
