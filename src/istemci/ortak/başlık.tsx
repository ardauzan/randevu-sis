//info Bu dosyada uygulamanın başlık bileşeni bulunmaktadır.
import React from 'react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import navigasyon from '@/istemci/ortak/navigasyon'
import { geçerliKimlikDurumuKabulEdiliyor } from '@/istemci/kütüphane'

export interface BaşlıkProps {
  readonly konum: string
  readonly kimlikDurumu: KimlikDurumu
  readonly setMobilMenüAçık: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Başlık({
  konum,
  kimlikDurumu,
  setMobilMenüAçık
}: BaşlıkProps) {
  return (
    <header className="bg-blue-500 py-4">
      <div className="container mx-auto flex w-full items-center justify-between px-4">
        {konum === '/' ? (
          <span className="contents">
            <img
              src="/statik/logo.png"
              alt="Logo"
              className="-mr-5 size-[55px]"
              loading="lazy"
              fetchPriority="low"
            />
          </span>
        ) : (
          <a className="contents" href="/">
            <img
              src="/statik/logo.png"
              alt="Logo"
              className="-mr-5 size-[55px]"
              loading="lazy"
              fetchPriority="low"
            />
          </a>
        )}
        <nav className="hidden gap-4 sm:flex">
          {Object.entries(navigasyon).map(
            ([sayfa, [adres, ikon, kabulEdilenKimlikDurumları]], index) => {
              return geçerliKimlikDurumuKabulEdiliyor(
                kimlikDurumu,
                kabulEdilenKimlikDurumları
              ) ? (
                konum === adres ? (
                  <span key={index} className="cursor-default text-gray-600">
                    <div className="flex flex-col items-center justify-center">
                      {ikon}
                      <span>{sayfa}</span>
                    </div>
                  </span>
                ) : (
                  <a key={index} href={adres} className="text-white">
                    <div className="flex flex-col items-center justify-center">
                      {ikon}
                      <span>{sayfa}</span>
                    </div>
                  </a>
                )
              ) : null
            }
          )}
        </nav>
        <button
          className="block text-white sm:hidden"
          onClick={() => setMobilMenüAçık(true)}
        >
          <Bars3Icon className="size-8" />
        </button>
      </div>
    </header>
  )
}
