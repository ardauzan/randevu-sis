import React, { useContext, useState, useEffect } from 'react'
import { ArrowLongLeftIcon } from '@heroicons/react/20/solid'
import Yükleniyor from '@/istemci/ortak/yükleniyor'
import Durum from '@/istemci/yönet/durum'
import { listele, ekle, tetikle, olmadı } from '@/istemci/yönet/aksiyonlar'
import {
  kişiOluştururkenkiProjeleriSeç,
  yöneticiİçinEkle
} from '@/istemci/kütüphane'

export default function VeriEkle() {
  const { durum, aksiyonYayınla } = useContext(Durum)
  const spesifikDurum = durum as EkleDurum
  const [kişiProjeleri, setKişiProjeleri] = useState('') //# Kişi oluştururkenki projeleri seçmek için
  useEffect(() => {
    if (spesifikDurum.yükleniyor) {
      yöneticiİçinEkle(spesifikDurum.tablo, spesifikDurum.veri)
        .then(() => aksiyonYayınla(listele()))
        .catch((hata) => aksiyonYayınla(olmadı(hata.message)))
    }
  }, [spesifikDurum.yükleniyor])
  useEffect(() => {
    if (/^\d+(,\d+)*,?$/g.test(kişiProjeleri))
      aksiyonYayınla(
        ekle({
          ...spesifikDurum.veri,
          projeler: kişiOluştururkenkiProjeleriSeç(kişiProjeleri)
        })
      )
    else aksiyonYayınla(ekle({ ...spesifikDurum.veri, projeler: [] }))
  }, [kişiProjeleri])
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
                const veri = spesifikDurum.veri as OluşturulacakKişi
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
                        checked={veri.yönetici}
                        onChange={(e) => {
                          aksiyonYayınla(
                            ekle({ ...veri, yönetici: e.target.checked })
                          )
                        }}
                        className="border border-black"
                      />
                      <label htmlFor="öğrenciNo">Öğrenci No</label>
                      <input
                        type="number"
                        name="öğrenciNo"
                        required
                        value={veri.öğrenciNo === 0 ? '' : veri.öğrenciNo}
                        onChange={(e) => {
                          aksiyonYayınla(
                            ekle({
                              ...veri,
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
                        value={veri.ad}
                        onChange={(e) => {
                          aksiyonYayınla(ekle({ ...veri, ad: e.target.value }))
                        }}
                        className="border border-black"
                      />
                      <label htmlFor="soyAd">Soyad</label>
                      <input
                        type="text"
                        name="soyAd"
                        required
                        value={veri.soyAd}
                        onChange={(e) => {
                          aksiyonYayınla(
                            ekle({ ...veri, soyAd: e.target.value })
                          )
                        }}
                        className="border border-black"
                      />
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={veri.email}
                        onChange={(e) => {
                          aksiyonYayınla(
                            ekle({ ...veri, email: e.target.value })
                          )
                        }}
                        className="border border-black"
                      />
                      <label htmlFor="şifre">Şifre</label>
                      <input
                        type="password"
                        name="şifre"
                        required
                        value={veri.şifre}
                        onChange={(e) => {
                          aksiyonYayınla(
                            ekle({ ...veri, şifre: e.target.value })
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
              default:
                return <p>Bilinmeyen tablo</p>
            }
          })()}
        </section>
      )}
    </article>
  )
}
