import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import Başlık from '@/istemci/ortak/başlık'
import İçerik from '@/istemci/randevularım/içerik'
import Altlık from '@/istemci/ortak/altlık'
import MobilMenü from '@/istemci/ortak/mobilMenü'

export interface RandevularımProps {
  readonly kimlikDurumu: KimlikDurumu
}

export default function Randevularım(props: RandevularımProps) {
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
        <title>Randevularım</title>
        <meta
          name="description"
          content="SDÜ Randevu Sistemi'nde kayıtlı olan randevularınız."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/statik/favicon.ico" />
        <link rel="stylesheet" href="/statik/stiller.css" />
      </head>
      <body>
        <Başlık
          konum="/randevularim"
          kimlikDurumu={kimlikDurumu}
          setMobilMenüAçık={setMobilMenüAçık}
        />
        <section className="flex">
          <MobilMenü
            konum="/randevularim"
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
