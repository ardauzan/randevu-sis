//info Anasayfa bu dosyada tanımlanır.
import React from 'react'

export interface AnasayfaProps {
  readonly girişYapıldı: boolean
}

export default function Anasayfa({ girişYapıldı }: AnasayfaProps) {
  return (
    <html lang="tr">
      <head>
        <meta charSet="utf-8" />
        <title>Anasayfa</title>
        <meta name="description" content="SDÜ randevu sistemi güncel takvim." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/public/favicon.ico" />
        <link rel="stylesheet" href="/public/styles.css" />
      </head>
      <body>{girişYapıldı && <p>Giriş yapıldı!!</p>}</body>
    </html>
  )
}
