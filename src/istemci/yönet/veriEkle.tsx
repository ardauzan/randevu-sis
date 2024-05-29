import React, { useContext, useState, useEffect } from 'react'
import { ArrowLongLeftIcon } from '@heroicons/react/20/solid'
import Yükleniyor from '@/istemci/ortak/yükleniyor'
import Durum from '@/istemci/yönet/durum'
import { listele, oku, ekle, tetikle, olmadı } from '@/istemci/yönet/aksiyonlar'
import {
  kişiOluştururkenkiProjeleriSeç,
  projeOluştururkenkiÜyeleriSeç,
  randevuOlustururkenkiGereçleriSeç,
  randevuOlustururkenkiAraçlarıSeç,
  yöneticiİçinEkle
} from '@/istemci/kütüphane'

export default function VeriEkle() {
  const { durum, aksiyonYayınla } = useContext(Durum)
  const spesifikDurum = durum as EkleDurum
  const [kişiProjeleri, setKişiProjeleri] = useState('') //# Kişi oluştururkenki projeleri seçmek için
  const [projeÜyeleri, setProjeÜyeleri] = useState('') //# Proje oluştururkenki üyeleri seçmek için
  const [randevuGereçleri, setRandevuGereçleri] = useState('') //# Randevu oluştururkenki gereçleri seçmek için
  const [randevuAraçları, setRandevuAraçları] = useState('') //# Randevu oluştururkenki araçları seçmek için

  useEffect(() => {
    if (spesifikDurum.yükleniyor) {
      yöneticiİçinEkle(spesifikDurum.tablo, spesifikDurum.veri)
        .then((id) => aksiyonYayınla(oku(spesifikDurum.tablo, id)))
        .catch((hata) => aksiyonYayınla(olmadı(hata.message)))
    }
  }, [spesifikDurum.yükleniyor])
  useEffect(() => {
    if (
      spesifikDurum.tablo === 'kişiler' &&
      /^\d+(,\d+)*,?$/g.test(kişiProjeleri)
    )
      aksiyonYayınla(
        ekle({
          ...spesifikDurum.veri,
          projeler: kişiOluştururkenkiProjeleriSeç(kişiProjeleri)
        })
      )
    else if (spesifikDurum.tablo === 'kişiler')
      aksiyonYayınla(ekle({ ...spesifikDurum.veri, projeler: [] }))
  }, [kişiProjeleri])
  useEffect(() => {
    if (
      spesifikDurum.tablo === 'projeler' &&
      /^\d+(,\d+)*,?$/g.test(projeÜyeleri)
    )
      aksiyonYayınla(
        ekle({
          ...spesifikDurum.veri,
          üyeler: projeOluştururkenkiÜyeleriSeç(projeÜyeleri)
        })
      )
    else if (spesifikDurum.tablo === 'projeler')
      aksiyonYayınla(ekle({ ...spesifikDurum.veri, üyeler: [] }))
  }, [projeÜyeleri])
  useEffect(() => {
    if (
      spesifikDurum.tablo === 'randevular' &&
      /^(\d:\d)(,\d:\d)*,?$/g.test(randevuGereçleri)
    )
      aksiyonYayınla(
        ekle({
          ...spesifikDurum.veri,
          gereçler: randevuOlustururkenkiGereçleriSeç(randevuGereçleri)
        })
      )
    else if (spesifikDurum.tablo === 'randevular')
      aksiyonYayınla(ekle({ ...spesifikDurum.veri, gereçler: [] }))
  }, [randevuGereçleri])
  useEffect(() => {
    if (
      spesifikDurum.tablo === 'randevular' &&
      /^\d+(,\d+)*,?$/g.test(randevuAraçları)
    )
      aksiyonYayınla(
        ekle({
          ...spesifikDurum.veri,
          araçlar: randevuOlustururkenkiAraçlarıSeç(randevuAraçları)
        })
      )
    else if (spesifikDurum.tablo === 'randevular')
      aksiyonYayınla(ekle({ ...spesifikDurum.veri, araçlar: [] }))
  }, [randevuAraçları])
  return (
    <article className="mt-10 flex size-full flex-col p-2 sm:mt-0">
      {spesifikDurum.yükleniyor ? (
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
          </section>
          <section className="mt-2 flex size-full flex-col gap-4 space-y-2 rounded-lg border border-black bg-white p-4 sm:w-full">
            <form
              className="flex flex-col"
              onSubmit={(e) => {
                e.preventDefault()
                aksiyonYayınla(tetikle())
              }}
            >
              {(() => {
                switch (spesifikDurum.tablo) {
                  case 'kişiler':
                    const oluşturulacakKişi =
                      spesifikDurum.veri as OluşturulacakKişi
                    return (
                      <>
                        <h1 className="font-mono text-3xl font-bold">
                          Kişi ekle
                        </h1>
                        <label htmlFor="yönetici">Yönetici</label>
                        <input
                          type="checkbox"
                          id="yönetici"
                          name="yönetici"
                          checked={oluşturulacakKişi.yönetici}
                          onChange={(e) => {
                            aksiyonYayınla(
                              ekle({
                                ...oluşturulacakKişi,
                                yönetici: e.target.checked
                              })
                            )
                          }}
                          className="border border-black"
                        />
                        <label htmlFor="öğrenciNo">Öğrenci No</label>
                        <input
                          type="number"
                          id="öğrenciNo"
                          name="öğrenciNo"
                          required
                          value={
                            oluşturulacakKişi.öğrenciNo === 0
                              ? ''
                              : oluşturulacakKişi.öğrenciNo
                          }
                          onChange={(e) => {
                            aksiyonYayınla(
                              ekle({
                                ...oluşturulacakKişi,
                                öğrenciNo: e.target.value
                                  ? parseInt(e.target.value)
                                  : 0
                              })
                            )
                          }}
                          min={0}
                          className="border border-black"
                        />
                        <label htmlFor="ad">Ad</label>
                        <input
                          type="text"
                          id="ad"
                          name="ad"
                          required
                          value={oluşturulacakKişi.ad}
                          onChange={(e) => {
                            aksiyonYayınla(
                              ekle({ ...oluşturulacakKişi, ad: e.target.value })
                            )
                          }}
                          className="border border-black"
                        />
                        <label htmlFor="soyAd">Soyad</label>
                        <input
                          type="text"
                          id="soyAd"
                          name="soyAd"
                          required
                          value={oluşturulacakKişi.soyAd}
                          onChange={(e) => {
                            aksiyonYayınla(
                              ekle({
                                ...oluşturulacakKişi,
                                soyAd: e.target.value
                              })
                            )
                          }}
                          className="border border-black"
                        />
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          autoComplete="off"
                          required
                          value={oluşturulacakKişi.email}
                          onChange={(e) => {
                            aksiyonYayınla(
                              ekle({
                                ...oluşturulacakKişi,
                                email: e.target.value
                              })
                            )
                          }}
                          className="border border-black"
                        />
                        <label htmlFor="şifre">Şifre</label>
                        <input
                          type="password"
                          id="şifre"
                          name="şifre"
                          autoComplete="off"
                          required
                          value={oluşturulacakKişi.şifre}
                          onChange={(e) => {
                            aksiyonYayınla(
                              ekle({
                                ...oluşturulacakKişi,
                                şifre: e.target.value
                              })
                            )
                          }}
                          className="border border-black"
                        />
                        <label htmlFor="projeler">Projeler</label>
                        <input
                          type="text"
                          id="projeler"
                          name="projeler"
                          value={kişiProjeleri}
                          onChange={(e) => setKişiProjeleri(e.target.value)}
                          className="border border-black"
                        />
                      </>
                    )
                  case 'projeler':
                    const oluşturulacakProje =
                      spesifikDurum.veri as OluşturulacakProje
                    return (
                      <>
                        <h1 className="font-mono text-3xl font-bold">
                          Proje ekle
                        </h1>
                        <label htmlFor="ad">Ad</label>
                        <input
                          type="text"
                          id="ad"
                          name="ad"
                          required
                          value={oluşturulacakProje.ad}
                          onChange={(e) => {
                            aksiyonYayınla(
                              ekle({
                                ...oluşturulacakProje,
                                ad: e.target.value
                              })
                            )
                          }}
                          className="border border-black"
                        />
                        <label htmlFor="başlangıçTarihi">
                          Başlangıç Tarihi
                        </label>
                        <input
                          type="date"
                          id="başlangıçTarihi"
                          name="başlangıçTarihi"
                          required
                          value={oluşturulacakProje.başlangıçTarihi}
                          onChange={(e) => {
                            aksiyonYayınla(
                              ekle({
                                ...oluşturulacakProje,
                                başlangıçTarihi: e.target.value
                              })
                            )
                          }}
                          className="border border-black"
                        />
                        <label htmlFor="bitişTarihi">Bitiş Tarihi</label>
                        <input
                          type="date"
                          id="bitişTarihi"
                          name="bitişTarihi"
                          required
                          value={oluşturulacakProje.bitişTarihi}
                          onChange={(e) => {
                            aksiyonYayınla(
                              ekle({
                                ...oluşturulacakProje,
                                bitişTarihi: e.target.value
                              })
                            )
                          }}
                          className="border border-black"
                        />
                        <label htmlFor="açıklama">Açıklama</label>
                        <input
                          type="text"
                          id="açıklama"
                          name="açıklama"
                          required
                          value={oluşturulacakProje.açıklama}
                          onChange={(e) => {
                            aksiyonYayınla(
                              ekle({
                                ...oluşturulacakProje,
                                açıklama: e.target.value
                              })
                            )
                          }}
                          className="border border-black"
                        />
                        <label htmlFor="üyeler">Üyeler</label>
                        <input
                          type="text"
                          id="üyeler"
                          name="üyeler"
                          value={projeÜyeleri}
                          onChange={(e) => setProjeÜyeleri(e.target.value)}
                          className="border border-black"
                        />
                      </>
                    )
                  case 'gereçler':
                    const oluşturulacakGereç =
                      spesifikDurum.veri as OluşturulacakGereç
                    return (
                      <>
                        <h1 className="font-mono text-3xl font-bold">
                          Gereç ekle
                        </h1>
                        <label htmlFor="ad">Ad</label>
                        <input
                          type="text"
                          id="ad"
                          name="ad"
                          required
                          value={oluşturulacakGereç.ad}
                          onChange={(e) => {
                            aksiyonYayınla(
                              ekle({
                                ...oluşturulacakGereç,
                                ad: e.target.value
                              })
                            )
                          }}
                          className="border border-black"
                        />
                        <label htmlFor="adet">Adet</label>
                        <input
                          type="number"
                          id="adet"
                          name="adet"
                          required
                          value={oluşturulacakGereç.adet}
                          onChange={(e) => {
                            aksiyonYayınla(
                              ekle({
                                ...oluşturulacakGereç,
                                adet: e.target.value
                                  ? parseInt(e.target.value)
                                  : 0
                              })
                            )
                          }}
                          min={0}
                          className="border border-black"
                        />
                      </>
                    )
                  case 'araçlar':
                    const oluşturulacakAraç =
                      spesifikDurum.veri as OluşturulacakAraç
                    return (
                      <>
                        <h1 className="font-mono text-3xl font-bold">
                          Araç ekle
                        </h1>
                        <label htmlFor="ad">Ad</label>
                        <input
                          type="text"
                          id="ad"
                          name="ad"
                          required
                          value={oluşturulacakAraç.ad}
                          onChange={(e) => {
                            aksiyonYayınla(
                              ekle({
                                ...oluşturulacakAraç,
                                ad: e.target.value
                              })
                            )
                          }}
                          className="border border-black"
                        />
                        <label htmlFor="açıklama">Açıklama</label>
                        <input
                          type="text"
                          id="açıklama"
                          name="açıklama"
                          required
                          value={oluşturulacakAraç.açıklama}
                          onChange={(e) => {
                            aksiyonYayınla(
                              ekle({
                                ...oluşturulacakAraç,
                                açıklama: e.target.value
                              })
                            )
                          }}
                          className="border border-black"
                        />
                        <label htmlFor="arızalı">Arızalı</label>
                        <input
                          type="checkbox"
                          id="arızalı"
                          name="arızalı"
                          checked={oluşturulacakAraç.arızalı}
                          onChange={(e) => {
                            aksiyonYayınla(
                              ekle({
                                ...oluşturulacakAraç,
                                arızalı: e.target.checked
                              })
                            )
                          }}
                          className="border border-black"
                        />
                      </>
                    )
                  case 'randevular':
                    const oluşturulacakRandevu =
                      spesifikDurum.veri as OluşturulacakRandevu
                    return (
                      <>
                        <h1 className="font-mono text-3xl font-bold">
                          Randevu ekle
                        </h1>
                        <label htmlFor="açıklama">Açıklama</label>
                        <input
                          type="text"
                          id="açıklama"
                          name="açıklama"
                          required
                          value={oluşturulacakRandevu.açıklama}
                          onChange={(e) => {
                            aksiyonYayınla(
                              ekle({
                                ...oluşturulacakRandevu,
                                açıklama: e.target.value
                              })
                            )
                          }}
                          className="border border-black"
                        />
                        <label htmlFor="proje">Proje</label>
                        <input
                          type="number"
                          id="proje"
                          name="proje"
                          required
                          value={oluşturulacakRandevu.proje}
                          onChange={(e) => {
                            aksiyonYayınla(
                              ekle({
                                ...oluşturulacakRandevu,
                                proje: e.target.value
                                  ? parseInt(e.target.value)
                                  : 0
                              })
                            )
                          }}
                          min={0}
                          className="border border-black"
                        />
                        <label htmlFor="gün">Gün</label>
                        <input
                          type="date"
                          id="gün"
                          name="gün"
                          required
                          value={oluşturulacakRandevu.gün}
                          onChange={(e) => {
                            aksiyonYayınla(
                              ekle({
                                ...oluşturulacakRandevu,
                                gün: e.target.value
                              })
                            )
                          }}
                          className="border border-black"
                        />
                        <label htmlFor="başlangıçZamanı">
                          Başlangıç zamanı
                        </label>
                        <input
                          type="time"
                          id="başlangıçZamanı"
                          name="başlangıçZamanı"
                          required
                          value={oluşturulacakRandevu.başlangıçZamanı}
                          onChange={(e) => {
                            aksiyonYayınla(
                              ekle({
                                ...oluşturulacakRandevu,
                                başlangıçZamanı: e.target.value
                              })
                            )
                          }}
                          className="border border-black"
                        />
                        <label htmlFor="bitişZamanı">Bitiş zamanı</label>
                        <input
                          type="time"
                          id="bitişZamanı"
                          name="bitişZamanı"
                          required
                          value={oluşturulacakRandevu.bitişZamanı}
                          onChange={(e) => {
                            aksiyonYayınla(
                              ekle({
                                ...oluşturulacakRandevu,
                                bitişZamanı: e.target.value
                              })
                            )
                          }}
                          className="border border-black"
                        />
                        <label htmlFor="gereçler">Gereçler</label>
                        <input
                          type="text"
                          id="gereçler"
                          name="gereçler"
                          value={randevuGereçleri}
                          onChange={(e) => setRandevuGereçleri(e.target.value)}
                          className="border border-black"
                        />
                        <label htmlFor="araçlar">Araçlar</label>
                        <input
                          type="text"
                          id="araçlar"
                          name="araçlar"
                          value={randevuAraçları}
                          onChange={(e) => setRandevuAraçları(e.target.value)}
                          className="border border-black"
                        />
                      </>
                    )
                  case 'tatiller':
                    const oluşturulacakTatil =
                      spesifikDurum.veri as OluşturulacakTatil
                    return (
                      <>
                        <h1 className="font-mono text-3xl font-bold">
                          Tatil ekle
                        </h1>
                        <label htmlFor="başlangıçTarihi">
                          Başlangıç Tarihi
                        </label>
                        <input
                          type="date"
                          id="başlangıçTarihi"
                          name="başlangıçTarihi"
                          required
                          value={oluşturulacakTatil.başlangıçTarihi}
                          onChange={(e) => {
                            aksiyonYayınla(
                              ekle({
                                ...oluşturulacakTatil,
                                başlangıçTarihi: e.target.value
                              })
                            )
                          }}
                          className="border border-black"
                        />
                        <label htmlFor="bitişTarihi">Bitiş Tarihi</label>
                        <input
                          type="date"
                          id="bitişTarihi"
                          name="bitişTarihi"
                          required
                          value={oluşturulacakTatil.bitişTarihi}
                          onChange={(e) => {
                            aksiyonYayınla(
                              ekle({
                                ...oluşturulacakTatil,
                                bitişTarihi: e.target.value
                              })
                            )
                          }}
                          className="border border-black"
                        />
                        <label htmlFor="açıklama">Açıklama</label>
                        <input
                          type="text"
                          id="açıklama"
                          name="açıklama"
                          required
                          value={oluşturulacakTatil.açıklama}
                          onChange={(e) => {
                            aksiyonYayınla(
                              ekle({
                                ...oluşturulacakTatil,
                                açıklama: e.target.value
                              })
                            )
                          }}
                          className="border border-black"
                        />
                      </>
                    )
                  case 'ziyaretler':
                    const oluşturulacakZiyaret =
                      spesifikDurum.veri as OluşturulacakZiyaret
                    return (
                      <>
                        <h1 className="font-mono text-3xl font-bold">
                          Ziyaret ekle
                        </h1>
                        <label htmlFor="gün">Gün</label>
                        <input
                          type="date"
                          id="gün"
                          name="gün"
                          required
                          value={oluşturulacakZiyaret.gün}
                          onChange={(e) => {
                            aksiyonYayınla(
                              ekle({
                                ...oluşturulacakZiyaret,
                                gün: e.target.value
                              })
                            )
                          }}
                          className="border border-black"
                        />
                        <label htmlFor="başlangıçZamanı">
                          Başlangıç zamanı
                        </label>
                        <input
                          type="time"
                          id="başlangıçZamanı"
                          name="başlangıçZamanı"
                          required
                          value={oluşturulacakZiyaret.başlangıçZamanı}
                          onChange={(e) => {
                            aksiyonYayınla(
                              ekle({
                                ...oluşturulacakZiyaret,
                                başlangıçZamanı: e.target.value
                              })
                            )
                          }}
                          className="border border-black"
                        />
                        <label htmlFor="bitişZamanı">Bitiş zamanı</label>
                        <input
                          type="time"
                          id="bitişZamanı"
                          name="bitişZamanı"
                          required
                          value={oluşturulacakZiyaret.bitişZamanı}
                          onChange={(e) => {
                            aksiyonYayınla(
                              ekle({
                                ...oluşturulacakZiyaret,
                                bitişZamanı: e.target.value
                              })
                            )
                          }}
                          className="border border-black"
                        />
                        <label htmlFor="ziyaretEden">Ziyaret eden</label>
                        <input
                          type="text"
                          id="ziyaretEden"
                          name="ziyaretEden"
                          required
                          value={oluşturulacakZiyaret.ziyaretEden}
                          onChange={(e) => {
                            aksiyonYayınla(
                              ekle({
                                ...oluşturulacakZiyaret,
                                ziyaretEden: e.target.value
                              })
                            )
                          }}
                          className="border border-black"
                        />
                        <label htmlFor="ziyaretçiSayısı">
                          Ziyaretçi sayısı
                        </label>
                        <input
                          type="number"
                          id="ziyaretçiSayısı"
                          name="ziyaretçiSayısı"
                          required
                          value={oluşturulacakZiyaret.ziyaretçiSayısı}
                          onChange={(e) => {
                            aksiyonYayınla(
                              ekle({
                                ...oluşturulacakZiyaret,
                                ziyaretçiSayısı: parseInt(e.target.value)
                              })
                            )
                          }}
                          className="border border-black"
                        />
                      </>
                    )
                }
              })()}
              <button
                type="submit"
                className="rounded-lg bg-blue-500 p-2 text-white"
              >
                Ekle
              </button>
            </form>
          </section>
        </>
      )}
    </article>
  )
}
