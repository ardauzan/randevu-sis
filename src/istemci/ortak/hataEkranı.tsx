import React from 'react'

export default function HataEkranı() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12">
      <h1 className="mb-6 text-center font-mono text-2xl font-semibold tracking-tight text-red-800">
        Bir hata oluştu
      </h1>
      <p className="text-center text-sm text-gray-600">
        Sayfayı yenileyin ya da daha sonra tekrar deneyin.
      </p>
    </main>
  )
}
