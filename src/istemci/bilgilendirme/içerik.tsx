import React from 'react'

export default function İçerik() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12">
      <h1 className="mb-6 text-center font-mono text-2xl font-semibold tracking-tight">
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
