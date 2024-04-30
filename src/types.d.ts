//info Burada tüm veri tiplerini tanımlıyoruz.

type Kişi = {
  id?: number //# primary key
  öğrencino: number
  ad: string
  soyad: string
  email: string
  şifre?: string
  şifrehash?: string
}

type Kişiler = Kişi[]

type Proje = {
  id?: number //# primary key
  ad: string
  başlangıçtarihi: string
  bitiştarihi: string
  açıklama: string
  üyeler: number[]
}

type Projeler = Proje[]

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
