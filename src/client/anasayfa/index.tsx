/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import Anasayfa from '~/client/anasayfa/anasayfa'

hydrateRoot(document, <Anasayfa />)
