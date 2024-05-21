/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import React, { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import Giriş, { type GirişProps } from '@/istemci/giriş/giriş'

const props = document.documentElement.getAttribute('data-props')
const { kimlikDurumu } = JSON.parse(props!) as GirişProps

hydrateRoot(
  document,
  <StrictMode>
    <Giriş kimlikDurumu={kimlikDurumu} />
  </StrictMode>
)
