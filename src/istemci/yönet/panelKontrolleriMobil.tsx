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
        'relative w-full overflow-visible rounded-lg bg-gray-300 sm:hidden'
      )}
    >
      <section
        className={clsx(
          'relative overflow-hidden rounded-lg bg-gray-200 px-4 py-5 transition-all duration-300 ease-in-out',
          kontrollerGörünüyor ? 'h-28' : 'h-0'
        )}
      >
        <h2 className="absolute inset-x-4 top-0 mt-1 text-center font-mono text-xl tracking-tight">
          Kontrol paneli
        </h2>
        <ul
          className={clsx(
            'mt-4 space-y-2 rounded-lg border border-black bg-white shadow-md transition-all duration-300 ease-in-out',
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
