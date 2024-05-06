import React from 'react'

export default function PanelKontrolleriMobil() {
  return (
    <article className="hidden h-full flex-col items-center overflow-visible rounded-lg bg-gray-300 p-6 sm:flex">
      <h2 className="flex text-center font-mono text-xl tracking-tight">
        Kontrol paneli
      </h2>
      <ul className="mt-6 flex w-full flex-col space-y-2 rounded-lg border border-black bg-white shadow-md">
        <li className="text-center">
          <button className="font-serif text-blue-500 underline hover:text-blue-600 hover:no-underline focus:no-underline">
            Kişiler
          </button>
        </li>
        <li className="text-center">
          <button className="font-serif text-blue-500 underline hover:text-blue-600 hover:no-underline focus:no-underline">
            Projeler
          </button>
        </li>
      </ul>
      <section className="mt-6 flex w-full flex-col space-y-2 rounded-lg border border-black bg-white p-4 shadow-md">
        <section className="flex flex-col items-center">
          <section className="flex-auto">
            <h1 className="text-center font-mono text-2xl font-semibold tracking-tight">
              Kişiler
            </h1>
            <p className="mt-2 text-center text-sm text-gray-600">
              SDÜ Randevu Sistemi'nde mevcut olan kişileri yönetin.
            </p>
          </section>
          <section className="flex size-full flex-col">
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
    </article>
  )
}
