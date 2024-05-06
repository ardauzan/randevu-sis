import React, { useContext } from 'react'
import clsx from 'clsx'
import Durum from '@/istemci/yönet/durum'
import Yükleniyor from '@/istemci/ortak/yükleniyor'

export default function VerileriListele() {
  const { durum } = useContext(Durum)
  return (
    <article className="fleex size-full">
      <section className="mx-auto max-w-7xl px-4 pt-3 sm:px-6 lg:px-8">
        <section className="sm:flex sm:items-center">
          <section className="sm:flex-auto">
            <h1 className="text-center font-mono text-2xl font-semibold tracking-tight">
              Kişiler
            </h1>
            <p className="mt-2 text-center text-sm text-gray-600">
              SDÜ Randevu Sistemi'nde mevcut olan kişileri yönetin.
            </p>
          </section>
          <section className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <input
              type="text"
              className="my-2 block w-full rounded-md border border-gray-300 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              placeholder="Kişi Ara"
            />
            <section className="flex gap-x-2">
              <button className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                Yeni Kişi Ekle
              </button>
              <select className="block rounded-md border border-blue-600 text-center text-sm font-semibold text-black shadow-sm hover:border-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                <option value={10}> 10 </option>
                <option value={100}> 100 </option>
              </select>
            </section>
          </section>
        </section>
      </section>
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
