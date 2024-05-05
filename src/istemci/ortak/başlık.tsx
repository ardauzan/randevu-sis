//info Bu dosyada uygulamanın başlık bileşeni bulunmaktadır.
import React from 'react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import navigasyon from '@/istemci/ortak/navigasyon'

export default function Başlık() {
  return (
    <header className="bg-blue-500 py-4">
      <div className="container mx-auto flex w-full items-center justify-between px-4">
        <a className="contents" href="/">
          <img
            src="/statik/logo.png"
            alt="Logo"
            className="-mr-5 size-[55px]"
            loading="lazy"
            fetchPriority="low"
          />
        </a>
        <nav className="hidden gap-4 md:flex">
          {Object.entries(navigasyon).map(([sayfa, [adres, ikon]]) => (
            <a key={sayfa} href={adres} className="text-white">
              <div className="flex flex-col items-center justify-center">
                {ikon}
                <span>{sayfa}</span>
              </div>
            </a>
          ))}
        </nav>
        <button className="block text-white md:hidden">
          <Bars3Icon className="size-8" />
        </button>
      </div>
    </header>
  )
}
