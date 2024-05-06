/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import React, { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import Yönet from '@/istemci/yönet/yönet'
import type { YönetProps } from '@/istemci/yönet/yönet'

//info Yönet sayfasının prop larını oluşturulmuş olan html elementinin data-props attribute değerinden alır.
const props = document.documentElement.getAttribute('data-props')
const { ilkDurum } = JSON.parse(props!) as YönetProps

hydrateRoot(
  document,
  <StrictMode>
    <Yönet ilkDurum={ilkDurum} />
  </StrictMode>
)
