//info Burada tüm veri tiplerini tanımlıyoruz.
//# Diğer
type KimlikDurumu = 'yok' | 'kullanıcı' | 'yönetici'

type KimlikVerisi = [id: number, durum: KimlikDurumu]

type Navigasyon = {
  [sayfa: string]: [
    adres: string,
    ikon: React.ReactElement,
    kimlikİçinGöster: KimlikDurumu[],
    yönlendir: string
  ]
}
