import React, { useState, useEffect } from 'react'

export default function Anasayfa() {
  const [events, setEvents] = useState([])
  useEffect(() => {
    const id = setInterval(() => {
      setEvents((prev) => [...prev])
    }, 10000)
    return () => {
      clearInterval(id)
    }
  }, [])
  return (
    <html lang="tr">
      <head>
        <meta charSet="utf-8" />
        <title>Anasayfa</title>
        <meta name="description" content="Randevu sistemi anasayfası" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/public/favicon.ico" />
        <link rel="stylesheet" href="/public/styles.css" />
      </head>
      <body>
        <header>
          <h1>Anasayfa</h1>
        </header>
        <main>
          <article>
            <h2>Anasayfa</h2>
          </article>
        </main>
      </body>
    </html>
  )
}
