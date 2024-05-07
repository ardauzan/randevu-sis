export interface Aksiyon {
  tip: string
  değer: any[]
}

//# Durum değişimi başlat
export function tabloDeğiştir(tablo: Tablo): Aksiyon {
  return { tip: 'TABLO_DEĞİŞTİR', değer: [tablo] }
}
export function tazele(): Aksiyon {
  return { tip: 'TAZELE', değer: [] }
}

//# Durum değişimi bitir
export function listelendi(sayfa: number, veri: ListelenenVeri[]): Aksiyon {
  return { tip: 'LİSTELENDİ', değer: [sayfa, veri] }
}
export function olmadı(mesaj: string): Aksiyon {
  return { tip: 'OLMADI', değer: [mesaj] }
}
