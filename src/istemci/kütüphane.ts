export function geçerliKimlikDurumuKabulEdiliyor(
  geçerliKimlikDurumu: KimlikDurumu,
  kabulEdilenKimlikDurumları: KimlikDurumu[]
): boolean {
  return kabulEdilenKimlikDurumları.includes(geçerliKimlikDurumu)
}

export async function çıkışYap() {
  await fetch('/api/kimlik/cikis', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  })
  window.location.reload()
}
