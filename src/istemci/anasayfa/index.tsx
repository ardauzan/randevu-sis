/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import React, { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import Anasayfa from '@/istemci/anasayfa/anasayfa'
import type { AnasayfaProps } from '@/istemci/anasayfa/anasayfa'

//info Anasayfanın prop larını oluşturulmuş olan html elementinin data-props attribute değerinden alır.
const props = document.documentElement.getAttribute('data-props')
const { kimlikDurumu } = JSON.parse(props!) as AnasayfaProps

hydrateRoot(
  document,
  <StrictMode>
    <Anasayfa kimlikDurumu={kimlikDurumu} />
  </StrictMode>
)
