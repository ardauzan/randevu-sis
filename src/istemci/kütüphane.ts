//info KimlikDurumu tipinde bir değer al.
//info Bu değer kabul edilen kimlik durumlarından biri mi kontrol et.
//info Eğer öyleyse true, değilse false döndür.
export function geçerliKimlikDurumuKabulEdiliyor(
  geçerliKimlikDurumu: KimlikDurumu,
  kabulEdilenKimlikDurumları: KimlikDurumu[]
): boolean {
  return kabulEdilenKimlikDurumları.includes(geçerliKimlikDurumu)
}
