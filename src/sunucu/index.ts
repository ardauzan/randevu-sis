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
  kişileriYöneticiİçinSay,
  kişileriYöneticiİçinListele,
  kişiyiYöneticiİçinDetaylıOku,
  yöneticiİçinKişiEkle,
  yöneticiİçinKişiGüncelle,
  yöneticiİçinKişiSil
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
        const cevap = await renderToReadableStream(
          createElement(Bulunamadı, {
            kimlikDurumu: kimlikVerisi[1] ?? 'yok'
          }),
          {
            bootstrapScripts: ['/statik/404.js']
          }
        )
        return new Response(cevap, {
          status: 404,
          headers: { 'Content-Type': 'text/html;charset=utf-8' }
        })
      }
      const cevap = await JSON.stringify('Sunucu tarafında bir hata oluştu.')
      return new Response(cevap, {
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        status: 500
      })
    })
    .get('/', async ({ cookie: { kimlik }, jwt }) => {
      const kimlikVerisi = await kimlikVerisiniAl(
        await jwt.verify(kimlik.value)
      )
      const cevap = await renderToReadableStream(
        createElement(Anasayfa, { kimlikDurumu: kimlikVerisi[1] }),
        {
          bootstrapScripts: ['/statik/anasayfa.js']
        }
      )
      return new Response(cevap, {
        headers: { 'Content-Type': 'text/html;charset=utf-8' }
      })
    })
    .get('/bilgilendirme', async ({ cookie: { kimlik }, jwt }) => {
      const kimlikVerisi = await kimlikVerisiniAl(
        await jwt.verify(kimlik.value)
      )
      const cevap = await renderToReadableStream(
        createElement(Bilgilendirme, { kimlikDurumu: kimlikVerisi[1] }),
        {
          bootstrapScripts: ['/statik/bilgilendirme.js']
        }
      )
      return new Response(cevap, {
        headers: { 'Content-Type': 'text/html;charset=utf-8' }
      })
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
      const cevap = await renderToReadableStream(
        createElement(Yönet, { ilkDurum }),
        {
          bootstrapScripts: ['/statik/yonet.js']
        }
      )
      return new Response(cevap, {
        headers: { 'Content-Type': 'text/html;charset=utf-8' }
      })
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
      const cevap = await renderToReadableStream(
        createElement(Randevularım, { kimlikDurumu: kimlikVerisi[1] }),
        {
          bootstrapScripts: ['/statik/randevularim.js']
        }
      )
      return new Response(cevap, {
        headers: { 'Content-Type': 'text/html;charset=utf-8' }
      })
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
      const cevap = await renderToReadableStream(
        createElement(Giriş, { kimlikDurumu: kimlikVerisi[1] }),
        {
          bootstrapScripts: ['/statik/giris.js']
        }
      )
      return new Response(cevap, {
        headers: { 'Content-Type': 'text/html;charset=utf-8' }
      })
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
                if (sonuç === 'Kimlik doğrulanamadı.') {
                  const cevap = await JSON.stringify(sonuç)
                  return new Response(cevap, {
                    headers: {
                      'Content-Type': 'application/json;charset=utf-8'
                    },
                    status: 401
                  })
                }
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
                const cevap = await JSON.stringify('Giriş yapıldı.')
                return new Response(cevap, {
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8'
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
              const cevap = await JSON.stringify('Çıkış yapıldı.')
              return new Response(cevap, {
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                }
              })
            })
        })
        .group('/yonet', (app) => {
          return app
            .get(
              '/kisiler',
              async ({
                query: { arama, sayfa, sayfaBoyutu },
                jwt,
                cookie: { kimlik }
              }) => {
                const kimlikVerisi = await kimlikVerisiniAl(
                  await jwt.verify(kimlik.value)
                )
                if (kimlikVerisi[1] !== 'yönetici') {
                  const cevap = await JSON.stringify('Yönetici değilsiniz.')
                  return new Response(cevap, {
                    headers: {
                      'Content-Type': 'application/json;charset=utf-8'
                    },
                    status: 403
                  })
                }
                const sonrakiArama = arama || ''
                const sonrakiSayfa = sayfa || 1
                const sonrakiSayfaBoyutu = sayfaBoyutu || 10
                const kişiler = await kişileriYöneticiİçinListele(
                  sonrakiArama,
                  sonrakiSayfa,
                  sonrakiSayfaBoyutu
                )
                const cevap = await JSON.stringify({
                  toplam: await kişileriYöneticiİçinSay(sonrakiArama),
                  sayfa: sonrakiSayfa,
                  sayfaBoyutu: sonrakiSayfaBoyutu,
                  içerik: kişiler
                })
                return new Response(cevap, {
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
            .get(
              '/kisiler/:id',
              async ({ params: { id }, jwt, cookie: { kimlik } }) => {
                const kimlikVerisi = await kimlikVerisiniAl(
                  await jwt.verify(kimlik.value)
                )
                if (kimlikVerisi[1] !== 'yönetici') {
                  const cevap = await JSON.stringify('Yönetici değilsiniz.')
                  return new Response(cevap, {
                    headers: {
                      'Content-Type': 'application/json;charset=utf-8'
                    },
                    status: 403
                  })
                }
                const sonuç = await kişiyiYöneticiİçinDetaylıOku(id)
                const cevap = await JSON.stringify(
                  sonuç ? sonuç : 'Kişi bulunamadı.'
                )
                return new Response(cevap, {
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  }
                })
              },
              {
                params: t.Object({
                  id: t.Numeric()
                })
              }
            )
            .post(
              '/kisiler',
              async ({
                body: {
                  yönetici,
                  öğrenciNo,
                  ad,
                  soyAd,
                  email,
                  şifre,
                  projeler
                },
                jwt,
                cookie: { kimlik }
              }) => {
                const kimlikVerisi = await kimlikVerisiniAl(
                  await jwt.verify(kimlik.value)
                )
                if (kimlikVerisi[1] !== 'yönetici') {
                  const cevap = await JSON.stringify('Yönetici değilsiniz.')
                  return new Response(cevap, {
                    headers: {
                      'Content-Type': 'application/json;charset=utf-8'
                    },
                    status: 403
                  })
                }
                const sonuç = await yöneticiİçinKişiEkle({
                  yönetici,
                  öğrenciNo,
                  ad,
                  soyAd,
                  email,
                  şifre,
                  projeler
                })
                const cevap = await JSON.stringify(sonuç)
                return new Response(cevap, {
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  }
                })
              },
              {
                body: t.Object({
                  yönetici: t.Boolean(),
                  öğrenciNo: t.Numeric(),
                  ad: t.String(),
                  soyAd: t.String(),
                  email: t.String(),
                  şifre: t.String(),
                  projeler: t.Array(t.Numeric())
                })
              }
            )
            .patch(
              '/kisiler/:id',
              async ({
                params: { id },
                body: {
                  yönetici,
                  öğrenciNo,
                  ad,
                  soyAd,
                  email,
                  şifre,
                  projeler
                },
                jwt,
                cookie: { kimlik }
              }) => {
                const kimlikVerisi = await kimlikVerisiniAl(
                  await jwt.verify(kimlik.value)
                )
                if (kimlikVerisi[1] !== 'yönetici') {
                  const cevap = await JSON.stringify('Yönetici değilsiniz.')
                  return new Response(cevap, {
                    headers: {
                      'Content-Type': 'application/json;charset=utf-8'
                    },
                    status: 403
                  })
                }
                const sonuç = await yöneticiİçinKişiGüncelle(id, {
                  yönetici,
                  öğrenciNo,
                  ad,
                  soyAd,
                  email,
                  şifre,
                  projeler
                })
                const cevap = await JSON.stringify(sonuç)
                return new Response(cevap, {
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  }
                })
              },
              {
                params: t.Object({
                  id: t.Numeric()
                }),
                body: t.Object({
                  yönetici: t.Boolean(),
                  öğrenciNo: t.Numeric(),
                  ad: t.String(),
                  soyAd: t.String(),
                  email: t.String(),
                  şifre: t.String(),
                  projeler: t.Array(t.Numeric())
                })
              }
            )
            .delete(
              '/kisiler/:id',
              async ({ params: { id }, jwt, cookie: { kimlik } }) => {
                const kimlikVerisi = await kimlikVerisiniAl(
                  await jwt.verify(kimlik.value)
                )
                if (kimlikVerisi[1] !== 'yönetici') {
                  const cevap = await JSON.stringify('Yönetici değilsiniz.')
                  return new Response(cevap, {
                    headers: {
                      'Content-Type': 'application/json;charset=utf-8'
                    },
                    status: 403
                  })
                }
                const sonuç = await yöneticiİçinKişiSil(id)
                const cevap = await JSON.stringify(sonuç)
                return new Response(cevap, {
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  }
                })
              },
              {
                params: t.Object({
                  id: t.Numeric()
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
