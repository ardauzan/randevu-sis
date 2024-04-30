/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import Admin from '~/client/admin/admin'

hydrateRoot(document, <Admin />)
