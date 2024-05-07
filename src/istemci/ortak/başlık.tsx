import React from 'react'
import { Bars3Icon, LockOpenIcon } from '@heroicons/react/20/solid'
import navigasyon from '@/istemci/ortak/navigasyon'
import { geçerliKimlikDurumuKabulEdiliyor, çıkışYap } from '@/istemci/kütüphane'

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
    <header className="bg-blue-500 px-2 py-4">
      <section className="container mx-auto flex w-full items-center justify-between px-4">
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
        <nav className="hidden gap-4 sm:flex sm:gap-6 md:gap-8 lg:gap-10">
          {Object.entries(navigasyon).map(
            ([sayfa, [adres, ikon, kabulEdilenKimlikDurumları]], index) => {
              return geçerliKimlikDurumuKabulEdiliyor(
                kimlikDurumu,
                kabulEdilenKimlikDurumları
              ) ? (
                konum === adres ? (
                  <span key={index} className="cursor-default text-gray-900">
                    <section className="flex flex-col items-center justify-center">
                      {ikon}
                      <span>{sayfa}</span>
                    </section>
                  </span>
                ) : (
                  <a key={index} href={adres} className="text-white">
                    <section className="flex flex-col items-center justify-center">
                      {ikon}
                      <span>{sayfa}</span>
                    </section>
                  </a>
                )
              ) : null
            }
          )}
        </nav>
        {kimlikDurumu !== 'yok' && (
          <button
            className="hidden flex-col items-center justify-center text-white sm:flex"
            onClick={çıkışYap}
          >
            <LockOpenIcon className="size-8" />
            Çıkış yap
          </button>
        )}
        <button
          className="contents text-white sm:hidden"
          onClick={() => setMobilMenüAçık(true)}
        >
          <Bars3Icon className="size-8" />
        </button>
      </section>
    </header>
  )
}
