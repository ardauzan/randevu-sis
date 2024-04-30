import React, { useContext } from 'react'
import AdminContext from '~/client/admin/context'
import {
  getDateWithoutTime,
  putComaInBetweenNumbersInAnArray,
  normalizeTime,
  putColonInBetweenNumbersInAnArrayInAnArray,
  tarihVeSaattenSaniyeyiAyır
} from '~/client/lib'

type Props = {
  setAmaç: (amaç: Amaç, veri: Veri | undefined) => void
  data: Veriler
}
export default function Tablo({ setAmaç, data }: Props) {
  const { tablo } = useContext(AdminContext)
  return (
    <article className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  {(() =>
                    typeof (data[0] as Veri)?.id !== 'undefined' ? (
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        id
                      </th>
                    ) : null)()}
                  {(() =>
                    typeof (data[0] as Kişi)?.öğrencino !== 'undefined' ? (
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        öğrencino
                      </th>
                    ) : null)()}
                  {(() =>
                    typeof (data[0] as Kişi | Proje | Gereç | Sarf)?.ad !==
                    'undefined' ? (
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        ad
                      </th>
                    ) : null)()}
                  {(() =>
                    typeof (data[0] as Kişi)?.soyad !== 'undefined' ? (
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        soyad
                      </th>
                    ) : null)()}
                  {(() =>
                    typeof (data[0] as Kişi)?.email !== 'undefined' ? (
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        email
                      </th>
                    ) : null)()}
                  {(() =>
                    typeof (data[0] as Proje | Tatil)?.açıklama !==
                    'undefined' ? (
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        açıklama
                      </th>
                    ) : null)()}
                  {(() =>
                    typeof (data[0] as Proje)?.sorumlu !== 'undefined' ? (
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        sorumlu
                      </th>
                    ) : null)()}
                  {(() =>
                    typeof (data[0] as Proje)?.üyeler !== 'undefined' ? (
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        üyeler
                      </th>
                    ) : null)()}
                  {(() =>
                    typeof (data[0] as Gereç)?.adet !== 'undefined' ? (
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        adet
                      </th>
                    ) : null)()}
                  {(() =>
                    typeof (data[0] as Sarf)?.sicilno !== 'undefined' ? (
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        sicil no
                      </th>
                    ) : null)()}
                  {(() =>
                    typeof (data[0] as Sarf)?.arızalı !== 'undefined' ? (
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        arızalı
                      </th>
                    ) : null)()}
                  {(() =>
                    typeof (data[0] as Randevu)?.proje !== 'undefined' ? (
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        proje
                      </th>
                    ) : null)()}
                  {(() =>
                    typeof (data[0] as Randevu)?.gereçler !== 'undefined' ? (
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        gereçler
                      </th>
                    ) : null)()}
                  {(() =>
                    typeof (data[0] as Randevu)?.sarflar !== 'undefined' ? (
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        sarflar
                      </th>
                    ) : null)()}
                  {(() =>
                    typeof (data[0] as Ziyaret)?.ziyareteden !== 'undefined' ? (
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        ziyaret eden
                      </th>
                    ) : null)()}
                  {(() =>
                    typeof (data[0] as Ziyaret)?.ziyaretçisayısı !==
                    'undefined' ? (
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        ziyaretçi sayısı
                      </th>
                    ) : null)()}
                  {(() =>
                    typeof (data[0] as Proje | Tatil)?.başlangıç !==
                    'undefined' ? (
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        başlangıç
                      </th>
                    ) : null)()}
                  {(() =>
                    typeof (data[0] as Proje | Tatil)?.bitiş !== 'undefined' ? (
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        bitiş
                      </th>
                    ) : null)()}
                  {(() =>
                    typeof (data[0] as Randevu | Ziyaret)?.gün !==
                    'undefined' ? (
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Gün
                      </th>
                    ) : null)()}
                  {(() =>
                    typeof (data[0] as Randevu | Ziyaret)?.başlangıçzamanı !==
                    'undefined' ? (
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Başlangıç Zamanı
                      </th>
                    ) : null)()}
                  {(() =>
                    typeof (data[0] as Randevu | Ziyaret)?.bitişzamanı !==
                    'undefined' ? (
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Bitiş Zamanı
                      </th>
                    ) : null)()}
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only cursor-pointer">Güncelle</span>
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Sil</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((item, index) => (
                  <tr key={index}>
                    {(() =>
                      typeof (item as Veri)?.id !== 'undefined' ? (
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {(item as Veri).id}
                        </td>
                      ) : null)()}
                    {(() =>
                      typeof (item as Kişi)?.öğrencino !== 'undefined' ? (
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {(item as Kişi).öğrencino}
                        </td>
                      ) : null)()}
                    {(() =>
                      typeof (item as Kişi | Proje | Gereç | Sarf)?.ad !==
                      'undefined' ? (
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {(item as Kişi | Proje | Gereç | Sarf).ad}
                        </td>
                      ) : null)()}
                    {(() =>
                      typeof (item as Kişi)?.soyad !== 'undefined' ? (
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {(item as Kişi).soyad}
                        </td>
                      ) : null)()}
                    {(() =>
                      typeof (item as Kişi)?.email !== 'undefined' ? (
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {(item as Kişi).email}
                        </td>
                      ) : null)()}
                    {(() =>
                      typeof (item as Proje | Tatil)?.açıklama !==
                      'undefined' ? (
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {(item as Proje | Tatil).açıklama}
                        </td>
                      ) : null)()}
                    {(() =>
                      typeof (item as Proje)?.sorumlu !== 'undefined' ? (
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {(item as Proje).sorumlu}
                        </td>
                      ) : null)()}
                    {(() =>
                      typeof (item as Proje)?.üyeler !== 'undefined' ? (
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {putComaInBetweenNumbersInAnArray(
                            (item as Proje).üyeler
                          )}
                        </td>
                      ) : null)()}
                    {(() =>
                      typeof (item as Gereç)?.adet !== 'undefined' ? (
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {(item as Gereç).adet}
                        </td>
                      ) : null)()}
                    {(() =>
                      typeof (item as Sarf)?.sicilno !== 'undefined' ? (
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {(item as Sarf).sicilno}
                        </td>
                      ) : null)()}
                    {(() =>
                      typeof (item as Sarf)?.arızalı !== 'undefined' ? (
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {(item as Sarf).arızalı ? 'Evet' : 'Hayır'}
                        </td>
                      ) : null)()}
                    {(() =>
                      typeof (item as Randevu)?.proje !== 'undefined' ? (
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {(item as Randevu).proje}
                        </td>
                      ) : null)()}
                    {(() =>
                      typeof (item as Randevu)?.gereçler !== 'undefined' ? (
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {putColonInBetweenNumbersInAnArrayInAnArray(
                            (item as Randevu).gereçler
                          )}
                        </td>
                      ) : null)()}
                    {(() =>
                      typeof (item as Randevu)?.sarflar !== 'undefined' ? (
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {putComaInBetweenNumbersInAnArray(
                            (item as Randevu).sarflar
                          )}
                        </td>
                      ) : null)()}
                    {(() =>
                      typeof (item as Ziyaret)?.ziyareteden !== 'undefined' ? (
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {(item as Ziyaret).ziyareteden}
                        </td>
                      ) : null)()}
                    {(() =>
                      typeof (item as Ziyaret)?.ziyaretçisayısı !==
                      'undefined' ? (
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {(item as Ziyaret).ziyaretçisayısı}
                        </td>
                      ) : null)()}
                    {(() =>
                      typeof (item as Proje | Tatil)?.başlangıç !==
                      'undefined' ? (
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {getDateWithoutTime(
                            normalizeTime((item as Proje | Tatil).başlangıç)
                          )}
                        </td>
                      ) : null)()}
                    {(() =>
                      typeof (item as Proje | Tatil)?.bitiş !== 'undefined' ? (
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {getDateWithoutTime(
                            normalizeTime((item as Proje | Tatil).bitiş)
                          )}
                        </td>
                      ) : null)()}
                    {(() =>
                      typeof (item as Randevu | Ziyaret)?.gün !==
                      'undefined' ? (
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {getDateWithoutTime(
                            normalizeTime((item as Randevu | Ziyaret).gün)
                          )}
                        </td>
                      ) : null)()}
                    {(() =>
                      typeof (item as Randevu | Ziyaret)?.gün !==
                      'undefined' ? (
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {(item as Randevu | Ziyaret).gün}
                        </td>
                      ) : null)()}
                    {(() =>
                      typeof (item as Randevu | Ziyaret)?.başlangıçzamanı !==
                      'undefined' ? (
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {(item as Randevu | Ziyaret).başlangıçzamanı}
                        </td>
                      ) : null)()}
                    {(() =>
                      typeof (item as Randevu | Ziyaret)?.bitişzamanı !==
                      'undefined' ? (
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {(item as Randevu | Ziyaret).bitişzamanı}
                        </td>
                      ) : null)()}

                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <span
                        onClick={() => setAmaç('güncelle', item)}
                        className="cursor-pointer text-indigo-600 hover:text-indigo-900"
                      >
                        <span className="sr-only">, {item.id}</span>
                        Güncelle
                      </span>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <span
                        onClick={() => setAmaç('sil', item)}
                        className="cursor-pointer text-indigo-600 hover:text-indigo-900"
                      >
                        <span className="sr-only">, {item.id}</span>
                        Sil
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </article>
  )
}
