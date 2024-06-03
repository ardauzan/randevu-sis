import { Elysia, t } from 'elysia'
import { staticPlugin } from '@elysiajs/static'
import { jwt } from '@elysiajs/jwt'
import { logger } from '@bogeychan/elysia-logger'
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
  yöneticiİçinKişiSil,
  projeleriYöneticiİçinSay,
  projeleriYöneticiİçinListele,
  projeyiYöneticiİçinDetaylıOku,
  yöneticiİçinProjeEkle,
  yöneticiİçinProjeGüncelle,
  yöneticiİçinProjeSil,
  gereçleriYöneticiİçinSay,
  gereçleriYöneticiİçinListele,
  gereciYöneticiİçinDetaylıOku,
  yöneticiİçinGereçEkle,
  yöneticiİçinGereçGüncelle,
  yöneticiİçinGereçSil,
  araçlarıYöneticiİçinSay,
  araçlarıYöneticiİçinListele,
  aracıYöneticiİçinDetaylıOku,
  yöneticiİçinAraçEkle,
  yöneticiİçinAraçGüncelle,
  yöneticiİçinAraçSil,
  randevularıYöneticiİçinSay,
  randevularıYöneticiİçinListele,
  randevuyuYöneticiİçinDetaylıOku,
  yöneticiİçinRandevuEkle,
  yöneticiİçinRandevuGüncelle,
  yöneticiİçinRandevuSil,
  tatilleriYöneticiİçinSay,
  tatilleriYöneticiİçinListele,
  tatiliYöneticiİçinDetaylıOku,
  yöneticiİçinTatilEkle,
  yöneticiİçinTatilGüncelle,
  yöneticiİçinTatilSil,
  ziyaretleriYöneticiİçinSay,
  ziyaretleriYöneticiİçinListele,
  ziyaretiYöneticiİçinDetaylıOku,
  yöneticiİçinZiyaretEkle,
  yöneticiİçinZiyaretGüncelle,
  yöneticiİçinZiyaretSil
} from '@/sunucu/kütüphane'
import navigasyon from '@/istemci/ortak/navigasyon'

