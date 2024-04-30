import React from 'react'
import { BackspaceIcon } from '@heroicons/react/24/outline'
import VerilereGöreArayüz from '~/client/admin/VerilereGöreArayüz'
import {
  returnUndefinedIfEmptyString,
  parseArrayOfStringsToArrayOfNumbers,
  parseGereçler
} from '~/client/lib'

interface PopupProps {
  setPopupDisabled: () => void
  tablo: Tablo
  amaç: Amaç
  seçilenVeri: Veri | undefined
}

export default function Popup({
  setPopupDisabled,
  tablo,
  amaç,
  seçilenVeri
}: PopupProps) {
  return (
    <article className="px-4 sm:px-6 lg:px-8">
      <section className="mt-8 flex flow-root">
        <BackspaceIcon
          type="button"
          onClick={() => {
            setPopupDisabled()
          }}
          className="float-right mr-6 mt-6 flex h-full w-5 cursor-pointer text-gray-400"
        />
        {(() => {
          switch (amaç) {
            case 'ekle':
              return (
                <article className="bg-white shadow sm:rounded-lg">
                  <section className="px-4 py-5 sm:p-6">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                      Veri Ekle
                    </h3>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()

                        fetch(`/api/${tablo}`, {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({
                            öğrencino: e.currentTarget['öğrencino']?.value,
                            ad: e.currentTarget['ad']?.value,
                            soyad: e.currentTarget['soyad']?.value,
                            email: e.currentTarget['email']?.value,
                            şifre: e.currentTarget['şifre']?.value,
                            açıklama: e.currentTarget['açıklama']?.value,
                            sorumlu: e.currentTarget['sorumlu']?.value,
                            üyeler: e.currentTarget['üyeler']?.value
                              ? parseArrayOfStringsToArrayOfNumbers(
                                  e.currentTarget['üyeler']?.value
                                )
                              : undefined,
                            adet: e.currentTarget['adet']?.value,
                            sicilno: e.currentTarget['sicilno']?.value,
                            arızalı: e.currentTarget['arızalı']?.checked,
                            proje: e.currentTarget['proje']?.value,
                            gereçler: e.currentTarget['sarflar']?.value
                              ? parseGereçler(
                                  e.currentTarget['gereçler']?.value
                                )
                              : undefined,
                            sarflar: e.currentTarget['sarflar']?.value
                              ? parseArrayOfStringsToArrayOfNumbers(
                                  e.currentTarget['sarflar']?.value
                                )
                              : undefined,
                            ziyareteden: e.currentTarget['ziyareteden']?.value,
                            ziyaretçisayısı:
                              e.currentTarget['ziyaretçisayısı']?.value,
                            başlangıç: e.currentTarget['başlangıç']?.value,
                            bitiş: e.currentTarget['bitiş']?.value,
                            gün: e.currentTarget['gün']?.value,
                            başlangıçzamanı:
                              e.currentTarget['başlangıçzamanı']?.value,
                            bitişzamanı: e.currentTarget['bitişzamanı']?.value
                          })
                        })
                        setPopupDisabled()
                      }}
                      className="mt-5 sm:flex sm:items-center"
                    >
                      <VerilereGöreArayüz
                        tablo={tablo}
                        seçilenVeri={seçilenVeri}
                        amaç={amaç}
                      />
                      <button
                        type="submit"
                        className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
                      >
                        Kaydet
                      </button>
                    </form>
                  </section>
                </article>
              )
            case 'güncelle':
              return (
                <article className="bg-white shadow sm:rounded-lg">
                  <section className="px-4 py-5 sm:p-6">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                      Veri Güncelle
                    </h3>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        fetch(`/api/${tablo}/${seçilenVeri?.id}`, {
                          method: 'PATCH',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({
                            öğrencino: e.currentTarget['öğrencino']?.value,
                            ad: returnUndefinedIfEmptyString(
                              e.currentTarget['ad']?.value
                            ),
                            soyad: returnUndefinedIfEmptyString(
                              e.currentTarget['soyad']?.value
                            ),
                            email: returnUndefinedIfEmptyString(
                              e.currentTarget['email']?.value
                            ),
                            şifre: returnUndefinedIfEmptyString(
                              e.currentTarget['şifre']?.value
                            ),

                            açıklama: returnUndefinedIfEmptyString(
                              e.currentTarget['açıklama']?.value
                            ),
                            sorumlu: e.currentTarget['sorumlu']?.value,
                            üyeler: e.currentTarget['üyeler']?.value
                              ? parseArrayOfStringsToArrayOfNumbers(
                                  e.currentTarget['üyeler']?.value
                                )
                              : undefined,
                            adet: e.currentTarget['adet']?.value,
                            sicilno: returnUndefinedIfEmptyString(
                              e.currentTarget['sicilno']?.value
                            ),
                            arızalı: e.currentTarget['arızalı']?.checked,
                            proje: e.currentTarget['proje']?.value,
                            gereçler: e.currentTarget['sarflar']?.value
                              ? parseGereçler(
                                  e.currentTarget['gereçler']?.value
                                )
                              : undefined,
                            sarflar: e.currentTarget['sarflar']?.value
                              ? parseArrayOfStringsToArrayOfNumbers(
                                  e.currentTarget['sarflar']?.value
                                )
                              : undefined,
                            ziyareteden: returnUndefinedIfEmptyString(
                              e.currentTarget['ziyareteden']?.value
                            ),
                            ziyaretçisayısı: returnUndefinedIfEmptyString(
                              e.currentTarget['ziyaretçisayısı']?.value
                            ),
                            başlangıç: e.currentTarget['başlangıç']?.value,
                            bitiş: e.currentTarget['bitiş']?.value,
                            gün: e.currentTarget['gün']?.value,
                            başlangıçzamanı:
                              e.currentTarget['başlangıçzamanı']?.value
                          })
                        })
                        setPopupDisabled()
                      }}
                      className="mt-5 sm:flex sm:items-center"
                    >
                      <VerilereGöreArayüz
                        tablo={tablo}
                        seçilenVeri={seçilenVeri}
                        amaç={amaç}
                      />
                      <button
                        type="submit"
                        className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
                      >
                        Kaydet
                      </button>
                    </form>
                  </section>
                </article>
              )
            case 'sil':
              return (
                <article className="bg-white shadow sm:rounded-lg">
                  <section className="px-4 py-5 sm:p-6">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                      Veri yi sil
                    </h3>
                    <section className="mt-2 max-w-xl text-sm text-gray-500">
                      <p>
                        Bu veri yi sil. Bu işlem geri alınamaz. Emin misiniz?
                      </p>
                    </section>
                    <form
                      className="mt-5 sm:flex sm:items-center"
                      onSubmit={(e) => {
                        e.preventDefault()
                      }}
                    >
                      <button
                        type="submit"
                        className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
                        onClick={() => {
                          fetch(`/api/${tablo}/${seçilenVeri?.id}`, {
                            method: 'DELETE'
                          })
                          setPopupDisabled()
                        }}
                      >
                        Sil
                      </button>
                    </form>
                  </section>
                </article>
              )
            default:
              return null
          }
        })()}
      </section>
    </article>
  )
}
