//info Burası sunucu tarafının giriş noktasıdır.
import { Elysia } from 'elysia'
import { staticPlugin } from '@elysiajs/static'
import { renderToReadableStream } from 'react-dom/server'
import { createElement } from 'react'
import Anasayfa from '@/client/anasayfa/anasayfa'
import Admin from '@/client/admin/admin'
import Bulunamadı from '@/client/404/404'
import {
  kişileriSay,
  kişileriOku,
  kişiOku,
  kişiYarat,
  kişiGüncelle,
  kişiSil,
  projeleriSay,
  projeleriOku,
  projeOku,
  projeYarat,
  projeGüncelle,
  projeSil,
  gereçleriSay,
  gereçleriOku,
  gereçOku,
  gereçYarat,
  gereçGüncelle,
  gereçSil,
  araçlarıSay,
  araçlarıOku,
  araçOku,
  araçYarat,
  araçGüncelle,
  araçSil,
  randevularıSay,
  randevularıOku,
  randevuOku,
  randevuYarat,
  randevuGüncelle,
  randevuSil,
  tatilleriSay,
  tatilleriOku,
  tatilOku,
  tatilYarat,
  tatilGüncelle,
  tatilSil,
  ziyaretleriSay,
  ziyaretleriOku,
  ziyaretOku,
  ziyaretYarat,
  ziyaretGüncelle,
  ziyaretSil
} from '@/server/lib'

