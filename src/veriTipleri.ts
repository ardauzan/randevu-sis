//info Burada tüm veri tiplerini tanımlıyoruz.

//# Diğer
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

//# Yönetim paneli

type Tablo = 'kişiler' | 'projeler'

type Amaç = 'listele' | 'oku' | 'ekle' | 'güncelle' | 'sil'
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

type Durum =
  | {
      tablo: Tablo
      amaç: 'listele'
      sayfa: number
      sayfaBoyutu: number
      arama: string
      veri: ListelenenKişi[] | ListelenenProje[]
      yükleniyor: boolean
    }
  | {
      tablo: Tablo
      amaç: 'oku'
      sayfa: number
      sayfaBoyutu: number
      arama: string
      veri: DetaylıKişi | DetaylıProje | null
      yükleniyor: boolean
    }
  | {
      tablo: Tablo
      amaç: 'ekle'
      sayfa: number
      sayfaBoyutu: number
      arama: string
      veri: OluşturulacakKişi | OluşturulacakProje
      yükleniyor: boolean
    }
  | {
      tablo: Tablo
      amaç: 'güncelle'
      sayfa: number
      sayfaBoyutu: number
      arama: string
      veri: [id: number, OluşturulacakKişi] | [id: number, OluşturulacakProje]
      yükleniyor: boolean
    }
  | {
      tablo: Tablo
      amaç: 'sil'
      sayfa: number
      sayfaBoyutu: number
      arama: string
      veri: number
      yükleniyor: boolean
    }
