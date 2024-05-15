// info Eylem başlat
// # Genel
export function listele(): LİSTELEAKSİYON {
  return { tip: 'LİSTELE', değer: [] }
}
export function oku(tablo: Tablo, veri: number | DetaylıVeri): OKUAKSİYON {
  return { tip: 'OKU', değer: [tablo, veri] }
}
export function ekle(veri: OluşturulacakVeri): EKLEAKSİYON {
  return { tip: 'EKLE', değer: [veri] }
}
export function güncelle(veri: GüncellenecekVeri): GÜNCELLEAKSİYON {
  return { tip: 'GÜNCELLE', değer: [veri] }
}
export function sil(id: number): SİLAKSİYON {
  return { tip: 'SİL', değer: [id] }
}
export function tazele(): TAZELEAKSİYON {
  return { tip: 'TAZELE', değer: [] }
}
export function tetikle(): TETİKLEAKSİYON {
  return { tip: 'TETİKLE', değer: [] }
}
// # Tablo
export function tabloDeğiştir(tablo: Tablo): TABLODEĞİŞTİRAKSİYON {
  return { tip: 'TABLO_DEĞİŞTİR', değer: [tablo] }
}
//# Sayfa
export function sayfaDeğiştir(sayfa: number): SAYFADEĞİŞTİRAKSİYON {
  return { tip: 'SAYFA_DEĞİŞTİR', değer: [sayfa] }
}
//# Sayfa Boyutu
export function sayfaBoyutuDeğiştir(
  sayfaBoyutu: number
): SAYFABOYUTUDEĞİŞTİRAKSİYON {
  return { tip: 'SAYFA_BOYUTU_DEĞİŞTİR', değer: [sayfaBoyutu] }
}
//# Arama
export function aramaDeğiştir(arama: string): ARAMADEĞİŞTİRAKSİYON {
  return { tip: 'ARAMA_DEĞİŞTİR', değer: [arama] }
}
//info Eylem bitir
export function listelendi(
  sayfa: number,
  veri: ListelenenVeriler,
  toplam: number
): LİSTELENDİAKSİYON {
  return { tip: 'LİSTELENDİ', değer: [sayfa, veri, toplam] }
}
export function okundu(veri: DetaylıVeri): OKUNDUAKSİYON {
  return { tip: 'OKUNDU', değer: [veri] }
}
export function olmadı(mesaj: string): OLMADIAKSİYON {
  return { tip: 'OLMADI', değer: [mesaj] }
}
