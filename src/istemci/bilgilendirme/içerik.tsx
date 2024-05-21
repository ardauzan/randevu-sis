import React from 'react'
import bilgi from '@/istemci/bilgilendirme/bilgi.json'

export interface İçerikProps {
  readonly kimlikDurumu: KimlikDurumu
}

export default function İçerik({ kimlikDurumu }: İçerikProps) {
  const gösterilecekBilgi = bilgi[kimlikDurumu]
  return (
    <main className="flex h-max min-h-screen w-screen flex-col items-center p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12">
      <h1 className="text-center text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
        {gösterilecekBilgi}
      </h1>
    </main>
  )
}
