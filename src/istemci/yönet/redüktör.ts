import type { Aksiyon } from '@/istemci/yönet/aksiyonlar'

export default function Redüktör(durum: Durum, aksiyon: Aksiyon): Durum {
  switch (aksiyon.tip) {
    case 'TABLO_DEĞİŞTİR_BAŞLAT':
      return {
        ...durum,
        tablo: aksiyon.değer[0],
        amaç: 'listele',
        sayfa: 1,
        arama: '',
        veri: [],
        yükleniyor: true
      }
    case 'TABLO_DEĞİŞTİR_BİTİR':
      return {
        ...durum,
        veri: aksiyon.değer[0],
        yükleniyor: false
      }
    default:
      return durum
  }
}
