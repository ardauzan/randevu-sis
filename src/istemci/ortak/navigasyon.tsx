import React from 'react'
import {
  HomeIcon,
  LockClosedIcon,
  CalendarIcon,
  WrenchScrewdriverIcon,
  InformationCircleIcon
} from '@heroicons/react/20/solid'

const navigasyon: Navigasyon = {
  Anasayfa: [
    '/',
    <HomeIcon className="size-8" />,
    ['yok', 'kullanıcı', 'yönetici']
  ],
  Giriş: [
    '/giris',
    <LockClosedIcon className="size-8" />,
    ['yok'],
    '/randevularim'
  ],
  Randevularım: [
    '/randevularim',
    <CalendarIcon className="size-8" />,
    ['kullanıcı', 'yönetici'],
    '/giris'
  ],
  Yönet: [
    '/yonet',
    <WrenchScrewdriverIcon className="size-8" />,
    ['yönetici'],
    '/'
  ],
  Bilgilendirme: [
    '/bilgilendirme',
    <InformationCircleIcon className="size-8" />,
    ['yok', 'kullanıcı', 'yönetici']
  ]
}

export default navigasyon
