//info Yönetim paneli bu dosyada tanımlanır.
import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import Başlık from '@/istemci/ortak/başlık'
import İçerik from '@/istemci/yönet/içerik'
import Altlık from '@/istemci/ortak/altlık'
import MobilMenü from '@/istemci/ortak/mobilMenü'

export default function Yönet() {
  const [mobilMenüAçık, setMobilMenüAçık] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setMobilMenüAçık(false)
      }
    }
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <html lang="tr">
      <head>
        <meta charSet="utf-8" />
        <title>Yönet</title>
        <meta
          name="description"
          content="SDÜ Randevu Sistemi'nde mevcut olan verileri yönetin.'"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/statik/favicon.ico" />
        <link rel="stylesheet" href="/statik/stiller.css" />
      </head>
      <body>
        <Başlık
          konum="/"
          kimlikDurumu="yönetici"
          setMobilMenüAçık={setMobilMenüAçık}
        />
        <div className="flex">
          <MobilMenü
            konum="/"
            kimlikDurumu="yönetici"
            mobilMenüAçık={mobilMenüAçık}
            setMobilMenüAçık={setMobilMenüAçık}
          />
          <div
            className={clsx(
              'fixed top-0 z-10 h-lvh w-screen backdrop-blur-md sm:hidden',
              mobilMenüAçık && 'block',
              !mobilMenüAçık && 'hidden'
            )}
            onClick={() => setMobilMenüAçık(false)}
          />
          <İçerik />
        </div>
        <Altlık />
        <div />
      </body>
    </html>
  )
}
