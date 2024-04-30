import React, { Fragment, useState, useContext, useEffect } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  CalendarIcon,
  WrenchScrewdriverIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Tablo from '~/client/admin/tablo'
import Popup from '~/client/admin/popup'
import Pagination from '~/client/admin/pagination'
import AdminContext from '~/client/admin/context'
import { verileriSorgula } from '~/client/lib'

//# Navigasyon
const navigasyon = [
  { isim: 'Kişiler', tablo: 'kisi', icon: UsersIcon },
  { isim: 'Projeler', tablo: 'proje', icon: FolderIcon },
  { isim: 'Gereçler', tablo: 'gerec', icon: WrenchScrewdriverIcon },
  { isim: 'Sarflar', tablo: 'sarf', icon: WrenchScrewdriverIcon },
  { isim: 'Randevular', tablo: 'randevu', icon: CalendarIcon },
  { isim: 'Tatiller', tablo: 'tatil', icon: CalendarIcon },
  { isim: 'Ziyaretler', tablo: 'ziyaret', icon: CalendarIcon }
]

//# Class names yardımcı fonksiyonu
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

//# Main
export default function Main() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [popupOpen, setPopupOpen] = useState(false)
  const [data, setData] = useState<Veriler>([])
  const [total, setTotal] = useState<number>(1)
  const [amaç, setAmaç] = useState<Amaç>('ekle')
  const [seçilenVeri, setSeçilenVeri] = useState<Veri | undefined>(undefined)

  const {
    arama,
    setArama,
    sayfa,
    setSayfa,
    sayfaBoyutu,
    setSayfaBoyutu,
    tablo,
    setTablo
  } = useContext(AdminContext)

  const _setTablo = (tablo: Tablo) => {
    setTablo(tablo)
    setPopupOpen(false)
  }
  const _setData = async () => {
    const veriler = await verileriSorgula(arama, sayfa, sayfaBoyutu, tablo)
    setData(veriler?.içerik || [])
    setTotal(veriler!.total || 1)
  }
  const _setAmaç = (amaç: Amaç, veri: Veri | undefined) => {
    setSeçilenVeri(veri)
    setAmaç(amaç)
    setPopupOpen(true)
  }

  useEffect(() => {
    _setData()
    const id = setInterval(() => {
      _setData()
    }, 2000)
    return () => {
      clearInterval(id)
    }
  }, [arama, sayfa, sayfaBoyutu, tablo])

  return (
    <main className="h-full">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="section"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <section className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <section className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <section className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Menü yü kapat</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </section>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <section className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                  <section className="flex h-16 shrink-0 items-center">
                    <img
                      className="h-8 w-auto"
                      src="https://w3.sdu.edu.tr/assets/img/sdu-logo.png"
                      alt="Süleyman Demirel Üniversitesi"
                    />
                  </section>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigasyon.map((item) => (
                            <li key={item.isim}>
                              <button
                                type="button"
                                onClick={() => {
                                  _setTablo(item.tablo as Tablo)
                                  setSidebarOpen(false)
                                }}
                                className={classNames(
                                  item.tablo === tablo
                                    ? 'bg-gray-50 text-indigo-600'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                  'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                                )}
                              >
                                <item.icon
                                  className={classNames(
                                    item.tablo === tablo
                                      ? 'text-indigo-600'
                                      : 'text-gray-400 group-hover:text-indigo-600',
                                    'h-6 w-6 shrink-0'
                                  )}
                                  aria-hidden="true"
                                />
                                {item.isim}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li className="mt-auto">
                        <a
                          href="/"
                          className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                        >
                          <HomeIcon
                            className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                            aria-hidden="true"
                          />
                          Anasayfa
                        </a>
                      </li>
                    </ul>
                  </nav>
                </section>
              </Dialog.Panel>
            </Transition.Child>
          </section>
        </Dialog>
      </Transition.Root>

      <section className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <section className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <section className="flex h-16 shrink-0 items-center">
            <img
              className="h-8 w-auto"
              src="https://w3.sdu.edu.tr/assets/img/sdu-logo.png"
              alt="Süleyman Demirel Üniversitesi"
            />
          </section>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigasyon.map((item, index) => (
                    <li key={index}>
                      <button
                        type="button"
                        onClick={() => _setTablo(item.tablo as Tablo)}
                        className={classNames(
                          item.tablo === tablo
                            ? 'bg-gray-50 text-indigo-600'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                          'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.tablo === tablo
                              ? 'text-indigo-600'
                              : 'text-gray-400 group-hover:text-indigo-600',
                            'h-6 w-6 shrink-0'
                          )}
                          aria-hidden="true"
                        />
                        {item.isim}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <a
                  href="/"
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                >
                  <HomeIcon
                    className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                    aria-hidden="true"
                  />
                  Anasayfa
                </a>
              </li>
            </ul>
          </nav>
        </section>
      </section>
      <section className="lg:pl-72">
        <section className="sticky top-0 z-40 lg:mx-auto lg:max-w-7xl lg:px-8">
          <section className="flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            <section
              className="h-6 w-px bg-gray-200 lg:hidden"
              aria-hidden="true"
            />

            <section className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form
                className="relative flex flex-1"
                onSubmit={(e) => {
                  e.preventDefault()
                }}
              >
                <label htmlFor="search-field" className="sr-only">
                  Arama
                </label>
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  id="search-field"
                  className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="Ara..."
                  type="search"
                  name="search"
                  value={arama}
                  onChange={(e) => setArama(e.target.value)}
                  disabled={popupOpen || tablo === 'randevu'}
                />
              </form>
              <section className="flex items-center gap-x-4 lg:gap-x-6">
                <span className="block">
                  <button
                    type="button"
                    onClick={() => _setAmaç('ekle', undefined)}
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Yeni Ekle
                  </button>
                </span>
                <Menu as="section" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Sayfa Boyutu</span>
                    <span className="flex items-center">
                      <span
                        className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                        aria-hidden="true"
                      >
                        Sayfa Boyutu
                      </span>
                      <ChevronDownIcon
                        className="ml-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="button"
                            onClick={() => setSayfaBoyutu(10)}
                            className={classNames(
                              active || sayfaBoyutu === 10 ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            10
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="button"
                            onClick={() => setSayfaBoyutu(100)}
                            className={classNames(
                              active || sayfaBoyutu === 100
                                ? 'bg-gray-100'
                                : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            100
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </section>
            </section>
          </section>
        </section>
        <section className="py-10">
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {(() =>
              popupOpen ? (
                <Popup
                  setPopupDisabled={() => setPopupOpen(false)}
                  amaç={amaç}
                  tablo={tablo}
                  seçilenVeri={seçilenVeri}
                />
              ) : (
                <>
                  <Tablo setAmaç={_setAmaç} data={data} />
                  <Pagination
                    currentPage={sayfa}
                    totalCount={total}
                    onPageChange={setSayfa}
                    pageSize={sayfaBoyutu}
                  />
                </>
              ))()}
          </section>
        </section>
      </section>
    </main>
  )
}
