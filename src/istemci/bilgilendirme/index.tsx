/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import React, { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import Bilgilendirme from '@/istemci/bilgilendirme/bilgilendirme'
import type { BilgilendirmeProps } from '@/istemci/bilgilendirme/bilgilendirme'

const props = document.documentElement.getAttribute('data-props')
const { kimlikDurumu } = JSON.parse(props!) as BilgilendirmeProps

hydrateRoot(
  document,
  <StrictMode>
    <Bilgilendirme kimlikDurumu={kimlikDurumu} />
  </StrictMode>
)
