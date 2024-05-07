import React from 'react'

export default function İçerik() {
  return (
    <main className="flex h-screen w-screen flex-col items-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14">
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
