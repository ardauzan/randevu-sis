export default function Redüktör(durum: Durum, aksiyon: Aksiyon): Durum {
  const { tip, değer } = aksiyon
  switch (tip) {
    // info Eylem başlat
    // # Genel
    case 'LİSTELE':
      return {
        ...durum,
        amaç: 'listele',
        toplam: 0,
        veri: null,
        yükleniyor: true,
        hata: ''
      }
    case 'OKU':
      return {
        ...durum,
        tablo: değer[0],
        amaç: 'oku',
        veri: değer[1],
        yükleniyor: true,
        hata: ''
      }
    case 'EKLE':
      return {
        ...durum,
        amaç: 'ekle',
        veri: değer[0],
        yükleniyor: false,
        hata: ''
      }
    case 'GÜNCELLE':
      return {
        ...durum,
        amaç: 'güncelle',
        veri: değer[0],
        yükleniyor: false,
        hata: ''
      }
    case 'SİL':
      return {
        ...durum,
        amaç: 'sil',
        veri: değer[0],
        yükleniyor: false,
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
    case 'TETİKLE':
      if (
        durum.amaç === 'ekle' ||
        durum.amaç === 'güncelle' ||
        durum.amaç === 'sil'
      )
        return {
          ...durum,
          yükleniyor: true,
          hata: ''
        }
      else return durum
    // # Tablo
    case 'TABLO_DEĞİŞTİR':
      return {
        ...durum,
        tablo: değer[0],
        amaç: 'listele',
        sayfa: 1,
        arama: '',
        toplam: 0,
        veri: null,
        yükleniyor: true,
        hata: ''
      }
    // # Sayfa
    case 'SAYFA_DEĞİŞTİR':
      if (durum.amaç === 'listele')
        return {
          ...durum,
          sayfa: değer[0],
          yükleniyor: true,
          hata: ''
        }
      else return durum
    // # Sayfa Boyutu
    case 'SAYFA_BOYUTU_DEĞİŞTİR':
      return {
        ...durum,
        amaç: 'listele',
        sayfa: 1,
        sayfaBoyutu: değer[0],
        toplam: 0,
        veri: null,
        yükleniyor: true,
        hata: ''
      }
    // # Arama
    case 'ARAMA_DEĞİŞTİR':
      return {
        ...durum,
        amaç: 'listele',
        arama: değer[0],
        sayfa: 1,
        toplam: 0,
        veri: null,
        yükleniyor: true,
        hata: ''
      }
    //info Eylem bitir
    case 'LİSTELENDİ':
      return {
        ...durum,
        amaç: 'listele',
        sayfa: değer[0],
        veri: değer[1],
        toplam: değer[2],
        yükleniyor: false
      }
    case 'OKUNDU':
      return {
        ...durum,
        amaç: 'oku',
        veri: değer[0],
        yükleniyor: false
      }
    case 'OLMADI':
      return {
        ...durum,
        yükleniyor: false,
        hata: değer[0]
      }
  }
}
