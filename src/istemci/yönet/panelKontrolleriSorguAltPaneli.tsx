import React, { useContext, useEffect, useState } from 'react'
import { debounce } from 'lodash'
import clsx from 'clsx'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/16/solid'
import Durum from '@/istemci/yönet/durum'
import { ekle, sayfaBoyutuDeğiştir, aramaDeğiştir } from './aksiyonlar'

export interface PanelKontrolleriSorguAltPaneliProps {
  readonly kontrollerGörünüyor?: boolean
  readonly kontrolleriGizle?: () => void
}

export default function PanelKontrolleriSorguAltPaneli({
  kontrollerGörünüyor = true,
  kontrolleriGizle = () => {}
}: PanelKontrolleriSorguAltPaneliProps) {
  const {
    durum,
    durum: { tablo, sayfaBoyutu },
    aksiyonYayınla
  } = useContext(Durum)
  const [arama, setArama] = useState(durum.arama)
  const başHarfiBüyükTablo = tablo.charAt(0).toUpperCase() + tablo.slice(1)
  useEffect(() => {
    const aramaDeğiştirDebounced = debounce(() => {
      aksiyonYayınla(aramaDeğiştir(arama))
      kontrolleriGizle()
    }, 300)
    aramaDeğiştirDebounced()
    return aramaDeğiştirDebounced.cancel
  }, [arama])
  return (
    <article
      className={clsx(
        'mt-6 flex w-full flex-col space-y-2 rounded-lg border border-black bg-white p-4 shadow-md transition-all duration-500 ease-in-out sm:mt-8',
        kontrollerGörünüyor ? 'opacity-100' : 'pointer-events-none opacity-0'
      )}
    >
      <article className="flex-col sm:flex sm:items-center">
        <section className="sm:flex-auto">
          <h2 className="text-center font-mono text-xl tracking-tight">
            {başHarfiBüyükTablo}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {(() => {
              switch (tablo) {
                case 'kişiler':
                  return 'Bu tablo sistemde kayıtlı olan öğrencileri içerir.'
                case 'projeler':
                  return 'Bu tablo sistemde kayıtlı olan projeleri içerir.'
                case 'gereçler':
                  return 'Bu tablo sistemde kayıtlı olan gereçleri içerir.'
                case 'araçlar':
                  return 'Bu tablo sistemde kayıtlı olan araçları içerir.'
                case 'randevular':
                  return 'Bu tablo sistemde kayıtlı olan randevuları içerir.'
                case 'tatiller':
                  return 'Bu tablo sistemde kayıtlı olan tatilleri içerir.'
                case 'ziyaretler':
                  return 'Bu tablo sistemde kayıtlı olan ziyaretleri içerir.'
                default:
                  return 'Bu tablo hakkında bilgi almak için lütfen yöneticiye başvurun.'
              }
            })()}
          </p>
        </section>
        <section className="mt-4 flex-col sm:mt-0 sm:flex sm:size-full">
          <section className="flex items-center justify-center">
            <MagnifyingGlassIcon className="size-4" />
            <input
              name="arama"
              type="text"
              className="my-2 block w-full rounded-md border border-gray-300 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              placeholder="Ara"
              value={arama}
              onChange={(e) => {
                setArama(e.target.value)
              }}
            />
          </section>
          <section className="flex justify-around">
            <button
              className="flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-center text-xs font-thin text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              onClick={() => {
                aksiyonYayınla(
                  ekle(
                    (() => {
                      switch (tablo) {
                        case 'kişiler':
                          return {
                            yönetici: false,
                            öğrenciNo: 0,
                            ad: '',
                            soyAd: '',
                            email: '',
                            şifre: '',
                            projeler: []
                          } as OluşturulacakKişi
                        case 'projeler':
                          return {
                            ad: '',
                            başlangıçTarihi: '',
                            bitişTarihi: '',
                            açıklama: '',
                            üyeler: []
                          } as OluşturulacakProje
                        default:
                          return {} as OluşturulacakVeri
                      }
                    })()
                  )
                )
                kontrolleriGizle()
              }}
            >
              <PlusIcon className="size-4" />
              {başHarfiBüyükTablo} tablosuna yeni kayıt ekle
            </button>
            <select
              name="sayfaBoyutu"
              className="block rounded-md border border-blue-600 text-center text-sm font-semibold text-black shadow-sm hover:border-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              value={sayfaBoyutu}
              onChange={(e) => {
                aksiyonYayınla(sayfaBoyutuDeğiştir(parseInt(e.target.value)))
                kontrolleriGizle()
              }}
            >
              <option value={10}> 10 </option>
              <option value={100}> 100 </option>
            </select>
          </section>
        </section>
      </article>
    </article>
  )
}
