import React, { useContext, useState, useEffect } from 'react'
import { ArrowLongLeftIcon } from '@heroicons/react/20/solid'
import Yükleniyor from '@/istemci/ortak/yükleniyor'
import Durum from '@/istemci/yönet/durum'
import {
  listele,
  güncelle,
  tetikle,
  olmadı,
  oku
} from '@/istemci/yönet/aksiyonlar'
import {
  kişiOluştururkenkiProjeleriSeç,
  projeOluştururkenkiÜyeleriSeç,
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
  useEffect(() => {
    if (spesifikDurum.yükleniyor) {
      yöneticiİçinGüncelle(spesifikDurum.tablo, spesifikDurum.veri)
        .then(() => aksiyonYayınla(listele()))
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
            {(() => {
              switch (spesifikDurum.tablo) {
                case 'kişiler':
                  const güncellenecekKişi =
                    spesifikDurum.veri as GüncellenecekKişi
                  const [kişiId, kişiVeri] = güncellenecekKişi
                  return (
                    <>
                      <h1 className="font-mono text-3xl font-bold">
                        Kişi ekle
                      </h1>
                      <form
                        className="flex flex-col"
                        onSubmit={(e) => {
                          e.preventDefault()
                          aksiyonYayınla(tetikle())
                        }}
                      >
                        <label htmlFor="yönetici">Yönetici</label>
                        <input
                          type="checkbox"
                          name="yönetici"
                          checked={güncellenecekKişi[1].yönetici}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                kişiId,
                                {
                                  ...kişiVeri,
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
                          name="öğrenciNo"
                          required
                          value={
                            kişiVeri.öğrenciNo === 0 ? '' : kişiVeri.öğrenciNo
                          }
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                kişiId,
                                {
                                  ...kişiVeri,
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
                          name="ad"
                          required
                          value={kişiVeri.ad}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                kişiId,
                                { ...kişiVeri, ad: e.target.value }
                              ])
                            )
                          }}
                          className="border border-black"
                        />
                        <label htmlFor="soyAd">Soyad</label>
                        <input
                          type="text"
                          name="soyAd"
                          required
                          value={kişiVeri.soyAd}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                kişiId,
                                {
                                  ...kişiVeri,
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
                          name="email"
                          required
                          value={kişiVeri.email}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                kişiId,
                                {
                                  ...kişiVeri,
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
                          name="şifre"
                          required
                          value={kişiVeri.şifre}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                kişiId,
                                {
                                  ...kişiVeri,
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
                          name="projeler"
                          value={kişiProjeleri}
                          onChange={(e) => setKişiProjeleri(e.target.value)}
                          className="border border-black"
                        />
                        <button
                          type="submit"
                          className="rounded-lg bg-blue-500 p-2 text-white"
                        >
                          Ekle
                        </button>
                      </form>
                    </>
                  )
                case 'projeler':
                  const güncellenecekProje =
                    spesifikDurum.veri as GüncellenecekProje
                  const [projeId, projeVeri] = güncellenecekProje
                  return (
                    <>
                      <h1 className="font-mono text-3xl font-bold">
                        Proje ekle
                      </h1>
                      <form
                        className="flex flex-col"
                        onSubmit={(e) => {
                          e.preventDefault()
                          aksiyonYayınla(tetikle())
                        }}
                      >
                        <label htmlFor="ad">Ad</label>
                        <input
                          type="text"
                          name="ad"
                          required
                          value={projeVeri.ad}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                projeId,
                                { ...projeVeri, ad: e.target.value }
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
                          name="başlangıçTarihi"
                          required
                          value={projeVeri.başlangıçTarihi}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                projeId,
                                {
                                  ...projeVeri,
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
                          name="bitişTarihi"
                          required
                          value={projeVeri.bitişTarihi}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                projeId,
                                {
                                  ...projeVeri,
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
                          name="açıklama"
                          required
                          value={projeVeri.açıklama}
                          onChange={(e) => {
                            aksiyonYayınla(
                              güncelle([
                                projeId,
                                {
                                  ...projeVeri,
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
                          name="üyeler"
                          value={projeÜyeleri}
                          onChange={(e) => setProjeÜyeleri(e.target.value)}
                          className="border border-black"
                        />
                        <button
                          type="submit"
                          className="rounded-lg bg-blue-500 p-2 text-white"
                        >
                          Güncelle
                        </button>
                      </form>
                    </>
                  )
                default:
                  throw new Error('Bilinmeyen tablo.')
              }
            })()}
          </section>
        </>
      )}
    </article>
  )
}
