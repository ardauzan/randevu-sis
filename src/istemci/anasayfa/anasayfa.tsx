//info Anasayfa bu dosyada tanımlanır.
import React from 'react'
import Başlık from '@/istemci/ortak/başlık'
import İçerik from '@/istemci/anasayfa/içerik'
import Altlık from '@/istemci/ortak/altlık'

export interface AnasayfaProps {
  readonly kimlikDurumu: KimlikDurumu
}

export default function Anasayfa(props: AnasayfaProps) {
  const { kimlikDurumu } = props
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
        <Başlık konum="/" kimlikDurumu={kimlikDurumu} />
        <İçerik />
        <Altlık />
      </body>
    </html>
  )
}
