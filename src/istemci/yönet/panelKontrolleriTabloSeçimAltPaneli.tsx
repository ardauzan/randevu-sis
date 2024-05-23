import React, { useContext } from 'react'
import clsx from 'clsx'
import {
  UserCircleIcon,
  ClipboardDocumentListIcon,
  WrenchIcon,
  CpuChipIcon,
  CalendarIcon,
  FaceSmileIcon,
  UserGroupIcon
} from '@heroicons/react/16/solid'
import Durum from '@/istemci/yönet/durum'
import { tabloDeğiştir } from '@/istemci/yönet/aksiyonlar'

export interface PanelKontrolleriTabloSeçimAltPaneliProps {
  readonly kontrollerGörünüyor?: boolean
}

export default function PanelKontrolleriTabloSeçimAltPaneli({
  kontrollerGörünüyor = true
}: PanelKontrolleriTabloSeçimAltPaneliProps) {
  const {
    durum: { tablo },
    aksiyonYayınla
  } = useContext(Durum)

  return (
    <ul
      className={clsx(
        'mt-6 grid grid-flow-col grid-rows-4 gap-4 space-y-2 rounded-lg border border-black bg-white p-4 shadow-md transition-all duration-500 ease-in-out sm:mt-8 sm:w-full',
        kontrollerGörünüyor ? 'opacity-100' : 'pointer-events-none opacity-0'
      )}
    >
      <li className="flex justify-center">
        <button
          disabled={tablo === 'kişiler'}
          className="flex text-center font-serif text-blue-500 underline hover:text-blue-600 hover:no-underline focus:no-underline disabled:text-gray-900 disabled:no-underline disabled:hover:text-gray-900"
          onClick={() => {
            aksiyonYayınla(tabloDeğiştir('kişiler'))
          }}
        >
          <UserCircleIcon className="size-4" />
          Kişiler
        </button>
      </li>
      <li className="flex justify-center">
        <button
          disabled={tablo === 'projeler'}
          className="flex text-center font-serif text-blue-500 underline hover:text-blue-600 hover:no-underline focus:no-underline disabled:text-gray-900 disabled:no-underline disabled:hover:text-gray-900"
          onClick={() => {
            aksiyonYayınla(tabloDeğiştir('projeler'))
          }}
        >
          <ClipboardDocumentListIcon className="size-4" />
          Projeler
        </button>
      </li>
      <li className="flex justify-center">
        <button
          disabled={tablo === 'gereçler'}
          className="flex text-center font-serif text-blue-500 underline hover:text-blue-600 hover:no-underline focus:no-underline disabled:text-gray-900 disabled:no-underline disabled:hover:text-gray-900"
          onClick={() => {
            aksiyonYayınla(tabloDeğiştir('gereçler'))
          }}
        >
          <WrenchIcon className="size-4" />
          Gereçler
        </button>
      </li>
      <li className="flex justify-center">
        <button
          disabled={tablo === 'araçlar'}
          className="flex text-center font-serif text-blue-500 underline hover:text-blue-600 hover:no-underline focus:no-underline disabled:text-gray-900 disabled:no-underline disabled:hover:text-gray-900"
          onClick={() => {
            aksiyonYayınla(tabloDeğiştir('araçlar'))
          }}
        >
          <CpuChipIcon className="size-4" />
          Araçlar
        </button>
      </li>
      <li className="flex justify-center">
        <button
          disabled={tablo === 'randevular'}
          className="flex text-center font-serif text-blue-500 underline hover:text-blue-600 hover:no-underline focus:no-underline disabled:text-gray-900 disabled:no-underline disabled:hover:text-gray-900"
          onClick={() => {
            aksiyonYayınla(tabloDeğiştir('randevular'))
          }}
        >
          <CalendarIcon className="size-4" />
          Randevular
        </button>
      </li>
      <li className="flex justify-center">
        <button
          disabled={tablo === 'tatiller'}
          className="flex text-center font-serif text-blue-500 underline hover:text-blue-600 hover:no-underline focus:no-underline disabled:text-gray-900 disabled:no-underline disabled:hover:text-gray-900"
          onClick={() => {
            aksiyonYayınla(tabloDeğiştir('tatiller'))
          }}
        >
          <FaceSmileIcon className="size-4" />
          Tatiller
        </button>
      </li>
      <li className="flex justify-center">
        <button
          disabled={tablo === 'ziyaretler'}
          className="flex text-center font-serif text-blue-500 underline hover:text-blue-600 hover:no-underline focus:no-underline disabled:text-gray-900 disabled:no-underline disabled:hover:text-gray-900"
          onClick={() => {
            aksiyonYayınla(tabloDeğiştir('ziyaretler'))
          }}
        >
          <UserGroupIcon className="size-4" />
          Ziyaretler
        </button>
      </li>
    </ul>
  )
}
