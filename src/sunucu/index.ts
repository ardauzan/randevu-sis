//info Burası sunucu tarafının giriş noktasıdır.
import { Elysia, t } from 'elysia'
import { staticPlugin } from '@elysiajs/static'
import { jwt } from '@elysiajs/jwt'
import { renderToReadableStream } from 'react-dom/server'
import { createElement } from 'react'
import Anasayfa from '@/istemci/anasayfa/anasayfa'
import Bilgilendirme from '@/istemci/bilgilendirme/bilgilendirme'
import Yönet from '@/istemci/yönet/yönet'
import Bulunamadı from '@/istemci/404/404'
import Randevularım from '@/istemci/randevularım/randevularım'
import Giriş from '@/istemci/giriş/giriş'
import {
  emailVeŞifreİleKimlikDoğrula,
  kimlikVerisiniAl,
  kimlikVerisiSayfayıGörebilirMi
} from '@/sunucu/kütüphane'
import navigasyon from '@/istemci/ortak/navigasyon'

//info Sunucumuzu oluşturuyoruz.
//info /statik dizinini statik dosyalar için kullanacağız.
//info kimlik doğrulama için JWT kullanacağız.
//info Bu dosyada sunucummuzun bütün uç noktaları tanımlıyoruz.
//info Tanımlamadığımız bir uç noktaya GET ile erişilmeye çalışırsa 404 sayfasını gönderiyoruz.
export default function sunucuyuOluştur() {
  const app = new Elysia()
    .use(staticPlugin({ assets: 'statik', prefix: '/statik' }))
    .use(
      jwt({
        name: 'jwt',
        secret: process.env['JWT_SECRET']!
      })
    )
    .get(
      '/',
      async ({ cookie: { kimlik }, jwt, redirect }) => {
        const kimlikVerisi = await kimlikVerisiniAl(
          await jwt.verify(kimlik.value)
        )
        if (
          !(await kimlikVerisiSayfayıGörebilirMi(
            kimlikVerisi,
            'Anasayfa',
            navigasyon
          ))
        )
          return redirect(navigasyon['Anasayfa']![3])
        return new Response(
          await renderToReadableStream(
            createElement(Anasayfa, { kimlikDurumu: kimlikVerisi[1] }),
            {
              bootstrapScripts: ['/statik/anasayfa.js']
            }
          ),
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
    .get('/bilgilendirme', async () => {
      return new Response(
        await renderToReadableStream(createElement(Bilgilendirme), {
          bootstrapScripts: ['/statik/bilgilendirme.js']
        }),
        {
          headers: { 'Content-Type': 'text/html' }
        }
      )
    })
    .get('/yonet', async () => {
      return new Response(
        await renderToReadableStream(createElement(Yönet), {
          bootstrapScripts: ['/statik/yonet.js']
        }),
        {
          headers: { 'Content-Type': 'text/html' }
        }
      )
    })
    .get('/randevularim', async () => {
      return new Response(
        await renderToReadableStream(createElement(Randevularım), {
          bootstrapScripts: ['/statik/randevularim.js']
        }),
        {
          headers: { 'Content-Type': 'text/html' }
        }
      )
    })
    .get(
      '/giris',
      async ({ cookie: { kimlik }, jwt, redirect }) => {
        const kimlikVerisi = await kimlikVerisiniAl(
          await jwt.verify(kimlik.value)
        )
        if (
          !(await kimlikVerisiSayfayıGörebilirMi(
            kimlikVerisi,
            'Giriş',
            navigasyon
          ))
        )
          return redirect(navigasyon['Giriş']![3])
        return new Response(
          await renderToReadableStream(
            createElement(Giriş, { kimlikDurumu: kimlikVerisi[1] }),
            {
              bootstrapScripts: ['/statik/giris.js']
            }
          ),
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
              async ({
                body: { email, şifre, beniHatırla },
                jwt,
                cookie: { kimlik }
              }) => {
                //info Giriş yapmaya çalış, başarırsan kimlik adındaki çereze jwt yi koy ve başarılı olduğunu belirt, başaramazsan başaramadığını belirt.
                const sonuç = await emailVeŞifreİleKimlikDoğrula(email, şifre)
                if (sonuç === 'Kimlik doğrulanamadı.') return sonuç
                kimlik.set({
                  value: await jwt.sign({ id: sonuç }),
                  httpOnly: true,
                  path: '/',
                  sameSite: 'strict',
                  secure: true,
                  expires: beniHatırla
                    ? new Date(Date.now() + 7 * 86400 * 1000)
                    : undefined,
                  priority: 'high'
                })
                return 'Giriş yapıldı.'
              },
              {
                body: t.Object({
                  email: t.String(),
                  şifre: t.String(),
                  beniHatırla: t.Boolean()
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
            bootstrapScripts: ['/statik/404.js']
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
