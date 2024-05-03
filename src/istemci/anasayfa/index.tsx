/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import React, { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import Anasayfa from '@/istemci/anasayfa/anasayfa'

hydrateRoot(
  document,
  <StrictMode>
    <Anasayfa />
  </StrictMode>
)
