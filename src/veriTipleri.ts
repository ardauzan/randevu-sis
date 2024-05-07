type KimlikDurumu = 'yok' | 'kullanıcı' | 'yönetici'

type KimlikVerisi = [id: number, durum: KimlikDurumu]

type Navigasyon = {
  [sayfa: string]: [
    adres: string,
    ikon: React.ReactElement,
    kimlikİçinGöster: KimlikDurumu[],
    yönlendir?: string
  ]
}

type Tablo =
  | 'kişiler'
  | 'projeler'
  | 'gereçler'
  | 'araçlar'
  | 'randevular'
  | 'tatiller'
  | 'ziyaretler'

type ListelenenKişi = {
  id: number
  yönetici: boolean
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
  soyad: string
  email: string
  projeler: ListelenenProje[]
}

type OluşturulacakKişi = {
  yönetici: boolean
  ad: string
  soyad: string
  email: string
  şifre: string
}

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
  projeler: number[]
}

type OrtakDurum = {
  tablo: Tablo
  sayfa: number
  sayfaBoyutu: number
  arama: string
  yükleniyor: boolean
  hata: string
}

type ListeleDurum = {
  amaç: 'listele'
  veri: ListelenenKişi[] | ListelenenProje[]
} & OrtakDurum

type OkuDurum = {
  amaç: 'oku'
  veri: DetaylıKişi | DetaylıProje | null
} & OrtakDurum

type EkleDurum = {
  amaç: 'ekle'
  veri: OluşturulacakKişi | OluşturulacakProje
} & OrtakDurum

type GüncelleDurum = {
  amaç: 'güncelle'
  veri: [id: number, OluşturulacakKişi] | [id: number, OluşturulacakKişi]
} & OrtakDurum

type SilDurum = {
  amaç: 'sil'
  veri: number
} & OrtakDurum

type Durum = ListeleDurum | OkuDurum | EkleDurum | GüncelleDurum | SilDurum
