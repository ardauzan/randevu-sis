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
  return sonuç.json() as Promise<'Giriş yapıldı.' | 'Kimlik doğrulanamadı.'>
}
export async function çıkışYap(): Promise<void> {
  await fetch('/api/kimlik/cikis', {
    method: 'POST',
    credentials: 'same-origin'
  })
  window.location.reload()
}
export async function yöneticiİçinListele(
  tablo: Tablo,
  arama: string,
  sayfa: number,
  sayfaBoyutu: number,
  _iptal: AbortSignal
): Promise<{
  toplam: number
  sayfa: number
  sayfaBoyutu: number
  içerik: ListelenenVeriler
}> {
  const sonuç: Response = await fetch(
    `/api/yonet/${ingilizceAlfabeyeÇevir(tablo)}?arama=${arama}&sayfa=${sayfa}&sayfaBoyutu=${sayfaBoyutu}`,
    {
      method: 'GET',
      headers: { Accept: 'application/json' },
      credentials: 'same-origin'
    }
  )
  if (!sonuç.ok) throw new Error(await sonuç.json())
  return sonuç.json() as Promise<{
    toplam: number
    sayfa: number
    sayfaBoyutu: number
    içerik: ListelenenVeriler
  }>
}
export async function yöneticiİçinDetaylıOku(
  tablo: Tablo,
  id: number,
  _iptal: AbortSignal
): Promise<DetaylıVeri> {
  const sonuç: Response = await fetch(
    `/api/yonet/${ingilizceAlfabeyeÇevir(tablo)}/${id}`,
    {
      method: 'GET',
      headers: { Accept: 'application/json' },
      credentials: 'same-origin'
    }
  )
  if (!sonuç.ok) throw new Error(await sonuç.json())
  return sonuç.json() as Promise<DetaylıVeri>
}

export const yöneticiİçinEkle = async (
  tablo: Tablo,
  veri: OluşturulacakVeri
): Promise<void> => {
  const sonuç: Response = await fetch(
    `/api/yonet/${ingilizceAlfabeyeÇevir(tablo)}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(veri)
    }
  )
  if (!sonuç.ok) throw new Error(await sonuç.json())
}
export const yöneticiİçinGüncelle = async (
  tablo: Tablo,
  veri: GüncellenecekVeri
): Promise<void> => {
  const [id, güncellenecekVeri] = veri
  const sonuç: Response = await fetch(
    `/api/yonet/${ingilizceAlfabeyeÇevir(tablo)}/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(güncellenecekVeri)
    }
  )
  if (!sonuç.ok) throw new Error(await sonuç.json())
}
export async function yöneticiİçinSil(tablo: Tablo, id: number): Promise<void> {
  const sonuç: Response = await fetch(
    `/api/yonet/${ingilizceAlfabeyeÇevir(tablo)}/${id}`,
    {
      method: 'DELETE',
      credentials: 'same-origin'
    }
  )
  if (!sonuç.ok) throw new Error(await sonuç.json())
}

//# Diğer
export function ingilizceAlfabeyeÇevir(türkçe: string): string {
  return türkçe
    .replace('ç', 'c')
    .replace('ğ', 'g')
    .replace('ı', 'i')
    .replace('ö', 'o')
    .replace('ş', 's')
    .replace('ü', 'u')
    .replace('Ç', 'C')
    .replace('Ğ', 'G')
    .replace('İ', 'I')
    .replace('Ö', 'O')
    .replace('Ş', 'S')
    .replace('Ü', 'U')
}
export function kişiOluştururkenkiProjeleriSeç(projeler: string): number[] {
  if (projeler)
    return projeler
      .split(',')
      .filter((id) => id !== '')
      .map(Number)
  return []
}
export function projeOluştururkenkiÜyeleriSeç(üyeler: string): number[] {
  if (üyeler)
    return üyeler
      .split(',')
      .filter((id) => id !== '')
      .map(Number)
  return []
}
