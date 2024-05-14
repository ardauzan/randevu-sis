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
        yükleniyor: true,
        hata: ''
      }
    case 'TAZELE':
      if (durum.amaç === 'listele' || durum.amaç === 'oku')
        return {
          ...durum,
          yükleniyor: true,
          hata: ''
        }
      else return durum
    case 'DETAYLI_OKU':
      return {
        ...durum,
        amaç: 'oku',
        veri: aksiyon.değer[0],
        yükleniyor: true,
        hata: ''
      }
    case 'LİSTELENDİ':
      return {
        ...durum,
        sayfa: aksiyon.değer[0],
        veri: aksiyon.değer[1],
        yükleniyor: false
      }
    case 'DETAYLI_OKUNDU':
      return {
        ...durum,
        veri: aksiyon.değer[0],
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
