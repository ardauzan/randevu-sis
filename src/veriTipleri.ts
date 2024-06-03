//# Kimlik
type KimlikÇerezi = {
  id: number
} & {
  [anahtar: string]: never
}
type KimlikDurumu = 'yok' | 'kullanıcı' | 'yönetici'
type KimlikVerisi = [id: number, durum: KimlikDurumu]

//# Veritabanı
type Tablo =
  | 'kişiler'
  | 'projeler'
  | 'gereçler'
  | 'araçlar'
  | 'randevular'
  | 'tatiller'
  | 'ziyaretler'
type ListelenenVeri =
  | ListelenenKişi
  | ListelenenProje
  | ListelenenGereç
  | RandevuDaKullanılanListelenenGereç
  | ListelenenAraç
  | ListelenenRandevu
  | ListelenenTatil
  | ListelenenZiyaret
type ListelenenVeriler = ListelenenVeri[]
type DetaylıVeri =
  | DetaylıKişi
  | DetaylıProje
  | ListelenenGereç
  | ListelenenAraç
  | DetaylıRandevu
  | ListelenenTatil
  | ListelenenZiyaret
type OluşturulacakVeri =
  | OluşturulacakKişi
  | OluşturulacakProje
  | OluşturulacakGereç
  | OluşturulacakAraç
  | OluşturulacakRandevu
  | OluşturulacakTatil
  | OluşturulacakZiyaret
type GüncellenecekVeri = [id: number, veri: OluşturulacakVeri]
type SilinecekVeri = number
type ListelenenKişi = {
  id: number
  öğrenciNo: number
  ad: string
  soyAd: string
  email: string
}
type DetaylıKişi = {
  id: number
  yönetici: boolean
  öğrenciNo: number
  ad: string
  soyAd: string
  email: string
  projeler: ListelenenProje[]
}
type OluşturulacakKişi = {
  yönetici: boolean
  öğrenciNo: number
  ad: string
  soyAd: string
  email: string
  şifre: string
  projeler: number[]
}
type GüncellenecekKişi = [id: number, veri: OluşturulacakKişi]
type ListelenenProje = {
  id: number
  ad: string
  başlangıçTarihi: string
  bitişTarihi: string
  açıklama: string
}
type DetaylıProje = {
  id: number
  ad: string
  başlangıçTarihi: string
  bitişTarihi: string
  açıklama: string
  üyeler: ListelenenKişi[]
}
type OluşturulacakProje = {
  ad: string
  başlangıçTarihi: string
  bitişTarihi: string
  açıklama: string
  üyeler: number[]
}
type GüncellenecekProje = [id: number, veri: OluşturulacakProje]
type ListelenenGereç = {
  id: number
  ad: string
  adet: number
}
type RandevuDaKullanılanListelenenGereç = {
  id: number
  ad: string
  talepEdilenAdet: number
  ToplamAdet: number
}
type OluşturulacakGereç = {
  ad: string
  adet: number
}
type GüncellenecekGereç = [id: number, veri: OluşturulacakGereç]
type ListelenenAraç = {
  id: number
  ad: string
  açıklama: string
  arızalı: boolean
}
type OluşturulacakAraç = {
  ad: string
  açıklama: string
  arızalı: boolean
}
type GüncellenecekAraç = [id: number, veri: OluşturulacakAraç]
type ListelenenRandevu = {
  id: number
  açıklama: string
  proje: number
  gün: string
  başlangıçZamanı: string
  bitişZamanı: string
}
type DetaylıRandevu = {
  id: number
  açıklama: string
  proje: ListelenenProje
  gün: string
  başlangıçZamanı: string
  bitişZamanı: string
  gereçler: [gereç: ListelenenGereç, adet: number][]
  araçlar: ListelenenAraç[]
}
type OluşturulacakRandevu = {
  açıklama: string
  proje: number
  gün: string
  başlangıçZamanı: string
  bitişZamanı: string
  gereçler: [gereç: number, adet: number][]
  araçlar: number[]
}
type GüncellenecekRandevu = [id: number, veri: OluşturulacakRandevu]
type ListelenenTatil = {
  id: number
  başlangıçTarihi: string
  bitişTarihi: string
  açıklama: string
}
type OluşturulacakTatil = {
  başlangıçTarihi: string
  bitişTarihi: string
  açıklama: string
}
type GüncellenecekTatil = [id: number, veri: OluşturulacakTatil]
type ListelenenZiyaret = {
  id: number
  gün: string
  başlangıçZamanı: string
  bitişZamanı: string
  ziyaretEden: string
  ziyaretçiSayısı: number
}
type OluşturulacakZiyaret = {
  gün: string
  başlangıçZamanı: string
  bitişZamanı: string
  ziyaretEden: string
  ziyaretçiSayısı: number
}
type GüncellenecekZiyaret = [id: number, veri: OluşturulacakZiyaret]

