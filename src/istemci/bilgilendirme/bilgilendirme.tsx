import React, { useState, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import clsx from 'clsx'
import Başlık from '@/istemci/ortak/başlık'
import İçerik from '@/istemci/bilgilendirme/içerik'
import Altlık from '@/istemci/ortak/altlık'
import MobilMenü from '@/istemci/ortak/mobilMenü'
import HataEkranı from '@/istemci/ortak/hataEkranı'

export interface BilgilendirmeProps {
  readonly kimlikDurumu: KimlikDurumu
}

export default function Bilgilendirme(props: BilgilendirmeProps) {
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
        <title>Bilgilendirme</title>
        <meta
          name="description"
          content="SDÜ Randevu Sistemi hakkında bilgi alın."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/statik/favicon.ico" />
        <link rel="stylesheet" href="/statik/stiller.css" />
      </head>
      <body className="bg-gray-100">
        <ErrorBoundary fallback={<HataEkranı />}>
          <Başlık
            konum="/bilgilendirme"
            kimlikDurumu={kimlikDurumu}
            setMobilMenüAçık={setMobilMenüAçık}
          />
          <section className="flex">
            <MobilMenü
              konum="/bilgilendirme"
              kimlikDurumu={kimlikDurumu}
              mobilMenüAçık={mobilMenüAçık}
              setMobilMenüAçık={setMobilMenüAçık}
            />
            <section
              className={clsx(
                'fixed top-0 z-20 h-lvh w-screen backdrop-blur-md sm:hidden',
                mobilMenüAçık && 'block',
                !mobilMenüAçık && 'hidden'
              )}
              onClick={() => setMobilMenüAçık(false)}
            />
            <İçerik kimlikDurumu={kimlikDurumu} />
          </section>
          <Altlık />
          <section />
        </ErrorBoundary>
      </body>
    </html>
  )
}
