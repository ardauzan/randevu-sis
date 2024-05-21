/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import React, { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import Randevularım, {
  type RandevularımProps
} from '@/istemci/randevularım/randevularım'

const props = document.documentElement.getAttribute('data-props')
const { kimlikDurumu } = JSON.parse(props!) as RandevularımProps

hydrateRoot(
  document,
  <StrictMode>
    <Randevularım kimlikDurumu={kimlikDurumu} />
  </StrictMode>
)
