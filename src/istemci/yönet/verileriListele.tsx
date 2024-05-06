import React, { useContext } from 'react'
import clsx from 'clsx'
import Durum from '@/istemci/yönet/durum'
import Yükleniyor from '@/istemci/ortak/yükleniyor'

export default function VerileriListele() {
  const { durum } = useContext(Durum)
  return (
    <article className="flex size-full flex-col">
      {(durum.veri as ListelenenKişi[] | ListelenenProje[]).length === 0 &&
      durum.yükleniyor ? (
        <Yükleniyor />
      ) : (
        <section className="mt-8 flow-root overflow-hidden">
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <table className="w-full text-left">
              <thead className="bg-white">
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
                            'w-4 px-3 py-3.5 text-left text-sm font-semibold text-gray-900',
                            index > 3 && 'hidden sm:table-cell'
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
                      className="hidden w-4 px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
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
                              'px-3 py-3.5 text-sm font-medium text-gray-900',
                              index > 3 && 'hidden sm:table-cell'
                            )}
                          >
                            {typeof değer === 'boolean'
                              ? değer
                                ? 'Evet'
                                : 'Hayır'
                              : değer}
                          </td>
                        ))}
                        <td className="hidden px-3 py-3.5 text-right text-sm font-medium text-blue-600 sm:table-cell">
                          <button className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
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
