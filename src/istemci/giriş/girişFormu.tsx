import React, { useState } from 'react'
import GeriBildirim from '@/istemci/ortak/geriBildirim'
import { girişYap } from '@/istemci/kütüphane'

export default function GirişFormu() {
  const [email, setEmail] = useState('')
  const [şifre, setŞifre] = useState('')
  const [beniHatırla, setBeniHatırla] = useState(false)
  const [şifreGöster, setŞifreGöster] = useState(false)
  const [hataGeriBildiriminiGöster, setHataGeriBildiriminiGöster] =
    useState(false)
  const başarısızlıkMesajı = 'Kimlik doğrulanamadı.'
  return (
    <article className="mt-6 w-full max-w-md rounded-lg bg-white p-8 shadow-md">
      <h1 className="mb-6 text-center font-mono text-2xl font-semibold tracking-tight">
        SDÜ Randevu Sistemi'ne giriş yap
      </h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          const sonuç = await girişYap(email, şifre, beniHatırla)
          const veri = sonuç
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
        <section className="mb-4">
          <label htmlFor="email" className="text-center text-sm text-gray-600">
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
        </section>
        <section className="mb-4">
          <label htmlFor="şifre" className="text-center text-sm text-gray-600">
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
        </section>
        <section className="mb-1 flex">
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
            className="ml-1 text-center text-sm text-gray-600"
          >
            Beni hatırla
          </label>
        </section>
        <section className="mb-4 flex">
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
            className="ml-1 text-center text-sm text-gray-600"
          >
            Şifreyi göster
          </label>
        </section>
        <section className="mb-6">
          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-center text-xs font-thin text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Giriş yap
          </button>
        </section>
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
    </article>
  )
}
