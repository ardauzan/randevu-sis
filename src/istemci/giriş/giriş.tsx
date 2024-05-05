//info Giriş sayfası bu dosyada tanımlanır.
import React from 'react'
import Başlık from '@/istemci/ortak/başlık'
import İçerik from '@/istemci/giriş/içerik'
import Altlık from '@/istemci/ortak/altlık'

export interface GirişProps {
  readonly kimlikDurumu: KimlikDurumu
}

export default function Giriş(props: GirişProps) {
  const { kimlikDurumu } = props
  return (
    <html lang="tr" data-props={JSON.stringify(props)}>
      <head>
        <meta charSet="utf-8" />
        <title>Giriş Yap</title>
        <meta
          name="description"
          content="SDÜ Randevu Sistemi'ne giriş yapın."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/statik/favicon.ico" />
        <link rel="stylesheet" href="/statik/stiller.css" />
      </head>
      <body className="bg-gray-100">
        <Başlık konum="/giris" kimlikDurumu={kimlikDurumu} />
        <İçerik />
        <Altlık />
      </body>
    </html>
  )
}
