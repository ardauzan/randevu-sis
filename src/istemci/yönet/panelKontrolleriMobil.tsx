import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid'
import PanelKontrolleriTabloSeçimAltPaneli from '@/istemci/yönet/panelKontrolleriTabloSeçimAltPaneli'
import PanelKontrolleriSorguAltPaneli from '@/istemci/yönet/panelKontrolleriSorguAltPaneli'

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
        'absolute z-10 -mt-4 block w-full overflow-visible rounded-lg bg-gray-300 sm:hidden'
      )}
    >
      <section
        className={clsx(
          'relative w-full overflow-hidden rounded-lg bg-gray-200 px-4 py-5 transition-all duration-300 ease-in-out',
          kontrollerGörünüyor ? 'h-lvh' : 'h-0'
        )}
      >
        <h2 className="absolute inset-x-4 top-0 mt-1 text-center font-mono text-2xl font-semibold tracking-tight">
          Kontrol paneli
        </h2>
        <PanelKontrolleriTabloSeçimAltPaneli
          kontrollerGörünüyor={kontrollerGörünüyor}
        />
        <PanelKontrolleriSorguAltPaneli
          kontrollerGörünüyor={kontrollerGörünüyor}
        />
      </section>
      <button
        onClick={() => setKontrollerGörünüyor(!kontrollerGörünüyor)}
        className="absolute flex w-full items-center justify-center text-gray-600"
      >
        {kontrollerGörünüyor ? (
          <ChevronUpIcon className="-mt-10 size-4" />
        ) : (
          <ChevronDownIcon className="size-4" />
        )}
      </button>
    </article>
  )
}
