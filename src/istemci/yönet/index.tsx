/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import React, { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import Yönet, { type YönetProps } from '@/istemci/yönet/yönet'

const props = document.documentElement.getAttribute('data-props')
const { ilkDurum } = JSON.parse(props!) as YönetProps

hydrateRoot(
  document,
  <StrictMode>
    <Yönet ilkDurum={ilkDurum} />
  </StrictMode>
)
