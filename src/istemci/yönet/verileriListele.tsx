import React, { useContext, useEffect } from 'react'
import Durum from '@/istemci/yönet/durum'
import Yükleniyor from '@/istemci/ortak/yükleniyor'
import VeriListesi from '@/istemci/ortak/veriListesi'
import { yöneticiİçinListele } from '@/istemci/kütüphane'
import { tazele, listelendi, olmadı } from '@/istemci/yönet/aksiyonlar'

export default function VerileriListele() {
  const { durum, aksiyonYayınla } = useContext(Durum)
  useEffect(() => {
    let tazeleReferans: Timer
    const vazgeç = new AbortController()
    const { signal } = vazgeç
    if (durum.yükleniyor)
      yöneticiİçinListele(
        durum.tablo,
        durum.arama,
        durum.sayfa,
        durum.sayfaBoyutu,
        signal
      ).then(
        (veri) =>
          aksiyonYayınla(listelendi(durum.sayfa, veri.içerik, veri.toplam)),
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
  }, [durum])

  return (
    <article className="mt-10 flex size-full flex-col p-2">
      {(durum as ListeleDurum).veri.length === 0 && durum.yükleniyor ? (
        <Yükleniyor />
      ) : (
        <section className="mt-8 flex flex-col overflow-hidden">
          <section className="max-w-full sm:px-2 md:px-4 lg:px-6">
            <VeriListesi
              veriler={(durum as ListeleDurum).veri}
              tablo={durum.tablo}
              mevcutSayfa={durum.sayfa}
              sayfaBoyutu={durum.sayfaBoyutu}
              toplam={(durum as ListeleDurum).toplam}
            />
          </section>
        </section>
      )}
    </article>
  )
}
