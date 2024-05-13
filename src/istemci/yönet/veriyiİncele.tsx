import React, { useContext, useEffect } from 'react'
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
      {durum.yükleniyor && <p>Yükleniyor...</p>}
      {durum.hata && <p>{durum.hata}</p>}
      {durum.veri && (
        <table className="table-auto">
          <thead>
            <tr>
              <th>Alan</th>
              <th>Değer</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(durum.veri).map(([anahtar, değer]) => (
              <tr key={anahtar}>
                <td className="border px-4 py-2">{anahtar}</td>
                <td className="border px-4 py-2">{değer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </article>
  )
}
