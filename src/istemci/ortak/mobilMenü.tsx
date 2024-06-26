import React from 'react'
import clsx from 'clsx'
import { XMarkIcon, LockOpenIcon } from '@heroicons/react/20/solid'
import navigasyon from '@/istemci/ortak/navigasyon'
import { geçerliKimlikDurumuKabulEdiliyor, çıkışYap } from '@/istemci/kütüphane'

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
        'fixed -left-44 top-0 z-30 flex h-lvh w-44 flex-col overflow-x-hidden bg-blue-500 duration-500 ease-in-out sm:hidden',
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
        <section className="my-10 flex h-full w-max flex-col items-start justify-around p-4">
          {Object.entries(navigasyon).map(
            ([sayfa, [adres, ikon, kabulEdilenKimlikDurumları]], index) => {
              return geçerliKimlikDurumuKabulEdiliyor(
                kimlikDurumu,
                kabulEdilenKimlikDurumları
              ) ? (
                konum === adres ? (
                  <span
                    key={index}
                    className="flex cursor-default items-center justify-center text-gray-900"
                  >
                    {ikon}
                    {sayfa}
                  </span>
                ) : (
                  <a
                    key={index}
                    href={adres}
                    className="flex items-center justify-center text-white"
                  >
                    {ikon}
                    {sayfa}
                  </a>
                )
              ) : null
            }
          )}
        </section>
      </nav>
      {kimlikDurumu !== 'yok' && (
        <button
          className="mb-20 flex items-center justify-center text-white"
          onClick={çıkışYap}
        >
          <LockOpenIcon className="size-8" />
          Çıkış yap
        </button>
      )}
    </aside>
  )
}
