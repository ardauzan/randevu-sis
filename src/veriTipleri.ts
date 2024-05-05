//info Burada tüm veri tiplerini tanımlıyoruz.

//info Veritabanı
type Kişi = {
  id: number
  yönetici: boolean
  ad: string
  soyad: string
  email: string
  şifreHash: string
}

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
