/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import React, { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import Bilgilendirme from '@/istemci/bilgilendirme/bilgilendirme'

hydrateRoot(
  document,
  <StrictMode>
    <Bilgilendirme />
  </StrictMode>
)
