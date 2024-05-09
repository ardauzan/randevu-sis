import { Pool } from 'pg'
import veritabanınıOluştur from '@/veritabanı'
import sunucuyuAyağaKaldır from '@/sunucu'
import {
  trueVeyaFalseuBaşarılıyaDönüştür,
  uygulamaBirSüreÇalıştıktanSonraKapatıldı
} from '@/sunucu/kütüphane'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import type * as şema from '@/veritabanı/şema'

//# Ortamı kontrol et
export const uygulamaVersiyonu = '0.1.0'
const desteklenenBunVersiyonu = '1.1.7'
console.info('Ortam Bun mı? Kontrol ediliyor...')
if (typeof Bun === 'undefined') {
  console.error('Ortam Bun değil. Uygulama başlatılamaz!')
  uygulamaBirSüreÇalıştıktanSonraKapatıldı()
  process.exit(1)
}
console.info('Ortam Bun.')
const şuanKiBunVersiyonu = Bun.version
if (şuanKiBunVersiyonu === desteklenenBunVersiyonu)
  console.info(
    `Bun (v${şuanKiBunVersiyonu}) ortamında uygulama başlatılıyor...`
  )
else {
  console.error(
    `Bun versiyon ${şuanKiBunVersiyonu} ortamında uygulama başlatılamaz, ${desteklenenBunVersiyonu} gereklidir!`
  )
  uygulamaBirSüreÇalıştıktanSonraKapatıldı()
  process.exit(1)
}
console.info(
  `SDÜ Randevu Yönetim Sistemi (v${uygulamaVersiyonu}) çalışmaya başladı.`
)

//# Önyüz ü oluştur
console.info('Önyüz oluşturuluyor...')
const tailwindcss = Bun.spawnSync([
  'bunx',
  'tailwindcss',
  '-i',
  'src/stiller.css',
  '-o',
  'statik/stiller.css',
  '--no-autoprefixer',
  '--minify'
])
console.info(
  'Tailwindcss dosyası oluşturuldu:',
  `(${trueVeyaFalseuBaşarılıyaDönüştür(tailwindcss.success)})`
)
const anasayfa = await Bun.build({
  entrypoints: ['src/istemci/anasayfa/index.tsx'],
  outdir: 'statik',
  minify: true,
  naming: '[dir]/anasayfa.[ext]'
})
console.info(
  'Anasayfa derlendi:',
  `(${trueVeyaFalseuBaşarılıyaDönüştür(anasayfa.success)})`
)
const bilgilendirme = await Bun.build({
  entrypoints: ['src/istemci/bilgilendirme/index.tsx'],
  outdir: 'statik',
  minify: true,
  naming: '[dir]/bilgilendirme.[ext]'
})
console.info(
  'Bilgilendirme sayfası derlendi:',
  `(${trueVeyaFalseuBaşarılıyaDönüştür(bilgilendirme.success)})`
)
const yönet = await Bun.build({
  entrypoints: ['src/istemci/yönet/index.tsx'],
  outdir: 'statik',
  minify: true,
  naming: '[dir]/yonet.[ext]'
})
console.info(
  'Yönetici sayfası derlendi:',
  `(${trueVeyaFalseuBaşarılıyaDönüştür(yönet.success)})`
)
const randevularım = await Bun.build({
  entrypoints: ['src/istemci/randevularım/index.tsx'],
  outdir: 'statik',
  minify: true,
  naming: '[dir]/randevularim.[ext]'
})
console.info(
  'Randevularım sayfası derlendi:',
  `(${trueVeyaFalseuBaşarılıyaDönüştür(randevularım.success)})`
)
const giriş = await Bun.build({
  entrypoints: ['src/istemci/giriş/index.tsx'],
  outdir: 'statik',
  minify: true,
  naming: '[dir]/giris.[ext]'
})
console.info(
  'Giriş sayfası derlendi:',
  `(${trueVeyaFalseuBaşarılıyaDönüştür(giriş.success)})`
)
const bulunamadı = await Bun.build({
  entrypoints: ['src/istemci/404/index.tsx'],
  outdir: 'statik',
  minify: true,
  naming: '[dir]/404.[ext]'
})
console.info(
  '404 sayfası derlendi:',
  `(${trueVeyaFalseuBaşarılıyaDönüştür(bulunamadı.success)})`
)
tailwindcss.success &&
anasayfa.success &&
bilgilendirme.success &&
yönet.success &&
randevularım.success &&
giriş.success &&
bulunamadı.success
  ? console.info('Önyüz oluşturuldu.')
  : (() => {
      console.error('Önyüz oluşturulamadı!')
      uygulamaBirSüreÇalıştıktanSonraKapatıldı()
      process.exit(1)
    })()

//# Ortam verilerini kontrol et
console.info('Ortam değişkenleri kontrol ediliyor...')
if (
  !process.env['PGUSER'] ||
  !process.env['PGHOST'] ||
  !process.env['PGPASSWORD'] ||
  !process.env['PGDATABASE'] ||
  !process.env['PGPORT'] ||
  !process.env['JWT_SECRET'] ||
  !process.env['COOKIE_SECRET']
) {
  console.error('Ortam değişkenleri eksik. Onlar olmadan devam edilemez!')
  uygulamaBirSüreÇalıştıktanSonraKapatıldı()
  process.exit(1)
}
console.info('Ortam değişkenleri tamam.')

//# Veritabanına bağlan
console.info('Veritabanına bağlanılıyor...')
let havuz: Pool
export let veritabanı: NodePgDatabase<typeof şema>
try {
  havuz = new Pool()
  const havuzİstemcisi = await havuz.connect()
  await havuzİstemcisi.release()
  veritabanı = veritabanınıOluştur(havuz)
} catch (hata: any) {
  console.error('Veritabanına bağlanırken bir hata oluştu:', hata.message)
  uygulamaBirSüreÇalıştıktanSonraKapatıldı()
  process.exit(1)
}
console.info('Veritabanına bağlanıldı.')

//# Sunucuyu ayağa kaldır
console.warn('Sunucu ayağa kaldırılıyor...')
try {
  sunucuyuAyağaKaldır()
} catch (hata: any) {
  console.error('Sunucu ayağa kaldırılırken bir hata oluştu:', hata.message)
  uygulamaBirSüreÇalıştıktanSonraKapatıldı()
  process.exit(1)
}

console.info(`SDÜ Randevu Yönetim Sistemi v(${uygulamaVersiyonu}) çevrimiçi!`)
