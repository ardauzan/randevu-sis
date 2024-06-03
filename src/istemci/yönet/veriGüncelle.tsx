import React, { useContext, useState, useEffect } from 'react'
import { ArrowLongLeftIcon } from '@heroicons/react/20/solid'
import Yükleniyor from '@/istemci/ortak/yükleniyor'
import Durum from '@/istemci/yönet/durum'
import { güncelle, tetikle, olmadı, oku } from '@/istemci/yönet/aksiyonlar'
import {
  kişiOluştururkenkiProjeleriSeç,
  projeOluştururkenkiÜyeleriSeç,
  randevuOlustururkenkiGereçleriSeç,
  randevuOlustururkenkiAraçlarıSeç,
  yöneticiİçinGüncelle
} from '@/istemci/kütüphane'

export default function VeriGüncelle() {
  const { durum, aksiyonYayınla } = useContext(Durum)
  const spesifikDurum = durum as GüncelleDurum
  const [kişiProjeleri, setKişiProjeleri] = useState(
    (spesifikDurum.veri as GüncellenecekKişi)[1].projeler?.join(',') || ''
  ) //# Kişi oluştururkenki projeleri seçmek için
  const [projeÜyeleri, setProjeÜyeleri] = useState(
    (spesifikDurum.veri as GüncellenecekProje)[1].üyeler?.join(',') || ''
  ) //# Proje oluştururkenki üyeleri seçmek için
  const [randevuGereçleri, setRandevuGereçleri] = useState(
    (spesifikDurum.veri as GüncellenecekRandevu)[1].gereçler
      ?.map(([gereç, adet]) => `${gereç}:${adet}`)
      .join(',') || ''
  ) //# Randevu oluştururkenki gereçleri seçmek için
  const [randevuAraçları, setRandevuAraçları] = useState(
    (spesifikDurum.veri as GüncellenecekRandevu)[1].araçlar?.join(',') || ''
  ) //# Randevu oluştururkenki araçları seçmek için

  useEffect(() => {
    if (spesifikDurum.yükleniyor) {
      yöneticiİçinGüncelle(spesifikDurum.tablo, spesifikDurum.veri)
        .then(() =>
          aksiyonYayınla(oku(spesifikDurum.tablo, spesifikDurum.veri[0]))
        )
        .catch((hata) => aksiyonYayınla(olmadı(hata.message)))
    }
  }, [spesifikDurum.yükleniyor])
  useEffect(() => {
    const güncellenecekKişi = spesifikDurum.veri as GüncellenecekKişi
    const [id, veri] = güncellenecekKişi
    if (
      spesifikDurum.tablo === 'kişiler' &&
      /^\d+(,\d+)*,?$/g.test(kişiProjeleri)
    )
      aksiyonYayınla(
        güncelle([
          id,
          {
            ...veri,
            projeler: kişiOluştururkenkiProjeleriSeç(kişiProjeleri)
          }
        ])
      )
    else if (spesifikDurum.tablo === 'kişiler')
      aksiyonYayınla(güncelle([id, { ...veri, projeler: [] }]))
  }, [kişiProjeleri])
  useEffect(() => {
    const güncellenecekProje = spesifikDurum.veri as GüncellenecekProje
    const [id, veri] = güncellenecekProje
    if (
      spesifikDurum.tablo === 'projeler' &&
      /^\d+(,\d+)*,?$/g.test(projeÜyeleri)
    )
      aksiyonYayınla(
        güncelle([
          id,
          {
            ...veri,
            üyeler: projeOluştururkenkiÜyeleriSeç(projeÜyeleri)
          }
        ])
      )
    else if (spesifikDurum.tablo === 'projeler')
      aksiyonYayınla(güncelle([id, { ...veri, üyeler: [] }]))
  }, [projeÜyeleri])
  useEffect(() => {
    const güncellenecekRandevu = spesifikDurum.veri as GüncellenecekRandevu
    const [id, veri] = güncellenecekRandevu
    if (
      spesifikDurum.tablo === 'randevular' &&
      /^(\d:\d)(,\d:\d)*,?$/g.test(randevuGereçleri)
    )
      aksiyonYayınla(
        güncelle([
          id,
          {
            ...veri,
            gereçler: randevuOlustururkenkiGereçleriSeç(randevuGereçleri)
          }
        ])
      )
    else if (spesifikDurum.tablo === 'randevular')
      aksiyonYayınla(güncelle([id, { ...veri, gereçler: [] }]))
  }, [randevuGereçleri])
  useEffect(() => {
    const güncellenecekRandevu = spesifikDurum.veri as GüncellenecekRandevu
    const [id, veri] = güncellenecekRandevu
    if (
      spesifikDurum.tablo === 'randevular' &&
      /^\d+(,\d+)*,?$/g.test(randevuAraçları)
    )
      aksiyonYayınla(
        güncelle([
          id,
          {
            ...veri,
            araçlar: randevuOlustururkenkiAraçlarıSeç(randevuAraçları)
          }
        ])
      )
    else if (spesifikDurum.tablo === 'randevular')
      aksiyonYayınla(güncelle([id, { ...veri, araçlar: [] }]))
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
              onClick={() =>
                aksiyonYayınla(oku(spesifikDurum.tablo, spesifikDurum.veri[0]))
              }
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
                    const güncellenecekKişi =
                      spesifikDurum.veri as GüncellenecekKişi
                    return (
                      <>
                        <h1 className="font-mono text-3xl font-bold">
                          Kişi güncelle
                        </h1>
                        <label htmlFor="yönetici">Yönetici</label>
                        <input
                          type="checkbox"
                          id="yönetici"
                          name="yönetici"
                          checked={güncellenecekKişi[1].yönetici}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                güncellenecekKişi[0],
                                {
                                  ...güncellenecekKişi[1],
                                  yönetici: e.target.checked
                                }
                              ])
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
                            güncellenecekKişi[1].öğrenciNo === 0
                              ? ''
                              : güncellenecekKişi[1].öğrenciNo
                          }
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                güncellenecekKişi[0],
                                {
                                  ...güncellenecekKişi[1],
                                  öğrenciNo: e.target.value
                                    ? parseInt(e.target.value)
                                    : 0
                                }
                              ])
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
                          value={güncellenecekKişi[1].ad}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                güncellenecekKişi[0],
                                {
                                  ...güncellenecekKişi[1],
                                  ad: e.target.value
                                }
                              ])
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
                          value={güncellenecekKişi[1].soyAd}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                güncellenecekKişi[0],
                                {
                                  ...güncellenecekKişi[1],
                                  soyAd: e.target.value
                                }
                              ])
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
                          value={güncellenecekKişi[1].email}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                güncellenecekKişi[0],
                                {
                                  ...güncellenecekKişi[1],
                                  email: e.target.value
                                }
                              ])
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
                          value={güncellenecekKişi[1].şifre}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                güncellenecekKişi[0],
                                {
                                  ...güncellenecekKişi[1],
                                  şifre: e.target.value
                                }
                              ])
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
                    const güncellenecekProje =
                      spesifikDurum.veri as GüncellenecekProje
                    return (
                      <>
                        <h1 className="font-mono text-3xl font-bold">
                          Proje güncelle
                        </h1>
                        <label htmlFor="ad">Ad</label>
                        <input
                          type="text"
                          id="ad"
                          name="ad"
                          required
                          value={güncellenecekProje[1].ad}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                güncellenecekProje[0],
                                {
                                  ...güncellenecekProje[1],
                                  ad: e.target.value
                                }
                              ])
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
                          value={güncellenecekProje[1].başlangıçTarihi}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                güncellenecekProje[0],
                                {
                                  ...güncellenecekProje[1],
                                  başlangıçTarihi: e.target.value
                                }
                              ])
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
                          value={güncellenecekProje[1].bitişTarihi}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                güncellenecekProje[0],
                                {
                                  ...güncellenecekProje[1],
                                  bitişTarihi: e.target.value
                                }
                              ])
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
                          value={güncellenecekProje[1].açıklama}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                güncellenecekProje[0],
                                {
                                  ...güncellenecekProje[1],
                                  açıklama: e.target.value
                                }
                              ])
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
                    const güncellenecekGereç =
                      spesifikDurum.veri as GüncellenecekGereç
                    return (
                      <>
                        <h1 className="font-mono text-3xl font-bold">
                          Gereç güncelle
                        </h1>
                        <label htmlFor="ad">Ad</label>
                        <input
                          type="text"
                          id="ad"
                          name="ad"
                          required
                          value={güncellenecekGereç[1].ad}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                güncellenecekGereç[0],
                                {
                                  ...güncellenecekGereç[1],
                                  ad: e.target.value
                                }
                              ])
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
                          value={güncellenecekGereç[1].adet}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                güncellenecekGereç[0],
                                {
                                  ...güncellenecekGereç[1],
                                  adet: e.target.value
                                    ? parseInt(e.target.value)
                                    : 0
                                }
                              ])
                            )
                          }}
                          min={0}
                          className="border border-black"
                        />
                      </>
                    )
                  case 'araçlar':
                    const güncellenecekAraç =
                      spesifikDurum.veri as GüncellenecekAraç
                    return (
                      <>
                        <h1 className="font-mono text-3xl font-bold">
                          Araç güncelle
                        </h1>
                        <label htmlFor="ad">Ad</label>
                        <input
                          type="text"
                          id="ad"
                          name="ad"
                          required
                          value={güncellenecekAraç[1].ad}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                güncellenecekAraç[0],
                                {
                                  ...güncellenecekAraç[1],
                                  ad: e.target.value
                                }
                              ])
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
                          value={güncellenecekAraç[1].açıklama}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                güncellenecekAraç[0],
                                {
                                  ...güncellenecekAraç[1],
                                  açıklama: e.target.value
                                }
                              ])
                            )
                          }}
                          className="border border-black"
                        />
                        <label htmlFor="arızalı">Arızalı</label>
                        <input
                          type="checkbox"
                          id="arızalı"
                          name="arızalı"
                          checked={güncellenecekAraç[1].arızalı}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                güncellenecekAraç[0],
                                {
                                  ...güncellenecekAraç[1],
                                  arızalı: e.target.checked
                                }
                              ])
                            )
                          }}
                          className="border border-black"
                        />
                      </>
                    )
                  case 'randevular':
                    const güncellenecekRandevu =
                      spesifikDurum.veri as GüncellenecekRandevu
                    return (
                      <>
                        <h1 className="font-mono text-3xl font-bold">
                          Randevu güncelle
                        </h1>
                        <label htmlFor="açıklama">Açıklama</label>
                        <input
                          type="text"
                          id="açıklama"
                          name="açıklama"
                          required
                          value={güncellenecekRandevu[1].açıklama}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                güncellenecekRandevu[0],
                                {
                                  ...güncellenecekRandevu[1],
                                  açıklama: e.target.value
                                }
                              ])
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
                          value={güncellenecekRandevu[1].proje}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                güncellenecekRandevu[0],
                                {
                                  ...güncellenecekRandevu[1],
                                  proje: e.target.value
                                    ? parseInt(e.target.value)
                                    : 0
                                }
                              ])
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
                          value={güncellenecekRandevu[1].gün}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                güncellenecekRandevu[0],
                                {
                                  ...güncellenecekRandevu[1],
                                  gün: e.target.value
                                }
                              ])
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
                          value={güncellenecekRandevu[1].başlangıçZamanı}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                güncellenecekRandevu[0],
                                {
                                  ...güncellenecekRandevu[1],
                                  başlangıçZamanı: e.target.value
                                }
                              ])
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
                          value={güncellenecekRandevu[1].bitişZamanı}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                güncellenecekRandevu[0],
                                {
                                  ...güncellenecekRandevu[1],
                                  bitişZamanı: e.target.value
                                }
                              ])
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
                    const güncellenecekTatil =
                      spesifikDurum.veri as GüncellenecekTatil
                    return (
                      <>
                        <h1 className="font-mono text-3xl font-bold">
                          Tatil güncelle
                        </h1>
                        <label htmlFor="başlangıçTarihi">
                          Başlangıç Tarihi
                        </label>
                        <input
                          type="date"
                          id="başlangıçTarihi"
                          name="başlangıçTarihi"
                          required
                          value={güncellenecekTatil[1].başlangıçTarihi}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                güncellenecekTatil[0],
                                {
                                  ...güncellenecekTatil[1],
                                  başlangıçTarihi: e.target.value
                                }
                              ])
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
                          value={güncellenecekTatil[1].bitişTarihi}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                güncellenecekTatil[0],
                                {
                                  ...güncellenecekTatil[1],
                                  bitişTarihi: e.target.value
                                }
                              ])
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
                          value={güncellenecekTatil[1].açıklama}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                güncellenecekTatil[0],
                                {
                                  ...güncellenecekTatil[1],
                                  açıklama: e.target.value
                                }
                              ])
                            )
                          }}
                          className="border border-black"
                        />
                      </>
                    )
                  case 'ziyaretler':
                    const güncellenecekZiyaret =
                      spesifikDurum.veri as GüncellenecekZiyaret
                    return (
                      <>
                        <h1 className="font-mono text-3xl font-bold">
                          Ziyaret güncelle
                        </h1>
                        <label htmlFor="gün">Gün</label>
                        <input
                          type="date"
                          id="gün"
                          name="gün"
                          required
                          value={güncellenecekZiyaret[1].gün}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                güncellenecekZiyaret[0],
                                {
                                  ...güncellenecekZiyaret[1],
                                  gün: e.target.value
                                }
                              ])
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
                          value={güncellenecekZiyaret[1].başlangıçZamanı}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                güncellenecekZiyaret[0],
                                {
                                  ...güncellenecekZiyaret[1],
                                  başlangıçZamanı: e.target.value
                                }
                              ])
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
                          value={güncellenecekZiyaret[1].bitişZamanı}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                güncellenecekZiyaret[0],
                                {
                                  ...güncellenecekZiyaret[1],
                                  bitişZamanı: e.target.value
                                }
                              ])
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
                          value={güncellenecekZiyaret[1].ziyaretEden}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                güncellenecekZiyaret[0],
                                {
                                  ...güncellenecekZiyaret[1],
                                  ziyaretEden: e.target.value
                                }
                              ])
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
                          value={güncellenecekZiyaret[1].ziyaretçiSayısı}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                güncellenecekZiyaret[0],
                                {
                                  ...güncellenecekZiyaret[1],
                                  ziyaretçiSayısı: parseInt(e.target.value)
                                }
                              ])
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
                Güncelle
              </button>
            </form>
          </section>
        </>
      )}
    </article>
  )
}