//# Durum
type OrtakDurum = {
  tablo: Tablo
  sayfa: number
  sayfaBoyutu: number
  arama: string
  toplam: number
  yükleniyor: boolean
  hata: string
}
type ListeleDurum = {
  amaç: 'listele'
  veri: ListelenenVeriler | null
} & OrtakDurum
type OkuDurum = {
  amaç: 'oku'
  veri: DetaylıVeri | number
} & OrtakDurum
type EkleDurum = {
  amaç: 'ekle'
  veri: OluşturulacakVeri
} & OrtakDurum
type GüncelleDurum = {
  amaç: 'güncelle'
  veri: GüncellenecekVeri
} & OrtakDurum
type SilDurum = {
  amaç: 'sil'
  veri: SilinecekVeri
} & OrtakDurum
type Durum = ListeleDurum | OkuDurum | EkleDurum | GüncelleDurum | SilDurum
//# Aksiyon
type LİSTELEAKSİYON = {
  tip: 'LİSTELE'
  değer: null
}
type OKUAKSİYON = {
  tip: 'OKU'
  değer: [tablo: Tablo, veri: number | DetaylıVeri]
}
type EKLEAKSİYON = {
  tip: 'EKLE'
  değer: [veri: OluşturulacakVeri]
}
type GÜNCELLEAKSİYON = {
  tip: 'GÜNCELLE'
  değer: [veri: GüncellenecekVeri]
}
type SİLAKSİYON = {
  tip: 'SİL'
  değer: [id: number]
}
type TAZELEAKSİYON = {
  tip: 'TAZELE'
  değer: []
}
type TETİKLEAKSİYON = {
  tip: 'TETİKLE'
  değer: []
}
type TABLODEĞİŞTİRAKSİYON = {
  tip: 'TABLO_DEĞİŞTİR'
  değer: [tablo: Tablo]
}
type SAYFADEĞİŞTİRAKSİYON = {
  tip: 'SAYFA_DEĞİŞTİR'
  değer: [sayfa: number]
}
type SAYFABOYUTUDEĞİŞTİRAKSİYON = {
  tip: 'SAYFA_BOYUTU_DEĞİŞTİR'
  değer: [sayfaBoyutu: number]
}
type ARAMADEĞİŞTİRAKSİYON = {
  tip: 'ARAMA_DEĞİŞTİR'
  değer: [arama: string]
}
type LİSTELENDİAKSİYON = {
  tip: 'LİSTELENDİ'
  değer: [sayfa: number, veri: ListelenenVeriler, toplam: number]
}
type OKUNDUAKSİYON = {
  tip: 'OKUNDU'
  değer: [veri: DetaylıVeri]
}
type OLMADIAKSİYON = {
  tip: 'OLMADI'
  değer: [mesaj: string]
}
type Aksiyon =
  | LİSTELEAKSİYON
  | OKUAKSİYON
  | EKLEAKSİYON
  | GÜNCELLEAKSİYON
  | SİLAKSİYON
  | TAZELEAKSİYON
  | TETİKLEAKSİYON
  | TABLODEĞİŞTİRAKSİYON
  | SAYFADEĞİŞTİRAKSİYON
  | SAYFABOYUTUDEĞİŞTİRAKSİYON
  | ARAMADEĞİŞTİRAKSİYON
  | LİSTELENDİAKSİYON
  | OKUNDUAKSİYON
  | OLMADIAKSİYON

//# Diğer
type Navigasyon = {
  [sayfa: string]: [
    adres: string,
    ikon: React.ReactElement,
    kimlikİçinGöster: KimlikDurumu[],
    yönlendir?: string
  ]
}
