//info Giriş yapmak için kullanılan form bu dosyada tanımlanır.
import React, { useState } from 'react'
import GeriBildirim from '@/istemci/ortak/geriBildirim'

export default function GirişFormu() {
  const [email, setEmail] = useState('')
  const [şifre, setŞifre] = useState('')
  const [beniHatırla, setBeniHatırla] = useState(false)
  const [şifreGöster, setŞifreGöster] = useState(false)
  const [hataGeriBildiriminiGöster, setHataGeriBildiriminiGöster] =
    useState(false)
  const başarısızlıkMesajı = 'Kimlik doğrulanamadı.'
  return (
    <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
      <h2 className="mb-6 text-center font-mono text-2xl font-semibold">
        SDÜ Randevu Sistemi'ne giriş yap
      </h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          const sonuç = await fetch('/api/kimlik/giris', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify({
              email,
              şifre,
              beniHatırla
            })
          })
          const veri = await sonuç.text()
          if (veri === başarısızlıkMesajı) {
            setHataGeriBildiriminiGöster(true)
            setTimeout(() => {
              setHataGeriBildiriminiGöster(false)
            }, 3000)
          } else if (veri === 'Giriş yapıldı.') {
            window.location.replace('/randevularim')
          }
        }}
      >
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border px-4 py-2 focus:border-blue-400 focus:outline-none"
            placeholder="Email adresini buraya gir"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="şifre" className="block text-gray-600">
            Şifre
          </label>
          <input
            type={şifreGöster ? 'text' : 'password'}
            id="şifre"
            name="şifre"
            autoComplete="current-password"
            value={şifre}
            onChange={(e) => setŞifre(e.target.value)}
            className="w-full rounded-lg border px-4 py-2 focus:border-blue-400 focus:outline-none"
            placeholder="Şifreni buraya gir"
          />
        </div>
        <div className="mb-1 flex">
          <input
            type="checkbox"
            id="beniHatırla"
            name="beniHatırla"
            checked={beniHatırla}
            onChange={(e) => setBeniHatırla(e.target.checked)}
            className="mr-1 rounded-md border px-1 focus:border-blue-400 focus:outline-none"
          />
          <label
            htmlFor="beniHatırla"
            className="ml-1 block text-xs text-gray-600"
          >
            Beni hatırla
          </label>
        </div>
        <div className="mb-4 flex">
          <input
            type="checkbox"
            id="şifreGöster"
            name="şifreGöster"
            checked={şifreGöster}
            onChange={(e) => setŞifreGöster(e.target.checked)}
            className="mr-1 rounded-md border px-1 focus:border-blue-400 focus:outline-none"
          />
          <label
            htmlFor="şifreGöster"
            className="ml-1 block text-xs text-gray-600"
          >
            Şifreyi göster
          </label>
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Giriş yap
          </button>
        </div>
        <p className="text-center text-sm text-gray-600">
          Hesap oluşturmak için SDÜ Prototip Atölyesi'ne geliştirdiğin projenle
          kaydol{' '}
          <a
            target="_blank"
            href="https://prototip.sdu.edu.tr"
            className="font-serif text-blue-500 underline hover:text-blue-600 hover:no-underline focus:no-underline"
          >
            Prototip Atölyesi'ni keşfet
          </a>
        </p>
      </form>
      <GeriBildirim
        göster={hataGeriBildiriminiGöster}
        mesaj={başarısızlıkMesajı}
        tip="başarısız"
        mesajıKapat={() => setHataGeriBildiriminiGöster(false)}
      />
    </div>
  )
}
