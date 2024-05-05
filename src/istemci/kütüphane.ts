export function geçerliKimlikDurumuKabulEdiliyor(
  geçerliKimlikDurumu: KimlikDurumu,
  kabulEdilenKimlikDurumları: KimlikDurumu[]
): boolean {
  return kabulEdilenKimlikDurumları.includes(geçerliKimlikDurumu)
}
