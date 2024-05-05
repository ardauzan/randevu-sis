//info Bu dosyada kullanıcılarının sayfalar arasında geçiş yapmasını sağlıyıcak olan en temel yapıyı tanımlıyoruz.
//info Bu navigasyon objesini masaüstü ve mobil cihazlar için ayrı ayrı sunucaz, bunun için de ayrı ayrı bileşenler oluşturucaz.
import React from 'react'
import {
  HomeIcon,
  LockOpenIcon,
  CalendarIcon,
  WrenchScrewdriverIcon,
  InformationCircleIcon
} from '@heroicons/react/20/solid'

const navigasyon: Navigasyon = {
  Anasayfa: [
    '/',
    <HomeIcon className="size-8" />,
    ['yok', 'kullanıcı', 'yönetici'],
    '/'
  ],
  Giriş: [
    '/giris',
    <LockOpenIcon className="size-8" />,
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
    ['yok', 'kullanıcı', 'yönetici'],
    '/bilgilendirme'
  ]
}

export default navigasyon
