/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import React, { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import Bulunamadı from '@/istemci/404/404'

hydrateRoot(
  document,
  <StrictMode>
    <Bulunamadı />
  </StrictMode>
)
