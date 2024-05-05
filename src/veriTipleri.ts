//info Burada tüm veri tiplerini tanımlıyoruz.
//# Kişiler
type Kişiler = Kişi[]
type Kişi = SunucuKaynaklıKişi | İstemciKaynaklıKişi
type SunucuKaynaklıKişiler = SunucuKaynaklıKişi[]
type SunucuKaynaklıKişi = {
  id: number
  yönetici: boolean
  öğrenciNo: number
  ad: string
  soyAd: string
  email: string
  şifreHash?: string
  projeler?: SunucuKaynaklıProjeler | number[]
}
type İstemciKaynaklıKişiler = İstemciKaynaklıKişi[]
type İstemciKaynaklıKişi = {
  öğrenciNo: number
  ad: string
  soyAd: string
  email: string
  şifre?: string
  projeler: number[]
}

//# Projeler
type Projeler = Proje[]
type Proje = SunucuKaynaklıProje | İstemciKaynaklıProje
type SunucuKaynaklıProjeler = SunucuKaynaklıProje[]
type SunucuKaynaklıProje = {
  id: number
  ad: string
  başlangıçTarihi: string
  bitişTarihi: string
  açıklama: string
  üyeler?: SunucuKaynaklıKişiler | number[]
}
type İstemciKaynaklıProjeler = İstemciKaynaklıProje[]
type İstemciKaynaklıProje = {
  ad: string
  başlangıçTarihi: string
  bitişTarihi: string
  açıklama: string
  üyeler: number[]
}

//# Gereçler
type Gereçler = Gereç[]
type Gereç = SunucuKaynaklıGereç | İstemciKaynaklıGereç
type SunucuKaynaklıGereçler = SunucuKaynaklıGereç[]
type SunucuKaynaklıGereç = {
  id: number
  ad: string
  adet: number
}
type İstemciKaynaklıGereçler = İstemciKaynaklıGereç[]
type İstemciKaynaklıGereç = {
  ad: string
  adet: number
}

//# Araçlar
type Araçlar = Araç[]
type Araç = SunucuKaynaklıAraç | İstemciKaynaklıAraç
type SunucuKaynaklıAraçlar = SunucuKaynaklıAraç[]
type SunucuKaynaklıAraç = {
  id: number
  ad: string
  açıklama: string
  arızalı: boolean
}
type İstemciKaynaklıAraçlar = İstemciKaynaklıAraç[]
type İstemciKaynaklıAraç = {
  ad: string
  açıklama: string
  arızalı: boolean
}

//# Randevular
type Randevular = Randevu[]
type Randevu = SunucuKaynaklıRandevu | İstemciKaynaklıRandevu
type SunucuKaynaklıRandevular = SunucuKaynaklıRandevu[]
type SunucuKaynaklıRandevu = {
  id: number
  açıklama: string
  proje?: SunucuKaynaklıProje | number
  gereçler?:
    | [SunucuKaynaklıGereç, adet: number][]
    | [gereç: number, adet: number][]
  araçlar?: SunucuKaynaklıAraçlar | string[]
  gün: string
  başlangıçZamanı: string
  bitişZamanı: string
}
type İstemciKaynaklıRandevular = İstemciKaynaklıRandevu[]
type İstemciKaynaklıRandevu = {
  açıklama: string
  proje: number
  gereçler: [gereç: number, adet: number][]
  araçlar: string[]
  gün: string
  başlangıçzamanı: string
  bitişzamanı: string
}

//# Tatiller
type Tatiller = Tatil[]
type Tatil = SunucuKaynaklıTatil | İstemciKaynaklıTatil
type SunucuKaynaklıTatiller = SunucuKaynaklıTatil[]
type SunucuKaynaklıTatil = {
  id: number
  başlangıçTarihi: string
  bitişTarihi: string
  açıklama: string
}
type İstemciKaynaklıTatiller = İstemciKaynaklıTatil[]
type İstemciKaynaklıTatil = {
  başlangıçTarihi: string
  bitişTarihi: string
  açıklama: string
}

//# Ziyaretler
type Ziyaretler = Ziyaret[]
type Ziyaret = SunucuKaynaklıZiyaret | İstemciKaynaklıZiyaret
type SunucuKaynaklıZiyaretler = SunucuKaynaklıZiyaret[]
type SunucuKaynaklıZiyaret = {
  id: number
  gün: string
  başlangıçZamanı: string
  bitişZamanı: string
  ziyareteden: string
  ziyaretçiSayısı: number
}
type İstemciKaynaklıZiyaretler = İstemciKaynaklıZiyaret[]
type İstemciKaynaklıZiyaret = {
  gün: string
  başlangıçzamanı: string
  bitişzamanı: string
  ziyareteden: string
  ziyaretçisayısı: number
}

//# Diğer
type KimlikTürü = 'herkes' | 'girişYapmamış' | 'girişYapmış' | 'yönetici'

type Navigasyon = {
  [sayfa: string]: [
    adres: string,
    ikon: React.ReactElement,
    kimlikTürü: KimlikTürü
  ]
}
