//info Bilgilendirme sayfasının gövdesi bu dosyada tanımlanır.
import React from 'react'

export default function İçerik() {
  return (
    <main className="h-screen items-center justify-center">
      <h1 className="my-6 text-center font-mono text-2xl font-semibold tracking-tight">
        Başlık
      </h1>
      <section className="flex size-full flex-col items-center gap-y-8">
        <section className="flex flex-col items-center gap-y-2">
          <h2 className="mb-2 text-center font-mono text-xl tracking-tight">
            alt başlık
          </h2>
          <p className="text-center text-sm text-gray-600">açıklama</p>
        </section>
      </section>
    </main>
  )
}
