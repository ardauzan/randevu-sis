import React from 'react'
import {
  UserCircleIcon,
  ClipboardDocumentListIcon,
  WrenchIcon,
  CpuChipIcon,
  CalendarIcon,
  FaceSmileIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
  PlusIcon
} from '@heroicons/react/16/solid'

export default function PanelKontrolleriMobil() {
  return (
    <article className="hidden h-full flex-col items-center overflow-visible rounded-lg bg-gray-300 p-6 pt-8 sm:flex">
      <h2 className="flex text-center font-mono text-xl tracking-tight">
        Kontrol paneli
      </h2>
      <ul className="mt-8 grid w-full grid-flow-col grid-rows-4 gap-4 space-y-2 rounded-lg border border-black bg-white p-4 shadow-md">
        <li className="flex justify-center">
          <button className="flex text-center font-serif text-blue-500 underline hover:text-blue-600 hover:no-underline focus:no-underline">
            <UserCircleIcon className="size-4" />
            Kişiler
          </button>
        </li>
        <li className="flex justify-center">
          <button className="flex text-center font-serif text-blue-500 underline hover:text-blue-600 hover:no-underline focus:no-underline">
            <ClipboardDocumentListIcon className="size-4" />
            Projeler
          </button>
        </li>
        <li className="flex justify-center">
          <button className="flex text-center font-serif text-blue-500 underline hover:text-blue-600 hover:no-underline focus:no-underline">
            <WrenchIcon className="size-4" />
            Gereçler
          </button>
        </li>
        <li className="flex justify-center">
          <button className="flex text-center font-serif text-blue-500 underline hover:text-blue-600 hover:no-underline focus:no-underline">
            <CpuChipIcon className="size-4" />
            Araçlar
          </button>
        </li>
        <li className="flex justify-center">
          <button className="flex text-center font-serif text-blue-500 underline hover:text-blue-600 hover:no-underline focus:no-underline">
            <CalendarIcon className="size-4" />
            Randevular
          </button>
        </li>
        <li className="flex justify-center">
          <button className="flex text-center font-serif text-blue-500 underline hover:text-blue-600 hover:no-underline focus:no-underline">
            <FaceSmileIcon className="size-4" />
            Tatiller
          </button>
        </li>
        <li className="flex justify-center">
          <button className="flex text-center font-serif text-blue-500 underline hover:text-blue-600 hover:no-underline focus:no-underline">
            <UserGroupIcon className="size-4" />
            Ziyaretler
          </button>
        </li>
      </ul>
      <section className="mt-8 flex w-full flex-col space-y-2 rounded-lg border border-black bg-white p-4 shadow-md">
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
            <section className="flex items-center justify-center">
              <MagnifyingGlassIcon className="size-4" />
              <input
                type="text"
                className="my-2 block w-full rounded-md border border-gray-300 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                placeholder="Kişi Ara"
              />
            </section>
            <section className="flex justify-around">
              <button className="flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-center text-xs font-thin text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                <PlusIcon className="size-4" />
                Yeni Kişi Ekle
              </button>
              <select className="block rounded-md border border-blue-600 text-center text-xs font-semibold text-black shadow-sm hover:border-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
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
