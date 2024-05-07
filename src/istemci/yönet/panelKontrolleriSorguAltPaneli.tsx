import React from 'react'
import clsx from 'clsx'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/16/solid'

export interface PanelKontrolleriSorguAltPaneliProps {
  readonly kontrollerGörünüyor?: boolean
}

export default function PanelKontrolleriSorguAltPaneli({
  kontrollerGörünüyor = true
}: PanelKontrolleriSorguAltPaneliProps) {
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
            Kişiler
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            SDÜ Randevu Sistemi'nde mevcut olan kişileri yönetin.
          </p>
        </section>
        <section className="mt-4 flex-col sm:mt-0 sm:flex sm:size-full">
          <section className="flex items-center justify-center">
            <MagnifyingGlassIcon className="size-4" />
            <input
              name="arama"
              type="text"
              className="my-2 block w-full rounded-md border border-gray-300 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              placeholder="Kişi Ara"
            />
          </section>
          <section className="flex justify-around">
            <button className="flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-center text-xs font-thin text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
              <PlusIcon className="size-4" />
              Yeni Kişi Ekle
            </button>
            <select
              name="sayfaBoyutu"
              className="block rounded-md border border-blue-600 text-center text-sm font-semibold text-black shadow-sm hover:border-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
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
