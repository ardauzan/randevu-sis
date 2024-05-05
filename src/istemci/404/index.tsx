/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import React, { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import Bulunamadı from '@/istemci/404/404'
import type { BulunamadıProps } from '@/istemci/404/404'

//info Bulunamadı sayfasının prop larını oluşturulmuş olan html elementinin data-props attribute değerinden alır.
const props = document.documentElement.getAttribute('data-props')
const { kimlikDurumu } = JSON.parse(props!) as BulunamadıProps

hydrateRoot(
  document,
  <StrictMode>
    <Bulunamadı kimlikDurumu={kimlikDurumu} />
  </StrictMode>
)
