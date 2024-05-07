//# Kimlik
export function geçerliKimlikDurumuKabulEdiliyor(
  geçerliKimlikDurumu: KimlikDurumu,
  kabulEdilenKimlikDurumları: KimlikDurumu[]
): boolean {
  return kabulEdilenKimlikDurumları.includes(geçerliKimlikDurumu)
}

//# API Sorguları

export async function çıkışYap() {
  await fetch('/api/kimlik/cikis', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  })
  window.location.reload()
}
