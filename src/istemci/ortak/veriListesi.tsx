import React, { useContext } from 'react'
import clsx from 'clsx'
import {
  ArrowRightCircleIcon,
  ArrowLeftCircleIcon
} from '@heroicons/react/16/solid'
import useSayfalama from '@/istemci/ortak/useSayfalandırma'
import Durum from '@/istemci/yönet/durum'
import { oku, sayfaDeğiştir } from '@/istemci/yönet/aksiyonlar'

export interface VeriListesiProps {
  readonly veriler: ListelenenVeriler
  readonly tablo: Tablo
  readonly mevcutSayfa?: number
  readonly sayfaBoyutu: number
  readonly toplam: number
}

export default function VeriListesi({
  veriler,
  tablo,
  mevcutSayfa = 1,
  sayfaBoyutu,
  toplam
}: VeriListesiProps) {
  const { aksiyonYayınla } = useContext(Durum)
  const sayfalamaMenzili = useSayfalama({
    toplam,
    sayfaBoyutu,
    mevcutSayfa
  })
  return (
    <article className="flex size-full max-w-full flex-col p-2">
      <table className="w-full">
        <thead className="bg-yellow-300">
          <tr>
            {veriler.length > 0 && veriler[0]
              ? Object.keys(veriler[0]).map((key, index) => (
                  <th
                    scope="col"
                    key={index}
                    className={clsx(
                      'min-w-5 max-w-10 overflow-hidden p-1 text-center text-sm font-semibold text-gray-900 underline',
                      index == 3 && 'hidden sm:table-cell',
                      index > 3 && index <= 5 && 'hidden md:table-cell',
                      index > 5 && index <= 7 && 'hidden lg:table-cell',
                      index > 7 && index <= 9 && 'hidden xl:table-cell',
                      index > 9 && 'hidden 2xl:table-cell'
                    )}
                  >
                    {key}
                  </th>
                ))
              : null}
            {veriler.length > 0 && (
              <th
                scope="col"
                className="hidden min-w-5 max-w-10 p-1 text-center text-sm font-semibold text-gray-900 underline sm:table-cell"
              >
                İncele
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {veriler.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center text-gray-500">
                Veri bulunamadı.
              </td>
            </tr>
          ) : (
            veriler.map((veri, index) => (
              <tr
                key={index}
                className={clsx(
                  'cursor-pointer hover:bg-gray-400',
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                )}
                onClick={() => aksiyonYayınla(oku(tablo, veri.id))}
              >
                {Object.values(veri).map((değer, index) => (
                  <td
                    key={index}
                    className={clsx(
                      'min-w-5 max-w-10 overflow-hidden p-1 text-center text-xs font-medium text-gray-900',
                      index == 3 && 'hidden sm:table-cell',
                      index > 3 && index <= 5 && 'hidden md:table-cell',
                      index > 5 && index <= 7 && 'hidden lg:table-cell',
                      index > 7 && index <= 9 && 'hidden xl:table-cell',
                      index > 9 && 'hidden 2xl:table-cell'
                    )}
                  >
                    {typeof değer === 'boolean'
                      ? değer
                        ? 'Evet'
                        : 'Hayır'
                      : değer}
                  </td>
                ))}
                <td className="hidden min-w-5 max-w-10 p-1 text-center text-xs font-medium sm:table-cell">
                  <button className="text-center font-serif text-blue-500 underline hover:text-blue-600 hover:no-underline focus:no-underline">
                    İncele
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {(() =>
        sayfalamaMenzili &&
        sayfalamaMenzili.length > 1 && (
          <nav className="mt-4 flex justify-center">
            <ul className="flex">
              <li className="mx-1 flex items-center justify-center rounded-lg px-3 py-1">
                <button
                  className="cursor-pointer text-center font-serif text-sm font-medium text-blue-500 underline hover:text-gray-900 hover:no-underline focus:text-gray-900 focus:no-underline disabled:cursor-not-allowed disabled:text-gray-900 disabled:no-underline disabled:opacity-50"
                  onClick={() => aksiyonYayınla(sayfaDeğiştir(mevcutSayfa - 1))}
                  disabled={mevcutSayfa === 1}
                >
                  <ArrowLeftCircleIcon className="size-4" />
                </button>
              </li>
              {sayfalamaMenzili?.map((sayfa, index) => (
                <li
                  key={index}
                  className={clsx(
                    'mx-1 flex items-center justify-center rounded-lg px-3 py-1',
                    mevcutSayfa === sayfa &&
                      'outline-dotted outline-2 outline-blue-500'
                  )}
                >
                  {(() =>
                    typeof sayfa === 'number' ? (
                      <button
                        className="cursor-pointer text-center font-serif text-sm font-medium text-blue-500 underline hover:text-gray-900 hover:no-underline focus:text-gray-900 focus:no-underline disabled:cursor-not-allowed disabled:text-gray-900 disabled:no-underline"
                        onClick={() =>
                          aksiyonYayınla(sayfaDeğiştir(sayfa as number))
                        }
                        disabled={mevcutSayfa === sayfa}
                      >
                        {sayfa}
                      </button>
                    ) : (
                      <span className="cursor-default text-center font-serif text-sm font-semibold text-gray-900">
                        {sayfa}
                      </span>
                    ))()}
                </li>
              ))}
              <li className="mx-1 flex items-center justify-center rounded-lg px-3 py-1">
                <button
                  className="cursor-pointer text-center text-blue-500 hover:text-gray-900 focus:text-gray-900 disabled:cursor-not-allowed disabled:text-gray-900 disabled:opacity-50"
                  onClick={() => aksiyonYayınla(sayfaDeğiştir(mevcutSayfa + 1))}
                  disabled={
                    mevcutSayfa ===
                    sayfalamaMenzili[sayfalamaMenzili.length - 1]
                  }
                >
                  <ArrowRightCircleIcon className="size-4" />
                </button>
              </li>
            </ul>
          </nav>
        ))()}
    </article>
  )
}
