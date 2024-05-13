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
export function detaylıOku(id: number): Aksiyon {
  return { tip: 'DETAYLI_OKU', değer: [id] }
}

//# Durum değişimi bitir
export function listelendi(sayfa: number, veri: ListelenenVeri[]): Aksiyon {
  return { tip: 'LİSTELENDİ', değer: [sayfa, veri] }
}
export function detaylıOkundu(veri: DetaylıVeri): Aksiyon {
  return { tip: 'DETAYLI_OKUNDU', değer: [veri] }
}
export function olmadı(mesaj: string): Aksiyon {
  return { tip: 'OLMADI', değer: [mesaj] }
}
