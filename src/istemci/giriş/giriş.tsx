//info Giriş sayfası bu dosyada tanımlanır.
import React from 'react'
import Başlık from '@/istemci/ortak/başlık'
import İçerik from '@/istemci/giriş/içerik'
import Altlık from '@/istemci/ortak/altlık'

export default function Giriş() {
  return (
    <html lang="tr">
      <head>
        <meta charSet="utf-8" />
        <title>Giriş Yap</title>
        <meta
          name="description"
          content="SDÜ Randevu Sistemi'ne giriş yapın."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/public/favicon.ico" />
        <link rel="stylesheet" href="/public/stiller.css" />
      </head>
      <body className="bg-gray-100">
        <Başlık />
        <İçerik />
        <Altlık />
      </body>
    </html>
  )
}
