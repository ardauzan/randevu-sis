import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import Başlık from '@/istemci/ortak/başlık'
import İçerik from '@/istemci/anasayfa/içerik'
import Altlık from '@/istemci/ortak/altlık'
import MobilMenü from '@/istemci/ortak/mobilMenü'

export interface AnasayfaProps {
  readonly kimlikDurumu: KimlikDurumu
}

export default function Anasayfa(props: AnasayfaProps) {
  const { kimlikDurumu } = props
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
    <html lang="tr" data-props={JSON.stringify(props)}>
      <head>
        <meta charSet="utf-8" />
        <title>Anasayfa</title>
        <meta name="description" content="SDÜ randevu sistemi güncel takvim." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/statik/favicon.ico" />
        <link rel="stylesheet" href="/statik/stiller.css" />
      </head>
      <body>
        <Başlık
          konum="/"
          kimlikDurumu={kimlikDurumu}
          setMobilMenüAçık={setMobilMenüAçık}
        />
        <section className="flex">
          <MobilMenü
            konum="/"
            kimlikDurumu={kimlikDurumu}
            mobilMenüAçık={mobilMenüAçık}
            setMobilMenüAçık={setMobilMenüAçık}
          />
          <section
            className={clsx(
              'fixed top-0 z-10 h-lvh w-screen backdrop-blur-md sm:hidden',
              mobilMenüAçık && 'block',
              !mobilMenüAçık && 'hidden'
            )}
            onClick={() => setMobilMenüAçık(false)}
          />
          <İçerik />
        </section>
        <Altlık />
        <section />
      </body>
    </html>
  )
}
