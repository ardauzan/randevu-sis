//info Giriş sayfasının istemci tarafında hydrate edilmesi sağlanır.
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import React, { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import Giriş from '@/istemci/giriş/giriş'
import type { GirişProps } from '@/istemci/giriş/giriş'

//info Giriş sayfasının prop larını oluşturulmuş olan html elementinin data-props attribute değerinden alır.
const props = document.documentElement.getAttribute('data-props')
const { kimlikDurumu } = JSON.parse(props!) as GirişProps

hydrateRoot(
  document,
  <StrictMode>
    <Giriş kimlikDurumu={kimlikDurumu} />
  </StrictMode>
)
