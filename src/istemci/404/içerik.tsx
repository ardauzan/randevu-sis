import React from 'react'

export default function İçerik() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      <h1 className="mb-6 text-center font-mono text-2xl font-semibold tracking-tight">
        Sayfa bulunamadı.
      </h1>
      <p className="text-center text-sm text-gray-600">
        Aradığınız sayfa bulunamadı.{' '}
        <a
          href="/"
          className="font-serif text-blue-500 underline hover:text-blue-600 hover:no-underline focus:no-underline"
        >
          Anasayfaya dön
        </a>
      </p>
    </main>
  )
}
