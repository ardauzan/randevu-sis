import React from 'react'
import clsx from 'clsx'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid'
import { XMarkIcon } from '@heroicons/react/16/solid'

export interface GeriBildirimProps {
  readonly göster: boolean
  readonly mesaj: string
  readonly tip: 'başarılı' | 'başarısız'
  readonly mesajıKapat: () => void
}

export default function GeriBildirim({
  göster,
  mesaj,
  tip,
  mesajıKapat
}: GeriBildirimProps) {
  return (
    <article
      className={clsx(
        'fixed bottom-0 right-0 z-40 m-4 flex items-center rounded-md p-4 shadow-lg transition-all duration-300 ease-in-out',
        {
          'bg-green-100 text-green-800': tip === 'başarılı',
          'bg-red-100 text-red-800': tip === 'başarısız',
          'pointer-events-none translate-y-4 opacity-0': !göster
        }
      )}
    >
      <span className="mr-2">
        {tip === 'başarılı' && <CheckCircleIcon className="size-6" />}
        {tip === 'başarısız' && <XCircleIcon className="size-6" />}
      </span>
      <p className="font-serif text-sm tracking-tight">{mesaj}</p>
      <button
        onClick={() => mesajıKapat()}
        className="absolute right-1 top-1 text-black focus:outline-none"
      >
        <XMarkIcon className="size-4" />
      </button>
    </article>
  )
}
