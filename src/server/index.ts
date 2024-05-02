//info Burası sunucu tarafının giriş noktasıdır.
import { Elysia, t } from 'elysia'
import { staticPlugin } from '@elysiajs/static'
import { jwt } from '@elysiajs/jwt'
import { renderToReadableStream } from 'react-dom/server'
import { createElement } from 'react'
import Anasayfa from '@/client/anasayfa/anasayfa'
import Yönet from '@/client/yönet/yönet'
import Bulunamadı from '@/client/404/404'
import Randevularım from '@/client/randevularım/randevularım'
import Giriş from '@/client/giriş/giriş'
import {
  emailVeŞifreİleKimlikDoğrula,
  değerKimlikÇerezininMisalimi
} from '@/server/lib'

//info Sunucumuzu oluşturuyoruz.
//info /public dizinini statik dosyalar için kullanacağız.
//info kimlik doğrulama için JWT kullanacağız.
//info Bu dosyada ve api dizinindeki dosyalarda kullanıcağımız bütün uç noktaları tanımlıyoruz.
//info Tanımlamadığımız bir uç noktaya erişilmeye çalışırsa 404 sayfasını gönderiyoruz.
export default function sunucuyuOluştur() {
  const app = new Elysia()
    .use(staticPlugin())
    .use(
      jwt({
        name: 'jwt',
        secret: process.env['JWT_SECRET']!
      })
    )
    .get('/', async () => {
      return new Response(
        await renderToReadableStream(
          createElement(Anasayfa, { girişYapıldı: true }),
          {
            bootstrapScripts: ['/public/anasayfa.js']
          }
        ),
        {
          headers: { 'Content-Type': 'text/html' }
        }
      )
    })
    .get('/yonet', async () => {
      return new Response(
        await renderToReadableStream(createElement(Yönet), {
          bootstrapScripts: ['/public/yonet.js']
        }),
        {
          headers: { 'Content-Type': 'text/html' }
        }
      )
    })
    .get('/randevularim', async () => {
      return new Response(
        await renderToReadableStream(createElement(Randevularım), {
          bootstrapScripts: ['/public/randevularim.js']
        }),
        {
          headers: { 'Content-Type': 'text/html' }
        }
      )
    })
    .get(
      '/giris',
      async ({ cookie: { kimlik }, jwt, redirect }) => {
        //info Eğer giriş yapılmamışsa giriş sayfasını göster, yapılmışsa randevularım sayfasına yönlendir.
        const kimlikGeçerli = değerKimlikÇerezininMisalimi(
          await jwt.verify(kimlik.value)
        )
        if (kimlikGeçerli) return redirect('/randevularim', 303)
        return new Response(
          await renderToReadableStream(createElement(Giriş), {
            bootstrapScripts: ['/public/giris.js']
          }),
          {
            headers: { 'Content-Type': 'text/html' }
          }
        )
      },
      {
        cookie: t.Object({
          kimlik: t.String()
        })
      }
    )
    .group(
      '/api',
      {
        cookie: t.Cookie({
          kimlik: t.String()
        })
      },
      (app) => {
        return app.group('/kimlik', (app) => {
          //# Kimlik doğrulama ve yönetimi
          return app
            .post(
              '/giris',
              async ({ body: { email, şifre }, jwt, cookie: { kimlik } }) => {
                //info Giriş yapmaya çalış, başarırsan kimlik adındaki çereze jwt yi koy ve başarılı olduğunu belirt, başaramazsan başaramadığını belirt.
                const sonuç = await emailVeŞifreİleKimlikDoğrula(email, şifre)
                if (sonuç === 'Kimlik doğrulanamadı.') return sonuç
                kimlik.set({
                  value: await jwt.sign({ id: sonuç }),
                  httpOnly: true,
                  maxAge: 7 * 86400
                })
                return 'Giriş yapıldı.'
              },
              {
                body: t.Object({
                  email: t.String(),
                  şifre: t.String()
                })
              }
            )
            .post('/cikis', ({ cookie: { kimlik } }) => {
              //info Kimlik adında bir çerez varsa onu sil ve çıkış yapıldığını belirt.
              kimlik.remove()
              return 'Çıkış yapıldı.'
            })
        })
      }
    )
    .onError(async ({ code, request: { method } }) => {
      if (code === 'NOT_FOUND' && method === 'GET')
        return new Response(
          await renderToReadableStream(createElement(Bulunamadı), {
            bootstrapScripts: ['/public/404.js']
          }),
          {
            headers: { 'Content-Type': 'text/html' }
          }
        )
      return new Response('Sunucu tarafında bir hata oluştu.', { status: 500 })
    })
    .listen(3000)

  //info Sunucumuzun çalıştığını konsola yazdırıyoruz.
  console.info(
    `Sunucu şurda çalışıyor: ${app.server?.hostname}:${app.server?.port}`
  )
}
