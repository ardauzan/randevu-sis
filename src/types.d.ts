//info Burada tüm veri tiplerini tanımlıyoruz.

//# Kişiler
type Kişiler = Kişi[]
type Kişi = SunucuKaynaklıKişi | İstemciKaynaklıKişi
type SunucuKaynaklıKişiler = SunucuKaynaklıKişi[]
type SunucuKaynaklıKişi = {
  id: number
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
  üyeler?: Kişiler | number[]
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
type Gereç = {
  id?: number //# primary key
  ad: string
  adet: number
}

type Gereçler = Gereç[]

type Sarf = {
  id?: number //# primary key
  ad: string
  açıklama: string
  arızalı: boolean
}

type Sarflar = Sarf[]

type Randevu = {
  id?: number //# primary key
  açıklama: string
  proje: number
  gereçler: [gereç: number, adet: number][]
  sarflar: string[]
  gün: string
  başlangıçzamanı: string
  bitişzamanı: string
}

type Randevular = Randevu[]

type Tatil = {
  id?: number //# primary key
  başlangıçtarihi: string
  bitiştarihi: string
  açıklama: string
}

type Tatiller = Tatil[]

type Ziyaret = {
  id?: number //# primary key
  gün: string
  başlangıçzamanı: string
  bitişzamanı: string
  ziyareteden: string
  ziyaretçisayısı: number
}

type Ziyaretler = Ziyaret[]
