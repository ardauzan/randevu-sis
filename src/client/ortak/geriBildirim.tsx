//info Bu dosyada, kullanıcı bir işlem gerçekleştirdiğinde ekrana bu işlemin başarılı veya başarısız olduğuna dair bir geri bildirim göstermek için kullanılan bileşen tanımlanır.
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
        'fixed bottom-0 right-0 m-4 flex items-center rounded-md p-4 shadow-md transition-all duration-300 ease-in-out',
        {
          'bg-green-100 text-green-800': tip === 'başarılı',
          'bg-red-100 text-red-800': tip === 'başarısız',
          'opacity-0': !göster,
          'translate-y-4': !göster,
          'pointer-events-none': !göster
        }
      )}
    >
      <span className="mr-2">
        {tip === 'başarılı' && <CheckCircleIcon className="h-6 w-6" />}
        {tip === 'başarısız' && <XCircleIcon className="h-6 w-6" />}
      </span>
      <p className="text-sm">{mesaj}</p>
      <button
        onClick={() => mesajıKapat()}
        className="ml-auto focus:outline-none"
      >
        <XMarkIcon className="h-4 w-4" />
      </button>
    </article>
  )
}
