//info Giriş sayfasının istemci tarafında hydrate edilmesi sağlanır.
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import React, { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import Giriş from '@/istemci/giriş/giriş'

hydrateRoot(
  document,
  <StrictMode>
    <Giriş />
  </StrictMode>
)
