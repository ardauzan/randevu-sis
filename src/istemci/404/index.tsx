/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import React, { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import Bulunamadı, { type BulunamadıProps } from '@/istemci/404/404'

const props = document.documentElement.getAttribute('data-props')
const { kimlikDurumu } = JSON.parse(props!) as BulunamadıProps

hydrateRoot(
  document,
  <StrictMode>
    <Bulunamadı kimlikDurumu={kimlikDurumu} />
  </StrictMode>
)
