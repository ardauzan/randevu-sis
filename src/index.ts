//info Bu dosya, projemizin giriş noktasıdır. Bu dosyayı çalıştırdığımızda projemiz çalışmaya başlar.
import sunucuyuOluştur from '@/server'

//info Önce tailwindcss in çalışması için gerekli olan css dosyasını oluşturuyoruz.
Bun.spawnSync([
  'bunx',
  'tailwindcss',
  '-i',
  'src/styles.css',
  '-o',
  'public/styles.css'
])

//info Sonra da react arayüzlerimizin client bundle larını oluşturuyoruz.
const anasayfa = await Bun.build({
  entrypoints: ['src/client/anasayfa/index.tsx'],
  outdir: 'public',
  minify: true,
  naming: '[dir]/anasayfa.[ext]'
})
console.info('Anasayfa:', anasayfa)
const yönet = await Bun.build({
  entrypoints: ['src/client/yönet/index.tsx'],
  outdir: 'public',
  minify: true,
  naming: '[dir]/yönet.[ext]'
})
console.info('Yönetici sayfası:', yönet)
const bulunamadı = await Bun.build({
  entrypoints: ['src/client/404/index.tsx'],
  outdir: 'public',
  minify: true,
  naming: '[dir]/404.[ext]'
})
console.info('Bulunamadı sayfası:', bulunamadı)
const randevularım = await Bun.build({
  entrypoints: ['src/client/randevularım/index.tsx'],
  outdir: 'public',
  minify: true,
  naming: '[dir]/randevularım.[ext]'
})
console.info('Randevularım sayfası:', randevularım)
const giriş = await Bun.build({
  entrypoints: ['src/client/giriş/index.tsx'],
  outdir: 'public',
  minify: true,
  naming: '[dir]/giriş.[ext]'
})
console.info('Giriş sayfası:', giriş)

//info Son olarak da sunucumuzu oluşturuyoruz.
sunucuyuOluştur()
