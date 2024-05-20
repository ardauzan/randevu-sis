import React, { useContext, useState, useEffect } from 'react'
import { ArrowLongLeftIcon } from '@heroicons/react/20/solid'
import Yükleniyor from '@/istemci/ortak/yükleniyor'
import Durum from '@/istemci/yönet/durum'
import { listele, ekle, tetikle, olmadı } from '@/istemci/yönet/aksiyonlar'
import {
  kişiOluştururkenkiProjeleriSeç,
  yöneticiİçinEkle,
  projeOluştururkenkiÜyeleriSeç
} from '@/istemci/kütüphane'

export default function VeriEkle() {
  const { durum, aksiyonYayınla } = useContext(Durum)
  const spesifikDurum = durum as EkleDurum
  const [kişiProjeleri, setKişiProjeleri] = useState('') //# Kişi oluştururkenki projeleri seçmek için
  const [projeÜyeleri, setProjeÜyeleri] = useState('') //# Proje oluştururkenki üyeleri seçmek için
  useEffect(() => {
    if (spesifikDurum.yükleniyor) {
      yöneticiİçinEkle(spesifikDurum.tablo, spesifikDurum.veri)
        .then(() => aksiyonYayınla(listele()))
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
  return (
    <article className="mt-10 flex size-full flex-col p-2">
      <button
        className="contents"
        onClick={() => {
          aksiyonYayınla(listele())
        }}
      >
        <ArrowLongLeftIcon className="size-8" />
      </button>
      {spesifikDurum.yükleniyor ? (
        <Yükleniyor />
      ) : (
        <section className="mt-6 flex size-full flex-col gap-4 space-y-2 rounded-lg border border-black bg-white p-4 sm:w-full">
          {(() => {
            switch (spesifikDurum.tablo) {
              case 'kişiler':
                const oluşturulacakKişi =
                  spesifikDurum.veri as OluşturulacakKişi
                return (
                  <>
                    <h1 className="font-mono text-3xl font-bold">Kişi ekle</h1>
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
                        name="email"
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
                        name="şifre"
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
                const oluşturulacakProje =
                  spesifikDurum.veri as OluşturulacakProje
                return (
                  <>
                    <h1 className="font-mono text-3xl font-bold">Proje ekle</h1>
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
                        value={oluşturulacakProje.ad}
                        onChange={(e) => {
                          aksiyonYayınla(
                            ekle({ ...oluşturulacakProje, ad: e.target.value })
                          )
                        }}
                        className="border border-black"
                      />
                      <label htmlFor="başlangıçTarihi">Başlangıç Tarihi</label>
                      <input
                        type="date"
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
                        name="üyeler"
                        value={projeÜyeleri}
                        onChange={(e) => setProjeÜyeleri(e.target.value)}
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
              default:
                return <p>Bilinmeyen tablo</p>
            }
          })()}
        </section>
      )}
    </article>
  )
}
