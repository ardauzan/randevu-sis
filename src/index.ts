//info Bu dosya, projemizin giriş noktasıdır. Bu dosyayı çalıştırdığımızda projemiz çalışmaya başlar.
import sunucuyuOluştur from '@/server'

//info Önce tailwindcss in çalışması için gerekli olan css dosyasını oluşturuyoruz.
const tailwindcss = Bun.spawnSync([
  'bunx',
  'tailwindcss',
  '-i',
  'src/styles.css',
  '-o',
  'public/styles.css'
])
console.info('Tailwindcss dosyası oluşturuldu:', tailwindcss.success)

//info Sonra da react arayüzlerimizin client bundle larını oluşturuyoruz.
const anasayfa = await Bun.build({
  entrypoints: ['src/client/anasayfa/index.tsx'],
  outdir: 'public',
  minify: true,
  naming: '[dir]/anasayfa.[ext]'
})
console.info('Anasayfa derlendi:', anasayfa.success)
const yönet = await Bun.build({
  entrypoints: ['src/client/yönet/index.tsx'],
  outdir: 'public',
  minify: true,
  naming: '[dir]/yonet.[ext]'
})
console.info('Yönetici sayfası derlendi:', yönet.success)
const randevularım = await Bun.build({
  entrypoints: ['src/client/randevularım/index.tsx'],
  outdir: 'public',
  minify: false,
  naming: '[dir]/randevularim.[ext]'
})
console.info('Randevularım sayfası derlendi:', randevularım.success)
const giriş = await Bun.build({
  entrypoints: ['src/client/giriş/index.tsx'],
  outdir: 'public',
  minify: true,
  naming: '[dir]/giris.[ext]'
})
console.info('Giriş sayfası derlendi:', giriş.success)
const bulunamadı = await Bun.build({
  entrypoints: ['src/client/404/index.tsx'],
  outdir: 'public',
  minify: true,
  naming: '[dir]/404.[ext]'
})
console.info('404 sayfası derlendi:', bulunamadı.success)

//info Son olarak da sunucumuzu oluşturuyoruz.
sunucuyuOluştur()