//info Sunucumuzu oluşturuyoruz.
//info /public dizinini statik dosyalar için kullanacağız.
export default function sunucuyuOluştur() {
  const app = new Elysia()
    .use(staticPlugin())
    .get('/', async () => {
      return new Response(
        await renderToReadableStream(createElement(Anasayfa), {
          bootstrapScripts: ['/public/anasayfa.js']
        }),
        {
          headers: { 'Content-Type': 'text/html' }
        }
      )
    })
    .get('/admin', async () => {
      return new Response(
        await renderToReadableStream(createElement(Admin), {
          bootstrapScripts: ['/public/admin.js']
        }),
        {
          headers: { 'Content-Type': 'text/html' }
        }
      )
    })
    .get('/api/kisi', async ({ query: { arama, sayfa, sayfaBoyutu } }) => {
      const _arama = arama || ''
      const _sayfa = sayfa ? parseInt(sayfa) : 1
      const _sayfaBoyutu = sayfaBoyutu ? parseInt(sayfaBoyutu) : 10
      try {
        const total = await kişileriSay(_arama)
        const içerik = await kişileriOku(_arama, _sayfa, _sayfaBoyutu)
        return {
          durum: 'Başarılı',
          total,
          sayfa: _sayfa,
          sayfaBoyutu: _sayfaBoyutu,
          içerik
        }
      } catch (e) {
        console.error(e)
        return { durum: 'Başarısız' }
      }
    })
    .get('/api/kisi/:id', async ({ params: { id } }) => {
      try {
        const içerik = await kişiOku(parseInt(id))
        return { durum: 'Başarılı', içerik }
      } catch (e) {
        console.error(e)
        return { durum: 'Başarısız' }
      }
    })
    .post('/api/kisi', async ({ body }) => {
      const { öğrenciNo, ad, soyAd, email, şifre } = body as İstemciKaynaklıKişi
      try {
        await kişiYarat(öğrenciNo, ad, soyAd, email, şifre as string)
        return { durum: 'Başarılı' }
      } catch (e) {
        console.error(e)
        return { durum: 'Başarısız' }
      }
    })
    .patch('/api/kisi/:id', async ({ params: { id }, body }) => {
      try {
        await kişiGüncelle(parseInt(id), body as Kişi)
        return { durum: 'Başarılı' }
      } catch (e) {
        console.error(e)
        return { durum: 'Başarısız' }
      }
    })
    .delete('/api/kisi/:id', async ({ params: { id } }) => {
      try {
        await kişiSil(parseInt(id))
        return { durum: 'Başarılı' }
      } catch (e) {
        console.error(e)
        return { durum: 'Başarısız' }
      }
    })
    .get('/api/proje', async ({ query: { arama, sayfa, sayfaBoyutu } }) => {
      const _arama = arama || ''
      const _sayfa = sayfa ? parseInt(sayfa) : 1
      const _sayfaBoyutu = sayfaBoyutu ? parseInt(sayfaBoyutu) : 10
      try {
        const total = await projeleriSay(_arama)
        const içerik = await projeleriOku(_arama, _sayfa, _sayfaBoyutu)
        return {
          durum: 'Başarılı',
          total,
          sayfa: _sayfa,
          sayfaBoyutu: _sayfaBoyutu,
          içerik
        }
      } catch (e) {
        console.error(e)
        return { durum: 'Başarısız' }
      }
    })
    .get('/api/proje/:id', async ({ params: { id } }) => {
      try {
        const içerik = await projeOku(parseInt(id))
        return { durum: 'Başarılı', içerik }
      } catch (e) {
        console.error(e)
        return { durum: 'Başarısız' }
      }
    })
    .post('/api/proje', async ({ body }) => {
      const { ad, başlangıçTarihi, bitişTarihi, açıklama, üyeler } =
        body as Proje
      try {
        await projeYarat(
          ad,
          başlangıçTarihi,
          bitişTarihi,
          açıklama,
          üyeler as number[]
        )
        return { durum: 'Başarılı' }
      } catch (e) {
        console.error(e)
        return { durum: 'Başarısız' }
      }
    })
    .patch('/api/proje/:id', async ({ params: { id }, body }) => {
      try {
        await projeGüncelle(parseInt(id), body as Proje, pool)
        return { durum: 'Başarılı' }
      } catch (e) {
        console.error(e)
        return { durum: 'Başarısız' }
      }
    })
    .delete('/api/proje/:id', async ({ params: { id } }) => {
      try {
        await projeSil(parseInt(id), pool)
        return { durum: 'Başarılı' }
      } catch (e) {
        console.error(e)
        return { durum: 'Başarısız' }
      }
    })
    .get('/api/gerec', async ({ query: { arama, sayfa, sayfaBoyutu } }) => {
      const _arama = arama || ''
      const _sayfa = sayfa ? parseInt(sayfa) : 1
      const _sayfaBoyutu = sayfaBoyutu ? parseInt(sayfaBoyutu) : 10
      try {
        const total = await gereçleriSay(_arama, pool)
        const içerik = await gereçleriOku(_arama, _sayfa, _sayfaBoyutu, pool)
        return {
          durum: 'Başarılı',
          total,
          sayfa: _sayfa,
          sayfaBoyutu: _sayfaBoyutu,
          içerik
        }
      } catch (e) {
        console.error(e)
        return { durum: 'Başarısız' }
      }
    })
    .get('/api/gerec/:id', async ({ params: { id } }) => {
      try {
        const içerik = await gereçOku(parseInt(id), pool)
        return { durum: 'Başarılı', içerik }
      } catch (e) {
        console.error(e)
        return { durum: 'Başarısız' }
      }
    })
    .post('/api/gerec', async ({ body }) => {
      const { ad, adet } = body as Gereç
      try {
        await gereçYarat(ad, adet, pool)
        return { durum: 'Başarılı' }
      } catch (e) {
        console.error(e)
        return { durum: 'Başarısız' }
      }
    })
    .patch('/api/gerec/:id', async ({ params: { id }, body }) => {
      try {
        await gereçGüncelle(parseInt(id), body as Gereç, pool)
        return { durum: 'Başarılı' }
      } catch (e) {
        console.error(e)
        return { durum: 'Başarısız' }
      }
    })
    .delete('/api/gerec/:id', async ({ params: { id } }) => {
      try {
        await gereçSil(parseInt(id), pool)
        return { durum: 'Başarılı' }
      } catch (e) {
        console.error(e)
        return { durum: 'Başarısız' }
      }
    })
    .get('/api/arac', async ({ query: { arama, sayfa, sayfaBoyutu } }) => {
      const _arama = arama || ''
      const _sayfa = sayfa ? parseInt(sayfa) : 1
      const _sayfaBoyutu = sayfaBoyutu ? parseInt(sayfaBoyutu) : 10
      try {
        const total = await sarflarıSay(_arama, pool)
        const içerik = await sarflarıOku(_arama, _sayfa, _sayfaBoyutu, pool)
        return {
          durum: 'Başarılı',
          total,
          sayfa: _sayfa,
          sayfaBoyutu: _sayfaBoyutu,
          içerik
        }
      } catch (e) {
        console.error(e)
        return { durum: 'Başarısız' }
      }
    })
    .get('/api/arac/:id', async ({ params: { id } }) => {
      try {
        const içerik = await sarfOku(parseInt(id), pool)
        return { durum: 'Başarılı', içerik }
      } catch (e) {
        console.error(e)
        return { durum: 'Başarısız' }
      }
    })
    .post('/api/arac', async ({ body }) => {
      const { ad, açıklama, arızalı } = body as Sarf
      try {
        await sarfYarat(ad, açıklama, arızalı, pool)
        return { durum: 'Başarılı' }
      } catch (e) {
        console.error(e)
        return { durum: 'Başarısız' }
      }
    })
    .patch('/api/arac/:id', async ({ params: { id }, body }) => {
      try {
        await sarfGüncelle(parseInt(id), body as Sarf, pool)
        return { durum: 'Başarılı' }
      } catch (e) {
        console.error(e)
        return { durum: 'Başarısız' }
      }
    })
    .delete('/api/arac/:id', async ({ params: { id } }) => {
      try {
        await sarfSil(parseInt(id), pool)
        return { durum: 'Başarılı' }
      } catch (e) {
        console.error(e)
        return { durum: 'Başarısız' }
      }
    })
    .get(
      '/api/randevu',
      async ({
        query: { buTarihtenÖnce, buTarihtenSonra, sayfa, sayfaBoyutu }
      }) => {
        const _sayfa = sayfa ? parseInt(sayfa) : 1
        const _sayfaBoyutu = sayfaBoyutu ? parseInt(sayfaBoyutu) : 10
        try {
          const total = await randevularıSay(
            pool,
            buTarihtenÖnce,
            buTarihtenSonra
          )
          const içerik = await randevularıOku(
            buTarihtenÖnce,
            buTarihtenSonra,
            _sayfa,
            _sayfaBoyutu,
            pool
          )
          return {
            durum: 'Başarılı',
            total,
            sayfa: _sayfa,
            sayfaBoyutu: _sayfaBoyutu,
            içerik
          }
        } catch (e) {
          console.error(e)
          return { durum: 'Başarısız' }
        }
      }
    )
    .get('/api/randevu/:id', async ({ params: { id } }) => {
      try {
        const içerik = await randevuOku(parseInt(id), pool)
        return { durum: 'Başarılı', içerik }
      } catch (e) {
        console.error(e)
        return { durum: 'Başarısız' }
      }
    })
    .post('/api/randevu', async ({ body }) => {
      const {
        açıklama,
        proje,
        gereçler,
        sarflar,
        gün,
        başlangıçzamanı,
        bitişzamanı
      } = body as Randevu
      try {
        await randevuYarat(
          açıklama,
          proje,
          gereçler,
          sarflar,
          gün,
          başlangıçzamanı,
          bitişzamanı,
          pool
        )
        return { durum: 'Başarılı' }
      } catch (e) {
        console.error(e)
        return { durum: 'Başarısız' }
      }
    })
    .patch('/api/randevu/:id', async ({ params: { id }, body }) => {
      try {
        await randevuGüncelle(parseInt(id), body as Randevu, pool)
        return { durum: 'Başarılı' }
      } catch (e) {
        console.error(e)
        return { durum: 'Başarısız' }
      }
    })
    .delete('/api/randevu/:id', async ({ params: { id } }) => {
      try {
        await randevuSil(parseInt(id), pool)
        return { durum: 'Başarılı' }
      } catch (e) {
        console.error(e)
        return { durum: 'Başarısız' }
      }
    })
    .get('/api/tatil', async ({ query: { arama, sayfa, sayfaBoyutu } }) => {
      return {
        total: await tatilleriSay(arama || '', pool),
        sayfa: sayfa ? parseInt(sayfa) : 1,
        sayfaBoyutu: sayfaBoyutu ? parseInt(sayfaBoyutu) : 10,
        içerik: await tatilleriOku(
          arama || '',
          sayfa ? parseInt(sayfa) : 1,
          sayfaBoyutu ? parseInt(sayfaBoyutu) : 10,
          pool
        )
      }
    })
    .get('/api/tatil/:id', async ({ params: { id } }) => {
      return tatilOku(parseInt(id), pool)
    })
    .post('/api/tatil', async ({ body }) => {
      const { açıklama, başlangıç, bitiş } = body as Tatil
      await tatilYarat(açıklama, başlangıç, bitiş, pool)
      return { message: 'Tatil yaratıldı' }
    })
    .patch('/api/tatil/:id', async ({ params: { id }, body }) => {
      await tatilGüncelle(parseInt(id), body as Tatil, pool)
      return { message: 'Tatil güncellendi' }
    })
    .delete('/api/tatil/:id', async ({ params: { id } }) => {
      await tatilSil(parseInt(id), pool)
      return { message: 'Tatil silindi' }
    })
    .get('/api/ziyaret', async ({ query: { arama, sayfa, sayfaBoyutu } }) => {
      return {
        total: await ziyaretleriSay(arama || '', pool),
        sayfa: sayfa ? parseInt(sayfa) : 1,
        sayfaBoyutu: sayfaBoyutu ? parseInt(sayfaBoyutu) : 10,
        içerik: await ziyaretleriOku(
          arama || '',
          sayfa ? parseInt(sayfa) : 1,
          sayfaBoyutu ? parseInt(sayfaBoyutu) : 10,
          pool
        )
      }
    })
    .get('/api/ziyaret/:id', async ({ params: { id } }) => {
      return ziyaretOku(parseInt(id), pool)
    })
    .post('/api/ziyaret', async ({ body }) => {
      const {
        ziyareteden,
        ziyaretçisayısı,
        gün,
        başlangıçzamanı,
        bitişzamanı
      } = body as Ziyaret
      await ziyaretYarat(
        ziyareteden,
        ziyaretçisayısı,
        gün,
        başlangıçzamanı,
        bitişzamanı,
        pool
      )
      return { message: 'Ziyaret yaratıldı' }
    })
    .patch('/api/ziyaret/:id', async ({ params: { id }, body }) => {
      await ziyaretGüncelle(parseInt(id), body as Ziyaret, pool)
      return { message: 'Ziyaret güncellendi' }
    })
    .delete('/api/ziyaret/:id', async ({ params: { id } }) => {
      await ziyaretSil(parseInt(id), pool)
      return { message: 'Ziyaret silindi' }
    })
    .onError(async ({ code }) => {
      if (code === 'NOT_FOUND')
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
