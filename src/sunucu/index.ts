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
  kimlikVerisiSayfayıGörebilirMi,
  kişileriYöneticiİçinListele,
  kişileriYöneticiİçinSay
} from '@/sunucu/kütüphane'
import navigasyon from '@/istemci/ortak/navigasyon'

export default function sunucuyuOluştur() {
  const app = new Elysia()
    .use(staticPlugin({ assets: 'statik', prefix: '/statik' }))
    .use(
      jwt({
        name: 'jwt',
        secret: process.env['JWT_SECRET']!
      })
    )
    .guard({
      cookie: t.Cookie({
        kimlik: t.String()
      })
    })
    .onError(async ({ code, request: { method, headers }, jwt }) => {
      if (code === 'NOT_FOUND' && method === 'GET') {
        const cookie = headers.get('Cookie')?.split('=')[1]
        const kimlik = cookie ? await jwt.verify(cookie) : null
        const kimlikVerisi: KimlikVerisi = kimlik
          ? await kimlikVerisiniAl(kimlik)
          : [0, 'yok']
        return new Response(
          await renderToReadableStream(
            createElement(Bulunamadı, {
              kimlikDurumu: kimlikVerisi[1] ?? 'yok'
            }),
            {
              bootstrapScripts: ['/statik/404.js']
            }
          ),
          {
            status: 404,
            headers: { 'Content-Type': 'text/html;charset=utf-8' }
          }
        )
      }
      return new Response('Sunucu tarafında bir hata oluştu.', {
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        status: 500
      })
    })
    .get('/', async ({ cookie: { kimlik }, jwt }) => {
      const kimlikVerisi = await kimlikVerisiniAl(
        await jwt.verify(kimlik.value)
      )
      return new Response(
        await renderToReadableStream(
          createElement(Anasayfa, { kimlikDurumu: kimlikVerisi[1] }),
          {
            bootstrapScripts: ['/statik/anasayfa.js']
          }
        ),
        {
          headers: { 'Content-Type': 'text/html;charset=utf-8' }
        }
      )
    })
    .get('/bilgilendirme', async ({ cookie: { kimlik }, jwt }) => {
      const kimlikVerisi = await kimlikVerisiniAl(
        await jwt.verify(kimlik.value)
      )
      return new Response(
        await renderToReadableStream(
          createElement(Bilgilendirme, { kimlikDurumu: kimlikVerisi[1] }),
          {
            bootstrapScripts: ['/statik/bilgilendirme.js']
          }
        ),
        {
          headers: { 'Content-Type': 'text/html;charset=utf-8' }
        }
      )
    })
    .get('/yonet', async ({ cookie: { kimlik }, jwt, redirect }) => {
      const kimlikVerisi = await kimlikVerisiniAl(
        await jwt.verify(kimlik.value)
      )
      if (
        !(await kimlikVerisiSayfayıGörebilirMi(
          kimlikVerisi,
          'Yönet',
          navigasyon
        ))
      )
        return redirect(navigasyon['Yönet']![3]!)
      const kişiler = await kişileriYöneticiİçinListele('', 1, 10)
      const ilkDurum: Durum = {
        tablo: 'kişiler',
        amaç: 'listele',
        sayfa: 1,
        sayfaBoyutu: 10,
        arama: '',
        veri: kişiler,
        yükleniyor: false,
        hata: ''
      }
      return new Response(
        await renderToReadableStream(createElement(Yönet, { ilkDurum }), {
          bootstrapScripts: ['/statik/yonet.js']
        }),
        {
          headers: { 'Content-Type': 'text/html;charset=utf-8' }
        }
      )
    })
    .get('/randevularim', async ({ cookie: { kimlik }, jwt, redirect }) => {
      const kimlikVerisi = await kimlikVerisiniAl(
        await jwt.verify(kimlik.value)
      )
      if (
        !(await kimlikVerisiSayfayıGörebilirMi(
          kimlikVerisi,
          'Randevularım',
          navigasyon
        ))
      )
        return redirect(navigasyon['Randevularım']![3]!)
      return new Response(
        await renderToReadableStream(
          createElement(Randevularım, { kimlikDurumu: kimlikVerisi[1] }),
          {
            bootstrapScripts: ['/statik/randevularim.js']
          }
        ),
        {
          headers: { 'Content-Type': 'text/html;charset=utf-8' }
        }
      )
    })
    .get('/giris', async ({ cookie: { kimlik }, jwt, redirect }) => {
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
        return redirect(navigasyon['Giriş']![3]!)
      return new Response(
        await renderToReadableStream(
          createElement(Giriş, { kimlikDurumu: kimlikVerisi[1] }),
          {
            bootstrapScripts: ['/statik/giris.js']
          }
        ),
        {
          headers: { 'Content-Type': 'text/html;charset=utf-8' }
        }
      )
    })
    .group('/api', (app) => {
      return app
        .group('/kimlik', (app) => {
          return app
            .post(
              '/giris',
              async ({
                body: { email, şifre, beniHatırla },
                jwt,
                cookie: { kimlik }
              }) => {
                const sonuç = await emailVeŞifreİleKimlikDoğrula(email, şifre)
                if (sonuç === 'Kimlik doğrulanamadı.')
                  return new Response(sonuç, {
                    headers: {
                      'Content-Type': 'text/plain;charset=utf-8'
                    },
                    status: 401
                  })
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
                return new Response('Giriş yapıldı.', {
                  headers: {
                    'Content-Type': 'text/plain;charset=utf-8'
                  }
                })
              },
              {
                body: t.Object({
                  email: t.String(),
                  şifre: t.String(),
                  beniHatırla: t.Boolean()
                })
              }
            )
            .post('/cikis', async ({ jwt, cookie: { kimlik } }) => {
              kimlik.set({
                value: await jwt.sign({ id: 0 }),
                httpOnly: true,
                path: '/',
                sameSite: 'strict',
                secure: true,
                priority: 'high'
              })
              return new Response('Çıkış yapıldı.', {
                headers: {
                  'Content-Type': 'text/plain;charset=utf-8'
                }
              })
            })
        })
        .group('/yonet', (app) => {
          return app.get(
            '/kisiler',
            async ({
              query: { arama, sayfa, sayfaBoyutu },
              jwt,
              cookie: { kimlik }
            }): Promise<Response> => {
              const kimlikVerisi = await kimlikVerisiniAl(
                await jwt.verify(kimlik.value)
              )
              if (kimlikVerisi[1] !== 'yönetici')
                return new Response('Yönetici değilsiniz.', {
                  headers: {
                    'Content-Type': 'text/plain;charset=utf-8'
                  },
                  status: 403
                })
              const sonrakiArama = arama || ''
              const sonrakiSayfa = sayfa || 1
              const sonrakiSayfaBoyutu = sayfaBoyutu || 10
              const kişiler = await kişileriYöneticiİçinListele(
                sonrakiArama,
                sonrakiSayfa,
                sonrakiSayfaBoyutu
              )
              const sonuç = {
                toplam: await kişileriYöneticiİçinSay(sonrakiArama),
                sayfa: sonrakiSayfa,
                sayfaBoyutu: sonrakiSayfaBoyutu,
                içerik: kişiler
              }
              return new Response(JSON.stringify(sonuç), {
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                }
              })
            },
            {
              query: t.Object({
                arama: t.Optional(t.String()),
                sayfa: t.Optional(t.Numeric()),
                sayfaBoyutu: t.Optional(t.Numeric())
              })
            }
          )
        })
    })
    .listen(3000)
  console.info(
    `Sunucu şurda çalışıyor: ${app.server?.hostname}:${app.server?.port}`
  )
}
