//info Bu dosyada uygulamanın başlık bileşeni bulunmaktadır.
import React from 'react'

export default function Başlık() {
  return (
    <header className="bg-blue-500 py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <img
          src="/public/logo.png"
          alt="Logo"
          className="-mr-5 size-[55px]"
          loading="lazy"
          fetchPriority="low"
        />
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-white">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-white">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="text-white">
                Contact
              </a>
            </li>
          </ul>
        </nav>
        <button className="block text-white md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </header>
  )
}
