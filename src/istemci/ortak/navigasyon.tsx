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
  Anasayfa: ['/', <HomeIcon className="size-8" />, 'herkes'],
  Giriş: ['/giris', <LockOpenIcon className="size-8" />, 'girişYapmamış'],
  Randevularım: [
    '/randevularim',
    <CalendarIcon className="size-8" />,
    'girişYapmış'
  ],
  Yönet: ['/yonet', <WrenchScrewdriverIcon className="size-8" />, 'yönetici'],
  Bilgilendirme: [
    '/bilgilendirme',
    <InformationCircleIcon className="size-8" />,
    'herkes'
  ]
}

export default navigasyon
