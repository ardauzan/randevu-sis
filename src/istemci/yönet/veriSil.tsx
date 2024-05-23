import React, { useContext, useEffect } from 'react'
import { ArrowLongLeftIcon } from '@heroicons/react/20/solid'
import Yükleniyor from '@/istemci/ortak/yükleniyor'
import Durum from '@/istemci/yönet/durum'
import { listele, tetikle, olmadı, oku } from '@/istemci/yönet/aksiyonlar'
import { yöneticiİçinSil } from '@/istemci/kütüphane'

export default function VeriSil() {
  const { durum, aksiyonYayınla } = useContext(Durum)
  const spesifikDurum = durum as SilDurum
  useEffect(() => {
    if (spesifikDurum.yükleniyor) {
      yöneticiİçinSil(spesifikDurum.tablo, spesifikDurum.veri)
        .then(() => aksiyonYayınla(listele()))
        .catch((hata) => aksiyonYayınla(olmadı(hata.message)))
    }
  }, [spesifikDurum.yükleniyor])
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
                aksiyonYayınla(oku(spesifikDurum.tablo, spesifikDurum.veri))
              }
            >
              <ArrowLongLeftIcon className="size-8" />
              <span className="font-serif font-semibold">Geri</span>
            </button>
          </section>
          <section className="mt-2 flex size-full flex-col gap-4 space-y-2 rounded-lg border border-black bg-white p-4 sm:w-full">
            <h1 className="mb-6 text-center font-mono text-2xl font-semibold tracking-tight text-red-800">
              Bu işlem geri alınamaz.
            </h1>
            <button
              className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
              onClick={() => aksiyonYayınla(tetikle())}
            >
              Sil
            </button>
          </section>
        </>
      )}
    </article>
  )
}
