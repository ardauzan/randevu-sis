import React from 'react'

export default function HataEkranı() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-6 text-center font-mono text-2xl font-semibold tracking-tight text-red-800">
        Bir hata oluştu
      </h1>
      <p className="text-center text-sm text-gray-600">
        Sayfayı yenileyin ya da daha sonra tekrar deneyin.
      </p>
    </main>
  )
}
