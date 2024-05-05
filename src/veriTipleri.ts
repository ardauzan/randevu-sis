//info Burada tüm veri tiplerini tanımlıyoruz.
//# Diğer
type KimlikDurumu = 'yok' | 'kullanıcı' | 'yönetici'

type Navigasyon = {
  [sayfa: string]: [
    adres: string,
    ikon: React.ReactElement,
    kimlikİçinGöster: KimlikDurumu[]
  ]
}