const arkayüz = new Elysia({
  name: 'arkayüz',
  cookie: {
    sign: 'kimlik',
    secrets: [process.env['COOKIE_SECRET']!]
  }
})
  .use(
    logger({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true
        }
      }
    })
  )
  .use(staticPlugin({ assets: 'statik', prefix: '/statik' }))
  .use(
    jwt({
      name: 'jwt',
      secret: process.env['JWT_SECRET']!
    })
  )
  .guard({
    cookie: t.Cookie({
      kimlik: t.Optional(t.String())
    })
  })
  .onError(
    { as: 'global' },
    async ({ error, code, request: { method, headers }, jwt }) => {
      console.error(error)
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
    }
  )
  .resolve(async ({ cookie: { kimlik }, jwt }) => {
    return {
      kimlikVerisi: kimlik.value
        ? await kimlikVerisiniAl(await jwt.verify(kimlik.value))
        : [0, 'yok']
    } as { kimlikVerisi: KimlikVerisi }
  })
  .get('/', async ({ kimlikVerisi }) => {
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
  .get('/bilgilendirme', async ({ kimlikVerisi }) => {
    const cevap = await renderToReadableStream(
      createElement(Bilgilendirme, {
        kimlikDurumu: kimlikVerisi[1]
      }),
      {
        bootstrapScripts: ['/statik/bilgilendirme.js']
      }
    )
    return new Response(cevap, {
      headers: { 'Content-Type': 'text/html;charset=utf-8' }
    })
  })
  .get('/yonet', async ({ kimlikVerisi, redirect }) => {
    if (
      !(await kimlikVerisiSayfayıGörebilirMi(kimlikVerisi, 'Yönet', navigasyon))
    )
      return redirect(navigasyon['Yönet']![3]!, 302)
    const toplam = await kişileriYöneticiİçinSay('')
    const kişiler = await kişileriYöneticiİçinListele('', 1, 10)
    const ilkDurum: Durum = {
      tablo: 'kişiler',
      amaç: 'listele',
      sayfa: 1,
      sayfaBoyutu: 10,
      arama: '',
      toplam,
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
  .get('/randevularim', async ({ kimlikVerisi, redirect }) => {
    if (
      !(await kimlikVerisiSayfayıGörebilirMi(
        kimlikVerisi,
        'Randevularım',
        navigasyon
      ))
    )
      return redirect(navigasyon['Randevularım']![3]!, 302)
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
  .get('/giris', async ({ kimlikVerisi, redirect }) => {
    if (
      !(await kimlikVerisiSayfayıGörebilirMi(kimlikVerisi, 'Giriş', navigasyon))
    )
      return redirect(navigasyon['Giriş']![3]!, 302)
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
          .post('/cikis', async ({ cookie: { kimlik } }) => {
            kimlik.remove()
            const cevap = await JSON.stringify('Çıkış yapıldı.')
            return new Response(cevap, {
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
              }
            })
          })
      })
      .group(
        '/yonet',
        {
          beforeHandle: async ({ cookie: { kimlik }, jwt }) => {
            const kimlikVerisi = await kimlikVerisiniAl(
              await jwt.verify(kimlik?.value)
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
            return
          }
        },
        (app) => {
          return app
            .get(
              '/kisiler',
              async ({ query: { arama, sayfa, sayfaBoyutu } }) => {
                const sonrakiArama = arama || ''
                let sonrakiSayfa = sayfa || 1
                const sonrakiSayfaBoyutu = sayfaBoyutu || 10
                const toplam = await kişileriYöneticiİçinSay(sonrakiArama)
                const maxSayfa =
                  toplam > 0 ? Math.ceil(toplam / sonrakiSayfaBoyutu) : 1
                if (sonrakiSayfa > maxSayfa) sonrakiSayfa = maxSayfa
                const içerik = await kişileriYöneticiİçinListele(
                  sonrakiArama,
                  sonrakiSayfa,
                  sonrakiSayfaBoyutu
                )
                const cevap = await JSON.stringify({
                  toplam,
                  sayfa: sonrakiSayfa,
                  sayfaBoyutu: sonrakiSayfaBoyutu,
                  içerik
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
                  sayfa: t.Optional(
                    t.Numeric({
                      minimum: 1
                    })
                  ),
                  sayfaBoyutu: t.Optional(
                    t.Numeric({
                      minimum: 1
                    })
                  )
                })
              }
            )
            .get(
              '/kisiler/:id',
              async ({ params: { id } }) => {
                const sonuç = await kişiyiYöneticiİçinDetaylıOku(id)
                const cevap = await JSON.stringify(
                  sonuç ? sonuç : 'Kişi bulunamadı.'
                )
                return new Response(cevap, {
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                  status: sonuç ? 200 : 404
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
                body: { yönetici, öğrenciNo, ad, soyAd, email, şifre, projeler }
              }) => {
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
                body: { yönetici, öğrenciNo, ad, soyAd, email, şifre, projeler }
              }) => {
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
              async ({ params: { id } }) => {
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
            .get(
              '/projeler',
              async ({ query: { arama, sayfa, sayfaBoyutu } }) => {
                const sonrakiArama = arama || ''
                const sonrakiSayfa = sayfa || 1
                const sonrakiSayfaBoyutu = sayfaBoyutu || 10
                const projeler = await projeleriYöneticiİçinListele(
                  sonrakiArama,
                  sonrakiSayfa,
                  sonrakiSayfaBoyutu
                )
                const cevap = await JSON.stringify({
                  toplam: await projeleriYöneticiİçinSay(sonrakiArama),
                  sayfa: sonrakiSayfa,
                  sayfaBoyutu: sonrakiSayfaBoyutu,
                  içerik: projeler
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
              '/projeler/:id',
              async ({ params: { id } }) => {
                const sonuç = await projeyiYöneticiİçinDetaylıOku(id)
                const cevap = await JSON.stringify(
                  sonuç ? sonuç : 'Proje bulunamadı.'
                )
                return new Response(cevap, {
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                  status: sonuç ? 200 : 404
                })
              },
              {
                params: t.Object({
                  id: t.Numeric()
                })
              }
            )
            .post(
              '/projeler',
              async ({
                body: { ad, başlangıçTarihi, bitişTarihi, açıklama, üyeler }
              }) => {
                const sonuç = await yöneticiİçinProjeEkle({
                  ad,
                  başlangıçTarihi,
                  bitişTarihi,
                  açıklama,
                  üyeler
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
                  ad: t.String(),
                  başlangıçTarihi: t.String(),
                  bitişTarihi: t.String(),
                  açıklama: t.String(),
                  üyeler: t.Array(t.Numeric())
                })
              }
            )
            .patch(
              '/projeler/:id',
              async ({
                params: { id },
                body: { ad, başlangıçTarihi, bitişTarihi, açıklama, üyeler }
              }) => {
                const sonuç = await yöneticiİçinProjeGüncelle(id, {
                  ad,
                  başlangıçTarihi,
                  bitişTarihi,
                  açıklama,
                  üyeler
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
                  ad: t.String(),
                  başlangıçTarihi: t.String(),
                  bitişTarihi: t.String(),
                  açıklama: t.String(),
                  üyeler: t.Array(t.Numeric())
                })
              }
            )
            .delete('/projeler/:id', async ({ params: { id } }) => {
              const sonuç = await yöneticiİçinProjeSil(parseInt(id))
              const cevap = await JSON.stringify(sonuç)
              return new Response(cevap, {
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                }
              })
            })
            .get(
              '/gerecler',
              async ({ query: { arama, sayfa, sayfaBoyutu } }) => {
                const sonrakiArama = arama || ''
                const sonrakiSayfa = sayfa || 1
                const sonrakiSayfaBoyutu = sayfaBoyutu || 10
                const gereçler = await gereçleriYöneticiİçinListele(
                  sonrakiArama,
                  sonrakiSayfa,
                  sonrakiSayfaBoyutu
                )
                const cevap = await JSON.stringify({
                  toplam: await gereçleriYöneticiİçinSay(sonrakiArama),
                  sayfa: sonrakiSayfa,
                  sayfaBoyutu: sonrakiSayfaBoyutu,
                  içerik: gereçler
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
              '/gerecler/:id',
              async ({ params: { id } }) => {
                const sonuç = await gereciYöneticiİçinDetaylıOku(id)
                const cevap = await JSON.stringify(
                  sonuç ? sonuç : 'Gereç bulunamadı.'
                )
                return new Response(cevap, {
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                  status: sonuç ? 200 : 404
                })
              },
              {
                params: t.Object({
                  id: t.Numeric()
                })
              }
            )
            .post(
              '/gerecler',
              async ({ body: { ad, adet } }) => {
                const sonuç = await yöneticiİçinGereçEkle({
                  ad,
                  adet
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
                  ad: t.String(),
                  adet: t.Numeric()
                })
              }
            )
            .patch(
              '/gerecler/:id',
              async ({ params: { id }, body: { ad, adet } }) => {
                const sonuç = await yöneticiİçinGereçGüncelle(id, {
                  ad,
                  adet
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
                  ad: t.String(),
                  adet: t.Numeric()
                })
              }
            )
            .delete(
              '/gerecler/:id',
              async ({ params: { id } }) => {
                const sonuç = await yöneticiİçinGereçSil(id)
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
            .get(
              '/araclar',
              async ({ query: { arama, sayfa, sayfaBoyutu } }) => {
                const sonrakiArama = arama || ''
                const sonrakiSayfa = sayfa || 1
                const sonrakiSayfaBoyutu = sayfaBoyutu || 10
                const araçlar = await araçlarıYöneticiİçinListele(
                  sonrakiArama,
                  sonrakiSayfa,
                  sonrakiSayfaBoyutu
                )
                const cevap = await JSON.stringify({
                  toplam: await araçlarıYöneticiİçinSay(sonrakiArama),
                  sayfa: sonrakiSayfa,
                  sayfaBoyutu: sonrakiSayfaBoyutu,
                  içerik: araçlar
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
              '/araclar/:id',
              async ({ params: { id } }) => {
                const sonuç = await aracıYöneticiİçinDetaylıOku(id)
                const cevap = await JSON.stringify(
                  sonuç ? sonuç : 'Araç bulunamadı.'
                )
                return new Response(cevap, {
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                  status: sonuç ? 200 : 404
                })
              },
              {
                params: t.Object({
                  id: t.Numeric()
                })
              }
            )
            .post(
              '/araclar',
              async ({ body: { ad, açıklama, arızalı } }) => {
                const sonuç = await yöneticiİçinAraçEkle({
                  ad,
                  açıklama,
                  arızalı
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
                  ad: t.String(),
                  açıklama: t.String(),
                  arızalı: t.Boolean()
                })
              }
            )
            .patch(
              '/araclar/:id',
              async ({ params: { id }, body: { ad, açıklama, arızalı } }) => {
                const sonuç = await yöneticiİçinAraçGüncelle(id, {
                  ad,
                  açıklama,
                  arızalı
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
                  ad: t.String(),
                  açıklama: t.String(),
                  arızalı: t.Boolean()
                })
              }
            )
            .delete(
              '/araclar/:id',
              async ({ params: { id } }) => {
                const sonuç = await yöneticiİçinAraçSil(id)
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
            .get(
              '/randevular',
              async ({ query: { arama, sayfa, sayfaBoyutu } }) => {
                const sonrakiArama = arama || ''
                const sonrakiSayfa = sayfa || 1
                const sonrakiSayfaBoyutu = sayfaBoyutu || 10
                const randevular = await randevularıYöneticiİçinListele(
                  sonrakiArama,
                  sonrakiSayfa,
                  sonrakiSayfaBoyutu
                )
                const cevap = await JSON.stringify({
                  toplam: await randevularıYöneticiİçinSay(sonrakiArama),
                  sayfa: sonrakiSayfa,
                  sayfaBoyutu: sonrakiSayfaBoyutu,
                  içerik: randevular
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
              '/randevular/:id',
              async ({ params: { id } }) => {
                const sonuç = await randevuyuYöneticiİçinDetaylıOku(id)
                const cevap = await JSON.stringify(
                  sonuç ? sonuç : 'Randevu bulunamadı.'
                )
                return new Response(cevap, {
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                  status: sonuç ? 200 : 404
                })
              },
              {
                params: t.Object({
                  id: t.Numeric()
                })
              }
            )
            .post(
              '/randevular',
              async ({
                body: {
                  açıklama,
                  proje,
                  gün,
                  başlangıçZamanı,
                  bitişZamanı,
                  gereçler,
                  araçlar
                }
              }) => {
                const sonuç = await yöneticiİçinRandevuEkle({
                  açıklama,
                  proje,
                  gün,
                  başlangıçZamanı,
                  bitişZamanı,
                  gereçler,
                  araçlar
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
                  açıklama: t.String(),
                  proje: t.Numeric(),
                  gün: t.String(),
                  başlangıçZamanı: t.String(),
                  bitişZamanı: t.String(),
                  gereçler: t.Array(t.Tuple([t.Numeric(), t.Numeric()])),
                  araçlar: t.Array(t.Numeric())
                })
              }
            )
            .patch(
              '/randevular/:id',
              async ({
                params: { id },
                body: {
                  açıklama,
                  proje,
                  gün,
                  başlangıçZamanı,
                  bitişZamanı,
                  gereçler,
                  araçlar
                }
              }) => {
                const sonuç = await yöneticiİçinRandevuGüncelle(id, {
                  açıklama,
                  proje,
                  gün,
                  başlangıçZamanı,
                  bitişZamanı,
                  gereçler,
                  araçlar
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
                  açıklama: t.String(),
                  proje: t.Numeric(),
                  gün: t.String(),
                  başlangıçZamanı: t.String(),
                  bitişZamanı: t.String(),
                  gereçler: t.Array(t.Tuple([t.Numeric(), t.Numeric()])),
                  araçlar: t.Array(t.Numeric())
                })
              }
            )
            .delete(
              '/randevular/:id',
              async ({ params: { id } }) => {
                const sonuç = await yöneticiİçinRandevuSil(id)
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
            .get(
              '/tatiller',
              async ({ query: { arama, sayfa, sayfaBoyutu } }) => {
                const sonrakiArama = arama || ''
                const sonrakiSayfa = sayfa || 1
                const sonrakiSayfaBoyutu = sayfaBoyutu || 10
                const tatiller = await tatilleriYöneticiİçinListele(
                  sonrakiArama,
                  sonrakiSayfa,
                  sonrakiSayfaBoyutu
                )
                const cevap = await JSON.stringify({
                  toplam: await tatilleriYöneticiİçinSay(sonrakiArama),
                  sayfa: sonrakiSayfa,
                  sayfaBoyutu: sonrakiSayfaBoyutu,
                  içerik: tatiller
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
              '/tatiller/:id',
              async ({ params: { id } }) => {
                const sonuç = await tatiliYöneticiİçinDetaylıOku(id)
                const cevap = await JSON.stringify(
                  sonuç ? sonuç : 'Tatil bulunamadı.'
                )
                return new Response(cevap, {
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                  status: sonuç ? 200 : 404
                })
              },
              {
                params: t.Object({
                  id: t.Numeric()
                })
              }
            )
            .post(
              '/tatiller',
              async ({ body: { başlangıçTarihi, bitişTarihi, açıklama } }) => {
                const sonuç = await yöneticiİçinTatilEkle({
                  başlangıçTarihi,
                  bitişTarihi,
                  açıklama
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
                  başlangıçTarihi: t.String(),
                  bitişTarihi: t.String(),
                  açıklama: t.String()
                })
              }
            )
            .patch(
              '/tatiller/:id',
              async ({
                params: { id },
                body: { başlangıçTarihi, bitişTarihi, açıklama }
              }) => {
                const sonuç = await yöneticiİçinTatilGüncelle(id, {
                  başlangıçTarihi,
                  bitişTarihi,
                  açıklama
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
                  başlangıçTarihi: t.String(),
                  bitişTarihi: t.String(),
                  açıklama: t.String()
                })
              }
            )
            .delete(
              '/tatiller/:id',
              async ({ params: { id } }) => {
                const sonuç = await yöneticiİçinTatilSil(id)
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
            .get(
              '/ziyaretler',
              async ({ query: { arama, sayfa, sayfaBoyutu } }) => {
                const sonrakiArama = arama || ''
                const sonrakiSayfa = sayfa || 1
                const sonrakiSayfaBoyutu = sayfaBoyutu || 10
                const ziyaretler = await ziyaretleriYöneticiİçinListele(
                  sonrakiArama,
                  sonrakiSayfa,
                  sonrakiSayfaBoyutu
                )
                const cevap = await JSON.stringify({
                  toplam: await ziyaretleriYöneticiİçinSay(sonrakiArama),
                  sayfa: sonrakiSayfa,
                  sayfaBoyutu: sonrakiSayfaBoyutu,
                  içerik: ziyaretler
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
              '/ziyaretler/:id',
              async ({ params: { id } }) => {
                const sonuç = await ziyaretiYöneticiİçinDetaylıOku(id)
                const cevap = await JSON.stringify(
                  sonuç ? sonuç : 'Ziyaret bulunamadı.'
                )
                return new Response(cevap, {
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                  status: sonuç ? 200 : 404
                })
              },
              {
                params: t.Object({
                  id: t.Numeric()
                })
              }
            )
            .post(
              '/ziyaretler',
              async ({
                body: {
                  gün,
                  başlangıçZamanı,
                  bitişZamanı,
                  ziyaretEden,
                  ziyaretçiSayısı
                }
              }) => {
                const sonuç = await yöneticiİçinZiyaretEkle({
                  gün,
                  başlangıçZamanı,
                  bitişZamanı,
                  ziyaretEden,
                  ziyaretçiSayısı
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
                  gün: t.String(),
                  başlangıçZamanı: t.String(),
                  bitişZamanı: t.String(),
                  ziyaretEden: t.String(),
                  ziyaretçiSayısı: t.Numeric()
                })
              }
            )
            .patch(
              '/ziyaretler/:id',
              async ({
                params: { id },
                body: {
                  gün,
                  başlangıçZamanı,
                  bitişZamanı,
                  ziyaretEden,
                  ziyaretçiSayısı
                }
              }) => {
                const sonuç = await yöneticiİçinZiyaretGüncelle(id, {
                  gün,
                  başlangıçZamanı,
                  bitişZamanı,
                  ziyaretEden,
                  ziyaretçiSayısı
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
                  gün: t.String(),
                  başlangıçZamanı: t.String(),
                  bitişZamanı: t.String(),
                  ziyaretEden: t.String(),
                  ziyaretçiSayısı: t.Numeric()
                })
              }
            )
            .delete(
              '/ziyaretler/:id',
              async ({ params: { id } }) => {
                const sonuç = await yöneticiİçinZiyaretSil(id)
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
        }
      )
  })
export default arkayüz
