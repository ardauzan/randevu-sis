export interface Aksiyon {
  tip: string
  değer: any[]
}

export function tabloDeğiştirBaşlat(tablo: Tablo): Aksiyon {
  return { tip: 'TABLO_DEĞİŞTİR_BAŞLAT', değer: [tablo] }
}

export function tabloDeğiştirBitir(
  veri: ListelenenKişi[] | ListelenenProje[]
): Aksiyon {
  return { tip: 'TABLO_DEĞİŞTİR_BİTİR', değer: [veri] }
}

export function listeleBaşlat(): Aksiyon {
  return { tip: 'LİSTELE_BAŞLAT', değer: [] }
}

export function listeleBitir(
  veri: ListelenenKişi[] | ListelenenProje[]
): Aksiyon {
  return { tip: 'LİSTELE_BİTİR', değer: [veri] }
}
