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
export function listele(): Aksiyon {
  return { tip: 'LİSTELE', değer: [] }
}
export function sayfaDeğiştir(sayfa: number): Aksiyon {
  return { tip: 'SAYFA_DEĞİŞTİR', değer: [sayfa] }
}
export function detaylıOku(tablo: Tablo, id: number): Aksiyon {
  return { tip: 'DETAYLI_OKU', değer: [tablo, id] }
}

//# Durum değişimi bitir
export function listelendi(
  sayfa: number,
  veri: ListelenenVeri[],
  toplam: number
): Aksiyon {
  return { tip: 'LİSTELENDİ', değer: [sayfa, veri, toplam] }
}
export function detaylıOkundu(veri: DetaylıVeri): Aksiyon {
  return { tip: 'DETAYLI_OKUNDU', değer: [veri] }
}
export function olmadı(mesaj: string): Aksiyon {
  return { tip: 'OLMADI', değer: [mesaj] }
}
