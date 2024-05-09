import { Elysia } from 'elysia'
import { logger } from '@bogeychan/elysia-logger'
import pino from 'pino'
import { serverTiming } from '@elysiajs/server-timing'
import { swagger } from '@elysiajs/swagger'
import { staticPlugin } from '@elysiajs/static'
import { jwt } from '@elysiajs/jwt'
import { uygulamaBirSüreÇalıştıktanSonraKapatıldı } from '@/sunucu/kütüphane'
import { uygulamaVersiyonu } from '@/index'

export default function sunucuyuOluştur() {
  const arkayüz = new Elysia({ name: 'arkayüz' })
    .onStart(() => {
      console.warn('Arkayüz çalışmaya başladı.')
    })
    .use(
      logger({
        stream: pino.multistream([
          process.stdout,
          pino.destination('günlük.log')
        ]),
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true
          }
        }
      })
    )
    .use(
      serverTiming({
        allow: true,
        trace: { total: true }
      })
    )
    .use(swagger({ provider: 'swagger-ui' }))
    .use(staticPlugin({ assets: 'statik', prefix: '/statik' }))
    .use(
      jwt({
        name: 'jwt',
        secret: process.env['JWT_SECRET']!
      })
    )
    .get('/', (ctx) => {
      ctx.log.error(ctx, 'Context')
      ctx.log.info(ctx.request, 'Request')
      return 'pino-pretty'
    })
    .listen(3000)
    .onStop(() => console.warn('Arkayüz çalışmayı durdurdu!'))

  console.warn(
    `Sunucu ayakta. Detaylar: ${arkayüz.server?.hostname}:${arkayüz.server?.port}`
  )

  //# Linux sinyallerini dinle ve uygulamayı gerektiği gibi durdur, yeniden başlat yada kapat
  process.on('SIGINT', () => {
    console.warn('SIGINT sinyali alındı. Sunucu kapatılıyor...')
    arkayüz.stop()
    console.warn('Sunucu kapatıldı.')
    console.info(
      `SDÜ Randevu Yönetim Sistemi v(${uygulamaVersiyonu}) çevrimdışı!`
    )
    uygulamaBirSüreÇalıştıktanSonraKapatıldı()
    process.exit(0)
  })
}
