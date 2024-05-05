//info Bu dosya, projemizin giriş noktasıdır. Bu dosyayı çalıştırdığımızda projemiz çalışmaya başlar.
import sunucuyuOluştur from '@/sunucu'

//info Önce tailwindcss in çalışması için gerekli olan css dosyasını oluşturuyoruz.
const tailwindcss = Bun.spawnSync([
  'bunx',
  'tailwindcss',
  '-i',
  'src/stiller.css',
  '-o',
  'statik/stiller.css',
  '--minify'
])
console.info('Tailwindcss dosyası oluşturuldu:', tailwindcss.success)

//info Sonra da react arayüzlerimizin istemci paketlerini larını oluşturuyoruz.
const anasayfa = await Bun.build({
  entrypoints: ['src/istemci/anasayfa/index.tsx'],
  outdir: 'statik',
  minify: true,
  naming: '[dir]/anasayfa.[ext]'
})
console.info('Anasayfa derlendi:', anasayfa.success)
const bilgilendirme = await Bun.build({
  entrypoints: ['src/istemci/bilgilendirme/index.tsx'],
  outdir: 'statik',
  minify: true,
  naming: '[dir]/bilgilendirme.[ext]'
})
console.info('Bilgilendirme sayfası derlendi:', bilgilendirme.success)
const yönet = await Bun.build({
  entrypoints: ['src/istemci/yönet/index.tsx'],
  outdir: 'statik',
  minify: true,
  naming: '[dir]/yonet.[ext]'
})
console.info('Yönetici sayfası derlendi:', yönet.success)
const randevularım = await Bun.build({
  entrypoints: ['src/istemci/randevularım/index.tsx'],
  outdir: 'statik',
  minify: true,
  naming: '[dir]/randevularim.[ext]'
})
console.info('Randevularım sayfası derlendi:', randevularım.success)
const giriş = await Bun.build({
  entrypoints: ['src/istemci/giriş/index.tsx'],
  outdir: 'statik',
  minify: true,
  naming: '[dir]/giris.[ext]'
})
console.info('Giriş sayfası derlendi:', giriş.success)
const bulunamadı = await Bun.build({
  entrypoints: ['src/istemci/404/index.tsx'],
  outdir: 'statik',
  minify: true,
  naming: '[dir]/404.[ext]'
})
console.info('404 sayfası derlendi:', bulunamadı.success)

//info Son olarak da sunucumuzu oluşturuyoruz.
sunucuyuOluştur()
