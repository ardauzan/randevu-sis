import React from 'react'
import clsx from 'clsx'
import { XMarkIcon } from '@heroicons/react/20/solid'
import navigasyon from '@/istemci/ortak/navigasyon'
import { geçerliKimlikDurumuKabulEdiliyor } from '@/istemci/kütüphane'

export interface GenelNavigasyonYanMenüProps {
  readonly konum: string
  readonly kimlikDurumu: KimlikDurumu
  readonly mobilMenüAçık: boolean
  readonly setMobilMenüAçık: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MobilMenü({
  konum,
  kimlikDurumu,
  mobilMenüAçık,
  setMobilMenüAçık
}: GenelNavigasyonYanMenüProps) {
  return (
    <aside
      className={clsx(
        'fixed -left-44 top-0 z-20 flex h-lvh w-44 flex-col overflow-x-hidden bg-gray-300 duration-500 ease-in-out sm:hidden',
        mobilMenüAçık
          ? 'translate-x-full opacity-80'
          : 'translate-x-0 opacity-0'
      )}
    >
      <button
        onClick={() => setMobilMenüAçık(false)}
        className="absolute right-4 top-4 flex text-black focus:outline-none"
      >
        <XMarkIcon className="size-8" />
      </button>
      <nav className="flex h-full flex-col items-end justify-center">
        <div className="my-10 flex h-full w-max flex-col items-start justify-around p-4">
          {Object.entries(navigasyon).map(
            ([sayfa, [adres, ikon, kabulEdilenKimlikDurumları]], index) => {
              return geçerliKimlikDurumuKabulEdiliyor(
                kimlikDurumu,
                kabulEdilenKimlikDurumları
              ) ? (
                konum === adres ? (
                  <span key={index} className="cursor-default text-gray-600">
                    <div className="flex items-center justify-center">
                      {ikon}
                      <span>{sayfa}</span>
                    </div>
                  </span>
                ) : (
                  <a key={index} href={adres} className="text-white">
                    <div className="flex items-center justify-center">
                      {ikon}
                      <span>{sayfa}</span>
                    </div>
                  </a>
                )
              ) : null
            }
          )}
        </div>
      </nav>
    </aside>
  )
}
