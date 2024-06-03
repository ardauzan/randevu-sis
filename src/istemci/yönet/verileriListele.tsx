import React, { useContext, useEffect } from 'react'
import Durum from '@/istemci/yönet/durum'
import Yükleniyor from '@/istemci/ortak/yükleniyor'
import VeriListesi from '@/istemci/ortak/veriListesi'
import { yöneticiİçinListele } from '@/istemci/kütüphane'
import { tazele, listelendi, olmadı } from '@/istemci/yönet/aksiyonlar'

export default function VerileriListele() {
  const { durum, aksiyonYayınla } = useContext(Durum)
  const spesifikDurum = durum as ListeleDurum
  useEffect(() => {
    let tazeleReferans: Timer
    const vazgeç = new AbortController()
    const { signal } = vazgeç
    if (spesifikDurum.yükleniyor)
      yöneticiİçinListele(
        spesifikDurum.tablo,
        spesifikDurum.arama,
        spesifikDurum.sayfa,
        spesifikDurum.sayfaBoyutu,
        signal
      ).then(
        (veri) =>
          aksiyonYayınla(
            listelendi(spesifikDurum.sayfa, veri.içerik, veri.toplam)
          ),
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
      {spesifikDurum.veri === null ? (
        <Yükleniyor />
      ) : (
        <section className="flex size-full flex-col gap-4 space-y-2 rounded-lg border border-black bg-white p-4 sm:w-full">
          <section className="max-w-full sm:px-2 md:px-4 lg:px-6">
            <VeriListesi
              veriler={spesifikDurum.veri}
              tablo={spesifikDurum.tablo}
              mevcutSayfa={spesifikDurum.sayfa}
              sayfaBoyutu={spesifikDurum.sayfaBoyutu}
              toplam={spesifikDurum.toplam}
            />
          </section>
        </section>
      )}
    </article>
  )
}
