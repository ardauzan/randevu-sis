import React, { useState, useEffect, useReducer } from 'react'
import clsx from 'clsx'
import Başlık from '@/istemci/ortak/başlık'
import İçerik from '@/istemci/yönet/içerik'
import Altlık from '@/istemci/ortak/altlık'
import MobilMenü from '@/istemci/ortak/mobilMenü'
import Durum from '@/istemci/yönet/durum'
import redüktör from '@/istemci/yönet/redüktör'

export interface YönetProps {
  readonly ilkDurum: Durum
}

export default function Yönet(props: YönetProps) {
  const { ilkDurum } = props
  const [mobilMenüAçık, setMobilMenüAçık] = useState(false)
  const [durum, aksiyonYayınla] = useReducer(redüktör, ilkDurum)

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
        <title>Yönet</title>
        <meta
          name="description"
          content="SDÜ Randevu Sistemi'nde mevcut olan verileri yönetin.'"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/statik/favicon.ico" />
        <link rel="stylesheet" href="/statik/stiller.css" />
      </head>
      <body className="bg-gray-100">
        <Başlık
          konum="/yonet"
          kimlikDurumu="yönetici"
          setMobilMenüAçık={setMobilMenüAçık}
        />
        <section className="flex">
          <MobilMenü
            konum="/yonet"
            kimlikDurumu="yönetici"
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
          <Durum.Provider value={{ durum, aksiyonYayınla }}>
            <İçerik />
          </Durum.Provider>
        </section>
        <Altlık />
        <section />
      </body>
    </html>
  )
}
