import React, { useState } from 'react'
import Main from '~/client/admin/main'
import AdminContext from '~/client/admin/context'

export default function Admin() {
  const [arama, setArama] = useState('')
  const [sayfa, setSayfa] = useState(1)
  const [sayfaBoyutu, setSayfaBoyutu] = useState(10)
  const [tablo, setTablo] = useState<Tablo>('kisi')

  const _setArama = (_arama: string) => {
    setArama(_arama)
    setSayfa(1)
  }
  const _setSayfaBoyutu = (_sayfaBoyutu: number) => {
    setSayfaBoyutu(_sayfaBoyutu)
    setSayfa(1)
  }
  const _setTablo = (_tablo: Tablo) => {
    setTablo(_tablo)
    setArama('')
    setSayfa(1)
  }

  return (
    <html lang="tr" className="h-full bg-white">
      <head>
        <meta charSet="utf-8" />
        <title>Admin</title>
        <meta name="description" content="Randevu sistemi admin sayfası" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/public/favicon.ico" />
        <link rel="stylesheet" href="/public/styles.css" />
      </head>
      <body className="h-full">
        <AdminContext.Provider
          value={{
            arama,
            setArama: _setArama,
            sayfa,
            setSayfa,
            sayfaBoyutu,
            setSayfaBoyutu: _setSayfaBoyutu,
            tablo,
            setTablo: _setTablo
          }}
        >
          <Main />
        </AdminContext.Provider>
      </body>
    </html>
  )
}
