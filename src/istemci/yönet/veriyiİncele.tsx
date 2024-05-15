import React, { useContext, useEffect } from 'react'
import Yükleniyor from '@/istemci/ortak/yükleniyor'
import Durum from '@/istemci/yönet/durum'
import { yöneticiİçinDetaylıOku } from '@/istemci/kütüphane'
import { tazele, detaylıOkundu, olmadı } from '@/istemci/yönet/aksiyonlar'

export default function Veriyiİncele() {
  const { durum, aksiyonYayınla } = useContext(Durum)
  useEffect(() => {
    let tazeleReferans: Timer
    const vazgeç = new AbortController()
    const { signal } = vazgeç
    if (durum.yükleniyor)
      yöneticiİçinDetaylıOku(
        durum.tablo,
        typeof durum.veri === 'number'
          ? durum.veri
          : (durum.veri as DetaylıVeri).id,
        signal
      ).then(
        (veri) => aksiyonYayınla(detaylıOkundu(veri)),
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
      {typeof durum.veri === 'number' && durum.yükleniyor ? (
        <Yükleniyor />
      ) : (
        <section>
          {(() => {
            switch (durum.tablo) {
              case 'kişiler':
                const kişi = durum.veri as DetaylıKişi
                return (
                  <>
                    <h1>{kişi.id}</h1>
                    <p>{kişi.yönetici}</p>
                    <h2 className="font-serif text-2xl font-bold">
                      {kişi.öğrenciNo} {kişi.ad} {kişi.soyad}
                    </h2>

                    <p className="font-serif text-lg">{kişi.email}</p>
                    <h3 className="font-serif text-xl font-bold">Projeler</h3>
                    <ul>
                      {kişi.projeler.map((proje, index) => (
                        <li key={index} className="font-serif text-lg">
                          {proje.id} {proje.ad} {proje.başlangıçTarihi}{' '}
                          {proje.bitişTarihi} {proje.açıklama}
                        </li>
                      ))}
                    </ul>
                  </>
                )
              case 'projeler':
                const proje = durum.veri as DetaylıProje
                return (
                  <>
                    <h1>{proje.id}</h1>
                    <h2 className="font-serif text-2xl font-bold">
                      {proje.ad}
                    </h2>
                    <p className="font-serif text-lg">
                      {proje.başlangıçTarihi}
                    </p>
                    <p className="font-serif text-lg">{proje.bitişTarihi}</p>
                    <p className="font-serif text-lg">{proje.açıklama}</p>
                    <h3 className="font-serif text-xl font-bold">Üyeler</h3>
                    <ul>
                      {proje.üyeler.map((kişi, index) => (
                        <li key={index} className="font-serif text-lg">
                          {kişi.id} {kişi.öğrenciNo} {kişi.ad} {kişi.soyAd}{' '}
                          {kişi.email}
                        </li>
                      ))}
                    </ul>
                  </>
                )
              default:
                throw new Error('Bilinmeyen tablo: ' + durum.tablo)
            }
          })()}
        </section>
      )}
    </article>
  )
}
