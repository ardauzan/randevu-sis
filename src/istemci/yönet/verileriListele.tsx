import React, { useContext } from 'react'
import clsx from 'clsx'
import Durum from '@/istemci/yönet/durum'
import Yükleniyor from '@/istemci/ortak/yükleniyor'

export default function VerileriListele() {
  const { durum } = useContext(Durum)
  return (
    <article className="mt-10 flex size-full flex-col p-2">
      {(durum.veri as ListelenenKişi[] | ListelenenProje[]).length === 0 &&
      durum.yükleniyor ? (
        <Yükleniyor />
      ) : (
        <section className="mt-8 flow-root overflow-hidden">
          <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <table className="w-full p-2">
              <thead className="bg-yellow-300">
                <tr>
                  {(durum.veri as ListelenenKişi[] | ListelenenProje[]).length >
                  0
                    ? Object.keys(
                        (durum.veri as ListelenenKişi[] | ListelenenProje[])[0]!
                      ).map((key, index) => (
                        <th
                          scope="col"
                          key={index}
                          className={clsx(
                            'min-w-10 max-w-10 overflow-hidden p-1 text-center text-sm font-semibold text-gray-900 underline',
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
                  {(durum.veri as ListelenenKişi[] | ListelenenProje[]).length >
                    0 && (
                    <th
                      scope="col"
                      className="hidden min-w-10 max-w-10 p-1 text-center text-sm font-semibold text-gray-900 underline sm:table-cell"
                    >
                      İncele
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {(durum.veri as ListelenenKişi[] | ListelenenProje[]).length ===
                0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-500">
                      Veri bulunamadı.
                    </td>
                  </tr>
                ) : (
                  (durum.veri as ListelenenKişi[] | ListelenenProje[]).map(
                    (veri, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                      >
                        {Object.values(veri).map((değer, index) => (
                          <td
                            key={index}
                            className={clsx(
                              'min-w-10 max-w-10 overflow-hidden p-1 text-center text-xs font-medium text-gray-900',
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
                        <td className="hidden min-w-10 max-w-10 p-1 text-center text-xs font-medium sm:table-cell">
                          <button className="text-center font-serif text-blue-500 underline hover:text-blue-600 hover:no-underline focus:no-underline">
                            İncele
                          </button>
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </section>
        </section>
      )}
    </article>
  )
}
