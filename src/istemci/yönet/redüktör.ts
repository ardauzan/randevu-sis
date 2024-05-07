import type { Aksiyon } from '@/istemci/yönet/aksiyonlar'

export default function Redüktör(durum: Durum, aksiyon: Aksiyon): Durum {
  switch (aksiyon.tip) {
    case 'TABLO_DEĞİŞTİR':
      return {
        ...durum,
        tablo: aksiyon.değer[0],
        amaç: 'listele',
        sayfa: 1,
        arama: '',
        veri: [],
        yükleniyor: true
      }
    case 'TAZELE':
      if (durum.amaç === 'listele' || durum.amaç === 'oku')
        return {
          ...durum,
          yükleniyor: false
        }
      else return durum
    case 'LİSTELENDİ':
      return {
        ...durum,
        sayfa: aksiyon.değer[0],
        veri: aksiyon.değer[1],
        yükleniyor: false
      }
    case 'OLMADI':
      return {
        ...durum,
        yükleniyor: false,
        hata: aksiyon.değer[0]
      }
    default:
      return durum
  }
}
