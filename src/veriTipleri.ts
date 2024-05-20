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
type ListelenenVeri = ListelenenKişi | ListelenenProje
type ListelenenVeriler = ListelenenVeri[]
type DetaylıVeri = DetaylıKişi | DetaylıProje
type OluşturulacakVeri = OluşturulacakKişi | OluşturulacakProje
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
  veri: ListelenenVeriler
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
  değer: []
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
