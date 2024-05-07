//# Kimlik
export function geçerliKimlikDurumuKabulEdiliyor(
  geçerliKimlikDurumu: KimlikDurumu,
  kabulEdilenKimlikDurumları: KimlikDurumu[]
): boolean {
  return kabulEdilenKimlikDurumları.includes(geçerliKimlikDurumu)
}

//# API Sorguları
export async function girişYap(
  email: string,
  şifre: string,
  beniHatırla: boolean
): Promise<'Giriş yapıldı.' | 'Kimlik doğrulanamadı.'> {
  const sonuç: Response = await fetch('/api/kimlik/giris', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    body: JSON.stringify({
      email,
      şifre,
      beniHatırla
    })
  })
  return sonuç.text() as Promise<'Giriş yapıldı.' | 'Kimlik doğrulanamadı.'>
}
export async function çıkışYap(): Promise<void> {
  await fetch('/api/kimlik/cikis', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  })
  window.location.reload()
}
