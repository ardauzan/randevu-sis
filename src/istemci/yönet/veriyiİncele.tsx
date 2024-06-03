import React, { useContext, useEffect } from 'react'
import {
  ArrowLongLeftIcon,
  ArrowPathIcon,
  TrashIcon
} from '@heroicons/react/20/solid'
import Yükleniyor from '@/istemci/ortak/yükleniyor'
import VeriListesi from '@/istemci/ortak/veriListesi'
import Durum from '@/istemci/yönet/durum'
import { yöneticiİçinDetaylıOku } from '@/istemci/kütüphane'
import {
  listele,
  oku,
  tazele,
  olmadı,
  okundu,
  güncelle,
  sil
} from '@/istemci/yönet/aksiyonlar'

export default function Veriyiİncele() {
  const { durum, aksiyonYayınla } = useContext(Durum)
  const spesifikDurum = durum as OkuDurum
  useEffect(() => {
    let tazeleReferans: Timer
    const vazgeç = new AbortController()
    const { signal } = vazgeç
    if (spesifikDurum.yükleniyor)
      yöneticiİçinDetaylıOku(
        spesifikDurum.tablo,
        typeof spesifikDurum.veri === 'number'
          ? spesifikDurum.veri
          : spesifikDurum.veri.id,
        signal
      ).then(
        (veri) => aksiyonYayınla(okundu(veri)),
        (hata) => aksiyonYayınla(olmadı(hata.message))
      )
    else
      tazeleReferans = setTimeout(() => {
        aksiyonYayınla(tazele())
      }, 10000)

    return () => {
      clearTimeout(tazeleReferans)
      vazgeç.abort()
    }
  }, [spesifikDurum])
  return (
    <article className="mt-10 flex size-full flex-col p-2 sm:mt-0">
      {typeof spesifikDurum.veri === 'number' ? (
        <Yükleniyor />
      ) : (
        <>
          <section className="mt-2 flex items-end justify-between rounded-lg border border-black bg-gray-600 p-2">
            <button
              className="flex flex-col items-center text-white"
              onClick={() => aksiyonYayınla(listele())}
            >
              <ArrowLongLeftIcon className="size-8" />
              <span className="font-serif font-semibold">Geri</span>
            </button>
            <button
              className="flex flex-col items-center text-yellow-400"
              onClick={() => {
                aksiyonYayınla(
                  güncelle([
                    (spesifikDurum.veri as DetaylıVeri).id,
                    (() => {
                      switch (spesifikDurum.tablo) {
                        case 'kişiler':
                          const kişi = spesifikDurum.veri as DetaylıKişi
                          return {
                            yönetici: kişi.yönetici,
                            öğrenciNo: kişi.öğrenciNo,
                            ad: kişi.ad,
                            soyAd: kişi.soyAd,
                            email: kişi.email,
                            şifre: '',
                            projeler: kişi.projeler.map((p) => p.id)
                          }
                        case 'projeler':
                          const proje = spesifikDurum.veri as DetaylıProje
                          return {
                            ad: proje.ad,
                            başlangıçTarihi: proje.başlangıçTarihi,
                            bitişTarihi: proje.bitişTarihi,
                            açıklama: proje.açıklama,
                            üyeler: proje.üyeler.map((k) => k.id)
                          }
                        case 'gereçler':
                          const gereç = spesifikDurum.veri as ListelenenGereç
                          return {
                            ad: gereç.ad,
                            adet: gereç.adet
                          }
                        case 'araçlar':
                          const araç = spesifikDurum.veri as ListelenenAraç
                          return {
                            ad: araç.ad,
                            açıklama: araç.açıklama,
                            arızalı: araç.arızalı
                          }
                        case 'randevular':
                          const randevu = spesifikDurum.veri as DetaylıRandevu
                          return {
                            açıklama: randevu.açıklama,
                            proje: randevu.proje.id,
                            gün: randevu.gün,
                            başlangıçZamanı: randevu.başlangıçZamanı,
                            bitişZamanı: randevu.bitişZamanı,
                            gereçler: randevu.gereçler.map((g) => [
                              g[0].id,
                              g[1]
                            ]),
                            araçlar: randevu.araçlar.map((a) => a.id)
                          }
                        case 'tatiller':
                          const tatil = spesifikDurum.veri as ListelenenTatil
                          return {
                            başlangıçTarihi: tatil.başlangıçTarihi,
                            bitişTarihi: tatil.bitişTarihi,
                            açıklama: tatil.açıklama
                          }
                        case 'ziyaretler':
                          const ziyaret =
                            spesifikDurum.veri as ListelenenZiyaret
                          return {
                            gün: ziyaret.gün,
                            başlangıçZamanı: ziyaret.başlangıçZamanı,
                            bitişZamanı: ziyaret.bitişZamanı,
                            ziyaretEden: ziyaret.ziyaretEden,
                            ziyaretçiSayısı: ziyaret.ziyaretçiSayısı
                          }
                      }
                    })()
                  ])
                )
              }}
            >
              <ArrowPathIcon className="size-8" />
              <span className="font-serif font-semibold">Güncelle</span>
            </button>
            <button
              className="flex flex-col items-center text-red-800"
              onClick={() => {
                aksiyonYayınla(sil((spesifikDurum.veri as DetaylıVeri).id))
              }}
            >
              <TrashIcon className="size-8" />
              <span className="font-serif font-semibold">Sil</span>
            </button>
          </section>
          <section className="mt-2 flex size-full flex-col gap-4 space-y-2 rounded-lg border border-black bg-white p-4 sm:w-full">
            {(() => {
              switch (spesifikDurum.tablo) {
                case 'kişiler':
                  const kişi = spesifikDurum.veri as DetaylıKişi
                  const projelerBoyut = kişi.projeler.length
                  return (
                    <>
                      <h1 className="font-mono text-3xl font-bold">
                        Kişi: {kişi.id}
                      </h1>
                      <p>Yönetici: {kişi.yönetici ? 'Evet' : 'Hayır'}</p>
                      <h2 className="font-serif text-2xl font-bold">
                        {kişi.öğrenciNo} no lu, {kişi.ad} {kişi.soyAd}.
                      </h2>
                      <p className="font-serif text-lg">
                        E-Posta: {kişi.email}
                      </p>
                      <h3 className="font-serif text-xl font-bold">
                        Projeler:
                      </h3>
                      <VeriListesi
                        veriler={kişi.projeler}
                        tablo="projeler"
                        sayfaBoyutu={projelerBoyut}
                        toplam={projelerBoyut}
                      />
                    </>
                  )
                case 'projeler':
                  const proje = spesifikDurum.veri as DetaylıProje
                  const üyelerBoyut = proje.üyeler.length
                  return (
                    <>
                      <h1 className="font-mono text-3xl font-bold">
                        Proje: {proje.id}
                      </h1>
                      <h2 className="font-serif text-2xl font-bold">
                        {proje.ad} adındaki, {proje.başlangıçTarihi} tarihinde
                        başlayıp {proje.bitişTarihi} tarihinde biten proje.
                      </h2>
                      <p className="font-serif text-lg">
                        Açıklama: {proje.açıklama}
                      </p>
                      <h3 className="font-serif text-xl font-bold">Üyeler:</h3>
                      <VeriListesi
                        veriler={proje.üyeler}
                        tablo="kişiler"
                        sayfaBoyutu={üyelerBoyut}
                        toplam={üyelerBoyut}
                      />
                    </>
                  )
                case 'gereçler':
                  const gereç = spesifikDurum.veri as ListelenenGereç
                  return (
                    <>
                      <h1 className="font-mono text-3xl font-bold">
                        Gereç: {gereç.id}
                      </h1>
                      <h2 className="font-serif text-2xl font-bold">
                        {gereç.ad} adındaki gereç.
                      </h2>
                      <p className="font-serif text-lg">adet: {gereç.adet}</p>
                    </>
                  )
                case 'araçlar':
                  const araç = spesifikDurum.veri as ListelenenAraç
                  return (
                    <>
                      <h1 className="font-mono text-3xl font-bold">
                        Araç: {araç.id}
                      </h1>
                      <h2 className="font-serif text-2xl font-bold">
                        {araç.ad} adındaki araç.
                      </h2>
                      <p className="font-serif text-lg">
                        {araç.arızalı ? 'Arızalı' : 'Arızasız'}
                      </p>
                    </>
                  )
                case 'randevular':
                  const randevu = spesifikDurum.veri as DetaylıRandevu
                  const gereçlerBoyut = randevu.gereçler.length
                  const araçlarBoyut = randevu.araçlar.length
                  return (
                    <>
                      <h1 className="font-mono text-3xl font-bold">
                        Randevu: {randevu.id}
                      </h1>
                      <h2 className="font-serif text-2xl font-bold">
                        Açıklama: {randevu.açıklama}
                      </h2>
                      <p className="font-serif text-lg">
                        Proje:{' '}
                        <button
                          onClick={() =>
                            aksiyonYayınla(oku('projeler', randevu.proje.id))
                          }
                          className="font-serif text-blue-500 underline hover:text-blue-600 hover:no-underline focus:no-underline"
                        >
                          {randevu.proje.ad}
                        </button>
                      </p>
                      <p className="font-serif text-lg">Gün: {randevu.gün}</p>
                      <p className="font-serif text-lg">
                        Başlangıç Zamanı: {randevu.başlangıçZamanı}
                      </p>
                      <p className="font-serif text-lg">
                        Bitiş Zamanı: {randevu.bitişZamanı}
                      </p>
                      <h3 className="font-serif text-xl font-bold">
                        Gereçler:
                      </h3>
                      {(() => {
                        const sonrakiGereçler = randevu.gereçler.map((g) => {
                          const [gereç, talepEdilenAdet] = g
                          const { id, ad, adet } = gereç
                          return { id, ad, talepEdilenAdet, ToplamAdet: adet }
                        })
                        return (
                          <VeriListesi
                            veriler={sonrakiGereçler}
                            tablo="gereçler"
                            sayfaBoyutu={gereçlerBoyut}
                            toplam={gereçlerBoyut}
                          />
                        )
                      })()}
                      <h3 className="font-serif text-xl font-bold">Araçlar:</h3>
                      <VeriListesi
                        veriler={randevu.araçlar}
                        tablo="araçlar"
                        sayfaBoyutu={araçlarBoyut}
                        toplam={araçlarBoyut}
                      />
                    </>
                  )
                case 'tatiller':
                  const tatil = spesifikDurum.veri as ListelenenTatil
                  return (
                    <>
                      <h1 className="font-mono text-3xl font-bold">
                        Tatil: {tatil.id}
                      </h1>
                      <h2 className="font-serif text-2xl font-bold">
                        {tatil.başlangıçTarihi} tarihinden başlayıp{' '}
                        {tatil.bitişTarihi} tarihinde biten tatil.
                      </h2>
                      <p className="font-serif text-lg">
                        Açıklama: {tatil.açıklama}
                      </p>
                    </>
                  )
                case 'ziyaretler':
                  const ziyaret = spesifikDurum.veri as ListelenenZiyaret
                  return (
                    <>
                      <h1 className="font-mono text-3xl font-bold">
                        Ziyaret: {ziyaret.id}
                      </h1>
                      <h2 className="font-serif text-2xl font-bold">
                        {ziyaret.gün} günü, {ziyaret.başlangıçZamanı} ile{' '}
                        {ziyaret.bitişZamanı} arasında yapılan ziyaret.
                      </h2>
                      <p className="font-serif text-lg">
                        Ziyaret Eden: {ziyaret.ziyaretEden}
                      </p>
                      <p className="font-serif text-lg">
                        Ziyaretçi Sayısı: {ziyaret.ziyaretçiSayısı}
                      </p>
                    </>
                  )
              }
            })()}
          </section>
        </>
      )}
    </article>
  )
}
