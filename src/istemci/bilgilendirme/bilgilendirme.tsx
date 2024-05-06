import React from 'react'
import Başlık from '@/istemci/ortak/başlık'
import İçerik from '@/istemci/bilgilendirme/içerik'
import Altlık from '@/istemci/ortak/altlık'

export default function Bilgilendirme() {
  return (
    <html lang="tr">
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
        <Başlık />
        <İçerik />
        <Altlık />
      </body>
    </html>
  )
}
