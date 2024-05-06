import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid'

export default function PanelKontrolleriMobil() {
  const [kontrollerGörünüyor, setKontrollerGörünüyor] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setKontrollerGörünüyor(false)
      }
    }
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <article
      className={clsx(
        'block w-full overflow-visible rounded-lg bg-gray-300 sm:hidden'
      )}
    >
      <section
        className={clsx(
          'relative w-full overflow-hidden rounded-lg bg-gray-200 px-4 py-5 transition-all duration-300 ease-in-out',
          kontrollerGörünüyor ? 'h-[350px]' : 'h-0'
        )}
      >
        <h2 className="absolute inset-x-4 top-0 mt-1 text-center font-mono text-xl tracking-tight">
          Kontrol paneli
        </h2>
        <ul
          className={clsx(
            'mt-6 space-y-2 rounded-lg border border-black bg-white shadow-md transition-all duration-500 ease-in-out',
            kontrollerGörünüyor
              ? 'opacity-100'
              : 'pointer-events-none opacity-0'
          )}
        >
          <li>
            <button className="w-full text-center font-serif">Kişiler</button>
          </li>
          <li>
            <button className="w-full text-center font-serif">Projeler</button>
          </li>
        </ul>
        <section
          className={clsx(
            'mt-6 space-y-2 rounded-lg border border-black bg-white shadow-md transition-all duration-500 ease-in-out',
            kontrollerGörünüyor
              ? 'opacity-100'
              : 'pointer-events-none opacity-0'
          )}
        >
          <section className="sm:flex sm:items-center">
            <section className="sm:flex-auto">
              <h1 className="text-center font-mono text-2xl font-semibold tracking-tight">
                Kişiler
              </h1>
              <p className="mt-2 text-center text-sm text-gray-600">
                SDÜ Randevu Sistemi'nde mevcut olan kişileri yönetin.
              </p>
            </section>
            <section className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <input
                type="text"
                className="my-2 block w-full rounded-md border border-gray-300 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                placeholder="Kişi Ara"
              />
              <section className="flex gap-x-2">
                <button className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                  Yeni Kişi Ekle
                </button>
                <select className="block rounded-md border border-blue-600 text-center text-sm font-semibold text-black shadow-sm hover:border-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                  <option value={10}> 10 </option>
                  <option value={100}> 100 </option>
                </select>
              </section>
            </section>
          </section>
        </section>
      </section>
      <button
        onClick={() => setKontrollerGörünüyor(!kontrollerGörünüyor)}
        className="absolute flex w-full items-center justify-center text-gray-600"
      >
        {kontrollerGörünüyor ? (
          <ChevronUpIcon className="size-4" />
        ) : (
          <ChevronDownIcon className="size-4" />
        )}
      </button>
    </article>
  )
}
